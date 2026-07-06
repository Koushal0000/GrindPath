// Data Structures & Algorithms Roadmap Templates
// Each week: { title, learningObjectives[], topics[] }

const Beginner = [
  {
    title: "Complexity Analysis",
    learningObjectives: [
      "Analyze time and space complexity of algorithms",
      "Apply Big O notation to classify algorithm performance"
    ],
    topics: [
      "Big O Notation",
      "Time Complexity Analysis",
      "Space Complexity",
      "Best, Worst & Average Case Analysis"
    ]
  },
  {
    title: "Arrays & Strings",
    learningObjectives: [
      "Solve fundamental array and string problems",
      "Apply two-pointer and sliding window basics"
    ],
    topics: [
      "Array Traversal & Manipulation",
      "Two-Pointer Technique (Introduction)",
      "String Reversal & Palindrome Checks",
      "Sliding Window (Introduction)"
    ]
  },
  {
    title: "Linked Lists",
    learningObjectives: [
      "Implement singly and doubly linked lists",
      "Solve classic linked list problems"
    ],
    topics: [
      "Singly Linked List (Node, Head, Tail)",
      "Insertion & Deletion Operations",
      "Reverse a Linked List",
      "Cycle Detection (Floyd's Algorithm)"
    ]
  },
  {
    title: "Stacks & Queues",
    learningObjectives: [
      "Use stacks and queues to solve real problems",
      "Implement them using arrays and linked lists"
    ],
    topics: [
      "Stack Implementation & Applications (Balanced Parentheses)",
      "Queue Implementation (Circular Queue)",
      "Deque (Double-Ended Queue)",
      "Monotonic Stack Introduction"
    ]
  },
  {
    title: "Hash Maps & Hash Sets",
    learningObjectives: [
      "Use hash maps for O(1) average-case lookups",
      "Solve frequency counting and pairing problems"
    ],
    topics: [
      "Hash Map Operations (put, get, containsKey)",
      "Frequency Counting Pattern",
      "Two Sum Problem",
      "Group Anagrams"
    ]
  },
  {
    title: "Binary Search",
    learningObjectives: [
      "Apply binary search to sorted data correctly",
      "Recognize binary search problem patterns"
    ],
    topics: [
      "Binary Search Algorithm (Iterative & Recursive)",
      "Search in Rotated Sorted Array",
      "Finding Left & Right Boundaries",
      "Binary Search on Answer (Introduction)"
    ]
  },
  {
    title: "Recursion & Backtracking Basics",
    learningObjectives: [
      "Write recursive solutions with base and recursive cases",
      "Trace recursion trees to understand call stacks"
    ],
    topics: [
      "Recursion Fundamentals & Call Stack",
      "Factorial, Fibonacci & Power",
      "Subsets & Permutations (Introduction)",
      "Recursion vs Iteration Trade-offs"
    ]
  },
  {
    title: "Trees",
    learningObjectives: [
      "Traverse binary trees using DFS and BFS",
      "Solve common tree structure problems"
    ],
    topics: [
      "Binary Tree Basics (Node, Root, Leaf)",
      "Inorder, Preorder & Postorder Traversal",
      "Level-Order BFS Traversal",
      "Tree Height, Diameter & Balance"
    ]
  },
  {
    title: "Sorting Algorithms",
    learningObjectives: [
      "Implement and compare fundamental sorting algorithms",
      "Understand when to use each sorting strategy"
    ],
    topics: [
      "Bubble, Selection & Insertion Sort",
      "Merge Sort (Divide & Conquer)",
      "Quick Sort & Pivot Selection",
      "Counting Sort & Radix Sort"
    ]
  },
  {
    title: "Introduction to Dynamic Programming",
    learningObjectives: [
      "Recognize overlapping subproblems",
      "Solve DP problems using memoization and tabulation"
    ],
    topics: [
      "Overlapping Subproblems & Optimal Substructure",
      "Top-Down DP (Memoization)",
      "Bottom-Up DP (Tabulation)",
      "0/1 Knapsack Problem"
    ]
  },
  {
    title: "Practice & Problem-Solving Strategy",
    learningObjectives: [
      "Solve easy LeetCode problems fluently",
      "Build a structured approach to problem-solving"
    ],
    topics: [
      "Problem Breakdown Strategy (REACTO)",
      "Pattern Recognition Across Problem Types",
      "Easy LeetCode Problem Set (20 Problems)",
      "Interview Communication & Time Management"
    ]
  }
];

