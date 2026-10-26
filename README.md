# 数竞工坊 · 大学生数学竞赛真题备考

面向中国大学生数学竞赛（CMC）的纯静态备考站，参考 [note.malinkang.com/software-design](https://note.malinkang.com/software-design/) 的文档站结构：左侧章节导航、正文知识卡、右侧本页目录、折叠式解析。

## 功能

- **双入口**：非数学类（高等数学主线）与数学类（数学分析 / 高等代数 / 解析几何）。
- **方法手册**：按“同一个方法”聚合真题，每个方法给出适用信号、母题、推导骨架、易错点，并可跳到同类真题（20 个方法，覆盖极限、挖洞、补面、压缩映射、罗尔构造等）。
- **真题练习**：初赛 + 决赛，按届次分组，也可按章节刷题；填空自动判分，解答题可写思路。
- **分层诊断**：提交后先给出“知识层（缺哪个知识点）/ 真题层（这道题从哪下手）/ 常见陷阱”，避免只对答案。
- **AI 卡壳分析**：默认使用 **DeepSeek**（设置页填 API Key，仅存本机），可选 `deepseek-chat` / `deepseek-reasoner`；未填 Key 时自动降级到内置免费智能体（llm7.io → Pollinations）。若全部不可用，自动回退到本地诊断。
- **练有所获**：每题附「方法一句话 + 常见错法」，知识点可单独打开并查看关联真题。
- **学习闭环**：错题本、章节掌握度、薄弱知识点、下一步推荐；进度存 localStorage，可导出 / 导入。

## 目录结构

```
index.html
assets/css/style.css
assets/js/knowledge.js      # 章节 + 知识点
assets/js/methods.js        # 方法手册（母题 + 推导骨架）
assets/js/data-nonmath.js   # 非数学类真题
assets/js/data-math.js      # 数学类真题
assets/js/ai.js             # AI 接入（内置智能体 / 自定义 Key）
assets/js/app.js            # 路由、渲染、判分、统计
assets/vendor/katex/        # 本地化 KaTeX（离线可用）
```

## 本地运行

```bash
python -m http.server 8791
# 打开 http://127.0.0.1:8791/
```

直接双击 `index.html` 也能看页面，但浏览器对本地文件的脚本限制可能影响部分功能，建议用本地服务器。

## 内容约定

- 公式：`$...$` 行内、`$$...$$` 独立成行。
- 反斜杠统一写成 `@`（渲染前替换为 `\`），矩阵换行写成 `§`，避免 JS 字符串转义问题。
- 每道题字段：`id / group / edition / year / stage / paper / topic / type / score / difficulty / stem / answer / accept / solution / hints / pitfalls / takeaway / knowledge`。
- `topic` 必须等于 `knowledge.js` 中的章节 `id`，否则不会出现在章节页。
- `accept` 用于自动判分，填写常见的等价写法；判分失败会提示“可能形式不同”，由学生对照解析自评。

## 新增一道真题

1. 在 `assets/js/data-nonmath.js` 或 `data-math.js` 末尾追加对象；
2. `topic` 选一个已有章节 id；
3. 至少写 2 条 `hints`（由浅入深）、1 条 `pitfalls`、1 条 `takeaway`；
4. 刷新页面即可看到（无需构建）。

## 真题来源

题干与参考解答整理自全国大学生数学竞赛官方网站公开试卷（[cmathc.cn](http://www.cmathc.cn/)），解析为本站按“可复述步骤”重写。当前收录：

- 第 16 届（2024）初赛 非数学 A / 数学 A
- 第 14 届（2023）决赛 非数学类
- 第 13 届（2021）初赛 非数学类
- 第 12 届（2020）初赛 非数学类 /（2021）决赛 非数学类
- 第 11 届（2019）初赛 数学 A
- 第 10 届（2018）初赛 非数学类
- 第 6 届（2014）初赛 数学类
- 第 2 届（2010）初赛 数学类

仅供学习交流，版权归原命题方所有。AI 生成内容由第三方模型产生，可能与官方解答不一致，请以教材和官方答案为准。

## 部署

仓库为纯静态页面，推送到 GitHub 后在 **Settings → Pages** 选择 `main` 分支根目录即可。
