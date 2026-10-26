/* 我的题库 + 账户同步（Supabase）+ 图片 OCR（Tesseract.js）
 * 设计：
 *  - 未登录也能用：题目存在本机 localStorage
 *  - 登录后：整包 data 同步到 Supabase 的 cmc_bank 表（每用户一行，RLS 保护）
 *  - 冲突：按条目 updatedAt 取较新者
 */
(function () {
  'use strict';

  var QKEY = 'cmc.my.questions.v1';
  var KKEY = 'cmc.my.kp.v1';
  var CKEY = 'cmc.cloud.v1';
  var TKEY = 'cmc.my.lastSync.v1';

  var SQL = [
    'create table if not exists public.cmc_bank (',
    '  user_id uuid primary key references auth.users(id) on delete cascade,',
    "  data jsonb not null default '{}'::jsonb,",
    '  updated_at timestamptz not null default now()',
    ');',
    'alter table public.cmc_bank enable row level security;',
    'create policy "owner can read" on public.cmc_bank for select using (auth.uid() = user_id);',
    'create policy "owner can write" on public.cmc_bank for insert with check (auth.uid() = user_id);',
    'create policy "owner can update" on public.cmc_bank for update using (auth.uid() = user_id) with check (auth.uid() = user_id);'
  ].join('\n');

  var pending = null;
  var sb = null;
  var busy = false;

  /* ---------- 本地存储 ---------- */
  function read(k, d) {
    try {
      var v = JSON.parse(localStorage.getItem(k) || 'null');
      return v == null ? d : v;
    } catch (e) { return d; }
  }
  function write(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 空间不足时静默 */ }
  }
  var bank = {
    questions: read(QKEY, []),
    kp: read(KKEY, [])
  };
  function persist() {
    write(QKEY, bank.questions);
    write(KKEY, bank.kp);
  }
  function nowISO() { return new Date().toISOString(); }
  function uid(p) { return (p || 'my') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7); }

  function esc(s) {    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function nl2br(s) { return esc(s).replace(/\n/g, '<br>'); }
  /* 注意：页面里有 id="toast" 的元素，全局 toast 会被映射成 DOM 节点，必须走 CMC_APP */
  function toast(msg) {
    try { if (window.CMC_APP && window.CMC_APP.toast) window.CMC_APP.toast(msg); } catch (e) { /* 忽略 */ }
  }

  /* ---------- Supabase 配置 ---------- */
  function cfg() { return read(CKEY, { url: '', key: '' }); }
  function saveCfg(url, key) {
    write(CKEY, { url: (url || '').trim().replace(/\/+$/, ''), key: (key || '').trim() });
    sb = null;
  }
  async function client() {
    var c = cfg();
    if (!c.url || !c.key) throw new Error('还没有配置 Supabase，请先完成上方三步。');
    if (sb) return sb;
    var mod;
    try {
      mod = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
    } catch (e1) {
      mod = await import('https://unpkg.com/@supabase/supabase-js@2/+esm');
    }
    sb = mod.createClient(c.url, c.key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
    return sb;
  }
  async function user() {
    try {
      var c = await client();
      var r = await c.auth.getSession();
      return (r.data && r.data.session && r.data.session.user) || null;
    } catch (e) { return null; }
  }

  /* ---------- 同步 ---------- */
  function mergeById(a, b) {
    var map = {};
    (a || []).concat(b || []).forEach(function (x) {
      if (!x || !x.id) return;
      var old = map[x.id];
      if (!old || String(x.updatedAt || '') >= String(old.updatedAt || '')) map[x.id] = x;
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  }
  async function syncNow(silent) {
    if (busy) return;
    busy = true;
    try {
      var c = await client();
      var u = await user();
      if (!u) throw new Error('请先登录');
      var r = await c.from('cmc_bank').select('data').eq('user_id', u.id).maybeSingle();
      if (r.error) throw new Error(r.error.message);
      if (r.data && r.data.data) {
        bank.questions = mergeById(bank.questions, r.data.data.questions);
        bank.kp = mergeById(bank.kp, r.data.data.kp);
        persist();
      }
      var up = await c.from('cmc_bank').upsert({
        user_id: u.id,
        data: { questions: bank.questions, kp: bank.kp },
        updated_at: nowISO()
      });
      if (up.error) throw new Error(up.error.message);
      write(TKEY, nowISO());
      if (!silent) toast('同步完成：' + bank.questions.length + ' 道自定义题');
      return true;
    } catch (e) {
      if (!silent) toast('同步失败：' + e.message);
      return false;
    } finally {
      busy = false;
    }
  }

  /* ---------- 页面：账户 ---------- */
  function viewAccount() {
    var c = cfg();
    var configured = !!(c.url && c.key);
    var html = window.CMC_APP.pageHead('ACCOUNT', '账户与同步',
      '登录后，自建题库、自定义知识点与作答进度可以跨设备同步；未登录时数据只保存在本机。',
      '<a href="#/home">首页</a> / 账户');
    html += '<div id="acc-box"><div class="card"><div class="small muted">正在读取登录状态…</div></div></div>';
    html += '<h2 id="setup">Supabase 配置</h2>';
    html += '<div class="card"><p class="small">本项目是纯静态站点，账户与云端同步由你自建的 Supabase 免费项目提供，数据只存在你的项目里。三步完成：</p>' +
      '<ol class="small muted" style="line-height:1.9">' +
      '<li>打开 <a href="https://supabase.com/dashboard" target="_blank" rel="noopener">supabase.com/dashboard</a> 新建一个项目（免费）。</li>' +
      '<li>左侧 <b>SQL Editor</b> 新建查询，粘贴下面的建表语句并运行。</li>' +
      '<li>左侧 <b>Project Settings → API</b>，复制 <b>Project URL</b> 与 <b>anon public key</b>，填到下方。</li></ol>' +
      '<textarea readonly rows="9" style="width:100%;font-family:var(--mono);font-size:12px">' + esc(SQL) + '</textarea>' +
      '<div class="btn-row"><button class="btn ghost sm" data-act="copy-sql">复制建表 SQL</button>' +
      '<a class="btn ghost sm" href="https://supabase.com/dashboard" target="_blank" rel="noopener">打开 Supabase</a></div>' +
      '<div class="field" style="margin-top:14px"><label>Project URL</label><input id="co-url" value="' + esc(c.url) + '" placeholder="https://xxxx.supabase.co"></div>' +
      '<div class="field"><label>anon public key</label><input id="co-key" value="' + esc(c.key) + '" placeholder="eyJhbGciOi..."></div>' +
      '<div class="btn-row"><button class="btn" data-act="cloud-save">保存配置</button>' +
      '<button class="btn ghost" data-act="cloud-test">测试连接</button>' +
      (configured ? '<button class="btn ghost" data-act="cloud-clear">清除配置</button>' : '') + '</div>' +
      '<p class="small muted" style="margin-top:8px">提示：Supabase 默认要求邮箱确认。注册后请到邮箱点确认链接；也可以在 Authentication → Providers → Email 里关闭 Confirm email，方便测试。</p>' +
      '</div>';
    setTimeout(function () { refreshAccount(); }, 0);
    return { title: '账户与同步', html: html };
  }

  async function refreshAccount() {
    var box = document.getElementById('acc-box');
    if (!box) return;
    var c = cfg();
    if (!c.url || !c.key) {
      box.innerHTML = '<div class="card"><b>未配置云端</b><p class="small muted">当前是纯本地模式：题目与进度保存在这台设备的浏览器里。配置 Supabase 后可多端同步。</p></div>';
      return;
    }
    var u = await user();
    if (!u) {
      box.innerHTML = '<div class="card">' +
        '<b>登录 / 注册</b>' +
        '<div class="field" style="margin-top:10px"><label>邮箱</label><input id="co-email" type="email" placeholder="you@example.com"></div>' +
        '<div class="field"><label>密码</label><input id="co-pass" type="password" placeholder="至少 6 位"></div>' +
        '<div class="btn-row"><button class="btn" data-act="auth-signin">登录并同步</button>' +
        '<button class="btn ghost" data-act="auth-signup">注册</button></div>' +
        '<p class="small muted" style="margin-top:8px">注册后若提示需要确认邮件，请先到邮箱完成确认，再回来登录。</p></div>';
      return;
    }
    var last = localStorage.getItem(TKEY) || '从未同步';
    box.innerHTML = '<div class="card"><div class="btn-row"><b>已登录</b><span class="badge src">' + esc(u.email) + '</span><span class="spacer"></span>' +
      '<button class="btn ghost sm" data-act="auth-signout">退出登录</button></div>' +
      '<p class="small muted" style="margin-top:8px">云端数据：' + bank.questions.length + ' 道自建题 · ' + bank.kp.length + ' 个自定义知识点；上次同步：' + esc(last) + '</p>' +
      '<div class="btn-row"><button class="btn" data-act="sync-now">立即同步</button>' +
      '<a class="btn ghost" href="#/my">进入我的题库</a></div>' +
      '<p class="small muted" style="margin-top:8px">换设备时：在同一页面填入相同的 URL 与 anon key，登录同一账号即可拉取。</p></div>';
  }

  /* ---------- 页面：我的题库 ---------- */
  function viewBank() {
    var html = window.CMC_APP.pageHead('MY BANK', '我的题库',
      '上传图片或文本，自动识别文字并归类到知识点；没有合适的知识点就新建一个。数据默认只在本机，登录后多端同步。',
      '<a href="#/home">首页</a> / 我的题库');

    html += '<div class="card" id="my-drop" style="border:2px dashed var(--line);border-radius:12px;text-align:center;padding:22px">' +
      '<b>拖拽题目图片 / .txt / .md 到这里</b>' +
      '<p class="small muted" style="margin:6px 0 10px">图片会用浏览器本地 OCR 识别（首次需下载语言包）；也可以直接粘贴文字。</p>' +
      '<label class="btn sm" for="my-file">选择文件</label>' +
      '<input id="my-file" type="file" accept="image/*,.txt,.md,.json" hidden>' +
      '<div class="small muted" id="my-fileinfo" style="margin-top:8px"></div></div>' +
      '<textarea id="my-text" rows="5" placeholder="把题目文字粘贴到这里，例如：设 f(x) 在 [0,1] 上连续，证明 ..." ' +
      'style="width:100%;margin-top:12px;padding:10px;border:1px solid var(--line);border-radius:10px;background:var(--bg);color:var(--fg)"></textarea>' +
      '<div class="btn-row" style="margin-top:10px"><button class="btn" data-act="ingest">识别并自动归类</button>' +
      '<button class="btn ghost" data-act="manual">跳过 AI，手动整理</button><span class="small muted" id="my-status"></span></div>';

    if (pending) html += renderPending();
    html += renderList();
    setTimeout(bindFile, 0);
    return { title: '我的题库', html: html };
  }

  function renderPending() {
    var f = pending.fields || {};
    var opts = kpOptions(f.kpId);
    return '<h2 id="pending">待保存</h2><div class="card" style="border-color:var(--md-primary)">' +
      (pending.note ? '<p class="small" style="color:var(--md-primary)">' + esc(pending.note) + '</p>' : '') +
      '<div class="field"><label>题干</label><textarea id="my-stem" rows="4" style="width:100%">' + esc(f.stem || pending.text) + '</textarea></div>' +
      '<div class="field"><label>答案（可留空）</label><input id="my-answer" value="' + esc(f.answer || '') + '"></div>' +
      '<div class="field"><label>解析（每行一步）</label><textarea id="my-solution" rows="4" style="width:100%">' + esc((f.solution || []).join('\n')) + '</textarea></div>' +
      '<div class="field"><label>知识点</label><select id="my-kp">' + opts + '</select></div>' +
      '<div class="field"><label>或新建知识点（填了就用它）</label><input id="my-newkp" value="' + esc(f.newKp || '') + '" placeholder="例如：Fourier 级数的 Parseval 等式"></div>' +
      (pending.image ? '<div style="margin:8px 0"><img src="' + pending.image + '" alt="题目图片" style="max-width:100%;border-radius:10px;border:1px solid var(--line)"></div>' : '') +
      '<div class="btn-row"><button class="btn" data-act="save-custom">保存到我的题库</button>' +
      '<button class="btn ghost" data-act="cancel-custom">取消</button></div></div>';
  }

  function kpOptions(sel) {
    var list = [];
    (window.CMC_KNOWLEDGE ? window.CMC_KNOWLEDGE.points : []).forEach(function (k) {
      list.push({ id: k.id, name: k.title });
    });
    bank.kp.forEach(function (k) { list.push({ id: k.id, name: '★ ' + k.name }); });
    var out = '<option value=""' + (!sel ? ' selected' : '') + '>未分类</option>';
    out += list.map(function (k) {
      return '<option value="' + esc(k.id) + '"' + (k.id === sel ? ' selected' : '') + '>' + esc(k.name) + '</option>';
    }).join('');
    return out;
  }

  function renderList() {
    var html = '<h2 id="my-list">我的题目（' + bank.questions.length + '）</h2>';
    if (bank.kp.length) {
      html += '<div class="filter-bar">' + bank.kp.map(function (k) { return '<span class="chip">★ ' + esc(k.name) + '</span>'; }).join('') + '</div>';
    }
    if (!bank.questions.length) {
      return html + '<div class="empty">还没有题目。上传一张图片或粘贴一段文字试试。</div>';
    }
    html += bank.questions.map(function (q) {
      return '<div class="card" id="' + esc(q.id) + '"><div class="qmeta"><span class="badge src">我的题</span>' +
        '<span class="badge type">' + esc(q.kpName || '未分类') + '</span></div>' +
        '<div class="qstem">' + nl2br(q.stem) + '</div>' +
        (q.image ? '<div style="margin:8px 0"><img src="' + q.image + '" alt="原图" style="max-width:100%;border-radius:10px;border:1px solid var(--line)"></div>' : '') +
        '<div class="my-answer" style="display:none;margin-top:8px"><p><b>答案：</b>' + nl2br(q.answer || '未填写') + '</p>' +
        (q.solution && q.solution.length ? '<ol class="small">' + q.solution.map(function (s) { return '<li>' + nl2br(s) + '</li>'; }).join('') + '</ol>' : '') + '</div>' +
        '<div class="qfoot"><button class="btn ghost sm" data-act="my-reveal">查看答案与解析</button>' +
        '<button class="btn ghost sm" data-act="my-delete">删除</button></div></div>';
    }).join('');
    return html;
  }

  /* ---------- 文件读取与 OCR ---------- */
  function bindFile() {
    var input = document.getElementById('my-file');
    if (!input) return;
    input.onchange = function () {
      if (input.files && input.files[0]) readFile(input.files[0]);
    };
    var drop = document.getElementById('my-drop');
    if (drop) {
      drop.ondragover = function (e) { e.preventDefault(); drop.style.borderColor = 'var(--md-primary)'; };
      drop.ondragleave = function () { drop.style.borderColor = 'var(--line)'; };
      drop.ondrop = function (e) {
        e.preventDefault();
        drop.style.borderColor = 'var(--line)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) readFile(e.dataTransfer.files[0]);
      };
    }
  }
  function status(s) {
    var el = document.getElementById('my-status');
    if (el) el.textContent = s || '';
  }
  function fileInfo(s) {
    var el = document.getElementById('my-fileinfo');
    if (el) el.textContent = s || '';
  }

  async function readFile(file) {
    fileInfo(file.name + ' · ' + Math.round(file.size / 1024) + ' KB');
    try {
      if (file.type.indexOf('image/') === 0) {
        status('正在压缩图片…');
        var dataUrl = await shrink(await fileToData(file));
        pending = { text: '', image: dataUrl, fields: null };
        status('正在 OCR 识别，首次需下载语言包…');
        var text = await ocr(dataUrl, function (p) {
          status('OCR 识别中 ' + Math.round((p.progress || 0) * 100) + '%');
        });
        text = (text || '').trim();
        if (!text) throw new Error('没有识别到文字');
        pending.text = text;
        status('识别完成，正在交给 AI 归类…');
        await classify();
      } else if (/\.(txt|md|json)$/i.test(file.name) || file.type.indexOf('text') === 0) {
        var raw = await file.text();
        pending = { text: raw.slice(0, 20000), image: null, fields: null };
        status('正在交给 AI 归类…');
        await classify();
      } else {
        throw new Error('暂不支持这种文件，请上传图片、.txt 或 .md');
      }
    } catch (e) {
      status('处理失败：' + e.message);
      if (pending) {
        pending.fields = { stem: pending.text, answer: '', solution: [] };
        window.CMC_APP.route(false);
      }
    }
  }

  function fileToData(file) {
    return new Promise(function (res, rej) {
      var r = new FileReader();
      r.onload = function () { res(r.result); };
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }
  function shrink(dataUrl) {
    return new Promise(function (res) {
      var img = new Image();
      img.onload = function () {
        var max = 900;
        var scale = Math.min(1, max / Math.max(img.width, img.height));
        var cv = document.createElement('canvas');
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        res(cv.toDataURL('image/jpeg', 0.72));
      };
      img.onerror = function () { res(dataUrl); };
      img.src = dataUrl;
    });
  }

  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = res;
      s.onerror = function () { rej(new Error('OCR 组件加载失败，请检查网络后重试')); };
      document.head.appendChild(s);
    });
  }

  async function ocr(dataUrl, onP) {
    if (!window.Tesseract) {
      try {
        await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js');
      } catch (e) {
        await loadScript('https://unpkg.com/tesseract.js@5.1.1/dist/tesseract.min.js');
      }
    }
    if (!window.Tesseract) throw new Error('OCR 组件不可用');
    var worker = await window.Tesseract.createWorker('chi_sim+eng', 1, {
      langPath: 'https://tessdata.projectnaptha.com/4.0.0',
      logger: function (m) { if (m.status === 'recognizing text') onP(m); }
    });
    try {
      var r = await worker.recognize(dataUrl);
      return (r.data && r.data.text) || '';
    } finally {
      try { await worker.terminate(); } catch (e) { /* 忽略 */ }
    }
  }

  /* ---------- AI 归类 ---------- */
  function kpListText() {
    var arr = [];
    (window.CMC_KNOWLEDGE ? window.CMC_KNOWLEDGE.points : []).forEach(function (k) {
      arr.push(k.id + '|' + k.title);
    });
    bank.kp.forEach(function (k) { arr.push(k.id + '|' + k.name); });
    return arr.join('\n');
  }

  async function classify() {
    var text = (pending && pending.text || '').trim();
    if (!text) throw new Error('没有可归类的文字');
    var messages = [
      { role: 'system', content: '你是数学竞赛题库整理助手。只输出一个 JSON 对象，不要代码块、不要解释。' },
      { role: 'user', content: [
        '把下面的题目整理成 JSON，字段：',
        'stem（题干，保留公式，公式用 $...$，反斜杠正常写）',
        'answer（答案或结论，可空）',
        'solution（数组，3-5 条解题要点）',
        'type（fill 或 solution）',
        'difficulty（1-5 的整数）',
        'kpId（从下面列表里选最匹配的 id；都不合适填 new）',
        'newKp（若 kpId 为 new，给出新知识点名称，否则空字符串）',
        'reason（一句话说明归类理由）',
        '',
        '现有知识点（id|名称）：',
        kpListText(),
        '',
        '题目原文：',
        text.slice(0, 6000)
      ].join('\n') }
    ];
    var res = await window.CMC_AI.chat(messages, function () {});
    var obj = parseJson(res.text);
    if (!obj) throw new Error('AI 返回格式异常');
    var kpId = obj.kpId || 'new';
    var kpName = '';
    if (kpId !== 'new') {
      var k = (window.CMC_KNOWLEDGE.points || []).filter(function (x) { return x.id === kpId; })[0] ||
        bank.kp.filter(function (x) { return x.id === kpId; })[0];
      if (!k) kpId = 'new';
      else kpName = k.title || k.name;
    }
    pending.fields = {
      stem: obj.stem || text,
      answer: obj.answer || '',
      solution: Array.isArray(obj.solution) ? obj.solution : [],
      type: obj.type === 'fill' ? 'fill' : 'solution',
      difficulty: Number(obj.difficulty) || 3,
      kpId: kpId,
      kpName: kpName,
      newKp: obj.newKp || ''
    };
    pending.note = 'AI 建议：' + (obj.reason || '已归类') + (obj.newKp ? '；新知识点：' + obj.newKp : '');
    status('归类完成，请确认后保存');
    window.CMC_APP.route(false);
  }

  function parseJson(t) {
    if (!t) return null;
    var s = String(t).replace(/```json/gi, '').replace(/```/g, '');
    var i = s.indexOf('{'), j = s.lastIndexOf('}');
    if (i < 0 || j <= i) return null;
    try { return JSON.parse(s.slice(i, j + 1)); } catch (e) { return null; }
  }

  /* ---------- 保存 ---------- */
  function saveCustom() {
    var stem = (document.getElementById('my-stem') || {}).value || '';
    if (!stem.trim()) { toast('题干不能为空'); return; }
    var answer = (document.getElementById('my-answer') || {}).value || '';
    var sol = ((document.getElementById('my-solution') || {}).value || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    var kpId = (document.getElementById('my-kp') || {}).value || '';
    var newKp = ((document.getElementById('my-newkp') || {}).value || '').trim();
    var kpName = '';
    if (newKp) {
      var id = uid('kp');
      bank.kp.unshift({ id: id, name: newKp, summary: '用户自建知识点', createdAt: nowISO(), updatedAt: nowISO() });
      kpId = id;
      kpName = newKp;
    } else {
      var k = (window.CMC_KNOWLEDGE.points || []).filter(function (x) { return x.id === kpId; })[0] ||
        bank.kp.filter(function (x) { return x.id === kpId; })[0];
      kpName = k ? (k.title || k.name) : '未分类';
    }
    bank.questions.unshift({
      id: uid('q'),
      stem: stem.trim(),
      answer: answer.trim(),
      solution: sol,
      type: pending && pending.fields && pending.fields.type ? pending.fields.type : 'solution',
      difficulty: pending && pending.fields ? pending.fields.difficulty : 3,
      kpId: kpId,
      kpName: kpName,
      image: pending && pending.image ? pending.image : '',
      createdAt: nowISO(),
      updatedAt: nowISO()
    });
    persist();
    pending = null;
    toast('已保存到我的题库');
    if (cfg().url) syncNow(true);
    window.CMC_APP.route(false);
  }

  /* ---------- 动作分发 ---------- */
  function handle(act, btn) {
    if (act === 'cloud-save') {
      saveCfg((document.getElementById('co-url') || {}).value, (document.getElementById('co-key') || {}).value);
      toast('配置已保存');
      window.CMC_APP.route(false);
      return true;
    }
    if (act === 'cloud-clear') {
      localStorage.removeItem(CKEY);
      sb = null;
      toast('已清除云端配置');
      window.CMC_APP.route(false);
      return true;
    }
    if (act === 'copy-sql') {
      navigator.clipboard.writeText(SQL).then(function () { toast('建表 SQL 已复制'); },
        function () { toast('复制失败，请手动选中文本'); });
      return true;
    }
    if (act === 'cloud-test') {
      var u = cfg();
      fetch(u.url + '/rest/v1/', { method: 'GET', headers: { apikey: u.key } })
        .then(function (res) {
          if (res.status === 401) say('已连接，但 anon key 无效，请重新复制');
          else say('连接成功（HTTP ' + res.status + '），可以注册或登录了');
        })
        .catch(function (e) { say('连接失败：' + e.message); });
      return true;
    }
    if (act === 'auth-signin' || act === 'auth-signup') {
      var email = (document.getElementById('co-email') || {}).value || '';
      var pass = (document.getElementById('co-pass') || {}).value || '';
      if (!email || pass.length < 6) { toast('请填写邮箱和至少 6 位密码'); return true; }
      client().then(function (c) {
        return act === 'auth-signin' ? c.auth.signInWithPassword({ email: email, password: pass })
          : c.auth.signUp({ email: email, password: pass });
      }).then(function (r) {
        if (r.error) throw r.error;
        if (act === 'auth-signup' && !r.data.session) {
          toast('注册成功，请到邮箱点确认链接后再登录');
          return;
        }
        return syncNow(true).then(function () {
          toast('登录成功，已同步');
          window.CMC_APP.route(false);
        });
      }).catch(function (e) { toast('失败：' + (e.message || e)); });
      return true;
    }
    if (act === 'auth-signout') {
      client().then(function (c) { return c.auth.signOut(); }).then(function () {
        toast('已退出登录');
        window.CMC_APP.route(false);
      });
      return true;
    }
    if (act === 'sync-now') {
      syncNow(false).then(function (ok) { if (ok) window.CMC_APP.route(false); });
      return true;
    }
    if (act === 'ingest' || act === 'manual') {
      var txt = ((document.getElementById('my-text') || {}).value || '').trim();
      if (act === 'ingest') {
        if (!txt) { toast('请先粘贴题目文字，或上传图片/文件'); return true; }
        pending = { text: txt, image: null, fields: null };
        status('正在交给 AI 归类…');
        classify().catch(function (e) {
          status('AI 归类失败：' + e.message + '，已切换为手动整理');
          pending.fields = { stem: txt, answer: '', solution: [] };
          window.CMC_APP.route(false);
        });
      } else {
        if (!txt) { toast('请先粘贴题目文字或上传文件'); return true; }
        pending = { text: txt, image: pending && pending.image ? pending.image : null, fields: { stem: txt, answer: '', solution: [] } };
        window.CMC_APP.route(false);
      }
      return true;
    }
    if (act === 'save-custom') { saveCustom(); return true; }
    if (act === 'cancel-custom') { pending = null; window.CMC_APP.route(false); return true; }
    if (act === 'my-delete') {
      var card = btn.closest('.card');
      var id = card && card.id;
      if (!id) return true;
      bank.questions = bank.questions.filter(function (q) { return q.id !== id; });
      persist();
      if (cfg().url) syncNow(true);
      toast('已删除');
      window.CMC_APP.route(false);
      return true;
    }
    if (act === 'my-reveal') {
      var box = btn.closest('.card').querySelector('.my-answer');
      if (box) {
        var on = box.style.display !== 'none';
        box.style.display = on ? 'none' : 'block';
        btn.textContent = on ? '查看答案与解析' : '收起';
      }
      return true;
    }
    return false;
  }

  window.CMC_MY = {
    viewAccount: viewAccount,
    viewBank: viewBank,
    handle: handle,
    syncNow: syncNow,
    count: function () { return bank.questions.length + bank.kp.length; }
  };
})();
