// Generative AI Roadmap Templates
// Each week: { title, learningObjectives[], topics[] }

const Beginner = [
  {
    title: "AI Fundamentals",
    learningObjectives: [
      "Distinguish between AI, ML, and Deep Learning",
      "Recognize real-world AI applications"
    ],
    topics: [
      "AI vs ML vs Deep Learning",
      "History & Milestones of AI",
      "Types of Machine Learning (Supervised, Unsupervised, RL)",
      "AI Use Cases Across Industries"
    ]
  },
  {
    title: "Python for AI",
    learningObjectives: [
      "Use Python effectively for AI/ML workflows",
      "Manipulate and visualize data with NumPy, Pandas, and Matplotlib"
    ],
    topics: [
      "Python Data Types, Functions & Control Flow",
      "NumPy Arrays & Operations",
      "Pandas DataFrames & Data Cleaning",
      "Data Visualization with Matplotlib & Seaborn"
    ]
  },
  {
    title: "Machine Learning Basics",
    learningObjectives: [
      "Train and evaluate your first ML models",
      "Understand the ML workflow end-to-end"
    ],
    topics: [
      "Linear & Logistic Regression",
      "Decision Trees & Random Forests",
      "Model Evaluation (Accuracy, Precision, Recall, AUC)",
      "Scikit-learn Workflow (fit, predict, score)"
    ]
  },
  {
    title: "Neural Networks Introduction",
    learningObjectives: [
      "Understand how neural networks learn",
      "Build and train a simple network with PyTorch or TensorFlow"
    ],
    topics: [
      "Perceptrons & Activation Functions",
      "Backpropagation Intuition",
      "Intro to PyTorch / TensorFlow",
      "Training Loop, Loss Functions & Optimizers"
    ]
  },
  {
    title: "Understanding Large Language Models",
    learningObjectives: [
      "Explain what LLMs are and how they work at a high level",
      "Understand tokenization, embeddings, and context windows"
    ],
    topics: [
      "Transformer Architecture (High-Level Overview)",
      "Tokenization & Embeddings",
      "Pre-training vs Fine-tuning",
      "Popular LLMs: GPT, Gemini, Claude, Llama"
    ]
  },
  {
    title: "Prompt Engineering",
    learningObjectives: [
      "Write effective prompts for LLMs",
      "Apply prompting techniques to real-world tasks"
    ],
    topics: [
      "Zero-Shot & Few-Shot Prompting",
      "Chain-of-Thought (CoT) Prompting",
      "System Prompts & Role Instructions",
      "Prompt Templates & Best Practices"
    ]
  },
  {
    title: "Using AI APIs",
    learningObjectives: [
      "Integrate AI APIs into applications",
      "Handle API responses, streaming, and errors"
    ],
    topics: [
      "OpenAI API Setup & Chat Completions",
      "Google Gemini API",
      "Anthropic Claude API",
      "API Rate Limits, Cost Management & Best Practices"
    ]
  },
  {
    title: "Building Simple AI Apps",
    learningObjectives: [
      "Build end-to-end AI-powered applications",
      "Chain prompts and handle context"
    ],
    topics: [
      "Chatbot Application",
      "Text Summarizer",
      "Simple Q&A with Documents",
      "AI Image Generation API (DALL-E, Stability)"
    ]
  },
  {
    title: "AI Ethics & Responsible AI",
    learningObjectives: [
      "Identify AI biases and ethical risks",
      "Apply responsible AI principles in practice"
    ],
    topics: [
      "Bias & Fairness in AI Models",
      "Hallucination & Factual Accuracy",
      "AI Safety Principles",
      "Regulatory Landscape (EU AI Act, NIST AI RMF)"
    ]
  },
  {
    title: "Capstone AI Project",
    learningObjectives: [
      "Design and build a complete AI application",
      "Deploy and present your project"
    ],
    topics: [
      "Project Planning & Scoping",
      "Building the Application (API + UI)",
      "Deployment (Streamlit / Hugging Face Spaces)",
      "Demo, Reflection & Next Steps"
    ]
  }
];

