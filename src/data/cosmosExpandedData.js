// Extended Cosmos knowledge base covering the Solar System, Universe objects, Missions, and Learning pathways

export const cosmosSolarSystem = [
  {
    id: 'sun',
    name: 'The Sun',
    order: 0,
    type: 'Yellow Dwarf Star (G2V)',
    diameter: '1,392,700 km (109 × Earth)',
    mass: '1.989 × 10³⁰ kg (333,000 × Earth)',
    surfaceTemp: '5,500°C (Core: 15,000,000°C)',
    distanceFromSun: '0 AU (Center of System)',
    orbitalPeriod: 'N/A (Galactic Year: 230M yrs)',
    rotationPeriod: '25 - 35 Earth days (Differential)',
    moons: 0,
    atmosphere: '73.46% Hydrogen, 24.85% Helium, traces of Oxygen & Carbon',
    notToScaleNotice: 'Orbital distances and planetary diameters in 3D views are scaled for visual clarity.',
    overview: 'The gravitational anchor of our planetary system, containing 99.86% of all matter. In its thermonuclear core, 600 million tons of hydrogen are fused into helium every single second via the proton-proton chain.',
    keyFeatures: ['Photosphere granules', 'Sunspots with intense magnetic fields', 'Coronal Mass Ejections (CMEs)', 'Solar Wind carving the Heliosphere'],
    tags: ['Star', 'Core', 'Heliosphere']
  },
  {
    id: 'mercury',
    name: 'Mercury',
    order: 1,
    type: 'Terrestrial / Rocky Planet',
    diameter: '4,879 km',
    mass: '3.30 × 10²³ kg (0.055 × Earth)',
    surfaceTemp: '-180°C to 430°C',
    distanceFromSun: '0.39 AU (57.9 million km)',
    orbitalPeriod: '88 Earth days',
    rotationPeriod: '58.6 Earth days (3:2 spin-orbit resonance)',
    moons: 0,
    atmosphere: 'Virtually none (Thin exosphere of Oxygen, Sodium, Hydrogen, Potassium)',
    notToScaleNotice: 'Planet sizes and orbits are adjusted for interactive viewing.',
    overview: 'The smallest planet and closest neighbor to the Sun. Having virtually no atmospheric blanket to retain thermal energy, Mercury experiences the most extreme temperature swings in the solar system.',
    keyFeatures: ['Caloris Basin impact crater', 'Lobate scarps (evidence the planet shrank as it cooled)', 'Permanently shadowed polar ice craters'],
    tags: ['Rocky', 'Extreme Temperatures', 'Innermost']
  },
  {
    id: 'venus',
    name: 'Venus',
    order: 2,
    type: 'Terrestrial / Super-Greenhouse Planet',
    diameter: '12,104 km (0.95 × Earth)',
    mass: '4.87 × 10²⁴ kg (0.815 × Earth)',
    surfaceTemp: '465°C (Hottest in Solar System)',
    distanceFromSun: '0.72 AU (108.2 million km)',
    orbitalPeriod: '225 Earth days',
    rotationPeriod: '243 Earth days (Retrograde / clockwise)',
    moons: 0,
    atmosphere: '96.5% Carbon Dioxide, 3.5% Nitrogen, clouds of Sulfuric Acid (92 bar pressure)',
    notToScaleNotice: 'Planet distances not rendered to actual astronomical scale.',
    overview: 'Earth\'s "twin" in size and mass, but crippled by a runaway greenhouse effect. Its crushing surface atmospheric pressure equals being 900 meters deep in an ocean on Earth.',
    keyFeatures: ['Retrograde spin (Sun rises in West)', 'Super-rotating atmosphere with 360 km/h hurricane winds', 'Thousands of volcanic structures'],
    tags: ['Greenhouse', 'Hottest', 'Sulfuric Acid']
  },
  {
    id: 'earth',
    name: 'Earth',
    order: 3,
    type: 'Terrestrial / Habitable Oasis',
    diameter: '12,742 km',
    mass: '5.97 × 10²⁴ kg',
    surfaceTemp: '-89°C to 57°C (Global average: 15°C)',
    distanceFromSun: '1.00 AU (149.6 million km)',
    orbitalPeriod: '365.25 days',
    rotationPeriod: '23 hours, 56 minutes, 4 seconds',
    moons: '1 (The Moon / Luna)',
    atmosphere: '78.08% Nitrogen, 20.95% Oxygen, 0.93% Argon, 0.04% Carbon Dioxide',
    notToScaleNotice: 'Visual scales optimized for readability.',
    overview: 'The only celestial world proven to support life. Driven by dynamic plate tectonics, protective geomagnetic van Allen belts, and stable surface liquid water oceans.',
    keyFeatures: ['Active plate tectonics renewing crust', 'Stratospheric ozone shielding UV-B', 'Hydrological cycle sustaining biodiversity'],
    tags: ['Habitable', 'Oceans', 'Life']
  },
  {
    id: 'mars',
    name: 'Mars',
    order: 4,
    type: 'Terrestrial / Desert Planet',
    diameter: '6,779 km (0.53 × Earth)',
    mass: '6.42 × 10²³ kg (0.107 × Earth)',
    surfaceTemp: '-125°C to 20°C (Average: -63°C)',
    distanceFromSun: '1.52 AU (227.9 million km)',
    orbitalPeriod: '687 Earth days',
    rotationPeriod: '24 hours, 37 minutes (1 sol)',
    moons: '2 (Phobos and Deimos)',
    atmosphere: '95.3% Carbon Dioxide, 2.6% Nitrogen, 1.9% Argon (6 millibar pressure)',
    notToScaleNotice: 'Proportions modified for desktop and mobile visualization.',
    overview: 'The Red Planet, stained rust-red by oxidized ferric iron across its regolith. Contains fossil river valleys, sedimentary mudstones, and subsurface permafrost ice.',
    keyFeatures: ['Olympus Mons (volcano 22 km high)', 'Valles Marineris (canyon system 4,000 km long)', 'Subsurface polar water ice sheets'],
    tags: ['Red Planet', 'Exploration Target', 'Fossil Rivers']
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    order: 5,
    type: 'Gas Giant',
    diameter: '139,820 km (11 × Earth)',
    mass: '1.898 × 10²⁷ kg (318 × Earth)',
    surfaceTemp: '-110°C (Cloud tops)',
    distanceFromSun: '5.20 AU (778.5 million km)',
    orbitalPeriod: '11.86 Earth years',
    rotationPeriod: '9 hours, 55 minutes (Fastest spinning planet)',
    moons: '95 (Io, Europa, Ganymede, Callisto foremost)',
    atmosphere: '89.8% Hydrogen, 10.2% Helium, traces of Methane, Ammonia',
    notToScaleNotice: 'Gas giant dimensions adapted for 3D simulation.',
    overview: 'The planetary titan of our system. Its massive gravitational well acts as a gravitational broom, redirecting or capturing dangerous long-period comets from inner worlds.',
    keyFeatures: ['Great Red Spot anticyclone raging 300+ yrs', 'Europa moon harboring deep subsurface ocean', 'Metallic liquid hydrogen interior generating immense magnetosphere'],
    tags: ['Gas Giant', 'Great Red Spot', 'Gravitational Shield']
  },
  {
    id: 'saturn',
    name: 'Saturn',
    order: 6,
    type: 'Gas Giant / Ringed Wonder',
    diameter: '116,460 km (9.5 × Earth)',
    mass: '5.68 × 10²⁶ kg (95 × Earth)',
    surfaceTemp: '-140°C',
    distanceFromSun: '9.58 AU (1.43 billion km)',
    orbitalPeriod: '29.45 Earth years',
    rotationPeriod: '10 hours, 33 minutes',
    moons: '146 (Titan and Enceladus foremost)',
    atmosphere: '96.3% Hydrogen, 3.25% Helium, traces of Methane',
    notToScaleNotice: 'Ring widths and planetary separation rendered for educational clarity.',
    overview: 'Celebrated for its dazzling ring system spanning 282,000 km yet only 10 meters thick in places, composed of billions of water ice boulders and rock fragments.',
    keyFeatures: ['Complex ringlet structure A, B, C, D, F, E', 'Titan moon with thick nitrogen atmosphere and methane lakes', 'Enceladus water geysers erupting into space'],
    tags: ['Rings', 'Titan', 'Enceladus']
  },
  {
    id: 'uranus',
    name: 'Uranus',
    order: 7,
    type: 'Ice Giant',
    diameter: '50,724 km (4 × Earth)',
    mass: '8.68 × 10²⁵ kg (14.5 × Earth)',
    surfaceTemp: '-195°C to -224°C (Coldest atmosphere recorded)',
    distanceFromSun: '19.2 AU (2.87 billion km)',
    orbitalPeriod: '84.0 Earth years',
    rotationPeriod: '17 hours, 14 minutes (Retrograde, 97.77° axial tilt)',
    moons: '28 (Titania, Oberon, Miranda, Ariel)',
    atmosphere: '82.5% Hydrogen, 15.2% Helium, 2.3% Methane (absorbs red light, appears cyan)',
    notToScaleNotice: 'Not to scale for interactive accessibility.',
    overview: 'An ice giant rolling on its side around the Sun due to a cataclysmic collision billions of years ago. Exhibits extreme 42-year long seasonal daylight and night cycles.',
    keyFeatures: ['98-degree sideways axial tilt', '13 faint ring systems', 'Supersonic methane-ammonia convective mantle'],
    tags: ['Ice Giant', 'Sideways Tilt', 'Coldest Atmosphere']
  },
  {
    id: 'neptune',
    name: 'Neptune',
    order: 8,
    type: 'Ice Giant / Deep Blue World',
    diameter: '49,244 km (3.88 × Earth)',
    mass: '1.02 × 10²⁶ kg (17.1 × Earth)',
    surfaceTemp: '-201°C',
    distanceFromSun: '30.1 AU (4.50 billion km)',
    orbitalPeriod: '164.8 Earth years',
    rotationPeriod: '16 hours, 6 minutes',
    moons: '16 (Triton with retrograde orbit)',
    atmosphere: '80% Hydrogen, 19% Helium, 1.5% Methane',
    notToScaleNotice: 'Scale adapted for visual inspection.',
    overview: 'The outermost major planet, located through mathematical calculations by Urbain Le Verrier before it was visually confirmed by telescope. Lashed by supersonic winds of 2,100 km/h.',
    keyFeatures: ['Supersonic winds reaching 2,100 km/h', 'Retrograde moon Triton (likely captured Kuiper Belt object)', 'Great Dark Spot cyclonic systems'],
    tags: ['Outer Boundary', 'Supersonic Winds', 'Math Discovery']
  }
];

