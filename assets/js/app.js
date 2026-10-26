/* 数竞工坊 · 站点逻辑（原生 JS） */
(function () {
  'use strict';

  /* ================= 数据整理 ================= */
  var CH = window.CMC_KNOWLEDGE.chapters.slice().sort(function (a, b) {
    if (a.group !== b.group) return a.group === 'nm' ? -1 : 1;
    return a.order - b.order;
  });
  var KP = window.CMC_KNOWLEDGE.points;
  var QS = (window.CMC_QUESTIONS_NM || []).concat(window.CMC_QUESTIONS_MATH || []).map(function (q, i) {
    q.no = i + 1;
    return q;
  });
  var QMAP = {};
  QS.forEach(function (q) { QMAP[q.id] = q; });
  var KMAP = {};
  KP.forEach(function (k) { KMAP[k.id] = k; });
  var METHODS = window.CMC_METHODS || [];
  var MMAP = {};
  METHODS.forEach(function (m) { MMAP[m.id] = m; });
  var CHMAP = {};
  CH.forEach(function (c) { CHMAP[c.id] = c; });

  function chaptersOf(group) { return CH.filter(function (c) { return c.group === group; }); }
  function pointsOf(chapterId) { return KP.filter(function (k) { return k.chapter === chapterId; }); }
  function questionsOfChapter(chapterId) { return QS.filter(function (q) { return q.topic === chapterId; }); }
  function questionsOfGroup(group) { return QS.filter(function (q) { return q.group === group; }); }
  function knowledgeOf(q) { return (q.knowledge || []).map(function (id) { return KMAP[id]; }).filter(Boolean); }

  /* ================= 状态 ================= */
  var KEY = 'cmc.state.v1';
  var state = { attempts: {}, theme: 'light', paperFilter: 'all' };
  try {
    var raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw && typeof raw === 'object') {
      state.attempts = raw.attempts || {};
      state.theme = raw.theme || 'light';
    }
  } catch (e) { /* 忽略损坏的本地数据 */ }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ attempts: state.attempts, theme: state.theme })); }
    catch (e) { /* 存储满时静默失败 */ }
  }
  function attempt(qid) { return state.attempts[qid] || null; }
  function isSolved(a) { return a && (a.status === 'correct' || a.status === 'mastered'); }

  /* ================= 工具 ================= */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function mathify(s) {
    return String(s == null ? '' : s).replace(/@/g, '\\').replace(/§/g, '\\\\');
  }
  function rich(s) { return esc(mathify(s)); }
  function plain(s) {
    return String(s == null ? '' : s).replace(/@/g, '\\').replace(/§/g, '\\\\');
  }
  function renderMath(el) {
    if (!window.renderMathInElement || !el) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false,
        strict: false
      });
    } catch (e) { /* KaTeX 单条公式失败不影响整页 */ }
  }
  function toast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(t._timer);
    t._timer = setTimeout(function () { t.hidden = true; }, 2400);
  }
  function scrollTop() { window.scrollTo(0, 0); }

  /* 简易 Markdown（AI 输出用） */
  function mdToHtml(src) {
    var text = esc(mathify(src)).replace(/\r\n/g, '\n');
    var lines = text.split('\n');
    var out = [];
    var list = null;
    function closeList() { if (list) { out.push('</' + list + '>'); list = null; } }
    lines.forEach(function (line) {
      var t = line.trim();
      if (!t) { closeList(); return; }
      var m;
      if ((m = t.match(/^(#{1,4})\s+(.*)$/))) {
        closeList();
        out.push('<h2>' + inline(m[2]) + '</h2>');
        return;
      }
      if ((m = t.match(/^[-*]\s+(.*)$/))) {
        if (list !== 'ul') { closeList(); out.push('<ul>'); list = 'ul'; }
        out.push('<li>' + inline(m[1]) + '</li>');
        return;
      }
      if ((m = t.match(/^\d+[.)]\s+(.*)$/))) {
        if (list !== 'ol') { closeList(); out.push('<ol>'); list = 'ol'; }
        out.push('<li>' + inline(m[1]) + '</li>');
        return;
      }
      closeList();
      out.push('<p>' + inline(t) + '</p>');
    });
    closeList();
    return out.join('');
  }
  function inline(s) {
    return s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  /* ================= 进度统计 ================= */
  function stats() {
    var total = QS.length, attempted = 0, solved = 0, stuck = 0;
    QS.forEach(function (q) {
      var a = attempt(q.id);
      if (a && a.status) attempted++;
      if (isSolved(a)) solved++;
      if (a && (a.status === 'stuck' || a.status === 'incorrect')) stuck++;
    });
    return { total: total, attempted: attempted, solved: solved, stuck: stuck, pct: total ? Math.round(solved / total * 100) : 0 };
  }
  function chapterStats(chapterId) {
    var qs = questionsOfChapter(chapterId), solved = 0, tried = 0;
    qs.forEach(function (q) {
      var a = attempt(q.id);
      if (a && a.status) tried++;
      if (isSolved(a)) solved++;
    });
    return { total: qs.length, solved: solved, tried: tried };
  }

  /* ================= 组件 ================= */
  function srcBadge(q) {
    return '<span class="badge src">第' + q.edition + '届' + (q.stage === '初赛' ? '初赛' : '决赛') + ' · ' + q.year + '</span>';
  }
  function typeBadge(q) {
    return '<span class="badge type">' + (q.type === 'fill' ? '填空' : '解答') + '</span>';
  }
  function diffDots(n) {
    var s = '';
    for (var i = 1; i <= 5; i++) s += i <= n ? '●' : '○';
    return '<span class="diff" title="难度 ' + n + '/5">' + s + '</span>';
  }
  function knChips(q) {
    return knowledgeOf(q).map(function (k) {
      return '<a class="badge" href="#/k/' + k.id + '">' + esc(k.title) + '</a>';
    }).join('');
  }

  function rewardHtml(q) {
    var kn = knowledgeOf(q);
    return '<div class="reward">' +
      '<div class="r-title">练有所获 · 这道题值得带走的</div>' +
      '<p>' + rich(q.takeaway) + '</p>' +
      (kn.length ? '<p class="small muted">对应知识点：' + kn.map(function (k) { return '<a href="#/k/' + k.id + '">' + esc(k.title) + '</a>'; }).join('、') + '</p>' : '') +
      '</div>';
  }

  function localDiagnosisHtml(q) {
    var kn = knowledgeOf(q);
    if (!kn.length && !(q.pitfalls || []).length) return '';
    var html = '<div class="kcard" style="margin-top:12px">' +
      '<div class="k-label">卡壳诊断 · 本地</div>' +
      '<h3 style="margin-top:4px">先分清：知识层缺什么，真题层卡在哪</h3>';
    if (kn.length) {
      html += '<div class="k-section"><div class="k-label">知识层（先补这些）</div><ul class="k-list">' +
        kn.map(function (k) { return '<li><a href="#/k/' + k.id + '">' + esc(k.title) + '</a>：' + rich(k.summary) + '</li>'; }).join('') +
        '</ul></div>';
    }
    html += '<div class="k-section"><div class="k-label">真题层（这道题的入口）</div><ol class="k-list">' +
      (q.hints || []).map(function (h) { return '<li>' + rich(h) + '</li>'; }).join('') +
      '</ol></div>';
    if ((q.pitfalls || []).length) {
      html += '<div class="k-section"><div class="k-label">常见陷阱</div><ul class="pitfall-list">' +
        q.pitfalls.map(function (p) { return '<li>' + rich(p) + '</li>'; }).join('') +
        '</ul></div>';
    }
    html += '</div>';
    return html;
  }

  function solutionHtml(q) {
    var steps = (q.solution || []).map(function (s, i) {
      return '<div class="sol-step"><span class="n">' + (i + 1) + '</span><div>' + rich(s) + '</div></div>';
    }).join('');
    return '<div class="solution" data-role="solution">' +
      '<h4>参考解析</h4>' + steps +
      '<div class="answer-final"><b>参考答案：</b>' + rich(q.answer) + '</div>' +
      '</div>';
  }

  function selfCheckHtml(qid, current) {
    return '<div class="self-check" data-qid="' + qid + '">' +
      '<span class="small muted" style="align-self:center">自评：</span>' +
      ['mastered|做对了', 'stuck|做了一半卡住', 'incorrect|完全不会'].map(function (item) {
        var kv = item.split('|');
        return '<button data-act="self" data-val="' + kv[0] + '"' + (current === kv[0] ? ' class="on"' : '') + '>' + kv[1] + '</button>';
      }).join('') +
      '</div>';
  }

  function feedbackHtml(q, a) {
    if (!a || !a.status) return '';
    var html = '';
    if (a.status === 'correct') {
      html += '<div class="fb ok"><span>✓</span><div><b>答案正确。</b>先别急着跳过：用自己的话复述一遍关键一步，再去看解析对照。</div></div>';
    } else if (a.status === 'mastered') {
      html += '<div class="fb ok"><span>✓</span><div><b>已标记为掌握。</b>隔 3 天回来重做一次，确认不是“看懂了”。</div></div>';
    } else if (a.status === 'stuck') {
      html += '<div class="fb warn"><span>!</span><div><b>已记录卡壳点。</b>先看下面的“知识层 / 真题层”诊断，再点提示阶梯；仍不通就让 AI 针对你的思路分析。</div></div>';
    } else if (a.status === 'incorrect') {
      html += '<div class="fb err"><span>✕</span><div><b>与参考答案不一致。</b>数学答案可能只是形式不同，请对照解析自评；确认错了就把它放进错题本。</div></div>';
    } else if (a.status === 'attempted') {
      html += '<div class="fb"><span>…</span><div>思路已保存。可以先看解析自评，或点“AI 诊断我的思路”。</div></div>';
    }
    html += localDiagnosisHtml(q);
    html += rewardHtml(q);
    if (q.type === 'fill' && a.status === 'incorrect') {
      html += '<div class="small muted" style="margin-top:8px">参考答案：' + rich(q.answer) + '</div>';
    }
    html += selfCheckHtml(q.id, a.status);
    return html;
  }

  function questionCard(q) {
    var a = attempt(q.id) || {};
    var cls = isSolved(a) ? 'solved' : (a.status === 'stuck' || a.status === 'incorrect' ? 'stuck' : '');
    var work = a.work || '';
    var input = a.input || '';
    var answerBlock;
    if (q.type === 'fill') {
      answerBlock = '<div class="qask"><label>你的答案（可直接输入数值或表达式，例如 π/2、ln2-2）</label>' +
        '<div class="answer-row"><input type="text" data-role="answer" value="' + esc(input) + '" placeholder="输入答案后按回车">' +
        '<button class="btn" data-act="submit">提交答案</button></div></div>';
    } else {
      answerBlock = '<div class="qask"><label>写下你的思路或卡住的位置（可以只写“到这里不知道怎么办”）</label>' +
        '<textarea class="work" data-role="work" placeholder="例如：我先令 u=y²，化为线性方程，但积分因子算不出来…">' + esc(work) + '</textarea>' +
        '<div class="btn-row" style="margin-top:8px"><button class="btn" data-act="save-work">保存思路并自评</button>' +
        '<button class="btn soft" data-act="ai">AI 诊断我的思路</button></div></div>';
    }
    return '<article class="qcard ' + cls + '" data-qid="' + q.id + '" id="q-' + q.id + '">' +
      '<div class="qhead"><span class="qno">Q' + q.no + '</span>' + srcBadge(q) + typeBadge(q) + diffDots(q.difficulty) +
      '<span class="qscore">' + q.score + ' 分</span></div>' +
      '<div class="qstem">' + rich(q.stem) + '</div>' +
      answerBlock +
      '<div class="feedback" data-role="feedback">' + feedbackHtml(q, a) + '</div>' +
      '<div class="qfoot">' +
      '<button class="btn ghost sm" data-act="hint">给个提示</button>' +
      '<button class="btn ghost sm" data-act="reveal">' + (a.revealed ? '收起解析' : '查看解析') + '</button>' +
      (q.type === 'fill' ? '<button class="btn ghost sm" data-act="ai">AI 诊断我的思路</button>' : '') +
      '<span class="spacer"></span>' +
      '<button class="btn ghost sm" data-act="master">' + (a.status === 'mastered' ? '取消掌握' : '标记已掌握') + '</button>' +
      '<button class="btn ghost sm" data-act="reset">重置</button>' +
      '</div>' +
      '<div class="hints" data-role="hints"></div>' +
      (a.revealed ? solutionHtml(q) : '') +
      '<div class="small muted" style="margin-top:8px">知识点：' + (knChips(q) || '—') + '</div>' +
      '</article>';
  }

  /* ================= 卡壳提示阶梯 ================= */
  var hintIndex = {};
  function showHint(card, q) {
    var box = card.querySelector('[data-role="hints"]');
    var i = hintIndex[q.id] || 0;
    if (i >= (q.hints || []).length) { toast('提示已经全部给出，试着写下来吧'); return; }
    var div = document.createElement('div');
    div.className = 'hint-item';
    div.innerHTML = '<b>提示 ' + (i + 1) + '：</b>' + rich(q.hints[i]);
    box.appendChild(div);
    renderMath(div);
    hintIndex[q.id] = i + 1;
  }

  /* ================= AI 诊断 ================= */
  var aiTimers = {};
  function runAI(qid) {
    var q = QMAP[qid];
    var card = document.querySelector('[data-qid="' + qid + '"]');
    if (!q || !card) return;
    var a = attempt(qid) || {};
    var inputEl = card.querySelector('[data-role="work"]');
    var answerEl = card.querySelector('[data-role="answer"]');
    var work = inputEl ? inputEl.value : (a.work || '');
    var input = answerEl ? answerEl.value : (a.input || '');
    if (input && !work) work = '我的答案是：' + input;

    var box = card.querySelector('[data-role="ai"]');
    if (!box) {
      box = document.createElement('div');
      box.className = 'ai-box';
      box.setAttribute('data-role', 'ai');
      card.querySelector('.qfoot').insertAdjacentElement('beforebegin', box);
    }
    box.innerHTML = '<div class="ai-head"><span class="ai-dot"></span><span>AI 分析 · 连接中…</span></div>' +
      '<div class="ai-body"><span class="spinner"></span> 正在读取你的思路，准备分层诊断…</div>' +
      '<div class="ai-actions"><button class="btn ghost sm" data-act="ai">重新分析</button>' +
      '<a class="btn ghost sm" href="#/settings">调整 AI 设置</a></div>';
    var body = box.querySelector('.ai-body');
    var acc = '';
    var rate = { mastered: '我标记为已掌握', stuck: '我做了一半卡住', incorrect: '我完全不会', correct: '我做对了' }[a.status] || '未自评';

    function paint() {
      body.innerHTML = mdToHtml(acc) || '<span class="spinner"></span>';
      renderMath(body);
    }
    window.CMC_AI.diagnose(q, work, rate, knowledgeOf(q), function (delta) {
      acc += delta;
      clearTimeout(aiTimers[qid]);
      aiTimers[qid] = setTimeout(paint, 180);
    }).then(function (res) {
      clearTimeout(aiTimers[qid]);
      paint();
      var head = box.querySelector('.ai-head');
      head.innerHTML = '<span class="ai-dot"></span><span>AI 分析 · ' + esc(res.provider) + '</span>';
      var note = document.createElement('div');
      note.className = 'small muted';
      note.style.marginTop = '8px';
      note.innerHTML = 'AI 生成内容仅供启发，关键步骤请与上方官方参考解析核对。';
      box.appendChild(note);
    }).catch(function (err) {
      body.innerHTML = '<div class="fb err"><span>!</span><div><b>AI 分析暂时不可用：</b>' + esc(err.message) + '</div></div>' +
        '<p class="small muted">别担心，上方的本地诊断已经列出知识层要点、真题入口和常见陷阱。也可以到「设置」里切换内置智能体或填写自己的 API Key。</p>';
    });
  }

  /* ================= 判分 ================= */
  function latexToPlain(s) {
    return String(s == null ? '' : s)
      .replace(/@/g, '\\').replace(/§/g, '\\\\')
      .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1)/($2)')
      .replace(/\\sqrt\{([^{}]*)\}/g, 'sqrt($1)')
      .replace(/\\pi/g, 'π')
      .replace(/\\ln/g, 'ln')
      .replace(/\\left|\\right/g, '')
      .replace(/\\[a-zA-Z]+/g, '')
      .replace(/[{}$]/g, '');
  }
  function norm(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[＄$]/g, '')
      .replace(/\s+/g, '')
      .replace(/[−–—]/g, '-')
      .replace(/π/g, 'pi')
      .replace(/√/g, 'sqrt')
      .replace(/[\\{}()]/g, '')
      .replace(/[§@]/g, '')
      .replace(/[·×]/g, '*')
      .replace(/，/g, ',')
      .replace(/。$/g, '')
      .replace(/^=+/, '').replace(/=+$/, '');
  }
  function sameNumber(a, b) {
    var x = Number(a), y = Number(b);
    if (isNaN(x) || isNaN(y)) return false;
    return Math.abs(x - y) <= 1e-6 * Math.max(1, Math.abs(y));
  }
  function grade(q, userInput) {
    var u = norm(userInput);
    if (!u) return false;
    var pool = (q.accept || []).concat([q.answer]);
    for (var i = 0; i < pool.length; i++) {
      if (u === norm(latexToPlain(pool[i]))) return true;
      if (sameNumber(u, norm(latexToPlain(pool[i])))) return true;
    }
    return false;
  }

  /* ================= 视图 ================= */
  function pageHead(eyebrow, title, lede, crumbs) {
    return '<div class="page-head">' +
      (crumbs ? '<div class="crumbs">' + crumbs + '</div>' : '') +
      '<div class="eyebrow">' + esc(eyebrow) + '</div>' +
      '<h1>' + esc(title) + '</h1>' +
      (lede ? '<p class="lede">' + rich(lede) + '</p>' : '') +
      '</div>';
  }

  function viewHome() {
    var s = stats();
    var nm = questionsOfGroup('nm').length, mt = questionsOfGroup('math').length;
    return {
      title: '首页',
      html: '<section class="hero">' +
        '<div class="eyebrow" style="color:rgba(255,255,255,.8)">CHINA COLLEGIATE MATHEMATICS COMPETITION</div>' +
        '<h1>把历年真题，练成你自己的方法库</h1>' +
        '<p>非数学类与数学类双入口，初赛 + 决赛真题。逐题作答、分步解析、卡壳诊断，把“看懂了”变成“写得出”。</p>' +
        '<div class="btn-row"><a class="btn" href="#/nm">开始非数学类</a><a class="btn" href="#/math">数学类</a><a class="btn ghost" href="#/methods">方法手册</a><a class="btn ghost" href="#/papers">真题库</a></div>' +
        '</section>' +
        '<div class="stat-row">' +
        '<div class="stat"><b>' + s.total + '</b><span>收录真题（非数学 ' + nm + ' / 数学 ' + mt + '）</span></div>' +
        '<div class="stat"><b>' + s.solved + '</b><span>已掌握</span></div>' +
        '<div class="stat"><b>' + s.stuck + '</b><span>待攻克</span></div>' +
        '<div class="stat"><b>' + s.pct + '%</b><span>总体完成度</span><div class="progress"><i style="width:' + s.pct + '%"></i></div></div>' +
        '</div>' +
        '<div class="card" style="margin-top:14px"><b>方法手册：</b>按“同一个方法”聚合真题，每个方法给出适用信号、母题与推导骨架。<a href="#/methods">进入方法手册 →</a></div>' +
        '<h2 id="entry">两个入口</h2>' +
        '<div class="grid grid-2">' +
        '<a class="card card-link" href="#/nm"><h3>非数学类 · 高等数学主线</h3>' +
        '<p class="muted">极限、微分、积分、级数、多元微积分、微分方程、空间解析几何与线性代数。共 ' + nm + ' 道真题，含官方参考解答。</p>' +
        '<p class="small muted">适合工科、经管等非数学专业同学。</p></a>' +
        '<a class="card card-link" href="#/math"><h3>数学类 · 分析 + 代数 + 几何</h3>' +
        '<p class="muted">数学分析、高等代数、解析几何的证明与计算。共 ' + mt + ' 道真题，侧重证明思路。</p>' +
        '<p class="small muted">适合数学类专业，或想冲决赛的同学。</p></a>' +
        '</div>' +
        '<h2 id="how">怎么用这个站</h2>' +
        '<div class="grid grid-3">' +
        '<div class="card"><h3>① 先做题，再看解析</h3><p class="muted">填空题直接输入答案；解答题写下思路（哪怕只写“卡在第二步”）。解析默认收起。</p></div>' +
        '<div class="card"><h3>② 卡壳时分层诊断</h3><p class="muted">每道题提交后会给出“知识层 / 真题层”两份诊断：先补知识点，再看这道题的入口。</p></div>' +
        '<div class="card"><h3>③ 让 AI 对准你的思路</h3><p class="muted">把卡点交给 DeepSeek（默认，可填 Key）或内置免费智能体，它会指出卡点类型（概念 / 方法 / 计算 / 证明 / 审题）并给出提示阶梯。</p></div>' +
        '</div>' +
        '<div class="grid grid-3" style="margin-top:14px">' +
        '<div class="card"><h3>④ 收进错题本</h3><p class="muted">自评“卡住 / 不会”自动进入错题本，按章节复盘。</p></div>' +
        '<div class="card"><h3>⑤ 看学习报告</h3><p class="muted">按章节统计掌握度，找出薄弱知识点，推荐下一题。</p></div>' +
        '<div class="card"><h3>⑥ 按路线推进</h3><p class="muted"><a href="#/guide">五周备考路线</a>：先补基础，再刷真题，最后限时模拟。</p></div>' +
        '</div>' +
        '<h2 id="scope">收录范围与来源</h2>' +
        '<p class="muted">当前收录第 16 届（2024）初赛、第 14 届（2023）决赛、第 13 届（2021）初赛、第 12 届（2020 初赛 / 2021 决赛）、第 11 届（2019）初赛、第 10 届（2018）初赛、第 6 届（2014）初赛、第 2 届（2010）初赛的真题；题干与参考解答整理自 cmathc.cn 公开试卷，解析按“可复述的步骤”重写。题库持续扩充中。</p>' +
        '<div class="table-wrap"><table><thead><tr><th>届次</th><th>年份</th><th>阶段</th><th>组别</th><th>题量</th></tr></thead><tbody>' +
        groupSummaryRows() +
        '</tbody></table></div>'
    };
  }

  function groupSummaryRows() {
    var map = {};
    QS.forEach(function (q) {
      var k = q.edition + '|' + q.year + '|' + q.stage + '|' + (q.group === 'nm' ? '非数学类' : '数学类');
      map[k] = (map[k] || 0) + 1;
    });
    return Object.keys(map).sort().reverse().map(function (k) {
      var p = k.split('|');
      return '<tr><td>第 ' + p[0] + ' 届</td><td>' + p[1] + '</td><td>' + p[2] + '</td><td>' + p[3] + '</td><td>' + map[k] + '</td></tr>';
    }).join('');
  }

  function viewGuide() {
    return {
      title: '备考路线',
      html: pageHead('STUDY PLAN', '五周备考路线', '把“刷题”拆成可执行的动作：先建方法索引，再用真题校验，最后限时模拟。', '<a href="#/home">首页</a> / 备考路线') +
        '<div class="grid grid-2">' +
        '<div class="card"><h3>三条原则</h3><ul class="k-list">' +
        '<li><b>先分类，再做题</b>：每道题做完必须回答“它属于哪个方法”。</li>' +
        '<li><b>卡住不超过 5 分钟</b>：先看第一条提示，仍不通就看知识层，不要死磕。</li>' +
        '<li><b>错题只记“卡点”</b>：写下是哪一步断的（知识缺口 / 方法没想到 / 算错），不抄整题。</li>' +
        '</ul></div>' +
        '<div class="card"><h3>每天 60–90 分钟怎么分</h3><ul class="k-list">' +
        '<li>20 分钟：复习昨天错题（遮住答案重做）。</li>' +
        '<li>40 分钟：新题 3–5 道，按章节推进。</li>' +
        '<li>10 分钟：写一张“方法卡”（一句话 + 一个触发条件）。</li>' +
        '</ul></div></div>' +
        '<h2 id="plan">五周安排</h2>' +
        '<div class="table-wrap"><table><thead><tr><th>周次</th><th>非数学类</th><th>数学类</th><th>本周产出</th></tr></thead><tbody>' +
        '<tr><td>第 1 周</td><td>极限与连续、一元微分</td><td>极限、连续与一致连续</td><td>极限 8 种常用变形 + 中值定理三种构造</td></tr>' +
        '<tr><td>第 2 周</td><td>一元积分、级数与反常积分</td><td>微分、积分与中值定理</td><td>积分技巧清单 + 级数判别流程图</td></tr>' +
        '<tr><td>第 3 周</td><td>多元微分、重积分与曲线曲面积分</td><td>级数与含参积分</td><td>三大公式（Green/Gauss/Stokes）使用条件卡</td></tr>' +
        '<tr><td>第 4 周</td><td>微分方程、空间解析几何与线性代数</td><td>高等代数、解析几何</td><td>方程类型识别表 + 二次曲面标准形</td></tr>' +
        '<tr><td>第 5 周</td><td>不等式与证明、整套真题限时</td><td>证明方法、整套真题限时</td><td>3 套限时卷 + 错题二刷</td></tr>' +
        '</tbody></table></div>' +
        '<h2 id="exam">考场策略</h2>' +
        '<div class="grid grid-2">' +
        '<div class="card"><h3>非数学类（150 分钟 / 100 分）</h3><p class="muted">填空 5×6 分，解答 5×14 分。先拿填空，控制在 35 分钟内；解答题按“写出关键公式 → 分步推导 → 检查边界”给分。</p></div>' +
        '<div class="card"><h3>数学类（150 分钟 / 100 分）</h3><p class="muted">证明题占大头。不会完整证明时，先把“要证什么、已知什么、可用哪条定理”写清楚，步骤分往往就在这里。</p></div>' +
        '</div>' +
        '<p class="small muted" style="margin-top:16px">提示：比赛时间以当年官方通知为准，这里只给通用节奏。</p>'
    };
  }

  function viewMap(group) {
    var list = chaptersOf(group);
    var isNm = group === 'nm';
    return {
      title: isNm ? '非数学类' : '数学类',
      html: pageHead(isNm ? 'GROUP A · NON-MATH' : 'GROUP B · MATH', isNm ? '非数学类知识地图' : '数学类知识地图',
        isNm ? '以高等数学为主线，按“极限 → 微分 → 积分 → 级数 → 多元 → 方程 → 几何代数 → 证明”推进。' : '按“分析 → 代数 → 几何”三条线推进，重点是证明结构与反例意识。',
        '<a href="#/home">首页</a> / ' + (isNm ? '非数学类' : '数学类')) +
        '<div class="grid grid-2">' + list.map(function (c) {
          var st = chapterStats(c.id);
          return '<a class="card card-link" href="#/' + group + '/' + c.id + '">' +
            '<h3>' + esc(c.title) + '</h3>' +
            '<p class="muted small">' + rich(c.intro) + '</p>' +
            '<p class="small muted">目标：' + rich(c.goal) + '</p>' +
            '<div class="small muted">' + st.solved + ' / ' + st.total + ' 题已掌握</div>' +
            '<div class="progress"><i style="width:' + (st.total ? st.solved / st.total * 100 : 0) + '%"></i></div>' +
            '</a>';
        }).join('') + '</div>' +
        '<h2 id="papers">按届次刷整套</h2>' +
        '<p class="muted">想模拟考场，直接去 <a href="#/papers">真题库</a> 按届次筛选；想补章节，就点上面的章节卡片。</p>'
    };
  }

  function viewChapter(group, chapterId) {
    var c = CHMAP[chapterId];
    if (!c || c.group !== group) return viewMap(group);
    var qs = questionsOfChapter(chapterId);
    var ks = pointsOf(chapterId);
    var st = chapterStats(chapterId);
    var body = pageHead(group === 'nm' ? 'NON-MATH' : 'MATH', c.title, c.intro,
      '<a href="#/home">首页</a> / <a href="#/' + group + '">' + (group === 'nm' ? '非数学类' : '数学类') + '</a> / ' + esc(c.title));
    body += '<div class="card" style="margin-bottom:8px"><b>本章目标：</b>' + rich(c.goal) +
      '<div class="small muted" style="margin-top:6px">题目 ' + qs.length + ' 道，已掌握 ' + st.solved + ' 道。</div>' +
      '<div class="progress"><i style="width:' + (st.total ? st.solved / st.total * 100 : 0) + '%"></i></div></div>';
    body += '<h2 id="knowledge">知识点精讲</h2>';
    body += ks.length ? ks.map(function (k) {
      return '<div class="kcard" id="k-' + k.id + '">' +
        '<h3><a href="#/k/' + k.id + '">' + esc(k.title) + '</a></h3>' +
        '<div class="k-summary">' + rich(k.summary) + '</div>' +
        '<div class="k-section"><div class="k-label">核心要点</div><ul class="k-list">' +
        k.points.map(function (p) { return '<li>' + rich(p) + '</li>'; }).join('') + '</ul></div>' +
        ((k.pitfalls || []).length ? '<div class="k-section"><div class="k-label">易错点</div><ul class="pitfall-list">' +
          k.pitfalls.map(function (p) { return '<li>' + rich(p) + '</li>'; }).join('') + '</ul></div>' : '') +
        '<div class="k-tags">' + relatedQuestions(k.id).map(function (q) {
          return '<a class="badge" href="#/q/' + q.id + '">Q' + q.no + ' · ' + q.year + ' ' + (q.stage === '初赛' ? '初赛' : '决赛') + '</a>';
        }).join('') + '</div>' +
        '</div>';
    }).join('') : '<p class="muted">本章知识点正在整理中。</p>';
    body += '<h2 id="practice">真题练习</h2>';
    body += qs.length ? qs.map(questionCard).join('') : '<div class="empty">本章暂无收录真题，先去 <a href="#/papers">真题库</a> 看看其他届次。</div>';
    return { title: c.title, html: body };
  }

  function relatedQuestions(kid) {
    return QS.filter(function (q) { return (q.knowledge || []).indexOf(kid) >= 0; });
  }

  function questionsOfMethod(m) {
    var ks = m.knowledge || [];
    var seen = {};
    return QS.filter(function (q) {
      if ((m.qs || []).indexOf(q.id) >= 0) return true;
      return (q.knowledge || []).some(function (k) { return ks.indexOf(k) >= 0; });
    }).filter(function (q) {
      if (seen[q.id]) return false;
      seen[q.id] = 1;
      return true;
    }).sort(function (a, b) { return b.edition - a.edition; });
  }

  function viewMethods() {
    var f = state.methodFilter || 'all';
    var list = METHODS.filter(function (m) { return f === 'all' || m.group === f; })
      .sort(function (a, b) { return a.group === b.group ? 0 : (a.group === 'nm' ? -1 : 1); });
    var chips = [['all', '全部'], ['nm', '非数学类'], ['math', '数学类']].map(function (c) {
      return '<button class="chip ' + (f === c[0] ? 'on' : '') + '" data-act="method-filter" data-val="' + c[0] + '">' + c[1] + '</button>';
    }).join('');
    var covered = {};
    METHODS.forEach(function (m) { (m.knowledge || []).forEach(function (k) { covered[k] = 1; }); });
    var kpIds = KP.filter(function (k) { return relatedQuestions(k.id).length; }).map(function (k) { return k.id; });
    var coverCount = kpIds.filter(function (id) { return covered[id]; }).length;
    var html = pageHead('METHODS', '方法手册', '按“同一个方法”把真题聚在一起：先看适用信号，再看母题的推导骨架，最后跳到同类真题。',
      '<a href="#/home">首页</a> / 方法手册') +
      '<div class="filter-bar">' + chips + '<span class="small muted">共 ' + list.length + ' 个方法 · 覆盖 ' + coverCount + '/' + kpIds.length + ' 个有真题的知识点</span></div>' +
      '<div class="grid grid-2">' + list.map(function (m) {
        var qs = questionsOfMethod(m);
        return '<a class="card card-link" href="#/methods/' + m.id + '">' +
          '<div class="badge src" style="margin-bottom:6px">' + (m.group === 'nm' ? '非数学类' : '数学类') + '</div>' +
          '<h3>' + esc(m.title) + '</h3>' +
          '<p class="muted small">' + rich(m.signal) + '</p>' +
          '<p class="small muted">母题：' + rich(m.prototype.stem) + '</p>' +
          '<div class="small muted">关联真题 ' + qs.length + ' 道</div>' +
          '</a>';
      }).join('') + '</div>';
    return { title: '方法手册', html: html };
  }

  function viewMethod(id) {
    var m = MMAP[id];
    if (!m) return viewNotFound('方法');
    var qs = questionsOfMethod(m);
    var html = pageHead(m.group === 'nm' ? 'NON-MATH · METHOD' : 'MATH · METHOD', m.title, m.signal,
      '<a href="#/home">首页</a> / <a href="#/methods">方法手册</a> / ' + esc(m.title));
    html += '<div class="kcard"><div class="k-label">适用信号</div><p>' + rich(m.signal) + '</p>' +
      '<div class="k-section"><div class="k-label">推导骨架</div><ol class="k-list">' +
      (m.prototype.steps || []).map(function (s) { return '<li>' + rich(s) + '</li>'; }).join('') +
      '</ol></div>' +
      '<div class="answer-final"><b>母题：</b>' + rich(m.prototype.stem) + '　<b>结论：</b>' + rich(m.prototype.answer) + '</div>' +
      ((m.pitfalls || []).length ? '<div class="k-section"><div class="k-label">易错点</div><ul class="pitfall-list">' +
        m.pitfalls.map(function (p) { return '<li>' + rich(p) + '</li>'; }).join('') + '</ul></div>' : '') +
      '</div>';
    html += '<h2 id="related">同类真题（' + qs.length + '）</h2>';
    html += qs.length ? qs.map(questionCard).join('') : '<div class="empty">这个方法的关联真题还在整理中，可先看其他方法。</div>';
    return { title: m.title, html: html };
  }

  function viewNotFound(what) {
    return {
      title: '未找到',
      html: pageHead('404', '未找到该' + what, '链接可能已失效，或题库尚未收录这一条。', '<a href="#/home">首页</a>') +
        '<div class="empty">可以回到 <a href="#/papers">真题库</a> 按届次浏览，或从 <a href="#/home">首页</a> 重新进入。</div>'
    };
  }

  function viewKnowledge(kid) {
    var k = KMAP[kid];
    if (!k) return viewNotFound('知识点');
    var c = CHMAP[k.chapter];
    var qs = relatedQuestions(kid);
    return {
      title: k.title,
      html: pageHead('KNOWLEDGE', k.title, k.summary,
        '<a href="#/home">首页</a> / <a href="#/' + k.group + '">' + (k.group === 'nm' ? '非数学类' : '数学类') + '</a> / <a href="#/' + k.group + '/' + k.chapter + '">' + esc(c ? c.title : '') + '</a>') +
        '<div class="kcard"><div class="k-label">核心要点</div><ul class="k-list">' +
        k.points.map(function (p) { return '<li>' + rich(p) + '</li>'; }).join('') + '</ul>' +
        ((k.pitfalls || []).length ? '<div class="k-section"><div class="k-label">易错点</div><ul class="pitfall-list">' +
          k.pitfalls.map(function (p) { return '<li>' + rich(p) + '</li>'; }).join('') + '</ul></div>' : '') +
        '</div>' +
        '<h2 id="related">关联真题</h2>' +
        (qs.length ? qs.map(questionCard).join('') : '<div class="empty">暂时没有关联题目。</div>')
    };
  }

  function viewPapers() {
    var f = state.paperFilter || 'all';
    var qs = QS.slice();
    if (f === 'nm' || f === 'math') qs = qs.filter(function (q) { return q.group === f; });
    if (f === 'pre') qs = qs.filter(function (q) { return q.stage === '初赛'; });
    if (f === 'final') qs = qs.filter(function (q) { return q.stage === '决赛'; });

    var groups = {};
    qs.forEach(function (q) {
      var key = q.edition + '|' + q.year + '|' + q.stage;
      (groups[key] = groups[key] || []).push(q);
    });
    var keys = Object.keys(groups).sort(function (a, b) {
      var pa = a.split('|'), pb = b.split('|');
      return Number(pb[0]) - Number(pa[0]);
    });
    var chips = [['all', '全部'], ['nm', '非数学类'], ['math', '数学类'], ['pre', '初赛'], ['final', '决赛']].map(function (c) {
      return '<button class="chip ' + (f === c[0] ? 'on' : '') + '" data-act="paper-filter" data-val="' + c[0] + '">' + c[1] + '</button>';
    }).join('');

    var html = pageHead('QUESTION BANK', '真题库', '按届次浏览收录的初赛与决赛真题；也可以按组别筛选后整卷练习。', '<a href="#/home">首页</a> / 真题库') +
      '<div class="filter-bar">' + chips + '<span class="small muted">共 ' + qs.length + ' 题</span></div>';
    html += keys.map(function (key) {
      var g = groups[key], p = key.split('|');
      return '<h2 id="e' + p[0] + p[2] + '">第 ' + p[0] + ' 届 · ' + p[1] + ' 年 · ' + p[2] + '</h2>' +
        '<p class="small muted">' + g.length + ' 题 · 建议限时 ' + (g.some(function (q) { return q.group === 'math'; }) ? '150' : '90') + ' 分钟完成本节，再统一看解析。</p>' +
        g.map(questionCard).join('');
    }).join('') || '<div class="empty">当前筛选下没有题目。</div>';
    return { title: '真题库', html: html };
  }

  function viewWrong() {
    var list = QS.filter(function (q) {
      var a = attempt(q.id);
      return a && (a.status === 'stuck' || a.status === 'incorrect');
    });
    return {
      title: '错题本',
      html: pageHead('REVIEW', '错题本', '这里收集你自评“卡住”或判错的题。复盘时遮住解析，先重做一遍。', '<a href="#/home">首页</a> / 错题本') +
        (list.length ? '<p class="small muted">共 ' + list.length + ' 题。建议每次只看 3 题，做完再对答案。</p>' + list.map(questionCard).join('')
          : '<div class="empty">还没有错题。做完题后点“做了一半卡住 / 完全不会”就会自动收进来。</div>')
    };
  }

  function viewReport() {
    var s = stats();
    var rows = CH.map(function (c) {
      var cs = chapterStats(c.id);
      return '<tr><td><a href="#/' + c.group + '/' + c.id + '">' + esc(c.title) + '</a></td>' +
        '<td>' + (c.group === 'nm' ? '非数学' : '数学') + '</td>' +
        '<td>' + cs.solved + ' / ' + cs.total + '</td>' +
        '<td style="min-width:120px"><div class="progress"><i style="width:' + (cs.total ? cs.solved / cs.total * 100 : 0) + '%"></i></div></td></tr>';
    }).join('');

    var weak = KP.map(function (k) {
      var qs = relatedQuestions(k.id);
      var solved = qs.filter(function (q) { return isSolved(attempt(q.id)); }).length;
      return { k: k, total: qs.length, solved: solved, tried: qs.filter(function (q) { return !!attempt(q.id); }).length };
    }).filter(function (x) { return x.total && x.solved < x.total; })
      .sort(function (a, b) { return (b.tried - b.solved) - (a.tried - a.solved) || b.total - a.total; })
      .slice(0, 8);

    var next = weak.slice(0, 3).map(function (x) {
      var q = relatedQuestions(x.k.id).filter(function (q) { return !isSolved(attempt(q.id)); })[0];
      return '<li><a href="#/q/' + q.id + '">Q' + q.no + ' · ' + esc(x.k.title) + '</a> <span class="small muted">（' + q.year + ' ' + q.stage + '）</span></li>';
    }).join('');

    return {
      title: '学习报告',
      html: pageHead('REPORT', '学习报告', '数据只保存在当前浏览器（localStorage），换设备不会同步，可以用设置页导出。', '<a href="#/home">首页</a> / 学习报告') +
        '<div class="stat-row">' +
        '<div class="stat"><b>' + s.solved + '</b><span>已掌握</span></div>' +
        '<div class="stat"><b>' + s.attempted + '</b><span>已作答</span></div>' +
        '<div class="stat"><b>' + s.stuck + '</b><span>待攻克</span></div>' +
        '<div class="stat"><b>' + s.pct + '%</b><span>完成度</span><div class="progress"><i style="width:' + s.pct + '%"></i></div></div>' +
        '</div>' +
        '<h2 id="chapters">章节掌握度</h2>' +
        '<div class="table-wrap"><table><thead><tr><th>章节</th><th>组别</th><th>掌握</th><th>进度</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        '<h2 id="weak">薄弱知识点</h2>' +
        (weak.length ? '<div class="table-wrap"><table><thead><tr><th>知识点</th><th>相关题</th><th>已掌握</th><th>建议</th></tr></thead><tbody>' +
          weak.map(function (x) {
            return '<tr><td><a href="#/k/' + x.k.id + '">' + esc(x.k.title) + '</a></td><td>' + x.total + '</td><td>' + x.solved + '</td><td class="small muted">先看知识点要点，再重做关联真题</td></tr>';
          }).join('') + '</tbody></table></div>'
          : '<p class="muted">还没有暴露薄弱点，继续做题吧。</p>') +
        (next ? '<h2 id="next">下一步做这三题</h2><div class="card"><ul class="k-list">' + next + '</ul></div>' : '')
    };
  }

  function viewSettings() {
    var s = window.CMC_AI.settings();
    return {
      title: '设置',
      html: pageHead('SETTINGS', '设置', 'AI 分析默认使用 DeepSeek（需要填 API Key），未配置时自动降级到内置免费智能体。', '<a href="#/home">首页</a> / 设置') +
        '<h2 id="ai">AI 分析</h2>' +
        '<div class="card">' +
        '<div class="k-section"><div class="k-label">提供方</div>' +
        '<div class="self-check" id="provider-pick">' +
        '<button data-act="provider" data-val="deepseek" class="' + (s.provider === 'deepseek' ? 'on' : '') + '">DeepSeek（默认）</button>' +
        '<button data-act="provider" data-val="builtin" class="' + (s.provider === 'builtin' ? 'on' : '') + '">内置免费智能体</button>' +
        '<button data-act="provider" data-val="custom" class="' + (s.provider === 'custom' ? 'on' : '') + '">自定义兼容接口</button>' +
        '</div>' +
        '<p class="small muted">DeepSeek 需要 API Key，只保存在本机浏览器；未填写 Key 时会自动降级到内置免费智能体（' + window.CMC_AI.builtinNames.join(' / ') + '）。模型可选 <code>deepseek-chat</code>（通用）或 <code>deepseek-reasoner</code>（推理）。</p>' +
        '</div>' +
        '<div id="custom-fields" style="' + (s.provider === 'builtin' ? 'display:none' : '') + '">' +
        '<div class="k-section"><div class="k-label">接口地址（DeepSeek 已预填）</div>' +
        '<input class="select" id="ai-base" style="width:100%;height:36px" placeholder="https://api.deepseek.com/v1/chat/completions" value="' + esc(s.baseUrl) + '"></div>' +
        '<div class="k-section"><div class="k-label">模型名</div>' +
        '<input class="select" id="ai-model" style="width:100%;height:36px" placeholder="deepseek-chat" value="' + esc(s.model) + '"></div>' +
        '<div class="k-section"><div class="k-label">API Key（只保存在本机）</div>' +
        '<input class="select" id="ai-key" type="password" style="width:100%;height:36px" placeholder="sk-..." value="' + esc(s.key) + '"></div>' +
        '</div>' +
        '<div class="btn-row" style="margin-top:12px"><button class="btn" data-act="save-ai">保存 AI 设置</button>' +
        '<button class="btn ghost" data-act="test-ai">测试连接</button></div>' +
        '<div id="ai-test" class="small" style="margin-top:10px"></div>' +
        '</div>' +
        '<h2 id="data">本地数据</h2>' +
        '<div class="card"><p class="muted small">做题记录、错题本、掌握状态保存在浏览器本地。清除浏览器数据会丢失，建议定期导出。</p>' +
        '<div class="btn-row"><button class="btn ghost" data-act="export">导出进度</button>' +
        '<label class="btn ghost" style="cursor:pointer">导入进度<input type="file" id="import-file" accept="application/json" hidden></label>' +
        '<button class="btn ghost" data-act="clear">清空进度</button></div></div>' +
        '<h2 id="about">关于</h2>' +
        '<div class="card"><p class="muted small">本站是纯静态站点，无后端、无账号。真题题干与参考解答整理自全国大学生数学竞赛官方网站（cmathc.cn）公开试卷，解析为本站重写，供学习交流使用。AI 输出由第三方模型生成，可能存在错误，请与官方解析核对。</p></div>'
    };
  }

  function viewQuestion(qid) {
    var q = QMAP[qid];
    if (!q) return viewNotFound('题目');
    var c = CHMAP[q.topic];
    return {
      title: 'Q' + q.no,
      html: pageHead('QUESTION', 'Q' + q.no + ' · ' + q.year + ' ' + q.stage + ' ' + q.paper, '',
        '<a href="#/home">首页</a> / <a href="#/' + q.group + '">' + (q.group === 'nm' ? '非数学类' : '数学类') + '</a> / <a href="#/' + q.group + '/' + q.topic + '">' + esc(c ? c.title : '') + '</a> / Q' + q.no) +
        questionCard(q)
    };
  }

  /* ================= 渲染与路由 ================= */
  var contentEl = document.getElementById('content');
  var tocEl = document.getElementById('toc');
  var sideEl = document.getElementById('sidebar');

  function parseHash() {
    var h = (location.hash || '#/home').replace(/^#\/?/, '');
    return h.split('/').filter(Boolean);
  }

  function route(scroll) {
    var seg = parseHash();
    var view;
    if (!seg.length || seg[0] === 'home') view = viewHome();
    else if (seg[0] === 'guide') view = viewGuide();
    else if (seg[0] === 'nm' || seg[0] === 'math') view = seg[1] ? viewChapter(seg[0], seg[1]) : viewMap(seg[0]);
    else if (seg[0] === 'papers') view = viewPapers();
    else if (seg[0] === 'methods') view = seg[1] ? viewMethod(seg[1]) : viewMethods();
    else if (seg[0] === 'wrong') view = viewWrong();
    else if (seg[0] === 'report') view = viewReport();
    else if (seg[0] === 'settings') view = viewSettings();
    else if (seg[0] === 'tools') view = viewTools();
    else if (seg[0] === 'k') view = viewKnowledge(seg[1]);
    else if (seg[0] === 'q') view = viewQuestion(seg[1]);
    else view = viewHome();

    contentEl.innerHTML = view.html;
    document.title = view.title + ' · 数竞工坊';
    renderMath(contentEl);
    buildToc();
    renderSidebar(seg);
    setTab(seg);
    if (scroll !== false) scrollTop();
    document.body.classList.remove('nav-open');
  }

  function viewTools() {
    var s = stats();
    return {
      title: '学习工具',
      html: pageHead('TOOLS', '学习工具', '把做题、复盘、统计串成闭环。', '<a href="#/home">首页</a> / 学习工具') +
        '<div class="grid grid-2">' +
        '<a class="card card-link" href="#/wrong"><h3>错题本</h3><p class="muted">当前待攻克 ' + s.stuck + ' 题。按章节复盘，遮住解析重做。</p></a>' +
        '<a class="card card-link" href="#/report"><h3>学习报告</h3><p class="muted">章节掌握度、薄弱知识点与“下一步做这三题”。</p></a>' +
        '<a class="card card-link" href="#/guide"><h3>备考路线</h3><p class="muted">五周计划、每日时间分配与考场策略。</p></a>' +
        '<a class="card card-link" href="#/settings"><h3>设置</h3><p class="muted">AI 提供方、接口 Key、进度导入导出。</p></a>' +
        '</div>'
    };
  }

  function setTab(seg) {
    var key = seg[0] || 'home';
    if (key === 'nm' || key === 'math') key = key;
    if (key === 'k') key = 'nm';
    if (key === 'q') key = 'nm';
    if (key === 'guide' || key === 'wrong' || key === 'report' || key === 'settings') key = 'tools';
    document.querySelectorAll('.tabs a').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-tab') === key);
    });
  }

  function buildToc() {
    var hs = contentEl.querySelectorAll('h2, h3');
    if (!hs.length) { tocEl.innerHTML = ''; return; }
    var html = '<div class="toc-title">本页目录</div>';
    hs.forEach(function (h, i) {
      if (!h.id) h.id = 'sec-' + i;
      html += '<a href="#' + h.id + '" class="' + (h.tagName === 'H3' ? 'lv3' : '') + '" data-toc="' + h.id + '">' + esc(h.textContent) + '</a>';
    });
    tocEl.innerHTML = html;
    tocEl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(a.getAttribute('data-toc'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderSidebar(seg) {
    var active = seg[0] === 'k' || seg[0] === 'q' ? '' : (seg[1] || seg[0]);
    var html = '';
    html += '<div class="side-group"><div class="side-title">开始</div>' +
      sideLink('#/home', '首页', 'home', active) +
      sideLink('#/guide', '备考路线', 'guide', active) + '</div>';

    ['nm', 'math'].forEach(function (g) {
      html += '<div class="side-group"><div class="side-title">' + (g === 'nm' ? '非数学类' : '数学类') + '</div>';
      html += sideLink('#/' + g, '知识地图', g, active);
      chaptersOf(g).forEach(function (c) {
        var st = chapterStats(c.id);
        html += '<a class="side-link ' + (active === c.id ? 'active' : '') + '" href="#/' + g + '/' + c.id + '">' +
          '<span>' + esc(c.title) + '</span><span class="cnt">' + st.solved + '/' + st.total + '</span></a>';
      });
      html += '</div>';
    });

    html += '<div class="side-group"><div class="side-title">题库与工具</div>' +
      sideLink('#/papers', '真题库', 'papers', active) +
      sideLink('#/methods', '方法手册', 'methods', active) +
      sideLink('#/tools', '学习工具', 'tools', active) +
      sideLink('#/wrong', '错题本', 'wrong', active) +
      sideLink('#/report', '学习报告', 'report', active) +
      sideLink('#/settings', '设置', 'settings', active) + '</div>';
    sideEl.innerHTML = html;
  }
  function sideLink(href, label, key, active) {
    return '<a class="side-link ' + (active === key ? 'active' : '') + '" href="' + href + '">' + esc(label) + '</a>';
  }

  /* ================= 交互 ================= */
  function cardOf(el) { return el.closest('.qcard'); }

  contentEl.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-act]');
    if (!btn) return;
    var act = btn.getAttribute('data-act');
    var qid = null;
    var card = cardOf(btn);
    if (card) qid = card.getAttribute('data-qid');

    if (act === 'paper-filter') {
      state.paperFilter = btn.getAttribute('data-val');
      route(false);
      return;
    }
    if (act === 'method-filter') {
      state.methodFilter = btn.getAttribute('data-val');
      route(false);
      return;
    }
    if (act === 'provider') {
      var pv = btn.getAttribute('data-val');
      document.querySelectorAll('#provider-pick button').forEach(function (b) { b.classList.remove('on'); });
      btn.classList.add('on');
      document.getElementById('custom-fields').style.display = pv === 'builtin' ? 'none' : '';
      var baseEl = document.getElementById('ai-base');
      var modelEl = document.getElementById('ai-model');
      if (pv === 'deepseek') {
        if (baseEl && !baseEl.value) baseEl.value = 'https://api.deepseek.com/v1/chat/completions';
        if (modelEl && !modelEl.value) modelEl.value = 'deepseek-chat';
      }
      window.CMC_AI.save({ provider: pv });
      return;
    }
    if (act === 'save-ai') {
      window.CMC_AI.save({
        baseUrl: (document.getElementById('ai-base') || {}).value || '',
        model: (document.getElementById('ai-model') || {}).value || '',
        key: (document.getElementById('ai-key') || {}).value || ''
      });
      toast('AI 设置已保存');
      return;
    }
    if (act === 'test-ai') {
      var out = document.getElementById('ai-test');
      out.innerHTML = '<span class="muted">正在测试…</span>';
      window.CMC_AI.save({
        baseUrl: (document.getElementById('ai-base') || {}).value || '',
        model: (document.getElementById('ai-model') || {}).value || '',
        key: (document.getElementById('ai-key') || {}).value || ''
      });
      window.CMC_AI.diagnose(
        { stem: '1+1=?', answer: '2', solution: [], type: 'fill', edition: 0, stage: '测试', year: '', paper: '', pitfalls: [] },
        '测试连接，请只回复“连接成功”。', '', [], function () {}
      ).then(function (r) {
        out.innerHTML = '<span style="color:var(--ok)">连接成功：' + esc(r.provider) + '</span>';
      }).catch(function (err) {
        out.innerHTML = '<span style="color:var(--err)">连接失败：' + esc(err.message) + '（可切换内置智能体重试）</span>';
      });
      return;
    }
    if (act === 'export') {
      var blob = new Blob([JSON.stringify({ attempts: state.attempts, exportedAt: new Date().toISOString() }, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'cmc-progress.json';
      a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 3000);
      return;
    }
    if (act === 'clear') {
      if (!confirm('确定清空全部做题记录和错题本吗？此操作不可撤销。')) return;
      state.attempts = {};
      save();
      toast('已清空本地进度');
      route(false);
      return;
    }
    if (!qid) return;
    var q = QMAP[qid];
    var a = attempt(qid) || {};

    if (act === 'submit') {
      var input = card.querySelector('[data-role="answer"]');
      var val = input ? input.value.trim() : '';
      if (!val) { toast('先写下你的答案'); input && input.focus(); return; }
      var ok = grade(q, val);
      state.attempts[qid] = Object.assign({}, a, {
        input: val, status: ok ? 'correct' : 'incorrect', at: Date.now(),
        tries: (a.tries || 0) + 1
      });
      save();
      refresh(qid);
      if (ok) toast('答对了，看看解析里的“练有所获”');
      return;
    }
    if (act === 'save-work') {
      var ta = card.querySelector('[data-role="work"]');
      var work = ta ? ta.value.trim() : '';
      if (!work) { toast('至少写一句你想到哪里了'); ta && ta.focus(); return; }
      state.attempts[qid] = Object.assign({}, a, {
        work: work, status: a.status && a.status !== 'attempted' ? a.status : 'attempted', at: Date.now()
      });
      save();
      refresh(qid);
      toast('思路已保存，可以自评或让 AI 诊断');
      return;
    }
    if (act === 'hint') { showHint(card, q); return; }
    if (act === 'reveal') {
      state.attempts[qid] = Object.assign({}, a, { revealed: !a.revealed });
      save();
      refresh(qid);
      return;
    }
    if (act === 'ai') { runAI(qid); return; }
    if (act === 'master') {
      if (a.status === 'mastered') {
        state.attempts[qid] = Object.assign({}, a, { status: a.prevStatus || 'correct' });
      } else {
        state.attempts[qid] = Object.assign({}, a, { status: 'mastered', prevStatus: a.status || null });
      }
      save();
      refresh(qid);
      renderSidebar(parseHash());
      return;
    }
    if (act === 'self') {
      var val2 = btn.getAttribute('data-val');
      state.attempts[qid] = Object.assign({}, a, { status: val2, at: Date.now() });
      save();
      refresh(qid);
      renderSidebar(parseHash());
      return;
    }
    if (act === 'reset') {
      delete state.attempts[qid];
      save();
      refresh(qid);
      renderSidebar(parseHash());
      toast('已重置这道题');
      return;
    }
  });

  contentEl.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var t = e.target;
    if (!t || t.getAttribute('data-role') !== 'answer') return;
    e.preventDefault();
    var card = cardOf(t);
    if (card) { var b = card.querySelector('[data-act="submit"]'); if (b) b.click(); }
  });

  function refresh(qid) {
    var card = document.querySelector('.qcard[data-qid="' + qid + '"]');
    if (!card) return;
    var q = QMAP[qid];
    var tmp = document.createElement('div');
    tmp.innerHTML = questionCard(q);
    var next = tmp.firstElementChild;
    next.setAttribute('data-keep-ai', '1');
    var aiBox = card.querySelector('[data-role="ai"]');
    card.replaceWith(next);
    if (aiBox) next.querySelector('.qfoot').insertAdjacentElement('beforebegin', aiBox);
    renderMath(next);
  }

  document.body.addEventListener('change', function (e) {
    if (e.target.id !== 'import-file') return;
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data.attempts) throw new Error('文件格式不对');
        state.attempts = data.attempts;
        save();
        toast('进度已导入');
        route(false);
      } catch (err) { toast('导入失败：' + err.message); }
    };
    reader.readAsText(f);
  });

  /* 主题 */
  var themeBtn = document.getElementById('theme-toggle');
  function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    themeBtn.textContent = state.theme === 'dark' ? '☀' : '◐';
  }
  themeBtn.addEventListener('click', function () {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    save();
    applyTheme();
  });

  /* 移动端目录 */
  document.getElementById('menu-toggle').addEventListener('click', function () {
    document.body.classList.toggle('nav-open');
  });
  document.addEventListener('click', function (e) {
    if (document.body.classList.contains('nav-open') && !e.target.closest('.sidebar') && !e.target.closest('#menu-toggle')) {
      document.body.classList.remove('nav-open');
    }
  });

  /* 搜索 */
  var overlay = document.getElementById('search-overlay');
  var searchInput = document.getElementById('search-input');
  var searchResults = document.getElementById('search-results');

  function openSearch() {
    overlay.hidden = false;
    searchInput.value = '';
    searchResults.innerHTML = '<p class="search-hint">输入关键词开始搜索；回车打开第一条结果。</p>';
    setTimeout(function () { searchInput.focus(); }, 30);
  }
  function closeSearch() { overlay.hidden = true; }
  document.getElementById('search-open').addEventListener('click', openSearch);
  document.getElementById('search-close').addEventListener('click', closeSearch);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });

  var ALIAS = {
    '格林': 'green', '高斯': 'gauss', '斯托克斯': 'stokes', '泰勒': 'taylor',
    '洛必达': 'hospital', '柯西': 'cauchy', '拉格朗日': 'lagrange', '施密特': 'schmidt',
    '全微分': '全微分', '夹逼': '夹逼', '体积': '体积'
  };

  function search(kw) {
    kw = kw.trim().toLowerCase();
    if (!kw) { searchResults.innerHTML = '<p class="search-hint">输入关键词开始搜索；回车打开第一条结果。</p>'; return; }
    var terms = [kw];
    if (ALIAS[kw]) terms.push(ALIAS[kw]);
    function hit(hay) {
      hay = hay.toLowerCase();
      return terms.some(function (t) { return hay.indexOf(t) >= 0; });
    }
    var out = [];
    QS.forEach(function (q) {
      var hay = (plain(q.stem) + ' ' + plain(q.answer) + ' ' + plain((q.solution || []).join(' ')) + ' ' +
        q.year + ' 第' + q.edition + '届 ' + q.stage + ' ' + q.paper).toLowerCase();
      if (hit(hay)) {
        out.push('<a class="search-item" href="#/q/' + q.id + '"><b>Q' + q.no + '</b> <span class="snippet">' + esc(plain(q.stem)) + '</span>' +
          '<span class="meta">' + q.year + ' · ' + q.stage + ' · ' + q.paper + '</span></a>');
      }
    });
    KP.forEach(function (k) {
      var hay = (k.title + ' ' + k.summary + ' ' + (k.points || []).join(' ')).toLowerCase();
      if (hit(hay)) {
        out.push('<a class="search-item" href="#/k/' + k.id + '"><b>知识点</b> ' + esc(k.title) + '<span class="meta">' + (k.group === 'nm' ? '非数学类' : '数学类') + '</span></a>');
      }
    });
    METHODS.forEach(function (m) {
      var hay = (m.title + ' ' + m.signal + ' ' + (m.prototype ? m.prototype.stem : '')).toLowerCase();
      if (hit(hay)) {
        out.push('<a class="search-item" href="#/methods/' + m.id + '"><b>方法</b> ' + esc(m.title) + '<span class="meta">' + (m.group === 'nm' ? '非数学类' : '数学类') + '</span></a>');
      }
    });
    searchResults.innerHTML = out.length ? out.slice(0, 20).join('') : '<p class="search-hint">没有找到，换个关键词试试（如“格林”“2024”“压缩映射”）。</p>';
    renderMath(searchResults);
  }
  searchInput.addEventListener('input', function () { search(searchInput.value); });
  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var first = searchResults.querySelector('a');
      if (first) { location.hash = first.getAttribute('href'); closeSearch(); }
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeSearch(); document.body.classList.remove('nav-open'); }
    var tag = (e.target.tagName || '').toLowerCase();
    if ((e.key === '/' || e.key === 'k') && tag !== 'input' && tag !== 'textarea') {
      e.preventDefault();
      openSearch();
    }
  });

  /* 启动 */
  applyTheme();
  route();
  window.addEventListener('hashchange', function () {
    route();
    var hash = location.hash;
    if (hash.indexOf('#/q/') === 0) {
      var id = hash.split('/')[2];
      setTimeout(function () {
        var el = document.getElementById('q-' + id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  });
})();
