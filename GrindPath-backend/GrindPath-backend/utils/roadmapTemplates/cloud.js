// Cloud Computing Roadmap Templates
// Each week: { title, learningObjectives[], topics[] }

const Beginner = [
  {
    title: "Cloud Computing Fundamentals",
    learningObjectives: [
      "Understand cloud computing concepts and service models",
      "Identify the benefits and shared responsibility of cloud"
    ],
    topics: [
      "What is Cloud Computing & Why It Matters",
      "IaaS, PaaS, SaaS Service Models",
      "Public, Private & Hybrid Cloud",
      "Cloud Benefits & Shared Responsibility Model"
    ]
  },
  {
    title: "Cloud Provider Setup",
    learningObjectives: [
      "Set up a cloud account and navigate the console",
      "Understand global infrastructure concepts"
    ],
    topics: [
      "AWS / GCP / Azure Account Setup",
      "Console Navigation & Basic IAM",
      "Regions, Availability Zones & Edge Locations",
      "Free Tier, Cost Alerts & Budget Setup"
    ]
  },
  {
    title: "Compute Services",
    learningObjectives: [
      "Launch and manage virtual machines in the cloud",
      "Configure basic compute networking and security"
    ],
    topics: [
      "EC2 / Compute Engine / Azure VMs",
      "Instance Types, Sizing & AMIs",
      "SSH Key Pairs & Connecting to Instances",
      "Auto Scaling Groups Introduction"
    ]
  },
  {
    title: "Storage Services",
    learningObjectives: [
      "Store and retrieve data in cloud object storage",
      "Understand different cloud storage types"
    ],
    topics: [
      "S3 / Cloud Storage Buckets (Create, Upload, Access)",
      "Object Lifecycle Policies & Storage Classes",
      "Static Website Hosting on S3",
      "Block vs Object vs File Storage"
    ]
  },
  {
    title: "Cloud Networking Basics",
    learningObjectives: [
      "Set up isolated cloud networks for secure communication",
      "Configure subnets, routing, and security rules"
    ],
    topics: [
      "VPC / Virtual Network Setup",
      "Public & Private Subnets",
      "Security Groups & Network ACLs",
      "NAT Gateway & Internet Gateway"
    ]
  },
  {
    title: "Managed Database Services",
    learningObjectives: [
      "Deploy managed relational and NoSQL databases",
      "Configure backups, scaling, and connection pooling"
    ],
    topics: [
      "Amazon RDS / Cloud SQL (PostgreSQL, MySQL)",
      "DynamoDB / Firestore (Serverless NoSQL)",
      "Automated Backups & Point-in-Time Recovery",
      "Read Replicas & Multi-AZ Deployments"
    ]
  },
  {
    title: "IAM & Cloud Security Basics",
    learningObjectives: [
      "Manage cloud access with IAM roles and policies",
      "Apply least-privilege access principles"
    ],
    topics: [
      "Users, Groups & Roles",
      "IAM Policies & Permission Boundaries",
      "Service Accounts & Federated Identity",
      "MFA, Access Keys & Credential Best Practices"
    ]
  },
  {
    title: "Serverless Computing",
    learningObjectives: [
      "Build event-driven applications with serverless functions",
      "Trigger functions from cloud events and HTTP"
    ],
    topics: [
      "AWS Lambda / Cloud Functions / Azure Functions",
      "Event Triggers (S3, API Gateway, Pub/Sub)",
      "Function Deployment, Logging & Debugging",
      "Serverless Use Cases & Cold Start Optimization"
    ]
  },
  {
    title: "Cost Management",
    learningObjectives: [
      "Monitor and understand cloud spending",
      "Apply cost optimization strategies"
    ],
    topics: [
      "Cost Explorer & Billing Dashboard",
      "Resource Tagging Strategy",
      "Reserved vs On-Demand vs Spot Instances",
      "Cloud Cost Optimization Best Practices"
    ]
  },
  {
    title: "Deploy a Web Application on Cloud",
    learningObjectives: [
      "Deploy a complete web application on cloud infrastructure",
      "Configure DNS, SSL, and load balancing"
    ],
    topics: [
      "Application Architecture on Cloud (Frontend + Backend + DB)",
      "Application Load Balancer Setup",
      "Custom Domain & SSL Certificate (ACM)",
      "End-to-End Deployment Walkthrough"
    ]
  }
];