export const cosmosUniverseDeepSpace = [
  {
    id: 'stellar-evolution',
    title: 'Stellar Evolution & Star Life Cycles',
    category: 'Stars & Nebulae',
    readTime: '8 min',
    summary: 'From stellar nurseries (H II regions) to main-sequence hydrogen fusion, red giants, planetary nebulae, white dwarfs, and supernovae.',
    content: `Stars are cosmic thermonuclear reactors that forge all elements heavier than lithium through nucleosynthesis.

Life Cycle Stages:
1. Protostar & Nebula: Gravitational collapse of cold interstellar gas clouds (mostly H₂ and He).
2. Main Sequence: Stable hydrostatic equilibrium balance between outward thermal radiation pressure and inward gravity (e.g. our Sun for ~10 billion years).
3. Red Giant Phase: Core runs out of hydrogen, core contracts while outer envelope expands dramatically.
4. Low/Medium Mass End State: Star sheds outer layers into a glowing Planetary Nebula, leaving an ultra-dense carbon-oxygen White Dwarf supported by electron degeneracy.
5. High Mass End State (> 8 M☉): Core collapses when iron fusion consumes energy rather than releasing it, triggering a catastrophic Type II Supernova and forming a Neutron Star or Black Hole.`,
    tags: ['Nebulae', 'Nucleosynthesis', 'Supernova']
  },
  {
    id: 'galaxies-types',
    title: 'Galaxies, Hubble Classification & The Milky Way',
    category: 'Galactic Astronomy',
    readTime: '9 min',
    summary: 'Explore spiral, barred spiral, elliptical, and irregular galaxies, the Local Group, and our supermassive black hole Sagittarius A*.',
    content: `Galaxies are gravitationally bound cosmic systems containing billions of stars, interstellar gas, cosmic dust, and dark matter halos.

Edwin Hubble\'s "Tuning Fork" Classification:
• Ellipticals (E0 to E7): Smooth, featureless, spheroidal collections of older population II stars with little active star formation.
• Spirals (Sa, Sb, Sc): Flattened rotating disks with central bulges and winding spiral arms dense with gas, dust, and new star formation.
• Barred Spirals (SBa, SBb, SBc): Spirals with prominent linear stellar bars crossing their central nuclei. (The Milky Way is an SBbc barred spiral ~100,000 light-years wide).
• Irregulars (Irr): Lacking rotational symmetry or bulges (often warped by gravitational tidal interactions, e.g. Magellanic Clouds).

Our Home: The Milky Way contains an estimated 100 to 400 billion stars. At its gravitational center sits Sagittarius A*, a supermassive black hole with 4.15 million times the mass of the Sun.`,
    tags: ['Milky Way', 'Hubble Sequence', 'Sagittarius A*']
  },
  {
    id: 'black-holes',
    title: 'Black Holes, Event Horizons & Relativistic Spacetime',
    category: 'Relativistic Astrophysics',
    readTime: '10 min',
    summary: 'Einstein\'s General Relativity, Schwarzschild radius, event horizons, accretion disks, Hawking radiation, and gravitational waves.',
    content: `A Black Hole is a region of spacetime where gravitational acceleration is so intense that nothing—not even electromagnetic radiation (light)—can escape its boundary.

Core Anatomical Structures:
1. Event Horizon: The mathematical boundary of no return. The radius for a non-rotating black hole is given by the Schwarzschild formula: R = 2GM / c².
2. Singularity: The theoretical infinitely dense point at the center where classical general relativity breaks down and quantum gravity is required.
3. Accretion Disk: A superheated disk of infalling gas and plasma rotating at relativistic fractions of light speed, releasing intense X-rays.
4. Ergosphere: The region outside a rotating (Kerr) black hole where spacetime is dragged along with its spin (frame-dragging).

Observational Breakthroughs:
• 2015: LIGO directly detected gravitational wave ripples from merging stellar-mass black holes (GW150914).
• 2019: Event Horizon Telescope (EHT) captured the first direct radio silhouette of the supermassive black hole in M87*.
• 2022: Direct imaging of Sagittarius A* at the center of the Milky Way.`,
    tags: ['General Relativity', 'Event Horizon', 'LIGO']
  },
  {
    id: 'cosmology-bigbang',
    title: 'Cosmology, The Big Bang & The Expanding Universe',
    category: 'Cosmology & Dark Universe',
    readTime: '11 min',
    summary: 'Cosmic Microwave Background (CMB), cosmic inflation, Hubble-Lemaître expansion, Dark Matter (27%), and Dark Energy (68%).',
    content: `Physical cosmology models the origin, large-scale evolution, and ultimate fate of the universe.

The Standard Lambda-CDM Cosmological Model:
1. The Big Bang (~13.787 billion years ago): The universe expanded from an extremely hot, dense initial singularity through rapid cosmic inflation.
2. Cosmic Microwave Background (CMB): Discovered by Penzias & Wilson (1965), this relic thermal radiation cooled to 2.725 Kelvin is the oldest electromagnetic signal in the universe, emitted 380,000 years after the Big Bang at recombination.
3. The Accelerating Expansion: In 1998, observations of distant Type Ia supernovae proved that cosmic expansion is not slowing under gravity, but accelerating.

The Universal Energy Budget:
• Baryonic (Ordinary) Matter: ~4.9% (all atoms, stars, planets, and gas).
• Dark Matter: ~26.8% (non-luminous matter detected by gravitational lensing and galaxy rotation curves).
• Dark Energy: ~68.3% (hypothetical vacuum energy density driving accelerated expansion, represented by cosmological constant Λ).`,
    tags: ['Big Bang', 'CMB', 'Dark Energy']
  }
];

