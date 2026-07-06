// MERN Stack Roadmap Templates
// Each week: { title, learningObjectives[], topics[] }

const Beginner = [
  {
    title: "Web Foundations",
    learningObjectives: [
      "Understand how browsers and HTTP work",
      "Build structured HTML pages with semantic elements"
    ],
    topics: [
      "How the Internet & HTTP Work",
      "HTML5 Semantic Elements",
      "Forms & Input Types",
      "Basic CSS Styling & Selectors"
    ]
  },
  {
    title: "CSS Layouts & Responsive Design",
    learningObjectives: [
      "Create flexible layouts with Flexbox and Grid",
      "Build pages that adapt to any screen size"
    ],
    topics: [
      "CSS Flexbox",
      "CSS Grid",
      "Media Queries & Breakpoints",
      "CSS Variables & Custom Properties"
    ]
  },
  {
    title: "JavaScript Fundamentals",
    learningObjectives: [
      "Write programs using JS variables, types, and control flow",
      "Define and use functions effectively"
    ],
    topics: [
      "Variables, Data Types & Operators",
      "Control Flow & Loops",
      "Functions & Scope",
      "Arrays & Objects"
    ]
  },
  {
    title: "DOM & Browser APIs",
    learningObjectives: [
      "Manipulate web pages dynamically with JavaScript",
      "Handle user events and browser storage"
    ],
    topics: [
      "DOM Selection & Manipulation",
      "Event Listeners & Event Bubbling",
      "DOM Traversal & Modification",
      "LocalStorage & SessionStorage"
    ]
  },
  {
    title: "Modern JavaScript (ES6+)",
    learningObjectives: [
      "Use modern JS syntax confidently",
      "Handle asynchronous operations with Promises and async/await"
    ],
    topics: [
      "Arrow Functions & Destructuring",
      "Spread / Rest Operators & Template Literals",
      "Promises & Async/Await",
      "ES Modules (import / export)",
      "Fetch API"
    ]
  },
  {
    title: "React Fundamentals",
    learningObjectives: [
      "Build component-based UIs with React",
      "Understand JSX and props"
    ],
    topics: [
      "React Setup (Vite) & JSX",
      "Components & Props",
      "Conditional Rendering",
      "Lists & Keys"
    ]
  },
  {
    title: "React State & Hooks",
    learningObjectives: [
      "Manage component state with useState",
      "Sync side effects with useEffect"
    ],
    topics: [
      "useState Hook",
      "useEffect Hook & Cleanup",
      "Controlled Forms & Inputs",
      "Lifting State Up"
    ]
  },
  {
    title: "React Router & Context API",
    learningObjectives: [
      "Build multi-page React apps with routing",
      "Share global state across components"
    ],
    topics: [
      "React Router v6 Setup",
      "Route Params & Navigation",
      "useContext Hook",
      "Context API Provider Pattern"
    ]
  },
  {
    title: "Node.js Fundamentals",
    learningObjectives: [
      "Run JavaScript on the server with Node.js",
      "Work with Node's module system and file system"
    ],
    topics: [
      "Node.js Runtime & Event Loop",
      "CommonJS Modules (require / module.exports)",
      "File System (fs) Module",
      "NPM & package.json"
    ]
  },
  {
    title: "Express.js & REST APIs",
    learningObjectives: [
      "Build a REST API with Express",
      "Handle routing, middleware, and error responses"
    ],
    topics: [
      "Express Setup & Routing",
      "HTTP Methods (GET, POST, PUT, DELETE)",
      "Middleware (body-parser, cors)",
      "Request & Response Objects"
    ]
  },
  {
    title: "MongoDB & Mongoose",
    learningObjectives: [
      "Design and query a NoSQL database",
      "Model data with Mongoose schemas and validation"
    ],
    topics: [
      "MongoDB Atlas Setup & Connection",
      "Mongoose Schemas & Models",
      "CRUD Operations",
      "Mongoose Validation & Error Handling"
    ]
  },
  {
    title: "Authentication & JWT",
    learningObjectives: [
      "Implement secure user authentication",
      "Use JWT for stateless API auth"
    ],
    topics: [
      "Password Hashing with bcrypt",
      "JWT Generation & Verification",
      "Auth Middleware (protect routes)",
      "Protected Routes on Frontend"
    ]
  },
  {
    title: "Full-Stack Integration",
    learningObjectives: [
      "Connect React frontend to an Express/Node backend",
      "Handle API calls and global auth state on the frontend"
    ],
    topics: [
      "Axios & API Calls from React",
      "Storing JWT in localStorage",
      "CORS Configuration",
      "Error Handling Across the Stack"
    ]
  },
  {
    title: "Deployment & Capstone Project",
    learningObjectives: [
      "Deploy a full-stack MERN app to production",
      "Build a complete project end-to-end"
    ],
    topics: [
      "Environment Variables & .env Files",
      "Deploying Backend on Render / Railway",
      "Deploying Frontend on Vercel",
      "Final MERN Capstone Project"
    ]
  }
];

