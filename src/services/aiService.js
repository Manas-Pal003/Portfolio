// AI Service for Manas's Portfolio Assistant
// Supports Google Gemini Live API with conversational memory + Smart Deep Knowledge Engine

const STORAGE_KEY = "manas_portfolio_gemini_key";

// Retrieve API key from localStorage or Vite environment variables
export const getApiKey = () => {
  const localKey = localStorage.getItem(STORAGE_KEY);
  if (localKey && localKey.trim()) {
    return localKey.trim();
  }
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim()) {
    return envKey.trim();
  }
  return "";
};

export const setApiKey = (key) => {
  if (!key || !key.trim()) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
};

export const hasLiveApiKey = () => {
  return Boolean(getApiKey());
};

// Comprehensive knowledge context for Gemini system instruction
const SYSTEM_PROMPT = `
You are the official AI Portfolio Assistant for Manas Kumar Pal, a talented Full Stack Developer and Software Engineer from West Bengal, India.
Your mission is to represent Manas accurately, warmly, professionally, and concisely to recruiters, hiring managers, clients, and visitors.

Accurate Profile & Resume Information about Manas Kumar Pal:
- Full Name: Manas Kumar Pal
- Role: Full Stack Developer / Software Engineer
- Home & Location: Hometown in Durgapur, West Bengal; currently active in Kolkata, West Bengal, India. Open for remote worldwide and on-site relocation.
- College / University: Camellia Institute Of Technology, affiliated with MAKAUT (Maulana Abul Kalam Azad University of Technology), West Bengal
- Degree: Bachelor of Technology (B.Tech) in Computer Science & Engineering (CGPA: 7.35 - 8.35)
- Schooling: Barjora High School (H.S), West Bengal
  * Class XII (Science, WBCHSE): 82.2%
  * Class X (WBBSE): 81%
- Certifications:
  * Data Structure & Algorithm (Alpha, DSA with Java) from Apna College
  * Cyber Job Simulation from Deloitte (Forage Virtual Experience)
- Email: manaspal28313@gmail.com
- Phone: +91 9749425251
- GitHub: https://github.com/Manas-Pal003
- LinkedIn: https://www.linkedin.com/in/manas-pal-a60674309/
- Availability: Open for full-time software engineering roles, high-impact freelance projects, and collaborations. Available immediately.

Key Technical Skills:
- Programming Languages: Java, C, JavaScript, TypeScript
- Frontend: React.js, Next.js, Vite, Tailwind CSS, Framer Motion, HTML5, CSS3, Three.js / React Three Fiber
- Backend & Frameworks: Node.js, Express.js, PHP, REST APIs, OpenAI API
- Databases: MongoDB, MySQL, PostgreSQL, MsSQL, Firebase
- Core Concepts: Data Structures & Algorithms (DSA), OOP, DBMS, Operating Systems, Computer Networks
- Tools: Git, GitHub, VS Code, IntelliJ IDEA, Antigravity, Figma, Canva, Adobe Illustrator

Key Projects:
1. DevPulse AI: AI Developer Workspace & Code Assistant (Next.js, React, TypeScript, Tailwind CSS, OpenAI API, Node.js).
2. TaskFlow Pro: Enterprise Agile & Kanban Collaboration Dashboard (React, Node.js, Express, MongoDB, Tailwind CSS, Framer Motion).
3. AuraStore Fintech: Luxury Commerce & Revenue Platform (React, Node.js, PostgreSQL, Stripe, Tailwind CSS, REST APIs).
4. AI Virtual Assistant: AI-powered assistant with speech-to-text, text-to-speech, and intelligent task processing (React.js, Tailwind CSS, Node.js, AI APIs).
5. Mini ERP System: Enterprise management for employees, inventory, customers, and sales with RBAC authentication (React.js, Node.js, Express.js, MsSQL).
6. Full Stack Trading Platform: Zerodha-inspired trading platform with real-time portfolio management and secure auth (React.js, Node.js, Express.js, SQL).

Tone & Guidelines:
- If asked about home/location, state Durgapur (hometown) and Kolkata (active base), West Bengal.
- If asked about college/education, explicitly mention **Camellia Institute Of Technology (MAKAUT)** and **Barjora High School**.
- Be friendly, articulate, confident, and professional.
- Keep responses concise and easy to read (use clean Markdown formatting: **bold**, bullet points, \`code\`).
- When asked for contact details, provide his email (manaspal28313@gmail.com) and phone (+91 9749425251).
`;