const Intermediate = [
  {
    title: "Advanced Array Techniques",
    learningObjectives: [
      "Solve complex array problems with optimal time complexity",
      "Apply sliding window and prefix sum efficiently"
    ],
    topics: [
      "Sliding Window (Variable & Fixed Size)",
      "Prefix Sum & Difference Arrays",
      "Dutch National Flag Algorithm (3-Way Partition)",
      "Kadane's Algorithm (Maximum Subarray)"
    ]
  },
  {
    title: "Two Pointers & Intervals",
    learningObjectives: [
      "Apply two-pointer patterns to sorted and unsorted arrays",
      "Merge, insert, and process intervals"
    ],
    topics: [
      "Two Pointers on Sorted Arrays (3Sum, 4Sum)",
      "Container with Most Water",
      "Merge Intervals",
      "Meeting Rooms & Schedule Problems"
    ]
  },
  {
    title: "Binary Search Variations",
    learningObjectives: [
      "Apply binary search to advanced scenarios",
      "Use binary search on answers and 2D matrices"
    ],
    topics: [
      "Search in 2D Matrix",
      "Kth Smallest / Largest Element",
      "Binary Search on Answer (Min Capacity, Min Days)",
      "Find Peak Element (Mountain Array)"
    ]
  },
  {
    title: "Trees & Binary Search Trees",
    learningObjectives: [
      "Solve advanced tree and BST problems",
      "Apply tree DP and path-finding techniques"
    ],
    topics: [
      "BST Operations & Validation",
      "Lowest Common Ancestor (LCA)",
      "Serialize & Deserialize Binary Tree",
      "Path Sum & Maximum Path Sum"
    ]
  },
  {
    title: "Heaps & Priority Queues",
    learningObjectives: [
      "Use heaps for top-K and scheduling problems",
      "Implement and reason about heap operations"
    ],
    topics: [
      "Min-Heap & Max-Heap Operations",
      "Kth Largest Element in Stream",
      "Merge K Sorted Lists",
      "Task Scheduler & Meeting Rooms II"
    ]
  },
  {
    title: "Graphs",
    learningObjectives: [
      "Traverse graphs with BFS and DFS",
      "Solve connected component and cycle-detection problems"
    ],
    topics: [
      "Graph Representations (Adjacency List & Matrix)",
      "BFS & DFS Traversal",
      "Number of Islands & Connected Components",
      "Topological Sort (Kahn's BFS Algorithm)"
    ]
  },
  {
    title: "Dynamic Programming Patterns",
    learningObjectives: [
      "Recognize and apply DP patterns",
      "Solve medium-level DP problems systematically"
    ],
    topics: [
      "House Robber & Climb Stairs Pattern",
      "Longest Increasing Subsequence (LIS)",
      "Coin Change & Unbounded Knapsack",
      "2D DP (Grid Paths, Edit Distance)"
    ]
  },
  {
    title: "Greedy Algorithms",
    learningObjectives: [
      "Apply greedy strategies to optimization problems",
      "Recognize when greedy is correct vs when it fails"
    ],
    topics: [
      "Activity Selection & Interval Scheduling",
      "Fractional Knapsack",
      "Jump Game I & II",
      "Gas Station Problem"
    ]
  },
  {
    title: "Trie & Advanced Hashing",
    learningObjectives: [
      "Build and query tries for prefix-based search",
      "Apply rolling hash to string problems"
    ],
    topics: [
      "Trie Implementation (insert, search, startsWith)",
      "Word Search II (Trie + DFS)",
      "Rolling Hash (Rabin-Karp)",
      "Anagram & Substring Hashing Problems"
    ]
  },
  {
    title: "System Design Fundamentals",
    learningObjectives: [
      "Apply data structure knowledge to system design",
      "Design and analyze real-world scalable components"
    ],
    topics: [
      "LRU Cache Design (HashMap + DoublyLinkedList)",
      "Rate Limiter Design (Token Bucket, Sliding Window Log)",
      "URL Shortener",
      "Design Twitter Feed (Pagination, Ranking)"
    ]
  }
];

