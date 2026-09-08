import { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Sparkles,
  Send,
  RotateCcw,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// Knowledge base and conversational response engine for Manas AI
const getAIResponse = (query) => {
  const q = query.toLowerCase().trim();

  // Greetings
  if (
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("hey") ||
    q.includes("sup") ||
    q.includes("good morning") ||
    q.includes("good evening")
  ) {
    return {
      text: "Hello there! 👋 I'm Manas's AI Portfolio Assistant. How can I help you today? Feel free to ask about his projects, technical skills, background, or availability for work!",
      suggestions: [
        "What are your top projects?",
        "What tech stack do you use?",
        "Are you open for hire?",
      ],
    };
  }

  // Projects
  if (
    q.includes("project") ||
    q.includes("work") ||
    q.includes("portfolio") ||
    q.includes("built") ||
    q.includes("app") ||
    q.includes("devpulse") ||
    q.includes("taskflow") ||
    q.includes("aurastore")
  ) {
    return {
      text: "Manas has built several high-impact projects:\n\n🚀 **DevPulse AI**: An intelligent developer workspace & code assistant built with Next.js, React, TypeScript, and AI APIs.\n\n📊 **TaskFlow Pro**: An enterprise agile Kanban & collaboration dashboard using React, Node.js, Express, and MongoDB.\n\n🛍️ **AuraStore Fintech**: A luxury commerce and revenue platform built with React, Node.js, PostgreSQL, and Stripe.\n\nYou can explore these in detail in the Projects section above!",
      suggestions: [
        "What technologies do you know?",
        "How can I contact Manas?",
        "Are you available for hire?",
      ],
    };
  }

  // Skills & Technologies
  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("react") ||
    q.includes("framework") ||
    q.includes("code")
  ) {
    return {
      text: "Manas's core technical toolkit covers the modern full-stack ecosystem:\n\n✨ **Frontend**: React.js, Next.js, Vite, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5/CSS3\n⚡ **Backend & Databases**: Node.js, Express, PHP, MySQL, MongoDB, PostgreSQL, Firebase\n🎨 **Design & 3D**: Three.js / React Three Fiber, Figma, Canva, Adobe Illustrator\n🛠️ **DevOps & Tools**: Git, GitHub, VS Code, REST APIs",
      suggestions: [
        "Tell me about your projects",
        "Are you available for work?",
        "What is your education?",
      ],
    };
  }

  // Availability / Hiring / Jobs / Freelance
  if (
    q.includes("hire") ||
    q.includes("available") ||
    q.includes("job") ||
    q.includes("work with") ||
    q.includes("freelance") ||
    q.includes("internship") ||
    q.includes("contract") ||
    q.includes("role") ||
    q.includes("opportunity")
  ) {
    return {
      text: "Yes, absolutely! 🟢 Manas is currently **open for full-time opportunities, high-impact freelance projects, and collaborations** as a Frontend or Full Stack Developer.\n\nHe responds quickly to new project inquiries and job opportunities. You can fill out the contact form on the right or reach him directly via email at manaspal28313@gmail.com!",
      suggestions: [
        "Give me your contact info",
        "What are your top projects?",
        "Tell me about your tech stack",
      ],
    };
  }

  // Contact / Email / Phone / Location
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("reach") ||
    q.includes("call") ||
    q.includes("location") ||
    q.includes("where") ||
    q.includes("address")
  ) {
    return {
      text: "Here are all the ways to get in touch with Manas:\n\n📧 **Email**: manaspal28313@gmail.com\n📞 **Phone**: +91 9749425251\n📍 **Location**: Kolkata, West Bengal, India\n💼 **LinkedIn**: linkedin.com/in/manas-pal-a60674309\n🐙 **GitHub**: github.com/Manas-Pal003\n\nOr feel free to send a message directly using the form on the right!",
      suggestions: [
        "Are you open for hire?",
        "What projects have you finished?",
      ],
    };
  }

  // Education / Bio / Background / About
  if (
    q.includes("who are you") ||
    q.includes("about") ||
    q.includes("manas") ||
    q.includes("education") ||
    q.includes("college") ||
    q.includes("cgpa") ||
    q.includes("degree") ||
    q.includes("background")
  ) {
    return {
      text: "Manas Pal is a passionate Full Stack Developer and Creative Technologist based in Kolkata, India. He holds a strong academic record (CGPA: 8.35) in Computer Science and has delivered 3+ full-scale web applications using over 20 modern technologies.\n\nHe loves building scalable web applications with delightful user interfaces, 3D animations, and smooth performance.",
      suggestions: [
        "What are your top skills?",
        "What projects have you finished?",
        "How can I contact Manas?",
      ],
    };
  }

  // Resume / CV
  if (q.includes("resume") || q.includes("cv")) {
    return {
      text: "You can download Manas's updated Resume/CV directly from the Hero or About sections above (look for the 'Download CV' button), or send him an email at manaspal28313@gmail.com to request the latest version!",
      suggestions: [
        "Are you available for hire?",
        "What are your top skills?",
      ],
    };
  }

  // Thanks / Appreciation
  if (
    q.includes("thank") ||
    q.includes("awesome") ||
    q.includes("cool") ||
    q.includes("great") ||
    q.includes("nice")
  ) {
    return {
      text: "You're very welcome! 😊 If you have any project ideas or want to discuss collaborating, don't hesitate to drop a message in the form on the right. Have a fantastic day!",
      suggestions: [
        "What projects have you built?",
        "How can I contact Manas?",
      ],
    };
  }

  // Fallback intelligent response
  return {
    text: `That's an interesting question! While I am Manas's dedicated portfolio AI, I can best assist you with his web development projects, skills (React, Node, Three.js, etc.), availability for hire, or contact information.\n\nWould you like to explore any of these topics, or send Manas a message directly?`,
    suggestions: [
      "Tell me about your projects",
      "What are your top skills?",
      "How do I contact Manas?",
      "Are you available for work?",
    ],
  };
};

