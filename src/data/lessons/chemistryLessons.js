export const chemistryLessons = [
  {
    "id": "chem-01",
    "title": "Atomic Structure & Quantum Orbitals",
    "readTime": "9 min",
    "diff": "Chemistry Core",
    "summary": "Subatomic particles, isotopes, Pauli exclusion principle, Hund rule, Aufbau principle, and s/p/d/f orbitals.",
    "content": "Atomic structure governs the chemical reactivity and bonding behavior of all elements in the periodic table.\n\nThe Quantum Mechanical Atomic Architecture:\nElectrons inhabit probabilistic 3D atomic orbitals defined by four Quantum Numbers:\n1. Principal Quantum Number (n = 1, 2, 3...): Energy level and orbital radial distance.\n2. Azimuthal/Angular Momentum (l = 0 to n-1): Orbital geometry (l=0 s-orbital sphere; l=1 p-orbital dumbbell; l=2 d-orbital clover; l=3 f-orbital).\n3. Magnetic Quantum Number (m_l = -l to +l): Spatial orientation of the orbital.\n4. Spin Quantum Number (m_s = +1/2, -1/2): Intrinsic electron spin.\n\nElectronic Configuration Rules:\n- Aufbau Principle: Electrons fill lowest-energy subshells first (1s < 2s < 2p < 3s < 3p < 4s < 3d).\n- Pauli Exclusion Principle: No two electrons in an atom can share the identical four quantum numbers; an orbital holds at most 2 electrons with opposite spins.\n- Hund's Rule: Subshells of equal energy are occupied singly before pairing occurs."
  },
  {
    "id": "chem-02",
    "title": "Periodic Trends & Chemical Periodicity",
    "readTime": "8 min",
    "diff": "Inorganic Chemistry",
    "summary": "Atomic radius, ionization energy, electron affinity, electronegativity (Pauling scale), and effective nuclear charge (Zeff).",
    "content": "The Periodic Table organizes elements according to atomic number and periodic recurrence of chemical properties.\n\nEffective Nuclear Charge (Z_eff):\nZ_eff = Z - S (where Z is atomic number and S is core electron shielding). Z_eff increases left-to-right across a period, pulling valence electrons tighter.\n\nFundamental Periodic Trends:\n1. Atomic Radius: Decreases left-to-right across a period (increasing Z_eff pulls electron cloud closer); increases down a group (adding new quantum shells).\n2. First Ionization Energy: The energy required to remove the outermost valence electron from a gaseous atom. Increases across a period; decreases down a group.\n3. Electronegativity (Linus Pauling Scale): The measure of an atom's ability to attract shared bonding electrons. Fluorine is the most electronegative element (3.98), Cesium/Francium the least (~0.7)."
  },
  {
    "id": "chem-03",
    "title": "Chemical Bonding: Ionic, Covalent & Metallic Lattices",
    "readTime": "9 min",
    "diff": "General Chemistry",
    "summary": "Lattice energy, Born-Haber cycle, polar vs nonpolar covalent bonds, dipole moments, and electron sea model.",
    "content": "Chemical bonding occurs when atoms achieve stable, low-energy noble gas valence electron configurations (The Octet Rule).\n\nPrimary Bonding Regimes:\n1. Ionic Bonding: Electrostatic attraction between oppositely charged ions formed by complete electron transfer (typically metal cation + nonmetal anion):\n   - High melting points, brittle crystalline lattices (e.g., NaCl), electrically conductive when molten or dissolved in water.\n   - Governed by Lattice Energy (calculated via the thermodynamic Born-Haber cycle).\n2. Covalent Bonding: Sharing of electron pairs between nonmetal atoms:\n   - Nonpolar Covalent: Electronegativity difference ΔEN < 0.5 (e.g., H2, CH4).\n   - Polar Covalent: ΔEN between 0.5 and 1.7, creating permanent partial charges (δ+ and δ-) and dipole moments (e.g., H2O).\n3. Metallic Bonding: Metal cations arranged in rigid crystal lattices immersed in a delocalized \"sea of mobile valence electrons,\" conferring high electrical/thermal conductivity and ductility."
  },
  {
    "id": "chem-04",
    "title": "Molecular Geometry & VSEPR Theory",
    "readTime": "8 min",
    "diff": "Physical Chemistry",
    "summary": "Valence Shell Electron Pair Repulsion theory, hybridization (sp, sp2, sp3), steric numbers, and bond angles.",
    "content": "VSEPR theory predicts the 3D geometric shape of covalent molecules by minimizing electrostatic repulsion between valence electron pairs.\n\nSteric Numbers & Electron-Pair Geometries:\n- Steric Number 2 (sp Hybridization): Linear geometry, 180° bond angle (e.g., CO2, BeCl2).\n- Steric Number 3 (sp² Hybridization): Trigonal planar geometry, 120° bond angle (e.g., BF3); or Bent geometry if 1 lone pair (e.g., SO2).\n- Steric Number 4 (sp³ Hybridization): Tetrahedral electron geometry, ideal 109.5° angle:\n  - 0 Lone Pairs: Tetrahedral molecular shape (CH4, 109.5°).\n  - 1 Lone Pair: Trigonal Pyramidal (NH3, 107° - lone pair exerts greater repulsion).\n  - 2 Lone Pairs: Bent shape (H2O, 104.5°).\n- Steric Numbers 5 & 6 (d-Orbital Involvements): Trigonal Bipyramidal (PCl5) and Octahedral (SF6, 90°)."
  },
  {
    "id": "chem-05",
    "title": "Intermolecular Forces & States of Matter",
    "readTime": "8 min",
    "diff": "Physical Chemistry",
    "summary": "London dispersion forces, dipole-dipole interactions, hydrogen bonding, phase diagrams, and triple points.",
    "content": "Intermolecular forces (IMFs) are electrostatic attractions operating between adjacent molecules, dictating boiling points and physical states.\n\nHierarchy of Intermolecular Forces:\n1. London Dispersion Forces (LDF / Van der Waals): Weakest, ubiquitous forces generated by temporary, instantaneous induced dipoles; scales with molecular polarizability and molar mass.\n2. Dipole-Dipole Attractions: Electrostatic attraction between permanent partial charges of polar molecules.\n3. Hydrogen Bonding: An exceptionally strong specialized dipole-dipole attraction occurring when hydrogen is covalently bonded to small, highly electronegative atoms (Fluorine, Oxygen, Nitrogen - F, O, N):\n   - Accounts for water's anomalous high boiling point, high surface tension, and why ice is less dense than liquid water.\n\nPhase Diagrams: P-T charts mapping Solid, Liquid, and Gas phase boundaries, featuring the Triple Point (all three phases coexist in equilibrium) and Critical Point (supercritical fluid state)."
  },
  {
    "id": "chem-06",
    "title": "Chemical Thermodynamics: Enthalpy, Entropy & Gibbs Free Energy",
    "readTime": "9 min",
    "diff": "Thermodynamics Core",
    "summary": "Hess law, standard enthalpies of formation, entropy changes (ΔS), and spontaneity condition ΔG = ΔH - TΔS.",
    "content": "Chemical thermodynamics determines whether a chemical reaction is energetically favorable and can occur spontaneously.\n\nThermodynamic Functions:\n1. Enthalpy (ΔH): Heat content exchanged at constant pressure:\n   - Exothermic Reactions (ΔH < 0): Release thermal heat to surroundings (combustion).\n   - Endothermic Reactions (ΔH > 0): Absorb thermal heat from surroundings (photosynthesis).\n   - Hess's Law: Total enthalpy change of a reaction is independent of the pathway taken: ΔH_rxn = ∑ ΔH_f(products) - ∑ ΔH_f(reactants).\n2. Entropy (ΔS): Measure of microscopic molecular disorder and accessible microstates (Boltzmann equation S = k * ln W).\n\nGibbs Free Energy & Reaction Spontaneity:\nΔG = ΔH - T * ΔS\n- ΔG < 0: Exergonic reaction; strictly SPONTANEOUS.\n- ΔG > 0: Endergonic reaction; NON-SPONTANEOUS.\n- ΔG = 0: Dynamic chemical equilibrium."
  },
  {
    "id": "chem-07",
    "title": "Chemical Kinetics & Reaction Rates",
    "readTime": "9 min",
    "diff": "Physical Chemistry Core",
    "summary": "Rate laws, reaction order (zero, first, second), activation energy (Ea), Arrhenius equation, and catalysis.",
    "content": "Chemical kinetics measures the speed of chemical reactions and elucidates microscopic reaction mechanisms.\n\nDifferential Rate Laws:\nRate = k * [A]^m * [B]^n\nWhere k is the rate constant, and m and n represent empirical reaction orders determined experimentally (not from stoichiometric coefficients).\n- First-Order Reactions: Half-life is constant, independent of initial reactant concentration: t_(1/2) = ln(2) / k ≈ 0.693 / k (e.g., radioactive nuclear decay).\n\nCollision Theory & The Arrhenius Equation:\nChemical reactions occur only when reacting molecules collide with sufficient kinetic energy exceeding the Activation Energy (E_a) and with correct stereochemical orientation:\nk = A * e^(-E_a / RT)\n- Catalysts: Accelerate reaction velocity by providing an alternate reaction pathway with a significantly lower activation energy barrier, remaining chemically unchanged upon reaction completion."
  },
  {
    "id": "chem-08",
    "title": "Chemical Equilibrium: Le Chatelier Principle",
    "readTime": "9 min",
    "diff": "General Chemistry",
    "summary": "Law of mass action, equilibrium constant (Kc and Kp), reaction quotient (Q), and Le Chatelier shifts.",
    "content": "Dynamic chemical equilibrium is reached when the rates of forward and reverse reactions are equal, resulting in constant macroscopic concentrations.\n\nThe Law of Mass Action & Equilibrium Constant:\nFor reaction aA + bB ⇌ cC + dD:\nK_c = ([C]^c * [D]^d) / ([A]^a * [B]^b)\n- Reaction Quotient (Q): Calculated identically using non-equilibrium concentrations. If Q < K, reaction shifts forward to the right; if Q > K, reaction shifts in reverse to the left.\n\nLe Chatelier's Principle:\nIf a dynamic chemical equilibrium is subjected to an external disturbance (change in concentration, pressure, or temperature), the system adjusts to partially counteract that disturbance:\n- Increasing Reactant Concentration: Shifts equilibrium rightward to form more products.\n- Increasing Pressure (Decreasing Volume): Shifts equilibrium toward the side with fewer gas moles.\n- Temperature Changes: Treating heat as a reactant (endothermic) or product (exothermic); temperature shifts actually alter the numerical value of K."
  },
  {
    "id": "chem-09",
    "title": "Acid-Base Equilibria: Brønsted-Lowry & Lewis Theories",
    "readTime": "9 min",
    "diff": "Analytical Chemistry",
    "summary": "Arrhenius vs Brønsted-Lowry vs Lewis acids/bases, pH scale, autoionization of water (Kw), Ka/Kb, and buffers.",
    "content": "Acid-base chemistry investigates proton transfer and electron-pair sharing across aqueous solutions.\n\nTheoretical Frameworks:\n1. Arrhenius Theory: Acids produce H+ (H3O+) in water; bases produce OH-.\n2. Brønsted-Lowry Theory: Acids are Proton (H+) Donors; bases are Proton Acceptors. Generates Conjugate Acid-Base Pairs.\n3. Lewis Theory: The broadest definition: Acids are Electron-Pair Acceptors (electrophiles; e.g., BF3, AlCl3); bases are Electron-Pair Donors (nucleophiles; e.g., NH3).\n\npH, pOH & The Henderson-Hasselbalch Equation:\n- Autoionization of Water: Kw = [H3O+] * [OH-] = 1.0 × 10⁻¹⁴ at 25°C. pH = -log[H3O+].\n- Buffer Solutions: Resist changes in pH upon addition of small amounts of strong acid or base, composed of a weak acid and its conjugate base:\npH = pKa + log([A-] / [HA])"
  },
  {
    "id": "chem-10",
    "title": "Electrochemistry: Galvanic Cells & Nernst Equation",
    "readTime": "9 min",
    "diff": "Electrochemistry Core",
    "summary": "Redox reactions, galvanic (voltaic) cells, standard reduction potentials, cell potential E°cell, and Faraday laws.",
    "content": "Electrochemistry studies the interconversion of chemical potential energy and electrical energy through redox reactions.\n\nGalvanic (Voltaic) Cells:\nSpontaneous redox reactions generate continuous direct electrical current:\n- Anode: Oxidation occurs (loss of electrons; negative electrode): \"An Ox\".\n- Cathode: Reduction occurs (gain of electrons; positive electrode): \"Red Cat\".\n- Salt Bridge: Maintains electrical neutrality by allowing counter-ion migration (K+, NO3-), preventing charge buildup.\n\nStandard Cell Potential & Thermodynamic Relationship:\nE°_cell = E°_cathode - E°_anode\nΔG° = -n * F * E°_cell  (where F is Faraday's constant ≈ 96,485 C/mol e-).\n\nThe Nernst Equation (Non-Standard Conditions):\nE_cell = E°_cell - (RT / nF) * ln(Q) = E°_cell - (0.0592 / n) * log(Q) at 298 K."
  },
  {
    "id": "chem-11",
    "title": "Organic Chemistry: Hydrocarbons & Functional Groups",
    "readTime": "9 min",
    "diff": "Organic Chemistry Core",
    "summary": "IUPAC nomenclature, alkanes, alkenes, alkynes, aromatic benzene resonance, and core functional groups.",
    "content": "Organic chemistry is the scientific study of carbon-based compounds, characterized by carbon's unique ability to catenate.\n\nHydrocarbon Classification:\n1. Alkanes (Saturated): Single C-C bonds; formula C_n H_(2n+2); relatively unreactive except for radical halogenation and combustion.\n2. Alkenes & Alkynes (Unsaturated): C=C double bonds (sp² hybridized; C_n H_2n) and C≡C triple bonds (sp hybridized; C_n H_(2n-2)); undergo electrophilic additions.\n3. Aromatic Hydrocarbons (Arenes): Benzene ring (C6H6) possessing 6 delocalized pi electrons satisfying Hückel's Rule (4n + 2); exhibits immense resonance stabilization, undergoing Electrophilic Aromatic Substitution (EAS).\n\nMajor Functional Groups:\nAlcohols (-OH), Aldehydes (-CHO), Ketones (-CO-), Carboxylic Acids (-COOH), Esters (-COOR), Amines (-NH2), and Amides (-CONH2)."
  },
  {
    "id": "chem-12",
    "title": "Stereochemistry: Chirality & Optical Isomerism",
    "readTime": "8 min",
    "diff": "Organic Stereochemistry",
    "summary": "Chiral centers, enantiomers, diastereomers, meso compounds, Cahn-Ingold-Prelog (R/S) rules, and polarimetry.",
    "content": "Stereochemistry investigates the 3D spatial arrangement of atoms within isomeric molecules.\n\nChirality & Enantiomerism:\n- Chiral Carbon (Stereocenter): An sp³ hybridized carbon atom bonded to four distinctly different substituent groups.\n- Enantiomers: Non-superimposable mirror image stereoisomers: Possess identical physical properties (melting point, density), but rotate plane-polarized light in equal and opposite directions (+ dextrorotatory, - levorotatory; Optical Activity).\n- Diastereomers: Stereoisomers that are not mirror images (e.g., cis/trans alkenes; differing at some but not all chiral centers); exhibit distinctly different physical and chemical properties.\n\nCahn-Ingold-Prelog (CIP) Priority Rules:\nSubstituents are prioritized by atomic number (Z). Viewing with lowest priority (#4) pointing away: clockwise sequence 1->2->3 is designated (R) (Rectus); counter-clockwise is designated (S) (Sinister)."
  },
  {
    "id": "chem-13",
    "title": "Reaction Mechanisms: Nucleophilic Substitution (SN1 vs SN2)",
    "readTime": "9 min",
    "diff": "Organic Mechanisms",
    "summary": "Carbocation intermediates, backside attack, inversion of configuration, solvent effects, and E1/E2 eliminations.",
    "content": "Nucleophilic substitution reactions replace a leaving group on an sp³ carbon with an electron-rich nucleophile.\n\nSN1 vs SN2 Mechanistic Dichotomy:\n1. SN2 Mechanism (Bimolecular Nucleophilic Substitution):\n   - Single concerted, one-step mechanism: Nucleophile attacks backside simultaneously as leaving group departs.\n   - Rate = k * [Substrate] * [Nucleophile] (Second-order kinetics).\n   - Stereochemistry: 100% Walden Inversion of configuration (umbrella flipping inside out).\n   - Favored by: Primary alkyl halides, strong nucleophiles, and polar aprotic solvents (acetone, DMSO).\n2. SN1 Mechanism (Unimolecular Nucleophilic Substitution):\n   - Two-step mechanism via a planar Carbocation intermediate (Rate-determining step is leaving group departure).\n   - Rate = k * [Substrate] (First-order kinetics).\n   - Stereochemistry: Racemization (nucleophile attacks planar carbocation from either top or bottom face).\n   - Favored by: Tertiary alkyl halides (stable tertiary carbocations) and polar protic solvents (water, ethanol)."
  },
  {
    "id": "chem-14",
    "title": "Biomolecules: Carbohydrates, Lipids & Proteins",
    "readTime": "9 min",
    "diff": "Biochemistry Core",
    "summary": "Monosaccharides (glucose), glycosidic bonds, triglycerides, amino acid zwitterions, and protein folding hierarchy.",
    "content": "Biomolecules are complex organic macromolecules that execute the metabolic and structural functions of living cells.\n\nMajor Classes of Biomolecules:\n1. Carbohydrates: General formula (CH2O)_n. Monosaccharides (glucose, fructose) link via Glycosidic Bonds to form structural polysaccharides (Cellulose in plants, Chitin) or energy storage reserves (Glycogen, Starch).\n2. Lipids: Hydrophobic macromolecules; Triglycerides (glycerol + 3 fatty acids), Phospholipids, and Steroid hormones. Fatty acids may be saturated (no double bonds; solid at room temperature) or unsaturated (cis double bonds inducing kinks; liquid oils).\n3. Proteins: Linear polymers of 20 standard L-alpha Amino Acids joined via Peptide Bonds:\n   - Primary Structure: Covalent sequence of amino acids.\n   - Secondary Structure: Local hydrogen bonding forming Alpha-Helices and Beta-Pleated Sheets.\n   - Tertiary Structure: 3D globular folding driven by hydrophobic interactions, disulfide bridges, and ionic salt bridges.\n   - Quaternary Structure: Multi-subunit complexes (e.g., tetrameric hemoglobin)."
  },
  {
    "id": "chem-15",
    "title": "Coordination Chemistry & Crystal Field Theory (CFT)",
    "readTime": "9 min",
    "diff": "Inorganic Chemistry Advanced",
    "summary": "Transition metal complexes, coordination numbers, ligands (monodentate, bidentate, chelating), and d-orbital splitting.",
    "content": "Coordination compounds contain a central transition metal atom or ion bonded to surrounding molecules or anions termed Ligands.\n\nCoordination Terminology:\n- Coordinate Covalent Bond: A covalent bond where both shared electrons originate from the lone pair of the ligand (Lewis base).\n- Chelation: Polydentate ligands possessing multiple donor atoms (e.g., EDTA⁴⁻) binding tightly to a metal center.\n\nCrystal Field Theory (CFT):\nConsiders electrostatic repulsion between ligand lone pairs and metal d-orbital electrons:\n- In an Octahedral Complex: The five degenerate d-orbitals split into two distinct energy tiers: higher-energy e_g orbitals (d_z², d_x²-y²) and lower-energy t_2g orbitals (d_xy, d_xz, d_yz).\n- Crystal Field Splitting Energy (Δ_oct): Strong-field ligands (CN⁻, CO) induce large Δ_oct, forcing electrons to pair in lower orbitals (Low-Spin); weak-field ligands (I⁻, Cl⁻) yield High-Spin complexes.\n- D-d Electronic Transitions: Absorption of visible light photons exciting electrons between split d-orbitals gives coordination compounds their brilliant vivid colors."
  },
  {
    "id": "chem-16",
    "title": "Nuclear Chemistry: Radiochemistry & Isotopic Half-Lives",
    "readTime": "8 min",
    "diff": "Nuclear Chemistry",
    "summary": "Belt of stability, radioactive decay kinetics, radiocarbon dating (C-14), nuclear medicine, and PET imaging.",
    "content": "Nuclear chemistry investigates changes in nuclear composition, transmutations, and radioactive decay.\n\nThe Nuclear Belt of Stability:\nStable nuclei exhibit specific Neutron-to-Proton (N/Z) ratios (1.0 for light elements, rising to ~1.5 for heavy elements). Unstable isotopes undergo radioactive decay to reach stability:\n- Neutron-Rich Nuclei: Undergo Beta-Minus Decay (neutron converts to proton, ejecting an electron and antineutrino).\n- Proton-Rich Nuclei: Undergo Positron Emission (Beta-Plus) or Electron Capture.\n- Heavy Nuclei (Z > 83): Undergo Alpha Decay.\n\nRadioactive Decay Kinetics:\nFirst-order integrated rate law: N(t) = N0 * e^(-λt)\n- Half-Life: t_(1/2) = ln(2) / λ ≈ 0.693 / λ.\n- Carbon-14 Dating: Measures the decay ratio of C-14 to stable C-12 in organic archaeological remains (half-life ~5,730 years)."
  },
  {
    "id": "chem-17",
    "title": "Spectroscopy: UV-Vis, FTIR & Nuclear Magnetic Resonance (NMR)",
    "readTime": "10 min",
    "diff": "Instrumental Analytical Chemistry",
    "summary": "Beer-Lambert law, infrared functional group vibrations, 1H-NMR chemical shift, and spin-spin splitting.",
    "content": "Spectroscopic instrumentation identifies molecular structures by measuring their absorption, emission, or scattering of electromagnetic radiation.\n\nMajor Analytical Spectroscopic Modalities:\n1. UV-Vis Spectroscopy: Measures electronic transitions (pi -> pi*, n -> pi*) in conjugated systems. Governed by the Beer-Lambert Law: A = ε * b * c (Absorbance = molar absorptivity × path length × concentration).\n2. Fourier-Transform Infrared (FTIR) Spectroscopy: Measures molecular vibrational transitions (stretching and bending). Diagnostic functional group frequencies:\n   - O-H stretch: Broad peak around 3200–3600 cm⁻¹.\n   - C=O Carbonyl stretch: Intense sharp peak around 1700 cm⁻¹.\n3. Proton NMR Spectroscopy (¹H-NMR): Identifies the hydrogen framework of organic molecules in a strong magnetic field:\n   - Chemical Shift (δ, ppm): Shielding/deshielding relative to standard TMS (0 ppm).\n   - Spin-Spin Splitting (n+1 Rule): Neighboring non-equivalent protons split peaks into doublets, triplets, or quartets."
  },
  {
    "id": "chem-18",
    "title": "Polymer Chemistry: Addition, Condensation & Smart Polymers",
    "readTime": "8 min",
    "diff": "Polymer Science",
    "summary": "Free radical addition polymerization, nylon condensation, cross-linking, vulcanization, and bioplastics.",
    "content": "Polymers are high-molecular-weight macromolecules synthesized by linking repeating chemical units termed Monomers.\n\nPolymerization Mechanisms:\n1. Addition (Chain-Growth) Polymerization: Monomers containing carbon-carbon double bonds link without loss of small molecules (Initiation, Propagation, Termination):\n   - Polyethylene (plastic bags), Polypropylene, Polystyrene, Polyvinyl Chloride (PVC).\n2. Condensation (Step-Growth) Polymerization: Bi-functional monomers react with the elimination of small byproduct molecules (typically water or HCl):\n   - Nylon 6,6 (polyamide synthesized from adipic acid and hexamethylenediamine), Dacron (polyester).\n\nPhysical Properties & Cross-Linking:\n- Thermoplastics: Linear or branched polymers that melt reversibly upon heating.\n- Thermosets: Heavily cross-linked covalent networks that degrade rather than melt upon heating (bakelite, vulcanized rubber)."
  },
  {
    "id": "chem-19",
    "title": "Environmental Chemistry: Ozone Depletion & Green Chemistry Principles",
    "readTime": "8 min",
    "diff": "Environmental Science",
    "summary": "Chapman cycle, CFC catalytic ozone destruction, green chemistry 12 principles, and atom economy.",
    "content": "Environmental chemistry investigates chemical species in the environment and the technological design of sustainable industrial processes.\n\nStratospheric Ozone Depletion:\n- The Chapman Cycle naturally balances stratospheric ozone formation and destruction.\n- Catalytic Destruction by Chlorofluorocarbons (CFCs): Solar UV photolysis releases free Chlorine radicals (Cl·), which catalyze the destruction of ozone molecules:\n  Cl· + O3 -> ClO· + O2\n  ClO· + O· -> Cl· + O2\n  Net Reaction: O3 + O· -> 2 O2 (A single chlorine radical destroys over 100,000 ozone molecules before termination).\n\nThe 12 Principles of Green Chemistry (Anastas & Warner):\nAtom Economy (maximizing incorporation of all raw materials into final product), prevention of waste, using safer solvents, designing for degradation, and catalytic rather than stoichiometric reagents."
  },
  {
    "id": "chem-20",
    "title": "Industrial Chemistry: The Haber-Bosch Process & Sulfuric Acid",
    "readTime": "9 min",
    "diff": "Industrial Chemistry Core",
    "summary": "Haber-Bosch ammonia synthesis, Contact process for H2SO4, heterogeneous iron catalysts, and fertilizer production.",
    "content": "Industrial chemical engineering scales laboratory reactions to manufacture millions of tons of foundational global commodities.\n\nThe Haber-Bosch Ammonia Synthesis:\nN2(g) + 3 H2(g) ⇌ 2 NH3(g)  (ΔH = -92.4 kJ/mol)\n- Crucial Role: Provides synthetic nitrogen fertilizer sustaining global agricultural food security for half of humanity.\n- Le Chatelier Compromise Conditions:\n  - Pressure (150–250 atm): Shifts equilibrium right toward fewer gas moles.\n  - Temperature (400–450°C): Compromise between thermodynamic yield (favored by low temp) and kinetic reaction rate (favored by high temp).\n  - Heterogeneous Catalyst: Porous fused iron promoted with K2O and Al2O3.\n\nThe Contact Process for Sulfuric Acid (H2SO4):\nWorld's most widely produced chemical commodity; utilizes Vanadium(V) Oxide (V2O5) catalyst to oxidize SO2 to SO3."
  },
  {
    "id": "chem-21",
    "title": "Nanotechnology: Carbon Nanotubes, Graphene & Quantum Dots",
    "readTime": "9 min",
    "diff": "Nanoscience Core",
    "summary": "Quantum confinement effects, graphene 2D honeycomb lattice, carbon nanotubes (CNT), and targeted drug delivery.",
    "content": "Nanotechnology manipulates matter at the nanometer scale (1–100 nm), where quantum mechanical confinement effects dominate bulk properties.\n\nNovel Carbon Allotropes:\n1. Graphene (Andre Geim & Konstantin Novoselov, 2010 Nobel Prize): A single two-dimensional layer of carbon atoms arranged in an sp²-hybridized hexagonal honeycomb lattice:\n   - Exceptional tensile strength (200 times stronger than steel), ballistic electron transport, and optical transparency (~97.7%).\n2. Carbon Nanotubes (CNTs): Cylindrical rolled sheets of graphene exhibiting extraordinary electrical conductivity and mechanical elasticity.\n\nQuantum Dots (2023 Nobel Prize):\nSemiconductor nanocrystals whose optical absorption and emission spectra are tunable simply by altering physical crystal diameter via Quantum Confinement."
  }
];