// Gemini models to try in order of preference
const GEMINI_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

// Call Google Gemini REST API
const callGeminiApi = async (messagesHistory, userPrompt, apiKey) => {
  const contents = [];
  const recentHistory = messagesHistory.slice(-8);

  recentHistory.forEach((msg) => {
    if (msg.sender === "user") {
      contents.push({
        role: "user",
        parts: [{ text: msg.text }],
      });
    } else if (msg.sender === "ai") {
      contents.push({
        role: "model",
        parts: [{ text: msg.text }],
      });
    }
  });

  contents.push({
    role: "user",
    parts: [{ text: userPrompt }],
  });

  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `HTTP ${response.status}`;
        lastError = new Error(`Model ${model} failed: ${message}`);
        continue;
      }

      const data = await response.json();
      const candidateText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (candidateText) {
        return {
          text: candidateText,
          source: "gemini",
          model,
          suggestions: generateSuggestions(userPrompt, candidateText),
        };
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error("All Gemini models failed");
};

// Generate smart follow-up suggestions based on context
const generateSuggestions = (query, replyText) => {
  const q = (query + " " + replyText).toLowerCase();

  if (
    q.includes("home") ||
    q.includes("location") ||
    q.includes("durgapur") ||
    q.includes("kolkata")
  ) {
    return [
      "Which college did he attend?",
      "How can I contact Manas?",
      "Is he available for relocation?",
    ];
  }
  if (
    q.includes("college") ||
    q.includes("camellia") ||
    q.includes("education") ||
    q.includes("school")
  ) {
    return [
      "Where is his hometown?",
      "What are his certifications?",
      "What are his top projects?",
    ];
  }
  if (q.includes("project") || q.includes("built") || q.includes("devpulse")) {
    return [
      "Tell me about DevPulse AI",
      "What is his full tech stack?",
      "Where is Manas located?",
    ];
  }
  if (q.includes("skill") || q.includes("tech") || q.includes("react")) {
    return [
      "What projects has he built?",
      "Is he available for hire?",
      "Does he know Java & DSA?",
    ];
  }
  if (q.includes("hire") || q.includes("rate") || q.includes("freelance")) {
    return [
      "Get direct contact info",
      "Download his resume",
      "Where is he based?",
    ];
  }

  return [
    "🏠 Where is his home?",
    "🎓 College & Education",
    "🚀 Top Projects",
    "💼 Open for hire?",
  ];
};