export const cosmosSpaceMissions = [
  {
    id: 'jwst',
    name: 'James Webb Space Telescope (JWST)',
    agency: 'NASA / ESA / CSA',
    launchDate: 'December 25, 2021',
    status: 'Active (Operational at Sun-Earth L2)',
    destination: 'Lagrange Point 2 (1.5M km from Earth)',
    objective: 'Observe the earliest stars and galaxies formed after the Big Bang, study planetary formation, and analyze exoplanet atmospheric compositions in the infrared.',
    notableAchievement: 'Captured deep-field infrared imagery of galaxies formed merely 300 million years after the Big Bang and detected carbon-bearing molecules on exoplanet K2-18b.',
    officialSource: 'https://webb.nasa.gov/'
  },
  {
    id: 'perseverance',
    name: 'Perseverance Rover & Ingenuity Helicopter',
    agency: 'NASA JPL',
    launchDate: 'July 30, 2020 (Landed Feb 18, 2021)',
    status: 'Active (Exploring Jezero Crater)',
    destination: 'Mars (Jezero Crater Paleolake)',
    objective: 'Seek signs of ancient microbial habitability, gather hermetically sealed rock cores for future sample return, and demonstrate powered atmospheric flight.',
    notableAchievement: 'Ingenuity completed 72 powered flights in Mars\'s thin 1% atmosphere; collected geological drill cores from an ancient delta riverbed.',
    officialSource: 'https://mars.nasa.gov/mars2020/'
  },
  {
    id: 'artemis',
    name: 'Artemis Program',
    agency: 'NASA & International Partners',
    launchDate: 'Artemis I: Nov 16, 2022 (Uncrewed)',
    status: 'Active Development (Crewed Lunar Missions)',
    destination: 'The Moon (South Pole) & Lunar Gateway',
    objective: 'Return humanity to the Moon sustainably, construct the Gateway orbital station, explore water ice in permanently shadowed polar craters, and prepare for human missions to Mars.',
    notableAchievement: 'Artemis I demonstrated Orion spacecraft reentry from lunar velocity and verified Space Launch System (SLS) heavy-lift performance.',
    officialSource: 'https://www.nasa.gov/specials/artemis/'
  },
  {
    id: 'voyager',
    name: 'Voyager 1 & Voyager 2',
    agency: 'NASA JPL',
    launchDate: 'August / September 1977',
    status: 'Operational in Interstellar Space',
    destination: 'Interstellar Medium (Beyond Heliopause)',
    objective: 'Grand Tour exploration of the outer gas giants (Jupiter, Saturn, Uranus, Neptune) and in-situ analysis of the boundary between the solar wind and interstellar medium.',
    notableAchievement: 'Farthest human-made objects from Earth (Voyager 1 is >24 billion km away). First craft to cross the Heliopause and transmit data from interstellar space.',
    officialSource: 'https://voyager.jpl.nasa.gov/'
  },
  {
    id: 'hubble',
    name: 'Hubble Space Telescope (HST)',
    agency: 'NASA / ESA',
    launchDate: 'April 24, 1990',
    status: 'Active in Low Earth Orbit (540 km)',
    destination: 'Low Earth Orbit (LEO)',
    objective: 'Provide unprecedented optical, ultraviolet, and near-infrared astronomical imagery free from atmospheric distortion and turbulence.',
    notableAchievement: 'Over 1.5 million observations; enabled the precise determination of the Hubble Constant, verified supermassive black holes, and produced iconic Deep Field images.',
    officialSource: 'https://hubblesite.org/'
  }
];

export const cosmosLearnPaths = [
  {
    id: 'lp-astro-intro',
    title: 'Astrophysics 101: Orbital Mechanics & Planetary Motion',
    level: 'Undergraduate Intro',
    duration: '4 Lessons • 35 min',
    lessons: [
      'Kepler’s First Law: Elliptical Trajectories & Eccentricity',
      'Kepler’s Second Law: Conservation of Angular Momentum & Equal Area Velocity',
      'Kepler’s Third Law: Harmonic Proportionality P² = a³',
      'Newton’s Gravitational Generalization & Escape Velocity Formulations'
    ]
  },
  {
    id: 'lp-stars-blackholes',
    title: 'Stellar Nucleosynthesis & Compact Degenerate Objects',
    level: 'Advanced / College',
    duration: '5 Lessons • 45 min',
    lessons: [
      'Thermonuclear Proton-Proton Chains & CNO Cycles in Stellar Cores',
      'Hydrostatic Balance: Radiation Pressure vs Gravitational Infall',
      'The Chandrasekhar Mass Limit (1.44 M☉) & White Dwarf Physics',
      'Neutron Degeneracy & Pulsar Magnetospheres',
      'General Relativity: Schwarzschild Geometry & Event Horizons'
    ]
  }
];