const Intermediate = [
  {
    title: "Advanced React Patterns",
    learningObjectives: [
      "Apply advanced React patterns to real-world projects",
      "Optimize component render performance"
    ],
    topics: [
      "Custom Hooks",
      "useReducer & useCallback",
      "useMemo & React.memo",
      "Code Splitting & React.lazy"
    ]
  },
  {
    title: "State Management",
    learningObjectives: [
      "Manage complex application-wide state",
      "Select the right state solution for the problem"
    ],
    topics: [
      "Redux Toolkit Basics",
      "RTK Query for Server State",
      "Zustand (Lightweight Alternative)",
      "State Architecture Patterns"
    ]
  },
  {
    title: "Forms, Validation & File Uploads",
    learningObjectives: [
      "Build complex forms with client-side validation",
      "Handle file uploads end-to-end"
    ],
    topics: [
      "React Hook Form",
      "Yup Schema Validation",
      "File Upload (Multer + Cloudinary)",
      "Dynamic Form Fields"
    ]
  },
  {
    title: "Node.js Advanced Patterns",
    learningObjectives: [
      "Structure Node.js apps for scale",
      "Apply service-layer and MVC patterns"
    ],
    topics: [
      "MVC Architecture",
      "Service Layer Pattern",
      "Event-Driven Node.js (EventEmitter)",
      "Streams & Buffers"
    ]
  },
  {
    title: "Express Security & Middleware",
    learningObjectives: [
      "Secure Express APIs against common threats",
      "Build reusable, composable middleware"
    ],
    topics: [
      "Rate Limiting (express-rate-limit)",
      "Helmet.js Security Headers",
      "Input Sanitization (express-validator)",
      "Custom Global Error Middleware"
    ]
  },
  {
    title: "MongoDB Advanced",
    learningObjectives: [
      "Write complex MongoDB queries and aggregations",
      "Optimize database performance"
    ],
    topics: [
      "Aggregation Pipeline",
      "Indexing Strategies",
      "Population & Virtuals",
      "MongoDB Transactions"
    ]
  },
  {
    title: "Authentication Deep Dive",
    learningObjectives: [
      "Implement production-grade auth with refresh tokens",
      "Handle OAuth2 social login"
    ],
    topics: [
      "Refresh Token Pattern",
      "OAuth2 & Social Login (Passport.js)",
      "Role-Based Access Control (RBAC)",
      "Session vs JWT Trade-offs"
    ]
  },
  {
    title: "REST API Design",
    learningObjectives: [
      "Design clean, versioned, and documented REST APIs",
      "Implement pagination and filtering"
    ],
    topics: [
      "RESTful Conventions & Best Practices",
      "API Versioning (/v1, /v2)",
      "Swagger / OpenAPI Documentation",
      "Pagination, Filtering & Sorting"
    ]
  },
  {
    title: "Testing MERN Apps",
    learningObjectives: [
      "Write unit and integration tests",
      "Test both React components and Express routes"
    ],
    topics: [
      "Jest & React Testing Library",
      "Supertest for API Testing",
      "Mocking Services & Modules",
      "CI Testing Pipelines"
    ]
  },
  {
    title: "DevOps & CI/CD",
    learningObjectives: [
      "Set up automated CI/CD for a MERN app",
      "Deploy with proper environment management"
    ],
    topics: [
      "GitHub Actions CI/CD Pipeline",
      "Docker Basics for Node.js",
      "Environment Strategy (dev / staging / prod)",
      "Monitoring & Logging (PM2, Winston)"
    ]
  }
];

