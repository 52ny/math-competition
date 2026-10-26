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
  },
  {
    id: 'm-polar', group: 'nm', title: '重积分的坐标选择',
    signal: '区域是圆、环、球、柱，或被积函数含 $x^2+y^2$。',
    prototype: {
      stem: '$D:x^2+y^2@le@pi$，求 $@iint_D(@sin x^2@cos y^2+x@sqrt{x^2+y^2})dxdy$',
      steps: [
        '先看奇偶性：$x@sqrt{x^2+y^2}$ 关于 $x$ 为奇函数，积分为 0。',
        '轮换对称：$I=@iint@sin y^2@cos x^2$，相加得 $2I=@iint@sin(x^2+y^2)$。',
        '极坐标 $dxdy=@rho@,d@rho@,d@theta$，得 $I=@pi$。'
      ],
      answer: '$@pi$'
    },
    pitfalls: ['极坐标漏写 $@rho$。', '球心不在原点时忘记先平移。'],
    knowledge: ['k-double-integral', 'k-triple-integral', 'k-symmetry']
  },
  {
    id: 'm-chain', group: 'nm', title: '复合函数与隐函数求导',
    signal: '抽象函数 $f(u,v)$、隐函数 $F(x,y,z)=0$、方向导数。',
    prototype: {
      stem: '$z=f(xy,@,e^{x+y})$，求 $z_{xy}$',
      steps: [
        '先写 $z_x=yf_1+e^{x+y}f_2$。',
        '再对 $y$ 求导，$f_1,f_2$ 仍是复合函数，各乘一次内层导数。',
        '合并 $f_{12}=f_{21}$：$z_{xy}=xyf_{11}+(x+y)e^{x+y}f_{12}+e^{2(x+y)}f_{22}+f_1+e^{x+y}f_2$。'
      ],
      answer: '$xyf_{11}+(x+y)e^{x+y}f_{12}+e^{2(x+y)}f_{22}+f_1+e^{x+y}f_2$'
    },
    pitfalls: ['把 $f_1$ 当常数，漏掉它自身的偏导。', '隐函数求导忘记 $z$ 也依赖 $x,y$。'],
    knowledge: ['k-multi-chain']
  },
  {
    id: 'm-shape', group: 'nm', title: '函数性态：单调、极值与切线',
    signal: '求最值、判断单调、求切线/法线。',
    prototype: {
      stem: '$f(x)=@frac{1}{@ln(1+x)}-@frac1x$，求 $[0,1]$ 上的最小值与最大值',
      steps: [
        '先通分求 $x@to0^+$ 的极限得 $f(0)=@frac12$。',
        '求导后把分子记为 $g(x)=(1+x)@ln^2(1+x)-x^2$，再对 $g$ 求导。',
        '由 $g\'\'<0$ 得 $g\'<0$、$g<0$，故 $f\'<0$，最小在 $x=1$，最大在 $x=0$。'
      ],
      answer: '$@lambda=@frac1{@ln2}-1$，$@mu=@frac12$'
    },
    pitfalls: ['只算驻点不看端点。', '导数符号判断时忽略分母恒正。'],
    knowledge: ['k-derivative-toolkit']
  },
  {
    id: 'm-sequence', group: 'nm', title: '递推数列：单调有界',
    signal: '$x_{n+1}=f(x_n)$，要求证明收敛并求极限。',
    prototype: {
      stem: '$x_1=2021$，$x_n^2-2(x_n+1)x_{n+1}+2021=0$，求 $@lim x_n$',
      steps: [
        '解出递推并令 $y_n=1+x_n$，得 $y_{n+1}=@frac{y_n}2+@frac{1011}{y_n}$。',
        '均值不等式给下界 $@sqrt{2022}$；$f(x)-x=@frac{2022-x^2}{2x}<0$ 给单调递减。',
        '单调有界 ⇒ 收敛，设极限 $A$ 解 $A=@frac A2+@frac{1011}A$，得 $x_n@to@sqrt{2022}-1$。'
      ],
      answer: '$@sqrt{2022}-1$'
    },
    pitfalls: ['只算不动点就断言收敛。', '忘记验证数列始终大于下界。'],
    knowledge: ['k-sequence-monotone']
  },
  {
    id: 'm-power-series', group: 'nm', title: '幂级数：收敛域与求和',
    signal: '$@sum a_nx^n$、端点敛散、逐项求导/积分求和。',
    prototype: {
      stem: '$@sum_{n=1}^{@infty}[1-n@ln(1+@frac1n)]x^n$ 的收敛域',
      steps: [
        '等价估计 $a_n@sim@frac1{2n}$，得 $R=1$。',
        '$x=1$ 时与调和级数同阶，发散。',
        '$x=-1$ 时构造 $f(x)=x@ln(1+@frac1x)$ 证 $a_n$ 单调递减，Leibniz 收敛，故收敛域 $[-1,1)$。'
      ],
      answer: '$[-1,1)$'
    },
    pitfalls: ['只写 $R=1$ 就当成 $(-1,1)$。', '端点不代入直接下结论。'],
    knowledge: ['k-power-series']
  },
  {
    id: 'm-line-plane', group: 'nm', title: '空间直线、平面与投影',
    signal: '投影、对称点、平面束、两平面交线。',
    prototype: {
      stem: '$L:@frac{x-1}1=@frac y1=@frac{z-1}{-1}$ 在 $@pi:x-y+2z-1=0$ 上的投影方向',
      steps: [
        '把 $L$ 写成一般式 $x-y-1=0$、$y+z-1=0$，设平面束 $x-y-1+@lambda(y+z-1)=0$。',
        '与 $@pi$ 垂直：$(1,@lambda-1,@lambda)@cdot(1,-1,2)=0$，得 $@lambda=-2$。',
        '交线方向为两法向量叉积 $(-8,-4,2)@parallel(-4,-2,1)$，单位化。'
      ],
      answer: '$@pm@frac1{@sqrt{21}}(-4,-2,1)$'
    },
    pitfalls: ['把直线方向当成平面法向量。', '单位方向向量漏掉正负号。'],
    knowledge: ['k-lines-planes']
  },
  {
    id: 'm-quadratic', group: 'nm', title: '二次曲面与正交变换',
    signal: '二次型化标准形、判断曲面类型。',
    prototype: {
      stem: '$x^2-2y^2-2z^2-4xy+4xz+8yz=27$',
      steps: [
        '写二次型矩阵，求特征值 $2,2,-7$。',
        '二重特征值的特征向量 Schmidt 正交化，拼成正交矩阵 $Q$。',
        '标准形 $2x\'^2+2y\'^2-7z\'^2=27$，两正一负 ⇒ 单叶双曲面。'
      ],
      answer: '单叶双曲面'
    },
    pitfalls: ['特征向量未正交化就拼 $Q$。', '只化标准形不说明曲面类型。'],
    knowledge: ['k-quadratic-surface']
  },
  {
    id: 'm-arc', group: 'nm', title: '弧长、旋转体与几何建模',
    signal: '弧长、旋转面、体积等几何量。',
    prototype: {
      stem: '$(x^2+z^2)^2=4(x^2-z^2)$ 绕 $z$ 轴旋转所围体积',
      steps: [
        '旋转面方程：把 $x^2$ 换成 $x^2+y^2$。',
        '球坐标下 $@rho=2@sqrt{-@cos2@varphi}$，$@varphi@in[@frac@pi4,@frac{3@pi}4]$。',
        '对称性取 8 倍，令 $t=@cos@varphi$，用 Wallis 公式得 $@sqrt2@,@pi^2$。'
      ],
      answer: '$@sqrt2@,@pi^2$'
    },
    pitfalls: ['旋转轴与保留变量搞错。', '球坐标积分限写错。'],
    knowledge: ['k-arc-length']
  },
  {
    id: 'm-sylvester', group: 'math', title: '行列式恒等式与特征多项式',
    signal: '特征多项式、共轭矩阵、$@det(sI+AB)$。',
    prototype: {
      stem: '$p(x)$ 为 $I-@overline A A$ 的特征多项式，证 $p$ 为实系数',
      steps: [
        '对实 $t$ 取共轭，$@overline{p(t)}=@det((t-1)I+@overline AA)$。',
        '用 $@det(sI+AB)=@det(sI+BA)$ 交换 $A$ 与 $@overline A$。',
        '得 $@overline{p(t)}=p(t)$ 对实 $t$ 成立，故系数全为实数。'
      ],
      answer: '实系数'
    },
    pitfalls: ['只对特征值取共轭，没处理多项式。', '忽略 $A@overline A$ 与 $@overline AA$ 不可交换。'],
    knowledge: ['k-sylvester']
  },
  {
    id: 'm-skew', group: 'math', title: '异面直线与公垂线',
    signal: '两直线位置关系、公垂线、中点轨迹。',
    prototype: {
      stem: '$l_1,l_2$ 已知，判异面并求公垂线',
      steps: [
        '混合积 $(r_1-r_2,v_1,v_2)@ne0$ ⇒ 异面。',
        '公垂线方向 $v=v_1@times v_2$。',
        '令 $@overrightarrow{P_1P_2}@parallel v$ 解参数，写出标准方程；中点消参得轨迹平面。'
      ],
      answer: '$@frac{x+1}4=@frac{y+1}6=@frac{z+1}8$'
    },
    pitfalls: ['方向向量取成 $v_1$ 或 $v_2$。', '中点只写参数式不消参。'],
    knowledge: ['k-lines-3d']
  },
  {
    id: 'm-locus', group: 'math', title: '距离关系与轨迹曲面',
    signal: '动点到两定点距离之和/差为常数，或与两球相切。',
    prototype: {
      stem: '两球之间与两球都相切的动球，球心轨迹',
      steps: [
        '内切 $PO_1=R_1-r$，外切 $PO_2=R_2+r$。',
        '相加消去 $r$：$PO_1+PO_2=R_1+R_2$（常数）。',
        '旋转对称 ⇒ 旋转椭球面，两球心即焦点。'
      ],
      answer: '旋转椭球面，球心为焦点'
    },
    pitfalls: ['内切/外切符号写反。', '不说明旋转对称直接断言。'],
    knowledge: ['k-distance-locus']
  },
  {
    id: 'm-reverse', group: 'math', title: '反证 + 积分因子构造',
    signal: `结论是“存在一点使严格不等式成立”，或出现 $@xi f''+(@alpha+1)f'$ 这类组合。`,
    prototype: {
      stem: `$@alpha>0$，$f@ge0$，$f(0)=0$，证 $@exists@xi$ 使 $@xi f''(@xi)+(@alpha+1)f'(@xi)>@alpha f(@xi)$`,
      steps: [
        `反证：若恒有 $@le$，令 $h=xf'+@alpha f-@alpha@int_0^xf$，则 $h'@le0$、$h(0)=0$，故 $h@le0$。`,
        `两边乘 $x^{@alpha-1}$ 后积分，化成 $f(x)@le@int_0^xf$。`,
        `令 $g=@int_0^xf$，则 $g'@le g$，即 $(e^{-x}g)'@le0$，配合 $f@ge0$ 逼出 $f@equiv0$，矛盾。`
      ],
      answer: `存在这样的 $@xi$`
    },
    pitfalls: [`反证时把“存在”否定成“存在某点不成立”。`, `积分时漏掉 $x^{@alpha}$ 因子，无法消去。`],
    knowledge: ['k-proof-methods', 'k-meanvalue-construction']
  },
  {
    id: 'm-series-regroup', group: 'math', title: '条件收敛级数的分组与估计',
    signal: `通项含 $(-1)^{[@sqrt n]}$、$[x]$ 等“缓慢变化”的符号。`,
    prototype: {
      stem: `$@sum_{n=2}^{@infty}@frac{(-1)^n}{@sqrt n+(-1)^{[@sqrt n]}}$ 的收敛性`,
      steps: [
        `按奇偶配对，把通项之差拆成“跳变项 + 平滑项”。`,
        `跳变只在 $n=2m^2+2m$ 处发生，其和被 $@sum@frac1{m^2}$ 控制，绝对收敛。`,
        `平滑项由 $@sqrt{2n+1}-@sqrt{2n}$ 给出，也绝对收敛；故配对级数收敛，原级数条件收敛。`
      ],
      answer: `条件收敛`
    },
    pitfalls: [`只证通项趋于 0，没处理符号块。`, `忘记配对后要说明部分和的收敛性。`],
    knowledge: ['k-series-rearrange']
  }
];
