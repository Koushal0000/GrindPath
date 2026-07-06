// Java Development Roadmap Templates
// Each week: { title, learningObjectives[], topics[] }

const Beginner = [
  {
    title: "Java Foundations",
    learningObjectives: [
      "Set up a Java development environment",
      "Write and run basic Java programs"
    ],
    topics: [
      "JDK Setup, IDE & Hello World",
      "Data Types, Variables & Operators",
      "Type Casting & Wrapper Classes",
      "Input/Output with Scanner"
    ]
  },
  {
    title: "Control Flow",
    learningObjectives: [
      "Control program execution with conditionals and loops",
      "Use switch statements and ternary expressions"
    ],
    topics: [
      "if / else & Ternary Operator",
      "switch & switch Expressions (Java 14+)",
      "for, while & do-while Loops",
      "break, continue & Labeled Statements"
    ]
  },
  {
    title: "Methods & Arrays",
    learningObjectives: [
      "Organize code into reusable methods",
      "Work with arrays and strings"
    ],
    topics: [
      "Method Definitions, Parameters & Return Types",
      "Method Overloading",
      "1D & 2D Arrays",
      "String Methods & StringBuilder"
    ]
  },
  {
    title: "Object-Oriented Programming",
    learningObjectives: [
      "Model real-world entities with classes and objects",
      "Apply fundamental OOP principles"
    ],
    topics: [
      "Classes & Objects",
      "Constructors & the this Keyword",
      "Instance vs Static Members",
      "Overriding toString() & equals()"
    ]
  },
  {
    title: "Inheritance & Polymorphism",
    learningObjectives: [
      "Extend classes using inheritance",
      "Achieve runtime polymorphism via method overriding"
    ],
    topics: [
      "extends Keyword & super",
      "Method Overriding & @Override",
      "Upcasting & Downcasting",
      "instanceof Operator"
    ]
  },
  {
    title: "Interfaces & Abstract Classes",
    learningObjectives: [
      "Design contracts using interfaces",
      "Use abstract classes for shared behavior"
    ],
    topics: [
      "abstract Classes & Methods",
      "interface & implements",
      "Default & Static Interface Methods",
      "Functional Interfaces Introduction"
    ]
  },
  {
    title: "Collections Framework",
    learningObjectives: [
      "Use Java collections for data storage and retrieval",
      "Choose the right collection type for the task"
    ],
    topics: [
      "ArrayList & LinkedList",
      "HashMap & LinkedHashMap",
      "HashSet & TreeSet",
      "Iterating with Iterator & for-each"
    ]
  },
  {
    title: "Exception Handling",
    learningObjectives: [
      "Handle runtime errors gracefully",
      "Create and throw custom exceptions"
    ],
    topics: [
      "try / catch / finally",
      "Checked vs Unchecked Exceptions",
      "Custom Exception Classes",
      "Multi-catch & try-with-resources"
    ]
  },
  {
    title: "File I/O & Streams",
    learningObjectives: [
      "Read and write files in Java",
      "Use buffered streams for efficient I/O"
    ],
    topics: [
      "File & Path Classes (java.nio)",
      "BufferedReader & BufferedWriter",
      "FileInputStream & FileOutputStream",
      "Serialization & Deserialization"
    ]
  },
  {
    title: "Java 8 Features & Capstone",
    learningObjectives: [
      "Write modern functional-style Java code",
      "Build a complete console application"
    ],
    topics: [
      "Lambda Expressions",
      "Stream API (filter, map, collect)",
      "Optional Class",
      "Console Capstone Project"
    ]
  }
];