const Intermediate = [
  {
    title: "Transformer Architecture Deep Dive",
    learningObjectives: [
      "Understand self-attention and transformers in depth",
      "Implement transformer components from scratch"
    ],
    topics: [
      "Self-Attention Mechanism (Queries, Keys, Values)",
      "Multi-Head Attention",
      "Positional Encoding",
      "Encoder-Decoder vs Decoder-Only Architecture"
    ]
  },
  {
    title: "Fine-Tuning LLMs",
    learningObjectives: [
      "Fine-tune a pre-trained LLM on custom data",
      "Evaluate and prevent overfitting in fine-tuned models"
    ],
    topics: [
      "Supervised Fine-Tuning (SFT) Pipeline",
      "Dataset Preparation & Instruction Formatting",
      "Hugging Face Trainer API",
      "Evaluation Metrics & Overfitting Prevention"
    ]
  },
  {
    title: "Retrieval-Augmented Generation (RAG)",
    learningObjectives: [
      "Build knowledge-grounded RAG pipelines",
      "Improve factual accuracy with retrieval"
    ],
    topics: [
      "RAG Architecture & Data Flow",
      "Document Loading, Chunking & Preprocessing",
      "Embedding & Cosine Similarity Search",
      "Context Injection & Reranking"
    ]
  },
  {
    title: "LangChain & Orchestration Frameworks",
    learningObjectives: [
      "Build multi-step AI pipelines with LangChain",
      "Manage conversation memory and complex chains"
    ],
    topics: [
      "LangChain Chains & Prompt Templates",
      "Conversation Memory (Buffer, Summary)",
      "Document Q&A Chain",
      "LangChain Expression Language (LCEL)"
    ]
  },
  {
    title: "Vector Databases",
    learningObjectives: [
      "Store and query vector embeddings at scale",
      "Integrate vector DBs into RAG pipelines"
    ],
    topics: [
      "Embeddings & Vector Similarity (Cosine, Dot Product)",
      "Pinecone Setup & Operations",
      "Chroma & Weaviate",
      "Hybrid Search (Keyword + Semantic)"
    ]
  },
  {
    title: "Multi-Modal AI",
    learningObjectives: [
      "Work with text, image, and audio in AI systems",
      "Build multi-modal applications"
    ],
    topics: [
      "Vision LLMs (GPT-4o, Gemini Pro Vision)",
      "Image Generation (DALL-E 3, Stable Diffusion)",
      "Audio AI (Whisper STT, TTS APIs)",
      "Multi-Modal Pipeline Design"
    ]
  },
  {
    title: "AI Agents & Tool Use",
    learningObjectives: [
      "Build autonomous AI agents",
      "Define and execute tools from LLMs"
    ],
    topics: [
      "ReAct Agent Pattern",
      "Function Calling / Tool Use API",
      "LangChain Agents & Toolkits",
      "Agent Memory & State Management"
    ]
  },
  {
    title: "Evaluation & Testing AI Systems",
    learningObjectives: [
      "Systematically evaluate LLM outputs",
      "Use automated evaluation frameworks"
    ],
    topics: [
      "LLM Eval Metrics (BLEU, ROUGE, BERTScore)",
      "Ragas for RAG Evaluation",
      "Human-in-the-Loop Evaluation",
      "A/B Testing AI Features"
    ]
  },
  {
    title: "Deploying AI Applications",
    learningObjectives: [
      "Deploy AI apps to production",
      "Handle latency, cost, and reliability"
    ],
    topics: [
      "FastAPI for AI Backends",
      "Streaming Responses (SSE)",
      "Docker & Cloud Deployment for AI Apps",
      "Cost Optimization & Prompt Caching"
    ]
  },
  {
    title: "Advanced RAG Techniques",
    learningObjectives: [
      "Implement advanced RAG patterns for higher quality",
      "Improve retrieval precision and reduce hallucination"
    ],
    topics: [
      "HyDE (Hypothetical Document Embeddings)",
      "Query Transformation & Decomposition",
      "Contextual Compression & Long-Context Models",
      "Knowledge Graph RAG"
    ]
  }
];

