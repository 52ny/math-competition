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
      `积分因子 $@mu=e^{-@int@frac{2}{x(x+1)}dx}=@left(@frac{x+1}{x}@right)^2$，两边相乘得 $$@left(u@Big(@frac{x+1}{x}@Big)^2@right)'=-2(x+1).$$`,
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
      `(2) 对 $0<x@le1$：$$f'(x)=-@frac{1}{(1+x)@ln^2(1+x)}+@frac{1}{x^2}=@frac{g(x)}{x^2(1+x)@ln^2(1+x)},$$ 其中 $g(x)=(1+x)@ln^2(1+x)-x^2$。`,
      `$g'(x)=@ln^2(1+x)+2@ln(1+x)-2x$，$g''(x)=@frac{2@ln(1+x)-2x}{1+x}<0$，故 $g'$ 递减，$g'(x)<g'(0)=0$，从而 $g$ 递减，$g(x)<g(0)=0$。`,
      `所以 $f'(x)<0$，$f$ 在 $(0,1]$ 上严格递减，最小值在 $x=1$：$@lambda=f(1)=@frac1{@ln2}-1$；最大值在 $x=0$：$@mu=f(0)=@frac12$。`
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
    stem: `设 $f(x)$ 是 $(-@infty,+@infty)$ 上具有连续导数的非负函数，且存在 $M>0$，使得对任意 $x,y$ 有 $|f'(x)-f'(y)|@le M|x-y|$。证明：对任意实数 $x$，恒有 $$(f'(x))^2@le 2Mf(x).$$`,
    answer: `见解析（取 $|h|=@sqrt{2f(x)/M}$ 优化）`,
    accept: [],
    solution: [
      `对任意 $h@ne0$，由 Newton–Leibniz 公式与非负性：$$0@le f(x+h)=f(x)+@int_0^h f'(x+t)dt=f(x)+@int_0^h@left(f'(x+t)-f'(x)@right)dt+f'(x)h.$$`,
      `取 $h$ 使 $hf'(x)@le0$，则 $f'(x)h=-|f'(x)||h|$。由 Lipschitz 条件 $|f'(x+t)-f'(x)|@le M|t|$：$$-|f'(x)||h|@le -f(x)+M@frac{h^2}{2},$$`,
      `即 $|f'(x)||h|@le f(x)+@frac{M}{2}h^2$，两边除以 $|h|$：$|f'(x)|@le@frac{f(x)}{|h|}+@frac{M}{2}|h|$。`,
      `令 $|h|=@sqrt{@frac{2f(x)}{M}}$（$f(x)=0$ 时由非负性直接得 $f'@equiv0$），得 $|f'(x)|@le@sqrt{2Mf(x)}$，平方即得结论。`
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
    answer: `$2x'^2+2y'^2-7z'^2=27$，单叶双曲面`,
    accept: ['2x^2+2y^2-7z^2=27 单叶双曲面'],
    solution: [
      `二次型矩阵 $$A=@begin{pmatrix}1&-2&2§-2&-2&4§2&4&-2@end{pmatrix},$$ 特征多项式 $|@lambda E-A|=(@lambda-2)^2(@lambda+7)$，特征值 $2,2,-7$。`,
      `对 $@lambda=2$：特征向量 $@alpha_1=(-2,1,0)^T,@alpha_2=(2,0,1)^T$，Schmidt 正交化并单位化得 $$@beta_1=@frac{1}{@sqrt5}(-2,1,0)^T,@quad @beta_2=@frac{1}{3@sqrt5}(2,4,5)^T.$$`,
      `对 $@lambda=-7$：单位特征向量 $@beta_3=@frac13(1,2,-2)^T$。取 $Q=(@beta_1,@beta_2,@beta_3)$，令 $X=QX'$，得 $$2x'^2+2y'^2-7z'^2=27.$$`,
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
      `$Q_x=2yg'+2f'$，$P_y=2yf+2e^x-8g$，比较 $y$ 的系数与自由项得 $$g'-f=0,@qquad f'+4g=e^x.$$`,
      `消去 $f$：$g\'\'+4g=e^x$，通解 $g=C_1@cos2x+C_2@sin2x+@frac15e^x$。`,
      `由 $g(0)=1$ 得 $C_1+@frac15=1@Rightarrow C_1=@frac45$；由 $g'(0)=f(0)=1$ 得 $2C_2+@frac15=1@Rightarrow C_2=@frac25$。`,
      `故 $g(x)=@frac45@cos2x+@frac25@sin2x+@frac15e^x$，$f=g'=@frac45@cos2x-@frac85@sin2x+@frac15e^x$。`
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
    stem: `设函数 $f(x)$ 在闭区间 $[a,b]$ 上具有一阶连续导数，证明 $$@int_a^b@sqrt{1+[f'(x)]^2}dx@ge@sqrt{(b-a)^2+[f(b)-f(a)]^2},$$ 并给出等号成立的条件。`,
    answer: `恒成立；等号当且仅当 $f$ 为线性函数（曲线为直线段）`,
    accept: [],
    solution: [
      `令 $$F(t)=@int_a^t@sqrt{1+[f'(x)]^2}dx-@sqrt{(t-a)^2+[f(t)-f(a)]^2},$$ 则 $F(a)=0$。`,
      `求导：$$F'(t)=@sqrt{1+[f'(t)]^2}-@frac{(t-a)+[f(t)-f(a)]f'(t)}{@sqrt{(t-a)^2+[f(t)-f(a)]^2}}.$$`,
      `由 Cauchy–Schwarz：$$(t-a)+[f(t)-f(a)]f'(t)@le@sqrt{1+[f'(t)]^2}@sqrt{(t-a)^2+[f(t)-f(a)]^2},$$ 故 $F'(t)@ge0$，$F$ 单调递增，$F(b)@ge F(a)=0$。`,
      `等号成立当且仅当 $(1,f'(t))$ 与 $(t-a,f(t)-f(a))$ 共线，即 $f'(t)=@frac{f(t)-f(a)}{t-a}=k$，故 $f$ 为线性函数。`
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
    stem: `设 $f(x)$ 在 $[0,+@infty)$ 上是有界连续函数。证明：方程 $y''+14y'+13y=f(x)$ 的每一个解在 $[0,+@infty)$ 上都是有界函数。`,
    answer: `见解析（把二阶方程拆成两个一阶线性方程，写出通解后逐项估计）`,
    accept: [],
    solution: [
      `齐次方程特征根 $-1,-13$，齐次解 $C_1e^{-x}+C_2e^{-13x}$ 有界。`,
      `原方程可写成 $(y'+y)'+13(y'+y)=f$，令 $y_1=y'+y$，则 $y_1=e^{-13x}@left(@int_0^xf(t)e^{13t}dt+C_3@right)$。`,
      `又可写成 $(y'+13y)'+(y'+13y)=f$，令 $y_2=y'+13y=e^{-x}@left(@int_0^xf(t)e^tdt+C_4@right)$。`,
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
    stem: `设函数 $f(x)$ 在闭区间 $[a,b]$ 上有连续的二阶导数，证明：$$@lim_{n@to@infty}n^2@left[@int_a^bf(x)dx-@frac{b-a}{n}@sum_{k=1}^{n}f@left(a+@frac{2k-1}{2n}(b-a)@right)@right]=@frac{(b-a)^2}{24}@left[f'(b)-f'(a)@right].$$`,
    answer: `见解析（中点公式的 Taylor 展开 + 夹逼）`,
    accept: [],
    solution: [
      `记 $x_k=a+@frac{k(b-a)}{n}$，$@xi_k$ 为第 $k$ 个小区间的中点，$h=@frac{b-a}{n}$。在 $[x_{k-1},x_k]$ 上把 $f$ 在 $@xi_k$ 处展开：$$f(x)=f(@xi_k)+f'(@xi_k)(x-@xi_k)+@frac{f''(@eta_k)}{2}(x-@xi_k)^2.$$`,
      `对区间积分，一次项因对称性消失：$$@int_{x_{k-1}}^{x_k}f(x)dx-hf(@xi_k)=@frac12@int_{x_{k-1}}^{x_k}f''(@eta_k)(x-@xi_k)^2dx.$$`,
      `又 $@int_{x_{k-1}}^{x_k}(x-@xi_k)^2dx=@frac{h^3}{12}$，设 $f''$ 在小区间上的最大、最小值 $M_k,m_k$，则 $$@frac{h^2}{24}m_kh@le n^2B_n@le@frac{h^2}{24}M_kh,$$ 其中 $B_n$ 为原括号内量，求和后得 $$@frac{(b-a)^2}{24}@sum m_kh@le n^2B_n@le@frac{(b-a)^2}{24}@sum M_kh.$$`,
      `由 $f''$ 连续可积，$@sum m_kh$ 与 $@sum M_kh$ 都趋于 $@int_a^bf''=f'(b)-f'(a)$，夹逼得结论。`
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
  }
];
