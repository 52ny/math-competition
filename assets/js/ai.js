/* AI 接入层：内置免费智能体（免 Key）+ 自定义兼容 OpenAI 的接口
 * 说明：浏览器直连第三方服务，可能受网络环境影响；失败时会自动降级到本地诊断。
 */
(function () {
  'use strict';

  var BUILTIN = [
    { name: 'llm7.io', url: 'https://api.llm7.io/v1/chat/completions', model: 'gpt-oss:20b' },
    { name: 'Pollinations', url: 'https://text.pollinations.ai/openai', model: 'openai' }
  ];
  var DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

  function settings() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem('cmc.ai.v1') || '{}'); } catch (e) { s = {}; }
    return {
      provider: s.provider || 'deepseek',
      baseUrl: s.baseUrl || DEEPSEEK_URL,
      model: s.model || 'deepseek-chat',
      key: s.key || ''
    };
  }

  function save(patch) {
    var s = settings();
    Object.keys(patch).forEach(function (k) { s[k] = patch[k]; });
    localStorage.setItem('cmc.ai.v1', JSON.stringify(s));
    return s;
  }

  function buildMessages(q, userWork, selfRate, knowledgeList) {
    var ref = q.solution ? q.solution.map(function (s, i) { return (i + 1) + '. ' + plain(s); }).join('\n') : '';
    var kn = knowledgeList.map(function (k) { return '- ' + k.title + '：' + plain(k.summary); }).join('\n');
    var system = '你是中国大学生数学竞赛（CMC）的备考教练，擅长把学生的卡壳点拆成“知识层”和“真题层”。' +
      '回答必须使用简体中文，公式用 $...$ 包裹，语气像教练，直接、具体、不空泛。' +
      '不要使用代码块，不要复述整段题解，不要编造题目条件。';
    var user = [
      '学生正在做一道 CMC 真题，请诊断他卡在哪里，并给出可执行的下一步。',
      '',
      '【题目】' + plain(q.stem),
      '【题型】' + (q.type === 'fill' ? '填空' : '解答/证明') + '，来源：第' + q.edition + '届' + q.stage + '（' + q.year + '）' + q.paper,
      '【参考答案】' + plain(q.answer),
      '【参考解法要点】\n' + ref,
      '【涉及知识点】\n' + kn,
      '【常见错误】' + (q.pitfalls || []).join('；'),
      '【学生的思路或卡点】' + (userWork && userWork.trim() ? userWork.trim() : '（学生没有写出思路，表示完全不会）'),
      '【学生自评】' + (selfRate || '未自评'),
      '',
      '请严格按以下结构输出：',
      '## 一、卡点定位',
      '用 2-3 句指出真正的障碍，并在第一行标注卡点类型（概念不清 / 方法选择 / 计算失误 / 证明逻辑 / 审题偏差）。',
      '## 二、涉及的知识点（知识层）',
      '3-4 条 bullet，格式：**知识点名**：一句话说明它在这道题里起什么作用。只讲知识，不写这道题的具体步骤。',
      '## 三、这道题的解法骨架（真题层）',
      '3-4 步，每步一句话，说明“看到什么条件 → 做什么动作”，不要写完整计算。',
      '## 四、提示阶梯',
      '两条由浅入深的提示，第一条不要直接给方法，第二条可以点出关键公式。',
      '## 五、练有所获',
      '- 一句话方法论（可背下来）',
      '- 建议下一步加练的题型（具体到“练什么条件、什么结构”）',
      '',
      '总字数控制在 600 字以内。'
    ].join('\n');
    return [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ];
  }

  function plain(s) {
    return String(s == null ? '' : s).replace(/@/g, '\\').replace(/§/g, '\\\\');
  }

  function endpoints() {
    var s = settings();
    if (s.provider === 'deepseek') {
      if (s.key) {
        return [{ name: 'DeepSeek', url: s.baseUrl || DEEPSEEK_URL, model: s.model || 'deepseek-chat', key: s.key }];
      }
      // 还没填 Key 时先保证开箱可用，自动走内置免费智能体
      return BUILTIN;
    }
    if (s.provider === 'custom') {
      if (!s.baseUrl) throw new Error('还没有填写接口地址，请到「设置」里配置。');
      if (!s.key) throw new Error('还没有填写 API Key，请到「设置」里配置。');
      return [{ name: '自定义接口', url: s.baseUrl, model: s.model || 'deepseek-chat', key: s.key }];
    }
    return BUILTIN;
  }

  async function streamOnce(ep, messages, onDelta, signal) {
    var headers = { 'Content-Type': 'application/json' };
    if (ep.key) headers['Authorization'] = 'Bearer ' + ep.key;
    var res = await fetch(ep.url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ model: ep.model, messages: messages, temperature: 0.35, stream: true }),
      signal: signal
    });
    if (!res.ok) throw new Error(ep.name + ' 返回 HTTP ' + res.status);
    var ctype = res.headers.get('content-type') || '';
    if (!res.body || ctype.indexOf('text/event-stream') < 0) {
      var data = await res.json();
      var text = data && data.choices && data.choices[0] && (data.choices[0].message || {}).content;
      if (!text) throw new Error(ep.name + ' 返回内容为空');
      onDelta(text);
      return text;
    }
    var reader = res.body.getReader();
    var decoder = new TextDecoder('utf-8');
    var buf = '';
    var full = '';
    while (true) {
      var chunk = await reader.read();
      if (chunk.done) break;
      buf += decoder.decode(chunk.value, { stream: true });
      var lines = buf.split('\n');
      buf = lines.pop();
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line || line.indexOf('data:') !== 0) continue;
        var payload = line.slice(5).trim();
        if (payload === '[DONE]') continue;
        try {
          var j = JSON.parse(payload);
          var d = j.choices && j.choices[0] && (j.choices[0].delta || {});
          if (d && d.content) { full += d.content; onDelta(d.content); }
        } catch (e) { /* 忽略不完整分片 */ }
      }
    }
    if (!full.trim()) throw new Error(ep.name + ' 没有返回内容');
    return full;
  }

  async function chat(messages, onDelta) {
    var list = endpoints();
    var lastErr = null;
    for (var i = 0; i < list.length; i++) {
      var ctrl = new AbortController();
      var timer = setTimeout(function () { ctrl.abort(); }, 90000);
      try {
        var text = await streamOnce(list[i], messages, onDelta, ctrl.signal);
        clearTimeout(timer);
        return { text: text, provider: list[i].name };
      } catch (e) {
        clearTimeout(timer);
        lastErr = e;
      }
    }
    throw lastErr || new Error('所有 AI 通道都不可用');
  }

  async function diagnose(q, userWork, selfRate, knowledgeList, onDelta) {
    return chat(buildMessages(q, userWork, selfRate, knowledgeList), onDelta);
  }

  window.CMC_AI = {
    settings: settings,
    save: save,
    diagnose: diagnose,
    builtinNames: BUILTIN.map(function (b) { return b.name; })
  };
})();
