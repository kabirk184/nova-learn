export const csLessons = [
  {
    "id": "cs-01",
    "title": "Asymptotic Analysis & Big-O Notation",
    "readTime": "9 min",
    "difficulty": "CS Core",
    "summaryEn": "Algorithmic efficiency, time and space complexity: O(1), O(log n), O(n), O(n log n), and O(n²).",
    "contentEn": "Asymptotic analysis evaluates algorithmic efficiency independently of specific computer hardware or programming language implementations.\n\nFormal Mathematical Definitions:\n1. Big-O (O(g(n))): Tight upper bound characterizing worst-case growth rate:\n   f(n) ≤ c * g(n) for all n ≥ n0 where c > 0.\n2. Big-Omega (Ω(g(n))): Asymptotic lower bound characterizing best-case efficiency.\n3. Big-Theta (Θ(g(n))): Asymptotically tight bound where f(n) is bounded both above and below by g(n).\n\nHierarchy of Common Time Complexities:\n- O(1) - Constant Time: Direct array index lookup, hash table retrieval (expected).\n- O(log n) - Logarithmic Time: Binary Search on sorted sequences; halves search space every step.\n- O(n) - Linear Time: Single iteration through an unindexed array.\n- O(n log n) - Linearithmic Time: Optimal comparison-based sorting (Merge Sort, Heap Sort).\n- O(n²) - Quadratic Time: Nested loops over inputs (Bubble Sort, Insertion Sort).\n- O(2^n) - Exponential Time: Recursive calculation of Fibonacci numbers without memoization.\n- O(n!) - Factorial Time: Brute-force Traveling Salesperson Problem permutation check."
  },
  {
    "id": "cs-02",
    "title": "Fundamental Data Structures: Linear vs Non-Linear",
    "readTime": "9 min",
    "difficulty": "CS Core",
    "summaryEn": "Arrays, singly/doubly linked lists, stacks (LIFO), queues (FIFO), and circular buffers.",
    "contentEn": "Data structures organize data in physical memory to maximize operational efficiency and spatial cache locality.\n\nLinear Data Structures:\n1. Arrays (Contiguous Memory):\n   - Fast random access: O(1) time via base address + (index * element_size).\n   - Costly insertions/deletions: O(n) time due to shifting adjacent elements.\n2. Linked Lists (Node-Pointer Chains):\n   - Dynamic sizing with fast insertion/deletion at known nodes: O(1) pointer updates.\n   - Slow random access: O(n) sequential traversal; poor CPU cache line spatial locality.\n3. Stacks (LIFO - Last In, First Out):\n   - Fundamental operations: push(), pop(), peek() - all guaranteed O(1).\n   - Use cases: Compiler call stacks, syntax parsing, undo/redo buffers.\n4. Queues (FIFO - First In, First Out):\n   - Operations: enqueue(), dequeue() - O(1) via head/tail pointers.\n   - Use cases: CPU task scheduling, print spooling, Breadth-First Search (BFS)."
  },
  {
    "id": "cs-03",
    "title": "Trees, Heaps & Priority Queues",
    "readTime": "9 min",
    "difficulty": "Undergraduate CS",
    "summaryEn": "Binary Search Trees (BST), AVL balanced trees, binary heaps (min/max), and priority queue implementation.",
    "contentEn": "Non-linear hierarchical data structures facilitate fast logarithmic searching, sorting, and priority routing.\n\nTree Terminology & Binary Search Trees (BST):\n- BST Property: For every node N, all keys in the left subtree are strictly less than N.key, and all keys in the right subtree are strictly greater.\n- Traversal Orders: Pre-order (Node-L-R), In-order (L-Node-R yields sorted keys), Post-order (L-R-Node).\n- Balanced BSTs (AVL & Red-Black Trees): Enforce balance criteria through tree rotations, guaranteeing worst-case O(log n) search, insertion, and deletion.\n\nBinary Heaps & Priority Queues:\n- Complete Binary Tree stored compactly in a flat array (Node at index i has children at 2i + 1 and 2i + 2).\n- Heap Property: In a Max-Heap, parent key ≥ children keys.\n- Heapify Operation: Restores heap invariant in O(log n) time.\n- Heap Sort: Sorts an array of length n in guaranteed O(n log n) time in-place."
  },
  {
    "id": "cs-04",
    "title": "Hash Tables, Collision Resolution & Amortization",
    "readTime": "8 min",
    "difficulty": "CS Core",
    "summaryEn": "Hash functions, load factor, chaining with linked lists, open addressing (linear/quadratic probing), and amortized O(1).",
    "contentEn": "Hash tables provide associative key-value mapping with expected O(1) search, insertion, and deletion.\n\nHash Table Mechanics:\n1. Hash Function: Converts an arbitrary key into an integer index within the table array. Must be deterministic, fast, and uniformly distribute keys across buckets.\n2. Load Factor (α = n / m): The ratio of stored items (n) to total array buckets (m). When α exceeds a threshold (typically 0.75), the table rehashes into a doubled array.\n\nCollision Resolution Strategies:\n- Separate Chaining: Each array bucket stores a linked list or red-black tree containing colliding key-value pairs.\n- Open Addressing: All elements reside directly in the table array:\n  - Linear Probing: If bucket i is occupied, check i+1, i+2... (susceptible to primary clustering).\n  - Quadratic Probing: Checks i + 1^2, i + 2^2...\n  - Double Hashing: Uses a secondary hash function to calculate probing step size."
  },
  {
    "id": "cs-05",
    "title": "Divide and Conquer: Sorting & Binary Search",
    "readTime": "9 min",
    "difficulty": "Algorithms Core",
    "summaryEn": "Merge Sort, Quick Sort (partitioning, pivot selection), Binary Search, and Master Theorem recurrence analysis.",
    "contentEn": "The Divide-and-Conquer algorithmic paradigm decomposes a problem into subproblems, solves them recursively, and combines results.\n\nKey Algorithms:\n1. Merge Sort:\n   - Divide: Halve the array recursively until sub-arrays have length 1.\n   - Conquer: Recursively sort each half.\n   - Combine: Merge two sorted sub-arrays in O(n) linear time.\n   - Complexity: Strictly guaranteed O(n log n) across all cases; requires O(n) auxiliary space.\n2. Quick Sort:\n   - Partition: Select a pivot element, reordering the array so that elements < pivot precede it and elements > pivot follow it (Lomuto or Hoare scheme).\n   - Complexity: Average O(n log n) with tiny cache-friendly constants; worst-case O(n²) when pivot choices are degenerately skewed (mitigated via Randomized Pivot).\n\nThe Master Theorem for Recurrences:\nT(n) = a * T(n / b) + f(n) provides closed-form asymptotic solutions based on comparing n^(log_b(a)) with f(n)."
  },
  {
    "id": "cs-06",
    "title": "Graph Algorithms: Traversal, Shortest Paths & Spanning Trees",
    "readTime": "10 min",
    "difficulty": "Undergraduate CS",
    "summaryEn": "BFS (queue), DFS (recursion/stack), Dijkstra algorithm, Bellman-Ford, and Kruskal/Prim MST.",
    "contentEn": "Graph algorithms solve relational connectivity, network flow, and optimal routing problems.\n\nGraph Representation: Adjacency Matrix (O(V²) space, fast edge lookup) vs Adjacency List (O(V + E) space, optimal for sparse networks).\n\nFoundational Graph Algorithms:\n1. Breadth-First Search (BFS): Explores nodes layer-by-layer using a Queue; finds unweighted shortest paths in O(V + E).\n2. Depth-First Search (DFS): Explores branches deeply using Recursion/Stack; detects cycles, finds connected components, and computes Topological Sorting in Directed Acyclic Graphs (DAGs).\n3. Dijkstra's Shortest Path Algorithm: Computes single-source shortest paths on non-negative weighted graphs using a Min-Heap priority queue in O((V + E) log V).\n4. Minimum Spanning Trees (MST):\n   - Kruskal's Algorithm: Greedily adds smallest edges using a Disjoint-Set (Union-Find) data structure.\n   - Prim's Algorithm: Grows a single tree outward from an initial node using a priority queue."
  },
  {
    "id": "cs-07",
    "title": "Dynamic Programming & Memoization Techniques",
    "readTime": "10 min",
    "difficulty": "Advanced Algorithms",
    "summaryEn": "Optimal substructure, overlapping subproblems, top-down memoization, bottom-up tabulation, Knapsack problem.",
    "contentEn": "Dynamic Programming (DP) solves complex optimization problems by storing the results of overlapping subproblems to prevent redundant computation.\n\nThe Two Hallmarks of Dynamic Programming:\n1. Optimal Substructure: An optimal solution to the overarching problem contains within it optimal solutions to its subproblems.\n2. Overlapping Subproblems: The recursive algorithm revisits identical subproblems repeatedly (unlike Divide-and-Conquer).\n\nImplementation Approaches:\n- Top-Down Memoization: Keeps the natural recursive structure, caching subproblem results in a hash table or array upon initial evaluation.\n- Bottom-Up Tabulation: Eliminates recursion overhead by iteratively filling a DP table starting from the base cases.\n\nClassic DP Archetypes:\n- 0/1 Knapsack Problem: Deciding whether to include item i to maximize value without exceeding weight capacity W: DP[i][w] = max(DP[i-1][w], value[i] + DP[i-1][w - weight[i]]).\n- Longest Common Subsequence (LCS): Used in genetic DNA sequencing and diff tools."
  },
  {
    "id": "cs-08",
    "title": "Computer Architecture: CPU Datapath & Instruction Pipelining",
    "readTime": "9 min",
    "difficulty": "Computer Engineering",
    "summaryEn": "Von Neumann architecture, fetch-decode-execute cycle, RISC vs CISC, and pipelining hazards.",
    "contentEn": "Computer architecture investigates the physical hardware execution of machine instructions.\n\nThe Von Neumann Architecture:\nComprises a Central Processing Unit (CPU) with Arithmetic Logic Unit (ALU) and Registers, a Control Unit (CU), Memory (RAM), and I/O interfaces connected via system buses.\n\nThe Classic 5-Stage RISC Instruction Pipeline:\n1. IF (Instruction Fetch): Fetch instruction from memory into Instruction Register; increment Program Counter (PC).\n2. ID (Instruction Decode): Decode opcode and read source registers from Register File.\n3. EX (Execution): ALU performs arithmetic/logic computation or calculates memory addresses.\n4. MEM (Memory Access): Read or write data operands from data cache/RAM.\n5. WB (Write Back): Write execution result into destination register.\n\nPipeline Hazards:\n- Structural Hazards: Hardware resource conflicts.\n- Data Hazards: Read-After-Write (RAW) dependencies (resolved via Forwarding or Bypassing).\n- Control Hazards: Branch instructions disrupting sequential pipeline flow (resolved via Branch Prediction)."
  },
  {
    "id": "cs-09",
    "title": "Memory Hierarchy & Cache Locality Optimization",
    "readTime": "9 min",
    "difficulty": "Computer Systems",
    "summaryEn": "SRAM L1/L2/L3 caches, DRAM main memory, cache lines, hit/miss rates, and spatial/temporal locality.",
    "contentEn": "The memory hierarchy bridges the vast speed mismatch between nanosecond CPU execution and millisecond secondary storage access.\n\nThe Memory Pyramid (Fastest & Smallest -> Slowest & Largest):\n1. CPU Registers: Sub-nanosecond cycle access.\n2. L1 Cache (Split into L1-Instruction and L1-Data): Integrated onto silicon core; ~1-4 cycles latency.\n3. L2 & L3 Caches: Shared on-die SRAM; ~10-40 cycles latency.\n4. Main Memory (DRAM): High capacity; ~100-200 cycles latency.\n5. Non-Volatile Storage (PCIe NVMe SSD, HDD): Millions of clock cycles latency.\n\nThe Principles of Locality:\n- Temporal Locality: If memory location X is accessed, it is highly likely to be accessed again soon (e.g., loop counters).\n- Spatial Locality: If memory location X is accessed, nearby memory locations X+1, X+2 are likely to be accessed soon (e.g., sequential array iterations)."
  },
  {
    "id": "cs-10",
    "title": "Operating Systems: Processes, Threads & Concurrency",
    "readTime": "9 min",
    "difficulty": "OS Core",
    "summaryEn": "Process Control Blocks (PCB), context switching, multithreading, mutexes, semaphores, and deadlocks.",
    "contentEn": "An operating system acts as the resource arbiter multiplexing physical hardware across concurrent software applications.\n\nProcesses vs Threads:\n- Process: An isolated execution unit with its own private virtual address space (text, data, heap, stack), file descriptors, and Process Control Block (PCB).\n- Thread: A lightweight execution unit within a process sharing the same address space and global variables, but possessing its own private stack and register state.\n\nConcurrency & Synchronization:\n- Race Condition: Undefined execution behavior occurring when concurrent threads manipulate shared state without synchronization.\n- Mutual Exclusion (Mutex): A binary locking mechanism ensuring only one thread enters a critical section at any given moment.\n- Semaphores (Edsger Dijkstra): Integer signaling variables supporting wait() (P) and signal() (V) operations.\n\nCoffman's Four Conditions for Deadlock:\nDeadlock occurs if and only if all four conditions hold simultaneously:\n1. Mutual Exclusion.\n2. Hold and Wait.\n3. No Preemption.\n4. Circular Wait."
  },
  {
    "id": "cs-11",
    "title": "Virtual Memory, Paging & Page Replacement Algorithms",
    "readTime": "9 min",
    "difficulty": "OS Core",
    "summaryEn": "Memory Management Unit (MMU), virtual-to-physical address translation, Page Faults, TLB, and LRU algorithm.",
    "contentEn": "Virtual memory provides each process with the illusion of a vast, contiguous address space while enforcing memory protection between processes.\n\nPaging Architecture:\n- Virtual Address Space is segmented into fixed-size blocks termed Pages (typically 4 KB).\n- Physical Memory (RAM) is partitioned into matching blocks termed Page Frames.\n- The Memory Management Unit (MMU) translates virtual addresses to physical frame addresses via Page Tables.\n- Translation Lookaside Buffer (TLB): A high-speed hardware associative cache storing recent virtual-to-physical translations.\n\nPage Faults & Replacement:\nWhen a requested page is not resident in physical RAM, a Page Fault hardware interrupt triggers:\nThe OS suspends the process, loads the page from secondary disk storage into an empty frame, and updates the page table.\n- Page Replacement Algorithms: FIFO, Optimal (Belady's clairvoyant algorithm), and Least Recently Used (LRU - evicting pages unused for the longest interval)."
  },
  {
    "id": "cs-12",
    "title": "Relational Database Theory: SQL & Normalization (1NF to BCNF)",
    "readTime": "9 min",
    "difficulty": "Database Systems",
    "summaryEn": "Relational algebra, ACID transaction guarantees, functional dependencies, 1NF, 2NF, 3NF, and BCNF.",
    "contentEn": "Relational database systems (RDBMS) organize data into structured tables (relations) governed by relational algebra.\n\nThe ACID Transactional Guarantees:\n- Atomicity: All operations in a transaction execute to complete success, or the entire transaction is rolled back.\n- Consistency: Transactions transition the database from one valid state to another, enforcing all schema constraints.\n- Isolation: Concurrent transactions execute without mutual interference (Serializable isolation level).\n- Durability: Once committed, updates persist permanently even through catastrophic system power failures.\n\nDatabase Normalization:\nEliminates data redundancy and prevents update, insertion, and deletion anomalies:\n- First Normal Form (1NF): All attributes contain only atomic (indivisible) scalar values; no repeating groups.\n- Second Normal Form (2NF): Must be in 1NF and eliminate partial functional dependencies (all non-key attributes fully dependent on the entire primary key).\n- Third Normal Form (3NF): Must be in 2NF and eliminate transitive dependencies (non-key attributes dependent on other non-key attributes).\n- Boyce-Codd Normal Form (BCNF): For every functional dependency X -> Y, X must be a superkey."
  },
  {
    "id": "cs-13",
    "title": "Computer Networks: OSI Model & The TCP/IP Protocol Stack",
    "readTime": "9 min",
    "difficulty": "Networking Core",
    "summaryEn": "The 7-layer OSI model, TCP 3-way handshake, UDP, IP addressing, DNS resolution, and packet encapsulation.",
    "contentEn": "Computer networks facilitate reliable, packet-switched communication across globally distributed computing devices.\n\nThe 7-Layer OSI Reference Model:\n1. Physical: Raw bit transmission across physical media (copper, fiber optic, radio frequency).\n2. Data Link: Node-to-node framing, MAC addressing, error detection (Ethernet, Wi-Fi 802.11).\n3. Network: Logical IP addressing, routing across internetworks (IPv4, IPv6, BGP, OSPF).\n4. Transport: End-to-end communication, port multiplexing, reliability, flow control (TCP, UDP).\n5. Session: Managing persistent dialog sessions between applications.\n6. Presentation: Data syntax translation, serialization, SSL/TLS encryption.\n7. Application: High-level end-user protocols (HTTP/HTTPS, DNS, SSH, SMTP).\n\nTCP vs UDP:\n- Transmission Control Protocol (TCP): Connection-oriented, guarantees in-order, error-checked packet delivery via the 3-Way Handshake (SYN -> SYN-ACK -> ACK), sliding-window flow control, and congestion collapse avoidance.\n- User Datagram Protocol (UDP): Connectionless, lightweight, low-latency datagram transmission without retransmission; ideal for live video streaming, DNS lookups, and gaming."
  },
  {
    "id": "cs-14",
    "title": "Software Engineering: Design Patterns (GoF) & SOLID Principles",
    "readTime": "9 min",
    "difficulty": "Software Architecture",
    "summaryEn": "Gang of Four patterns (Creational, Structural, Behavioral), SOLID object-oriented principles, and clean code.",
    "contentEn": "Software engineering formalizes architectural principles for building maintainable, robust, and extensible software systems.\n\nThe SOLID Object-Oriented Design Principles:\n- Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.\n- Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.\n- Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering system correctness.\n- Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.\n- Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions.\n\nGang of Four (GoF) Design Patterns:\n1. Creational: Singleton, Factory Method, Builder.\n2. Structural: Adapter (converting incompatible interfaces), Decorator (dynamically adding behavior), Composite.\n3. Behavioral: Observer (publish-subscribe event handling), Strategy (encapsulating swappable algorithms)."
  },
  {
    "id": "cs-15",
    "title": "Theory of Computation: Automata & Turing Machines",
    "readTime": "10 min",
    "difficulty": "Theoretical CS",
    "summaryEn": "Chomsky hierarchy, Deterministic Finite Automata (DFA), Pushdown Automata, and the Turing Halting Problem.",
    "contentEn": "The theory of computation defines the mathematical limits of what can and cannot be computed algorithmically.\n\nThe Chomsky Hierarchy of Formal Languages & Automata:\n1. Regular Languages: Recognized by Deterministic Finite Automata (DFA) and Non-Deterministic Finite Automata (NFA); matched by regular expressions. Possess no auxiliary memory.\n2. Context-Free Languages: Recognized by Pushdown Automata (PDA) using a single Stack; generates programming language syntax.\n3. Context-Sensitive Languages: Recognized by Linear Bounded Automata.\n4. Recursively Enumerable Languages: Recognized by universal Turing Machines.\n\nThe Turing Machine & The Halting Problem (Alan Turing, 1936):\n- A Turing Machine consists of an infinite tape, a read/write head, and a finite state transition function.\n- The Halting Problem: Can an algorithm exist that determines whether an arbitrary program will eventually halt or loop infinitely on a given input?\n- Turing proved undecidability via proof by contradiction (diagonalization): No general algorithm can ever solve the Halting Problem."
  },
  {
    "id": "cs-16",
    "title": "Complexity Theory: P vs NP & NP-Completeness",
    "readTime": "9 min",
    "difficulty": "Theoretical CS",
    "summaryEn": "Deterministic vs non-deterministic polynomial time, polynomial reductions, Cook-Levin theorem, and SAT.",
    "contentEn": "Computational complexity categorizes problems by the intrinsic computational resources required to solve them.\n\nComplexity Classes:\n- Class P: Decision problems solvable by a deterministic Turing machine in Polynomial Time (O(n^k); tractable problems).\n- Class NP (Non-Deterministic Polynomial): Decision problems whose proposed solutions can be VERIFIED in polynomial time by a deterministic Turing machine.\n- The P vs NP Question: Does P = NP? If a solution is easy to verify, is it necessarily easy to find? Widely considered the most profound open problem in computer science.\n\nNP-Completeness & Reductions:\nA problem X is NP-Complete if:\n1. X is in NP.\n2. Every problem Y in NP is polynomial-time reducible to X (Y ≤_p X).\n- Cook-Levin Theorem (1971): Proved that the Boolean Satisfiability Problem (SAT) is NP-Complete.\n- Classic NP-Complete Problems: 3-SAT, Traveling Salesperson Decision Problem, Knapsack, Vertex Cover, Clique."
  },
  {
    "id": "cs-17",
    "title": "Cybersecurity Principles: Cryptography, Public-Keys & Zero-Trust",
    "readTime": "9 min",
    "difficulty": "Security Core",
    "summaryEn": "CIA triad, symmetric (AES) vs asymmetric (RSA/ECC) encryption, SHA-256 hashing, and zero-trust architectures.",
    "contentEn": "Cybersecurity protects digital systems, networks, and confidential data from malicious compromise or unauthorized access.\n\nThe CIA Security Triad:\n- Confidentiality: Ensuring sensitive data is accessible solely to authorized principals (enforced via encryption).\n- Integrity: Safeguarding information from unauthorized tampering (enforced via cryptographic hashes and digital signatures).\n- Availability: Ensuring systems remain reliably accessible to authorized users (defended via DDoS mitigation and redundancy).\n\nCryptographic Primitives:\n1. Symmetric Encryption: Single shared secret key for encryption and decryption (AES-256); highly fast and efficient.\n2. Asymmetric Encryption: Key-pair architecture (Public key for encryption; Private key for decryption; RSA, Elliptic Curve Cryptography - ECC).\n3. Cryptographic Hash Functions: One-way deterministic functions mapping arbitrary data to fixed-length digests (SHA-256). Must be collision-resistant and exhibit the \"avalanche effect\".\n\nZero-Trust Architecture:\n\"Never trust, always verify.\" Eliminates implicit perimeter trust, requiring continuous authentication, least-privilege access, and end-to-end encryption."
  },
  {
    "id": "cs-18",
    "title": "Artificial Intelligence: Heuristic Search & Minimax Algorithms",
    "readTime": "9 min",
    "difficulty": "AI Core",
    "summaryEn": "State-space search, A* algorithm, admissible heuristics, Minimax adversarial game trees, and alpha-beta pruning.",
    "contentEn": "Classical artificial intelligence models rational problem-solving via state-space search and adversarial decision-making.\n\nInformed Heuristic Search & The A* Algorithm:\nA* finds optimal paths by evaluating nodes via:\nf(n) = g(n) + h(n)\n- g(n): The exact cost accumulated from the start node to node n.\n- h(n): The heuristic estimated cost from node n to the goal.\n- Admissibility Criterion: If the heuristic h(n) is admissible (never overestimates the true remaining cost to the goal) and consistent (satisfies triangle inequality), A* is mathematically guaranteed to find the optimal shortest path.\n\nAdversarial Search: Minimax & Alpha-Beta Pruning:\nUsed in two-player zero-sum games (Chess, Go):\n- Minimax: Max player maximizes score while Min player minimizes it.\n- Alpha-Beta Pruning: Dramatically prunes branches of the game tree that cannot influence the final decision, reducing average time complexity from O(b^d) to O(b^(d/2))."
  },
  {
    "id": "cs-19",
    "title": "Machine Learning Foundations: Supervised vs Unsupervised Models",
    "readTime": "9 min",
    "difficulty": "Machine Learning Core",
    "summaryEn": "Gradient descent, linear/logistic regression, decision trees, k-means clustering, bias-variance tradeoff.",
    "contentEn": "Machine learning trains mathematical algorithms to recognize patterns and make inferences directly from empirical data.\n\nThe Machine Learning Taxonomy:\n1. Supervised Learning: Learning a mapping function from labeled training pairs (X -> Y):\n   - Regression: Predicting continuous numeric outcomes (Linear Regression).\n   - Classification: Predicting discrete categorical labels (Logistic Regression, Support Vector Machines, Random Forests).\n2. Unsupervised Learning: Discovering inherent structural patterns in unlabeled data:\n   - Clustering: Grouping data points by geometric proximity (K-Means Clustering).\n   - Dimensionality Reduction: Compressing high-dimensional feature spaces while preserving variance (Principal Component Analysis - PCA).\n\nThe Bias-Variance Tradeoff:\n- Underfitting (High Bias): The model is too simplistic to capture underlying patterns.\n- Overfitting (High Variance): The model memorizes training noise, failing to generalize to unseen test data.\n- Regularization (L1 Lasso, L2 Ridge): Constrains parameter weights to prevent overfitting."
  },
  {
    "id": "cs-20",
    "title": "Deep Learning & Neural Networks: Backpropagation to Transformers",
    "readTime": "10 min",
    "difficulty": "Advanced AI Core",
    "summaryEn": "Artificial neurons, activation functions, backpropagation via chain rule, CNNs, and self-attention transformers.",
    "contentEn": "Deep learning employs layered neural architectures to learn hierarchical feature representations directly from raw data.\n\nThe Artificial Neuron (Perceptron):\ny = f( ∑ (w_i * x_i) + b )\nWhere w represents synaptic weights, b is bias, and f is a non-linear activation function (ReLU: max(0, x), Sigmoid, GELU).\n\nThe Engine of Deep Learning: Backpropagation:\nComputes the gradient of the loss function with respect to every weight in the network via the calculus Chain Rule:\n∂L/∂w = (∂L/∂y) * (∂y/∂z) * (∂z/∂w)\nWeights are iteratively updated via Stochastic Gradient Descent (SGD) or Adam optimization.\n\nModern Neural Architectures:\n- Convolutional Neural Networks (CNNs): Exploit translation invariance and spatial locality for computer vision.\n- The Transformer Architecture (Vaswani et al., 2017): Replaced recurrence with the Multi-Head Self-Attention mechanism, enabling massive parallelization and powering modern Large Language Models (LLMs)."
  },
  {
    "id": "cs-21",
    "title": "Cloud Computing, Distributed Systems & Microservices",
    "readTime": "9 min",
    "difficulty": "Cloud Architecture",
    "summaryEn": "CAP theorem, consensus algorithms (Raft/Paxos), Docker containerization, Kubernetes, and event-driven microservices.",
    "contentEn": "Modern software infrastructure relies on horizontally scalable, cloud-native distributed systems.\n\nThe CAP Theorem (Eric Brewer):\nA distributed data store can guarantee at most TWO of the following three properties simultaneously:\n1. Consistency: Every read receives the most recent write or an error.\n2. Availability: Every non-failing node returns a response.\n3. Partition Tolerance: The system continues to operate despite arbitrary network message losses or delays.\nConsequence: In the presence of a network partition (P), systems must choose between Consistency (CP - e.g., HBase, etcd) or Availability (AP - e.g., Cassandra, DynamoDB).\n\nCloud-Native Architecture:\n- Containerization (Docker): Packages code, runtime, system tools, and libraries into lightweight, reproducible, OS-level virtualized containers.\n- Orchestration (Kubernetes): Automates deployment, auto-scaling, health monitoring, and load-balancing of containerized clusters.\n- Microservices: Decomposes monolithic applications into modular, independently deployable services communicating via REST APIs or asynchronous event message queues (Kafka, RabbitMQ)."
  }
];
