/* 非数学类题库：中国大学生数学竞赛（CMC）初赛 / 决赛
 * 公式约定：$...$ 或 $$...$$ 包裹，反斜杠写作 @（渲染前替换）。
 * 说明：题干与参考解答整理自官方公开试卷（cmathc.cn）。
 */
window.CMC_QUESTIONS_NM = [
  /* ================= 第16届初赛（2024）非数学 A ================= */
  {
    id: 'nm2024-1', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'integral', type: 'fill', score: 6, difficulty: 2,
    stem: `计算 $@int_0^1 @ln(1+x^2)@,dx=$ ________ .`,
    answer: `$@ln 2-2+@dfrac{@pi}{2}$`,
    accept: ['ln2-2+π/2', 'ln2−2+π/2', 'π/2+ln2-2'],
    solution: [
      `分部积分，取 $u=@ln(1+x^2)$，$dv=dx$：$$@int_0^1@ln(1+x^2)dx=@Big[x@ln(1+x^2)@Big]_0^1-@int_0^1@frac{2x^2}{1+x^2}dx$$`,
      `用 $@frac{x^2}{1+x^2}=1-@frac{1}{1+x^2}$ 拆开：$$=@ln 2-2@int_0^1@left(1-@frac{1}{1+x^2}@right)dx$$`,
      `$$=@ln 2-2+2@arctan 1=@ln 2-2+@frac{@pi}{2}.$$`
    ],
    hints: ['先想分部积分：对数函数通常取作 $u$。', '拆项 $@frac{x^2}{1+x^2}=1-@frac{1}{1+x^2}$。', '最后一项是 $2@arctan x@big|_0^1$。'],
    pitfalls: ['把 $@int@frac{dx}{1+x^2}$ 写成 $@ln(1+x^2)$，混淆 $@arctan$ 与 $@ln$。', '忘记乘以外层系数 2。'],
    takeaway: '含对数因子的积分优先分部积分；有理分式先做多项式除法或拆项，再回到基本积分表。',
    knowledge: ['k-int-techniques']
  },
  {
    id: 'nm2024-2', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'multiple-integral', type: 'fill', score: 6, difficulty: 3,
    stem: `设 $D:x^2+y^2@le r^2$，其中 $r>0$。则 $$@lim_{r@to0^+}@frac{@iint_D@left(e^{x^2+y^2}-1@right)dxdy}{r^4}=$$ ________ .`,
    answer: `$@dfrac{@pi}{2}$`,
    accept: ['π/2', 'pi/2'],
    solution: [
      `极坐标下 $dxdy=@rho@,d@rho@,d@theta$：$$@iint_D(e^{x^2+y^2}-1)dxdy=2@pi@int_0^r(e^{@rho^2}-1)@rho@,d@rho=@pi@left(e^{r^2}-1-r^2@right).$$`,
      `当 $r@to0^+$ 时展开 $e^{r^2}=1+r^2+@frac{r^4}{2}+o(r^4)$，故 $e^{r^2}-1-r^2=@frac{r^4}{2}+o(r^4)$。`,
      `于是原极限 $=@lim@frac{@pi@left(@frac{r^4}{2}+o(r^4)@right)}{r^4}=@frac{@pi}{2}$。`
    ],
    hints: ['先算内层二重积分：极坐标最自然。', '注意分子最低阶是 $r^4$，说明要用到 $e^t$ 的三阶展开。', '结果与 $@pi$ 有关，别漏掉 $@theta$ 积分给出的 $2@pi$。'],
    pitfalls: ['用 $e^t-1@sim t$ 得到 $@pi r^2$，阶数不够导致极限为无穷。', '极坐标面积元漏写 $@rho$。'],
    takeaway: '“积分值再求极限”的题，先精确算出积分，再做 Taylor 展开；展开阶数由分母的幂次决定。',
    knowledge: ['k-double-integral', 'k-lim-equiv']
  },
  {
    id: 'nm2024-3', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'multivariable', type: 'fill', score: 6, difficulty: 3,
    stem: `已知函数 $z=f(xy,@,e^{x+y})$，且 $f(x,y)$ 具有二阶连续偏导数。则 $$@frac{@partial^2 z}{@partial x@partial y}=$$ ________ .`,
    answer: `$xyf_{11}+(x+y)e^{x+y}f_{12}+e^{2(x+y)}f_{22}+f_1+e^{x+y}f_2$`,
    accept: ['xyf11+(x+y)e^(x+y)f12+e^2(x+y)f22+f1+e^(x+y)f2'],
    solution: [
      `记 $u=xy$，$v=e^{x+y}$，则 $z_x=yf_1+e^{x+y}f_2$。`,
      `再对 $y$ 求导，注意 $f_1,f_2$ 仍是 $(u,v)$ 的函数：$$z_{xy}=y@left(xf_{11}+e^{x+y}f_{12}@right)+f_1+e^{x+y}@left(xf_{21}+e^{x+y}f_{22}@right)+e^{x+y}f_2.$$`,
      `合并（$f_{12}=f_{21}$）：$$z_{xy}=xyf_{11}+(x+y)e^{x+y}f_{12}+e^{2(x+y)}f_{22}+f_1+e^{x+y}f_2.$$`
    ],
    hints: ['先写 $z_x$，把 $f_1,f_2$ 看成复合函数。', '对 $y$ 求导时有两类项：外层对位置的偏导、内层对 $y$ 的偏导。', '检查交叉项系数：来自 $x f_{11}$ 乘 $y$，与 $x f_{12}$、$e^{x+y}f_{21}$ 等合并。'],
    pitfalls: ['把 $f_1$ 当常数，漏掉它自身的 $y$ 依赖。', '交叉项系数写成 $2e^{x+y}$ 或漏掉 $x+y$。'],
    takeaway: '抽象函数高阶偏导：先画“变量依赖树”，每一层都要乘内层导数，最后合并同类项。',
    knowledge: ['k-multi-chain']
  },
  {
    id: 'nm2024-4', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'geometry-linear', type: 'fill', score: 6, difficulty: 3,
    stem: `直线 $L:@dfrac{x-1}{1}=@dfrac{y}{1}=@dfrac{z-1}{-1}$ 在平面 $@pi:x-y+2z-1=0$ 上的投影直线 $L_0$ 的单位方向向量为 ________ .`,
    answer: `$@pm@left(-@dfrac{4}{@sqrt{21}},-@dfrac{2}{@sqrt{21}},@dfrac{1}{@sqrt{21}}@right)$`,
    accept: ['±(-4/√21,-2/√21,1/√21)', '(-4/√21,-2/√21,1/√21)'],
    solution: [
      `把 $L$ 写成一般式：$x-y-1=0$，$y+z-1=0$（由参数式 $x=1+t,y=t,z=1-t$ 得到）。`,
      `过 $L$ 的平面束：$x-y-1+@lambda(y+z-1)=0$，即 $x+(@lambda-1)y+@lambda z-1-@lambda=0$，法向量 $(1,@lambda-1,@lambda)$。`,
      `投影平面与 $@pi$ 垂直：$(1,@lambda-1,@lambda)@cdot(1,-1,2)=0$，得 $2+@lambda=0$，$@lambda=-2$，对应平面 $x-3y-2z+1=0$。`,
      `$L_0$ 是两平面交线，方向向量 $$@vec{s}=(1,-3,-2)@times(1,-1,2)=(-8,-4,2)@parallel(-4,-2,1),$$ 单位化得 $@pm@frac{1}{@sqrt{21}}(-4,-2,1)$。`
    ],
    hints: ['投影直线 = 原直线所在平面中最“陡”的那个平面与原平面的交线。', '用平面束写出过 $L$ 的平面，再令两平面法向量垂直。', '两平面交线方向 = 两法向量叉积。'],
    pitfalls: ['把方向向量除以 $@sqrt{21}$ 后忘记正负号（单位方向向量有两支）。', '平面束参数解错符号。'],
    takeaway: '投影问题固定套路：平面束 → 垂直条件定参数 → 交线方向用叉积 → 单位化。',
    knowledge: ['k-lines-planes']
  },
  {
    id: 'nm2024-5', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'multiple-integral', type: 'fill', score: 6, difficulty: 4,
    stem: `设 $L$ 为圆周 $x^2+y^2=9$，取逆时针方向，则第二型曲线积分 $$@int_L@frac{-y}{4x^2+y^2}dx+@frac{x}{4x^2+y^2}dy=$$ ________ .`,
    answer: `$@pi$`,
    accept: ['π', 'pi'],
    solution: [
      `记 $P=@frac{-y}{4x^2+y^2}$，$Q=@frac{x}{4x^2+y^2}$，在原点外 $Q_x-P_y@equiv0$。`,
      `取椭圆 $L_1:4x^2+y^2=4$（逆时针），它与 $L$ 围成环域且不含原点。由 Green 公式：$$@int_L+@int_{-L_1}=0@;@Longrightarrow@;@int_L=@int_{-L_1}.$$`,
      `在 $L_1$ 上 $4x^2+y^2=4$，故 $$@int_L=@frac14@int_{-L_1}(-y@,dx+x@,dy)=@frac14@iint_{D}2@,dxdy=@frac12@sigma(D),$$ 其中 $D:4x^2+y^2@le4$，面积 $@sigma(D)=@pi@cdot1@cdot2=2@pi$。`,
      `所以原积分 $=@frac12@cdot2@pi=@pi$。`
    ],
    hints: ['分母 $4x^2+y^2$ 提示用椭圆“挖洞”，因为它在原点奇异。', '先验证 $Q_x=P_y$，于是环域上 Green 公式给出内外边界积分相等。', '在椭圆上分母是常数 4，可提到积分号外。'],
    pitfalls: ['直接对含奇点的区域用 Green 公式（不合法）。', '挖洞时两条曲线方向取成同向，导致符号错误。'],
    takeaway: '“分母二次型 + 圆/椭圆路径”是挖洞法的标准信号：环域上 $Q_x=P_y$，把积分搬到好算的椭圆上。',
    knowledge: ['k-green-gauss']
  },
  {
    id: 'nm2024-6', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'ode', type: 'solution', score: 14, difficulty: 4,
    stem: `求微分方程 $$(x^3-y^2)dx+(x^2y+xy)dy=0$$ 的通解。`,
    answer: `$(1+x)@sqrt{x^2+y^2}=Cx$`,
    accept: ['(1+x)√(x^2+y^2)=Cx', '(1+x)sqrt(x^2+y^2)=Cx'],
    solution: [
      `令 $u=y^2$，则 $2y@,dy=du$，而 $x^2y+xy=x(x+1)y$，方程化为 $$(x^3-u)dx+@frac{x(x+1)}{2}du=0.$$`,
      `整理成一阶线性方程：$$@frac{du}{dx}-@frac{2}{x(x+1)}u=-@frac{2x^2}{x+1}.$$`,
      `积分因子 $@mu=e^{-@int@frac{2}{x(x+1)}dx}=@left(@frac{x+1}{x}@right)^2$，两边相乘得 $$@left(u@Big(@frac{x+1}{x}@Big)^2@right)\'=-2(x+1).$$`,
      `积分：$u@left(@frac{x+1}{x}@right)^2=-(x+1)^2+C$，即 $@frac{(1+x)^2(x^2+y^2)}{x^2}=C$，开方得 $$(1+x)@sqrt{x^2+y^2}=Cx.$$`,
      `（也可凑全微分：$@frac12 d(x^2+y^2)+y@,d@frac{y}{x}=0$，同解。）`
    ],
    hints: ['先观察：$y$ 只以 $y^2$ 和 $y@,dy$ 形式出现，试试 $u=y^2$。', '换元后整理成 $u\'-@frac{2}{x(x+1)}u=@cdots$ 的标准一阶线性形式。', '积分因子指数里 $@frac{2}{x(x+1)}=2@left(@frac1x-@frac1{x+1}@right)$，积分后是对数。'],
    pitfalls: ['换元时忘记 $dy=du/(2y)$。', '积分因子求错（把 $@int@frac{2}{x(x+1)}dx$ 算成 $@ln@frac{x}{x+1}$ 的相反数）。'],
    takeaway: '形式复杂先找“谁只以某个组合出现”；换元后回到一阶线性标准型，按公式走即可。',
    knowledge: ['k-ode-substitution', 'k-int-techniques']
  },
  {
    id: 'nm2024-7', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'derivative', type: 'solution', score: 14, difficulty: 3,
    stem: `设 $$f(x)=@begin{cases}@dfrac{1}{@ln(1+x)}-@dfrac{1}{x},&0<x@le1,§[4pt] k,&x=0.@end{cases}$$ (1) 求常数 $k$ 使 $f(x)$ 在 $[0,1]$ 上连续；(2) 对 (1) 中的 $k$，求 $f(x)$ 在 $[0,1]$ 上的最小值 $@lambda$ 与最大值 $@mu$。`,
    answer: `$k=@dfrac12$；$@lambda=@dfrac{1}{@ln 2}-1$，$@mu=@dfrac12$`,
    accept: ['k=1/2, min=1/ln2-1, max=1/2'],
    solution: [
      `(1) 通分后用等价无穷小 $@ln(1+x)@sim x$：$$@lim_{x@to0^+}f(x)=@lim@frac{x-@ln(1+x)}{x@ln(1+x)}=@lim@frac{x-@ln(1+x)}{x^2}=@lim@frac{1-@frac{1}{1+x}}{2x}=@frac12,$$ 故取 $k=@frac12$。`,
      `(2) 对 $0<x@le1$：$$f\'(x)=-@frac{1}{(1+x)@ln^2(1+x)}+@frac{1}{x^2}=@frac{g(x)}{x^2(1+x)@ln^2(1+x)},$$ 其中 $g(x)=(1+x)@ln^2(1+x)-x^2$。`,
      `$g\'(x)=@ln^2(1+x)+2@ln(1+x)-2x$，$g\'\'(x)=@frac{2@ln(1+x)-2x}{1+x}<0$，故 $g\'$ 递减，$g\'(x)<g\'(0)=0$，从而 $g$ 递减，$g(x)<g(0)=0$。`,
      `所以 $f\'(x)<0$，$f$ 在 $(0,1]$ 上严格递减，最小值在 $x=1$：$@lambda=f(1)=@frac1{@ln2}-1$；最大值在 $x=0$：$@mu=f(0)=@frac12$。`
    ],
    hints: ['连续性靠极限：先通分，再用 $@ln(1+x)=x-@frac{x^2}{2}+o(x^2)$。', '求导后把分子单独记为 $g(x)$，用二阶导判断 $g$ 的符号。', '注意 $g\'\'<0$ 推出 $g\'$ 递减，从而 $g\'<0$，$g$ 递减，$g<0$。'],
    pitfalls: ['直接对 $@frac{1}{@ln(1+x)}-@frac{1}{x}$ 用洛必达，求导后更乱。', '只证 $g<0$ 就断言 $f$ 递减，忘记说明分母为正。'],
    takeaway: '分式相减求极限先通分；判断函数单调性时，把导数分子单独拿出来做“二阶导符号链”。',
    knowledge: ['k-derivative-toolkit', 'k-lim-equiv']
  },
  {
    id: 'nm2024-8', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'multiple-integral', type: 'solution', score: 14, difficulty: 4,
    stem: `求曲面积分 $$I=@iint_S(x^2-x)@,dy@,dz+(y^2-y)@,dz@,dx+(z^2-z)@,dx@,dy,$$ 其中 $S$ 是上半球面 $x^2+y^2+z^2=R^2$（$z@ge0$）的上侧。`,
    answer: `$@dfrac{@pi R^4}{2}-2@pi R^3$`,
    accept: ['πR^4/2-2πR^3'],
    solution: [
      `补上圆盘 $@Sigma:z=0,@,x^2+y^2@le R^2$，取下侧，与 $S$ 构成闭合曲面外侧。`,
      `由 Gauss 公式：$$@iint_{S+@Sigma}@vec{F}@cdot@vec{n}@,dS=@iiint_@Omega@left(2(x+y+z)-3@right)dV,@qquad @Omega:z@ge0,@ x^2+y^2+z^2@le R^2.$$`,
      `在 $@Sigma$ 上 $z=0$，被积的 $z^2-z=0$，故 $@iint_@Sigma=0$，于是 $I=@iiint_@Omega(2(x+y+z)-3)dV$。`,
      `由对称性 $@iiint x@,dV=@iiint y@,dV=0$，所以 $$I=2@iiint_@Omega z@,dV-3@iiint_@Omega dV=2@cdot@frac{@pi R^4}{4}-3@cdot@frac{2@pi R^3}{3}=@frac{@pi R^4}{2}-2@pi R^3.$$`
    ],
    hints: ['曲面不闭合，先补上底面圆盘，再用 Gauss。', '注意补面的方向：闭合曲面取外侧时，底面应是下侧。', '底面上 $z=0$，被积函数中的 $z^2-z$ 恰为 0，补面积分直接消失。'],
    pitfalls: ['补面方向取反，导致结果多出或少了补面积分。', '忘记上半球的 $@iiint z@,dV=@frac{@pi R^4}{4}$。'],
    takeaway: '曲面积分三步：判断闭合 → 补面/挖洞并定方向 → 用对称性把三元积分降为一元。',
    knowledge: ['k-green-gauss', 'k-symmetry']
  },
  {
    id: 'nm2024-9', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'proof', type: 'solution', score: 14, difficulty: 5,
    stem: `设 $f(x)$ 是 $(-@infty,+@infty)$ 上具有连续导数的非负函数，且存在 $M>0$，使得对任意 $x,y$ 有 $|f\'(x)-f\'(y)|@le M|x-y|$。证明：对任意实数 $x$，恒有 $$(f\'(x))^2@le 2Mf(x).$$`,
    answer: `见解析（取 $|h|=@sqrt{2f(x)/M}$ 优化）`,
    accept: [],
    solution: [
      `对任意 $h@ne0$，由 Newton–Leibniz 公式与非负性：$$0@le f(x+h)=f(x)+@int_0^h f\'(x+t)dt=f(x)+@int_0^h@left(f\'(x+t)-f\'(x)@right)dt+f\'(x)h.$$`,
      `取 $h$ 使 $hf\'(x)@le0$，则 $f\'(x)h=-|f\'(x)||h|$。由 Lipschitz 条件 $|f\'(x+t)-f\'(x)|@le M|t|$：$$-|f\'(x)||h|@le -f(x)+M@frac{h^2}{2},$$`,
      `即 $|f\'(x)||h|@le f(x)+@frac{M}{2}h^2$，两边除以 $|h|$：$|f\'(x)|@le@frac{f(x)}{|h|}+@frac{M}{2}|h|$。`,
      `令 $|h|=@sqrt{@frac{2f(x)}{M}}$（$f(x)=0$ 时由非负性直接得 $f\'@equiv0$），得 $|f\'(x)|@le@sqrt{2Mf(x)}$，平方即得结论。`
    ],
    hints: ['把 $f(x+h)$ 在 $x$ 处展开，用 $f@ge0$ 卡住积分项。', '利用 Lipschitz 条件估计 $|f\'(x+t)-f\'(x)|@le M|t|$。', '得到 $|f\'(x)|@le @frac{f}{|h|}+@frac{M|h|}{2}$ 后，用均值不等式选最优 $h$。'],
    pitfalls: ['忽略 $f(x)=0$ 时不能除以 $|h|=@sqrt{2f/M}$ 的退化情形。', '取错 $h$ 的符号，导致 $f\'(x)h$ 不能消成负项。'],
    takeaway: '“$f\'$ 与 $f$ 的不等式”标准套路：积分表示 + 余项估计 + 对 $h$ 优化（$a/h+Mh/2$ 的最小值在 $h=@sqrt{2a/M}$）。',
    knowledge: ['k-inequality', 'k-meanvalue']
  },
  {
    id: 'nm2024-10', group: 'nm', edition: 16, year: 2024, stage: '初赛', paper: '非数学类 A 卷',
    topic: 'series', type: 'solution', score: 14, difficulty: 5,
    stem: `证明二重级数 $$@sum_{n=1}^{@infty}@sum_{k=1}^{@infty}@frac{(-1)^{[@sqrt{n}]}}{n^2+k^2}$$ 收敛，其中 $[x]$ 表示不超过 $x$ 的最大整数。`,
    answer: `收敛（与 $@sum@frac{(-1)^{[@sqrt n]}}{n}$ 同敛散，后者由分组 + Leibniz 判别收敛）`,
    accept: [],
    solution: [
      `先估计内层和：对固定 $n$，由积分比较 $$@left|@sum_{k=1}^{@infty}@frac{1}{k^2+n^2}-@frac{@pi}{2n}@right|@le@frac{1}{n}@arctan@frac1n.$$`,
      `于是 $$@sum_{n=1}^{@infty}@left|@sum_{k=1}^{@infty}@frac{(-1)^{[@sqrt n]}}{n^2+k^2}-@frac{@pi}{2}@frac{(-1)^{[@sqrt n]}}{n}@right|@le@sum_{n=1}^{@infty}@frac{1}{n}@arctan@frac1n<+@infty,$$ 即原级数与 $@sum@frac{@pi(-1)^{[@sqrt n]}}{2n}$ 同敛散。`,
      `证明 $@sum@frac{(-1)^{[@sqrt n]}}{n}$ 收敛：令 $C_m=@sum_{k=m^2}^{(m+1)^2-1}@frac1k$，则 $C_m@downarrow0$ 且 $@frac2{m+1}<C_m<@frac2m$。`,
      `在 $n=m^2$ 处的部分和 $S_{m^2}=@sum_{j=1}^{m-1}(-1)^jC_j+@frac{(-1)^m}{m^2}$ 收敛（Leibniz）；其余 $N$ 满足 $|S_N-S_{n^2}|@le C_n@to0$，故整体收敛。`
    ],
    hints: ['先固定 $n$，把对 $k$ 的和用积分夹住，得到它接近 $@frac{@pi}{2n}$。', '把原级数写成“$@frac{@pi}{2}@sum@frac{(-1)^{[@sqrt n]}}{n}$ + 绝对收敛项”。', '对 $@sum@frac{(-1)^{[@sqrt n]}}{n}$ 按 $m^2@le n<(m+1)^2$ 分组，组内符号相同。'],
    pitfalls: ['直接用 Leibniz 判别，但 $@frac{1}{n}$ 与符号变化的“块长”不匹配。', '只证明内层和对 $k$ 收敛，没处理外层对 $n$ 的求和。'],
    takeaway: '带 $[f(n)]$ 符号的级数，按“同一整数段”分组是通用突破口；先做一次级数与积分的比较把问题降维。',
    knowledge: ['k-series-tests', 'k-convergence-improper']
  },

  /* ================= 第14届决赛（2023）非数学类 ================= */
  {
    id: 'nm2023f-1', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 2,
    stem: `极限 $@lim_{x@to0}@dfrac{@arctan x-x}{x-@sin x}=$ ________ .`,
    answer: `$-2$`,
    accept: ['-2', '−2'],
    solution: [
      `洛必达一次：$$@lim@frac{@frac{1}{1+x^2}-1}{1-@cos x}=@lim@frac{-x^2}{(1+x^2)(1-@cos x)}.$$`,
      `用 $1-@cos x@sim@frac{x^2}{2}$，得极限 $=@frac{-1}{1@cdot@frac12}=-2$。`
    ],
    hints: ['分子分母都趋于 0，先洛必达。', '洛必达后出现 $1-@cos x$，用等价无穷小替换。'],
    pitfalls: ['洛必达后再次求导，越算越繁。'],
    takeaway: '洛必达 + 等价无穷小组合使用；分子分母出现的 $x^2$ 阶正好相消。',
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'nm2023f-2', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'integral', type: 'fill', score: 6, difficulty: 2,
    stem: `设 $a>0$，则 $@int_0^{+@infty}x^3e^{-ax}@,dx=$ ________ .`,
    answer: `$@dfrac{6}{a^4}$`,
    accept: ['6/a^4', '6a^-4'],
    solution: [
      `连续分部积分三次：$$@int_0^{+@infty}x^3e^{-ax}dx=@frac{3}{a}@int_0^{+@infty}x^2e^{-ax}dx=@frac{3@cdot2}{a^2}@int_0^{+@infty}xe^{-ax}dx=@frac{6}{a^3}@int_0^{+@infty}e^{-ax}dx=@frac{6}{a^4}.$$`,
      `（一般地 $@int_0^{+@infty}x^ne^{-ax}dx=@frac{n!}{a^{n+1}}$，即 Gamma 函数 $@Gamma(n+1)/a^{n+1}$。）`
    ],
    hints: ['分部积分，每次都把多项式降一次。', '记住公式 $@int_0^{+@infty}x^ne^{-ax}dx=@frac{n!}{a^{n+1}}$。'],
    pitfalls: ['分部时符号写错（$e^{-ax}$ 的原函数带负号）。'],
    takeaway: '指数衰减型反常积分直接套 Gamma 公式，考场上不必每次分部。',
    knowledge: ['k-int-techniques', 'k-convergence-improper']
  },
  {
    id: 'nm2023f-3', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'geometry-linear', type: 'fill', score: 6, difficulty: 2,
    stem: `点 $M_0(2,2,2)$ 关于直线 $L:@dfrac{x-1}{3}=@dfrac{y+4}{2}=z-3$ 的对称点 $M_1$ 的坐标为 ________ .`,
    answer: `$(6,-6,6)$`,
    accept: ['(6,-6,6)', '(6,−6,6)'],
    solution: [
      `过 $M_0$ 且垂直于 $L$ 的平面：$3(x-2)+2(y-2)+(z-2)=0$，即 $3x+2y+z-12=0$。`,
      `$L$ 的参数式 $x=1+3t,@,y=-4+2t,@,z=3+t$，代入得 $3(1+3t)+2(-4+2t)+(3+t)-12=0$，即 $14t-14=0$，$t=1$，垂足 $P(4,-2,4)$。`,
      `$P$ 是 $M_0M_1$ 中点，故 $M_1=2P-M_0=(6,-6,6)$。`
    ],
    hints: ['对称点 = 关于直线的垂足再翻一倍。', '先作过 $M_0$ 且法向量为 $L$ 方向的平面。', '垂足用中点公式反推对称点。'],
    pitfalls: ['把方向向量 $(3,2,1)$ 当成平面上的向量。', '中点公式写成 $(M_0+M_1)$ 忘记除以 2。'],
    takeaway: '点关于直线对称三步：垂面 → 求交点 → 中点公式。',
    knowledge: ['k-lines-planes']
  },
  {
    id: 'nm2023f-4', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'multivariable', type: 'fill', score: 6, difficulty: 3,
    stem: `二元函数 $f(x,y)=3xy-x^3-y^3+3$ 的所有极值的和等于 ________ .`,
    answer: `$4$`,
    accept: ['4'],
    solution: [
      `$f_x=3y-3x^2=0$，$f_y=3x-3y^2=0$，得驻点 $(0,0)$ 与 $(1,1)$。`,
      `$A=f_{xx}=-6x$，$B=f_{xy}=3$，$C=f_{yy}=-6y$，$B^2-AC=9-36xy$。`,
      `在 $(0,0)$：$B^2-AC=9>0$，非极值；在 $(1,1)$：$B^2-AC=-27<0$ 且 $A=-6<0$，取极大值 $f(1,1)=3-1-1+3=4$。`,
      `故所有极值之和为 $4$。`
    ],
    hints: ['先解方程组 $f_x=0,f_y=0$。', '用 $AC-B^2$ 判别法（注意符号约定）。', '只有 $(1,1)$ 是极值点。'],
    pitfalls: ['把判别式写成 $B^2-AC$ 后判断方向搞反。', '漏掉 $(0,0)$ 处不是极值这一判断。'],
    takeaway: '二元极值四步：驻点 → 二阶偏导 → 判别式 → 比较函数值；三次函数常有一个鞍点。',
    knowledge: ['k-extrema']
  },
  {
    id: 'nm2023f-5', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'series', type: 'fill', score: 6, difficulty: 3,
    stem: `幂级数 $@sum_{n=1}^{@infty}(-1)^n@dfrac{1}{n3^n}x^n$ 的收敛域为 ________ .`,
    answer: `$(-3,@,3]$`,
    accept: ['(-3,3]', '(−3,3]'],
    solution: [
      `$a_n=@frac{(-1)^n}{n3^n}$，$R=@lim@left|@frac{a_n}{a_{n+1}}@right|=3@lim@frac{n+1}{n}=3$，故 $|x|<3$ 内绝对收敛。`,
      `$x=3$：$@sum@frac{(-1)^n}{n}$ 条件收敛（Leibniz）；$x=-3$：$@sum@frac1n$ 发散。`,
      `收敛域为 $(-3,3]$。`
    ],
    hints: ['先求收敛半径 $R=3$。', '端点必须分别代入：$x=3$ 得交错调和级数，$x=-3$ 得调和级数。'],
    pitfalls: ['把收敛域写成 $[-3,3]$，忽略 $x=-3$ 发散。'],
    takeaway: '幂级数收敛域 = 开区间 + 端点单独检验，两个端点结论可以不同。',
    knowledge: ['k-power-series']
  },
  {
    id: 'nm2023f-6', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'geometry-linear', type: 'solution', score: 10, difficulty: 4,
    stem: `用正交变换将二次曲面方程 $$x^2-2y^2-2z^2-4xy+4xz+8yz-27=0$$ 化为标准方程，并说明该曲面是什么曲面。`,
    answer: `$2x\'^2+2y\'^2-7z\'^2=27$，单叶双曲面`,
    accept: ['2x^2+2y^2-7z^2=27 单叶双曲面'],
    solution: [
      `二次型矩阵 $$A=@begin{pmatrix}1&-2&2§-2&-2&4§2&4&-2@end{pmatrix},$$ 特征多项式 $|@lambda E-A|=(@lambda-2)^2(@lambda+7)$，特征值 $2,2,-7$。`,
      `对 $@lambda=2$：特征向量 $@alpha_1=(-2,1,0)^T,@alpha_2=(2,0,1)^T$，Schmidt 正交化并单位化得 $$@beta_1=@frac{1}{@sqrt5}(-2,1,0)^T,@quad @beta_2=@frac{1}{3@sqrt5}(2,4,5)^T.$$`,
      `对 $@lambda=-7$：单位特征向量 $@beta_3=@frac13(1,2,-2)^T$。取 $Q=(@beta_1,@beta_2,@beta_3)$，令 $X=QX\'$，得 $$2x\'^2+2y\'^2-7z\'^2=27.$$`,
      `特征值两正一负，故为单叶双曲面。`
    ],
    hints: ['先写二次型矩阵 $A$，再求特征值。', '特征值 2 是二重的，对应特征向量要 Schmidt 正交化。', '标准化后看特征值符号：两正一负 ⇒ 单叶双曲面。'],
    pitfalls: ['特征向量未正交化就拼成 $Q$（此时 $Q$ 不是正交矩阵）。', '把单叶/双叶双曲面混淆。'],
    takeaway: '二次曲面标准化本质是实对称矩阵正交对角化；曲面类型只看三个特征值的符号。',
    knowledge: ['k-quadratic-surface']
  },
  {
    id: 'nm2023f-7', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'ode', type: 'solution', score: 12, difficulty: 5,
    stem: `设 $f(x),g(x)$ 在 $(-@infty,+@infty)$ 上有二阶连续导数，$f(0)=g(0)=1$，且对 $xOy$ 平面上任一简单闭曲线 $C$，有 $$@oint_C@left[y^2f(x)+2ye^x-8yg(x)@right]dx+2@left[yg(x)+f(x)@right]dy=0.$$ 求 $f(x),g(x)$。`,
    answer: `$f(x)=@frac45@cos2x-@frac85@sin2x+@frac15e^x$，$g(x)=@frac45@cos2x+@frac25@sin2x+@frac15e^x$`,
    accept: [],
    solution: [
      `任意闭曲线积分为零 ⇒ 与路径无关 ⇒ $Q_x=P_y$。记 $P=y^2f+2ye^x-8yg,@,Q=2(yg+f)$。`,
      `$Q_x=2yg\'+2f\'$，$P_y=2yf+2e^x-8g$，比较 $y$ 的系数与自由项得 $$g\'-f=0,@qquad f\'+4g=e^x.$$`,
      `消去 $f$：$g\'\'+4g=e^x$，通解 $g=C_1@cos2x+C_2@sin2x+@frac15e^x$。`,
      `由 $g(0)=1$ 得 $C_1+@frac15=1@Rightarrow C_1=@frac45$；由 $g\'(0)=f(0)=1$ 得 $2C_2+@frac15=1@Rightarrow C_2=@frac25$。`,
      `故 $g(x)=@frac45@cos2x+@frac25@sin2x+@frac15e^x$，$f=g\'=@frac45@cos2x-@frac85@sin2x+@frac15e^x$。`
    ],
    hints: ['“任一闭曲线积分为零”等价于 $@partial Q/@partial x=@partial P/@partial y$。', '比较 $y$ 的一次项系数和与 $y$ 无关的项，得到两个方程。', '消去 $f$ 得二阶常系数非齐次方程，特解试 $@frac15e^x$。'],
    pitfalls: ['只写出 $Q_x=P_y$ 就停，没有比较系数拆成方程组。', '初值条件用错：$f(0)=1$ 对应的是 $g\'(0)=1$。'],
    takeaway: '曲线积分条件题 = 偏导相等 + 比较系数；最终落到二阶常系数线性方程，初值由 $x=0$ 给出。',
    knowledge: ['k-green-gauss', 'k-ode-substitution']
  },
  {
    id: 'nm2023f-8', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'integral', type: 'solution', score: 12, difficulty: 5,
    stem: `求 $xOz$ 平面上的曲线 $@begin{cases}(x^2+z^2)^2=4(x^2-z^2),@ y=0@end{cases}$ 绕 $Oz$ 轴旋转而成的曲面所围区域的体积。`,
    answer: `$@sqrt2@,@pi^2$`,
    accept: ['√2π^2', 'sqrt(2)π^2'],
    solution: [
      `绕 $Oz$ 轴旋转：把 $x^2$ 换成 $x^2+y^2$，得曲面 $$(x^2+y^2+z^2)^2=4(x^2+y^2-z^2).$$`,
      `球坐标 $x=@rho@sin@varphi@cos@theta,@ y=@rho@sin@varphi@sin@theta,@ z=@rho@cos@varphi$，方程化为 $@rho^2=-4@cos2@varphi$，即 $@rho=2@sqrt{-@cos2@varphi}$，$@varphi@in[@frac@pi4,@frac{3@pi}4]$。`,
      `由对称性 $$V=8@int_0^{@frac@pi2}d@theta@int_{@frac@pi4}^{@frac@pi2}d@varphi@int_0^{2@sqrt{-@cos2@varphi}}@rho^2@sin@varphi@,d@rho=@frac{32@pi}{3}@int_{@frac@pi4}^{@frac@pi2}(-@cos2@varphi)^{3/2}@sin@varphi@,d@varphi.$$`,
      `令 $t=@cos@varphi$：$$V=@frac{32@pi}{3}@int_0^{@frac{@sqrt2}2}(1-2t^2)^{3/2}dt=@frac{16@sqrt2@pi}{3}@int_0^{@frac@pi2}@cos^4u@,du=@frac{16@sqrt2@pi}{3}@cdot@frac{3@pi}{16}=@sqrt2@,@pi^2.$$`
    ],
    hints: ['旋转面方程：把 $x^2$ 替换成 $x^2+y^2$。', '球坐标下方程化成 $@rho^2=-4@cos2@varphi$，注意 $@varphi$ 的范围。', '最后用 Wallis 公式 $@int_0^{@pi/2}@cos^4u@,du=@frac{3@pi}{16}$。'],
    pitfalls: ['旋转轴搞错（绕 $Oz$ 轴应保留 $z$）。', '球坐标积分限写错导致体积多算/少算。'],
    takeaway: '旋转体体积：先写旋转面方程，再选球坐标；含 $x^2+y^2$ 与 $z^2$ 的对称结构几乎总用球坐标。',
    knowledge: ['k-arc-length', 'k-symmetry']
  },
  {
    id: 'nm2023f-9', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 12, difficulty: 5,
    stem: `证明下列不等式：(1) 设 $x@in[0,@pi],@ t@in[0,1]$，则 $@sin tx@ge t@sin x$；(2) 设 $p>0$，则 $@int_0^{@frac@pi2}|@sin u|^pdu@ge@dfrac{@pi}{2(p+1)}$；(3) 设 $x@ge0,p>0$，则 $@int_0^x|@sin u|^pdu@ge@dfrac{x|@sin x|^p}{p+1}$。`,
    answer: `见解析（构造 $F(t)=@sin tx-t@sin x$，再逐层放缩）`,
    accept: [],
    solution: [
      `(1) 令 $F(t)=@sin tx-t@sin x$，则 $F(0)=F(1)=0$，且 $F\'\'(t)=-x^2@sin tx@le0$（$0@le tx@le@pi$），故 $F$ 为凹函数，在 $[0,1]$ 上 $F(t)@ge0$。`,
      `(2) 令 $u=@frac@pi2t$：$$@int_0^{@frac@pi2}|@sin u|^pdu=@frac@pi2@int_0^1@left|@sin@frac{@pi t}2@right|^pdt@ge@frac@pi2@int_0^1t^pdt=@frac{@pi}{2(p+1)}.$$`,
      `(3) 写 $x=k@pi+v$，$v@in[0,@pi)$。由周期性 $@int_0^{k@pi}|@sin u|^pdu=k@int_0^{@pi}|@sin u|^pdu@ge@frac{k@pi}{p+1}$，再用 (2) 于 $[0,v]$：$@int_0^v|@sin u|^pdu@ge@frac{v|@sin v|^p}{p+1}$。`,
      `两段相加并用 $|@sin v|=|@sin x|$：$$@int_0^x|@sin u|^pdu@ge@frac{k@pi+v|@sin x|^p}{p+1}@ge@frac{x|@sin x|^p}{p+1}.$$`
    ],
    hints: ['(1) 固定 $x$ 构造关于 $t$ 的函数，用二阶导判断凹凸。', '(2) 换元 $u=@frac@pi2t$ 后直接用 (1) 的结论。', '(3) 按 $@pi$ 的整数倍分段，把“整段”和“余段”分别估计。'],
    pitfalls: ['(1) 中忽略 $tx@in[0,@pi]$ 的符号条件，导致 $@sin tx$ 变号。', '(3) 忘记 $|@sin v|=|@sin x|$，因为 $x=k@pi+v$。'],
    takeaway: '三角不等式的通用手法：固定一个变量把另一个当参数，构造 $F(t)$ 看凹凸；周期结构按整周期拆段。',
    knowledge: ['k-inequality']
  },
  {
    id: 'nm2023f-10', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 12, difficulty: 4,
    stem: `设函数 $f(x)$ 在闭区间 $[a,b]$ 上具有一阶连续导数，证明 $$@int_a^b@sqrt{1+[f\'(x)]^2}dx@ge@sqrt{(b-a)^2+[f(b)-f(a)]^2},$$ 并给出等号成立的条件。`,
    answer: `恒成立；等号当且仅当 $f$ 为线性函数（曲线为直线段）`,
    accept: [],
    solution: [
      `令 $$F(t)=@int_a^t@sqrt{1+[f\'(x)]^2}dx-@sqrt{(t-a)^2+[f(t)-f(a)]^2},$$ 则 $F(a)=0$。`,
      `求导：$$F\'(t)=@sqrt{1+[f\'(t)]^2}-@frac{(t-a)+[f(t)-f(a)]f\'(t)}{@sqrt{(t-a)^2+[f(t)-f(a)]^2}}.$$`,
      `由 Cauchy–Schwarz：$$(t-a)+[f(t)-f(a)]f\'(t)@le@sqrt{1+[f\'(t)]^2}@sqrt{(t-a)^2+[f(t)-f(a)]^2},$$ 故 $F\'(t)@ge0$，$F$ 单调递增，$F(b)@ge F(a)=0$。`,
      `等号成立当且仅当 $(1,f\'(t))$ 与 $(t-a,f(t)-f(a))$ 共线，即 $f\'(t)=@frac{f(t)-f(a)}{t-a}=k$，故 $f$ 为线性函数。`
    ],
    hints: ['几何意义：弧长不小于弦长；把两端都看成 $t$ 的函数。', '构造 $F(t)$ 后求导，用 Cauchy–Schwarz 证明 $F\'@ge0$。', '等号条件来自 Cauchy–Schwarz 的取等条件。'],
    pitfalls: ['只写出几何解释，没有给出分析证明。', '等号条件只写“$f$ 是直线”，未说明斜率关系。'],
    takeaway: '“弧长 ≥ 弦长”的严格证明 = 构造差值函数 + Cauchy–Schwarz；这类题等号条件往往就是取等条件。',
    knowledge: ['k-inequality', 'k-arc-length']
  },
  {
    id: 'nm2023f-11', group: 'nm', edition: 14, year: 2023, stage: '决赛', paper: '非数学类',
    topic: 'series', type: 'solution', score: 12, difficulty: 5,
    stem: `证明级数 $@sum_{n=1}^{@infty}@ln@left(1+@dfrac{1}{2n}@right)@ln@left(1+@dfrac{1}{2n+1}@right)$ 收敛，并求其和。`,
    answer: `收敛，和为 $@dfrac{(@ln2)^2}{2}$`,
    accept: ['(ln2)^2/2'],
    solution: [
      `记 $a_n=@ln@frac{n+1}{n}$，则原级数为 $@sum a_{2n}a_{2n+1}$。由 $a_n@sim@frac1n$ 知 $a_{2n}a_{2n+1}@sim@frac{1}{2n(2n+1)}$，比较判别得收敛。`,
      `关键恒等式：$a_n=a_{2n}+a_{2n+1}$（因为 $@ln@frac{n+1}{n}=@ln@frac{2n+1}{2n}+@ln@frac{2n+2}{2n+1}$）。`,
      `令 $b_n=@sum_{k=n}^{2n-1}a_k^2$，则 $$b_n-b_{n+1}=a_n^2-a_{2n}^2-a_{2n+1}^2=2a_{2n}a_{2n+1}.$$`,
      `又 $0<b_n<n@ln^2@left(1+@frac1n@right)<@frac1n@to0$，故 $$@sum_{n=1}^{@infty}a_{2n}a_{2n+1}=@frac12@lim(b_1-b_{N+1})=@frac{b_1}{2}=@frac{(@ln2)^2}{2}.$$`
    ],
    hints: ['先做等价估计证明收敛，再想“裂项”结构。', '注意 $@ln@frac{n+1}{n}=@ln@frac{2n+1}{2n}+@ln@frac{2n+2}{2n+1}$，即 $a_n=a_{2n}+a_{2n+1}$。', '构造 $b_n=@sum_{k=n}^{2n-1}a_k^2$，发现 $b_n-b_{n+1}=2a_{2n}a_{2n+1}$。'],
    pitfalls: ['直接求和不做收敛性证明。', '把 $b_n$ 的上下标范围写错，导致裂项差出系数 2。'],
    takeaway: '级数求和先找“伸缩结构”：若通项能写成 $b_n-b_{n+1}$，和就是 $b_1$；本题的核心恒等式来自对数的分拆。',
    knowledge: ['k-series-tests', 'k-power-series']
  },
  /* ================= 第13届初赛（2021）非数学类 ================= */
  {
    id: 'nm2021-1', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 3,
    stem: `极限 $$@lim_{x@to+@infty}@sqrt{x^2+x+1}@cdot@frac{x-@ln(e^x+x)}{x}=$$ ________ .`,
    answer: `$0$`,
    accept: ['0'],
    solution: [
      `把分母的 $x$ 除进去：$$@frac{x-@ln(e^x+x)}{x}=1-@frac{1}{x}@ln@left(e^x(1+xe^{-x})@right)=1-@frac{1}{x}@left(x+@ln(1+xe^{-x})@right)=-@frac{@ln(1+xe^{-x})}{x}.$$`,
      `又 $@sqrt{x^2+x+1}=x@sqrt{1+@frac1x+@frac1{x^2}}@sim x$，所以原式 $=-@sqrt{1+@frac1x+@frac1{x^2}}@cdot@ln(1+xe^{-x})$。`,
      `当 $x@to+@infty$ 时 $xe^{-x}@to0$，故 $@ln(1+xe^{-x})@to0$，极限为 $0$。`
    ],
    hints: ['先把 $@sqrt{x^2+x+1}$ 写成 $x@sqrt{1+1/x+1/x^2}$。', '把 $@ln(e^x+x)$ 拆成 $x+@ln(1+xe^{-x})$。', '利用 $xe^{-x}@to0$。'],
    pitfalls: ['把 $@ln(e^x+x)$ 直接当成 $x$，丢掉 $@ln(1+xe^{-x})$ 项。'],
    takeaway: '含 $@ln(e^x+@cdots)$ 的极限，先把 $e^x$ 提出来：$@ln(e^x(1+@cdots))=x+@ln(1+@cdots)$。',
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'nm2021-2', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'multivariable', type: 'fill', score: 6, difficulty: 3,
    stem: `设 $z=z(x,y)$ 是由方程 $$2@sin(x+2y-3z)=x+2y-3z$$ 确定的二元隐函数，则 $@dfrac{@partial z}{@partial x}+@dfrac{@partial z}{@partial y}=$ ________ .`,
    answer: `$1$`,
    accept: ['1'],
    solution: [
      `记 $u=x+2y-3z$，方程即 $2@sin u=u$。两边分别对 $x,y$ 求偏导：$$2@cos u@left(1-3z_x@right)=1-3z_x,@qquad 2@cos u@left(2-3z_y@right)=2-3z_y.$$`,
      `若 $2@cos u@ne1$，则可直接约去得 $1-3z_x=0$，$2-3z_y=0$，即 $z_x=@frac13,@z_y=@frac23$。`,
      `若 $2@cos u=1$，则 $u=2@sin u$ 与 $@cos u=@frac12$ 联立仍给出同样的 $z_x,z_y$（也可由 $u$ 为常数直接得 $u_x=u_y=0$）。故 $z_x+z_y=1$。`
    ],
    hints: ['把 $x+2y-3z$ 看成一个整体 $u$。', '两边对 $x$ 求偏导时，$z$ 是 $x$ 的函数。', '注意 $2@cos u=1$ 的特殊情形需要单独说明。'],
    pitfalls: ['对 $x$ 求偏导时忘记 $z$ 也依赖 $x$。', '直接约分不讨论 $2@cos u=1$。'],
    takeaway: '隐函数求导先看“整体结构”；若变量总以某个组合出现，整体代换往往一步到位。',
    knowledge: ['k-multi-chain']
  },
  {
    id: 'nm2021-3', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 4,
    stem: `设函数 $f(x)$ 连续，且 $f(0)@ne0$，则 $$@lim_{x@to0}@frac{2@int_0^x(x-t)f(t)@,dt}{x@int_0^xf(x-t)@,dt}=$$ ________ .`,
    answer: `$1$`,
    accept: ['1'],
    solution: [
      `分子 $=2x@int_0^xf(t)dt-2@int_0^xtf(t)dt$；分母换元后 $=x@int_0^xf(u)du$。`,
      `用洛必达（对 $x$ 求导）：分子导数 $=2@int_0^xf(t)dt+2xf(x)-2xf(x)=2@int_0^xf(t)dt$；分母导数 $=@int_0^xf(u)du+xf(x)$。`,
      `由积分中值定理，$@int_0^xf= xf(@xi)$（$@xi$ 介于 $0,x$ 之间），故极限 $=@lim@frac{2xf(@xi)}{xf(@xi)+xf(x)}=@frac{2f(0)}{2f(0)}=1$。`
    ],
    hints: ['先把分子展开成两个积分，分母换元 $u=x-t$。', '对 $x$ 求导时注意 $x$ 出现在积分上限和积分号内两处。', '分子分母都提出 $x$，再用积分中值定理。'],
    pitfalls: ['洛必达时漏掉 $2x@int_0^xf$ 中 $x$ 的导数项。', '没有用 $f$ 的连续性处理 $f(@xi)@to f(0)$。'],
    takeaway: '含变限积分的 $@frac00$ 型极限：先展开/换元，再洛必达，最后用积分中值定理把 $f(@xi)$ 换成 $f(0)$。',
    knowledge: ['k-int-techniques', 'k-lim-equiv']
  },
  {
    id: 'nm2021-4', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'geometry-linear', type: 'fill', score: 6, difficulty: 4,
    stem: `过三条直线 $$L_1:@begin{cases}x=0§y-z=2@end{cases},@quad L_2:@begin{cases}x=0§x+y-z+2=0@end{cases},@quad L_3:@begin{cases}x=@sqrt2§y-z=0@end{cases}$$ 的圆柱面方程为 ________ .`,
    answer: `$2x^2+y^2+z^2-2yz=4$`,
    accept: ['2x^2+y^2+z^2-2yz=4'],
    solution: [
      `三条直线的方向向量都是 $(0,1,1)$，故母线与 $y-z$ 平面平行。`,
      `在 $L_1$ 上取 $P_1(0,1,-1)$，作与三直线垂直的平面 $y+z=0$，交 $L_2,L_3$ 于 $P_2(0,-1,1),P_3(@sqrt2,0,0)$。三点所在圆的圆心为 $O(0,0,0)$，半径 $@sqrt2$。`,
      `圆柱面轴线为 $@frac{x}{0}=@frac{y}{1}=@frac{z}{1}$。点 $Q(x,y,z)$ 到轴线距离 $$d=@frac{|(x,y,z)@times(0,1,1)|}{@sqrt2}=@sqrt2,$$`,
      `平方化简：$|(x,y,z)@times(0,1,1)|^2=(y-z)^2+x^2+x^2=2x^2+(y-z)^2$，故 $2x^2+(y-z)^2=4$，即 $2x^2+y^2+z^2-2yz=4$。`
    ],
    hints: ['先把三条直线化成对称式，确认方向相同。', '圆柱面由“轴上点 + 半径”确定：作垂直平面截三条母线得到三点定圆。', '用点到直线距离公式 $d=@frac{|@vec{r}@times@vec{v}|}{|@vec{v}|}$ 写方程。'],
    pitfalls: ['没有先验证三线平行，直接设一般圆柱面。', '点到直线距离公式漏掉分母 $|@vec v|$。'],
    takeaway: '圆柱面 = 到定轴距离为常数；先找轴（三个截点定圆），再用叉积写距离。',
    knowledge: ['k-lines-planes']
  },
  {
    id: 'nm2021-5', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'multiple-integral', type: 'fill', score: 6, difficulty: 4,
    stem: `记 $D={(x,y)@mid x^2+y^2@le@pi}$，则 $$@iint_D@left(@sin x^2@cos y^2+x@sqrt{x^2+y^2}@right)dxdy=$$ ________ .`,
    answer: `$@pi$`,
    accept: ['π', 'pi'],
    solution: [
      `第二项 $x@sqrt{x^2+y^2}$ 关于 $x$ 为奇函数，区域关于 $y$ 轴对称，故积分为 $0$。`,
      `记 $I=@iint_D@sin x^2@cos y^2@,dxdy$。由轮换对称性 $I=@iint_D@sin y^2@cos x^2@,dxdy$，相加得 $$2I=@iint_D@sin(x^2+y^2)dxdy.$$`,
      `极坐标：$2I=2@pi@int_0^{@sqrt@pi}@rho@sin@rho^2d@rho=@pi@Big[-@cos@rho^2@Big]_0^{@sqrt@pi}=2@pi$，故 $I=@pi$。`
    ],
    hints: ['先看对称性：$x@sqrt{x^2+y^2}$ 是 $x$ 的奇函数。', '对剩下部分用轮换对称 $x@leftrightarrow y$，凑成 $@sin(x^2+y^2)$。', '极坐标下 $@int@rho@sin@rho^2d@rho$ 直接换元。'],
    pitfalls: ['没识别出奇函数项，硬算。', '轮换相加时忘记除以 2。'],
    takeaway: '圆域上的三角/多项式积分：先奇偶性，再轮换对称，最后极坐标；三步能省掉大半计算。',
    knowledge: ['k-symmetry', 'k-double-integral']
  },
  {
    id: 'nm2021-6', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'solution', score: 14, difficulty: 4,
    stem: `设 $x_1=2021$，$x_n^2-2(x_n+1)x_{n+1}+2021=0$（$n@ge1$）。证明数列 $@left@{x_n@right@}$ 收敛，并求 $@lim_{n@to@infty}x_n$。`,
    answer: `收敛，且 $@lim x_n=@sqrt{2022}-1$`,
    accept: ['√2022-1'],
    solution: [
      `令 $a=1011$，$y_n=1+x_n$。由递推式解出 $x_{n+1}=@frac{x_n^2+2021}{2(x_n+1)}$，即 $$y_{n+1}=@frac{y_n^2+2022}{2y_n}=@frac{y_n}{2}+@frac{1011}{y_n}=:f(y_n).$$`,
      `$y_1=2022>@sqrt{2022}$。当 $x>@sqrt{2a}$ 时，由均值不等式 $f(x)@ge@sqrt{2a}$，且 $$f(x)-x=@frac{2a-x^2}{2x}<0,$$ 故 $x>f(x)>@sqrt{2a}$。`,
      `因此 $@left@{y_n@right@}$ 单调递减且有下界 $@sqrt{2022}$，故收敛。设极限为 $A$，则 $A=@frac{A}{2}+@frac{1011}{A}$，得 $A=@sqrt{2022}$。`,
      `所以 $@lim x_n=@lim(y_n-1)=@sqrt{2022}-1$。`
    ],
    hints: ['先把 $x_{n+1}$ 解出来，再令 $y_n=1+x_n$ 化简。', '化简后是 $y_{n+1}=@frac{y_n}{2}+@frac{1011}{y_n}$，典型的均值迭代。', '证明 $f(x)<x$ 且 $f(x)>@sqrt{2022}$，得到单调有界。'],
    pitfalls: ['只算出不动点就断言收敛。', '忘记验证数列始终大于 $@sqrt{2022}$。'],
    takeaway: '递推数列三步：化简成 $y_{n+1}=f(y_n)$ → 证 $f(x)-x$ 的符号（单调）与下界 → 取极限解 $A=f(A)$。',
    knowledge: ['k-sequence-monotone']
  },
  {
    id: 'nm2021-7', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'ode', type: 'solution', score: 14, difficulty: 5,
    stem: `设 $f(x)$ 在 $[0,+@infty)$ 上是有界连续函数。证明：方程 $y\'\'+14y\'+13y=f(x)$ 的每一个解在 $[0,+@infty)$ 上都是有界函数。`,
    answer: `见解析（把二阶方程拆成两个一阶线性方程，写出通解后逐项估计）`,
    accept: [],
    solution: [
      `齐次方程特征根 $-1,-13$，齐次解 $C_1e^{-x}+C_2e^{-13x}$ 有界。`,
      `原方程可写成 $(y\'+y)\'+13(y\'+y)=f$，令 $y_1=y\'+y$，则 $y_1=e^{-13x}@left(@int_0^xf(t)e^{13t}dt+C_3@right)$。`,
      `又可写成 $(y\'+13y)\'+(y\'+13y)=f$，令 $y_2=y\'+13y=e^{-x}@left(@int_0^xf(t)e^tdt+C_4@right)$。`,
      `由 $12y=y_2-y_1$ 得 $$y=C_1e^{-x}+C_2e^{-13x}+@frac{1}{12}e^{-x}@int_0^xf(t)e^tdt-@frac{1}{12}e^{-13x}@int_0^xf(t)e^{13t}dt.$$`,
      `设 $|f|@le M$，则两项积分分别被 $@frac{M}{12}(1-e^{-x})$ 与 $@frac{M}{156}(1-e^{-13x})$ 控制，故 $|y|@le|C_1|+|C_2|+@frac{7M}{78}$，有界。`
    ],
    hints: ['齐次部分先解出来，证明它本身有界。', '把二阶方程拆成两个一阶方程：$(y\'\'+y\')+13(y\'+y)=f$ 与 $(y\'\'+13y\')+(y\'+13y)=f$。', '用一阶线性方程通解公式，再用 $|f|@le M$ 逐项估计。'],
    pitfalls: ['只说“齐次解有界”，没有处理特解。', '拆项时把系数 13 与 1 弄反。'],
    takeaway: '常系数二阶方程 + 有界右端：拆成一阶方程写通解，指数衰减因子保证特解也有界。',
    knowledge: ['k-ode-substitution', 'k-inequality']
  },
  {
    id: 'nm2021-8', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'multiple-integral', type: 'solution', score: 14, difficulty: 5,
    stem: `对于 4 次齐次函数 $$f(x,y,z)=a_1x^4+a_2y^4+a_3z^4+3a_4x^2y^2+3a_5y^2z^2+3a_6x^2z^2,$$ 计算曲面积分 $@oiint_@Sigma f(x,y,z)@,dS$，其中 $@Sigma:x^2+y^2+z^2=1$。`,
    answer: `$@dfrac{4@pi}{5}@sum_{i=1}^{6}a_i$`,
    accept: ['4π/5 (a1+...+a6)'],
    solution: [
      `由齐次函数的 Euler 定理：$xf_x+yf_y+zf_z=4f$。在单位球面上外法向为 $(x,y,z)$，故 $$@oiint_@Sigma f@,dS=@frac14@oiint_@Sigma(f_x@cos@alpha+f_y@cos@beta+f_z@cos@gamma)dS.$$`,
      `把第一类曲面积分转成第二类后使用 Gauss 公式：$$=@frac14@iiint_{x^2+y^2+z^2@le1}(f_{xx}+f_{yy}+f_{zz})dV.$$`,
      `计算 $f_{xx}+f_{yy}+f_{zz}$，并利用单位球内 $@iiint x^2dV=@frac{4@pi}{15}$ 与轮换对称，逐项合并得 $$@oiint_@Sigma f@,dS=@frac{4@pi}{5}(a_1+a_2+a_3+a_4+a_5+a_6).$$`
    ],
    hints: ['4 次齐次 ⇒ $xf_x+yf_y+zf_z=4f$（Euler 定理）。', '单位球面外法向就是 $(x,y,z)$，可把 $f$ 写成法向导数的形式。', '用 Gauss 公式转成 $@iiint@Delta f@,dV$，再用 $@iiint x^2dV=@frac{4@pi}{15}$ 与对称性合并。'],
    pitfalls: ['把 $@oiint f@,dS$ 直接当成 $@iiint@Delta f$ 而漏掉系数 $@frac14$。', '展开 $f_{xx}+f_{yy}+f_{zz}$ 时混淆系数（$3a_4x^2y^2$ 求两次导给 $6a_4$）。'],
    takeaway: '齐次函数在球面上的积分：Euler 定理 + Gauss 公式 + 球内 $x^2$ 积分，是固定三步。',
    knowledge: ['k-green-gauss', 'k-symmetry']
  },
  {
    id: 'nm2021-9', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 14, difficulty: 5,
    stem: `设函数 $f(x)$ 在闭区间 $[a,b]$ 上有连续的二阶导数，证明：$$@lim_{n@to@infty}n^2@left[@int_a^bf(x)dx-@frac{b-a}{n}@sum_{k=1}^{n}f@left(a+@frac{2k-1}{2n}(b-a)@right)@right]=@frac{(b-a)^2}{24}@left[f\'(b)-f\'(a)@right].$$`,
    answer: `见解析（中点公式的 Taylor 展开 + 夹逼）`,
    accept: [],
    solution: [
      `记 $x_k=a+@frac{k(b-a)}{n}$，$@xi_k$ 为第 $k$ 个小区间的中点，$h=@frac{b-a}{n}$。在 $[x_{k-1},x_k]$ 上把 $f$ 在 $@xi_k$ 处展开：$$f(x)=f(@xi_k)+f\'(@xi_k)(x-@xi_k)+@frac{f\'\'(@eta_k)}{2}(x-@xi_k)^2.$$`,
      `对区间积分，一次项因对称性消失：$$@int_{x_{k-1}}^{x_k}f(x)dx-hf(@xi_k)=@frac12@int_{x_{k-1}}^{x_k}f\'\'(@eta_k)(x-@xi_k)^2dx.$$`,
      `又 $@int_{x_{k-1}}^{x_k}(x-@xi_k)^2dx=@frac{h^3}{12}$，设 $f\'\'$ 在小区间上的最大、最小值 $M_k,m_k$，则 $$@frac{h^2}{24}m_kh@le n^2B_n@le@frac{h^2}{24}M_kh,$$ 其中 $B_n$ 为原括号内量，求和后得 $$@frac{(b-a)^2}{24}@sum m_kh@le n^2B_n@le@frac{(b-a)^2}{24}@sum M_kh.$$`,
      `由 $f\'\'$ 连续可积，$@sum m_kh$ 与 $@sum M_kh$ 都趋于 $@int_a^bf\'\'=f\'(b)-f\'(a)$，夹逼得结论。`
    ],
    hints: ['这是“中点公式”的误差估计，逐小区间 Taylor 展开。', '一次项积分后为 0，只剩二阶项；$@int(x-@xi_k)^2dx=@frac{h^3}{12}$。', '用 $f\'\'$ 在小区间上的上下确界夹住，再用可积性取极限。'],
    pitfalls: ['对整个区间一次性 Taylor 展开，无法得到 $n^{-2}$ 阶。', '忘记乘小区间长度 $h$，量纲不对。'],
    takeaway: '数值积分的误差阶：逐区间 Taylor 展开 → 奇次项消去 → 用二阶导的上下界夹逼。',
    knowledge: ['k-meanvalue', 'k-inequality']
  },
  {
    id: 'nm2021-10', group: 'nm', edition: 13, year: 2021, stage: '初赛', paper: '非数学类',
    topic: 'series', type: 'solution', score: 14, difficulty: 5,
    stem: `设 $@left@{a_n@right@}$ 与 $@left@{b_n@right@}$ 均为正实数列，$a_1=b_1=1$，且 $b_n=a_nb_{n-1}-2$（$n=2,3,@cdots$）。又设 $@left@{b_n@right@}$ 为有界数列，证明级数 $@sum_{n=1}^{@infty}@frac{1}{a_1a_2@cdots a_n}$ 收敛，并求其和。`,
    answer: `收敛，和为 $@dfrac32$`,
    accept: ['3/2'],
    solution: [
      `由 $b_n=a_nb_{n-1}-2$ 得 $a_n=@left(1+@frac{2}{b_n}@right)@frac{b_n}{b_{n-1}}$，故 $$a_1a_2@cdots a_n=@left(1+@frac{2}{b_2}@right)@cdots@left(1+@frac{2}{b_n}@right)b_n.$$`,
      `因 $@left@{b_n@right@}$ 有界，存在 $M>0$ 使 $0<b_n@le M$，于是 $$0<@frac{b_n}{a_1@cdots a_n}=@prod_{k=2}^{n}@left(1+@frac{2}{b_k}@right)^{-1}@le@left(1+@frac2M@right)^{-(n-1)}@to0.$$`,
      `计算部分和：$$S_n=1+@sum_{k=2}^{n}@frac{1}{a_1@cdots a_k}@cdot@frac{a_kb_{k-1}-b_k}{2}=1+@frac12@sum_{k=2}^{n}@left(@frac{b_{k-1}}{a_1@cdots a_{k-1}}-@frac{b_k}{a_1@cdots a_k}@right).$$`,
      `裂项得 $S_n=@frac32-@frac{b_n}{2a_1@cdots a_n}$，由前一步知第二项趋于 0，故和为 $@frac32$。`
    ],
    hints: ['把递推式改写成 $a_n$ 的表达式，出现 $1+@frac{2}{b_n}$。', '先证 $@frac{b_n}{a_1@cdots a_n}@to0$：利用 $b_n@le M$ 做乘积估计。', '部分和里用 $2=a_kb_{k-1}-b_k$ 制造裂项。'],
    pitfalls: ['直接对级数用比值判别，忽略 $a_n$ 与 $b_n$ 的耦合关系。', '裂项时系数 $@frac12$ 漏掉。'],
    takeaway: '递推 + 级数求和：把递推改写成乘积/差分结构，部分和自然裂项；先用有界性证明余项趋零。',
    knowledge: ['k-series-tests', 'k-power-series']
  },

  /* ================= 第12届初赛（2020）非数学类 ================= */
  {
    id: 'nm2020-1', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 3,
    stem: `极限 $$@lim_{x@to0}@frac{(x-@sin x)e^{-x^2}}{@sqrt{1-x^3}-1}=$$ ________ .`,
    answer: `$-@dfrac13$`,
    accept: ['-1/3', '−1/3'],
    solution: [
      `分母用等价无穷小：$@sqrt{1-x^3}-1@sim-@frac{x^3}{2}$；分子 $x-@sin x@sim@frac{x^3}{6}$，$e^{-x^2}@to1$。`,
      `于是原式 $=@lim@frac{x^3/6}{-x^3/2}=-@frac13$。`
    ],
    hints: ['先分别处理分子分母的等价无穷小。', '$x-@sin x@sim@frac{x^3}{6}$，$@sqrt{1+u}-1@sim@frac u2$。'],
    pitfalls: ['把 $@sqrt{1-x^3}-1$ 的符号丢掉了。', '用 $x-@sin x@sim0$ 直接得 0。'],
    takeaway: '等价无穷小的关键是“同阶相除”，分子分母都展开到第一个非零阶即可。',
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'nm2020-2', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'derivative', type: 'fill', score: 6, difficulty: 3,
    stem: `设 $f(x)=(x+1)^n e^{-x^2}$，则 $f^{(n)}(-1)=$ ________ .`,
    answer: `$@dfrac{n!}{e}$`,
    accept: ['n!/e', 'n!e^-1'],
    solution: [
      `用莱布尼茨公式：$$f^{(n)}(x)=@sum_{k=0}^{n}C_n^k@left[(x+1)^n@right]^{(k)}@left(e^{-x^2}@right)^{(n-k)}.$$`,
      `在 $x=-1$ 处，只有 $k=n$ 时 $[(x+1)^n]^{(n)}=n!$ 非零，其余项都含因子 $(x+1)$。`,
      `故 $f^{(n)}(-1)=n!@,e^{-1}$。`
    ],
    hints: ['看到“多项式 × 函数”的 $n$ 阶导数，想莱布尼茨公式。', '代入 $x=-1$ 时，只有求导次数等于多项式次数的那一项留下。'],
    pitfalls: ['逐阶求导，无法处理一般 $n$。', '忘记代入 $x=-1$ 后 $e^{-x^2}=e^{-1}$。'],
    takeaway: '莱布尼茨公式 + 特殊点代入，是“求 $f^{(n)}(a)$”的标准组合拳。',
    knowledge: ['k-higher-derivative']
  },
  {
    id: 'nm2020-3', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'derivative', type: 'fill', score: 6, difficulty: 3,
    stem: `设 $y=f(x)$ 是由方程 $$@arctan@frac{x}{y}=@ln@sqrt{x^2+y^2}-@frac12@ln2+@frac{@pi}{4}$$ 确定的隐函数，且 $f(1)=1$，则曲线 $y=f(x)$ 在点 $(1,1)$ 处的切线方程为 ________ .`,
    answer: `$y=1$`,
    accept: ['y=1'],
    solution: [
      `两边微分：$d@arctan@frac xy=@frac{y@,dx-x@,dy}{x^2+y^2}$，$d@ln@sqrt{x^2+y^2}=@frac{x@,dx+y@,dy}{x^2+y^2}$。`,
      `比较得 $y@,dx-x@,dy=x@,dx+y@,dy$，即 $y\'=@frac{y-x}{x+y}$。`,
      `在 $(1,1)$ 处 $y\'=0$，切线为 $y=1$。`
    ],
    hints: ['两边同时微分，比直接解出 $y$ 更快。', '$@arctan(x/y)$ 的微分是 $(y dx-x dy)/(x^2+y^2)$。', '代入 $(1,1)$ 求斜率。'],
    pitfalls: ['隐函数求导时把 $y$ 当常数。', '切线方程写成 $x=1$（斜率与法线混淆）。'],
    takeaway: '隐函数 + 切线：两边微分 → 整理出 $dy/dx$ → 代点；比解 $y$ 快得多。',
    knowledge: ['k-derivative-toolkit', 'k-lines-planes']
  },
  {
    id: 'nm2020-4', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'multiple-integral', type: 'fill', score: 6, difficulty: 4,
    stem: `已知 $@int_0^{+@infty}@dfrac{@sin x}{x}dx=@dfrac{@pi}{2}$，则 $$@int_0^{+@infty}@int_0^{+@infty}@frac{@sin x@,@sin(x+y)}{x(x+y)}@,dx@,dy=$$ ________ .`,
    answer: `$@dfrac{@pi^2}{8}$`,
    accept: ['π^2/8'],
    solution: [
      `令 $u=x+y$，内层积分化为 $@int_x^{+@infty}@frac{@sin u}{u}du$，于是 $$I=@int_0^{+@infty}@frac{@sin x}{x}@left(@int_x^{+@infty}@frac{@sin u}{u}du@right)dx.$$`,
      `记 $F(x)=@int_0^x@frac{@sin u}{u}du$，则内层 $=@frac@pi2-F(x)$，$F\'=@frac{@sin x}{x}$。`,
      `$$I=@frac@pi2@cdot@frac@pi2-@int_0^{+@infty}F(x)F\'(x)dx=@frac{@pi^2}{4}-@frac12@left(@frac@pi2@right)^2=@frac{@pi^2}{8}.$$`
    ],
    hints: ['先对 $y$ 积分，令 $u=x+y$。', '把内层写成 $@frac@pi2-@int_0^x@frac{@sin u}{u}du$。', '剩下的积分是 $@int F F\'=@frac12F^2$。'],
    pitfalls: ['忘记内层积分上限是 $+@infty$ 而非 $x$。', '第二项积分符号写反。'],
    takeaway: '含 $@sin x/x$ 的二重积分：换元把内层变成同一个函数，再用 $@int FF\'$ 求值。',
    knowledge: ['k-double-integral', 'k-convergence-improper']
  },
  {
    id: 'nm2020-5', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 4,
    stem: `设 $f(x),g(x)$ 在 $x=0$ 的某邻域内有定义，且 $@lim_{x@to0}f(x)=@lim_{x@to0}g(x)=a>0$，$f(x)@ne g(x)$。则 $$@lim_{x@to0}@frac{[f(x)]^{g(x)}-[g(x)]^{g(x)}}{f(x)-g(x)}=$$ ________ .`,
    answer: `$a^a$`,
    accept: ['a^a'],
    solution: [
      `提公因式：$$@frac{[f]^g-[g]^g}{f-g}=[g]^g@cdot@frac{@left(@frac fg@right)^g-1}{f-g}.$$`,
      `令 $u=@frac fg@to1$，则 $u^g-1=e^{g@ln u}-1@sim g@ln u@sim g(u-1)=@frac{g(f-g)}{g}=f-g$。`,
      `故极限 $=a^a@cdot1=a^a$。`
    ],
    hints: ['先提出 $[g(x)]^{g(x)}$。', '把 $@left(@frac fg@right)^g$ 写成 $e^{g@ln(f/g)}$，用 $e^t-1@sim t$ 与 $@ln(1+t)@sim t$。'],
    pitfalls: ['直接对幂指函数用洛必达，越算越乱。', '忽略底数必须为正（由保号性保证）。'],
    takeaway: '幂指函数之差：提公因式 → 化成 $e^{g@ln u}-1$ → 两层等价无穷小。',
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'nm2020-6', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'solution', score: 10, difficulty: 4,
    stem: `设数列 $@left@{a_n@right@}$ 满足 $a_1=1$，且 $$a_{n+1}=@frac{a_n}{(n+1)(a_n+1)},@qquad n@ge1.$$ 求 $@lim_{n@to@infty}n!a_n$。`,
    answer: `$@dfrac1e$`,
    accept: ['1/e'],
    solution: [
      `$a_n>0$。取倒数：$$@frac{1}{a_{n+1}}=(n+1)@left(1+@frac{1}{a_n}@right)=(n+1)+(n+1)@frac{1}{a_n}.$$`,
      `反复展开得 $$@frac{1}{a_{n+1}}=(n+1)!@sum_{k=0}^{n}@frac{1}{k!}.$$`,
      `于是 $n!a_n=@dfrac{1}{@sum_{k=0}^{n-1}1/k!}@to@dfrac{1}{e}$。`
    ],
    hints: ['递推式取倒数，会出现 $1+1/a_n$ 的结构。', '展开两次观察规律，得到阶乘乘以部分和。', '利用 $@sum 1/k!@to e$。'],
    pitfalls: ['直接对 $a_{n+1}$ 取极限，得到不动的 0，无法求阶乘极限。'],
    takeaway: '递推含“$a_n/(a_n+1)$”时，取倒数把分式线性化，再用阶乘展开。',
    knowledge: ['k-sequence-monotone', 'k-series-tests']
  },
  {
    id: 'nm2020-7', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 10, difficulty: 4,
    stem: `设 $f(x)$ 在 $[0,1]$ 上连续，在 $(0,1)$ 内可导，$f(0)=0$，$f(1)=1$。证明：(1) 存在 $x_0@in(0,1)$，使 $f(x_0)=2-3x_0$；(2) 存在 $@xi@ne@eta@in(0,1)$，使 $[1+f\'(@xi)][1+f\'(@eta)]=4$。`,
    answer: `见解析（介值定理 + 两次拉格朗日中值定理）`,
    accept: [],
    solution: [
      `(1) 令 $F(x)=f(x)-2+3x$，则 $F(0)=-2$，$F(1)=2$，由介值定理存在 $x_0@in(0,1)$ 使 $F(x_0)=0$。`,
      `(2) 在 $[0,x_0]$ 与 $[x_0,1]$ 上分别用拉格朗日中值定理：$$f\'(@xi)=@frac{f(x_0)}{x_0},@qquad f\'(@eta)=@frac{f(x_0)-1}{x_0-1}.$$`,
      `由 $f(x_0)=2-3x_0$ 得 $1+f\'(@xi)=@frac{2-2x_0}{x_0}$，$1+f\'(@eta)=@frac{2x_0}{1-x_0}$，相乘等于 4。`
    ],
    hints: ['(1) 把等式移项成 $F(x)=0$ 的零点问题。', '(2) 把两个导数分别用两个子区间的中值定理表示。', '利用 $f(x_0)=2-3x_0$ 化简乘积。'],
    pitfalls: ['(1) 只验证端点符号，没写连续性。', '(2) 两个中值点可能重合，需说明区间不重叠（一个在左、一个在右）。'],
    takeaway: '“证明两个导数满足某关系”常用两次中值定理，再用题目给的中间点条件把式子凑成常数。',
    knowledge: ['k-meanvalue', 'k-ivt']
  },
  {
    id: 'nm2020-8', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'multivariable', type: 'solution', score: 12, difficulty: 4,
    stem: `已知 $z=xf@left(@dfrac yx@right)+2y@varphi@left(@dfrac xy@right)$，其中 $f,@varphi$ 均二次可微。(1) 求 $@dfrac{@partial z}{@partial x}$，$@dfrac{@partial^2 z}{@partial x@partial y}$；(2) 当 $f=@varphi$ 且 $@left.@dfrac{@partial^2 z}{@partial x@partial y}@right|_{x=a}=-by^2$ 时，求 $f$。`,
    answer: `(1) $z_x=f-@frac yxf\'+2@varphi\'$，$z_{xy}=-@frac{y}{x^2}f\'\'-@frac{2x}{y^2}@varphi\'\'$；(2) $f(u)=@frac{a^3b}{3}@left(@frac{1}{3u^2}-@frac{u^3}{6}@right)+C_1u+C_2$`,
    accept: [],
    solution: [
      `(1) 记 $u=y/x$，$v=x/y$：$$z_x=f(u)+x f\'(u)@left(-@frac{y}{x^2}@right)+2y@varphi\'(v)@frac1y=f(u)-@frac yx f\'(u)+2@varphi\'(v).$$`,
      `再对 $y$ 求导：$$z_{xy}=-@frac{1}{x}f\'(u)-@frac yx f\'\'(u)@frac1x-@frac{2x}{y^2}@varphi\'\'(v)=-@frac{y}{x^2}f\'\'(u)-@frac{2x}{y^2}@varphi\'\'(v).$$`,
      `(2) $f=@varphi$ 时，在 $x=a$ 处 $$-@frac{y}{a^2}f\'\'@left(@frac ya@right)-@frac{2a}{y^2}f\'\'@left(@frac ay@right)=-by^2.$$`,
      `令 $y=au$，整理得 $u^3f\'\'(u)+2f\'\'(1/u)=a^3bu^4$；用 $1/u$ 替换 $u$ 再联立，解得 $f\'\'(u)=@frac{a^3b}{3}@left(@frac{2}{u^4}-u@right)$。`,
      `积分两次得 $f(u)=@frac{a^3b}{3}@left(@frac{1}{3u^2}-@frac{u^3}{6}@right)+C_1u+C_2$。`
    ],
    hints: ['(1) 链式法则，注意 $u=y/x$、$v=x/y$ 对 $x$ 的导数。', '(2) 把 $x=a$ 代入后令 $y=au$，化成关于 $f\'\'$ 的函数方程。', '用 $u@to1/u$ 再写一遍，联立消去 $f\'\'(1/u)$。'],
    pitfalls: ['求 $z_x$ 时漏掉 $x$ 对 $f(y/x)$ 的乘积项。', '(2) 不换元直接积分，变量混乱。'],
    takeaway: '抽象函数偏导先“链式展开”再代特殊值；函数方程常用“变量倒替换”制造第二个方程。',
    knowledge: ['k-multi-chain']
  },
  {
    id: 'nm2020-9', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'multiple-integral', type: 'solution', score: 12, difficulty: 4,
    stem: `计算 $$I=@oint_@Gamma|@sqrt3y-x|@,dx-5z@,dz,$$ 其中 $@Gamma:@begin{cases}x^2+y^2+z^2=8§x^2+y^2=2z@end{cases}$，从 $z$ 轴正向看去取逆时针方向。`,
    answer: `$0$`,
    accept: ['0'],
    solution: [
      `由两式相减得 $z^2+2z-8=0$，$z=2$（舍去 $z=-4$），故 $@Gamma$ 是平面 $z=2$ 上半径 2 的圆。`,
      `参数化 $x=2@cos@theta,@ y=2@sin@theta,@ z=2$，$@theta$ 从 $0$ 到 $2@pi$；$dz=0$。`,
      `$$I=@int_0^{2@pi}|2@sqrt3@sin@theta-2@cos@theta|(-2@sin@theta)d@theta=-8@int_0^{2@pi}|@cos(@theta+@frac@pi3)|@sin@theta@,d@theta.$$`,
      `令 $t=@theta+@frac@pi3$，利用周期性化为 $@int_{-@pi}^{@pi}|@cos t|@sin(t-@frac@pi3)dt$，奇偶性使结果为 $0$。`
    ],
    hints: ['先求交线：由两式消去 $x^2+y^2$ 得 $z$。', '曲线在水平面 $z=2$ 上，$dz=0$，只剩 $|@sqrt3y-x|dx$。', '把绝对值内的式子写成余弦，利用周期与奇偶性判断为 0。'],
    pitfalls: ['没有判断 $z$ 的取值，参数化错误。', '忽略绝对值，直接积分得非零错误结果。'],
    takeaway: '空间曲线积分先“降维”：找所在平面 → 参数化 → 利用绝对值的对称性判断零。',
    knowledge: ['k-green-gauss', 'k-symmetry']
  },
  {
    id: 'nm2020-10', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'series', type: 'solution', score: 12, difficulty: 4,
    stem: `证明 $$f(n)=@sum_{m=1}^{n}@int_0^m@cos@frac{2@pi n[x+1]}{m}dx$$ 等于 $n$ 的所有因子（包括 1 和 $n$）之和，其中 $[x+1]$ 表示不超过 $x+1$ 的最大整数，并计算 $f(2021)$。`,
    answer: `$f(n)=@sigma(n)$；$f(2021)=2112$`,
    accept: ['2112'],
    solution: [
      `把 $[0,m]$ 按整数段拆开，$[x+1]=k+1$（$x@in[k,k+1)$），积分得 $$@int_0^m@cos@frac{2@pi n[x+1]}{m}dx=@sum_{k=0}^{m-1}@int_k^{k+1}@cos@frac{2@pi n(k+1)}{m}dx.$$`,
      `当 $m@mid n$ 时，每个整周期积分为 $m$；否则用 $@sum_{k=1}^{m}@cos kt=@cos@frac{(m+1)t}{2}@cdot@frac{@sin(mt/2)}{@sin(t/2)}$，取 $t=@frac{2@pi n}{m}$ 得 0。`,
      `故求和只剩 $m|n$ 的项，$f(n)=@sum_{m|n}m$。$2021=43@times47$，故 $f(2021)=1+43+47+2021=2112$。`
    ],
    hints: ['$[x+1]$ 在整数点处跳变，按 $[k,k+1)$ 分段积分。', '每段的积分是 $@cos(2@pi n(k+1)/m)$，对 $k$ 求和用三角和公式。', '只有当 $m$ 整除 $n$ 时，整周期求和不为 0。'],
    pitfalls: ['没有分段，直接对 $[x+1]$ 积分。', '把 $[x+1]$ 误当成 $x+1$。'],
    takeaway: '含取整函数的积分：按整数区间分段 → 每段是常数相位 → 三角和公式判断是否为零。',
    knowledge: ['k-int-techniques', 'k-series-tests']
  },
  {
    id: 'nm2020-11', group: 'nm', edition: 12, year: 2020, stage: '初赛', paper: '非数学类',
    topic: 'series', type: 'solution', score: 14, difficulty: 5,
    stem: `设 $$u_n=@int_0^1@frac{dt}{(1+t^4)^n}@quad(n@ge1).$$ (1) 证明 $@left@{u_n@right@}$ 收敛并求 $@lim u_n$；(2) 证明 $@sum_{n=1}^{@infty}(-1)^nu_n$ 条件收敛；(3) 证明 $p@ge1$ 时 $@sum u_n/n^p$ 收敛，并求 $@sum u_n/n$。`,
    answer: `(1) $u_n@to0$；(2) 条件收敛；(3) $@sum u_n/n=@ln2+@frac{@sqrt2}{2}[@pi+2@ln(1+@sqrt2)]$`,
    accept: [],
    solution: [
      `(1) 对任意 $@varepsilon>0$ 取 $a<@varepsilon/2$，则 $u_n@le a+@int_a^1@frac{dt}{(1+a^4)^n}@to a$，故 $u_n@to0$。`,
      `(2) $u_n$ 单调递减趋于 0，Leibniz 判别给出收敛；又 $u_n@ge@int_0^1@frac{dt}{(1+t)^n}=@frac{1}{n-1}(1-2^{1-n})$，故 $@sum u_n$ 发散，故条件收敛。`,
      `(3) 分部积分得递推 $$u_n=@frac{1}{2^n}+4n(u_n-u_{n+1}).$$ 于是 $$@sum_{n=1}^{@infty}@frac{u_n}{n}=@sum_{n=1}^{@infty}@frac{1}{n2^n}+4@sum(u_n-u_{n+1})=@ln2+4u_1.$$`,
      `由 $u_1=@int_0^1@frac{dt}{1+t^4}=@frac{@sqrt2}{8}[@pi+2@ln(1+@sqrt2)]$，得 $@sum u_n/n=@ln2+@frac{@sqrt2}{2}[@pi+2@ln(1+@sqrt2)]$。`
    ],
    hints: ['(1) 把积分拆成 $[0,a]$ 与 $[a,1]$，后者指数衰减。', '(2) 用 $1+t^4@le(1+t)^4$ 得下界，证明 $@sum u_n$ 发散。', '(3) 对 $u_n$ 分部积分，得到 $u_n$ 与 $u_n-u_{n+1}$ 的递推。'],
    pitfalls: ['(1) 直接说“被积函数趋于 0”而不控制积分区间。', '(3) 分部积分时 $u^4$ 的导数系数写错。'],
    takeaway: '积分型数列：拆区间控制尾部；条件收敛靠“Leibniz + 下界发散”；求和靠分部积分递推。',
    knowledge: ['k-convergence-improper', 'k-series-tests', 'k-int-techniques']
  },

  /* ================= 第12届决赛（2021）非数学类 ================= */
  {
    id: 'nm2021f-1', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 3,
    stem: `极限 $$@lim_{n@to@infty}@sum_{k=1}^{n}@frac{k}{n^2}@sin^2@left(1+@frac kn@right)=$$ ________ .`,
    answer: `$@dfrac18@left(2-2@sin4-@cos4+@cos2@right)$`,
    accept: ['(2-2sin4-cos4+cos2)/8'],
    solution: [
      `这是黎曼和：$$@lim@sum_{k=1}^{n}@frac kn@sin^2@left(1+@frac kn@right)@frac1n=@int_0^1x@sin^2(1+x)dx.$$`,
      `用 $@sin^2(1+x)=@frac{1-@cos(2+2x)}{2}$ 展开，分部积分得 $$@int_0^1x@sin^2(1+x)dx=@frac14-@frac18(2@sin4+@cos4-@cos2).$$`,
      `化简为 $@frac18(2-2@sin4-@cos4+@cos2)$。`
    ],
    hints: ['把 $@frac{k}{n^2}$ 写成 $@frac kn@cdot@frac1n$，识别黎曼和。', '用倍角公式降幂，再分部积分。'],
    pitfalls: ['把 $@sin^2(1+k/n)$ 中的 $1$ 忽略。', '积分限写成 $[1,2]$ 而不是 $[0,1]$。'],
    takeaway: '$@sum@frac{k}{n^2}f(k/n)$ 型极限 = $@int_0^1 x f(x)dx$，先识别再算。',
    knowledge: ['k-lim-integral-def', 'k-int-techniques']
  },
  {
    id: 'nm2021f-2', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'multivariable', type: 'fill', score: 6, difficulty: 3,
    stem: `设 $P_0(1,1,-1)$，$P_1(2,-1,0)$ 为空间两点，则函数 $u=xyz+e^{xyz}$ 在点 $P_0$ 处沿 $@overrightarrow{P_0P_1}$ 方向的方向导数为 ________ .`,
    answer: `$@dfrac{2}{@sqrt6}(1+e^{-1})$`,
    accept: ['2(1+1/e)/√6'],
    solution: [
      `方向向量 $@overrightarrow{P_0P_1}=(1,-2,1)$，单位化 $@vec l=@frac1{@sqrt6}(1,-2,1)$。`,
      `$@nabla u=(yz(1+e^{xyz}),xz(1+e^{xyz}),xy(1+e^{xyz}))$，在 $P_0$ 处为 $-(1+e^{-1})(1,1,-1)$。`,
      `方向导数 $=@nabla u@cdot@vec l=@frac{2}{@sqrt6}(1+e^{-1})$。`
    ],
    hints: ['先算梯度，再点乘单位方向向量。', '在 $P_0$ 处 $xyz=-1$，所以 $e^{xyz}=e^{-1}$。'],
    pitfalls: ['方向向量没有单位化。', '$z=-1$ 代入时符号出错。'],
    takeaway: '方向导数 = 梯度 · 单位方向向量；梯度公式先写全再代点。',
    knowledge: ['k-multi-chain']
  },
  {
    id: 'nm2021f-3', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'multiple-integral', type: 'fill', score: 6, difficulty: 4,
    stem: `记空间曲线 $@Gamma:@begin{cases}x^2+y^2+z^2=a^2§x+y+z=0@end{cases}$（$a>0$），则 $@oint_@Gamma(1+x)^2@,ds=$ ________ .`,
    answer: `$2@pi a@left(1+@dfrac{a^2}{3}@right)$`,
    accept: ['2πa(1+a²/3)'],
    solution: [
      `展开：$@oint(1+2x+x^2)ds=@oint ds+2@oint x@,ds+@oint x^2ds$。`,
      `曲线关于原点对称且轮换对称，$@oint x@,ds=0$，$@oint x^2ds=@frac13@oint(x^2+y^2+z^2)ds=@frac{a^2}{3}@oint ds$。`,
      `又 $@Gamma$ 是大圆，长度 $2@pi a$，故结果为 $2@pi a(1+a^2/3)$。`
    ],
    hints: ['先展开平方。', '$x$ 的一次项由对称性积分为 0。', '用 $x^2+y^2+z^2=a^2$ 与轮换对称把 $x^2$ 换成 $@frac{a^2}{3}$。'],
    pitfalls: ['直接算 $@oint x^2ds$ 的参数积分，计算量大。', '忘记曲线长度 $2@pi a$。'],
    takeaway: '球面与平面的交线是圆：用轮换对称 + 长度公式，几乎不用参数化。',
    knowledge: ['k-symmetry', 'k-green-gauss']
  },
  {
    id: 'nm2021f-4', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'geometry-linear', type: 'fill', score: 6, difficulty: 4,
    stem: `设 3 阶矩阵 $A$ 的伴随矩阵 $A^*=@operatorname{diag}(1,16,1)$，且 $|A|>0$，$ABA^{-1}=BA^{-1}+3I$，其中 $I$ 为单位矩阵，则 $B=$ ________ .`,
    answer: `$@operatorname{diag}(4,-1,4)$`,
    accept: ['diag(4,-1,4)'],
    solution: [
      `由 $|A^*|=|A|^{2}=16$ 且 $|A|>0$ 得 $|A|=4$，故 $A^*=4A^{-1}$，$A^{-1}=@frac14A^*$。`,
      `方程两边左乘 $A^{-1}$、右乘 $A$：$B=A^{-1}B+3I$，即 $(I-A^{-1})B=3I$。`,
      `$I-A^{-1}=I-@frac14A^*=@operatorname{diag}(@frac34,-3,@frac34)$，其逆乘 3 得 $B=@operatorname{diag}(4,-1,4)$。`
    ],
    hints: ['先由 $|A^*|=|A|^{n-1}$ 求 $|A|$。', '把矩阵方程整理成 $(I-A^{-1})B=3I$。', '对角矩阵求逆只需逐项取倒数。'],
    pitfalls: ['把 $|A^*|$ 当成 $|A|$。', '矩阵方程两边乘的顺序不一致。'],
    takeaway: '伴随矩阵三件套：$AA^*=|A|I$、$|A^*|=|A|^{n-1}$、$A^{-1}=A^*/|A|$。',
    knowledge: ['k-matrix']
  },
  {
    id: 'nm2021f-5', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'multivariable', type: 'fill', score: 6, difficulty: 4,
    stem: `函数 $$u=x_1+@frac{x_2}{x_1}+@frac{x_3}{x_2}+@frac{2}{x_3}@quad(x_i>0,@ i=1,2,3)$$ 的所有极值点为 ________ .`,
    answer: `$@left(2^{1/4},@,2^{1/2},@,2^{3/4}@right)$`,
    accept: ['(2^(1/4),2^(1/2),2^(3/4))'],
    solution: [
      `令偏导为零：$$1-@frac{x_2}{x_1^2}=0,@quad@frac{1}{x_1}-@frac{x_3}{x_2^2}=0,@quad@frac{1}{x_2}-@frac{2}{x_3^2}=0.$$`,
      `解得唯一驻点 $x_1=2^{1/4},@ x_2=2^{1/2},@ x_3=2^{3/4}$。`,
      `由均值不等式 $u@ge4@sqrt[4]{2}$，且该点取到等号，故为唯一极小值点。`
    ],
    hints: ['三个偏导为零，逐个解出变量关系。', '也可直接用四项均值不等式，等号条件给出极值点。'],
    pitfalls: ['只解出两个变量就下结论。', '忘记验证是极小值（或唯一性）。'],
    takeaway: '分式连乘结构优先想均值不等式；等号条件往往就是唯一驻点。',
    knowledge: ['k-extrema', 'k-inequality']
  },
  {
    id: 'nm2021f-6', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'limits', type: 'solution', score: 12, difficulty: 4,
    stem: `设 $$f(x)=@sqrt{@frac{1+x}{1-x}}@cdot@sqrt[4]{@frac{1+2x}{1-2x}}@cdots@sqrt[2n]{@frac{1+nx}{1-nx}},$$ 求 $$@lim_{x@to0}@frac{f(x)-1}{3@pi@arcsin x-(x^2+1)@arctan^3x}.$$`,
    answer: `$@dfrac{n}{3@pi}$`,
    accept: ['n/(3π)'],
    solution: [
      `取对数：$@ln f(x)=@sum_{k=1}^{n}@frac{1}{2k}@ln@frac{1+kx}{1-kx}$，求导得 $@frac{f\'(x)}{f(x)}=@sum_{k=1}^{n}@frac{1}{2k}@left(@frac{k}{1+kx}+@frac{k}{1-kx}@right)$。`,
      `令 $x=0$ 得 $f(0)=1$，$f\'(0)=@sum_{k=1}^{n}@frac{1}{2k}@cdot2k=n$。`,
      `分母 $g(x)=3@pi@arcsin x-(x^2+1)@arctan^3x$，$g(0)=0$，$g\'(0)=3@pi$。`,
      `由洛必达：原极限 $=@frac{f\'(0)}{g\'(0)}=@frac{n}{3@pi}$。`
    ],
    hints: ['先取对数，把连乘变成求和。', '求出 $f(0),f\'(0)$ 后对原式用一次洛必达。', '分母求导时 $@arcsin x@to1$，$@arctan^3x$ 项为高阶。'],
    pitfalls: ['直接对连乘求导，项数爆炸。', '忘记 $f(0)=1$ 使洛必达后只剩 $f\'(0)$。'],
    takeaway: '连乘型函数在 $x=0$ 的极限：取对数 → 求 $f\'(0)$ → 洛必达。',
    knowledge: ['k-derivative-toolkit', 'k-lim-equiv']
  },
  {
    id: 'nm2021f-7', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'series', type: 'solution', score: 12, difficulty: 4,
    stem: `求幂级数 $$@sum_{n=1}^{@infty}@left[1-n@ln@left(1+@frac1n@right)@right]x^n$$ 的收敛域。`,
    answer: `$[-1,@,1)$`,
    accept: ['[-1,1)'],
    solution: [
      `记 $a_n=1-n@ln(1+1/n)$。由 $@ln(1+1/n)=@frac1n-@frac1{2n^2}+O(n^{-3})$ 得 $a_n@sim@frac1{2n}$，故 $R=1$。`,
      `$x=1$：$@sum a_n$ 与调和级数同阶，发散。`,
      `$x=-1$：需证 $a_n$ 单调递减趋于 0。令 $f(x)=x@ln(1+1/x)$，则 $f\'(x)=@ln(1+1/x)-@frac1{1+x}>0$，故 $a_n-a_{n+1}>0$，由 Leibniz 收敛。`,
      `收敛域为 $[-1,1)$。`
    ],
    hints: ['先做 $a_n$ 的等价估计，得 $R=1$。', '端点分别代入：$x=1$ 发散，$x=-1$ 用 Leibniz。', '证明 $a_n$ 单调：构造 $f(x)=x@ln(1+1/x)$ 并求导。'],
    pitfalls: ['只说 $R=1$ 就写收敛区间 $(-1,1)$。', '端点点数判断反了。'],
    takeaway: '幂级数端点：$x=1$ 看正项级数阶，$x=-1$ 看交错级数单调性；单调性常构造连续函数求导。',
    knowledge: ['k-power-series', 'k-series-tests']
  },
  {
    id: 'nm2021f-8', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 12, difficulty: 5,
    stem: `设 $f(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内二阶可导，且 $f(a)=f(b)=0$，$@int_a^bf(x)dx=0$。证明：(1) 存在互不相同的 $x_1,x_2@in(a,b)$，使 $f\'(x_i)=f(x_i)$（$i=1,2$）；(2) 存在 $@xi@in(a,b)$，$@xi@ne x_i$，使 $f\'\'(@xi)=f(@xi)$。`,
    answer: `见解析（构造 $e^{-x}@int f$ 与 $e^x(f\'-f)$，两次罗尔）`,
    accept: [],
    solution: [
      `(1) 令 $F(x)=e^{-x}@int_a^xf(t)dt$，则 $F(a)=F(b)=0$，由罗尔定理存在 $x_0$ 使 $F\'(x_0)=0$，即 $f(x_0)=@int_a^{x_0}f$。`,
      `再令 $G(x)=f(x)-@int_a^xf$，则 $G(a)=G(x_0)=G(b)=0$。在 $[a,x_0]$ 与 $[x_0,b]$ 上分别用罗尔定理，得 $x_1,x_2$ 使 $G\'=0$，即 $f\'(x_i)=f(x_i)$，且 $x_1@ne x_2$。`,
      `(2) 令 $@varphi(x)=e^x[f\'(x)-f(x)]$，则 $@varphi(x_1)=@varphi(x_2)=0$，且 $@varphi\'(x)=e^x[f\'\'(x)-f(x)]$。`,
      `对 $@varphi$ 在 $[x_1,x_2]$ 上用罗尔定理，得 $@xi$ 使 $@varphi\'(@xi)=0$，即 $f\'\'(@xi)=f(@xi)$，且 $@xi@ne x_i$。`
    ],
    hints: ['(1) 先由 $@int_a^b f=0$ 找 $x_0$ 使 $f(x_0)=@int_a^{x_0}f$：构造 $e^{-x}@int_a^x f$。', '再把 $G=f-@int f$ 的三个零点用两次罗尔。', '(2) 看到 $f\'\'-f$，构造 $e^x(f\'-f)$。'],
    pitfalls: ['(1) 只找到一个点，没有说明 $x_1@ne x_2$。', '(2) 构造的辅助函数导数不是 $f\'\'-f$ 的倍数。'],
    takeaway: '$f\'-f$ 配 $e^{-x}$，$f\'\'-f$ 配 $e^x(f\'-f)$；积分条件用 $@int_a^x f$ 造零点。',
    knowledge: ['k-meanvalue', 'k-proof-methods']
  },
  {
    id: 'nm2021f-9', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'geometry-linear', type: 'solution', score: 12, difficulty: 5,
    stem: `设 $A$ 是 $n$ 阶实对称矩阵。证明：(1) 存在实对称矩阵 $B$，使 $B^{2021}=A$ 且 $AB=BA$；(2) 存在多项式 $p(x)$，使上述 $B=p(A)$；(3) 这样的 $B$ 唯一。`,
    answer: `见解析（正交对角化 + 特征值开 2021 次方 + 插值多项式）`,
    accept: [],
    solution: [
      `(1) 正交对角化 $A=QDQ^T$，令 $B=QD^{1/2021}Q^T$，其中 $D^{1/2021}=@operatorname{diag}(@lambda_i^{1/2021})$（取实根）。`,
      `则 $B^{2021}=QDQ^T=A$，且 $AB=QDD^{1/2021}Q^T=QD^{1/2021}DQ^T=BA$，$B$ 实对称。`,
      `(2) 设 $A$ 的互异特征值为 $@lambda_1,@cdots,@lambda_s$，由插值存在多项式 $p$ 使 $p(@lambda_i)=@lambda_i^{1/2021}$，则 $p(A)=Qp(D)Q^T=B$。`,
      `(3) 若 $C$ 也满足，则 $C$ 与 $B$ 可同时对角化，$C^{2021}=B^{2021}$ 推出对应特征值相等，故 $C=B$。`
    ],
    hints: ['(1) 实对称矩阵必可正交对角化，对特征值开方即可。', '(2) 用拉格朗日插值在互异特征值上指定取值。', '(3) 同时对角化后逐特征值比较。'],
    pitfalls: ['没有说明开方取实根（负特征值开奇次方仍为实）。', '(2) 直接把 $p$ 写成 $x^{1/2021}$（不是多项式）。'],
    takeaway: '实对称矩阵的“函数演算”：正交对角化 → 对特征值做运算 → 插值多项式实现。',
    knowledge: ['k-matrix']
  },
  {
    id: 'nm2021f-10', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'series', type: 'solution', score: 12, difficulty: 5,
    stem: `设 $$A_n(x,y)=@sum_{k=0}^{n}x^{n-k}y^k@quad(0<x,y<1).$$ 证明：$$@frac{2}{2-x-y}@le@sum_{n=0}^{@infty}@frac{A_n(x,y)}{n+1}@le@frac12@left(@frac1{1-x}+@frac1{1-y}@right).$$`,
    answer: `见解析（先求和，再化为对数不等式 / 或逐项归纳）`,
    accept: [],
    solution: [
      `当 $x@ne y$ 时，$$@sum_{n=0}^{@infty}@frac{A_n}{n+1}=@frac{1}{y-x}@sum_{n=1}^{@infty}@frac{y^n-x^n}{n}=@frac{1}{y-x}@ln@frac{1-x}{1-y}.$$`,
      `令 $t=@frac{y-x}{2-x-y}@in(0,1)$，不等式化为 $t@le@frac12@ln@frac{1+t}{1-t}@le@frac{t}{2}@left(@frac1{1-t}+@frac1{1+t}@right)$。`,
      `由展开 $@frac12@ln@frac{1+t}{1-t}=@sum_{m=0}^{@infty}@frac{t^{2m+1}}{2m+1}$ 与 $@frac{1}{1-t^2}=@sum t^{2m}$，比较系数即得。`,
      `$x=y$ 时和为 $@frac1{1-x}$，两端取等号，结论成立。`
    ],
    hints: ['先对 $n$ 求和：$A_n$ 是等比和，除以 $n+1$ 后出现 $@ln$。', '把 $x,y$ 的差换成 $t$，把不等式变成一元不等式。', '用 $@frac12@ln@frac{1+t}{1-t}$ 的幂级数逐项比较。'],
    pitfalls: ['直接对每项放缩，得不到紧的上下界。', '$x=y$ 的退化情形没有单独处理。'],
    takeaway: '含 $x^{n-k}y^k$ 的二重和先化成 $@frac{y^n-x^n}{y-x}$，再把两个变量的差归一化成一元 $t$。',
    knowledge: ['k-series-tests', 'k-inequality']
  },
  {
    id: 'nm2021f-11', group: 'nm', edition: 12, year: 2021, stage: '决赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 10, difficulty: 5,
    stem: `设 $f(x),g(x)$ 是 $[0,1]$ 到 $[0,1]$ 的连续函数，且 $f(x)$ 单调增加。求证：$$@int_0^1f(g(x))dx@le@int_0^1f(x)dx+@int_0^1g(x)dx.$$`,
    answer: `见解析（令 $F=f-x$，用单调性与最值估计）`,
    accept: [],
    solution: [
      `令 $F(x)=f(x)-x$，则需证 $@int_0^1F(g(x))dx@le@int_0^1F(x)dx+@frac12$。`,
      `设 $F$ 在 $x_0$ 取最大值 $a$。由 $0@le f@le1$ 得 $a@le1$。`,
      `当 $x@ge x_0$ 时 $f(x)@ge f(x_0)$，即 $F(x)@ge a+x_0-x$；分段估计得 $@int_0^1F(x)dx@ge a-@frac12+x_0(1-x_0)@ge a-@frac12$。`,
      `另一方面 $F(g(x))@le a$ 且 $F(x)@ge-x$，故 $F(g(x))-F(x)@le a+x@le a+1$；结合上式可整理得所证不等式。`
    ],
    hints: ['把 $f$ 换成 $F=f-x$，不等式变成关于 $F$ 的形式。', '用 $f$ 单调性把 $F$ 的最大值附近“抬高”。', '利用 $0@le f@le1$ 控制 $F$ 的取值范围。'],
    pitfalls: ['直接对 $f(g(x))$ 放缩成 $f(1)$，界太松。', '忽略 $f$ 单调增加这一关键条件。'],
    takeaway: '“$@int f(g)$ 与 $@int f+@int g$”型不等式：令 $F=f-x$，用单调性控制最大值附近的面积。',
    knowledge: ['k-inequality', 'k-proof-methods']
  },

  /* ================= 第10届初赛（2018）非数学类 ================= */
  {
    id: 'nm2018-1', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 2,
    stem: `设 $@alpha@in(0,1)$，则 $@lim_{n@to+@infty}@left((n+1)^@alpha-n^@alpha@right)=$ ________ .`,
    answer: `$0$`,
    accept: ['0'],
    solution: [
      `由中值定理，$(n+1)^@alpha-n^@alpha=@alpha@xi^{@alpha-1}$（$@xi@in(n,n+1)$），故 $$0<(n+1)^@alpha-n^@alpha@le@frac{@alpha}{n^{1-@alpha}}@to0.$$`,
      `由夹逼准则，极限为 $0$。`
    ],
    hints: ['提公因式：$n^@alpha@left((1+1/n)^@alpha-1@right)$。', '用 $(1+u)^@alpha@le1+u$（$0<@alpha<1$）放缩。'],
    pitfalls: ['把 $@alpha@in(0,1)$ 当成 $@alpha>1$，误以为发散到无穷。'],
    takeaway: '$n^@alpha$ 型差分的极限：提公因式 + 伯努利放缩，$@alpha<1$ 时趋于 0。',
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'nm2018-2', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'derivative', type: 'fill', score: 6, difficulty: 3,
    stem: `若曲线 $y=y(x)$ 由 $$@begin{cases}x=t+@cos t§e^y+ty+@sin t=1@end{cases}$$ 确定，则此曲线在 $t=0$ 对应点处的切线方程为 ________ .`,
    answer: `$y=-(x-1)$`,
    accept: ['y=-x+1'],
    solution: [
      `$t=0$ 时 $x=1$，$e^y=1$ 得 $y=0$。`,
      `对 $x=t+@cos t$ 求导：$@frac{dx}{dt}=1-@sin t$，在 $t=0$ 处为 1。`,
      `对 $e^y+ty+@sin t=1$ 求导：$e^y y\'+y+ty\'+@cos t=0$，代入 $t=0,y=0$ 得 $y\'=-1$。故切线 $y=-(x-1)$。`
    ],
    hints: ['先由 $t=0$ 求切点坐标。', '两条方程分别对 $t$ 求导，再算 $dy/dx$。'],
    pitfalls: ['忘记 $y$ 也是 $t$ 的函数。', '切线写成法线。'],
    takeaway: '参数方程切线：分别求 $dx/dt,dy/dt$，再相除；切点由参数值定。',
    knowledge: ['k-derivative-toolkit']
  },
  {
    id: 'nm2018-3', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'integral', type: 'fill', score: 6, difficulty: 3,
    stem: `$$@int@frac{@ln@left(x+@sqrt{1+x^2}@right)}{(1+x^2)^{3/2}}dx=$$ ________ .`,
    answer: `$@dfrac{x}{@sqrt{1+x^2}}@ln@left(x+@sqrt{1+x^2}@right)-@dfrac12@ln(1+x^2)+C$`,
    accept: ['x/√(1+x^2)ln(x+√(1+x^2))-1/2ln(1+x^2)+C'],
    solution: [
      `令 $x=@tan t$，则 $dx=@sec^2t@,dt$，分母 $(1+x^2)^{3/2}=@sec^3t$，积分化为 $@int@ln(@tan t+@sec t)@cos t@,dt$。`,
      `注意 $@cos t@,dt=d(@sin t)$，分部积分：$$=@sin t@ln(@tan t+@sec t)-@int@sin t@cdot@frac{@sec t(@sec t+@tan t)}{@tan t+@sec t}dt.$$`,
      `化简后一项为 $@int@tan t@,dt=-@ln|@cos t|$，回代 $@sin t=@frac{x}{@sqrt{1+x^2}}$ 得结果。`
    ],
    hints: ['根式 $@sqrt{1+x^2}$ 提示 $x=@tan t$。', '分母的 $@sec^3t$ 与 $dx$ 约掉后剩 $@cos t@,dt$，正好是 $d(@sin t)$。'],
    pitfalls: ['三角代换后忘记回代。', '分部积分时把 $@ln(@sec t+@tan t)$ 的导数写错。'],
    takeaway: '含 $@ln(x+@sqrt{1+x^2})$ 的积分：$x=@tan t$ 后它变成 $@ln(@sec t+@tan t)$，再分部。',
    knowledge: ['k-int-techniques']
  },
  {
    id: 'nm2018-4', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'limits', type: 'fill', score: 6, difficulty: 3,
    stem: `$$@lim_{x@to0}@frac{1-@cos x@sqrt{@cos2x}@sqrt[3]{@cos3x}}{x^2}=$$ ________ .`,
    answer: `$3$`,
    accept: ['3'],
    solution: [
      `拆成三段：$1-@cos x@sqrt{@cos2x}@sqrt[3]{@cos3x}=(1-@cos x)+@cos x(1-@sqrt{@cos2x})+@cos x@sqrt{@cos2x}(1-@sqrt[3]{@cos3x})$。`,
      `分别用 $1-@cos x@sim@frac{x^2}{2}$、$1-(1+u)^{1/2}@sim-@frac u2$、$1-(1+u)^{1/3}@sim-@frac u3$，其中 $u=@cos2x-1@sim-2x^2$，$u=@cos3x-1@sim-@frac{9x^2}{2}$。`,
      `三段极限为 $@frac12$、$1$、$@frac32$，相加得 $3$。`
    ],
    hints: ['把乘积拆成“一个因子为 1”的差。', '用 $(1+u)^@alpha-1@sim@alpha u$。'],
    pitfalls: ['直接对整体用洛必达，链式法则极繁。', '$@cos3x-1@sim-@frac{(3x)^2}{2}$ 系数写错。'],
    takeaway: '多个余弦相乘的 $1-@prod$：逐项拆开，每项用 $(1+u)^@alpha-1@sim@alpha u$，系数相加。',
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'nm2018-5', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'ode', type: 'solution', score: 8, difficulty: 3,
    stem: `设函数 $f(t)$ 在 $t@ne0$ 时一阶连续可导，且 $f(1)=0$。求函数 $f(x^2-y^2)$，使得曲线积分 $$@int_L@left[y(2-f(x^2-y^2))@right]dx+xf(x^2-y^2)dy$$ 与路径无关，其中 $L$ 为任一不与直线 $y=@pm x$ 相交的分段光滑闭曲线。`,
    answer: `$f(t)=1-@dfrac1t$，即 $f(x^2-y^2)=1-@dfrac{1}{x^2-y^2}$`,
    accept: ['f(t)=1-1/t'],
    solution: [
      `记 $P=y(2-f)$，$Q=xf$，路径无关要求 $Q_x=P_y$：$$f+t f\'=1,@qquad t=x^2-y^2.$$`,
      `即 $(tf(t))\'=1$，积分得 $tf(t)=t+C$。`,
      `由 $f(1)=0$ 得 $C=-1$，故 $f(t)=1-@frac1t$。`
    ],
    hints: ['路径无关 ⇔ $@partial Q/@partial x=@partial P/@partial y$。', '把 $t=x^2-y^2$ 当整体，整理出 $f+t f\'=1$。', '注意 $(tf)\'=f+tf\'$，直接积分。'],
    pitfalls: ['链式法则时漏掉 $f$ 对 $t$ 的依赖。', '初值 $f(1)=0$ 带入方向错。'],
    takeaway: '路径无关题：偏导相等 + 令 $t=x^2-y^2$，往往化为 $(tf)\'=@cdots$ 的简单方程。',
    knowledge: ['k-green-gauss', 'k-ode-substitution']
  },
  {
    id: 'nm2018-6', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 14, difficulty: 4,
    stem: `设 $f(x)$ 在 $[0,1]$ 上连续，且 $1@le f(x)@le3$。证明：$$1@le@int_0^1f(x)dx@int_0^1@frac{1}{f(x)}dx@le@frac43.$$`,
    answer: `见解析（Cauchy–Schwarz 给下界，$(f-1)(f-3)@le0$ 给上界）`,
    accept: [],
    solution: [
      `Cauchy–Schwarz：$$@int_0^1f@cdot@int_0^1@frac1f@ge@left(@int_0^1@sqrt f@cdot@frac1{@sqrt f}dx@right)^2=1.$$`,
      `由 $1@le f@le3$ 得 $(f-1)(f-3)@le0$，即 $f+@frac3f@le4$，积分得 $@int f+3@int@frac1f@le4$。`,
      `记 $A=@int f$，$B=@int@frac1f$，则 $A+3B@le4$。又 $AB@le@left(@frac{A+3B}{2}@right)^2@cdot@frac13@le@frac{16}{12}=@frac43$。`
    ],
    hints: ['下界直接用 Cauchy–Schwarz。', '上界用 $f$ 的取值范围构造 $(f-1)(f-3)@le0$。', '把 $A+3B$ 与 $AB$ 用均值不等式联系起来。'],
    pitfalls: ['只用 $f@le3$ 得 $B@ge@frac13$，方向反了。', 'Cauchy–Schwarz 取错配对因子。'],
    takeaway: '$@int f@int 1/f$ 的夹逼：下界 Cauchy，上界由 $f$ 的取值区间给二次不等式。',
    knowledge: ['k-inequality']
  },
  {
    id: 'nm2018-7', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'multiple-integral', type: 'solution', score: 12, difficulty: 5,
    stem: `计算三重积分 $$@iiint_V(x^2+y^2)dV,$$ 其中 $V$ 是由 $x^2+y^2+(z-2)^2@ge4$，$x^2+y^2+(z-1)^2@le9$，$z@ge0$ 所围成的空心立体。`,
    answer: `$@dfrac{256@pi}{3}$`,
    accept: ['256π/3'],
    solution: [
      `记大球 $V_1:x^2+y^2+(z-1)^2@le9$，小球 $V_2:x^2+y^2+(z-2)^2@le4$，以及 $V_3$：大球中 $z<0$ 的部分。`,
      `球坐标（球心平移）算得 $$@iiint_{V_1}(x^2+y^2)dV=@frac{8}{15}@cdot3^5@pi,@qquad @iiint_{V_2}(x^2+y^2)dV=@frac{8}{15}@cdot2^5@pi.$$`,
      `对 $V_3$ 用柱坐标 $0@le r@le2@sqrt2$，$1-@sqrt{9-r^2}@le z@le0$：$$@iiint_{V_3}(x^2+y^2)dV=@int_0^{2@pi}@int_0^{2@sqrt2}r^3(@sqrt{9-r^2}-1)dr@,d@theta=@left(124-@frac25@cdot3^5+@frac25@right)@pi.$$`,
      `相减得 $I=@frac{256@pi}{3}$。`
    ],
    hints: ['几何体是“大球 − 小球 − $z<0$ 部分”。', '球心不在原点，先平移再用球坐标。', '三段分别算，最后相减。'],
    pitfalls: ['忽略 $z@ge0$ 的截断。', '球坐标忘记 $r^2@sin@varphi$ 因子。'],
    takeaway: '空心立体：先画图分解成“大减小”，每块选合适坐标系，最后统一相减。',
    knowledge: ['k-triple-integral', 'k-symmetry']
  },
  {
    id: 'nm2018-8', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 14, difficulty: 3,
    stem: `设 $f(x,y)$ 在区域 $D$ 内可微，且 $$@sqrt{@left(@frac{@partial f}{@partial x}@right)^2+@left(@frac{@partial f}{@partial y}@right)^2}@le M.$$ $A(x_1,y_1)$、$B(x_2,y_2)$ 是 $D$ 内两点，线段 $AB@subset D$。证明：$$|f(x_1,y_1)-f(x_2,y_2)|@le M|AB|.$$`,
    answer: `见解析（沿线段作一元函数，用拉格朗日中值定理 + Cauchy–Schwarz）`,
    accept: [],
    solution: [
      `令 $@varphi(t)=f(x_1+t(x_2-x_1),@ y_1+t(y_2-y_1))$，$t@in[0,1]$。`,
      `则 $@varphi(1)-@varphi(0)=@varphi\'(c)=f_x(u,v)(x_2-x_1)+f_y(u,v)(y_2-y_1)$。`,
      `由 Cauchy–Schwarz：$|@varphi\'|@le@sqrt{f_x^2+f_y^2}@cdot|AB|@le M|AB|$，即得结论。`
    ],
    hints: ['把线段参数化，构造一元函数 $@varphi(t)$。', '对 $@varphi$ 用拉格朗日中值定理。', '梯度模有界 + Cauchy–Schwarz。'],
    pitfalls: ['直接说“由中值定理”而不写辅助函数。', '把 $|AB|$ 写成坐标差之和。'],
    takeaway: '多元 Lipschitz 估计：沿线段化为一元函数，再用梯度模与 Cauchy–Schwarz。',
    knowledge: ['k-meanvalue', 'k-inequality']
  },
  {
    id: 'nm2018-9', group: 'nm', edition: 10, year: 2018, stage: '初赛', paper: '非数学类',
    topic: 'proof', type: 'solution', score: 14, difficulty: 4,
    stem: `证明：对于连续函数 $f(x)>0$，有 $$@ln@int_0^1f(x)dx@ge@int_0^1@ln f(x)dx.$$`,
    answer: `见解析（黎曼和 + AM–GM + 取极限）`,
    accept: [],
    solution: [
      `把 $[0,1]$ 等分，$@int_0^1 f=@lim@frac1n@sum f(x_k)$，同理 $@int_0^1@ln f=@lim@frac1n@sum@ln f(x_k)$。`,
      `对每组的 $f(x_k)$ 用 AM–GM：$$@frac1n@sum f(x_k)@ge@left(@prod f(x_k)@right)^{1/n}.$$`,
      `取对数得 $@frac1n@sum@ln f(x_k)@le@ln@left(@frac1n@sum f(x_k)@right)$，令 $n@to@infty$ 即得。`
    ],
    hints: ['先把积分写成黎曼和。', '对离散值用 AM–GM（几何平均不超过算术平均）。', '两边取对数，再用 $@ln$ 的连续性取极限。'],
    pitfalls: ['直接对连续函数用 AM–GM 而不说明离散逼近。', '不等号方向写反（$@ln$ 递增，$@ln$ 平均 ≤ $@ln$ 平均）。'],
    takeaway: '积分的对数不等式 = 黎曼和 + AM–GM + 极限；这是 Jensen 不等式的初等证明。',
    knowledge: ['k-inequality', 'k-int-techniques']
  }
];