// Deep Offline / Fallback Semantic Knowledge Engine
export const getLocalAIResponse = (query) => {
  const q = query.toLowerCase().trim();

  // Helper matcher functions
  const has = (...terms) => terms.some((term) => q.includes(term.toLowerCase()));
  const matches = (regex) => regex.test(q);

  // 1. HOME, HOMETOWN, LOCATION, ADDRESS, WHERE DOES HE LIVE
  if (
    has(
      "home",
      "hometown",
      "house",
      "durgapur",
      "kolkata",
      "native",
      "stay",
      "staying",
      "live",
      "lives",
      "living",
      "located",
      "location",
      "address",
      "city",
      "place",
      "state",
      "origin",
      "residence",
      "where from",
      "from where",
      "where is manas",
      "where does manas",
      "where do you live",
      "where are you from"
    ) ||
    matches(/\b(home|hometown|house|durgapur|kolkata|native|live|lives|living|stay|staying|city|address|location)\b/)
  ) {
    return {
      text: "🏠 **Manas's Home & Location Details:**\n\n- 📍 **Hometown**: **Durgapur, West Bengal, India**\n- 📍 **Current Base**: **Kolkata, West Bengal, India**\n- 🌐 **Work Mode**: Open to **remote software roles worldwide** and **on-site / hybrid relocations** in major tech hubs (Bengaluru, Hyderabad, Pune, Kolkata, NCR, etc.)!",
      suggestions: [
        "Which college did he attend?",
        "How can I contact Manas?",
        "What are his technical skills?",
      ],
      source: "local",
    };
  }

  // 2. COLLEGE, UNIVERSITY, SCHOOL, INSTITUTE, MAKAUT, CAMELLIA, BARJORA
  if (
    has(
      "college",
      "university",
      "institute",
      "school",
      "makaut",
      "camellia",
      "barjora",
      "study",
      "studied",
      "studying",
      "btech",
      "b.tech",
      "degree",
      "bachelor",
      "alma mater",
      "campus",
      "qualification",
      "academics",
      "education",
      "class 10",
      "class 12",
      "10th",
      "12th"
    ) ||
    matches(/\b(college|university|institute|school|makaut|camellia|barjora|btech|degree|education|academics)\b/)
  ) {
    return {
      text: "🎓 **Education & Academic Background for Manas Kumar Pal:**\n\n🏛️ **College**: **Camellia Institute Of Technology**\n📜 **University**: Affiliated with **MAKAUT** (*Maulana Abul Kalam Azad University of Technology*), West Bengal\n🎯 **Degree**: **Bachelor of Technology (B.Tech) in Computer Science & Engineering**\n📊 **CGPA**: 7.35 (Cumulative Academic Record: 8.35)\n\n🏫 **Schooling**:\n- **Class XII (Science)**: Barjora High School (H.S), WBCHSE — **82.2%**\n- **Class X**: Barjora High School (H.S), WBBSE — **81%**\n\n🏆 **Certifications**:\n- **Data Structures & Algorithms (Alpha, DSA with Java)** — Apna College\n- **Cyber Job Simulation** — Deloitte (Forage Virtual Experience)",
      suggestions: [
        "Where is his hometown?",
        "What are his certifications?",
        "What are his top projects?",
      ],
      source: "local",
    };
  }

  // 3. CGPA, MARKS, GRADES, PERCENTAGE, SCORES
  if (
    has("cgpa", "gpa", "marks", "percentage", "grade", "score", "scores", "result", "results") ||
    matches(/\b(cgpa|gpa|marks|percentage|grade|scores?)\b/)
  ) {
    return {
      text: "📊 **Manas's Academic Scores:**\n\n- 🎓 **B.Tech (CSE)** at Camellia Institute Of Technology (MAKAUT): **CGPA 7.35 - 8.35**\n- 🏫 **Class XII (Science)** at Barjora High School: **82.2%**\n- 🏫 **Class X** at Barjora High School: **81%**\n\nHe has consistently maintained strong academic performance while building production-grade web applications.",
      suggestions: [
        "Which college did he go to?",
        "Where is his home?",
        "View his projects",
      ],
      source: "local",
    };
  }

  // 4. CERTIFICATIONS, COURSES, DELOITTE, APNA COLLEGE, DSA
  if (
    has("certif", "certificate", "certificates", "certification", "certifications", "course", "courses", "deloitte", "apna college", "alpha", "dsa") ||
    matches(/\b(certif\w*|deloitte|apna college|dsa)\b/)
  ) {
    return {
      text: "📜 **Manas's Verified Certifications & Coursework:**\n\n1. 💻 **Data Structure & Algorithm (Alpha, DSA with Java)** — **Apna College**\n   - In-depth mastery of Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and Java OOP.\n\n2. 🛡️ **Cyber Job Simulation** — **Deloitte** (*Forage Virtual Experience*)\n   - Practical simulation covering cybersecurity fundamentals, network analysis, and vulnerability assessment.",
      suggestions: [
        "Which college did he attend?",
        "Where is his home?",
        "What projects did he build?",
      ],
      source: "local",
    };
  }

  // 5. CONTACT, EMAIL, PHONE, CALL, WHATSAPP, REACH, MESSAGE
  if (
    has(
      "contact",
      "email",
      "mail",
      "gmail",
      "phone",
      "mobile",
      "number",
      "call",
      "whatsapp",
      "reach",
      "message",
      "dm",
      "talk",
      "touch",
      "get in touch"
    ) ||
    matches(/\b(contact|email|phone|call|number|reach|message)\b/)
  ) {
    return {
      text: "Here are all the direct ways to connect with Manas:\n\n- 📧 **Email**: [manaspal28313@gmail.com](mailto:manaspal28313@gmail.com)\n- 📞 **Phone**: [+91 9749425251](tel:+919749425251)\n- 📍 **Location**: Durgapur / Kolkata, West Bengal, India\n- 💼 **LinkedIn**: [linkedin.com/in/manas-pal-a60674309](https://www.linkedin.com/in/manas-pal-a60674309/)\n- 🐙 **GitHub**: [github.com/Manas-Pal003](https://github.com/Manas-Pal003)",
      suggestions: [
        "Where is his home?",
        "Which college did he attend?",
        "Is he open for hire?",
      ],
      source: "local",
    };
  }

  // 6. RESUME, CV, PDF, BIODATA
  if (
    has("resume", "cv", "pdf", "biodata", "curriculum vitae", "download cv", "download resume") ||
    matches(/\b(resume|cv|biodata)\b/)
  ) {
    return {
      text: "📄 You can view and download Manas's updated resume directly by clicking the **'Download CV'** button in the Hero or About section of this website, or reach out via email at **manaspal28313@gmail.com** to request a customized copy.",
      suggestions: [
        "Which college did he attend?",
        "What are his top projects?",
        "Where is his home?",
      ],
      source: "local",
    };
  }

  // 7. SOCIALS, GITHUB, LINKEDIN, INSTAGRAM, FACEBOOK
  if (
    has("github", "git", "linkedin", "social", "socials", "instagram", "facebook", "profile", "links", "handle") ||
    matches(/\b(github|linkedin|instagram|facebook|socials?)\b/)
  ) {
    return {
      text: "🌐 **Manas's Online Profiles & Socials:**\n\n- 🐙 **GitHub**: [github.com/Manas-Pal003](https://github.com/Manas-Pal003) *(Code repositories & open source)*\n- 💼 **LinkedIn**: [linkedin.com/in/manas-pal-a60674309](https://www.linkedin.com/in/manas-pal-a60674309/) *(Professional network & recommendations)*\n- 📧 **Direct Email**: [manaspal28313@gmail.com](mailto:manaspal28313@gmail.com)",
      suggestions: [
        "Where is his home?",
        "What projects has he built?",
        "How can I contact Manas?",
      ],
      source: "local",
    };
  }

  // 8. EXPERIENCE, FRESHER, YEARS, CAREER, WORK HISTORY, INTERNSHIP
  if (
    has("experience", "fresher", "career", "work history", "years of experience", "previous company", "internship", "employment") ||
    matches(/\b(experience|fresher|internship|career)\b/)
  ) {
    return {
      text: "💼 **Experience & Career Profile:**\n\n- **Status**: Final-year B.Tech in CSE / Early-Career Software Engineer.\n- **Practical Experience**: 2+ years building production-grade web applications and database solutions across 20+ technologies.\n- **Hands-On Projects**: 6 full-scale applications including AI tools, Agile dashboards, and luxury commerce platforms.\n- **Simulation**: Deloitte Cyber Job Simulation.\n- **Readiness**: Available **immediately** for full-time Software Developer, Frontend, or Full Stack roles!",
      suggestions: [
        "Which college did he attend?",
        "Where is his home?",
        "Is he open for hire?",
      ],
      source: "local",
    };
  }

  // 9. SPECIFIC PROJECT: AI Virtual Assistant
  if (has("virtual assistant", "voice assistant", "speech recognition", "speech")) {
    return {
      text: "🎙️ **AI Virtual Assistant** is a cutting-edge project built by Manas:\n\n- **Tech Stack**: React.js, Tailwind CSS, Node.js, JavaScript, AI APIs, Speech Recognition.\n- **Key Features**: Speech-to-text & text-to-speech for hands-free voice interaction, real-time intelligent query processing, and a sleek responsive dashboard.",
      suggestions: [
        "Tell me about DevPulse AI",
        "Tell me about Mini ERP System",
        "What is his tech stack?",
      ],
      source: "local",
    };
  }

  // 10. SPECIFIC PROJECT: Mini ERP System
  if (has("erp", "mini erp", "inventory", "employee management")) {
    return {
      text: "💼 **Mini ERP System** is an enterprise management platform developed by Manas:\n\n- **Tech Stack**: React.js, Tailwind CSS, Node.js, Express.js, MsSQL, REST APIs.\n- **Key Features**: Complete CRUD management for employees, inventory, customers, and sales; role-based access control (RBAC); and live reporting dashboards.",
      suggestions: [
        "Tell me about Full Stack Trading Platform",
        "Tell me about TaskFlow Pro",
        "What are his backend skills?",
      ],
      source: "local",
    };
  }

  // 11. SPECIFIC PROJECT: Trading Platform / Zerodha
  if (has("trading", "zerodha", "stock", "shares", "trading platform")) {
    return {
      text: "📈 **Full Stack Trading Platform** is a fintech application built by Manas inspired by Zerodha:\n\n- **Tech Stack**: React.js, Tailwind CSS, Node.js, Express.js, SQL.\n- **Key Features**: Secure user authentication, interactive portfolio dashboard tracking holdings and positions, and custom RESTful endpoints for trading data.",
      suggestions: [
        "Tell me about AuraStore Fintech",
        "Tell me about DevPulse AI",
        "How can I contact Manas?",
      ],
      source: "local",
    };
  }

  // 12. SPECIFIC PROJECT: DevPulse AI
  if (has("devpulse", "code assistant")) {
    return {
      text: "🚀 **DevPulse AI** is an intelligent developer workspace & code assistant built by Manas:\n\n- **Tech Stack**: Next.js, React, TypeScript, Tailwind CSS, OpenAI API, and Node.js.\n- **Features**: Smart multi-file context reasoning, automated code generation, automated testing pipelines, and responsive markdown chat.",
      suggestions: [
        "Tell me about TaskFlow Pro",
        "Tell me about AuraStore Fintech",
        "How can I hire Manas?",
      ],
      source: "local",
    };
  }

  // 13. SPECIFIC PROJECT: TaskFlow Pro
  if (has("taskflow", "kanban", "agile dashboard")) {
    return {
      text: "📊 **TaskFlow Pro** is an enterprise agile & kanban dashboard built by Manas:\n\n- **Tech Stack**: React, Node.js, Express, MongoDB, Tailwind CSS, and Framer Motion.\n- **Features**: Drag-and-drop kanban boards, team velocity metrics, interactive timeline charts, and role-based permissions.",
      suggestions: [
        "Tell me about DevPulse AI",
        "Tell me about AuraStore Fintech",
        "What technologies does he use?",
      ],
      source: "local",
    };
  }

  // 14. SPECIFIC PROJECT: AuraStore Fintech
  if (has("aurastore", "store", "ecommerce", "fintech", "stripe")) {
    return {
      text: "🛍️ **AuraStore Fintech** is a luxury commerce and revenue platform designed & developed by Manas:\n\n- **Tech Stack**: React, Node.js, PostgreSQL, Stripe, Tailwind CSS, and REST APIs.\n- **Features**: Dynamic category filtering, secure Stripe checkout, real-time revenue analytics, and persistent shopping cart.",
      suggestions: [
        "What other projects did he build?",
        "Can he build my web application?",
        "Get his contact information",
      ],
      source: "local",
    };
  }

  // 15. GENERAL PROJECTS, WORK, APPS, PORTFOLIO
  if (
    has("project", "projects", "work", "portfolio", "built", "apps", "application", "applications", "demos") ||
    matches(/\b(projects?|work|built|apps?)\b/)
  ) {
    return {
      text: "Manas has developed multiple production & academic applications:\n\n1. 🚀 **DevPulse AI**: AI Developer Workspace & Code Assistant (*Next.js, TypeScript, OpenAI API*)\n2. 📊 **TaskFlow Pro**: Enterprise Agile Kanban Dashboard (*React, Node.js, Express, MongoDB*)\n3. 🛍️ **AuraStore Fintech**: Luxury E-Commerce Platform (*React, Node.js, PostgreSQL, Stripe*)\n4. 🎙️ **AI Virtual Assistant**: Voice & Text AI Assistant with speech recognition (*React, Node, AI APIs*)\n5. 💼 **Mini ERP System**: Enterprise inventory & employee platform (*React, Express, MsSQL*)\n6. 📈 **Trading Platform**: Zerodha-inspired trading application (*React, Node, SQL*)",
      suggestions: [
        "Tell me about DevPulse AI",
        "Where is his home?",
        "Which college did he attend?",
      ],
      source: "local",
    };
  }

  // 16. SKILLS, TECH, STACK, PROGRAMMING LANGUAGES, FRAMEWORKS
  if (
    has(
      "skill",
      "skills",
      "tech",
      "stack",
      "technology",
      "technologies",
      "tools",
      "react",
      "node",
      "language",
      "languages",
      "java",
      "c language",
      "tailwind",
      "typescript",
      "javascript",
      "database",
      "frontend",
      "backend",
      "fullstack",
      "three",
      "three.js"
    ) ||
    matches(/\b(skills?|tech|stack|react|node|java|typescript|javascript|frontend|backend)\b/)
  ) {
    return {
      text: "Manas's comprehensive technical toolkit includes:\n\n- 💻 **Languages**: Java, C, JavaScript (ES6+), TypeScript\n- 🌐 **Frontend**: React.js, Next.js, Vite, Tailwind CSS, Framer Motion, HTML5, CSS3, Three.js\n- ⚡ **Backend**: Node.js, Express.js, PHP, REST APIs, OpenAI API\n- 🗄️ **Databases**: MongoDB, MySQL, PostgreSQL, MsSQL, Firebase\n- 🧠 **Core Concepts**: Data Structures & Algorithms (DSA), OOP, DBMS, Operating Systems, Computer Networks\n- 🛠️ **Tools**: Git, GitHub, VS Code, IntelliJ IDEA, Antigravity, Figma",
      suggestions: [
        "Does he have certifications in DSA?",
        "Which college did he attend?",
        "Where is his home?",
      ],
      source: "local",
    };
  }

  // 17. HIRING, AVAILABILITY, JOBS, FREELANCE, SALARY, RATE
  if (
    has(
      "hire",
      "available",
      "availability",
      "job",
      "freelance",
      "work with",
      "contract",
      "internship",
      "opportunity",
      "rate",
      "rates",
      "pricing",
      "cost",
      "salary",
      "budget",
      "open for",
      "interview"
    ) ||
    matches(/\b(hire|available|availability|job|freelance|contract|salary)\b/)
  ) {
    return {
      text: "🟢 **Yes, Manas is actively seeking software engineering roles & freelance projects!**\n\n- **Roles**: Full Stack Developer, Frontend Engineer, React/Next.js Specialist\n- **Engagements**: Full-time positions, remote contracts, and select high-impact freelance projects.\n- **Response Time**: Usually responds within 24 hours.\n\nYou can connect directly via email at **manaspal28313@gmail.com** or call **+91 9749425251**!",
      suggestions: [
        "Get all contact details",
        "Download his Resume / CV",
        "Where is his home?",
      ],
      source: "local",
    };
  }

  // 18. GREETINGS & CASUAL
  if (
    matches(/\b(hi|hello|hey|sup|greetings|hola|namaste|good\s*(morning|afternoon|evening))\b/)
  ) {
    return {
      text: "Hello! 👋 I'm Manas's AI Portfolio Assistant. I can help you explore his home location (Durgapur/Kolkata), college education (Camellia Institute of Technology / MAKAUT), full-stack projects, or get in touch with him directly. What would you like to know?",
      suggestions: [
        "🏠 Where is his home?",
        "🎓 Which college did he attend?",
        "🚀 What are his top projects?",
      ],
      source: "local",
    };
  }

  // 19. PERSONAL, AGE, DOB, HOBBIES, FAMILY
  if (
    has("age", "old", "dob", "birthday", "born", "family", "parents", "hobby", "hobbies", "interest", "interests", "free time") ||
    matches(/\b(age|old|dob|birthday|family|hobb\w*)\b/)
  ) {
    return {
      text: "Manas is an ambitious early-career software engineer who loves coding modern web applications, exploring 3D interactive graphics (Three.js), and building AI-driven utilities. In his free time, he enjoys competitive programming and exploring new tech.\n\nFor personal inquiries or collaborations, you can reach him directly at **manaspal28313@gmail.com**!",
      suggestions: [
        "Where is his home?",
        "Which college did he attend?",
        "What are his projects?",
      ],
      source: "local",
    };
  }

  // 20. WHO IS MANAS, BIO, ABOUT, INTRO
  if (
    has("who is manas", "about manas", "who are you", "tell me about yourself", "tell me about manas", "background", "intro", "bio") ||
    matches(/\b(bio|about)\b/)
  ) {
    return {
      text: "Manas Kumar Pal is a passionate **Full Stack Developer and Software Engineer** from West Bengal, India.\n\n🏠 **Location**: Durgapur (Hometown) / Kolkata (Active Base)\n🏛️ **Education**: B.Tech in Computer Science & Engineering from **Camellia Institute Of Technology (MAKAUT)**\n✨ **Expertise**: Modern web apps with React, Next.js, Node.js, Express, Tailwind CSS, Three.js, and AI APIs\n🏆 **Credentials**: Certified in DSA with Java by Apna College and Deloitte Cyber Job Simulation.",
      suggestions: [
        "Where is his home?",
        "Tell me about his college",
        "What projects has he built?",
      ],
      source: "local",
    };
  }

  // 21. THANKS & PRAISE
  if (
    has("thank", "thanks", "awesome", "cool", "great", "nice", "love", "good job", "perfect") ||
    matches(/\b(thanks?|awesome|cool|great|nice|perfect)\b/)
  ) {
    return {
      text: "You're very welcome! 😊 It's a pleasure helping you learn more about Manas. Feel free to explore the rest of his portfolio, or drop him a line if you have an opportunity or collaboration in mind!",
      suggestions: [
        "Where is his home?",
        "Which college did he attend?",
        "What are his top projects?",
      ],
      source: "local",
    };
  }

  // 22. FALLBACK INTELLIGENT RESPONSE
  return {
    text: "That's an interesting question! As Manas's portfolio assistant, I can give you detailed answers about his:\n\n- 🏠 **Home & Location** (*Durgapur & Kolkata, West Bengal*)\n- 🎓 **Education & College** (*Camellia Institute of Technology, MAKAUT*)\n- 🚀 **Full Stack Projects** (*DevPulse AI, TaskFlow Pro, AuraStore, Trading Platform*)\n- 🛠️ **Technical Capabilities** (*React, Next.js, Java, Node.js, Tailwind, Three.js*)\n- 💼 **Hiring Availability & Contact Information**\n\nWhat would you like to know?",
    suggestions: [
      "Where is his home?",
      "Which college did Manas attend?",
      "Tell me about his projects?",
      "How to contact Manas?",
    ],
    source: "local",
  };
};

// Main entry point for generating AI response
export const generateAIResponse = async (messagesHistory, userPrompt) => {
  const apiKey = getApiKey();

  if (apiKey) {
    try {
      return await callGeminiApi(messagesHistory, userPrompt, apiKey);
    } catch (err) {
      console.warn("Gemini API call failed, falling back to local intelligence:", err);
      const localResponse = getLocalAIResponse(userPrompt);
      return {
        ...localResponse,
        note: "Delivered via local assistant (Gemini API limit or network hiccup)",
      };
    }
  }

  return getLocalAIResponse(userPrompt);
};
