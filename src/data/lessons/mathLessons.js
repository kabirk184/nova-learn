export const mathLessons = [
  {
    "id": "math-01",
    "title": "Differential Calculus & Rates of Change",
    "readTime": "10 min",
    "difficulty": "College/University",
    "summaryEn": "Geometric interpretation of derivatives as instantaneous rates of change and tangent gradients.",
    "contentEn": "The derivative represents the fundamental mathematical concept of an instantaneous rate of change.\n\nFormal Limit Definition:\nf'(x) = lim (h -> 0) [f(x + h) - f(x)] / h\n\nFundamental Differentiation Rules:\n1. Power Rule: d/dx(x^n) = n * x^(n - 1)\n2. Product Rule: d/dx[u(x) * v(x)] = u'(x)v(x) + u(x)v'(x)\n3. Quotient Rule: d/dx[u(x) / v(x)] = [u'(x)v(x) - u(x)v'(x)] / [v(x)]^2\n4. Chain Rule: d/dx[f(g(x))] = f'(g(x)) * g'(x)\n\nReal-World Applications:\n- Physics: Instantaneous velocity v(t) = ds/dt and acceleration a(t) = dv/dt.\n- Economics: Marginal cost dC/dq and marginal revenue dR/dq optimization.\n- Computer Science & AI: Gradient descent optimization algorithms calculating partial derivatives of loss functions."
  },
  {
    "id": "math-02",
    "title": "Integral Calculus & Accumulation Theory",
    "readTime": "9 min",
    "difficulty": "College/University",
    "summaryEn": "Definite integrals as limits of Riemann sums, net accumulation, and the Fundamental Theorem of Calculus.",
    "contentEn": "Integration provides the mathematical machinery for calculating accumulated quantities, continuous areas, and total net change.\n\nThe Fundamental Theorem of Calculus:\nIf f is continuous on [a, b] and F is an antiderivative of f such that F'(x) = f(x):\nPart 1: d/dx [∫ from a to x of f(t) dt] = f(x)\nPart 2: ∫ from a to b of f(x) dx = F(b) - F(a)\n\nIntegration Techniques:\n1. Integration by Substitution (Reverse Chain Rule): Set u = g(x), du = g'(x) dx.\n2. Integration by Parts (Reverse Product Rule): ∫ u dv = uv - ∫ v du (selected via LIATE rule: Logarithmic, Inverse trig, Algebraic, Trig, Exponential).\n3. Partial Fraction Decomposition: Decomposing rational functions into sums of simpler terms.\n\nApplications:\n- Physics: Work done by variable force W = ∫ F(x) dx; displacement from velocity s(t) = ∫ v(t) dt.\n- Probability: Continuous probability density normalization ∫ p(x) dx = 1."
  },
  {
    "id": "math-03",
    "title": "Multivariable Calculus & Partial Derivatives",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Functions of multiple variables, partial derivatives, gradient vectors, and tangent planes.",
    "contentEn": "Multivariable calculus extends single-variable analysis to functions of multiple independent variables f(x, y, z).\n\nPartial Derivatives:\nA partial derivative ∂f/∂x measures the instantaneous rate of change of f along the x-axis while holding all other variables constant.\n∂f/∂x = lim (h -> 0) [f(x + h, y) - f(x, y)] / h\n\nThe Gradient Vector (∇f):\nFor a scalar field f(x, y):\n∇f = [ ∂f/∂x, ∂f/∂y ]^T\nKey Properties:\n1. The gradient vector ∇f points in the direction of greatest instantaneous increase (steepest ascent).\n2. The magnitude ||∇f|| equals the maximal directional derivative.\n3. The gradient vector is always orthogonal (perpendicular) to the level curves f(x, y) = c.\n\nTangent Plane to a Surface:\nz - z0 = (∂f/∂x)(x - x0) + (∂f/∂y)(y - y0)"
  },
  {
    "id": "math-04",
    "title": "Multiple Integrals & Vector Fields",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Double and triple integrals, polar coordinates, divergence, curl, and Green theorem.",
    "contentEn": "Multiple integrals compute volumes, masses, and fluxes over multi-dimensional geometric domains.\n\nDouble Integrals & Coordinate Transformations:\n∬_R f(x, y) dA represents the volume under the surface z = f(x, y) over region R.\nTransforming to Polar Coordinates (x = r cos θ, y = r sin θ):\n∬_R f(x, y) dx dy = ∬_D f(r cos θ, r sin θ) r dr dθ (where Jacobian determinant J = r).\n\nVector Calculus Operators:\nFor vector field F = [P, Q, R]:\n1. Divergence: div F = ∇ · F = ∂P/∂x + ∂Q/∂y + ∂R/∂z (measures net flux outflow per unit volume).\n2. Curl: curl F = ∇ × F (measures microscopic rotational circulation).\n\nGreen's Theorem in the Plane:\n∮_C (P dx + Q dy) = ∬_D (∂Q/∂x - ∂P/∂y) dA"
  },
  {
    "id": "math-05",
    "title": "Linear Algebra: Vector Spaces & Basis Theory",
    "readTime": "9 min",
    "difficulty": "University Core",
    "summaryEn": "Vector spaces, subspaces, linear independence, spanning sets, and dimension.",
    "contentEn": "Linear algebra provides the mathematical backbone of modern scientific computing, data science, and quantum mechanics.\n\nAxiomatic Vector Space:\nA set V over a field F closed under vector addition and scalar multiplication satisfying 8 fundamental axioms (associativity, commutativity, additive identity, zero element, distributivity).\n\nLinear Combinations & Independence:\n- A set of vectors {v1, v2, ..., vn} is linearly independent if the only solution to:\n  c1*v1 + c2*v2 + ... + cn*vn = 0 is c1 = c2 = ... = cn = 0.\n- If non-zero scalars exist that satisfy the equation, the vectors are linearly dependent.\n\nBasis and Dimension:\n- A Basis B for vector space V is a set of vectors that is both linearly independent and spans V.\n- The Dimension dim(V) is the unique number of vectors in any basis of V."
  },
  {
    "id": "math-06",
    "title": "Matrix Transformations, Determinants & Inverses",
    "readTime": "9 min",
    "difficulty": "College/University",
    "summaryEn": "Matrix multiplication, row reduction, determinant properties, and matrix inversion algorithms.",
    "contentEn": "Matrices represent linear maps between finite-dimensional vector spaces.\n\nMatrix Operations:\n1. Matrix Multiplication: For matrices A (m × k) and B (k × n), product C = AB has dimensions m × n where:\n   c_ij = ∑ (a_il * b_lj) for l = 1 to k. Matrix multiplication is associative but strictly non-commutative (AB ≠ BA in general).\n2. The Determinant det(A): A scalar quantity encoding the geometric scaling factor of the transformation:\n   - det(A) = 0 if and only if matrix A is singular (non-invertible).\n   - For 2×2 matrix [a, b; c, d], det(A) = ad - bc.\n   - det(AB) = det(A) * det(B).\n\nMatrix Inversion:\nFor a non-singular square matrix A:\nA * A^(-1) = A^(-1) * A = I (Identity Matrix)\nComputed via Gaussian elimination [A | I] -> [I | A^(-1)] or the adjugate formula: A^(-1) = (1/det(A)) * adj(A)."
  },
  {
    "id": "math-07",
    "title": "Eigenvalues, Eigenvectors & Diagonalization",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Characteristic polynomial, eigenspaces, geometric vs algebraic multiplicity, and spectral decomposition.",
    "contentEn": "Eigen-decomposition reveals the invariant directional axes of linear transformations.\n\nFundamental Eigenvalue Equation:\nA * v = λ * v (where v ≠ 0)\n- v is an eigenvector.\n- λ is the corresponding scalar eigenvalue.\n\nComputation via Characteristic Polynomial:\n(A - λI)v = 0\nFor non-trivial solutions v ≠ 0, the matrix (A - λI) must be singular:\ndet(A - λI) = 0\nSolving this polynomial yields the eigenvalues λ1, λ2, ..., λn.\n\nMatrix Diagonalization:\nIf an n × n matrix A has n linearly independent eigenvectors, it can be factored as:\nA = P * D * P^(-1)\nWhere P is the matrix of eigenvectors and D is the diagonal matrix of corresponding eigenvalues.\nKey Applications: Principal Component Analysis (PCA), PageRank algorithms, and solving coupled systems of differential equations."
  },
  {
    "id": "math-08",
    "title": "First-Order Ordinary Differential Equations (ODEs)",
    "readTime": "9 min",
    "difficulty": "University Core",
    "summaryEn": "Separable ODEs, integrating factors for linear equations, exact equations, and initial value problems.",
    "contentEn": "Differential equations express relationships between functions and their derivatives, modeling dynamic systems across nature.\n\nFirst-Order ODE Standard Form:\ndy/dx = f(x, y)\n\nAnalytical Solution Methods:\n1. Separable Equations: Expressible as g(y) dy = h(x) dx; solved by direct integration on both sides:\n   ∫ g(y) dy = ∫ h(x) dx + C.\n2. First-Order Linear ODEs: dy/dx + P(x)y = Q(x)\n   - Solved using the Integrating Factor method: μ(x) = exp(∫ P(x) dx).\n   - Multiplying through yields: d/dx[μ(x)y] = μ(x)Q(x).\n   - Solution: y(x) = [1/μ(x)] * [ ∫ μ(x)Q(x) dx + C ].\n3. Exact Equations: M(x, y) dx + N(x, y) dy = 0 where ∂M/∂y = ∂N/∂x."
  },
  {
    "id": "math-09",
    "title": "Second-Order Linear ODEs & Harmonic Oscillators",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Homogeneous equations with constant coefficients, characteristic roots, damping, and resonance.",
    "contentEn": "Second-order ODEs govern mechanical vibrations, alternating electrical circuits, and acoustic wave propagation.\n\nHomogeneous Second-Order Linear Equation:\na * y'' + b * y' + c * y = 0\n\nCharacteristic Auxiliary Equation:\na * r^2 + b * r + c = 0\nRoots determined by quadratic formula: r = [-b ± √(b^2 - 4ac)] / (2a)\n\nThree Physical Regimes:\n1. Distinct Real Roots (b^2 - 4ac > 0): Overdamped system:\n   y(x) = c1 * e^(r1*x) + c2 * e^(r2*x)\n2. Repeated Real Root (b^2 - 4ac = 0): Critically damped system:\n   y(x) = (c1 + c2*x) * e^(r*x)\n3. Complex Conjugate Roots (b^2 - 4ac < 0, r = α ± iβ): Underdamped oscillatory system:\n   y(x) = e^(α*x) * [c1 cos(βx) + c2 sin(βx)]\n\nNon-Homogeneous Equations (a y'' + b y' + c y = g(x)):\nGeneral solution y(x) = y_h(x) + y_p(x), where y_p is found via Undetermined Coefficients or Variation of Parameters."
  },
  {
    "id": "math-10",
    "title": "Probability Theory: Random Variables & Distributions",
    "readTime": "9 min",
    "difficulty": "College/University",
    "summaryEn": "Sample spaces, conditional probability, Bayes theorem, discrete and continuous random variables.",
    "contentEn": "Probability theory formalizes the mathematical modeling of uncertainty and stochastic processes.\n\nAxiomatic Probability (Kolmogorov):\n1. P(E) ≥ 0 for any event E.\n2. P(S) = 1 for sample space S.\n3. For mutually exclusive events: P(A ∪ B) = P(A) + P(B).\n\nConditional Probability & Bayes' Theorem:\nP(A|B) = P(A ∩ B) / P(B)\nBayes' Rule: P(A|B) = [ P(B|A) * P(A) ] / P(B)\n\nKey Probability Distributions:\n1. Discrete Distributions:\n   - Binomial Distribution: P(X = k) = (n choose k) * p^k * (1 - p)^(n - k)\n   - Poisson Distribution: P(X = k) = (λ^k * e^(-λ)) / k! (models arrival rates)\n2. Continuous Distributions:\n   - Normal (Gaussian) Distribution: N(μ, σ^2) with probability density function:\n     f(x) = [1 / (σ√(2π))] * exp[ -(x - μ)^2 / (2σ^2) ]\n   - Central Limit Theorem: The sum/mean of independent random variables approaches a normal distribution as n -> ∞."
  },
  {
    "id": "math-11",
    "title": "Inferential Statistics & Hypothesis Testing",
    "readTime": "9 min",
    "difficulty": "University Core",
    "summaryEn": "Null hypothesis, t-tests, ANOVA, p-values, Type I/II errors, and confidence intervals.",
    "contentEn": "Inferential statistics allows researchers to deduce population parameters from sample data with quantified confidence.\n\nThe Hypothesis Testing Protocol:\n1. Formulate Hypotheses:\n   - Null Hypothesis (H0): Asserts no effect, difference, or relationship.\n   - Alternative Hypothesis (H1): Asserts a statistically meaningful effect.\n2. Select Significance Level (α): Typically α = 0.05 (5% probability of rejecting H0 when true).\n3. Compute Test Statistic:\n   - Z-Test: When population variance σ^2 is known.\n   - Student's t-Test: When population variance is unknown, using sample standard deviation s:\n     t = (x̄ - μ0) / (s / √n)\n4. Decision Rules & Errors:\n   - p-Value: The probability of obtaining results at least as extreme as observed, assuming H0 is true.\n   - Type I Error (False Positive): Rejecting H0 when H0 is actually true (probability = α).\n   - Type II Error (False Negative): Failing to reject H0 when H0 is false (probability = β). Statistical Power = 1 - β."
  },
  {
    "id": "math-12",
    "title": "Real Analysis: Limits, Sequences & Bolzano-Weierstrass",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Epsilon-delta definitions, Cauchy sequences, completeness of the real numbers, and compactness.",
    "contentEn": "Real analysis establishes rigorous foundational proofs for the intuitive operations of calculus.\n\nRigorous Epsilon-Delta Definition of a Limit:\nlim (x -> c) f(x) = L means:\nFor every ε > 0, there exists a δ > 0 such that:\n0 < |x - c| < δ implies |f(x) - L| < ε.\n\nConvergence of Sequences:\nA sequence (a_n) converges to limit L if for every ε > 0, there exists N ∈ ℕ such that:\nn ≥ N implies |a_n - L| < ε.\n\nThe Completeness Axiom & Core Theorems:\n- Completeness of ℝ: Every non-empty set of real numbers bounded above has a least upper bound (supremum).\n- Cauchy Completeness: Every Cauchy sequence in ℝ converges to a point in ℝ.\n- Bolzano-Weierstrass Theorem: Every bounded sequence in ℝ contains a convergent subsequence.\n- Extreme Value Theorem: If f is continuous on closed bounded interval [a, b], f attains an absolute maximum and minimum."
  },
  {
    "id": "math-13",
    "title": "Complex Analysis: Cauchy-Riemann & Contour Integrals",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Holomorphic functions, Cauchy-Riemann equations, Cauchy integral theorem, and residue calculus.",
    "contentEn": "Complex analysis investigates functions of a complex variable z = x + iy, demonstrating extraordinary geometric and algebraic elegance.\n\nHolomorphic (Analytic) Functions:\nA function f(z) = u(x, y) + i*v(x, y) is complex differentiable at z0 if:\nf'(z0) = lim (Δz -> 0) [f(z0 + Δz) - f(z0)] / Δz exists regardless of approach direction.\n\nThe Cauchy-Riemann Equations:\nA necessary and sufficient condition for differentiability is:\n∂u/∂x = ∂v/∂y  and  ∂u/∂y = -∂v/∂x\nConsequence: Both real and imaginary parts u and v are harmonic functions (∇^2 u = 0).\n\nCauchy's Integral Theorem & Formula:\n- If f(z) is analytic inside and on a simple closed contour C:\n  ∮_C f(z) dz = 0\n- Cauchy's Integral Formula: Values on the interior are completely determined by values on the boundary:\n  f(z0) = (1 / 2πi) * ∮_C [f(z) / (z - z0)] dz."
  },
  {
    "id": "math-14",
    "title": "Abstract Algebra: Groups, Rings & Fields",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Group axioms, Lagrange theorem, homomorphisms, normal subgroups, and polynomial rings.",
    "contentEn": "Abstract algebra explores structural symmetries and generalized algebraic operational systems.\n\nGroup Theory Axioms:\nA group (G, *) consists of a set G equipped with binary operation * satisfying:\n1. Closure: For all a, b ∈ G, a * b ∈ G.\n2. Associativity: (a * b) * c = a * (b * c).\n3. Identity Element: There exists e ∈ G such that e * a = a * e = a.\n4. Inverse Element: For each a ∈ G, there exists a^(-1) ∈ G such that a * a^(-1) = e.\n(If a * b = b * a for all elements, G is called an Abelian group).\n\nLagrange's Theorem:\nIf H is a subgroup of a finite group G, then the order of H divides the order of G:\n|G| = [G : H] * |H|\n\nRings and Fields:\n- Ring: Set with two operations (addition and multiplication), forming an Abelian group under addition and a monoid under multiplication with distributivity.\n- Field: A commutative ring where every non-zero element has a multiplicative inverse (e.g., ℚ, ℝ, ℂ, ℤ_p for prime p)."
  },
  {
    "id": "math-15",
    "title": "Number Theory & Modern Cryptography (RSA)",
    "readTime": "9 min",
    "difficulty": "College/University",
    "summaryEn": "Divisibility, Euclidean algorithm, modular arithmetic, Fermat Little Theorem, and RSA encryption.",
    "contentEn": "Number theory investigates the discrete properties of integers, forming the mathematical fortress safeguarding internet cryptography.\n\nFundamental Modular Arithmetic:\na ≡ b (mod m) means that m divides (a - b).\n- Euclidean Algorithm: Efficiently computes the Greatest Common Divisor (GCD) via repeated division with remainder.\n- Bézout's Identity: There exist integers x, y such that a*x + b*y = gcd(a, b).\n\nFermat's Little Theorem:\nIf p is a prime and a is an integer not divisible by p:\na^(p - 1) ≡ 1 (mod p)\n\nThe RSA Public-Key Cryptosystem:\n1. Key Generation: Select two large prime numbers p and q. Compute modulus n = p * q.\n2. Euler's Totient: φ(n) = (p - 1)(q - 1).\n3. Public Exponent e: Chosen such that 1 < e < φ(n) and gcd(e, φ(n)) = 1.\n4. Private Exponent d: Multiplicative inverse of e modulo φ(n): d * e ≡ 1 (mod φ(n)).\n5. Encryption: Ciphertext C = M^e mod n.\n6. Decryption: Message M = C^d mod n. Security relies on the computational intractability of factoring large semi-prime integers."
  },
  {
    "id": "math-16",
    "title": "Discrete Mathematics: Graph Theory & Combinatorics",
    "readTime": "9 min",
    "difficulty": "Computer Science Core",
    "summaryEn": "Graphs, trees, Eulerian/Hamiltonian paths, binomial coefficients, and pigeonhole principle.",
    "contentEn": "Discrete mathematics investigates finite structures and relational graphs underpinning computer science algorithms.\n\nGraph Theory Foundations:\nA graph G = (V, E) consists of a set of vertices V and edges E.\n- Handshaking Lemma: ∑ deg(v) = 2 * |E| across all v ∈ V.\n- Trees: Connected acyclic graphs with exactly |V| - 1 edges.\n- Eulerian Path: A traversal visiting every edge exactly once (exists if and only if graph has at most two vertices of odd degree).\n- Hamiltonian Cycle: A closed loop visiting every vertex exactly once (NP-complete decision problem).\n\nCombinatorics:\n- Permutations: Ordered arrangements P(n, r) = n! / (n - r)!\n- Combinations: Unordered subsets C(n, r) = n! / [r! * (n - r)!]\n- The Pigeonhole Principle: If k + 1 objects are placed into k boxes, at least one box must contain two or more objects."
  },
  {
    "id": "math-17",
    "title": "Numerical Methods & Computational Algorithms",
    "readTime": "9 min",
    "difficulty": "Applied Mathematics",
    "summaryEn": "Newton-Raphson root finding, Runge-Kutta ODE solvers, numerical integration, and error convergence.",
    "contentEn": "Numerical analysis formulates approximation algorithms for mathematical problems lacking closed-form analytical solutions.\n\nRoot-Finding Algorithms:\n1. Bisection Method: Robust bracket-halving guaranteed to converge by the Intermediate Value Theorem.\n2. Newton-Raphson Method: Quadratic convergence near simple roots:\n   x_(n+1) = x_n - [ f(x_n) / f'(x_n) ]\n\nNumerical Quadrature (Integration):\n- Trapezoidal Rule: Approximates area under curves using linear trapezoids; error scales as O(h^2).\n- Simpson's 1/3 Rule: Fits quadratic parabolic arcs across paired sub-intervals; error scales as O(h^4).\n\nNumerical Solutions to ODEs:\n- Euler's Forward Method: y_(n+1) = y_n + h * f(t_n, y_n) (First-order accurate, error O(h)).\n- Runge-Kutta 4th Order (RK4): Industry standard evaluation taking weighted average of four slope estimates across interval h; error scales as O(h^4)."
  },
  {
    "id": "math-18",
    "title": "Topology: Metric Spaces & Continuous Mappings",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Open/closed sets, metric spaces, topological spaces, compactness, and connectedness.",
    "contentEn": "Topology investigates the invariant properties of geometric spaces that remain preserved under continuous deformations (stretching, twisting, bending without tearing or gluing).\n\nMetric Spaces (M, d):\nA set M equipped with a distance function d: M × M -> ℝ satisfying:\n1. d(x, y) ≥ 0, and d(x, y) = 0 if and only if x = y.\n2. Symmetry: d(x, y) = d(y, x).\n3. Triangle Inequality: d(x, z) ≤ d(x, y) + d(y, z).\n\nTopological Spaces (X, τ):\nA set X with collection τ of subsets (\"open sets\") such that:\n- The empty set ∅ and X belong to τ.\n- Any arbitrary union of open sets is open.\n- Any finite intersection of open sets is open.\n\nCore Topological Properties:\n- Compactness: Every open cover of X contains a finite subcover (Heine-Borel: in ℝ^n, a subset is compact if and only if closed and bounded).\n- Connectedness: A space that cannot be partitioned into two disjoint non-empty open sets."
  },
  {
    "id": "math-19",
    "title": "Optimization Theory: Karush-Kuhn-Tucker & Convexity",
    "readTime": "10 min",
    "difficulty": "Applied Math / AI Core",
    "summaryEn": "Convex sets, Lagrange multipliers, Karush-Kuhn-Tucker (KKT) conditions, and duality theory.",
    "contentEn": "Optimization theory formulates mathematical methods to find global minima or maxima of objective functions subject to constraints.\n\nConvex Optimization:\n- Convex Set: A set C where for all x, y ∈ C and θ ∈ [0, 1], the line segment θx + (1 - θ)y ∈ C.\n- Convex Function: f(θx + (1 - θ)y) ≤ θf(x) + (1 - θ)f(y).\n- Crucial Property: For a convex optimization problem, every local minimum is guaranteed to be a global minimum.\n\nConstrained Optimization:\n1. Equality Constraints (Lagrange Multipliers):\n   Minimize f(x) subject to g_i(x) = 0.\n   Lagrangian: L(x, λ) = f(x) + ∑ λ_i * g_i(x). At optimality: ∇L = 0.\n2. Inequality Constraints (Karush-Kuhn-Tucker - KKT Conditions):\n   Minimize f(x) subject to g_i(x) ≤ 0 and h_j(x) = 0:\n   - Stationarity: ∇f(x*) + ∑ μ_i ∇g_i(x*) + ∑ λ_j ∇h_j(x*) = 0\n   - Primal Feasibility: g_i(x*) ≤ 0, h_j(x*) = 0\n   - Dual Feasibility: μ_i ≥ 0\n   - Complementary Slackness: μ_i * g_i(x*) = 0 for all i."
  },
  {
    "id": "math-20",
    "title": "Partial Differential Equations: Heat, Wave & Laplace",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Classification of second-order PDEs (elliptic, parabolic, hyperbolic) and separation of variables.",
    "contentEn": "Partial Differential Equations (PDEs) govern continuous phenomena across physics, including fluid flows, heat dissipation, and electromagnetic waves.\n\nThe Classical Triad of Second-Order PDEs:\n1. Laplace's Equation (Elliptic - Steady State):\n   ∇^2 u = ∂^2 u / ∂x^2 + ∂^2 u / ∂y^2 = 0\n   Models steady-state thermal distribution, electrostatic potentials, and incompressible inviscid fluid flow.\n2. The Heat Equation (Parabolic - Dissipative Diffusion):\n   ∂u/∂t = α * ∇^2 u\n   Models irreversible thermal conduction and molecular concentration diffusion over time.\n3. The Wave Equation (Hyperbolic - Conservative Propagation):\n   ∂^2 u / ∂t^2 = c^2 * ∇^2 u\n   Models acoustic vibrations, seismic ripples, and electromagnetic light wave propagation.\n\nSeparation of Variables Technique:\nExpressing multivariable solution as product of single-variable functions: u(x, t) = X(x) * T(t).\nDecomposes PDE into coupled ODEs solved via Fourier series expansions satisfying boundary conditions."
  },
  {
    "id": "math-21",
    "title": "Fourier Analysis & Harmonic Signal Processing",
    "readTime": "10 min",
    "difficulty": "University Advanced",
    "summaryEn": "Fourier series, continuous Fourier transform, convolution theorem, and frequency domain filtering.",
    "contentEn": "Fourier analysis reveals that periodic and non-periodic signals can be decomposed into superpositions of orthogonal sinusoidal waves.\n\nFourier Series Decomposition:\nFor a 2L-periodic function f(x):\nf(x) = a0/2 + ∑ [ a_n cos(nπx/L) + b_n sin(nπx/L) ] for n = 1 to ∞\nWhere coefficients are calculated via orthogonality:\na_n = (1/L) * ∫ f(x) cos(nπx/L) dx\nb_n = (1/L) * ∫ f(x) sin(nπx/L) dx\n\nThe Continuous Fourier Transform:\nTransforms a signal from the time domain f(t) into the continuous frequency domain F(ω):\nF(ω) = ∫ from -∞ to ∞ f(t) * e^(-iωt) dt\nInverse Fourier Transform:\nf(t) = (1 / 2π) * ∫ from -∞ to ∞ F(ω) * e^(iωt) dω\n\nThe Convolution Theorem:\nThe Fourier transform of the convolution of two signals equals the pointwise product of their individual Fourier transforms:\nℱ{f * g} = ℱ{f} · ℱ{g}\nForms the foundation of audio signal filtering, image processing, MRI medical imaging, and telecommunications."
  }
];
