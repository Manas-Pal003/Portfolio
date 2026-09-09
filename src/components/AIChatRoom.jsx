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
  Key,
  Settings,
  X,
  ExternalLink,
  Cpu,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  generateAIResponse,
  getApiKey,
  setApiKey,
  hasLiveApiKey,
} from "../services/aiService";

// Formats inline markdown: [links](url), **bold**, `code`, *italic*
const formatInlineText = (str) => {
  if (!str) return null;
  const tokens = [];
  let remaining = str;

  while (remaining.length > 0) {
    // Markdown link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      tokens.push(
        <a
          key={tokens.length}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline font-medium inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      tokens.push(
        <strong key={tokens.length} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Inline Code: `text`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      tokens.push(
        <code
          key={tokens.length}
          className="rounded bg-purple-500/10 px-1.5 py-0.5 text-[11px] font-mono text-purple-300 border border-purple-500/20"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      tokens.push(
        <em key={tokens.length} className="italic text-muted-foreground">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Regular characters until next markdown symbol
    const nextSpecial = remaining.search(/\[|\*\*|`|\*/);
    if (nextSpecial === -1) {
      tokens.push(remaining);
      remaining = "";
    } else if (nextSpecial === 0) {
      tokens.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      tokens.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return tokens;
};

// Formats message block (lists, paragraphs, and inline markdown)
const FormattedMessage = ({ content }) => {
  if (!content) return null;
  const lines = content.split("\n");
  const elements = [];
  let currentList = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="my-1.5 space-y-1 list-disc pl-4 text-xs sm:text-sm text-foreground/90"
        >
          {currentList.map((item, i) => (
            <li key={i}>{formatInlineText(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      currentList.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s+/, ""));
    } else {
      flushList();
      if (trimmed === "") {
        elements.push(<div key={`gap-${idx}`} className="h-1.5" />);
      } else {
        elements.push(
          <p key={`p-${idx}`} className="text-xs sm:text-sm leading-relaxed">
            {formatInlineText(line)}
          </p>
        );
      }
    }
  });

  flushList();
  return <div className="space-y-1">{elements}</div>;
};

export const AIChatRoom = () => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'info'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi there! 👋 I'm Manas's AI Portfolio Assistant. Ask me anything about his full-stack projects, core technical skills, academic background, or availability for hire!",
      time: "Just now",
      suggestions: [
        "🎓 College & Education",
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
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  // API Key modal state
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(hasLiveApiKey());
  const [apiKeyInput, setApiKeyInput] = useState(getApiKey());
  const [keyFeedback, setKeyFeedback] = useState("");

  const chatContainerRef = useRef(null);
  const isInitialMount = useRef(true);
  const nextIdRef = useRef(10);

  // Sync API key status on mount
  useEffect(() => {
    setHasApiKey(hasLiveApiKey());
  }, []);

  // Auto-scroll within the chat container only when messages update
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

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    const userMessage = {
      id: nextIdRef.current++,
      sender: "user",
      text: query,
      time: "Just now",
    };

    // Append user message immediately
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputVal("");
    setIsTyping(true);

    try {
      // Call AI Service (Gemini Live API or Deep Local Knowledge Engine)
      const response = await generateAIResponse(updatedMessages, query);

      const aiMessage = {
        id: nextIdRef.current++,
        sender: "ai",
        text: response.text,
        suggestions: response.suggestions || [],
        source: response.source || "local",
        note: response.note || null,
        time: "Just now",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI Response error:", err);
      const errorMessage = {
        id: nextIdRef.current++,
        sender: "ai",
        text: "I ran into a temporary issue processing that request. Please try again, or reach out to Manas directly at manaspal28313@gmail.com!",
        suggestions: ["Top Projects", "Tech Stack", "Contact Info"],
        time: "Just now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
        text: "Conversation reset! 👋 What would you like to know about Manas Kumar Pal?",
        time: "Just now",
        suggestions: [
          "🎓 College & Education",
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

  const handleCopyMessage = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleSaveApiKey = () => {
    setApiKey(apiKeyInput);
    const keyActive = hasLiveApiKey();
    setHasApiKey(keyActive);
    setKeyFeedback(
      keyActive
        ? "Gemini API key saved! Live AI mode activated."
        : "Default Smart Portfolio AI restored."
    );
    setTimeout(() => {
      setKeyFeedback("");
      setIsKeyModalOpen(false);
    }, 1500);
  };

  const handleClearApiKey = () => {
    setApiKey("");
    setApiKeyInput("");
    setHasApiKey(false);
    setKeyFeedback("API key cleared. Default Smart Portfolio AI restored.");
    setTimeout(() => {
      setKeyFeedback("");
      setIsKeyModalOpen(false);
    }, 1500);
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
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">
                Manas AI
              </span>
              {/* Status Badge: Gemini Live vs Local Portfolio AI */}
              <button
                type="button"
                onClick={() => {
                  setApiKeyInput(getApiKey());
                  setIsKeyModalOpen(true);
                }}
                title="Click to configure Gemini API Key"
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold transition-all ${
                  hasApiKey
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                    : "bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20"
                }`}
              >
                {hasApiKey ? (
                  <>
                    <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                    <span>Gemini Live</span>
                  </>
                ) : (
                  <>
                    <Cpu className="h-2.5 w-2.5 text-purple-400" />
                    <span>Portfolio AI</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <span>Ask anything about Manas & his work</span>
            </p>
          </div>
        </div>

        {/* View Switcher Tabs, Key Settings & Reset */}
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
            <>
              {/* API Key settings modal trigger */}
              <button
                type="button"
                onClick={() => {
                  setApiKeyInput(getApiKey());
                  setIsKeyModalOpen(true);
                }}
                title="Configure Gemini API Key"
                aria-label="Configure Gemini API Key"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 text-muted-foreground transition-all hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <Key className="h-3.5 w-3.5" />
              </button>

              {/* Reset Conversation */}
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/80 text-muted-foreground transition-all hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </>
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
                  className={`flex gap-2.5 max-w-[90%] sm:max-w-[85%] ${
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
                  <div className="group relative">
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-600/20 rounded-tr-sm"
                          : "bg-background/80 border border-border/80 text-foreground backdrop-blur-sm shadow-sm rounded-tl-sm"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <p className="whitespace-pre-line">{msg.text}</p>
                      ) : (
                        <FormattedMessage content={msg.text} />
                      )}

                      {/* AI Sub-note if any */}
                      {msg.note && (
                        <p className="mt-2 text-[10px] text-muted-foreground/80 italic border-t border-border/40 pt-1">
                          {msg.note}
                        </p>
                      )}
                    </div>

                    {/* Copy button on AI responses */}
                    {msg.sender === "ai" && (
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        title="Copy message"
                        aria-label="Copy message text"
                        className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 p-1 rounded-md bg-background/90 text-muted-foreground hover:text-foreground border border-border/80 shadow-sm"
                      >
                        {copiedMessageId === msg.id ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Suggestions / Prompt chips for AI message */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-2.5 ml-9 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() =>
                          handleSendMessage(sug.replace(/^[^\w]+/, ""))
                        }
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
                  <span className="ml-1 text-[11px]">
                    {hasApiKey
                      ? "Generating response via Gemini AI..."
                      : "Thinking..."}
                  </span>
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
                placeholder="Ask about projects, tech stack, hiring, or contact..."
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
            <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-muted-foreground">
              {/* <span>
                {hasApiKey ? "⚡ Powered by Google Gemini" : "🤖 Smart Portfolio AI Engine"}
              </span> */}
              {/* <button
                type="button"
                onClick={() => {
                  setApiKeyInput(getApiKey());
                  setIsKeyModalOpen(true);
                }}
                className="text-purple-400 hover:text-purple-300 transition-colors underline"
              >
                {hasApiKey ? "Manage Key" : "Add Gemini Key"}
              </button> */}
            </div>
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

      {/* API KEY SETTINGS MODAL */}
      {isKeyModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
          <div className="w-full max-w-sm rounded-2xl border border-purple-500/30 bg-card p-5 shadow-2xl shadow-purple-950/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-border/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <Key className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">
                  AI Model Settings
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsKeyModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3.5 space-y-3 text-xs">
              <p className="text-muted-foreground leading-relaxed">
                Connect your free <strong className="text-foreground">Google Gemini API key</strong> for unlimited dynamic conversational answers. If not set, the built-in smart portfolio assistant answers automatically.
              </p>

              <div>
                <label className="block text-[11px] font-medium text-foreground mb-1">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full rounded-xl border border-border/80 bg-background/80 px-3 py-2 text-xs text-foreground outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                >
                  <span>Get free key at Google AI Studio</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {keyFeedback && (
                <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-2 text-center text-[11px] font-medium text-purple-300">
                  {keyFeedback}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveApiKey}
                  className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 py-2 text-xs font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
                >
                  Save & Apply
                </button>
                {hasApiKey && (
                  <button
                    type="button"
                    onClick={handleClearApiKey}
                    className="rounded-xl border border-border/80 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatRoom;