const Intermediate = [
  {
    title: "Modern Java (8–21) Features",
    learningObjectives: [
      "Use modern Java APIs fluently",
      "Write concise, functional-style Java code"
    ],
    topics: [
      "Stream API (flatMap, groupingBy, Collectors)",
      "Optional Best Practices",
      "Records & Sealed Classes (Java 16–17)",
      "Pattern Matching (instanceof, switch)"
    ]
  },
  {
    title: "Generics & Functional Programming",
    learningObjectives: [
      "Write type-safe generic code",
      "Compose behavior with functional interfaces"
    ],
    topics: [
      "Generic Classes & Methods",
      "Bounded Type Parameters (extends, super)",
      "Function, Predicate, Consumer, Supplier",
      "Method References"
    ]
  },
  {
    title: "Multithreading & Concurrency",
    learningObjectives: [
      "Write concurrent Java programs safely",
      "Use modern concurrency utilities"
    ],
    topics: [
      "Thread & Runnable",
      "ExecutorService & Thread Pools",
      "synchronized, volatile & Atomic Classes",
      "CompletableFuture"
    ]
  },
  {
    title: "JDBC & Database Connectivity",
    learningObjectives: [
      "Connect Java applications to relational databases",
      "Execute parameterized SQL safely"
    ],
    topics: [
      "JDBC Driver Setup & Connection",
      "Statement, PreparedStatement & ResultSet",
      "Transaction Management",
      "Connection Pooling (HikariCP)"
    ]
  },
  {
    title: "Spring Boot Fundamentals",
    learningObjectives: [
      "Build production-ready apps with Spring Boot",
      "Understand dependency injection and auto-configuration"
    ],
    topics: [
      "Spring Boot Auto-Configuration",
      "Dependency Injection & IoC Container",
      "application.properties & Profiles",
      "@Component, @Service, @Repository"
    ]
  },
  {
    title: "Spring MVC & REST APIs",
    learningObjectives: [
      "Build REST endpoints with Spring MVC",
      "Handle request validation and global errors"
    ],
    topics: [
      "@RestController & @RequestMapping",
      "Request / Response DTOs",
      "Bean Validation (@Valid, @NotNull)",
      "Exception Handling (@ControllerAdvice)"
    ]
  },
  {
    title: "Spring Data JPA",
    learningObjectives: [
      "Map Java entities to database tables",
      "Use JPA repositories for CRUD and custom queries"
    ],
    topics: [
      "@Entity, @Table & Column Annotations",
      "JPA Repository Interfaces (CrudRepository, JpaRepository)",
      "JPQL & Derived Query Methods",
      "Entity Relationships (@OneToMany, @ManyToOne)"
    ]
  },
  {
    title: "Spring Security",
    learningObjectives: [
      "Secure Spring Boot APIs with JWT",
      "Implement role-based authorization"
    ],
    topics: [
      "Spring Security Configuration (SecurityFilterChain)",
      "JWT Filter Integration",
      "Role-Based Authorization (@PreAuthorize)",
      "Password Encoding with BCrypt"
    ]
  },
  {
    title: "Testing in Java",
    learningObjectives: [
      "Write automated unit and integration tests",
      "Mock dependencies with Mockito"
    ],
    topics: [
      "JUnit 5 Annotations & Assertions",
      "Mockito (mocking, stubbing, verify)",
      "Spring Boot Test Slices (@WebMvcTest, @DataJpaTest)",
      "Integration Tests with @SpringBootTest"
    ]
  },
  {
    title: "Build Tools & Deployment",
    learningObjectives: [
      "Build and package Spring Boot apps",
      "Deploy to the cloud with a CI/CD pipeline"
    ],
    topics: [
      "Maven & Gradle Build Lifecycle",
      "Spring Boot JAR Packaging",
      "Docker for Spring Boot",
      "GitHub Actions CI/CD Pipeline"
    ]
  }
];

