/* 模拟题：用于方法练习，不进入真题卷与真题统计
 * kind: 'mock'；公式约定同其他数据文件。
 */
window.CMC_QUESTIONS_MOCK = [
  {
    id: 'mk-1', kind: 'mock', group: 'nm', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'limits', type: 'fill', score: 5, difficulty: 2,
    stem: `计算 $@lim_{x@to0}@dfrac{e^x-1-x}{x^2}=$ ________ .`,
    answer: `$@dfrac12$`,
    accept: ['1/2'],
    solution: [
      `用泰勒：$e^x=1+x+@frac{x^2}{2}+o(x^2)$。`,
      `分子 $=@frac{x^2}{2}+o(x^2)$，除以 $x^2$ 得 $@frac12$。`
    ],
    hints: ['展开到二阶，不要用一次洛必达后停手。'],
    pitfalls: ['把 $e^x-1$ 直接换成 $x$，导致分子变成 0。'],
    takeaway: '“指数 − 1 − 一次项”是二阶无穷小，必须展开到 $x^2$。',
    knowledge: ['k-lim-equiv']
  },
  {
    id: 'mk-2', kind: 'mock', group: 'nm', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'integral', type: 'fill', score: 5, difficulty: 2,
    stem: `计算 $@int_0^{@frac@pi2}x@sin x@,dx=$ ________ .`,
    answer: `$1$`,
    accept: ['1'],
    solution: [
      `分部积分：$@int x@sin x@,dx=-x@cos x+@sin x$。`,
      `代入上下限：$@left[-x@cos x+@sin x@right]_0^{@frac@pi2}=1$。`
    ],
    hints: ['把 $x$ 当 $u$，$@sin x@,dx$ 当 $dv$。'],
    pitfalls: ['分部积分符号写反。'],
    takeaway: '多项式乘三角：分部积分一次即可降次。',
    knowledge: ['k-int-techniques']
  },
  {
    id: 'mk-3', kind: 'mock', group: 'nm', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'ode', type: 'fill', score: 5, difficulty: 2,
    stem: `解初值问题 $y'=2xy$，$y(0)=1$，则 $y=$ ________ .`,
    answer: `$e^{x^2}$`,
    accept: ['e^(x^2)', 'exp(x^2)'],
    solution: [
      `分离变量：$@frac{dy}{y}=2x@,dx$。`,
      `积分得 $@ln|y|=x^2+C$，由 $y(0)=1$ 得 $C=0$，故 $y=e^{x^2}$。`
    ],
    hints: ['先分离变量再积分。'],
    pitfalls: ['忘记用初值确定常数。'],
    takeaway: '可分离变量方程：先分离、再积分、最后代初值。',
    knowledge: ['k-ode-substitution']
  },
  {
    id: 'mk-4', kind: 'mock', group: 'nm', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'series', type: 'fill', score: 5, difficulty: 2,
    stem: `级数 $@sum_{n=1}^{@infty}@dfrac{1}{n(n+1)}$ 的和为 ________ .`,
    answer: `$1$`,
    accept: ['1'],
    solution: [
      `裂项：$@frac{1}{n(n+1)}=@frac1n-@frac1{n+1}$。`,
      `部分和 $S_N=1-@frac1{N+1}@to1$。`
    ],
    hints: ['先裂项，再看部分和。'],
    pitfalls: ['直接说收敛但没求和。'],
    takeaway: '分母是相邻整数乘积，一定先裂项。',
    knowledge: ['k-series-tests']
  },
  {
    id: 'mk-5', kind: 'mock', group: 'nm', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'multiple-integral', type: 'fill', score: 5, difficulty: 2,
    stem: `设 $D:x^2+y^2@le1$，则 $@iint_D(x^2+y^2)dxdy=$ ________ .`,
    answer: `$@dfrac@pi2$`,
    accept: ['π/2'],
    solution: [
      `极坐标：$@iint_D(x^2+y^2)dxdy=@int_0^{2@pi}@int_0^1@rho^3d@rho@,d@theta$。`,
      `$=2@pi@cdot@frac14=@frac@pi2$。`
    ],
    hints: ['圆域 + $x^2+y^2$，直接用极坐标。'],
    pitfalls: ['极坐标漏写 $@rho$，把 $@rho^2$ 当成面积元。'],
    takeaway: '圆域上含 $x^2+y^2$ 的积分，极坐标一步到位。',
    knowledge: ['k-double-integral']
  },
  {
    id: 'mk-6', kind: 'mock', group: 'nm', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'multivariable', type: 'fill', score: 5, difficulty: 3,
    stem: `函数 $z=x^2y$ 在点 $(1,1)$ 处沿方向 $(3,4)$ 的方向导数为 ________ .`,
    answer: `$2$`,
    accept: ['2'],
    solution: [
      `梯度 $@nabla z=(2xy,x^2)$，在 $(1,1)$ 处为 $(2,1)$。`,
      `单位方向 $(3/5,4/5)$，方向导数 $=2@cdot@frac35+1@cdot@frac45=2$。`
    ],
    hints: ['先算梯度，再把方向向量单位化。'],
    pitfalls: ['忘记单位化，直接用 $(3,4)$ 点乘。'],
    takeaway: '方向导数 = 梯度 · 单位方向向量，单位化不能省。',
    knowledge: ['k-multi-chain']
  },
  {
    id: 'mk-7', kind: 'mock', group: 'nm', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'geometry-linear', type: 'fill', score: 5, difficulty: 3,
    stem: `二次曲面 $x^2+2xy+y^2=2z$ 是 ________ 曲面。`,
    answer: `抛物柱面`,
    accept: ['抛物柱面'],
    solution: [
      `二次型部分 $(x+y)^2$，特征值为 $2,0,0$。`,
      `方程化为 $2u^2=2z$，即 $u^2=z$，是抛物柱面。`
    ],
    hints: ['先配方成 $(x+y)^2$，再看缺哪个变量。'],
    pitfalls: ['把抛物柱面与抛物面混淆。'],
    takeaway: '二次型有零特征值 ⇒ 柱面/锥面；一个平方项 ⇒ 抛物柱面。',
    knowledge: ['k-quadratic-surface']
  },
  {
    id: 'mk-8', kind: 'mock', group: 'math', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'algebra', type: 'fill', score: 5, difficulty: 3,
    stem: `设 $A^2=A$，则 $A$ 的特征值只能是 ________ .`,
    answer: `$0$ 或 $1$`,
    accept: ['0或1', '0,1'],
    solution: [
      `设 $A@vec x=@lambda@vec x$，$@vec x@ne0$。`,
      `则 $A^2@vec x=@lambda^2@vec x$，又 $A^2=A$ 得 $@lambda^2=@lambda$。`,
      `故 $@lambda=0$ 或 $1$。`
    ],
    hints: ['对特征向量作用 $A^2=A$。'],
    pitfalls: ['只说“特征值是 0 或 1”但不证明。'],
    takeaway: '幂等矩阵的特征值只能是 0/1；投影矩阵就是典型例子。',
    knowledge: ['k-jordan']
  },
  {
    id: 'mk-9', kind: 'mock', group: 'math', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'analysis-limit', type: 'solution', score: 8, difficulty: 3,
    stem: `设 $x_1@in[0,1]$，$x_{n+1}=@cos x_n$。证明 $@left@{x_n@right@}$ 收敛。`,
    answer: `收敛到方程 $x=@cos x$ 的唯一根`,
    accept: [],
    solution: [
      `$@cos$ 在 $[0,1]$ 上把区间映到 $[@cos1,1]@subset[0,1]$，故 $x_n@in[0,1]$。`,
      `$|@cos x-@cos y|=|@sin@xi||x-y|@le(@sin1)|x-y|$，压缩比 $@sin1<1$。`,
      `由压缩映射原理，$x_n$ 收敛且极限为 $x=@cos x$ 的唯一根。`
    ],
    hints: ['先证数列留在 $[0,1]$，再找压缩比。', '中值定理给 $|@cos x-@cos y|@le@sin1@cdot|x-y|$。'],
    pitfalls: ['只说“有界”不证压缩。'],
    takeaway: '迭代 $x_{n+1}=@cos x_n$ 是压缩映射的标准例子。',
    knowledge: ['k-contraction']
  },
  {
    id: 'mk-10', kind: 'mock', group: 'math', edition: 0, year: '模拟', stage: '方法练习', paper: '方法练习',
    topic: 'analysis-calculus', type: 'solution', score: 8, difficulty: 3,
    stem: `设 $f@in C[0,1]$，在 $(0,1)$ 内可导，$f(0)=f(1)=0$。证明：存在 $@xi@in(0,1)$，使 $f'(@xi)=f(@xi)$。`,
    answer: `见解析（构造 $e^{-x}f(x)$ 用罗尔）`,
    accept: [],
    solution: [
      `令 $F(x)=e^{-x}f(x)$，则 $F(0)=F(1)=0$。`,
      `由罗尔定理，存在 $@xi$ 使 $F'(@xi)=0$。`,
      `$F'=e^{-x}(f'-f)$，故 $f'(@xi)=f(@xi)$。`
    ],
    hints: ['把 $f\'-f$ 看成某个乘积的导数。', '乘 $e^{-x}$ 后 $(e^{-x}f)\'=e^{-x}(f\'-f)$。'],
    pitfalls: ['辅助函数构造后没验证端点相等。'],
    takeaway: '$f\'-f$ 配 $e^{-x}$，$f\'+f$ 配 $e^{x}$。',
    knowledge: ['k-meanvalue-construction']
  }
];