const Intermediate = [
  {
    title: "Infrastructure as Code with Terraform",
    learningObjectives: [
      "Provision cloud resources declaratively with Terraform",
      "Manage state and build reusable modules"
    ],
    topics: [
      "Terraform Providers, Resources & Data Sources",
      "State Files, Remote Backends & Locking",
      "Modules & Reusability",
      "Terraform Plan, Apply, Destroy & Import"
    ]
  },
  {
    title: "CI/CD Pipelines on Cloud",
    learningObjectives: [
      "Automate build, test, and deploy workflows",
      "Integrate CI/CD with cloud deployment targets"
    ],
    topics: [
      "GitHub Actions for Cloud Deployments",
      "AWS CodePipeline / Cloud Build / Azure DevOps",
      "Environment Secrets & Secure Variables",
      "Blue-Green & Rolling Deployments"
    ]
  },
  {
    title: "Container Services",
    learningObjectives: [
      "Deploy containerized applications to managed cloud services",
      "Manage container registries and service scaling"
    ],
    topics: [
      "AWS ECS / Google Cloud Run / Azure Container Apps",
      "ECR / Artifact Registry / ACR",
      "Task Definitions & Service Auto-Scaling",
      "Container Health Checks & Logging"
    ]
  },
  {
    title: "Kubernetes on Cloud (Managed)",
    learningObjectives: [
      "Deploy and manage workloads on managed Kubernetes",
      "Handle scaling, updates, and storage"
    ],
    topics: [
      "EKS / GKE / AKS Cluster Setup",
      "Kubernetes Manifests (Deployment, Service, Ingress)",
      "Horizontal Pod Autoscaler (HPA)",
      "Persistent Volumes & Storage Classes"
    ]
  },
  {
    title: "Advanced Cloud Networking",
    learningObjectives: [
      "Design secure multi-tier network architectures",
      "Connect on-premises to cloud environments"
    ],
    topics: [
      "VPC Peering & Transit Gateway",
      "Site-to-Site VPN & Direct Connect / ExpressRoute",
      "Route Tables & Traffic Engineering",
      "WAF, Shield & DDoS Protection"
    ]
  },
  {
    title: "Cloud Monitoring & Logging",
    learningObjectives: [
      "Observe cloud infrastructure and application health",
      "Set up dashboards, alerts, and log analysis"
    ],
    topics: [
      "CloudWatch / Cloud Monitoring / Azure Monitor",
      "Centralized Log Aggregation (CloudWatch Logs Insights)",
      "Custom Metrics & Dashboards",
      "Alerting, On-Call & Incident Management"
    ]
  },
  {
    title: "Cloud Security & Compliance",
    learningObjectives: [
      "Harden cloud environments against threats",
      "Implement security controls for compliance"
    ],
    topics: [
      "Security Hub & GuardDuty / Security Command Center",
      "Encryption at Rest & In Transit (KMS)",
      "VPC Flow Logs & CloudTrail Audit",
      "Compliance Frameworks (SOC 2, ISO 27001, HIPAA)"
    ]
  },
  {
    title: "High Availability & Disaster Recovery",
    learningObjectives: [
      "Design highly available, fault-tolerant cloud architectures",
      "Implement and test disaster recovery strategies"
    ],
    topics: [
      "Multi-AZ & Multi-Region Architecture",
      "RTO & RPO Planning",
      "Backup & Restore Strategies (Snapshot, Cross-Region)",
      "Chaos Engineering Introduction"
    ]
  },
  {
    title: "Microservices on Cloud",
    learningObjectives: [
      "Deploy and orchestrate microservices in the cloud",
      "Handle service discovery, messaging, and resilience"
    ],
    topics: [
      "API Gateway for Microservices",
      "Asynchronous Messaging (SQS / Pub/Sub / Service Bus)",
      "Circuit Breaker Pattern on Cloud",
      "Service Mesh Introduction (AWS App Mesh)"
    ]
  },
  {
    title: "Cloud Architecture Patterns",
    learningObjectives: [
      "Apply cloud architecture patterns and frameworks",
      "Review and trade-off architectural decisions"
    ],
    topics: [
      "Well-Architected Framework (6 Pillars)",
      "Event-Driven Architecture on Cloud",
      "Strangler Fig & Anti-Corruption Layer Patterns",
      "Architecture Decision Records (ADRs)"
    ]
  }
];