export const AIChatRoom = () => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'info'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi! 👋 I'm Manas's AI Assistant. Ask me anything about his projects, tech stack, experience, or hire availability!",
      time: "Just now",
      suggestions: [
        "🚀 Top Projects",
        "🛠️ Tech Stack",
        "💼 Open for hire?",
        "📬 Contact details",
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const chatContainerRef = useRef(null);
  const isInitialMount = useRef(true);
  const nextIdRef = useRef(10);

  // Auto-scroll within the chat container only when messages update (prevents page jump on refresh)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (activeTab === "chat" && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, activeTab]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    const userMessage = {
      id: nextIdRef.current++,
      sender: "user",
      text: query,
      time: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setIsTyping(true);

    // Simulate natural AI thinking time (400ms - 800ms)
    setTimeout(() => {
      const response = getAIResponse(query);
      const aiMessage = {
        id: nextIdRef.current++,
        sender: "ai",
        text: response.text,
        suggestions: response.suggestions,
        time: "Just now",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: nextIdRef.current++,
        sender: "ai",
        text: "Conversation reset! 👋 What would you like to know about Manas?",
        time: "Just now",
        suggestions: [
          "🚀 Top Projects",
          "🛠️ Tech Stack",
          "💼 Open for hire?",
          "📬 Contact details",
        ],
      },
    ]);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("manaspal28313@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative flex flex-col h-[600px] w-full overflow-hidden rounded-3xl border border-purple-500/20 bg-card/60 backdrop-blur-xl shadow-2xl shadow-purple-950/10">
      {/* Glow backgrounds */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-36 w-36 rounded-full bg-purple-500/15 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-36 w-36 rounded-full bg-cyan-500/15 blur-2xl" />

      {/* CHAT TERMINAL HEADER */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/80 bg-background/50 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 text-white shadow-md shadow-purple-500/20">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-foreground">
                Manas AI
              </span>
              <span className="rounded-md bg-purple-500/10 px-1.5 py-0.2 text-[10px] font-semibold text-purple-500 dark:text-purple-300">
                Agent
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>Ask anything about Manas</span>
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Reset */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center rounded-xl border border-border/80 bg-background/80 p-0.5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
                activeTab === "chat"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-3 w-3" />
              <span>AI Chat</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1 transition-all ${
                activeTab === "info"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="h-3 w-3" />
              <span>Info</span>
            </button>
          </div>

          {activeTab === "chat" && (
            <button
              type="button"
              onClick={handleResetChat}
              title="Reset conversation"
              aria-label="Reset conversation"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 text-muted-foreground transition-all hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-400"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: AI CHATROOM VIEW */}
      {activeTab === "chat" && (
        <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
          {/* Messages Scroll Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-5 space-y-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`flex gap-2.5 max-w-[88%] sm:max-w-[80%] ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Sender Avatar */}
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gradient-to-br from-purple-500 to-cyan-500 text-white shadow-sm"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="h-3.5 w-3.5" />
                    ) : (
                      <Bot className="h-3.5 w-3.5" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/20 rounded-tr-sm"
                        : "bg-background/80 border border-border/80 text-foreground backdrop-blur-sm shadow-sm rounded-tl-sm whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>

                {/* Suggestions / Prompt chips for AI message */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2.5 ml-9 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(sug.replace(/^[^\w]+/, ""))}
                        className="rounded-full border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 text-[11px] font-medium text-purple-600 transition-all hover:border-purple-400 hover:bg-purple-500/15 dark:text-purple-300"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 text-white">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border/80 bg-background/80 px-4 py-2.5 text-xs text-muted-foreground backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400 [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px]">Manas AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* CHAT INPUT FORM */}
          <div className="border-t border-border/80 bg-background/40 p-3 backdrop-blur-md">
            <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-background/80 px-3 py-1.5 transition-all focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-500/10">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, hire availability..."
                className="w-full bg-transparent text-xs sm:text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputVal.trim() || isTyping}
                aria-label="Send message"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all ${
                  inputVal.trim() && !isTyping
                    ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-500/25 hover:scale-105 active:scale-95"
                    : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
                }`}
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
              Powered by Manas's Portfolio Knowledge Assistant
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: DIRECT CONTACT INFO VIEW */}
      {activeTab === "info" && (
        <div className="relative z-10 flex flex-1 flex-col overflow-y-auto no-scrollbar p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Direct Contact
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Prefer direct outreach? You can reach Manas anytime via email, phone, or social profiles.
            </p>
          </div>

          <div className="space-y-4">
            {/* EMAIL */}
            <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-background/50 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-muted-foreground">Email</p>
                  <a
                    href="mailto:manaspal28313@gmail.com"
                    className="text-xs font-medium text-foreground hover:text-purple-500 transition-colors"
                  >
                    manaspal28313@gmail.com
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-purple-500 hover:border-purple-400"
                title="Copy email"
              >
                {copiedEmail ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            {/* PHONE */}
            <div className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/50 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-muted-foreground">Phone</p>
                <a
                  href="tel:+919749425251"
                  className="text-xs font-medium text-foreground hover:text-cyan-500 transition-colors"
                >
                  +91 9749425251
                </a>
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-3 rounded-2xl border border-border/80 bg-background/50 p-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-muted-foreground">Location</p>
                <p className="text-xs font-medium text-foreground">
                  Kolkata, West Bengal, India
                </p>
              </div>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="pt-2">
            <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-2.5">
              Social Profiles
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/Manas-Pal003"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground hover:text-purple-400 hover:border-purple-400 hover:-translate-y-0.5 transition-all"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/manas-pal-a60674309/"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground hover:text-blue-400 hover:border-blue-400 hover:-translate-y-0.5 transition-all"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground hover:text-pink-400 hover:border-pink-400 hover:-translate-y-0.5 transition-all"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground hover:text-blue-500 hover:border-blue-500 hover:-translate-y-0.5 transition-all"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Back to chat button */}
          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/30 py-2.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-all"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Switch to AI Chatroom</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AIChatRoom;