const Advanced = [
  {
    title: "Spring Boot Microservices",
    learningObjectives: [
      "Design and implement microservices with Spring Boot",
      "Handle inter-service communication"
    ],
    topics: [
      "Microservice Design Principles",
      "Spring Cloud Gateway (API Gateway)",
      "OpenFeign for Declarative HTTP Clients",
      "Service Registry with Eureka"
    ]
  },
  {
    title: "Event-Driven Architecture with Kafka",
    learningObjectives: [
      "Build event-driven systems with Apache Kafka",
      "Produce and consume messages reliably"
    ],
    topics: [
      "Kafka Architecture (Topics, Partitions, Offsets)",
      "Spring Kafka Producer",
      "Spring Kafka Consumer & Consumer Groups",
      "Dead Letter Topics & Retry Mechanisms"
    ]
  },
  {
    title: "Advanced Spring Security & OAuth2",
    learningObjectives: [
      "Implement enterprise-grade security",
      "Integrate OAuth2 and OpenID Connect"
    ],
    topics: [
      "OAuth2 Resource Server (JWT)",
      "Keycloak / Auth0 Integration",
      "Method-Level Security (@PreAuthorize, @Secured)",
      "Custom JWT Claims & Authorities"
    ]
  },
  {
    title: "Reactive Programming",
    learningObjectives: [
      "Write non-blocking reactive Java code",
      "Build reactive REST APIs with Spring WebFlux"
    ],
    topics: [
      "Project Reactor (Mono & Flux)",
      "Spring WebFlux Controllers",
      "Reactive Repository (R2DBC)",
      "Backpressure & Error Handling"
    ]
  },
  {
    title: "JVM Performance Tuning",
    learningObjectives: [
      "Profile and optimize JVM applications",
      "Tune garbage collection for throughput"
    ],
    topics: [
      "JVM Memory Model (Heap, Stack, Metaspace)",
      "GC Algorithms (G1GC, ZGC)",
      "Java Profiling (JProfiler, VisualVM, async-profiler)",
      "Heap Dump Analysis & Memory Leaks"
    ]
  },
  {
    title: "Design Patterns in Java",
    learningObjectives: [
      "Apply GoF design patterns in real projects",
      "Recognize how Spring uses design patterns"
    ],
    topics: [
      "Creational Patterns (Factory, Builder, Singleton)",
      "Structural Patterns (Adapter, Decorator, Proxy)",
      "Behavioral Patterns (Observer, Strategy, Command)",
      "Patterns in Spring (Template Method, Factory Bean)"
    ]
  },
  {
    title: "Cloud-Native Java",
    learningObjectives: [
      "Build resilient cloud-native apps with Spring Cloud",
      "Implement observability and resilience patterns"
    ],
    topics: [
      "Spring Cloud Config (Centralized Config)",
      "Resilience4j (Circuit Breaker, Retry, Rate Limiter)",
      "Distributed Tracing (Micrometer + Zipkin/Tempo)",
      "Spring Boot Actuator & Health Indicators"
    ]
  },
  {
    title: "Containerizing Java Applications",
    learningObjectives: [
      "Package Java apps for container deployment",
      "Deploy on Kubernetes"
    ],
    topics: [
      "Multi-Stage Docker Build for Java",
      "Kubernetes Deployment & Service YAML",
      "ConfigMaps & Secrets for Spring Boot",
      "Horizontal Pod Autoscaler"
    ]
  },
  {
    title: "Distributed Systems Concepts",
    learningObjectives: [
      "Apply distributed system principles to Java apps",
      "Handle consistency, failure, and idempotency"
    ],
    topics: [
      "CAP Theorem & Consistency Models",
      "Saga Pattern for Distributed Transactions",
      "Idempotency & Retry Design",
      "CQRS with Spring"
    ]
  },
  {
    title: "System Design with Java",
    learningObjectives: [
      "Design large-scale Java systems",
      "Prepare for system design interviews"
    ],
    topics: [
      "Scalable API Design Principles",
      "Database Sharding & Read Replicas",
      "Caching Strategies with Redis",
      "System Design Case Studies"
    ]
  }
];

module.exports = { Beginner, Intermediate, Advanced };