const Advanced = [
  {
    title: "Multi-Cloud & Hybrid Cloud",
    learningObjectives: [
      "Design systems spanning multiple cloud providers",
      "Implement unified management and observability"
    ],
    topics: [
      "Multi-Cloud Strategy & Trade-offs",
      "Anthos / Azure Arc (Unified Control Plane)",
      "Cross-Cloud Networking & Connectivity",
      "Unified Observability Across Clouds"
    ]
  },
  {
    title: "Advanced Kubernetes",
    learningObjectives: [
      "Extend Kubernetes with custom resources",
      "Manage complex workloads with operators and Helm"
    ],
    topics: [
      "Custom Resource Definitions (CRDs)",
      "Kubernetes Operators (Build & Deploy)",
      "Helm Chart Development & Repository",
      "Advanced Scheduling (Affinity, Taints, Node Selectors)"
    ]
  },
  {
    title: "Service Mesh with Istio",
    learningObjectives: [
      "Implement service-to-service security and observability",
      "Control traffic with Istio policies"
    ],
    topics: [
      "Istio Architecture (Control Plane, Data Plane)",
      "mTLS & Service Identity",
      "Traffic Management (VirtualServices, DestinationRules)",
      "Observability with Kiali, Jaeger & Prometheus"
    ]
  },
  {
    title: "Cloud-Native Application Design",
    learningObjectives: [
      "Design applications built for cloud environments",
      "Apply 12-Factor App and CNCF best practices"
    ],
    topics: [
      "12-Factor App Principles",
      "Stateless Application Design",
      "Externalized Configuration & Feature Flags",
      "Graceful Shutdown, Health Probes & Readiness"
    ]
  },
  {
    title: "Enterprise Cloud Security",
    learningObjectives: [
      "Implement zero-trust and enterprise-grade cloud security",
      "Detect, respond to, and recover from cloud threats"
    ],
    topics: [
      "Zero Trust Architecture on Cloud",
      "Cloud Security Posture Management (CSPM)",
      "Cloud Penetration Testing (Pacu, ScoutSuite)",
      "Incident Response Playbooks & Runbooks"
    ]
  },
  {
    title: "Data Engineering on Cloud",
    learningObjectives: [
      "Build cloud-native data pipelines at scale",
      "Design lakehouse architectures"
    ],
    topics: [
      "AWS Glue / Dataflow / Azure Data Factory (ETL/ELT)",
      "Data Lakes & Lakehouse Architecture (Delta, Iceberg)",
      "BigQuery / Redshift / Synapse Analytics",
      "Streaming Pipelines (Kinesis / Pub/Sub / Event Hubs)"
    ]
  },
  {
    title: "ML Pipelines on Cloud",
    learningObjectives: [
      "Build and automate ML workflows in the cloud",
      "Deploy and monitor ML models at scale"
    ],
    topics: [
      "SageMaker / Vertex AI / Azure ML Pipelines",
      "Feature Engineering & Feature Stores",
      "Model Deployment & A/B Testing",
      "MLflow on Cloud & Model Registry"
    ]
  },
  {
    title: "FinOps & Cloud Cost Engineering",
    learningObjectives: [
      "Systematically optimize cloud costs",
      "Implement FinOps culture and tooling"
    ],
    topics: [
      "FinOps Framework & Principles",
      "Cost Allocation, Tagging & Chargeback",
      "Savings Plans & Reserved Instance Optimization",
      "Rightsizing, Waste Elimination & Spot Fleet"
    ]
  },
  {
    title: "Chaos Engineering & Resilience",
    learningObjectives: [
      "Test system resilience through controlled chaos experiments",
      "Build and validate fault-tolerant architectures"
    ],
    topics: [
      "Chaos Engineering Principles (Steady State Hypothesis)",
      "AWS Fault Injection Simulator / Gremlin",
      "Game Days, Runbooks & Post-Mortems",
      "Blast Radius Control & Rollback Strategies"
    ]
  },
  {
    title: "Cloud Architecture Capstone",
    learningObjectives: [
      "Design a complete, production-grade cloud-native system",
      "Prepare for cloud architect certifications"
    ],
    topics: [
      "End-to-End Architecture Design (Security, Cost, HA)",
      "Well-Architected Framework Review",
      "Cloud Cost Analysis & Optimization Report",
      "Certification Prep (AWS SAA-C03, GCP ACE, AZ-104)"
    ]
  }
];

module.exports = { Beginner, Intermediate, Advanced };