const Advanced = [
  {
    title: "LLM Architecture & Pretraining",
    learningObjectives: [
      "Understand LLM pretraining at a technical depth",
      "Explain scaling laws and their implications"
    ],
    topics: [
      "Causal Language Modeling Objective",
      "Data Curation & Deduplication at Scale",
      "Chinchilla Scaling Laws",
      "FlashAttention & Efficient Attention Variants"
    ]
  },
  {
    title: "RLHF & Alignment Techniques",
    learningObjectives: [
      "Implement RLHF pipeline for model alignment",
      "Understand DPO and modern alignment alternatives"
    ],
    topics: [
      "RLHF Pipeline (SFT → Reward Model → PPO)",
      "Direct Preference Optimization (DPO)",
      "Constitutional AI (CAI)",
      "Alignment Research Landscape"
    ]
  },
  {
    title: "Efficient Fine-Tuning (PEFT)",
    learningObjectives: [
      "Fine-tune LLMs on consumer hardware",
      "Apply parameter-efficient fine-tuning techniques"
    ],
    topics: [
      "LoRA & QLoRA",
      "Adapter Layers & Prefix Tuning",
      "Model Quantization (GGUF, AWQ, GPTQ)",
      "Merging & Exporting Fine-Tuned Models"
    ]
  },
  {
    title: "Production AI Pipelines",
    learningObjectives: [
      "Build production-grade, stateful AI pipelines",
      "Handle complex multi-step agentic workflows"
    ],
    topics: [
      "LangGraph for Stateful Agent Workflows",
      "Custom Tool & Plugin Design",
      "Pipeline Orchestration (Prefect, Airflow)",
      "Async & Streaming AI Pipelines"
    ]
  },
  {
    title: "Multi-Agent Systems",
    learningObjectives: [
      "Design systems with multiple collaborating AI agents",
      "Handle agent coordination and conflict resolution"
    ],
    topics: [
      "Multi-Agent Frameworks (CrewAI, AutoGen, Swarm)",
      "Agent Communication Protocols",
      "Role-Based Agent Design",
      "Evaluation of Multi-Agent Systems"
    ]
  },
  {
    title: "MLOps for AI",
    learningObjectives: [
      "Operationalize AI models at production scale",
      "Monitor model performance and detect drift"
    ],
    topics: [
      "Model Registry & Versioning (MLflow, W&B)",
      "CI/CD for ML (GitHub Actions + DVC)",
      "Feature Stores & Data Pipelines",
      "Model Monitoring & Drift Detection"
    ]
  },
  {
    title: "Distributed LLM Training",
    learningObjectives: [
      "Train large models on multi-GPU and multi-node setups",
      "Apply parallelism strategies efficiently"
    ],
    topics: [
      "Data Parallelism (DDP & FSDP)",
      "Model Parallelism & Pipeline Parallelism",
      "DeepSpeed ZeRO Stages",
      "Cloud Training (GCP, AWS SageMaker)"
    ]
  },
  {
    title: "Research Frontiers",
    learningObjectives: [
      "Read and critically evaluate AI research papers",
      "Stay current with rapidly evolving AI landscape"
    ],
    topics: [
      "Reading AI Papers (ArXiv Workflow)",
      "Mixture of Experts (MoE) Architecture",
      "Long-Context & Memory-Augmented Models",
      "AI Safety & Interpretability Research"
    ]
  },
  {
    title: "AI Inference at Scale",
    learningObjectives: [
      "Architect AI inference infrastructure for high throughput",
      "Optimize for latency, cost, and reliability"
    ],
    topics: [
      "Inference Optimization (vLLM, TensorRT-LLM)",
      "Model Serving Frameworks (Triton, BentoML)",
      "GPU Cluster Management & Scheduling",
      "Cost Engineering & Batching Strategies"
    ]
  },
  {
    title: "Capstone: Production AI System",
    learningObjectives: [
      "Design and ship a complete, scalable AI system",
      "Apply all advanced concepts end-to-end"
    ],
    topics: [
      "System Architecture Design for AI",
      "End-to-End Pipeline Implementation",
      "Observability & Monitoring Setup",
      "Technical Documentation & Demo"
    ]
  }
];

module.exports = { Beginner, Intermediate, Advanced };