const Advanced = [
  {
    title: "Advanced Graph Algorithms",
    learningObjectives: [
      "Implement shortest-path algorithms on weighted graphs",
      "Apply them to real-world routing and optimization problems"
    ],
    topics: [
      "Dijkstra's Algorithm (Min-Heap)",
      "Bellman-Ford & SPFA",
      "Floyd-Warshall (All-Pairs Shortest Path)",
      "0-1 BFS & Multi-Source BFS"
    ]
  },
  {
    title: "MST & Network Flow",
    learningObjectives: [
      "Apply MST algorithms to connectivity problems",
      "Solve network flow and matching problems"
    ],
    topics: [
      "Kruskal's Algorithm (with DSU)",
      "Prim's Algorithm",
      "Max Flow (Ford-Fulkerson / Edmonds-Karp)",
      "Bipartite Matching (Hopcroft-Karp)"
    ]
  },
  {
    title: "Advanced Dynamic Programming",
    learningObjectives: [
      "Solve hard DP problems with advanced techniques",
      "Apply bitmask DP and digit DP"
    ],
    topics: [
      "Bitmask DP (Travelling Salesman Problem)",
      "Digit DP",
      "Interval DP (Matrix Chain Multiplication, Burst Balloons)",
      "DP on Trees (Tree DP)"
    ]
  },
  {
    title: "Segment Trees & Fenwick Trees",
    learningObjectives: [
      "Build range query data structures efficiently",
      "Handle dynamic range updates with lazy propagation"
    ],
    topics: [
      "Segment Tree (Build, Point Update, Range Query)",
      "Lazy Propagation",
      "Binary Indexed Tree (Fenwick Tree)",
      "Sparse Table for Range Minimum Query (RMQ)"
    ]
  },
  {
    title: "Disjoint Set Union (Union-Find)",
    learningObjectives: [
      "Apply Union-Find to dynamic connectivity problems",
      "Implement optimizations for near-constant time"
    ],
    topics: [
      "Union-Find with Path Compression",
      "Union by Rank / Size",
      "Kruskal's MST with DSU",
      "Dynamic Connectivity Problems"
    ]
  },
  {
    title: "Advanced String Algorithms",
    learningObjectives: [
      "Apply efficient string searching algorithms",
      "Build and query suffix structures"
    ],
    topics: [
      "KMP Algorithm (Failure Function)",
      "Z-Algorithm",
      "Manacher's Algorithm (Longest Palindromic Substring)",
      "Suffix Array Construction (Introduction)"
    ]
  },
  {
    title: "Advanced Trees",
    learningObjectives: [
      "Apply advanced tree decomposition techniques",
      "Solve path and ancestor queries efficiently"
    ],
    topics: [
      "Heavy-Light Decomposition (HLD)",
      "Euler Tour & Flattening Trees",
      "Binary Lifting (LCA in O(log N))",
      "Centroid Decomposition (Introduction)"
    ]
  },
  {
    title: "Competitive Programming Techniques",
    learningObjectives: [
      "Apply CP-specific algorithms and math tricks",
      "Optimize solutions for tight time constraints"
    ],
    topics: [
      "Number Theory (GCD, Modular Arithmetic, Sieve)",
      "Bit Manipulation Tricks",
      "Square Root Decomposition (Mo's Algorithm)",
      "Fast Exponentiation & Matrix Exponentiation"
    ]
  },
  {
    title: "Hard Problems & Mock Interviews",
    learningObjectives: [
      "Solve hard LeetCode problems under simulated interview conditions",
      "Develop structured communication during whiteboard interviews"
    ],
    topics: [
      "Hard LeetCode Problem Set (10 Curated Problems)",
      "Mock Interview Sessions (Timed)",
      "Solution Optimization & Trade-off Analysis",
      "Behavioral + Technical Interview Prep"
    ]
  },
  {
    title: "System Design for Engineers",
    learningObjectives: [
      "Design complex distributed systems using algorithmic insights",
      "Analyze scalability and performance trade-offs"
    ],
    topics: [
      "Consistent Hashing (Ring + Virtual Nodes)",
      "Distributed Cache Design (Redis Cluster)",
      "Search Engine Architecture (Inverted Index)",
      "Real-Time Analytics Pipeline Design"
    ]
  }
];

module.exports = { Beginner, Intermediate, Advanced };
