/* 数学类题库：中国大学生数学竞赛（CMC）初赛 / 决赛
 * 公式约定：$...$ 或 $$...$$ 包裹，反斜杠写作 @，矩阵换行写作 §。
 */
window.CMC_QUESTIONS_MATH = [
  /* ================= 第16届初赛（2024）数学 A ================= */
  {
    id: 'm2024-1', group: 'math', edition: 16, year: 2024, stage: '初赛', paper: '数学类 A 卷',
    topic: 'geometry', type: 'solution', score: 15, difficulty: 5,
    stem: `设双叶双曲面 $S:x^2+y^2-z^2=-2$，点 $M_0(1,1,-1)$。以 $M_0$ 为顶点且与 $S$ 的上半叶 $$S^+={(x,y,z)@in S@mid z@ge@sqrt2}$$ 相切的所有直线构成锥面 $@Sigma$。(1) 求 $@Sigma$ 的方程；(2) 求 $S^+@cap@Sigma$ 所在平面 $@pi$ 的方程。`,
    answer: `(1) $(x-1)^2+(y-1)^2-2(z+1)^2-(x-1)(y-1)-(x-1)(z+1)-(y-1)(z+1)=0$；(2) $x+y+z+2=0$`,
    accept: [],
    solution: [
      `过 $M_0$ 方向为 $(l,m,n)$ 的直线：$x-1=lt,@ y-1=mt,@ z+1=nt$。代入 $S$：$$(l^2+m^2-n^2)t^2+2(l+m+n)t+3=0.$$`,
      `相切要求判别式为零：$4(l+m+n)^2-12(l^2+m^2-n^2)=0$，即 $$l^2+m^2-2n^2-lm-ln-mn=0.$$ 把 $(l,m,n)$ 换成 $(x-1,y-1,z+1)$ 得锥面方程。`,
      `(2) 设 $M_1(x_1,y_1,z_1)@in S^+@cap@Sigma$，$M_0M_1$ 上点写成 $M_1+t(M_1-M_0)$。代入 $S$ 并利用 $x_1^2+y_1^2-z_1^2=-2$，得 $$(-1-2x_1-2y_1+2z_1)t^2-2(x_1+y_1+z_1+2)t=0.$$`,
      `相切意味着该二次方程有重根（$t=0$ 为切点），故 $x_1+y_1+z_1+2=0$，即 $@pi:x+y+z+2=0$。`
    ],
    hints: ['设过顶点的直线参数方程，代入曲面得关于 $t$ 的二次方程。', '相切 ⇔ 判别式为零，得到方向 $(l,m,n)$ 满足的齐次二次式。', '把方向换成 $(x-1,y-1,z+1)$ 即得锥面；第 (2) 问是把“直线与曲面相切”转化为重根。'],
    pitfalls: ['把锥面顶点写成 $M_0$ 的坐标却忘了平移，直接把 $x,y,z$ 代入。', '第 (2) 问只算锥面与曲面的交线，没有说明它落在平面上。'],
    takeaway: '锥面 = 过定点的直线族与曲面相切的条件；方向齐次式直接给出锥面方程（顶点平移后代入）。',
    knowledge: ['k-lines-3d', 'k-quadratic-surface']
  },
  {
    id: 'm2024-2', group: 'math', edition: 16, year: 2024, stage: '初赛', paper: '数学类 A 卷',
    topic: 'analysis-series', type: 'solution', score: 15, difficulty: 5,
    stem: `设 $s@ge0$，$$@varphi(s)=@int_0^{+@infty}@frac{@ln(1+sx^2)}{x(1+x^2)}@,dx.$$ 求 $@varphi(1)$ 和 $@varphi(2)$。`,
    answer: `$@varphi(1)=@dfrac{@pi^2}{12}$，$@varphi(2)=@dfrac{@pi^2}{8}$`,
    accept: ['π^2/12 和 π^2/8'],
    solution: [
      `先证内闭一致收敛（用 $@ln(1+t)@le C@sqrt t$），故 $@varphi$ 连续。对 $s>0$ 在积分号下求导：$$@varphi'(s)=@int_0^{+@infty}@frac{x}{(1+x^2)(1+sx^2)}dx=\\frac{1}{1-s}@int_0^{+@infty}@left(@frac{x}{1+x^2}-@frac{sx}{1+sx^2}@right)dx.$$`,
      `计算得 $$@varphi'(s)=@frac{1}{2(1-s)}@ln@frac{1+x^2}{1+sx^2}@Bigg|_0^{+@infty}=-@frac{@ln s}{2(1-s)}.$$`,
      `由 $@varphi(0)=0$：$$@varphi(1)=-@int_0^1@frac{@ln s}{2(1-s)}ds=-@int_0^1@frac{@ln(1-s)}{2s}ds=@sum_{n=1}^{@infty}@frac{1}{2n^2}=@frac{@pi^2}{12}.$$`,
      `同理 $$@varphi(2)=-@int_0^2@frac{@ln s}{2(1-s)}ds=-@int_{-1}^{1}@frac{@ln(1-s)}{2s}ds=@sum_{n=0}^{@infty}@frac{1}{(2n+1)^2}=@frac{@pi^2}{8}.$$`
    ],
    hints: ['含参积分：先验证一致收敛，再对 $s$ 求导。', '求导后是部分分式，可拆成 $@frac{x}{1+x^2}$ 与 $@frac{sx}{1+sx^2}$。', '用 $@sum 1/n^2=@pi^2/6$ 与 $@sum 1/(2n+1)^2=@pi^2/8$。'],
    pitfalls: ['直接交换积分与求导，未说明一致收敛（竞赛会扣分）。', '$s=1$ 时分母 $1-s=0$，需取极限或单独讨论。'],
    takeaway: '含参积分三板斧：一致收敛 → 求导 → 化为已知级数；遇到 $s=1$ 的奇点单独取极限。',
    knowledge: ['k-parameter-integral']
  },
  {
    id: 'm2024-3', group: 'math', edition: 16, year: 2024, stage: '初赛', paper: '数学类 A 卷',
    topic: 'algebra', type: 'solution', score: 20, difficulty: 5,
    stem: `设 $A=(a_{ij})_{3@times3}$ 为实矩阵，其伴随矩阵 $A^*$ 满足 $$A^*=@begin{pmatrix}a_{11}^2&a_{12}^2&a_{13}^2§a_{21}^2&a_{22}^2&a_{23}^2§a_{31}^2&a_{32}^2&a_{33}^2@end{pmatrix}.$$ 求 $A$。`,
    answer: `$A=O$`,
    accept: ['A=0', 'A=O'],
    solution: [
      `由 $A$ 不可逆时 $rank(A^*)@le1$，只需讨论 $rank(A^*)=0$ 与 $rank(A^*)=1$。若 $rank(A^*)=0$，则 $A^*=O$，得所有 $a_{ij}=0$。`,
      `若 $rank(A^*)=1$，则 $A^*$ 的所有二阶子式为 0。特别地 $a_{11}^2a_{22}^2=a_{12}^2a_{21}^2$，即 $a_{11}a_{22}=@pm a_{12}a_{21}$，另外两组同理。`,
      `若某个等式取正号（如 $a_{11}a_{22}=a_{12}a_{21}$），则 $A$ 的一个二阶子式为 0，而它正是 $a_{33}$ 的代数余子式，故 $a_{33}^2=0$，$a_{33}=0$；对其它元素同理可推出至少一个 $a_{ij}=0$。`,
      `若三个等式都取负号，三式相乘得 $a_{11}a_{22}a_{21}a_{32}a_{12}a_{31}=-a_{11}a_{22}a_{21}a_{32}a_{12}a_{31}$，故乘积为 0，也至少有一个 $a_{ij}=0$。`,
      `设 $a_{11}=0$。若 $A^*$ 第一列不全零，由秩 1 知后两列是它的倍数，推出 $A^*$ 第一行全零，从而 $A$ 有一整行（列）为零，进一步推出 $A^*=O$，与秩 1 矛盾。故只能 $A=O$。`
    ],
    hints: ['先由 $rank(A^*)@le1$ 分两种情形。', '伴随矩阵元素是代数余子式，若某个二阶子式为 0，则对应位置的余子式为 0。', '构造“三式相乘”消去符号，说明必有元素为 0。'],
    pitfalls: ['直接假设 $A$ 可逆（此时 $A^*$ 的行列式条件不适用）。', '混淆 $A^*$ 与 $A^T$ 的位置。'],
    takeaway: '伴随矩阵题先定秩（$n,1,0$ 三档）；秩 1 时所有二阶子式为 0，是制造方程的核心。',
    knowledge: ['k-sylvester']
  },
  {
    id: 'm2024-4', group: 'math', edition: 16, year: 2024, stage: '初赛', paper: '数学类 A 卷',
    topic: 'algebra', type: 'solution', score: 15, difficulty: 4,
    stem: `设 $f_i(x)@in@mathbb{R}[x]$ 的次数为 $n_i$（$1@le i@le2024$，零多项式次数约定为 $-@infty$），且 $$@sum_{i=1}^{2024}n_i<2047276=@frac{2023@times2024}{2}.$$ 证明：$f_1,f_2,@cdots,f_{2024}$ 在 $@mathbb{R}[x]$ 中线性相关。`,
    answer: `见解析（次数之和不足维数下界）`,
    accept: [],
    solution: [
      `若有零多项式，结论显然。否则设次数两两不同并排序 $n_1<n_2<@cdots<n_{2024}$，则 $n_i@ge i-1$，从而 $@sum n_i@ge@frac{2023@times2024}{2}$，与题设矛盾，故必有两个次数相同。`,
      `设 $deg f_i=deg f_j=n$，$f_i=ax^n+@cdots$，$f_j=bx^n+@cdots$（$a,b@ne0$）。令 $g=f_i-@frac ab f_j$，则 $deg g<n$。`,
      `用 $g$ 替换 $f_i$ 得到等价向量组，且总次数严格下降。反复操作，总次数非负严格递减，必在某一步出现零多项式，故原向量组线性相关。`
    ],
    hints: ['反证：若线性无关，次数必须“足够大”。', '次数两两不同时，$n_i@ge i-1$，求和得到维数下界。', '次数相同时消去最高次项，构造一个等价但总次数更小的向量组。'],
    pitfalls: ['只说“消去最高次”一次，没有说明迭代一定终止。', '把“等价变换”与“线性相关”混淆，需说明变换可逆。'],
    takeaway: '多项式空间的线性相关题几乎都靠“次数之和 vs 维数下界”；同次消元是可逆变换，不改变相关性。',
    knowledge: ['k-dimension']
  },
  {
    id: 'm2024-5', group: 'math', edition: 16, year: 2024, stage: '初赛', paper: '数学类 A 卷',
    topic: 'analysis-series', type: 'solution', score: 15, difficulty: 5,
    stem: `讨论级数 $$@sum_{n=2}^{@infty}@frac{(-1)^n}{n+(-1)^{[@sqrt n]}},@qquad @sum_{n=2}^{@infty}@frac{(-1)^n}{@sqrt n+(-1)^{[@sqrt n]}}$$ 的收敛性（$[x]$ 为 $x$ 的整数部分）。`,
    answer: `两者都收敛（均为条件收敛）`,
    accept: ['均条件收敛'],
    solution: [
      `第一个：与 $@sum@frac{(-1)^n}{n}$ 比较，$$@left|@frac{(-1)^n}{n+(-1)^{[@sqrt n]}}-@frac{(-1)^n}{n}@right|@le@frac{1}{n(n-1)},$$ 故差级数绝对收敛；而 $@sum@frac{(-1)^n}{n}$ 收敛，所以原级数收敛。显然不绝对收敛，故条件收敛。`,
      `第二个：按奇偶项配对，考察 $$@sum_{n}@left(@frac{1}{@sqrt{2n}+(-1)^{[@sqrt{2n}]}}-@frac{1}{@sqrt{2n+1}+(-1)^{[@sqrt{2n+1}]}}@right).$$`,
      `当 $[@sqrt{2n+1}]@ne[@sqrt{2n}]$ 时符号差为 2，这只能在 $n=2m^2+2m$ 时发生，对应项之和被 $@sum@frac{2}{(2m)@cdot(2m+1)}$ 控制，绝对收敛；其余项由 $@sqrt{2n+1}-@sqrt{2n}$ 给出，也是绝对收敛的。`,
      `故配对后的级数收敛，从而原级数收敛；而 $@sum@frac{1}{@sqrt n}$ 发散，故为条件收敛。`
    ],
    hints: ['先与 $@sum(-1)^n/n$ 或 $@sum(-1)^n/@sqrt n$ 作差，把“异常项”分离出来。', '注意 $(-1)^{[@sqrt n]}$ 在大部分 $n$ 上变化很慢，只在平方数附近跳变。', '按奇偶配对后，把“跳变项”与“平滑项”分别估计。'],
    pitfalls: ['直接说“通项趋于 0 所以收敛”。', '忽略 $[@sqrt{2n+1}]-[@sqrt{2n}]$ 只在少数 $n$ 处为 1。'],
    takeaway: '带 $[@sqrt n]$ 的级数：先与标准交错级数作差；差项用 $@frac{1}{n^2}$ 控制即可。',
    knowledge: ['k-series-rearrange']
  },
  {
    id: 'm2024-6', group: 'math', edition: 16, year: 2024, stage: '初赛', paper: '数学类 A 卷',
    topic: 'analysis-limit', type: 'solution', score: 20, difficulty: 5,
    stem: `(1) 设 $f_1(t)=@dfrac{t+3}{2}$，$f_2(t)=@dfrac{t+6}{3}$，$@left@{n_k@right@}$ 为取值于 $@left@{1,2@right@}$ 的整数列。令 $F_1=f_{n_1}$，$F_{k+1}(t)=F_k(f_{n_{k+1}}(t))$。证明：对任意 $x@in@mathbb{R}$，极限 $@lim_{k@to+@infty}F_k(x)$ 存在且与 $x$ 无关。(2) 若把 $f_1,f_2$ 换成 $f_1(t)=t-@arctan t$，$f_2(t)=2@arctan t-t$，结论如何？`,
    answer: `(1) 极限恒为 3；(2) 结论仍成立，极限恒为 0`,
    accept: [],
    solution: [
      `(1) $f_1'=@frac12$，$f_2'=@frac13$，故两者都是压缩映射，压缩比 $@le@frac12$，且共同不动点为 $t=3$。`,
      `于是 $$|F_k(x)-3|@le@frac{1}{2}|f_{n_2}@circ@cdots@circ f_{n_k}(x)-3|@le@cdots@le@frac{1}{2^k}|x-3|@to0.$$`,
      `(2) $f_1'=@frac{t^2}{1+t^2}$，$f_2'=@frac{1-t^2}{1+t^2}$，均满足 $|f_i'|@le1$，且 $|f_i'|=1$ 只在 $t=0$。共同不动点为 $0$，且 $|f_i(t)|@le|t|$。`,
      `若 $F_k(x)@nrightarrow0$，则存在子列满足 $0<@delta@le|F_{m_k}(x)|@le|x|$。在有界闭集 $@left@{@delta/2@le|t|@le|x|@right@}$ 上 $|f_i'|@le@ell<1$，用中值定理得每步至少压缩 $@ell$，矛盾。故极限为 0。`
    ],
    hints: ['(1) 先算导数，发现两个函数都是压缩映射，且不动点都是 3。', '(2) 导数绝对值不大于 1，但只在 0 处取到 1，不能直接用统一压缩比。', '反证 + 子列 + 在“远离 0”的紧集上获得一致的压缩比 $@ell<1$。'],
    pitfalls: ['(1) 只说“压缩映射”不写压缩比和不动点。', '(2) 误以为 $|f\'(0)|=1$ 就一定不收敛。'],
    takeaway: '迭代收敛题：先找不动点，再找压缩比；非一致压缩时用“反证 + 紧集上的一致压缩”。',
    knowledge: ['k-contraction']
  },

  /* ================= 第11届初赛（2019）数学 A ================= */
  {
    id: 'm2019-1', group: 'math', edition: 11, year: 2019, stage: '初赛', paper: '数学类 A 卷',
    topic: 'geometry', type: 'solution', score: 15, difficulty: 4,
    stem: `空间中有两个球面 $B_1,B_2$，$B_2$ 包含在 $B_1$ 所围球体内部，两球面之间的闭区域为 $D$。设 $B$ 是含在 $D$ 中且与 $B_1,B_2$ 均相切的球。(1) $B$ 的球心轨迹曲面 $S$ 是何种曲面？(2) $B_1,B_2$ 的球心是 $S$ 的何种点？证明你的论断。`,
    answer: `$S$ 是旋转椭球面，两球心为其两个焦点`,
    accept: ['旋转椭球面，焦点'],
    solution: [
      `设 $B_1$ 球心 $O_1$、半径 $R_1$，$B_2$ 球心 $O_2$、半径 $R_2$；动球 $B$ 球心 $P$、半径 $r$。`,
      `$B$ 内切于 $B_1$：$PO_1=R_1-r$；$B$ 外切于 $B_2$：$PO_2=R_2+r$。两式相加得 $$PO_1+PO_2=R_1+R_2@ (@text{常数}).$$`,
      `区域 $D$ 关于直线 $O_1O_2$ 旋转对称，故轨迹也绕该轴旋转。在任一含该轴的平面上，$PO_1+PO_2$ 为常数，轨迹是椭圆。`,
      `所以 $S$ 是旋转椭球面，旋转轴为 $O_1O_2$，$O_1,O_2$ 恰为两个焦点。`
    ],
    hints: ['把“相切”翻译成球心距与半径的关系。', '内切：$PO_1=R_1-r$；外切：$PO_2=R_2+r$。', '相加消去 $r$，得到到两定点距离之和为常数。'],
    pitfalls: ['内切、外切的符号写反。', '没有说明旋转对称性，直接断言是椭球面。'],
    takeaway: '“与两球相切”是椭圆的物理原型：到两焦点距离之和为常数；三维中再补一句旋转对称。',
    knowledge: ['k-distance-locus']
  },
  {
    id: 'm2019-2', group: 'math', edition: 11, year: 2019, stage: '初赛', paper: '数学类 A 卷',
    topic: 'analysis-calculus', type: 'solution', score: 15, difficulty: 5,
    stem: `设 $@alpha>0$，$f(x)$ 在 $[0,1]$ 上非负、有二阶导函数，$f(0)=0$，且在 $[0,1]$ 上不恒为零。证明：存在 $@xi@in(0,1)$，使得 $$@xi f''(@xi)+(@alpha+1)f'(@xi)>@alpha f(@xi).$$`,
    answer: `见解析（反证 + 两次积分 + $e^{-x}g$ 单调）`,
    accept: [],
    solution: [
      `反证：若对一切 $x@in[0,1]$ 有 $xf''+(@alpha+1)f'@le@alpha f$，则函数 $$h(x)=xf'(x)+@alpha f(x)-@alpha@int_0^x f(u)du$$ 满足 $h'@le0$，且 $h(0)=0$，故 $h@le0$，即 $$xf'(x)+@alpha f(x)@le@alpha@int_0^xf(u)du.$$`,
      `两边乘 $x^{@alpha-1}$：$(x^{@alpha}f(x))'@le@alpha x^{@alpha-1}@int_0^xf(u)du$。在 $[0,x]$ 上积分：$$x^{@alpha}f(x)@le@alpha@int_0^xt^{@alpha-1}@left(@int_0^tf(u)du@right)dt@le x^{@alpha}@int_0^xf(u)du,$$ 即 $f(x)@le@int_0^xf(u)du$。`,
      `令 $g(x)=@int_0^xf$，则 $g'@le g$，即 $(e^{-x}g)'@le0$。由 $g(0)=0$ 得 $g@le0$；但 $f@ge0$ 给出 $g@ge0$，故 $g@equiv0$，$f@equiv0$，与 $f$ 不恒为零矛盾。`
    ],
    hints: ['结论是“存在 $@xi$ 使 $>$”，反证最自然：假设恒 $@le$。', '把 $xf\'\'+(@alpha+1)f\'-@alpha f$ 看成某个函数的导数，乘以 $x^{@alpha}$ 更容易凑。', '最后化到 $f@le@int_0^x f$，再用 $e^{-x}g$ 的单调性逼出 $f@equiv0$。'],
    pitfalls: ['反证时假设“对所有 $x$ 都 $@le$”写成了“存在 $x$ 使 $@le$”。', '积分时漏掉 $x^{@alpha}$ 因子导致无法消去。'],
    takeaway: '看到 $xf\'\'+(@alpha+1)f\'$ 就想 $(x^{@alpha}f)\'\'$ 展开后的形状；这类题的标准收尾是“非负 + 非正 ⇒ 恒零”。',
    knowledge: ['k-meanvalue-construction', 'k-proof-methods']
  },
  {
    id: 'm2019-3', group: 'math', edition: 11, year: 2019, stage: '初赛', paper: '数学类 A 卷',
    topic: 'algebra', type: 'solution', score: 15, difficulty: 4,
    stem: `设 $A$ 为 $n$ 阶复方阵，$p(x)$ 为 $I-@overline{A}A$ 的特征多项式，其中 $@overline A$ 表示 $A$ 的共轭矩阵。证明：$p(x)$ 必为实系数多项式。`,
    answer: `见解析（利用 $@det(sI+AB)=@det(sI+BA)$）`,
    accept: [],
    solution: [
      `对实数 $t$，$p(t)=@det((t-1)I+A@overline A)$。取共轭：$$@overline{p(t)}=@det((t-1)I+@overline A A).$$`,
      `用恒等式 $@det(sI+AB)=@det(sI+BA)$（可由 $B$ 的可逆逼近或分块初等变换证明），取 $B=@overline A$：$$@overline{p(t)}=@det((t-1)I+@overline AA)=@det((t-1)I+A@overline A)=p(t).$$`,
      `于是 $p(t)$ 对所有实数 $t$ 取实值，其系数必为实数。`
    ],
    hints: ['要证“实系数”，只需证 $p(t)$ 在实数 $t$ 上取实值。', '对 $p(t)$ 取共轭，利用 $@overline{@det M}=@det@overline M$。', '用 $@det(sI+AB)=@det(sI+BA)$ 交换 $A$ 与 $@overline A$ 的位置。'],
    pitfalls: ['只对特征值取共轭，而没有处理整个多项式。', '忘记 $A@overline A$ 与 $@overline AA$ 一般不可交换。'],
    takeaway: '“特征多项式是实系数”类问题：证 $p(t)@in@mathbb{R}$（$t@in@mathbb{R}$），核心工具是行列式交换恒等式。',
    knowledge: ['k-sylvester']
  },

  /* ================= 第2届初赛（2010）数学类 ================= */
  {
    id: 'm2010-1', group: 'math', edition: 2, year: 2010, stage: '初赛', paper: '数学类',
    topic: 'analysis-limit', type: 'solution', score: 10, difficulty: 3,
    stem: `设 $@varepsilon@in(0,1)$，$x_0=a$，$x_{n+1}=a+@varepsilon@sin x_n$（$n=0,1,2,@cdots$）。证明：$@xi=@lim_{n@to+@infty}x_n$ 存在，且 $@xi$ 为方程 $x-@varepsilon@sin x=a$ 的唯一根。`,
    answer: `见解析（压缩映射，$@varepsilon<1$）`,
    accept: [],
    solution: [
      `由中值定理 $|@sin x-@sin y|@le|x-y|$，所以 $$|x_{n+2}-x_{n+1}|@le@varepsilon|x_{n+1}-x_n|@le@cdots@le@varepsilon^{n+1}|x_1-x_0|.$$`,
      `故 $@sum(x_{n+1}-x_n)$ 绝对收敛，从而 $x_n$ 收敛，记为 $@xi$。对递推式取极限得 $@xi=a+@varepsilon@sin@xi$。`,
      `唯一性：若 $@eta$ 也满足，则 $|@xi-@eta|@le@varepsilon|@xi-@eta|$，由 $@varepsilon<1$ 得 $@xi=@eta$。`
    ],
    hints: ['证明差分的几何衰减：$|x_{n+2}-x_{n+1}|@le@varepsilon|x_{n+1}-x_n|$。', '差分绝对收敛 ⇒ 数列收敛（级数判敛与部分和）。', '唯一性用 $|@xi-@eta|@le@varepsilon|@xi-@eta|$。'],
    pitfalls: ['只说“有界单调”但没证明单调。', '唯一性只算了方程，没有比较两个根。'],
    takeaway: '压缩映射三件套：Lipschitz 常数 $<1$ ⇒ 差分几何衰减 ⇒ 收敛且不动点唯一。',
    knowledge: ['k-contraction']
  },
  {
    id: 'm2010-2', group: 'math', edition: 2, year: 2010, stage: '初赛', paper: '数学类',
    topic: 'algebra', type: 'solution', score: 15, difficulty: 4,
    stem: `设 $$B=@begin{pmatrix}0&10&30§0&0&2010§0&0&0@end{pmatrix}.$$ 证明：$X^2=B$ 无解，其中 $X$ 为三阶未知复方阵。`,
    answer: `见解析（Jordan 块平方降秩）`,
    accept: [],
    solution: [
      `反设 $A^2=B$。$B$ 的特征值全为 0（代数重数 3），故 $A$ 的特征值 $@lambda$ 满足 $@lambda^2$ 为 $B$ 的特征值，即 $@lambda=0$。`,
      `于是 $A$ 的 Jordan 标准形只能是 $J_1=O$、$J_2$（一个 2 阶块）或 $J_3$（3 阶块）。`,
      `而 $J_1^2=O$，$J_2^2=O$，$J_3^2$ 是秩为 1 的矩阵。因此 $A^2$ 的秩 $@le1$。`,
      `但 $B$ 的秩为 2，矛盾。故 $X^2=B$ 无解。`
    ],
    hints: ['先看特征值：$B$ 幂零 ⇒ $A$ 的特征值全为 0。', '列出 $A$ 可能的 Jordan 标准形：$O$、$J_2(0)$、$J_3(0)$。', '比较 $A^2$ 与 $B$ 的秩。'],
    pitfalls: ['只比较特征值，忽略 Jordan 块结构。', '误以为 $J_3(0)^2=O$（实际秩为 1）。'],
    takeaway: '矩阵方程 $X^2=B$ 的“无解”证明，靠 Jordan 块平方后的秩下降与目标矩阵秩的矛盾。',
    knowledge: ['k-jordan']
  },
  {
    id: 'm2010-3', group: 'math', edition: 2, year: 2010, stage: '初赛', paper: '数学类',
    topic: 'analysis-calculus', type: 'solution', score: 10, difficulty: 4,
    stem: `设 $D@subset@mathbb{R}^2$ 是凸区域，$f(x,y)$ 是 $D$ 上的凸函数（即 $f(@alpha x_1+(1-@alpha)x_2,@alpha y_1+(1-@alpha)y_2)@le@alpha f(x_1,y_1)+(1-@alpha)f(x_2,y_2)$）。证明或否定：$f$ 在 $D$ 上连续。`,
    answer: `结论成立：凸函数在凸区域上连续`,
    accept: ['成立'],
    solution: [
      `先看一元情形：$g$ 在 $[x_0-@delta,x_0+@delta]$ 上凸，则差商单调，$$@frac{g(x_0)-g(x_0-@delta)}{@delta}@le@frac{g(x)-g(x_0)}{x-x_0}@le@frac{g(x_0+@delta)-g(x_0)}{@delta},$$ 由此 $g$ 在 $x_0$ 连续。`,
      `对二元：取 $(x_0,y_0)@in D$，存在 $@delta>0$ 使方形 $E_@delta@subset D$。固定 $y$ 时 $f(@cdot,y)$ 是一元凸函数，故连续。`,
      `利用一元凸函数差商的上下界，可得对 $(x,y)@in E_@delta$：$$|f(x,y)-f(x_0,y_0)|@le M_@delta(|x-x_0|+|y-y_0|),$$ 其中 $M_@delta$ 只依赖于 $@delta$。`,
      `故 $f$ 在 $(x_0,y_0)$ 连续；由点的任意性，$f$ 在 $D$ 上连续。`
    ],
    hints: ['先做一元情形：凸函数的差商单调。', '二元时固定一个变量，化为一元凸函数。', '用差商上下界得到局部 Lipschitz 型估计。'],
    pitfalls: ['直接说“凸函数当然连续”，没有证明。', '没有用到 $D$ 是开集/凸区域，无法取小方形。'],
    takeaway: '凸性 ⇒ 差商单调 ⇒ 局部有界 ⇒ 连续；这是“凸函数必连续”的标准证明链。',
    knowledge: ['k-convex']
  },

  /* ================= 第6届初赛（2014）数学类 ================= */
  {
    id: 'm2014-1', group: 'math', edition: 6, year: 2014, stage: '初赛', paper: '数学类',
    topic: 'geometry', type: 'solution', score: 15, difficulty: 4,
    stem: `已知空间两条直线 $$l_1:@frac{x-4}{1}=@frac{y-3}{-2}=@frac{z-8}{1},@qquad l_2:@frac{x+1}{7}=@frac{y+1}{-6}=@frac{z+1}{1}.$$ (1) 证明 $l_1,l_2$ 异面；(2) 求它们的公垂线标准方程；(3) 求连接 $l_1$ 上任一点与 $l_2$ 上任一点所得线段中点的轨迹的一般方程。`,
    answer: `(2) $@dfrac{x+1}{4}=@dfrac{y+1}{6}=@dfrac{z+1}{8}$；(3) $4x+6y+8z-40=0$`,
    accept: [],
    solution: [
      `(1) $l_1$ 过 $r_1=(4,3,8)$，方向 $v_1=(1,-2,1)$；$l_2$ 过 $r_2=(-1,-1,-1)$，方向 $v_2=(7,-6,1)$。混合积 $$(r_1-r_2,v_1,v_2)=@begin{vmatrix}5&4&9§1&-2&1§7&-6&1@end{vmatrix}@ne0,$$ 故异面。`,
      `(2) 公垂线方向 $v=v_1@times v_2=(4,6,8)$。令 $@overrightarrow{P_1P_2}=r_2-r_1+t_2v_2-t_1v_1@parallel v$，解得 $t_1=-1,@t_2=0$，垂足 $(-1,-1,-1)$，故公垂线为 $@frac{x+1}{4}=@frac{y+1}{6}=@frac{z+1}{8}$。`,
      `(3) 中点 $$M=@frac12(3+t_1+7t_2,@ 2-2t_1-6t_2,@ 7+t_1+t_2).$$ 消去 $t_1,t_2$，注意 $M$ 的变动方向垂直于 $v=(4,6,8)$，且过 $@frac12(3,2,7)$，得 $$4x+6y+8z-40=0.$$`
    ],
    hints: ['(1) 异面看混合积是否为零。', '(2) 公垂线方向 = 两方向向量叉积；用“连线与公垂线平行”解参数。', '(3) 中点坐标是 $t_1,t_2$ 的线性函数，消参得平面。'],
    pitfalls: ['把公垂线方向写成 $v_1$ 或 $v_2$。', '(3) 只写出参数式，没有消参得到一般方程。'],
    takeaway: '异面直线三问一条线：混合积判位置 → 叉积定公垂方向 → 中点消参得平面。',
    knowledge: ['k-lines-3d']
  },
  {
    id: 'm2014-2', group: 'math', edition: 6, year: 2014, stage: '初赛', paper: '数学类',
    topic: 'analysis-calculus', type: 'solution', score: 15, difficulty: 4,
    stem: `设 $f@in C[0,1]$ 是非负的严格单调增函数。(1) 证明：对任意 $n@in@mathbb{N}$，存在唯一的 $x_n@in[0,1]$，使得 $$(f(x_n))^n=@int_0^1(f(x))^n@,dx.$$ (2) 证明：$@lim_{n@to@infty}x_n=1$。`,
    answer: `见解析`,
    accept: [],
    solution: [
      `(1) 由单调性 $f(0)^n@le@int_0^1 f^n@le f(1)^n$，且 $f^n$ 连续，由介值定理存在 $x_n$；再由 $f$ 严格单调，$f^n$ 严格单调，故 $x_n$ 唯一。`,
      `(2) 对任意 $@varepsilon>0$，由非负与单调性 $$(f(x_n))^n@ge@int_{1-@varepsilon}^1(f(x))^n dx@ge@varepsilon(f(1-@varepsilon))^n,$$ 故 $f(x_n)@ge@sqrt[n]{@varepsilon}f(1-@varepsilon)$。`,
      `令 $n@to@infty$ 得 $@liminf f(x_n)@ge f(1-@varepsilon)$，再由 $f$ 的严格单调性 $@liminf x_n@ge1-@varepsilon$；由 $@varepsilon$ 任意，$x_n@to1$。`
    ],
    hints: ['(1) 用夹逼确定积分值落在 $[f(0)^n,f(1)^n]$，再用介值定理。', '(2) 把积分缩小到 $[1-@varepsilon,1]$ 上估计。', '开 $n$ 次方后取 $@liminf$，最后用 $f$ 的严格单调性回到 $x_n$。'],
    pitfalls: ['(1) 只证存在不证唯一。', '(2) 直接用 $f(x_n)@to f(1)$，没有说明 $x_n$ 的收敛性。'],
    takeaway: '“平均值反解”型唯一性 = 介值定理 + 严格单调；极限位置用“局部积分下界 + 开 $n$ 次方”。',
    knowledge: ['k-ivt']
  },
  {
    id: 'm2014-3', group: 'math', edition: 6, year: 2014, stage: '初赛', paper: '数学类',
    topic: 'algebra', type: 'solution', score: 15, difficulty: 4,
    stem: `设 $V$ 为闭区间 $[0,1]$ 上全体实函数构成的实向量空间，$f_1,@cdots,f_n@in V$。证明以下两条等价：(1) $f_1,@cdots,f_n$ 线性无关；(2) 存在 $a_1,@cdots,a_n@in[0,1]$，使 $@det(f_i(a_j))@ne0$。`,
    answer: `见解析（对 $n$ 归纳）`,
    accept: [],
    solution: [
      `(2)⇒(1)：若 $@sum@lambda_if_i=0$，在 $a_1,@cdots,a_n$ 处取值得齐次线性方程组，系数矩阵行列式非零，故 $@lambda_i=0$。`,
      `(1)⇒(2)：对 $n$ 归纳。$n=1$ 时 $f_1@ne0$，取 $a_1$ 使 $f_1(a_1)@ne0$。设 $n=k$ 成立，对 $f_1,@cdots,f_{k+1}$ 取前 $k$ 个，存在 $a_1,@cdots,a_k$ 使 $k$ 阶行列式非零。`,
      `构造 $$F(x)=@det@begin{pmatrix}f_1(a_1)&@cdots&f_1(a_k)&f_1(x)§@vdots&&@vdots&@vdots§f_{k+1}(a_1)&@cdots&f_{k+1}(a_k)&f_{k+1}(x)@end{pmatrix}.$$ 按最后一列展开得 $F=@sum@lambda_if_i$。若 $F@equiv0$，则由线性无关得所有 $@lambda_i=0$，特别 $@lambda_{k+1}=0$，即 $k$ 阶子式为零，矛盾。`,
      `故存在 $a_{k+1}$ 使 $F(a_{k+1})@ne0$，即 $(k+1)$ 阶行列式非零，归纳完成。`
    ],
    hints: ['(2)⇒(1) 直接把线性组合在 $a_j$ 处取值，得到 Vandermonde 型方程组。', '(1)⇒(2) 对 $n$ 归纳，构造“最后一列是函数值”的行列式。', '按最后一列展开，把行列式写成 $f_i$ 的线性组合。'],
    pitfalls: ['(1)⇒(2) 只证了 $n=2$，没有完成归纳。', '展开行列式时符号或转置写错（不影响非零性，但要说明）。'],
    takeaway: '函数线性无关 ⇔ 存在一组点使取值矩阵可逆；归纳构造“最后一列”的行列式是标准手法。',
    knowledge: ['k-dimension']
  }
];
