// Comprehensive academic quiz question bank covering all 11 subjects
// Contains 5+ verified undergraduate and higher-secondary level questions per subject
// Each item includes difficulty tier, clear options, correct index, and academic explanation

export const expandedQuizBank = {
  psychology: [
    {
      id: 'psy-q1',
      difficulty: 'Undergraduate',
      questionEn: 'Which stage of Piagetian cognitive development introduces abstract propositional hypotheses and scientific deduction?',
      options: ['Sensorimotor Stage', 'Preoperational Stage', 'Concrete Operational Stage', 'Formal Operational Stage'],
      correct: 3,
      explanation: 'The Formal Operational stage (approx. 12+ years) enables adolescents to think abstractly, reason hypothetically, and systematically test scientific deductions.'
    },
    {
      id: 'psy-q2',
      difficulty: 'Undergraduate',
      questionEn: 'In Alan Baddeley and Graham Hitch’s Working Memory Model, which component directs attention and coordinates the slave subsystems?',
      options: ['Phonological Loop', 'Central Executive', 'Visuo-Spatial Sketchpad', 'Episodic Buffer'],
      correct: 1,
      explanation: 'The Central Executive acts as the supervisory attentional system, delegating cognitive processing to the phonological loop, visuo-spatial sketchpad, and episodic buffer.'
    },
    {
      id: 'psy-q3',
      difficulty: 'Higher Secondary',
      questionEn: 'Which psychological phenomenon describes the tendency for people to recall the first and last items in a sequence better than the middle ones?',
      options: ['Serial Position Effect', 'Retroactive Interference', 'Encoding Specificity', 'Cognitive Dissonance'],
      correct: 0,
      explanation: 'The Serial Position Effect consists of the Primacy effect (better recall of first items due to LTM transfer) and Recency effect (recall of final items still active in working memory).'
    },
    {
      id: 'psy-q4',
      difficulty: 'Undergraduate',
      questionEn: 'In classical conditioning experiments by Ivan Pavlov, what role did the sound of the metronome/bell serve after repeated pairings with food powder?',
      options: ['Unconditioned Stimulus (UCS)', 'Conditioned Stimulus (CS)', 'Unconditioned Response (UCR)', 'Conditioned Response (CR)'],
      correct: 1,
      explanation: 'The initially neutral stimulus becomes the Conditioned Stimulus (CS) once it reliably triggers salivation (the Conditioned Response).'
    },
    {
      id: 'psy-q5',
      difficulty: 'Undergraduate',
      questionEn: 'Which brain structure is critically required for the consolidation of new explicit (declarative) memories into long-term storage?',
      options: ['Cerebellum', 'Hippocampus', 'Basal Ganglia', 'Occipital Lobe'],
      correct: 1,
      explanation: 'The Hippocampus (in the medial temporal lobe) is essential for memory consolidation. The famous patient H.M. lost the ability to form new declarative memories following bilateral hippocampal resection.'
    },
    {
      id: 'psy-q6',
      difficulty: 'Higher Secondary',
      questionEn: 'Lev Vygotsky introduced the concept of the "Zone of Proximal Development" (ZPD) to identify:',
      options: [
        'Biological brain maturation speed during early childhood',
        'The distance between what a learner can do independently versus with skilled guidance',
        'The maximum number of items retrievable from short-term memory',
        'Physical reflexes developed in the sensorimotor epoch'
      ],
      correct: 1,
      explanation: 'Vygotsky’s ZPD represents the fertile learning zone where instructional scaffolding and collaboration allow a student to master tasks beyond their unassisted capacity.'
    }
  ],

  mathematics: [
    {
      id: 'math-q1',
      difficulty: 'Undergraduate',
      questionEn: 'What is the derivative of f(x) = x³ - 5x² + 4x with respect to x?',
      options: ['3x² - 10x + 4', 'x² - 5x + 4', '3x³ - 10x² + 4', '6x - 10'],
      correct: 0,
      explanation: 'Applying the Power Rule d/dx(x^n) = n*x^(n-1) to each term yields: 3x² - 10x + 4.'
    },
    {
      id: 'math-q2',
      difficulty: 'Undergraduate',
      questionEn: 'Evaluate the definite integral ∫ from 0 to 2 of (3x²) dx.',
      options: ['6', '8', '12', '16'],
      correct: 1,
      explanation: 'The antiderivative of 3x² is x³. Evaluating from 0 to 2: [2³ - 0³] = 8 - 0 = 8.'
    },
    {
      id: 'math-q3',
      difficulty: 'Higher Secondary',
      questionEn: 'What is the limit of (sin x) / x as x approaches 0?',
      options: ['0', 'Undefined', '1', 'Infinity'],
      correct: 2,
      explanation: 'lim (x -> 0) [sin(x)/x] = 1 is a fundamental trigonometric limit, demonstrable geometrically via the Squeeze (Sandwich) Theorem or L\'Hôpital\'s Rule.'
    },
    {
      id: 'math-q4',
      difficulty: 'Undergraduate',
      questionEn: 'For an invertible square matrix A, what is the product of A and its inverse A⁻¹?',
      options: ['Zero Matrix (O)', 'Identity Matrix (I)', 'Determinant det(A)', 'Transpose Matrix Aᵀ'],
      correct: 1,
      explanation: 'By algebraic definition, multiplying any non-singular square matrix by its inverse results in the Identity Matrix I.'
    },
    {
      id: 'math-q5',
      difficulty: 'Undergraduate',
      questionEn: 'In multivariate calculus, what does the gradient vector ∇f(x, y) geometrically represent?',
      options: [
        'The contour line where the function values are constant',
        'The direction of maximum instantaneous rate of increase of the scalar function',
        'The total surface area under the curve',
        'The curvature of the inflection asymptote'
      ],
      correct: 1,
      explanation: 'The gradient vector ∇f points in the direction of steepest ascent (greatest rate of increase), and its magnitude equals this maximum rate of change.'
    },
    {
      id: 'math-q6',
      difficulty: 'Higher Secondary',
      questionEn: 'What are the roots of the quadratic equation x² - 7x + 12 = 0?',
      options: ['x = 2 and x = 6', 'x = 3 and x = 4', 'x = -3 and x = -4', 'x = 1 and x = 12'],
      correct: 1,
      explanation: 'Factoring gives (x - 3)(x - 4) = 0, yielding roots x = 3 and x = 4.'
    }
  ],

  'english-grammar': [
    {
      id: 'eng-q1',
      difficulty: 'Higher Secondary',
      questionEn: 'Select the sentence that correctly utilizes the Third Conditional for an unreal past situation:',
      options: [
        'If it will rain tomorrow, we stay indoors.',
        'If he had studied the laboratory protocol, he would not have contaminated the sample.',
        'If I am the president, I will change the regulation.',
        'If they reached on time, they catch the train.'
      ],
      correct: 1,
      explanation: 'The Third Conditional requires "If + past perfect" in the condition clause and "would have + past participle" in the result clause.'
    },
    {
      id: 'eng-q2',
      difficulty: 'Undergraduate',
      questionEn: 'Identify the subjunctive mood in the following sentences:',
      options: [
        'The committee recommended that the candidate submit an updated curriculum vitae.',
        'The professor is lecturing about linguistic morphology.',
        'She submitted her paper yesterday afternoon.',
        'Did you verify the statistical significance of the p-value?'
      ],
      correct: 0,
      explanation: 'The mandative subjunctive uses the base verb form ("submit" rather than "submits") following verbs of recommendation, demand, or necessity.'
    },
    {
      id: 'eng-q3',
      difficulty: 'Higher Secondary',
      questionEn: 'Which figure of speech is present in: "The resilient old oak groaned beneath the weight of the howling winter gale"?',
      options: ['Metaphor', 'Personification', 'Synecdoche', 'Hyperbole'],
      correct: 1,
      explanation: 'Personification attributes human actions and emotions ("groaned", "howling") to inanimate or non-human entities.'
    },
    {
      id: 'eng-q4',
      difficulty: 'Undergraduate',
      questionEn: 'What is a "dangling modifier" in syntax?',
      options: [
        'A preposition placed at the very conclusion of a relative interrogative clause',
        'A grammatical error where a modifying descriptive phrase lacks a logical subject to attach to',
        'An auxiliary verb placed between a split infinitive',
        'An intransitive verb following an indirect object'
      ],
      correct: 1,
      explanation: 'A dangling modifier occurs when the intended subject of an introductory verbal phrase is omitted or placed improperly (e.g., "Walking into the room, the smoke was smelled").'
    },
    {
      id: 'eng-q5',
      difficulty: 'Undergraduate',
      questionEn: 'Which word functions as an antonym to "EPHEMERAL" in academic discourse?',
      options: ['Transient', 'Fleeting', 'Perpetual', 'Evancescent'],
      correct: 2,
      explanation: '"Ephemeral" means short-lived or transitory; its antonym is "Perpetual" (everlasting or eternal).'
    }
  ],

  urdu: [
    {
      id: 'urd-q1',
      difficulty: 'Higher Secondary',
      questionEn: 'What is the first couplet of an Urdu Ghazal called where both lines (misras) share identical rhyme and refrain?',
      questionUrdu: 'غزل کے اس پہلے شعر کو کیا کہتے ہیں جس کے دونوں مصرعے ہم قافیہ و ہم ردیف ہوں؟',
      options: ['Maqta (مقطع)', 'Matla (مطلع)', 'Husn-e-Matla (حسنِ مطلع)', 'Bait-ul-Ghazal (بیت الغزل)'],
      correct: 1,
      explanation: 'The opening couplet of a ghazal is named the Matla (مطلع). If the second couplet also rhymes identically, it is called Husn-e-Matla.'
    },
    {
      id: 'urd-q2',
      difficulty: 'Undergraduate',
      questionEn: 'What poetic device consists of the exact repeated word or phrase that concludes every couplet of a Ghazal?',
      questionUrdu: 'غزل کے ہر شعر کے آخر میں من و عن دہرائے جانے والے مستقل الفاظ کو کیا کہا جاتا ہے؟',
      options: ['Qafia (قافیہ)', 'Radeef (ردیف)', 'Tazad (تضاد)', 'Iham (ایہام)'],
      correct: 1,
      explanation: 'Radeef (ردیف) consists of the invariable words repeated throughout the ghazal following the rhyming Qafia.'
    },
    {
      id: 'urd-q3',
      difficulty: 'Higher Secondary',
      questionEn: 'In Urdu literary criticism, who is widely honored as the "Khuda-e-Sukhan" (Master of Poetic Craft)?',
      questionUrdu: 'اردو شاعری کی تاریخ میں کس عظیم شاعر کو "خدائے سخن" کا خطاب دیا گیا ہے؟',
      options: ['Mirza Asadullah Khan Ghalib', 'Mir Taqi Mir', 'Allama Muhammad Iqbal', 'Khwaja Mir Dard'],
      correct: 1,
      explanation: 'Mir Taqi Mir (میر تقی میر) is universally acknowledged as "Khuda-e-Sukhan" for his emotional depth, simplicity, and melodic mastery.'
    },
    {
      id: 'urd-q4',
      difficulty: 'Undergraduate',
      questionEn: 'Which seminal work by Altaf Hussain Hali is considered the foundational manifesto of modern Urdu literary criticism?',
      questionUrdu: 'اردو تنقید نگاری کی پہلی باقاعدہ اور باضابطہ کتاب کون سی تسلیم کی جاتی ہے؟',
      options: ['Aab-e-Hayat (آبِ حیات)', 'Muqaddama-e-Sher-o-Shaeri (مقدمۂ شعر و شاعری)', 'Shibli\'s Sher-ul-Ajam', 'Yadgar-e-Ghalib'],
      correct: 1,
      explanation: 'Maulana Altaf Hussain Hali’s "Muqaddama-e-Sher-o-Shaeri" (1893) established natural poetry, morality, and structured criticism in Urdu.'
    },
    {
      id: 'urd-q5',
      difficulty: 'Undergraduate',
      questionEn: 'What is the grammatical term for words that sound alike and have identical spelling but differ in meaning in Urdu poetry?',
      questionUrdu: 'علمِ بدیع میں اس صفت کو کیا کہتے ہیں جس میں دو الفاظ تلفظ اور املا میں یکساں لیکن معنوی اعتبار سے مختلف ہوں؟',
      options: ['San\'at-e-Tajnees (صنعتِ تجنیس)', 'San\'at-e-Tazad (صنعتِ تضاد)', 'Mora\'at-un-Nazeer (مراعاۃ النظیر)', 'Talmeeh (تلمیح)'],
      correct: 0,
      explanation: 'San\'at-e-Tajnees (صنعتِ تجنیس) refers to wordplay where homonyms are used with divergent contextual meanings.'
    }
  ],

  economics: [
    {
      id: 'econ-q1',
      difficulty: 'Undergraduate',
      questionEn: 'If a 10% increase in the price of a commodity leads to a 25% decrease in the quantity demanded, the price elasticity of demand (|PED|) is:',
      options: ['0.4 (Inelastic)', '1.0 (Unitary)', '2.5 (Elastic)', '25.0 (Perfect)'],
      correct: 2,
      explanation: '|PED| = (% change in Q) / (% change in P) = 25% / 10% = 2.5. Because |PED| > 1, the good is price elastic.'
    },
    {
      id: 'econ-q2',
      difficulty: 'Undergraduate',
      questionEn: 'Which market structure is characterized by a single seller, unique products without close substitutes, and formidable barriers to entry?',
      options: ['Monopolistic Competition', 'Oligopoly', 'Perfect Competition', 'Monopoly'],
      correct: 3,
      explanation: 'A Monopoly is defined by a singular producer controlling total market supply due to high legal, technological, or geographic barriers to entry.'
    },
    {
      id: 'econ-q3',
      difficulty: 'Higher Secondary',
      questionEn: 'What macroeconomic term describes a simultaneous occurrence of stagnant economic growth, high unemployment, and acute inflation?',
      options: ['Deflation', 'Hyperinflation', 'Stagflation', 'Liquidity Trap'],
      correct: 2,
      explanation: 'Stagflation occurs when an economy experiences slow economic growth alongside elevated inflation and joblessness, defying typical Phillips Curve assumptions.'
    },
    {
      id: 'econ-q4',
      difficulty: 'Undergraduate',
      questionEn: 'According to the Keynesian macroeconomic perspective, what is the primary determinant of consumption spending in the short run?',
      options: ['The nominal interest rate set by central banks', 'Current disposable income', 'Long-term equity portfolio valuation', 'Expected inflation rate in 5 years'],
      correct: 1,
      explanation: 'John Maynard Keynes proposed that current disposable income is the primary driver of consumption expenditure (C = c0 + c1 * Yd).'
    },
    {
      id: 'econ-q5',
      difficulty: 'Undergraduate',
      questionEn: 'What does the Gini Coefficient measure when assessing a national economy?',
      options: ['Annual economic growth rate', 'Income and wealth distribution inequality', 'Foreign exchange reserve stability', 'Gross industrial carbon output'],
      correct: 1,
      explanation: 'The Gini coefficient measures economic dispersion and income inequality on a scale from 0 (perfect equality) to 1 (maximal inequality).'
    }
  ],

  'literature-novels': [
    {
      id: 'lit-q1',
      difficulty: 'Undergraduate',
      questionEn: 'In classical Aristotlean poetics and dramatic tragedy, the fatal flaw or internal judgment error of the tragic protagonist is known as:',
      options: ['Catharsis', 'Hamartia', 'Peripeteia', 'Anagnorisis'],
      correct: 1,
      explanation: 'Hamartia refers to the tragic flaw or moral shortcoming (such as hubris or excessive pride) that leads inexorably to the protagonist’s downfall.'
    },
    {
      id: 'lit-q2',
      difficulty: 'Undergraduate',
      questionEn: 'In George Orwell’s dystopian novel "1984", what is the term for the linguistic engineering utilized by the Party to restrict freedom of thought?',
      options: ['Doublespeak', 'Newspeak', 'Oldspeak', 'Ingsoc dialect'],
      correct: 1,
      explanation: 'Newspeak was designed to diminish the range of thought by eliminating undesirable words and narrowing definitions until dissent became conceptually impossible.'
    },
    {
      id: 'lit-q3',
      difficulty: 'Undergraduate',
      questionEn: 'Mary Shelley’s classic gothic novel "Frankenstein" carries which instructive subtitle referring to classical mythology?',
      options: ['The Faustian Bargain', 'The Modern Prometheus', 'The Alchemist’s Penance', 'The Creature of Geneva'],
      correct: 1,
      explanation: '"Frankenstein; or, The Modern Prometheus" links Victor Frankenstein’s transgression against nature to Prometheus stealing fire from the Olympian gods.'
    },
    {
      id: 'lit-q4',
      difficulty: 'Higher Secondary',
      questionEn: 'What narrative perspective is employed when the narrator knows the inner thoughts, motives, and emotions of all characters across the story?',
      options: ['First-person participant', 'Third-person limited', 'Third-person omniscient', 'Second-person dramatic'],
      correct: 2,
      explanation: 'A third-person omniscient narrator possesses an all-knowing perspective with comprehensive insight into every character\'s consciousness.'
    },
    {
      id: 'lit-q5',
      difficulty: 'Undergraduate',
      questionEn: 'In literary analysis, what is "Verisimilitude"?',
      options: [
        'The appearance or semblance of truth and plausibility within a fictional narrative',
        'The rhythmic meter in heroic rhymed couplets',
        'An abrupt plot twist at the climax of a gothic narrative',
        'A poem composed specifically for elegy or mourning'
      ],
      correct: 0,
      explanation: 'Verisimilitude is the quality of realism or believability that allows readers to willingly suspend disbelief within a work of literature.'
    }
  ],

  'computer-science': [
    {
      id: 'cs-q1',
      difficulty: 'Undergraduate',
      questionEn: 'What is the tightest worst-case time complexity of the Binary Search algorithm on a sorted array of n elements?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correct: 1,
      explanation: 'Binary Search continually divides the remaining search space in half, resulting in logarithmic O(log n) time complexity.'
    },
    {
      id: 'cs-q2',
      difficulty: 'Undergraduate',
      questionEn: 'Which data structure operates on a strict Last-In, First-Out (LIFO) operational discipline?',
      options: ['Queue', 'Circular Buffer', 'Stack', 'Doubly Linked List'],
      correct: 2,
      explanation: 'A Stack is a LIFO data structure where insertions (push) and deletions (pop) occur exclusively at the top.'
    },
    {
      id: 'cs-q3',
      difficulty: 'Undergraduate',
      questionEn: 'In relational database theory, what does the "A" represent in the ACID transactional guarantees?',
      options: ['Asynchrony', 'Atomicity', 'Authentication', 'Availability'],
      correct: 1,
      explanation: 'Atomicity ensures that all operations within a database transaction either execute to complete success or are entirely rolled back.'
    },
    {
      id: 'cs-q4',
      difficulty: 'Higher Secondary',
      questionEn: 'What is the average-case time complexity of Merge Sort on an array of length n?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
      correct: 1,
      explanation: 'Merge Sort divides the array into halves (log n depth) and merges them in linear time O(n), achieving guaranteed O(n log n) performance across all cases.'
    },
    {
      id: 'cs-q5',
      difficulty: 'Undergraduate',
      questionEn: 'Which memory component in modern computer architecture offers the fastest access latency for CPU instructions?',
      options: ['L1 CPU Cache Registers', 'Main Memory (DDR5 RAM)', 'PCIe NVMe Solid State Drive', 'Virtual Paging Disk'],
      correct: 0,
      explanation: 'L1 CPU cache and processor registers are integrated directly onto the silicon core and operate at sub-nanosecond cycle speeds.'
    },
    {
      id: 'cs-q6',
      difficulty: 'Undergraduate',
      questionEn: 'In Object-Oriented Programming, which paradigm allows a derived class to provide a specific implementation of a method already declared in its superclass?',
      options: ['Encapsulation', 'Polymorphism (Method Overriding)', 'Multiple Inheritance', 'Data Abstraction'],
      correct: 1,
      explanation: 'Method overriding is a fundamental pillar of runtime polymorphism, enabling uniform interfaces to invoke specialized subclass behavior.'
    }
  ],

  history: [
    {
      id: 'hist-q1',
      difficulty: 'Undergraduate',
      questionEn: 'Which two major urban archaeological complexes serve as the primary archaeological hallmarks of the ancient Indus Valley Civilization?',
      options: ['Mohenjo-Daro & Harappa', 'Taxila & Gandhara', 'Persepolis & Susa', 'Nineveh & Babylon'],
      correct: 0,
      explanation: 'Mohenjo-Daro and Harappa are the two foremost metropolis sites excavated, demonstrating standardized brick architecture, urban drainage, and civic granaries.'
    },
    {
      id: 'hist-q2',
      difficulty: 'Higher Secondary',
      questionEn: 'In what year was the historic Lahore Resolution (Qarardad-e-Lahore) passed by the All-India Muslim League?',
      options: ['1930', '1935', '1940', '1946'],
      correct: 2,
      explanation: 'The Lahore Resolution was adopted on March 23, 1940, at Minto Park (now Iqbal Park), demanding autonomous sovereign Muslim states in northwestern and eastern zones.'
    },
    {
      id: 'hist-q3',
      difficulty: 'Undergraduate',
      questionEn: 'Which Mughal Emperor consolidated imperial bureaucracy, introduced the Mansabdari administrative system, and promulgated the syncretic Din-i Ilahi?',
      options: ['Zahir-ud-din Babur', 'Jalal-ud-din Akbar', 'Shah Jahan', 'Aurangzeb Alamgir'],
      correct: 1,
      explanation: 'Emperor Akbar (1556–1605) instituted the Mansabdari administrative framework, reformed revenue assessment (Zabt system), and fostered interfaith dialogues.'
    },
    {
      id: 'hist-q4',
      difficulty: 'Undergraduate',
      questionEn: 'The Treaty of Versailles, which formally concluded World War I with Germany, was signed in which year?',
      options: ['1917', '1918', '1919', '1923'],
      correct: 2,
      explanation: 'The Treaty of Versailles was executed on June 28, 1919, establishing the League of Nations and imposing war guilt and reparations on Germany.'
    },
    {
      id: 'hist-q5',
      difficulty: 'Higher Secondary',
      questionEn: 'Who served as the first Governor-General of independent Pakistan in August 1947?',
      options: ['Liaquat Ali Khan', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Khawaja Nazimuddin', 'Chaudhry Muhammad Ali'],
      correct: 1,
      explanation: 'Quaid-e-Azam Muhammad Ali Jinnah took the oath of office as Pakistan\'s founding Governor-General on August 15, 1947.'
    }
  ],

  geography: [
    {
      id: 'geo-q1',
      difficulty: 'Undergraduate',
      questionEn: 'The monumental Himalayan mountain ranges were formed primarily by the ongoing tectonic collision between which two tectonic plates?',
      options: ['Indian Plate and Eurasian Plate', 'Pacific Plate and Nazca Plate', 'African Plate and Arabian Plate', 'Antarctic Plate and Australian Plate'],
      correct: 0,
      explanation: 'The northward convergent collision of the continental Indian Plate with the Eurasian Plate began ~50 million years ago and continues to uplift the Himalayas today.'
    },
    {
      id: 'geo-q2',
      difficulty: 'Higher Secondary',
      questionEn: 'Which atmospheric layer contains the maximum concentration of ozone gas that absorbs damaging solar ultraviolet (UV-B) radiation?',
      options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'],
      correct: 1,
      explanation: 'The ozone layer resides primarily within the Stratosphere, approximately 15 to 35 kilometers above Earth’s surface.'
    },
    {
      id: 'geo-q3',
      difficulty: 'Higher Secondary',
      questionEn: 'What is the name of the imaginary line of latitude at 0 degrees that divides the Earth into Northern and Southern Hemispheres?',
      options: ['Prime Meridian', 'Tropic of Cancer', 'Equator', 'Tropic of Capricorn'],
      correct: 2,
      explanation: 'The Equator is the 0° latitude parallel dividing Earth into the Northern and Southern Hemispheres.'
    },
    {
      id: 'geo-q4',
      difficulty: 'Undergraduate',
      questionEn: 'Which river constitutes the agricultural lifeline of Pakistan, originating in the Tibetan Plateau near Lake Mansarovar?',
      options: ['Chenab River', 'Jhelum River', 'Indus River', 'Ravi River'],
      correct: 2,
      explanation: 'The Indus River (Sindhu) is Pakistan\'s longest and most vital river, feeding the extensive Indus Basin Irrigation System (IBIS).'
    },
    {
      id: 'geo-q5',
      difficulty: 'Undergraduate',
      questionEn: 'In physical climatology, the "Coriolis Effect" causes moving air masses in the Northern Hemisphere to deflect in which direction?',
      options: ['Directly Southward', 'To the Right (Clockwise)', 'To the Left (Counter-clockwise)', 'Vertically into the Exosphere'],
      correct: 1,
      explanation: 'Due to Earth’s eastward rotation, the Coriolis effect deflects moving fluid trajectories to the right in the Northern Hemisphere and to the left in the Southern Hemisphere.'
    }
  ],

  'space-astronomy': [
    {
      id: 'astro-q1',
      difficulty: 'Undergraduate',
      questionEn: 'According to Kepler’s Third Law of Planetary Motion, what is the exact mathematical relationship between orbital period (P) and semi-major axis (a)?',
      options: ['P = a²', 'P² = a³', 'P³ = a²', 'P = 2πa'],
      correct: 1,
      explanation: 'Kepler’s Third Law dictates that the square of orbital period (P²) is directly proportional to the cube of the orbital semi-major axis (a³).'
    },
    {
      id: 'astro-q2',
      difficulty: 'Higher Secondary',
      questionEn: 'Which planet exhibits the highest mean surface temperature in our Solar System despite not being the closest to the Sun?',
      options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
      correct: 1,
      explanation: 'Venus has an extreme surface temperature (~465°C) caused by a runaway carbon dioxide greenhouse effect and dense sulfurous cloud cover.'
    },
    {
      id: 'astro-q3',
      difficulty: 'Undergraduate',
      questionEn: 'What astrophysical limit (~1.44 solar masses) defines the maximum mass a stable White Dwarf star can sustain before collapsing?',
      options: ['Schwarzschild Radius', 'Chandrasekhar Limit', 'Oppenheimer-Volkoff Limit', 'Hubble Constant'],
      correct: 1,
      explanation: 'Subrahmanyan Chandrasekhar proved that electron degeneracy pressure cannot support a white dwarf star exceeding 1.44 solar masses, causing a Type Ia supernova.'
    },
    {
      id: 'astro-q4',
      difficulty: 'Higher Secondary',
      questionEn: 'What is the approximate age of the Universe established by modern cosmic microwave background (CMB) measurements from the Planck telescope?',
      options: ['4.5 billion years', '9.2 billion years', '13.8 billion years', '24.1 billion years'],
      correct: 2,
      explanation: 'Precise astrophysical observations of the Cosmic Microwave Background establish the age of our Universe at approximately 13.787 ± 0.020 billion years.'
    },
    {
      id: 'astro-q5',
      difficulty: 'Undergraduate',
      questionEn: 'The James Webb Space Telescope (JWST) is stationed in a stable halo orbit around which gravitational equilibrium point?',
      options: ['Low Earth Orbit (LEO)', 'Earth-Moon L1 Point', 'Sun-Earth L2 Lagrange Point', 'Geostationary Transfer Arc'],
      correct: 2,
      explanation: 'JWST orbits the second Sun-Earth Lagrange point (L2), roughly 1.5 million kilometers outside Earth’s orbit, ensuring a clear cold view of deep space.'
    }
  ],

  'education-pedagogy': [
    {
      id: 'ped-q1',
      difficulty: 'Undergraduate',
      questionEn: 'What is the highest cognitive skill tier in the Revised Bloom’s Taxonomy (Anderson & Krathwohl, 2001)?',
      options: ['Evaluating', 'Analyzing', 'Creating', 'Remembering'],
      correct: 2,
      explanation: 'Creating (generating new ideas, products, models, or original solutions) represents the pinnacle of the revised cognitive hierarchy, above Evaluating.'
    },
    {
      id: 'ped-q2',
      difficulty: 'Undergraduate',
      questionEn: 'What distinguishes Formative Assessment from Summative Assessment in higher education pedagogy?',
      options: [
        'Formative assessment measures final degree qualification only',
        'Formative assessment provides ongoing diagnostic feedback during the learning process to inform teaching adjustments',
        'Summative assessment is conducted exclusively through informal peer discussions',
        'Formative assessments carry 80% of final university GPA calculations'
      ],
      correct: 1,
      explanation: 'Formative assessment is assessment FOR learning (diagnostic checks, quizzes, drafts), whereas Summative assessment is assessment OF learning (end-of-semester exams).'
    },
    {
      id: 'ped-q3',
      difficulty: 'Undergraduate',
      questionEn: 'Jerome Bruner’s "Spiral Curriculum" model posits that:',
      options: [
        'Complex subjects can be taught to any student at any developmental stage if presented with appropriate cognitive scaffolding and revisited at increasing depth',
        'Students must master rote memorization before engaging in any inquiry-based discovery',
        'Academic curricula should be restricted to physical science disciplines',
        'Evaluation must be conducted without teacher intervention'
      ],
      correct: 0,
      explanation: 'Bruner’s Spiral Curriculum introduces fundamental principles early and revisits them repeatedly throughout schooling with expanding sophistication.'
    },
    {
      id: 'ped-q4',
      difficulty: 'Higher Secondary',
      questionEn: 'In pedagogical learning theory, what is "Scaffolding"?',
      options: [
        'Physical reconstruction of school classroom architecture',
        'Temporary instructional support provided by an educator or peer that is gradually removed as learner competence develops',
        'Strict disciplinary guidelines applied during examinations',
        'Rote repetitive memorization drills'
      ],
      correct: 1,
      explanation: 'Instructional scaffolding provides supportive frameworks (cues, models, breakdown of steps) that empower learners to achieve mastery before withdrawing assistance.'
    },
    {
      id: 'ped-q5',
      difficulty: 'Undergraduate',
      questionEn: 'According to constructivist epistemology, how does meaningful student learning occur?',
      options: [
        'Through passive reception and verbatim recording of lecturer monologues',
        'Through active cognitive construction of meaning from experience, prior knowledge, and social interaction',
        'Solely through automated computerized testing without social dialogue',
        'Through genetic determinism without external environmental stimuli'
      ],
      correct: 1,
      explanation: 'Constructivism (advanced by Piaget, Vygotsky, and Dewey) holds that learners actively synthesize meaning and mental schemas rather than passively receiving data.'
    }
  ]
};
