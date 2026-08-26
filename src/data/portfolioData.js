export const portfolioData = {
  availability: {
    enabled: true,
    text: "OPEN TO COLLABORATION"
  },
  hero: {
    name: ["AYAN", "KUMAR", "MONDAL"],
    roles: ["AI / ML DEVELOPER", "FULL-STACK BUILDER", "HACKATHON EXPLORER"],
    description: "I turn problem statements into intelligent products.",
    tags: "AI systems • Full-stack experiences • Rapid prototypes",
    metadata: {
      course: "B.TECH CSE — AI & ML",
      university: "HALDIA INSTITUTE OF TECHNOLOGY",
      batch: "2025 — 2029"
    }
  },
  about: {
    headlines: ["BUILD.", "TEST.", "LEARN.", "REPEAT."],
    paragraphs: [
      "I'm Ayan Kumar Mondal, a second-year B.Tech student specializing in Artificial Intelligence & Machine Learning at Haldia Institute of Technology.",
      "I build practical AI, full-stack and IoT systems and enjoy turning ideas into working prototypes under real time constraints."
    ],
    metadata: {
      "BASED IN": "Tamluk, West Bengal",
      "FOCUS": "Artificial Intelligence & Machine Learning",
      "BATCH": "2025 — 2029"
    }
  },
  capabilities: {
    "LANGUAGES": ["Python", "TypeScript", "JavaScript", "C", "C++"],
    "AI / BACKEND": ["PyTorch", "FastAPI", "OpenCV", "Gemini", "Groq", "Node.js", "REST APIs"],
    "WEB / TOOLS": ["React", "Vite", "Tailwind CSS", "Prisma", "SQLite", "Git", "Docker"],
    "HARDWARE": ["Arduino", "Tinkercad", "Ultrasonic Sensing", "Servo Control"]
  },
  marquee: "AI DEVELOPMENT — MACHINE LEARNING — FULL STACK — COMPUTER VISION — IoT — GENERATIVE AI — ",
  projects: [
    {
      id: "01",
      title: "ENTERPRISE AI INTERVIEWER",
      badge: "48H BUILD",
      techStack: "Python • FastAPI • Gemini • Groq • Docker",
      description: "Co-built an adaptive AI interviewer that grounds questions in candidate learning history, probes answers and produces multi-factor assessment reports.",
      metadata: {
        "TYPE": "GENERATIVE AI",
        "BUILD": "48 HOURS",
        "FOCUS": "AI / BACKEND / PRODUCT"
      },
      caseStudy: {
        overview: "An adaptive, AI-driven technical interviewer designed to eliminate bias and dynamically adjust to candidate responses.",
        problem: "Traditional technical screening is static, heavily biased, and often fails to deeply assess a candidate's practical reasoning.",
        solution: "A dynamic evaluation pipeline powered by large language models that generate context-aware questions and follow-ups based on the candidate's specific background.",
        contribution: "Engineered the core backend pipeline using FastAPI, integrated Groq/Gemini for low-latency inference, and dockerized the application for rapid deployment.",
        challenges: "Managing LLM hallucinations during technical evaluations and optimizing latency for real-time interaction.",
        outcome: "A fully functional prototype built in 48 hours capable of conducting highly realistic, context-aware technical interviews."
      },
      coverImage: "/projects/enterprise-ai-interviewer/cover.webp",
      screenshots: [],
      liveUrl: "",
      githubUrl: "https://github.com/ayankrmondal2003-rgb"
    },
    {
      id: "02",
      title: "SETU",
      subtitle: "TOURISM MARKETPLACE",
      badge: "TEJAS OFFLINE FINALIST",
      techStack: "React • TypeScript • Node.js • Prisma • Gemini • Razorpay",
      description: "A tourism platform combining discovery, local vendors, maps, payments and AI-powered itinerary workflows.",
      metadata: {
        "EVENT": "TEJAS INDIA 2026",
        "STATUS": "24H OFFLINE FINALE",
        "TRACK": "BIHAR TOURISM"
      },
      caseStudy: {
        overview: "A comprehensive digital marketplace connecting tourists with local vendors, guides, and seamless itinerary planning.",
        problem: "Local vendors in growing tourist states struggle to reach wider audiences digitally, while tourists lack unified booking platforms for hyper-local experiences.",
        solution: "A dual-sided marketplace (Setu) offering localized discovery, secure payments, and AI-generated travel itineraries.",
        contribution: "Developed the frontend architecture with React/TypeScript, implemented secure payment gateways, and integrated Gemini for the smart itinerary generator.",
        challenges: "Synchronizing complex state across the vendor dashboard and the tourist-facing app within a 24-hour hackathon window.",
        outcome: "Selected as a finalist for the Tejas India 2026 Offline Finale in the Bihar Tourism track."
      },
      coverImage: "/projects/setu/cover.webp",
      screenshots: [],
      liveUrl: "",
      githubUrl: "https://github.com/ayankrmondal2003-rgb"
    },
    {
      id: "03",
      title: "MEGHDRISHTI",
      badge: "ISRO BAH 2026",
      techStack: "Python • PyTorch • Swin Transformer • FastAPI • Docker",
      description: "A GenAI satellite cloud-removal system for optical satellite imagery using hybrid U-Net, attention and multi-scale GAN components.",
      metadata: {
        "DOMAIN": "GENAI / COMPUTER VISION",
        "TEAM": "TRINOVA",
        "EVENT": "ISRO BHARATIYA ANTARIKSH HACKATHON"
      },
      caseStudy: {
        overview: "An advanced computer vision model aimed at generating cloud-free satellite imagery from obscured optical captures.",
        problem: "Optical satellite images are frequently obscured by cloud cover, severely limiting their utility for continuous earth observation and analysis.",
        solution: "A generative adversarial network (GAN) augmented with Swin Transformers to synthesize highly accurate ground details beneath clouds.",
        contribution: "Designed and trained the hybrid U-Net generator, curated the training dataset, and built the FastAPI inference endpoint.",
        challenges: "Balancing the GAN loss functions to prevent artifact generation and optimizing the model to run inference efficiently.",
        outcome: "A robust proof-of-concept capable of reconstructing ground textures with high fidelity."
      },
      coverImage: "/projects/meghdrishti/cover.webp",
      screenshots: [],
      liveUrl: "",
      githubUrl: "https://github.com/ayankrmondal2003-rgb"
    },
    {
      id: "04",
      title: "PARKINSON'S DISEASE PREDICTION",
      badge: "HACKARENA",
      techStack: "Python • Machine Learning • Predictive Modeling",
      description: "A disease-detection prediction model developed during HackArena at Haldia Institute of Technology.",
      metadata: {
        "DOMAIN": "HEALTHCARE ML",
        "EVENT": "HACKARENA",
        "LOCATION": "HALDIA INSTITUTE OF TECHNOLOGY"
      },
      caseStudy: {
        overview: "A machine learning application built to predict the likelihood of Parkinson's disease based on vocal feature datasets.",
        problem: "Early detection of neurodegenerative diseases is critical but often inaccessible or delayed in traditional medical settings.",
        solution: "A predictive model analyzing dysphonia (vocal impairment) metrics to classify patients with high accuracy.",
        contribution: "Performed exploratory data analysis, feature engineering, and evaluated multiple classification models (SVM, Random Forest) to select the optimal predictor.",
        challenges: "Handling class imbalance in the medical dataset and ensuring high recall to minimize false negatives.",
        outcome: "Successfully deployed a local prototype during the HackArena event."
      },
      coverImage: "/projects/parkinsons/cover.webp",
      screenshots: [],
      liveUrl: "",
      githubUrl: "https://github.com/ayankrmondal2003-rgb"
    }
  ],
  hackathons: [
    {
      year: "2026",
      title: "TEJAS INDIA HACKATHON",
      status: "SELECTED — 24H OFFLINE FINALE",
      description: "Advanced with SETU in the Bihar Tourism track to the offline finale at Government Engineering College, Jamui."
    },
    {
      year: "2026",
      title: "ISRO BHARATIYA ANTARIKSH HACKATHON",
      status: "TEAM TRINOVA",
      description: "Worked on Meghdrishti, a GenAI satellite cloud-removal system."
    },
    {
      year: "2026",
      title: "VICODATHON",
      status: "TEAM VECTOR • 48H BUILD",
      description: "Co-built the adaptive AI technical interviewer."
    },
    {
      year: "2025",
      title: "HACKARENA",
      status: "HALDIA INSTITUTE OF TECHNOLOGY",
      description: "Developed the Parkinson's disease prediction project."
    }
  ],
  education: {
    degree: "BACHELOR OF TECHNOLOGY",
    major: "COMPUTER SCIENCE & ENGINEERING",
    specialization: "ARTIFICIAL INTELLIGENCE & MACHINE LEARNING",
    institute: "HALDIA INSTITUTE OF TECHNOLOGY",
    period: "2025 — 2029",
    status: "SECOND YEAR"
  },
  credentials: [
    {
      id: "C/001",
      title: "The Joy of Computing using Python",
      issuer: "NPTEL",
      year: "2026",
      duration: "12 Weeks",
      credits: "4 Credits",
      period: "Jan — Apr 2026",
      type: "COURSES",
      thumbnail: "/credentials/nptel-python.jpg",
      originalFile: "/credentials/nptel-python-cert.pdf",
      verifyUrl: ""
    },
    {
      id: "C/002",
      title: "The Complete Python Bootcamp: From Zero to Hero in Python",
      issuer: "UDEMY",
      year: "2026",
      type: "COURSES",
      thumbnail: "/credentials/udemy-python.jpg",
      originalFile: "",
      verifyUrl: ""
    },
    {
      id: "C/003",
      title: "Business Communication and Ethics in Organizations",
      issuer: "UDEMY",
      year: "2026",
      duration: "21.5 Hours",
      period: "May 2026",
      type: "COURSES",
      thumbnail: "/credentials/udemy-comm.jpg",
      originalFile: "",
      verifyUrl: ""
    },
    {
      id: "H/001",
      title: "TEJAS INDIA HACKATHON 2026",
      issuer: "TEJAS",
      year: "2026",
      type: "HACKATHONS",
      thumbnail: "/credentials/tejas.jpg",
      originalFile: "",
      verifyUrl: ""
    },
    {
      id: "H/002",
      title: "ISRO BHARATIYA ANTARIKSH HACKATHON",
      issuer: "ISRO",
      year: "2026",
      type: "HACKATHONS",
      thumbnail: "/credentials/isro.jpg",
      originalFile: "",
      verifyUrl: ""
    },
    {
      id: "H/003",
      title: "VICODATHON",
      issuer: "VICODATHON",
      year: "2026",
      type: "HACKATHONS",
      thumbnail: "/credentials/vicodathon.jpg",
      originalFile: "",
      verifyUrl: ""
    },
    {
      id: "H/004",
      title: "HACKARENA",
      issuer: "HIT",
      year: "2025",
      type: "HACKATHONS",
      thumbnail: "/credentials/hackarena.webp",
      originalFile: "",
      verifyUrl: ""
    }
  ],
  github: {
    username: "ayankrmondal2003-rgb",
    repoCount: "7+",
    areas: ["APPLIED AI", "FULL STACK", "IoT", "MACHINE LEARNING", "FRONTEND"]
  },
  exploring: [
    "GENERATIVE AI",
    "COMPUTER VISION",
    "INTELLIGENT WEB EXPERIENCES",
    "AI-POWERED PRODUCTS"
  ],
  contact: {
    email: "ayankr.mondal2003@gmail.com",
    linkedin: "https://linkedin.com/in/ayan-kumar-mondal",
    github: "https://github.com/ayankrmondal2003-rgb",
    location: "Tamluk, West Bengal, India",
    cvUrl: "/Ayan-Kumar-Mondal-CV.jpg"
  }
};
