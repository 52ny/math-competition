/* 方法手册：按“同一方法”聚合真题，每个方法给出适用信号、母题与推导骨架
 * 公式约定同其他数据文件：@ 代反斜杠，§ 代换行。
 */
window.CMC_METHODS = [
  {
    id: 'm-equiv', group: 'nm', title: '等价无穷小与泰勒替换',
    signal: '极限是乘除结构，或分子分母出现 $x-@sin x$、$@arctan x-x$、$@ln(1+x)$ 这类“差”。',
    prototype: {
      stem: '$@lim_{x@to0}@dfrac{@arctan x-x}{x-@sin x}$',
      steps: [
        '判断型：$@frac00$，但直接用洛必达会越求越繁。',
        '写出三阶泰勒：$@arctan x=x-@frac{x^3}{3}+o(x^3)$，$@sin x=x-@frac{x^3}{6}+o(x^3)$。',
        '分子 $@sim-@frac{x^3}{3}$，分母 $@sim@frac{x^3}{6}$，相除得 $-2$。'
      ],
      answer: '$-2$'
    },
    pitfalls: ['加减法中不能只换一阶等价（如把 $x-@sin x$ 当成 0）。', '展开阶数要由分母最低阶决定。'],
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'm-power-exp', group: 'nm', title: '幂指函数与洛必达',
    signal: '出现 $[f(x)]^{g(x)}$、连乘、或“$f^g-g^g$”型差。',
    prototype: {
      stem: '$@lim_{x@to0}@dfrac{[f(x)]^{g(x)}-[g(x)]^{g(x)}}{f(x)-g(x)}$，$f,g@to a>0$',
      steps: [
        '提公因式 $[g]^g$，化为 $@frac{(@frac fg)^g-1}{f-g}$。',
        '写成 $e^{g@ln(f/g)}-1@sim g@ln@frac fg$。',
        '再用 $@ln(1+u)@sim u$，$@frac fg-1=@frac{f-g}{g}$，约去 $f-g$ 得 $a^a$。'
      ],
      answer: '$a^a$'
    },
    pitfalls: ['直接对幂指函数求导，链式法则极易出错。', '忽略底数正性（需由保号性说明）。'],
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'm-riemann', group: 'nm', title: '黎曼和、夹逼与定积分定义',
    signal: '极限中出现 $@sum@frac{k}{n^2}f(@frac kn)$ 或 $n$ 项和。',
    prototype: {
      stem: '$@lim_{n@to@infty}@sum_{k=1}^{n}@frac{k}{n^2}@sin^2(1+@frac kn)$',
      steps: [
        '把 $@frac{k}{n^2}$ 拆成 $@frac kn@cdot@frac1n$，识别 $@int_0^1x@sin^2(1+x)dx$。',
        '用 $@sin^2=@frac{1-@cos(2+2x)}2$ 降幂。',
        '分部积分求值，得到 $@frac18(2-2@sin4-@cos4+@cos2)$。'
      ],
      answer: '$@frac18(2-2@sin4-@cos4+@cos2)$'
    },
    pitfalls: ['积分限误写成 $[1,2]$。', '含 $@frac kn$ 的系数没有同时拆出 $@frac1n$。'],
    knowledge: ['k-lim-integral-def']
  },
  {
    id: 'm-mvt-aux', group: 'nm', title: '中值定理与辅助函数',
    signal: '要证“存在 $@xi$ 使某式成立”，或两个导数满足某关系。',
    prototype: {
      stem: '$f@in C[0,1]$ 可导，$f(0)=0,f(1)=1$，证 $@exists@xi@ne@eta$ 使 $[1+f\'(@xi)][1+f\'(@eta)]=4$',
      steps: [
        '先用介值定理找中间点：令 $F=f-2+3x$，得 $x_0$ 使 $f(x_0)=2-3x_0$。',
        '在 $[0,x_0]$、$[x_0,1]$ 上分别用拉格朗日：$f\'(@xi)=@frac{f(x_0)}{x_0}$，$f\'(@eta)=@frac{f(x_0)-1}{x_0-1}$。',
        '代入 $f(x_0)$ 化简，乘积恰为 4。'
      ],
      answer: '见真题解析'
    },
    pitfalls: ['只证存在不证 $@xi@ne@eta$（需说明两个区间不重叠）。', '辅助函数构造后不检查端点值。'],
    knowledge: ['k-meanvalue', 'k-ivt']
  },
  {
    id: 'm-ode', group: 'nm', title: '一阶微分方程的换元与线性化',
    signal: '方程含 $y^2$、$y@,dy$，或可整理成 $y\'+P(x)y=Q(x)$。',
    prototype: {
      stem: '$(x^3-y^2)dx+(x^2y+xy)dy=0$',
      steps: [
        '令 $u=y^2$，则 $2y@,dy=du$，方程化为 $(x^3-u)dx+@frac{x(x+1)}2du=0$。',
        '整理为 $u\'-@frac{2}{x(x+1)}u=-@frac{2x^2}{x+1}$，求积分因子 $@left(@frac{x+1}{x}@right)^2$。',
        '积分得 $@frac{(1+x)^2(x^2+y^2)}{x^2}=C$。'
      ],
      answer: '$(1+x)@sqrt{x^2+y^2}=Cx$'
    },
    pitfalls: ['换元时忘记 $dy=du/(2y)$。', '积分因子指数中的分式拆项符号出错。'],
    knowledge: ['k-ode-substitution']
  },
  {
    id: 'm-green-hole', group: 'nm', title: 'Green 公式与挖洞法',
    signal: '闭曲线积分，且 $Q_x-P_y=0$，但被积函数在原点等处无定义。',
    prototype: {
      stem: '$@oint_L@frac{-y@,dx+x@,dy}{4x^2+y^2}$，$L:x^2+y^2=9$',
      steps: [
        '验证原点外 $Q_x-P_y@equiv0$，不能直接对含奇点的圆盘用 Green。',
        '取椭圆 $L_1:4x^2+y^2=4$ 挖洞，环域上 Green 给出 $@int_L=@int_{-L_1}$。',
        '在椭圆上分母为常数 4，化为 $@frac14@iint2@,dxdy$，得 $@pi$。'
      ],
      answer: '$@pi$'
    },
    pitfalls: ['挖洞后两条曲线方向取成同向。', '直接对含奇点区域用 Green（不合法）。'],
    knowledge: ['k-green-gauss']
  },
  {
    id: 'm-gauss-add', group: 'nm', title: 'Gauss 公式与补面',
    signal: '曲面积分，曲面不闭合（半球、圆盘、柱面的一部分）。',
    prototype: {
      stem: '$@iint_S(x^2-x)dydz+(y^2-y)dzdx+(z^2-z)dxdy$，$S$ 为上半球面上侧',
      steps: [
        '补底面圆盘 $@Sigma:z=0$，与 $S$ 构成闭合曲面外侧。',
        'Gauss：$@iint_{S+@Sigma}=@iiint(2(x+y+z)-3)dV$。',
        '底面上 $z^2-z=0$，补面积分为 0；对称性去掉 $x,y$，得 $@frac{@pi R^4}{2}-2@pi R^3$。'
      ],
      answer: '$@frac{@pi R^4}{2}-2@pi R^3$'
    },
    pitfalls: ['补面方向取反。', '忘记减去补面上的积分。'],
    knowledge: ['k-green-gauss']
  },
  {
    id: 'm-symmetry', group: 'nm', title: '对称性、轮换与降维',
    signal: '积分区域或曲线关于坐标面、原点、变量轮换对称。',
    prototype: {
      stem: '$@oint_@Gamma(1+x)^2ds$，$@Gamma:x^2+y^2+z^2=a^2,@ x+y+z=0$',
      steps: [
        '展开为 $@oint ds+2@oint x@,ds+@oint x^2ds$。',
        '由对称性 $@oint x@,ds=0$；由轮换对称 $@oint x^2ds=@frac13@oint(x^2+y^2+z^2)ds$。',
        '代入 $x^2+y^2+z^2=a^2$ 与 $@oint ds=2@pi a$，得 $2@pi a(1+@frac{a^2}{3})$。'
      ],
      answer: '$2@pi a(1+@frac{a^2}{3})$'
    },
    pitfalls: ['区域不对称却套用对称性。', '$x$ 的一次项忘记先判断奇偶。'],
    knowledge: ['k-symmetry']
  },
  {
    id: 'm-parts-recur', group: 'nm', title: '分部积分与递推',
    signal: '积分型数列 $u_n=@int f^n$，或出现 $@ln$、$@arctan$ 需要降次。',
    prototype: {
      stem: '$u_n=@int_0^1@frac{dt}{(1+t^4)^n}$，求 $@sum u_n/n$',
      steps: [
        '分部积分：$u_n=@frac{1}{2^n}+4n(u_n-u_{n+1})$。',
        '于是 $4(u_n-u_{n+1})=@frac{u_n}{n}-@frac{1}{n2^n}$，对 $n$ 求和后左端裂项。',
        '得 $@sum@frac{u_n}{n}=@sum@frac{1}{n2^n}+4u_1=@ln2+@frac{@sqrt2}{2}[@pi+2@ln(1+@sqrt2)]$。'
      ],
      answer: '$@ln2+@frac{@sqrt2}{2}[@pi+2@ln(1+@sqrt2)]$'
    },
    pitfalls: ['分部积分时 $t^4$ 的系数写错。', '裂项后忘记首项 $4u_1$。'],
    knowledge: ['k-int-techniques', 'k-higher-derivative']
  },
  {
    id: 'm-series-group', group: 'nm', title: '级数判别与分段分组',
    signal: '通项含 $(-1)^{[@sqrt n]}$、$[x]$ 等“缓慢变化”的符号。',
    prototype: {
      stem: '$@sum_{n=1}^{@infty}@frac{(-1)^{[@sqrt n]}}{n}$',
      steps: [
        '按 $m^2@le n<(m+1)^2$ 分组，组内符号相同，记 $C_m=@sum_{k=m^2}^{(m+1)^2-1}@frac1k$。',
        '估计 $@frac{2}{m+1}<C_m<@frac2m$，故 $C_m@downarrow0$。',
        '部分和化为 $@sum(-1)^mC_m$，由 Leibniz 收敛。'
      ],
      answer: '收敛（条件收敛）'
    },
    pitfalls: ['对整项直接用 Leibniz，但符号块长度不一致。', '只估上界不证单调。'],
    knowledge: ['k-series-tests', 'k-convergence-improper']
  },
  {
    id: 'm-matrix-adj', group: 'nm', title: '伴随矩阵与矩阵方程',
    signal: '题中出现 $A^*$、$|A^*|$，或形如 $ABA^{-1}=@cdots$ 的矩阵方程。',
    prototype: {
      stem: '$A^*=@operatorname{diag}(1,16,1)$，$|A|>0$，$ABA^{-1}=BA^{-1}+3I$，求 $B$',
      steps: [
        '由 $|A^*|=|A|^{2}=16$、$|A|>0$ 得 $|A|=4$，故 $A^{-1}=@frac14A^*$。',
        '方程左乘 $A^{-1}$、右乘 $A$，整理成 $(I-A^{-1})B=3I$。',
        '对角矩阵逐项求逆，得 $B=@operatorname{diag}(4,-1,4)$。'
      ],
      answer: '$@operatorname{diag}(4,-1,4)$'
    },
    pitfalls: ['把 $|A^*|$ 当成 $|A|$。', '矩阵方程两边乘的顺序不一致。'],
    knowledge: ['k-matrix']
  },
  {
    id: 'm-amgm-extrema', group: 'nm', title: '均值不等式与多元极值',
    signal: '分式连乘结构，或要求唯一驻点/最值。',
    prototype: {
      stem: '$u=x_1+@frac{x_2}{x_1}+@frac{x_3}{x_2}+@frac{2}{x_3}$，$x_i>0$',
      steps: [
        '写出偏导为零的方程组，解得 $x_1=2^{1/4},x_2=2^{1/2},x_3=2^{3/4}$。',
        '用四项均值不等式 $u@ge4@sqrt[4]{2}$。',
        '等号条件恰好是该点，故为唯一极小值点。'
      ],
      answer: '$(2^{1/4},2^{1/2},2^{3/4})$'
    },
    pitfalls: ['只解出部分变量。', '忘记验证极值唯一性。'],
    knowledge: ['k-extrema', 'k-inequality']
  },
  {
    id: 'm-cauchy-ineq', group: 'nm', title: 'Cauchy–Schwarz 与积分不等式',
    signal: '出现 $@int f@int@frac1f$、$(@int fg)^2$、或 $|AB|$ 型估计。',
    prototype: {
      stem: '$1@le f@le3$，证 $1@le@int_0^1f@int_0^1@frac1f@le@frac43$',
      steps: [
        '下界：Cauchy–Schwarz，$@int f@int@frac1f@ge(@int1)^2=1$。',
        '上界：由 $(f-1)(f-3)@le0$ 得 $f+@frac3f@le4$，积分得 $A+3B@le4$。',
        '由 $AB=@frac13A(3B)@le@frac13(@frac{A+3B}{2})^2@le@frac43$。'
      ],
      answer: '两端均可取到'
    },
    pitfalls: ['Cauchy 配对因子取错。', '只用 $f@le3$ 得不到上界。'],
    knowledge: ['k-inequality']
  },

  /* ---------- 数学类 ---------- */
  {
    id: 'm-contraction', group: 'math', title: '压缩映射与迭代收敛',
    signal: '递推 $x_{n+1}=f(x_n)$，且 $|f\'(x)|@le q<1$；或合成映射。',
    prototype: {
      stem: '$x_{n+1}=a+@varepsilon@sin x_n$，$@varepsilon@in(0,1)$，证收敛且极限为唯一根',
      steps: [
        '$|x_{n+2}-x_{n+1}|@le@varepsilon|x_{n+1}-x_n|$，差分几何衰减。',
        '级数 $@sum(x_{n+1}-x_n)$ 绝对收敛 ⇒ $x_n$ 收敛。',
        '极限满足 $@xi=a+@varepsilon@sin@xi$；两个根之差 $@le@varepsilon|@xi-@eta|$ ⇒ 唯一。'
      ],
      answer: '极限存在且为 $x-@varepsilon@sin x=a$ 的唯一根'
    },
    pitfalls: ['只证 $|f\'|@le1$ 就断言收敛（需严格小于 1）。', '多步合成时压缩比要相乘。'],
    knowledge: ['k-contraction']
  },
  {
    id: 'm-rolle-build', group: 'math', title: '罗尔定理与辅助函数构造',
    signal: '要证 $f\'(@xi)=f(@xi)$、$f\'\'(@xi)=f(@xi)$，或出现 $@int_a^b f=0$。',
    prototype: {
      stem: '$f(a)=f(b)=0$，$@int_a^bf=0$，证 $@exists x_1@ne x_2$ 使 $f\'(x_i)=f(x_i)$',
      steps: [
        '令 $F=e^{-x}@int_a^xf$，由 $F(a)=F(b)=0$ 得 $x_0$ 使 $f(x_0)=@int_a^{x_0}f$。',
        '再令 $G=f-@int_a^xf$，则 $G(a)=G(x_0)=G(b)=0$。',
        '在 $[a,x_0]$、$[x_0,b]$ 上分别罗尔，得两个不同的 $x_i$。'
      ],
      answer: '见真题解析'
    },
    pitfalls: ['只找一个零点，无法得到两个不同点。', '辅助函数求导后与目标式差一个因子。'],
    knowledge: ['k-meanvalue-construction', 'k-meanvalue']
  },
  {
    id: 'm-param-int', group: 'math', title: '含参积分与积分号下求导',
    signal: '$@varphi(s)=@int@frac{@ln(1+sx^2)}{x(1+x^2)}dx$ 这类带参数的积分。',
    prototype: {
      stem: '$@varphi(s)=@int_0^{+@infty}@frac{@ln(1+sx^2)}{x(1+x^2)}dx$，求 $@varphi(1)$',
      steps: [
        '先证内闭一致收敛（用 $@ln(1+t)@le C@sqrt t$）。',
        '求导：$@varphi\'(s)=@int@frac{x}{(1+x^2)(1+sx^2)}dx=-@frac{@ln s}{2(1-s)}$。',
        '积分回 $s$：$@varphi(1)=@sum@frac{1}{2n^2}=@frac{@pi^2}{12}$。'
      ],
      answer: '$@frac{@pi^2}{12}$'
    },
    pitfalls: ['未验证一致收敛就求导。', '$s=1$ 的奇点未单独处理。'],
    knowledge: ['k-parameter-integral']
  },
  {
    id: 'm-euler-gauss', group: 'nm', title: '齐次函数 Euler 定理 + Gauss',
    signal: '被积函数是齐次多项式/齐次函数，区域是球面。',
    prototype: {
      stem: '$f$ 为 4 次齐次，求 $@oiint_{x^2+y^2+z^2=1}f@,dS$',
      steps: [
        'Euler：$xf_x+yf_y+zf_z=4f$。',
        '球面外法向为 $(x,y,z)$，故 $@oiint f@,dS=@frac14@oiint(f_x@cos@alpha+@cdots)dS$。',
        'Gauss 转成 $@frac14@iiint@Delta f@,dV$，用 $@iiint x^2dV=@frac{4@pi}{15}$ 与对称性得 $@frac{4@pi}{5}@sum a_i$。'
      ],
      answer: '$@frac{4@pi}{5}@sum a_i$'
    },
    pitfalls: ['漏掉系数 $@frac14$。', '展开 $@Delta f$ 时交叉项系数错。'],
    knowledge: ['k-symmetry', 'k-green-gauss']
  },
  {
    id: 'm-jordan', group: 'math', title: '特征值与 Jordan 标准形',
    signal: '矩阵方程 $X^2=B$、$X^k=B$，或只给特征值信息。',
    prototype: {
      stem: '$B$ 为三阶幂零 Jordan 块，证 $X^2=B$ 无解',
      steps: [
        '由特征值关系，$X$ 的特征值全为 0。',
        '列出 $X$ 可能的 Jordan 形 $O,J_2(0),J_3(0)$。',
        '平方后秩 $@le1$，而 $B$ 的秩为 2，矛盾。'
      ],
      answer: '无解'
    },
    pitfalls: ['只比较特征值，不看块阶数。', '误以为 $J_3(0)^2=O$。'],
    knowledge: ['k-jordan']
  },
  {
    id: 'm-dimension', group: 'math', title: '维数论证与线性相关',
    signal: '多项式/函数组的次数和、取值矩阵、线性无关。',
    prototype: {
      stem: '$f_i$ 次数 $n_i$，$@sum n_i<@frac{2023@times2024}{2}$，证 $f_i$ 线性相关',
      steps: [
        '反证：若次数两两不同并排序，则 $n_i@ge i-1$，求和 $@ge@frac{2023@times2024}{2}$，矛盾。',
        '故有两个同次多项式，消去最高次项得到等价且总次数更小的组。',
        '迭代至出现零多项式，原组线性相关。'
      ],
      answer: '线性相关'
    },
    pitfalls: ['只消元一次，未说明迭代终止。', '忽略零多项式的退化情形。'],
    knowledge: ['k-dimension']
  },
  {
    id: 'm-convex', group: 'math', title: '凸性与差商估计',
    signal: '已知凸函数/凸区域，要求连续性、单调性或不等式。',
    prototype: {
      stem: '$f$ 在凸区域上凸，证 $f$ 连续',
      steps: [
        '一元情形：差商关于 $x$ 单调，得到 $x_0$ 处的双边夹逼。',
        '二元：固定一个变量化为一元凸函数。',
        '在 $(x_0,y_0)$ 的小方形内得到 $|f(x,y)-f(x_0,y_0)|@le M(|x-x_0|+|y-y_0|)$。'
      ],
      answer: '连续'
    },
    pitfalls: ['只写“凸函数当然连续”。', '没有用到区域是开的，取不到小方形。'],
    knowledge: ['k-convex']
  }
];