const Advanced = [
  {
    title: "Microservices Architecture",
    learningObjectives: [
      "Decompose a monolith into microservices",
      "Handle inter-service communication patterns"
    ],
    topics: [
      "Microservices vs Monolith Trade-offs",
      "REST vs gRPC Communication",
      "API Gateway Pattern",
      "Service Discovery & Registry"
    ]
  },
  {
    title: "GraphQL with Node.js",
    learningObjectives: [
      "Build and consume a GraphQL API",
      "Implement real-time subscriptions"
    ],
    topics: [
      "GraphQL Schema Design",
      "Apollo Server & Resolvers",
      "DataLoader (N+1 Problem)",
      "GraphQL Subscriptions"
    ]
  },
  {
    title: "WebSockets & Real-time Features",
    learningObjectives: [
      "Build real-time features with Socket.io",
      "Handle rooms, namespaces, and auth"
    ],
    topics: [
      "Socket.io Server & Client Setup",
      "Real-time Notifications",
      "Chat Application with Rooms",
      "WebSocket Authentication"
    ]
  },
  {
    title: "Redis & Caching",
    learningObjectives: [
      "Cache API responses and sessions with Redis",
      "Implement pub/sub messaging patterns"
    ],
    topics: [
      "Redis Data Structures",
      "API Response Caching",
      "Session Storage with Redis",
      "Redis Pub/Sub for Events"
    ]
  },
  {
    title: "Advanced MongoDB",
    learningObjectives: [
      "Leverage advanced MongoDB features",
      "Design schemas for high-traffic workloads"
    ],
    topics: [
      "Atlas Search (Full-Text Search)",
      "GridFS for File Storage",
      "Change Streams",
      "Multi-Document Transactions"
    ]
  },
  {
    title: "Security Hardening",
    learningObjectives: [
      "Protect against OWASP Top 10 vulnerabilities",
      "Implement security best practices at scale"
    ],
    topics: [
      "OWASP Top 10 Mitigations",
      "NoSQL Injection Prevention",
      "XSS & CSRF Protection",
      "Security Auditing Basics"
    ]
  },
  {
    title: "Containerization with Docker",
    learningObjectives: [
      "Containerize the full MERN stack",
      "Orchestrate services with Docker Compose"
    ],
    topics: [
      "Dockerfile for Node.js & React",
      "Docker Compose (Full Stack)",
      "Multi-Stage Builds",
      "Container Networking"
    ]
  },
  {
    title: "Kubernetes for MERN",
    learningObjectives: [
      "Deploy a MERN app on Kubernetes",
      "Manage scaling, rolling updates, and ingress"
    ],
    topics: [
      "Kubernetes Concepts (Pods, Services, Deployments)",
      "ReplicaSets & Rolling Updates",
      "Ingress & Load Balancing",
      "Helm Charts"
    ]
  },
  {
    title: "Observability & Monitoring",
    learningObjectives: [
      "Instrument production apps with metrics and traces",
      "Set up dashboards and alerting"
    ],
    topics: [
      "Structured Logging (Winston / Pino)",
      "Prometheus & Grafana",
      "Distributed Tracing (OpenTelemetry)",
      "Error Tracking with Sentry"
    ]
  },
  {
    title: "System Design & Architecture",
    learningObjectives: [
      "Design scalable MERN systems under load",
      "Apply architectural patterns and trade-off analysis"
    ],
    topics: [
      "Horizontal Scaling Strategies",
      "Event-Driven Architecture (BullMQ)",
      "CQRS & Event Sourcing Introduction",
      "Architecture Reviews & Trade-offs"
    ]
  }
];

module.exports = { Beginner, Intermediate, Advanced };
