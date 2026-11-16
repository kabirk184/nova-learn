export const physicsLessons = [
  {
    "id": "phys-01",
    "title": "Classical Mechanics: Newton Laws & Dynamics",
    "readTime": "9 min",
    "diff": "Physics Core",
    "summary": "Inertia, F = ma, action-reaction pairs, momentum conservation, and frictional forces.",
    "content": "Classical Newtonian mechanics formulates the physical laws governing the motion of macroscopic bodies.\n\nNewton's Three Laws of Motion:\n1. First Law (Law of Inertia): An object remains at rest or in uniform rectilinear motion unless acted upon by an unbalanced net external force.\n2. Second Law (Fundamental Law of Dynamics): Net force equals the time rate of change of linear momentum: F_net = dp/dt = m * a (for constant mass).\n3. Third Law (Action-Reaction): For every action force, there is an equal and opposite reaction force acting on a different body: F_AB = -F_BA.\n\nConservation of Linear Momentum:\nIn any isolated physical system lacking net external forces, total linear momentum is strictly conserved across elastic and inelastic collisions: ∑ p_initial = ∑ p_final."
  },
  {
    "id": "phys-02",
    "title": "Work, Kinetic Energy & The Work-Energy Theorem",
    "readTime": "8 min",
    "diff": "Classical Mechanics",
    "summary": "Scalar dot products, work-energy theorem, conservative vs non-conservative forces, and potential energy wells.",
    "content": "Work and energy represent scalar mechanical quantities that simplify the analysis of complex dynamical systems.\n\nWork Definition:\nW = ∫ F · dr = F * d * cos(θ)\n- Measured in Joules (1 J = 1 N · m).\n\nThe Work-Energy Theorem:\nThe net work done by all forces acting upon a particle equals the change in the particle's kinetic energy: W_net = ΔK = (1/2)m*v_f² - (1/2)m*v_i².\n\nConservation of Mechanical Energy:\nForces are categorized as Conservative (work done is path-independent; e.g., gravity, spring elasticity) or Non-Conservative (path-dependent mechanical dissipation; e.g., friction, air drag). In systems governed solely by conservative forces: E_mechanical = K + U = Constant."
  },
  {
    "id": "phys-03",
    "title": "Rotational Dynamics, Torque & Angular Momentum",
    "readTime": "9 min",
    "diff": "Classical Mechanics",
    "summary": "Moment of inertia (I), torque, rotational kinematics, parallel axis theorem, and conservation of angular momentum.",
    "content": "Rotational dynamics parallels translational mechanics through angular analogs.\n\nRotational Mechanical Analogs:\n- Translational Mass (m) <-> Moment of Inertia (I = ∑ m_i * r_i² = ∫ r² dm): Quantifies rotational resistance to angular acceleration.\n- Force (F) <-> Torque (τ = r × F = I * α): The rotational twisting force about a pivot axis.\n- Momentum (p = mv) <-> Angular Momentum (L = r × p = I * ω).\n\nConservation of Angular Momentum:\nWhen net external torque on a system is zero (∑ τ_ext = 0), total angular momentum remains strictly conserved: I_initial * ω_initial = I_final * ω_final (demonstrated by a spinning figure skater pulling in their arms to reduce I, causing angular velocity ω to increase)."
  },
  {
    "id": "phys-04",
    "title": "Universal Gravitation & Orbital Satellite Mechanics",
    "readTime": "9 min",
    "diff": "Gravitational Physics",
    "summary": "Newton law of gravitation, gravitational potential energy, escape velocity, and geostationary orbits.",
    "content": "Gravitation is the universal attractive force existing between all physical entities possessing mass or energy.\n\nNewton's Law of Universal Gravitation:\nF = G * (m1 * m2) / r²\nWhere G is the Universal Gravitational Constant: G ≈ 6.674 × 10⁻¹¹ N · m²/kg².\n\nGravitational Field & Potential Energy:\n- Gravitational Field Strength: g = GM / r² (~9.81 m/s² at Earth's sea level).\n- Gravitational Potential Energy: U(r) = -GMm / r (taking infinity as zero reference).\n- Circular Orbital Velocity: Equating gravitational force to centripetal acceleration yields v_orbit = √(GM / r).\n- Geostationary Orbit: Stationed at ~35,786 km altitude directly above Earth's equator, matching Earth's 24-hour rotational period, causing satellites to appear stationary relative to ground tracking receivers."
  },
  {
    "id": "phys-05",
    "title": "Oscillations & Simple Harmonic Motion (SHM)",
    "readTime": "8 min",
    "diff": "Wave Physics Core",
    "summary": "Hooke law, restoring force, differential equation of SHM, simple pendulum, damping, and resonance.",
    "content": "Simple Harmonic Motion (SHM) occurs whenever an oscillating entity experiences a restoring force directly proportional to its displacement from equilibrium.\n\nMathematical Dynamics of SHM:\n- Hooke's Law: F = -k * x\n- Differential Equation: d²x/dt² + (k/m)x = 0  ->  d²x/dt² + ω²x = 0 (where natural angular frequency ω = √(k/m)).\n- General Solution: x(t) = A * cos(ωt + φ), where A is Amplitude and φ is Phase Constant.\n- Period of Oscillation: T = 2π / ω = 2π √(m/k).\n- Simple Pendulum (Small Angle Approximation θ < 15°): T = 2π √(L/g).\n\nResonance:\nWhen an oscillating system is driven by a periodic external force matching its natural resonance frequency (ω_drive ≈ ω_0), oscillation amplitude increases dramatically."
  },
  {
    "id": "phys-06",
    "title": "Wave Mechanics: Sound Waves & The Doppler Effect",
    "readTime": "9 min",
    "diff": "Acoustics & Waves",
    "summary": "Transverse vs longitudinal waves, wave equation (v = fλ), standing waves, acoustic decibels, and Doppler frequency shifts.",
    "content": "Mechanical waves propagate energy and momentum through a deformable physical medium without transporting bulk matter.\n\nWave Classifications:\n1. Transverse Waves: Particle oscillation is perpendicular to wave propagation (light, electromagnetic waves, seismic S-waves).\n2. Longitudinal Waves: Particle oscillation is parallel to wave propagation, forming alternating Compressions and Rarefactions (acoustic sound waves, seismic P-waves).\n\nThe Universal Wave Equation: v = f * λ (Wave Speed = Frequency × Wavelength).\n\nThe Doppler Effect:\nThe observed shift in frequency resulting from relative motion between a wave source and an observer: f' = f * [ (v ± v_observer) / (v ∓ v_source) ]. Moving toward each other compresses wavelengths, causing high-pitch blue-shift; moving apart elongates wavelengths, causing low-pitch red-shift."
  },
  {
    "id": "phys-07",
    "title": "Thermodynamics: The Four Laws & Heat Engines",
    "readTime": "9 min",
    "diff": "Thermal Physics Core",
    "summary": "Zeroth, First (ΔU = Q - W), Second (entropy ΔS ≥ 0), and Third laws; Carnot engine thermal efficiency.",
    "content": "Thermodynamics investigates the macroscopic relationships between heat, work, internal energy, and entropy.\n\nThe Four Fundamental Laws:\n1. Zeroth Law: If systems A and B are in thermal equilibrium with C, then A and B are in thermal equilibrium with each other (defines temperature).\n2. First Law (Conservation of Energy): The change in internal energy equals net heat added minus work done: ΔU = Q - W.\n3. Second Law (Entropy): In any isolated thermodynamic system, total entropy never decreases over time (ΔS_universe ≥ 0). Heat never spontaneously flows from a colder to a hotter body.\n4. Third Law: As absolute zero (0 Kelvin) is approached, the entropy of a pure crystalline substance approaches a constant minimum.\n\nThe Carnot Cycle & Maximum Theoretical Efficiency:\nNo heat engine operating between two thermal reservoirs can exceed the efficiency of a reversible Carnot engine: η_Carnot = 1 - (T_cold / T_hot)."
  },
  {
    "id": "phys-08",
    "title": "Electrostatics: Coulomb Law & Electric Fields",
    "readTime": "9 min",
    "diff": "Electromagnetism Core",
    "summary": "Point charges, Coulomb inverse-square law, Gauss law for electric flux, electric potential, and capacitance.",
    "content": "Electrostatics examines the forces, electric fields, and potentials generated by stationary electric charges.\n\nCoulomb's Law:\nF = (1 / 4πε0) * (|q1 * q2| / r²)\nWhere ε0 is the Permittivity of Free Space (ε0 ≈ 8.854 × 10⁻¹² C² / N · m²).\n\nGauss's Law for Electricity (Maxwell's First Equation):\n∮ E · dA = Q_enclosed / ε0\nThe net electric flux through any closed Gaussian surface is directly proportional to the total enclosed charge, providing elegant solutions for spherical, cylindrical, and planar symmetries.\n\nElectric Potential (V) & Capacitance (C):\n- Electric Potential: V = -∫ E · dr (Scalar potential field measured in Volts).\n- Capacitance: C = Q / V. For parallel-plate capacitors: C = ε * (A / d), storing electrostatic potential energy: U = (1/2)C*V²."
  },
  {
    "id": "phys-09",
    "title": "Direct Current Circuits: Ohm Law & Kirchhoff Rules",
    "readTime": "8 min",
    "diff": "Circuit Analysis",
    "summary": "Ohm law (V = IR), series vs parallel resistors, Kirchhoff junction (KCL) and loop (KVL) rules, RC circuits.",
    "content": "Electric circuits channel direct current (DC) flow through networks of resistors, voltage sources, and reactive components.\n\nOhm's Law & Resistor Networks:\n- V = I * R (Voltage = Current × Resistance).\n- Series Resistors: R_eq = R1 + R2 + ... (current is identical through each).\n- Parallel Resistors: 1/R_eq = 1/R1 + 1/R2 + ... (voltage is identical across each).\n\nKirchhoff's Circuit Laws:\n1. Kirchhoff's Current Law (KCL - Junction Rule): Total current entering any electrical junction must precisely equal total current leaving (Conservation of Charge): ∑ I_in = ∑ I_out.\n2. Kirchhoff's Voltage Law (KVL - Loop Rule): The algebraic sum of all potential differences around any closed circuit loop must equal zero (Conservation of Energy): ∑ ΔV = 0.\n\nRC Transient Charging Dynamics:\nV(t) = V0 * (1 - e^(-t / RC)), where τ = RC is the circuit Time Constant."
  },
  {
    "id": "phys-10",
    "title": "Magnetism: Biot-Savart, Ampère Law & Lorentz Force",
    "readTime": "9 min",
    "diff": "Electromagnetism",
    "summary": "Magnetic dipole moments, Lorentz force (F = q(E + v × B)), Biot-Savart law, Ampère circuital law, and solenoids.",
    "content": "Magnetic fields are generated exclusively by moving electric charges and intrinsic quantum electron spins.\n\nThe Lorentz Force Equation:\nF = q * (E + v × B)\nA charged particle moving through a magnetic field experiences a deflecting force perpendicular to both its velocity vector and the magnetic field lines (Right-Hand Rule).\n\nMagnetic Field Generation:\n1. The Biot-Savart Law: Infinitesimal current element generates magnetic field: dB = (μ0 / 4π) * (I dl × r̂ / r²).\n2. Ampère's Circuital Law: ∮ B · dl = μ0 * I_enclosed (for steady currents).\n3. Field of an Ideal Solenoid: B = μ0 * n * I (where n is turns per unit length), generating an intense, uniform interior magnetic field."
  },
  {
    "id": "phys-11",
    "title": "Electromagnetic Induction & Faraday-Lenz Law",
    "readTime": "9 min",
    "diff": "Electromagnetism Core",
    "summary": "Magnetic flux, Faraday law of induction, Lenz direction law, eddy currents, and transformers.",
    "content": "Electromagnetic induction is the physical phenomenon underpinning all modern electrical generators, transformers, and induction motors.\n\nFaraday's Law of Induction:\nAn induced Electromotive Force (EMF - ε) is generated in any closed circuit loop when the magnetic flux passing through that loop changes over time:\nε = -dΦ_B / dt  (where magnetic flux Φ_B = ∬ B · dA).\n\nLenz's Law (The Negative Sign):\nThe polarity of an induced EMF generates an electric current whose magnetic field strictly OPPOSES the original change in magnetic flux that produced it (Conservation of Energy).\n\nMutual Inductance & Electrical Transformers:\nV_secondary / V_primary = N_secondary / N_primary = I_primary / I_secondary, stepping voltages up or down with minimal resistive thermal dissipation."
  },
  {
    "id": "phys-12",
    "title": "Maxwell Equations & Electromagnetic Wave Propagation",
    "readTime": "10 min",
    "diff": "Electromagnetism Advanced",
    "summary": "The 4 Maxwell equations, displacement current, wave equation, and the speed of light c = 1/√(μ0ε0).",
    "content": "James Clerk Maxwell unified electricity, magnetism, and optics into four classical field equations in 1865.\n\nThe Four Maxwell Equations (Integral Form):\n1. Gauss's Law for Electricity: ∮ E · dA = Q_enc / ε0 (Electric charges produce diverging fields).\n2. Gauss's Law for Magnetism: ∮ B · dA = 0 (No isolated magnetic monopoles exist; magnetic flux lines are continuous closed loops).\n3. Faraday's Law of Induction: ∮ E · dl = -dΦ_B / dt (A changing magnetic field induces a curling electric field).\n4. Ampère-Maxwell Law: ∮ B · dl = μ0 * I_enc + μ0*ε0 * (dΦ_E / dt) (A changing electric field induces a curling magnetic field via Maxwell's Displacement Current).\n\nThe Electromagnetic Wave Equation:\nManipulating Maxwell's equations in a vacuum yields transverse wave equations for E and B, traveling at precisely the speed of light: c = 1 / √(μ0 * ε0) ≈ 299,792,458 m/s."
  },
  {
    "id": "phys-13",
    "title": "Geometric Optics: Reflection, Refraction & Snell Law",
    "readTime": "8 min",
    "diff": "Optics Core",
    "summary": "Fermat principle, law of reflection, Snell law of refraction, total internal reflection, thin lens equation.",
    "content": "Geometric optics models light propagation as discrete rays traveling through homogeneous optical media.\n\nLaws of Geometrical Optics:\n1. Law of Reflection: Angle of incidence equals angle of reflection (θ_i = θ_r), measured relative to the surface normal.\n2. Snell's Law of Refraction: n1 * sin(θ1) = n2 * sin(θ2), where n = c / v is the Index of Refraction.\n3. Total Internal Reflection (TIR): When light travels from an optically denser medium (n1) to a rarer medium (n2) at an angle exceeding the Critical Angle (sin θ_c = n2 / n1), light is 100% internally reflected without refraction—the operating principle of fiber-optic internet cables and endoscopy.\n\nThe Thin Lens Equation:\n1/f = 1/d_o + 1/d_i (where f is focal length, d_o is object distance, and d_i is image distance)."
  },
  {
    "id": "phys-14",
    "title": "Physical Optics: Wave Interference & Diffraction Grating",
    "readTime": "9 min",
    "diff": "Wave Optics",
    "summary": "Huygens principle, Young double-slit interference, single-slit Fraunhofer diffraction, and polarization.",
    "content": "Physical optics explores optical phenomena that can only be explained by treating light as an electromagnetic wave.\n\nHuygens-Fresnel Principle:\nEvery point on an advancing wavefront acts as a secondary source of spherical wavelets; the new wavefront is the envelope tangent to these wavelets.\n\nYoung's Double-Slit Experiment (Thomas Young, 1801):\nLight passed through two narrow coherent slits produces alternating bright constructive and dark destructive Interference Fringes on a distant screen:\n- Constructive Interference (Bright): d * sin(θ) = m * λ (Path difference = integer wavelength).\n- Destructive Interference (Dark): d * sin(θ) = (m + 1/2) * λ.\n\nDiffraction Gratings: Multiple parallel microscopic slits producing high-resolution spectral separation used in astrophysical spectrographs."
  },
  {
    "id": "phys-15",
    "title": "Special Relativity: Time Dilation & Mass-Energy Equivalence",
    "readTime": "10 min",
    "diff": "Modern Physics Core",
    "summary": "Einstein postulates, Lorentz transformation, relativistic time dilation, length contraction, and E = mc².",
    "content": "Albert Einstein's Special Relativity (1905) revolutionized human understanding of space, time, and mass.\n\nThe Two Postulates of Special Relativity:\n1. The Principle of Relativity: The laws of physics are invariant across all inertial (non-accelerating) reference frames.\n2. Invariance of the Speed of Light: The speed of light in a vacuum (c) is constant for all observers regardless of their motion or the motion of the light source.\n\nRelativistic Kinematic Consequences:\n- The Lorentz Factor: γ = 1 / √(1 - v² / c²)\n- Time Dilation: Moving clocks run measurably slower relative to a stationary observer: Δt = γ * Δt_0.\n- Length Contraction: Objects in motion contract in the direction of travel: L = L_0 / γ.\n- Relativistic Mass-Energy Equivalence: E = γ * m * c², simplifying at rest to the celebrated formula E = m*c²."
  },
  {
    "id": "phys-16",
    "title": "Quantum Mechanics: Wave-Particle Duality & The Photoelectric Effect",
    "readTime": "10 min",
    "diff": "Quantum Physics Core",
    "summary": "Planck energy quanta (E = hf), Einstein photoelectric effect, de Broglie matter waves, and Compton scattering.",
    "content": "Quantum mechanics demonstrates that energy and matter exhibit both wave-like and particle-like properties at microscopic scales.\n\nThe Birth of Quantum Physics:\n1. Planck's Quantum Hypothesis (1900): Max Planck resolved the Ultraviolet Catastrophe of blackbody radiation by postulating that electromagnetic energy is emitted in discrete packets (quanta): E = h * f (where h is Planck's constant ≈ 6.626 × 10⁻³⁴ J · s).\n2. Einstein's Photoelectric Effect (1905 Nobel Prize): Proved that light consists of localized photon particles. Electrons are ejected from a metal plate if and only if individual photon energy exceeds the Work Function (Φ): K_max = h*f - Φ.\n3. De Broglie Wavelength of Matter (1924): Any particle possessing linear momentum (p) exhibits an associated matter wavelength: λ = h / p = h / (mv), verified by electron diffraction through nickel crystals."
  },
  {
    "id": "phys-17",
    "title": "The Schrödinger Wave Equation & The Uncertainty Principle",
    "readTime": "10 min",
    "diff": "Quantum Mechanics Advanced",
    "summary": "Heisenberg uncertainty principle, Born probability interpretation, and the time-dependent Schrödinger equation.",
    "content": "Quantum systems are described probabilistically through complex wavefunctions satisfying the Schrödinger equation.\n\nHeisenberg's Uncertainty Principle (Werner Heisenberg, 1927):\nIt is physically impossible to simultaneously measure the exact position (x) and exact linear momentum (p) of a subatomic particle with arbitrary precision:\nΔx * Δp ≥ ℏ / 2  (where ℏ = h / 2π).\n- Energy-Time Uncertainty: ΔE * Δt ≥ ℏ / 2.\n\nThe Schrödinger Wave Equation:\niℏ * (∂Ψ/∂t) = Ĥ * Ψ\nWhere Ĥ is the Hamiltonian operator representing total system energy.\n\nThe Born Interpretation of the Wavefunction (Max Born):\nThe wavefunction Ψ(x, t) itself is a complex probability amplitude. The squared magnitude |Ψ(x, t)|² represents the Probability Density of finding the particle at coordinate x at time t."
  },
  {
    "id": "phys-18",
    "title": "Atomic Models: Rutherford, Bohr & Quantum Hydrogen Solutions",
    "readTime": "9 min",
    "diff": "Atomic Physics",
    "summary": "Rutherford alpha scattering, Bohr orbital model, quantization of angular momentum, and atomic emission spectra.",
    "content": "Atomic physics models the electronic shell architecture surrounding atomic nuclei.\n\nEvolution of the Atomic Model:\n1. Rutherford Alpha Scattering Experiment (1911): Fired alpha particles at thin gold foil; rare wide-angle backscattering revealed that the atom is mostly empty space with a tiny, dense, positively charged nucleus.\n2. The Bohr Model of Hydrogen (Niels Bohr, 1913): Postulated that electrons inhabit discrete, non-radiating quantized orbits where angular momentum is quantized: L = n * ℏ.\n   - Energy Levels of Hydrogen: E_n = -13.6 eV / n².\n   - Atomic Line Spectra: Photons are emitted or absorbed when electrons transition between quantized energy tiers: ΔE = E_initial - E_final = h * f (explaining Lyman, Balmer, and Paschen spectral series).\n3. Quantum Mechanical Orbital Model: Solves the 3D Schrödinger equation to yield Quantum Numbers: Principal (n), Azimuthal (l), Magnetic (m_l), and Spin (m_s)."
  },
  {
    "id": "phys-19",
    "title": "Nuclear Physics: Radioactivity, Fission & Fusion",
    "readTime": "9 min",
    "diff": "Nuclear Physics Core",
    "summary": "Strong nuclear force, alpha/beta/gamma decay, nuclear binding energy curve, and nuclear fission reactors.",
    "content": "Nuclear physics investigates atomic nuclei, subatomic nucleons (protons and neutrons), and nuclear reactions.\n\nNuclear Forces & Binding Energy:\n- Strong Nuclear Force: Powerful, short-range attractive force (~1 femtometer) binding nucleons together, overcoming electrostatic Coulomb repulsion between positively charged protons.\n- Mass Defect & Binding Energy: The mass of an intact nucleus is always less than the sum of its individual constituent protons and neutrons; the missing mass (Δm) converts to Binding Energy: E_b = Δm * c².\n- The Nuclear Binding Curve: Peaks at Iron-56 (most stable nucleus). Nuclei lighter than iron release energy via Nuclear Fusion; nuclei heavier than iron release energy via Nuclear Fission.\n\nRadioactive Decay Modes:\n- Alpha Decay (He-4 nucleus emission), Beta Decay (weak force neutron-to-proton transition releasing electron and antineutrino), and Gamma Decay (high-energy photon emission)."
  },
  {
    "id": "phys-20",
    "title": "Particle Physics & The Standard Model",
    "readTime": "10 min",
    "diff": "High-Energy Particle Physics",
    "summary": "Quarks, leptons, gauge bosons (gluons, photons, W/Z), the Higgs boson, and fundamental forces.",
    "content": "The Standard Model of particle physics is humanity's most rigorously tested classification of fundamental subatomic particles and forces.\n\nThe Elementary Particle Taxonomy:\n1. Fermions (Matter Constituents; Half-Integer Spin 1/2):\n   - Quarks (6 Flavors): Up, Down, Charm, Strange, Top, Bottom. Combine to form Hadrons (Baryons like protons [uud] and neutrons [udd]; Mesons).\n   - Leptons (6 Flavors): Electron, Muon, Tau, and their corresponding Neutrinos.\n2. Gauge Bosons (Force Mediators; Integer Spin 1):\n   - Gluon: Mediates the Strong Force (Quantum Chromodynamics - QCD; color charge).\n   - Photon: Mediates Electromagnetism (Quantum Electrodynamics - QED).\n   - W+, W-, and Z0 Bosons: Mediate the Weak Nuclear Force (responsible for beta decay).\n3. The Scalar Higgs Boson (Discovered at CERN LHC in 2012; Spin 0):\n   - Manifestation of the Higgs Field, responsible for conferring mass upon fundamental particles via electroweak symmetry breaking."
  },
  {
    "id": "phys-21",
    "title": "Condensed Matter Physics: Semiconductors & Superconductors",
    "readTime": "9 min",
    "diff": "Solid State Physics",
    "summary": "Band theory of solids (valence vs conduction band, bandgap), p-n junctions, and zero-resistance superconductivity.",
    "content": "Condensed matter physics explores the quantum macroscopic properties of solid crystalline materials and fluids.\n\nElectronic Band Theory of Solids:\n- Valence Band: Occupied by valence electrons.\n- Conduction Band: Empty or partially filled band where delocalized electrons conduct electrical current.\n- Bandgap (E_g):\n  - Conductors: Bands overlap (E_g = 0); metals conduct readily.\n  - Insulators: Large forbidden bandgap (E_g > 5 eV); electrons cannot jump across.\n  - Semiconductors (Silicon, Germanium): Moderate bandgap (E_g ≈ 1.1 eV), controllable via thermal excitation or chemical Doping (n-type phosphorus donors; p-type boron acceptors), enabling transistors, diodes, and microprocessors.\n\nSuperconductivity (Onnes, 1911):\nBelow a Critical Temperature (T_c), certain materials exhibit precisely ZERO electrical resistance and expel all internal magnetic fields (The Meissner Effect; BCS Theory of Cooper Pairs)."
  }
];
