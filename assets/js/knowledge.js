/* 知识层数据：章节 + 知识点
 * 数学公式约定：用 $...$ / $$...$$ 包裹；反斜杠统一写成 @，渲染前替换为 \ 。
 */
window.CMC_KNOWLEDGE = {
  chapters: [
    {
      id: 'limits', group: 'nm', title: '极限与连续', order: 1,
      intro: '竞赛第一道填空题几乎必考极限：等价无穷小、洛必达、泰勒展开三件套，偶尔加上定积分定义或夹逼。',
      goal: '能在 90 秒内判断该用等价无穷小还是泰勒，并写清使用条件。'
    },
    {
      id: 'derivative', group: 'nm', title: '一元微分与中值定理', order: 2,
      intro: '单调性、极值、最值、中值定理证明。竞赛喜欢把“证明不等式”包装成函数单调性问题。',
      goal: '掌握构造辅助函数的三条线索：移项、除以因子、积分因子。'
    },
    {
      id: 'integral', group: 'nm', title: '一元积分', order: 3,
      intro: '换元（尤其三角代换、倒代换）、分部积分、有理函数积分、区间对称性与周期性。',
      goal: '看到 $@sqrt{a^2-x^2}$ 类结构能立刻想到三角代换与配方。'
    },
    {
      id: 'series', group: 'nm', title: '级数与反常积分', order: 4,
      intro: '正项级数判别、交错级数与 Dirichlet 判别、幂级数收敛域、级数求和（裂项、幂级数积分）。',
      goal: '能区分“绝对收敛/条件收敛”，并用部分和估计处理变号级数。'
    },
    {
      id: 'multivariable', group: 'nm', title: '多元微分', order: 5,
      intro: '复合函数链式法则、隐函数求导、方向导数与梯度、无条件/条件极值。',
      goal: '抽象函数二阶偏导不丢项，拉格朗日乘子会写完整方程组。'
    },
    {
      id: 'multiple-integral', group: 'nm', title: '重积分与曲线曲面积分', order: 6,
      intro: '极坐标/球坐标、交换积分次序、Green/Gauss/Stokes 三大公式、挖洞与补面。',
      goal: '先看奇偶对称性再动手，曲面积分先判断“补面后是否闭合”。'
    },
    {
      id: 'ode', group: 'nm', title: '微分方程', order: 7,
      intro: '可分离变量、齐次方程、一阶线性、全微分方程、二阶常系数线性方程。',
      goal: '能识别“看起来不是微分方程”的题（曲线积分条件、几何量关系）。'
    },
    {
      id: 'geometry-linear', group: 'nm', title: '空间解析几何与线性代数', order: 8,
      intro: '平面与直线、距离与夹角、投影、二次曲面；伴随矩阵、特征值与二次型标准化。',
      goal: '会把几何条件翻译成方程，并记住二次曲面标准形的名字。'
    },
    {
      id: 'proof', group: 'nm', title: '不等式与证明方法', order: 9,
      intro: '构造辅助函数、积分放缩、Cauchy–Schwarz、反证法与“取特殊值 + 极限”思想。',
      goal: '遇到“证明存在一点满足…”优先想反证 + 辅助函数单调性。'
    },
    {
      id: 'analysis-limit', group: 'math', title: '极限、连续与一致连续', order: 1,
      intro: '数学类更看重“ε–N/ε–δ”语言、压缩映射、一致连续与函数列收敛。',
      goal: '能把迭代数列问题化归为压缩映射不动点。'
    },
    {
      id: 'analysis-calculus', group: 'math', title: '微分、积分与中值定理', order: 2,
      intro: '中值定理的灵活构造、凸性、含参积分、积分不等式与反常积分敛散性。',
      goal: '会做“存在 ξ 使某式成立”的构造型证明。'
    },
    {
      id: 'analysis-series', group: 'math', title: '级数与含参积分', order: 3,
      intro: '函数项级数一致收敛、含参积分求导（Leibniz 法则）、幂级数与特殊级数求和。',
      goal: '先验证一致收敛再用“积分号下求导”。'
    },
    {
      id: 'algebra', group: 'math', title: '高等代数', order: 4,
      intro: '多项式次数与线性相关、矩阵秩与伴随矩阵、特征值与 Jordan 标准形、二次型。',
      goal: '看到“次数之和”先想线性相关/维数论证。'
    },
    {
      id: 'geometry', group: 'math', title: '解析几何', order: 5,
      intro: '空间直线平面、异面直线公垂线、旋转曲面、二次曲面与正交变换。',
      goal: '把“两球相切”翻译成到两定点距离之和为常数。'
    }
  ],

  points: [
    /* ---------- 非数学类 ---------- */
    {
      id: 'k-lim-equiv', group: 'nm', chapter: 'limits',
      title: '等价无穷小与泰勒展开',
      summary: '极限计算的主力工具：先判型，再决定用等价无穷小（乘除）还是泰勒（加减）。',
      points: [
        '常用等价：$@sin x@sim x$，$@tan x@sim x$，$1-@cos x@sim @frac{x^2}{2}$，$@ln(1+x)@sim x$，$e^x-1@sim x$，$(1+x)^@alpha-1@sim @alpha x$。',
        '加减法中不能随意替换：需展开到“第一个不被抵消的阶”，通常用泰勒到 $x^3$ 或 $x^4$。',
        '遇到 $x@to0$ 时的 $@arctan x-x$、$x-@sin x$ 这类差，直接写出泰勒：$@arctan x=x-@frac{x^3}{3}+o(x^3)$，$@sin x=x-@frac{x^3}{6}+o(x^3)$。'
      ],
      pitfalls: [
        '把等价无穷小用在加减法里，导致高阶项被错误丢弃。',
        '洛必达求导后越求越复杂时不会回头改用泰勒。'
      ]
    },
    {
      id: 'k-lim-integral-def', group: 'nm', chapter: 'limits',
      title: '定积分定义与夹逼',
      summary: '当极限中出现 $@sum f(k/n)@cdot@frac{1}{n}$ 结构时，识别为黎曼和。',
      points: [
        '$@lim_{n@to@infty}@frac{1}{n}@sum_{k=1}^{n}f@left(@frac{k}{n}@right)=@int_0^1 f(x)dx$。',
        '“n 项和 + 根号/阶乘”常用夹逼：先放缩成同一个黎曼和，再取极限。',
        '含 $[x]$、$(-1)^{[x]}$ 的题目先分组（按整数段）再估计。'
      ],
      pitfalls: ['放缩过头导致上下界极限不同；应保证两端收敛到同一值。']
    },
    {
      id: 'k-ode-substitution', group: 'nm', chapter: 'ode',
      title: '一阶微分方程的换元与凑全微分',
      summary: '竞赛题常把方程写成 $M(x,y)dx+N(x,y)dy=0$，关键在识别可换元结构。',
      points: [
        '含 $y^2$、$y^3$ 时令 $u=y^{1-n}$（Bernoulli 方程）或 $u=y^2$。',
        '齐次型令 $u=y/x$；形如 $@frac{dy}{dx}=f(ax+by+c)$ 令 $u=ax+by+c$。',
        '若存在 $@mu(x,y)$ 使 $@mu M dx+@mu N dy=du$，直接凑全微分更省事（如 $@frac{xdy-ydx}{x^2}=d@frac{y}{x}$）。',
        '一阶线性方程 $y\'+P(x)y=Q(x)$ 的通解：$y=e^{-@int Pdx}@left(@int Q e^{@int Pdx}dx+C@right)$。'
      ],
      pitfalls: [
        '换元后忘记把 $dx$ 一并换掉。',
        '除以含 $y$ 的因子时漏掉 $y=0$ 这类特解。'
      ]
    },
    {
      id: 'k-green-gauss', group: 'nm', chapter: 'multiple-integral',
      title: 'Green / Gauss 公式与挖洞补面',
      summary: '曲线积分与曲面积分的核心：先把“闭合”和“奇点”两件事处理好。',
      points: [
        'Green：$@oint_L Pdx+Qdy=@iint_D(Q_x-P_y)dxdy$，要求 $L$ 正向、$P,Q$ 在 $D$ 内连续可微。',
        'Gauss：$@oiint_@Sigma Pdydz+Qdzdx+Rdxdy=@iiint_@Omega(P_x+Q_y+R_z)dV$，$@Sigma$ 取外侧。',
        '被积函数在原点等点无定义时“挖洞”：用足够小的圆/椭圆作辅助曲线，注意内边界方向相反。',
        '曲面积分不闭合时“补面”：补上平面后闭合，再减去补面上的积分（别漏符号和方向）。'
      ],
      pitfalls: [
        '补面后忘记减去补面积分，或把内外侧方向搞反。',
        '挖洞时辅助曲线方向与 Green 公式要求相反。'
      ]
    },
    {
      id: 'k-symmetry', group: 'nm', chapter: 'multiple-integral',
      title: '对称性简化重积分与曲面积分',
      summary: '动手算之前先看对称性：奇函数在对称区域上积分为零，往往能省掉一半计算。',
      points: [
        '区域关于 $x=0$ 对称：$x$ 的奇函数积分为 0，偶函数可化为 2 倍半区域。',
        '轮换对称（如球域关于 $x,y,z$ 轮换）：$@iiint x^2 dV=@iiint y^2 dV=@iiint z^2 dV=@frac{1}{3}@iiint r^2 dV$。',
        '上半球面上 $@iint_S x^3 dS=0$（关于 $yz$ 平面对称）。'
      ],
      pitfalls: ['区域不对称却套用对称性；被积函数对某个变量不是奇函数。']
    },
    {
      id: 'k-multi-chain', group: 'nm', chapter: 'multivariable',
      title: '抽象复合函数的链式法则',
      summary: '$z=f(u,v)$ 且 $u,v$ 是 $x,y$ 的函数时，二阶偏导要“对每个中间变量都求一遍”。',
      points: [
        '$z_x=f_1u_x+f_2v_x$；再对 $y$ 求导时 $f_1,f_2$ 仍是 $(u,v)$ 的函数，要再次用链式法则。',
        '记号 $f_{12}$ 表示先对第 1 个位置、再对第 2 个位置求偏导，混合偏导连续时 $f_{12}=f_{21}$。',
        '常见错误是漏掉 $f_1$ 对 $y$ 的依赖项。'
      ],
      pitfalls: ['把 $f_1$ 当成常数；漏乘 $u_y$ 或 $v_y$。']
    },
    {
      id: 'k-extrema', group: 'nm', chapter: 'multivariable',
      title: '多元函数极值与条件极值',
      summary: '无条件极值先解驻点再用 Hessian 判别；条件极值用拉格朗日乘子。',
      points: [
        '二阶判别：$AC-B^2>0$ 且 $A>0$ 极小、$A<0$ 极大；$AC-B^2<0$ 非极值；$=0$ 需另作判断。',
        '条件极值：构造 $L=f+@lambda g$，解 $@nabla L=0$ 与约束 $g=0$，再比较各候选点函数值。',
        '实际问题注意边界：闭区域上的最值可能在边界取得。'
      ],
      pitfalls: ['只比较驻点，漏掉边界点。', '把 $AC-B^2$ 的符号记反。']
    },
    {
      id: 'k-sequence-monotone', group: 'nm', chapter: 'limits',
      title: '递推数列与单调有界准则',
      summary: '先证有界、再证单调（作差或作商），最后由 $x_{n+1}=f(x_n)$ 取极限解方程。',
      points: [
        '单调性常用作差 $x_{n+1}-x_n$，或把递推写成 $x_{n+1}=f(x_n)$ 后看 $f(x)-x$ 的符号。',
        '有界性通常来自递推结构（如均值不等式 $x+@frac{a}{x}@ge2@sqrt a$）。',
        '极限值满足 $A=f(A)$，需说明取哪个根以及 $A$ 在值域内。',
        '均值迭代 $y_{n+1}=@frac12@left(y_n+@frac{2a}{y_n}@right)$ 从 $y_1>@sqrt{2a}$ 出发单调递减趋于 $@sqrt{2a}$。'
      ],
      pitfalls: ['只证单调不证有界；或只在极限存在的前提下求极限。', '取错根（忽略数列取值范围）。']
    },
    {
      id: 'k-higher-derivative', group: 'nm', chapter: 'derivative',
      title: '高阶导数与莱布尼茨公式',
      summary: '求 $f^{(n)}$ 在一点的值，优先把函数写成“多项式 × 指数/三角”，再用莱布尼茨公式只保留非零项。',
      points: [
        '莱布尼茨公式：$(uv)^{(n)}=@sum_{k=0}^{n}C_n^k u^{(k)}v^{(n-k)}$。',
        '若 $u=(x-a)^n$，则在 $x=a$ 处只有 $k=n$ 的项非零，计算量骤减。',
        '$e^{-x^2}$ 在 $x=-1$ 处的各阶导数可通过“$u=(x+1)^n$ 的因子”筛选。',
        '常用：$(e^{ax})^{(n)}=a^ne^{ax}$，$(@sin ax)^{(n)}=a^n@sin(ax+@frac{n@pi}{2})$。'
      ],
      pitfalls: ['直接把 $n$ 阶导数当成 $n$ 次幂求导。', '莱布尼茨展开后没有代入特殊点化简。']
    },
    {
      id: 'k-triple-integral', group: 'nm', chapter: 'multiple-integral',
      title: '三重积分与球坐标',
      summary: '球域、球壳、空心球优先球坐标；被积函数只含 $x^2+y^2$ 时柱坐标也很快。',
      points: [
        '球坐标：$dV=@rho^2@sin@varphi@,d@rho@,d@varphi@,d@theta$。',
        '球心不在原点时先平移，例如 $x^2+y^2+(z-1)^2@le9$ 令 $z-1=@rho@cos@varphi$。',
        '空心立体用“大减小”，注意被挖去的部分是否跨过坐标平面。',
        '轮换对称：球内 $@iiint x^2dV=@iiint y^2dV=@iiint z^2dV=@frac13@iiint@rho^2dV$。'
      ],
      pitfalls: ['球坐标漏写 $@rho^2@sin@varphi$。', '球心平移后仍按原点写积分限。']
    },
    {
      id: 'k-matrix', group: 'nm', chapter: 'geometry-linear',
      title: '矩阵运算与伴随矩阵',
      summary: '$AA^*=|A|I$ 是处理伴随矩阵的万能钥匙；矩阵方程先化成 $B$ 的一次方程再解。',
      points: [
        '$AA^*=A^*A=|A|I$；$|A^*|=|A|^{n-1}$（$n$ 阶）。',
        '解 $ABA^{-1}=BA^{-1}+3I$ 这类方程：两边左乘 $A^{-1}$、右乘 $A$，整理成 $(I-A^{-1})B=3I$。',
        '实对称矩阵可正交对角化，$B=QD^{1/2021}Q^T$ 是“矩阵开方”的标准构造。',
        '多项式插值：在互异特征值上指定取值，可构造 $p(A)=B$。'
      ],
      pitfalls: ['把 $A^*$ 与 $A^{-1}$ 混用（$A^*=|A|A^{-1}$）。', '矩阵方程两边乘错顺序（矩阵不可交换）。']
    },
    {
      id: 'k-int-techniques', group: 'nm', chapter: 'integral',
      title: '换元、分部与有理函数积分',
      summary: '一元积分的三条主线：三角/根式换元、分部积分降次、有理分式拆项。',
      points: [
        '根式 $@sqrt{a^2-x^2}$ 用 $x=a@sin t$，$@sqrt{x^2+a^2}$ 用 $x=a@tan t$，$@sqrt{x^2-a^2}$ 用 $x=a@sec t$。',
        '分部积分口诀“反对幂三指”：对数、反三角优先取作 $u$。',
        '有理分式先做多项式除法，再拆成部分分式；$@frac{1}{x^2+a^2}$ 积出 $@arctan$。',
        '定积分中别忘了换元同时换上下限，避免回代出错。'
      ],
      pitfalls: ['换元后忘记乘 $dx$ 的 Jacobi 因子。', '三角代换后忘记用反三角回代到原变量。']
    },
    {
      id: 'k-double-integral', group: 'nm', chapter: 'multiple-integral',
      title: '二重积分的极坐标与次序交换',
      summary: '圆、扇形、环域优先极坐标；被积函数含 $f(x)g(y)$ 时考虑交换次序。',
      points: [
        '极坐标：$dxdy=@rho@,d@rho@,d@theta$，圆 $x^2+y^2@le r^2$ 对应 $0@le@rho@le r$。',
        '交换次序前必须画区域，重新确定内外层积分限。',
        '遇到 $@iint e^{x^2+y^2}$、$@iint@frac{1}{x^2+y^2}$ 一律想到极坐标。',
        '先看对称性：奇函数在对称区域上直接得 0。'
      ],
      pitfalls: ['极坐标漏写 $@rho$。', '交换次序后积分限没有跟着改。']
    },
    {
      id: 'k-lines-planes', group: 'nm', chapter: 'geometry-linear',
      title: '空间直线、平面与投影',
      summary: '点、线、面的位置关系全部可以用“方向向量 + 法向量 + 点”三件套处理。',
      points: [
        '直线标准式 $@frac{x-x_0}{l}=@frac{y-y_0}{m}=@frac{z-z_0}{n}$，方向向量 $(l,m,n)$。',
        '点到直线对称：过点作垂面（法向量取直线方向），求交点，再用中点公式。',
        '直线在平面上的投影 = 过直线的平面束中与已知平面垂直的那个平面，与已知平面的交线。',
        '两平面交线方向 = 两法向量叉积。'
      ],
      pitfalls: ['把方向向量误当成平面法向量。', '投影直线直接取原直线方向（方向会改变）。']
    },
    {
      id: 'k-derivative-toolkit', group: 'nm', chapter: 'derivative',
      title: '单调性、极值与最值',
      summary: '竞赛里的函数性态题：求导 → 定符号 → 得单调 → 取端点或驻点。',
      points: [
        '判断 $f\'$ 的符号困难时，把分子单独记为 $g(x)$，再对 $g$ 求导研究其符号。',
        '闭区间最值 = 比较驻点与端点函数值。',
        '证明不等式 $f@ge g$ 常化为 $h=f-g$ 的单调性。',
        '含 $@ln$、$@arctan$ 的复合函数求导后注意定义域端点行为。'
      ],
      pitfalls: ['只算驻点不看端点。', '导数符号判断时忽略分母的符号。']
    },
    {
      id: 'k-meanvalue', group: 'nm', chapter: 'derivative',
      title: '中值定理与函数展开',
      summary: '拉格朗日、柯西中值定理与 Taylor 公式是把“整体信息”转成“某点信息”的桥梁。',
      points: [
        '拉格朗日：$f(b)-f(a)=f\'(@xi)(b-a)$；柯西：两函数增量之比等于导数之比。',
        '证明含 $@xi$ 的恒等式：把结论中的 $@xi$ 换成 $x$，凑成某个函数的导数。',
        'Taylor 展开用于估计余项，展开点与阶数由题目结构决定。',
        '带 $f\'$ 的 Lipschitz 条件，常把 $f(x+h)$ 写成积分再估计。'
      ],
      pitfalls: ['中值定理使用时没有验证连续/可导条件。', 'Taylor 展开阶数不足，余项无法控制。']
    },
    {
      id: 'k-ivt', group: 'math', chapter: 'analysis-calculus',
      title: '介值定理与唯一性',
      summary: '连续函数取遍中间值；配合严格单调即可把“存在”升级为“存在且唯一”。',
      points: [
        '介值定理：$f@in C[a,b]$ 且 $f(a)@le c@le f(b)$，则存在 $@xi$ 使 $f(@xi)=c$。',
        '唯一性通常来自严格单调（或压缩映射）。',
        '“平均值反解”型问题：先夹出积分值的范围，再对 $f^n$ 用介值定理。',
        '极限位置可用“局部积分下界 + 开 $n$ 次方 + 单调性”确定。'
      ],
      pitfalls: ['只证存在不证唯一。', '使用介值定理前没有验证连续性。']
    },
    {
      id: 'k-arc-length', group: 'nm', chapter: 'integral',
      title: '弧长与几何量建模',
      summary: '把几何描述翻译成积分：弧长、旋转体体积、曲面面积都有固定公式。',
      points: [
        '弧长 $s=@int_a^b@sqrt{1+[f\'(x)]^2}dx$；参数式 $@int@sqrt{x\'^2+y\'^2}dt$。',
        '旋转体体积：绕 $z$ 轴用球坐标或柱坐标，先写曲面方程再定积分限。',
        '曲线积分与路径无关的条件可用于把折线路径换成好算的路径。'
      ],
      pitfalls: ['参数方程漏掉 Jacobi 因子。', '旋转面方程写错（绕哪个轴，哪个变量保留）。']
    },
    {
      id: 'k-inequality', group: 'nm', chapter: 'proof',
      title: '积分不等式与函数不等式',
      summary: '构造 $F(t)$ 把不等号变成单调性，或用 Cauchy–Schwarz 一步到位。',
      points: [
        '证明 $@int_a^b f@ge g$：令 $F(t)=@int_a^t(f-g)$，证 $F\'@ge0$ 且 $F(a)@ge0$。',
        'Cauchy–Schwarz：$(@sum a_ib_i)^2@le(@sum a_i^2)(@sum b_i^2)$，积分形式同理。',
        '证明“存在 $@xi$”常用反证：假设不等式反向恒成立，构造辅助函数推出矛盾。',
        '含 $f\'$ 与 $f$ 的不等式，常把 $f(x+h)$ 在 $x$ 处展开并控制余项。'
      ],
      pitfalls: ['只证了严格情形，漏掉等号条件。', '辅助函数构造后没有检查端点值。']
    },
    {
      id: 'k-series-tests', group: 'nm', chapter: 'series',
      title: '数项级数判别法',
      summary: '正项级数看“阶”，变号级数看“绝对值是否收敛 + 部分和是否有界”。',
      points: [
        '比较判别：与 $@frac{1}{n^p}$ 比阶，$p>1$ 收敛；比值/根值判别适合含阶乘、$n$ 次幂。',
        '交错级数：Leibniz（$u_n@downarrow0$）或 Dirichlet（部分和有界 + 单调趋于 0）。',
        '条件收敛的典型：$@sum@frac{(-1)^n}{@sqrt{n}}$；绝对收敛可用比较判别。',
        '二重级数：先固定一个指标估计内层和，再对 $n$ 求和；注意绝对收敛才可交换次序。'
      ],
      pitfalls: ['把“通项趋于 0”当成收敛的充分条件。', '对非单调的变号级数误用 Leibniz。']
    },
    {
      id: 'k-power-series', group: 'nm', chapter: 'series',
      title: '幂级数收敛域与求和',
      summary: '先求收敛半径，再单独检查端点；求和常用逐项求导/积分。',
      points: [
        '$R=@lim@left|@frac{a_n}{a_{n+1}}@right|$ 或 $1/@limsup@sqrt[n]{|a_n|}$；端点必须代入单独判断。',
        '$@sum@frac{x^n}{n}=-@ln(1-x)$（$|x|<1$），$@sum nx^{n-1}=@frac{1}{(1-x)^2}$。',
        '缺项级数（只含 $x^{2n}$）要整体换元，不能直接套公式。'
      ],
      pitfalls: ['忘记检查端点。', '逐项求导后没有同步缩小收敛区间。']
    },
    {
      id: 'k-convergence-improper', group: 'nm', chapter: 'series',
      title: '反常积分的敛散性',
      summary: '把积分拆成若干段，每段只可能有一个“坏点”，再与 $p$ 积分比较。',
      points: [
        '$@int_0^1@frac{dx}{x^p}$：$p<1$ 收敛；$@int_1^{+@infty}@frac{dx}{x^p}$：$p>1$ 收敛。',
        '在坏点附近做等价替换（$@sin x@sim x$、$@ln x$ 的阶），再判阶。',
        '含参反常积分可先证内闭一致收敛，再积分号下求导。'
      ],
      pitfalls: ['上下限都“坏”时没有拆开。', '等价替换在非乘除结构中滥用。']
    },
    {
      id: 'k-symmetry-integral', group: 'nm', chapter: 'integral',
      title: '定积分的对称性与周期性',
      summary: '区间对称先看奇偶，周期函数整周期可平移，能少算就少算。',
      points: [
        '$@int_{-a}^{a}f=0$（奇函数），$=2@int_0^a f$（偶函数）。',
        '周期为 $T$ 时 $@int_a^{a+T}f=@int_0^T f$，且 $@int_0^{nT}=n@int_0^T$。',
        '遇到 $@int_0^@pi x f(@sin x)dx$ 可用 $x@to@pi-x$ 对称化。'
      ],
      pitfalls: ['被积函数不是奇函数却直接写 0。']
    },
    {
      id: 'k-quadratic-surface', group: 'nm', chapter: 'geometry-linear',
      title: '二次曲面与正交变换',
      summary: '二次型 $X^TAX=1$ 经正交变换化为标准形，曲面类型由特征值符号决定。',
      points: [
        '特征值全正：椭球面；两正一负：单叶双曲面；一正两负：双叶双曲面；有零：柱面/锥面。',
        '正交变换步骤：求特征值 → 求特征向量 → Schmidt 正交化 → 单位化 → $X=QY$。',
        '几何对称点：过点作垂面，与直线求交点，再用中点公式。'
      ],
      pitfalls: ['特征向量未正交化就拼成 $Q$。', '只化标准形不说明曲面类型。']
    },

    /* ---------- 数学类 ---------- */
    {
      id: 'k-contraction', group: 'math', chapter: 'analysis-limit',
      title: '压缩映射与迭代数列',
      summary: '只要 $|f(x)-f(y)|@le q|x-y|$（$q<1$），迭代必收敛到唯一不动点。',
      points: [
        '证明收敛：$|x_{n+1}-x_n|@le q^n|x_1-x_0|$，故部分和绝对收敛。',
        '唯一性：若两个不动点 $@xi,@eta$，则 $|@xi-@eta|@le q|@xi-@eta|$，只能相等。',
        '多步迭代 $F_k=f_{n_1}@circ@cdots@circ f_{n_k}$ 的压缩率是各步 Lipschitz 常数之积。'
      ],
      pitfalls: ['只证了 $|f\'|@le1$ 就断言收敛（需要严格小于 1）。']
    },
    {
      id: 'k-uniform-continuity', group: 'math', chapter: 'analysis-limit',
      title: '一致连续与函数列',
      summary: '一致连续的关键是 δ 不依赖于点；闭区间连续必一致连续。',
      points: [
        'Cantor 定理：$[a,b]$ 上连续 ⇒ 一致连续；开区间一般不成立（如 $1/x$）。',
        '证明不一致连续：取两列 $x_n,y_n$ 使 $|x_n-y_n|@to0$ 但 $|f(x_n)-f(y_n)|@ge@varepsilon_0$。',
        '函数列一致收敛可用 sup 范数或 Weierstrass 判别法。'
      ],
      pitfalls: ['把“逐点连续”与“一致连续”混为一谈。']
    },
    {
      id: 'k-meanvalue-construction', group: 'math', chapter: 'analysis-calculus',
      title: '中值定理与辅助函数构造',
      summary: '看到 $@xi f\'\'(@xi)+(@alpha+1)f\'(@xi)>@alpha f(@xi)$ 这类式子，先想“凑导数”。',
      points: [
        '把结论整理成某个函数的导数符号：例如乘以 $x^{@alpha}$ 后可凑出 $(x^{@alpha}f)\'$。',
        '常用构造：$e^{-x}g(x)$、$x^{@alpha}f(x)$、$f(x)/x$、$@int_0^x f$。',
        '反证法：假设不等式恒反向，构造单调函数，再用非负性推出 $f@equiv0$。'
      ],
      pitfalls: ['构造后忘记验证端点/初值条件。']
    },
    {
      id: 'k-parameter-integral', group: 'math', chapter: 'analysis-series',
      title: '含参积分与积分号下求导',
      summary: '先证内闭一致收敛，再求导；求导后化成可积形式。',
      points: [
        '$@varphi(s)=@int_0^{+@infty}@frac{@ln(1+sx^2)}{x(1+x^2)}dx$ 型：对 $s$ 求导得 $@int@frac{x}{(1+x^2)(1+sx^2)}dx$。',
        '部分分式：$@frac{x}{(1+x^2)(1+sx^2)}=@frac{1}{1-s}@left(@frac{x}{1+x^2}-@frac{sx}{1+sx^2}@right)$。',
        '再用 $@sum@frac{1}{n^2}=@frac{@pi^2}{6}$、$@sum@frac{1}{(2n+1)^2}=@frac{@pi^2}{8}$。'
      ],
      pitfalls: ['未验证一致收敛就求导。', '忽略 $s=1$ 的奇点，需取极限处理。']
    },
    {
      id: 'k-series-rearrange', group: 'math', chapter: 'analysis-series',
      title: '条件收敛级数的分组与估计',
      summary: '通项带 $(-1)^{[@sqrt{n}]}$ 时，按整数段分组，把“符号变化”集中到可控的块上。',
      points: [
        '按 $m^2@le n<(m+1)^2$ 分组，每组内部符号相同，可估计该组和。',
        '证明收敛：把原级数写成“收敛级数 + 绝对收敛级数”。',
        '常用估计：$@sum_{k=1}^{N}@frac{1}{k^2+n^2}@to@frac{@pi}{2n}$（用 $@arctan$）。'
      ],
      pitfalls: ['直接对整项用 Leibniz，忽略符号块大小不一致。']
    },
    {
      id: 'k-sylvester', group: 'math', chapter: 'algebra',
      title: '伴随矩阵、秩与特征多项式',
      summary: '伴随矩阵的元素是代数余子式；$@det(sI+AB)=@det(sI+BA)$ 是处理共轭矩阵的利器。',
      points: [
        '$rank(A^*)$：$n$（$rank A=n$）、1（$rank A=n-1$）、0（$rank A<n-1$）。',
        '$A^*$ 的元素是 $a_{ij}^2$ 型条件，先看二阶级子式，再讨论秩。',
        '证明特征多项式为实系数：对实数 $t$ 证 $@overline{p(t)}=p(t)$。'
      ],
      pitfalls: ['忘记 $A^*$ 是转置型代数余子式，行列位置易错。']
    },
    {
      id: 'k-dimension', group: 'math', chapter: 'algebra',
      title: '多项式空间与维数论证',
      summary: '次数之和小于 $@frac{n(n-1)}{2}$ 时，$n$ 个多项式必线性相关。',
      points: [
        '若 $n_i$ 两两不同，则 $n_i@ge i-1$（从小到大排序），故 $@sum n_i@ge@frac{n(n-1)}{2}$。',
        '有相同次数时，用“消去最高次项”的初等变换降低总次数，反复操作直到出现零多项式。',
        '该操作保持等价（不改变线性相关性），因此原向量组相关。'
      ],
      pitfalls: ['只处理了“次数相同”一次，没有说明迭代过程终止。']
    },
    {
      id: 'k-jordan', group: 'math', chapter: 'algebra',
      title: '特征值与 Jordan 标准形',
      summary: '矩阵方程 $X^2=B$ 无解，常用特征值/Jordan 块阶数或秩的矛盾。',
      points: [
        '若 $A^2=B$，则 $A$ 的特征值平方是 $B$ 的特征值。',
        '幂零 Jordan 块 $J_k(0)$ 的平方把块阶数降一：$J_k(0)^2$ 的秩为 $k-2$。',
        '利用 $rank(A^2)@le rank(A)$ 与 $B$ 的秩比较。'
      ],
      pitfalls: ['只看特征值，不看 Jordan 块结构（特征值相同但块不同）。']
    },
    {
      id: 'k-convex', group: 'math', chapter: 'analysis-calculus',
      title: '凸函数的连续性与单调性',
      summary: '开区间上的凸函数必连续，且差商单调。',
      points: [
        '凸函数定义：$f(@alpha x+(1-@alpha)y)@le@alpha f(x)+(1-@alpha)f(y)$。',
        '差商 $@frac{f(x)-f(x_0)}{x-x_0}$ 关于 $x$ 单调不减，由此得连续性。',
        '二元凸函数固定一个变量后是一元凸函数。'
      ],
      pitfalls: ['把“凸”与“凹”的符号方向记反。']
    },
    {
      id: 'k-lines-3d', group: 'math', chapter: 'geometry',
      title: '异面直线与公垂线',
      summary: '混合积判异面，方向向量叉积给公垂线方向，解参数方程求垂足。',
      points: [
        '异面判据：$(r_1-r_2,v_1,v_2)@ne0$。',
        '公垂线方向 $v=v_1@times v_2$；令 $@overrightarrow{P_1P_2}@parallel v$ 解 $t_1,t_2$。',
        '中点轨迹：$@frac{1}{2}(P_1+P_2)$，消去参数得平面或直线方程。'
      ],
      pitfalls: ['把“异面”误判为“相交”；公垂线方向取成某个已知直线方向。']
    },
    {
      id: 'k-distance-locus', group: 'math', chapter: 'geometry',
      title: '距离关系与轨迹曲面',
      summary: '“与两球相切”⇒ 到两球心距离之和/差为常数 ⇒ 椭圆/双曲线旋转面。',
      points: [
        '内切于 $B_1$：$PO_1=R_1-r$；外切于 $B_2$：$PO_2=R_2+r$。',
        '两式相加得 $PO_1+PO_2=R_1+R_2$（常数）⇒ 旋转椭球面。',
        '旋转对称性说明轨迹是旋转面，两个球心是焦点。'
      ],
      pitfalls: ['没有区分内切/外切导致符号错误。']
    },
    {
      id: 'k-proof-methods', group: 'math', chapter: 'analysis-calculus',
      title: '分析证明的三种套路',
      summary: '反证 + 单调性、构造积分因子、把结论写成“某个量的符号”。',
      points: [
        '存在性问题：先假设不存在，得到恒不等式，再积分/求导制造矛盾。',
        '带 $@alpha$ 的不等式：乘 $x^{@alpha}$ 或 $e^{@alpha x}$ 构造全导数。',
        '证明恒为零：证非负且非正；证明唯一：用压缩或严格单调。'
      ],
      pitfalls: ['反证时只否定了一个点，而结论是“存在某点”。']
    }
  ]
};
