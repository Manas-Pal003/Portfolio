// 

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { AIChatRoom } from "./AIChatRoom";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("https://formsubmit.co/ajax/957bd0149a166f07b500e479e56c4b50", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `New Portfolio Message from ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
          _captcha: "false",
        }),
      });

      const data = await res.json();
      if (!res.ok || data.success === "false" || data.success === false) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setErrorMessage(err?.message || "Failed to send. Try again");
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        bg-transparent
        px-6
        py-24
        md:py-32
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[350px]
          w-[350px]
          rounded-full
          bg-purple-500/5
          blur-[130px]
          dark:bg-purple-500/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[350px]
          w-[350px]
          rounded-full
          bg-cyan-500/5
          blur-[130px]
          dark:bg-cyan-500/10
        "
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* MAIN HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <h2
            className="
              max-w-4xl
              text-4xl
              font-extrabold
              leading-[1.05]
              tracking-tight
              text-foreground
              sm:text-6xl
              md:text-7xl
            "
          >
            Let's build something{" "}
            <span
              className="
                bg-gradient-to-r
                from-purple-500
                via-pink-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              great together.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-7
              text-muted-foreground
              sm:text-lg
            "
          >
            Have a project in mind or want to collaborate? Feel free to reach
            out. I'm always open to discussing new ideas and opportunities.
          </p>
        </motion.div>

        {/* CONTACT AREA */}
        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-12
            lg:grid-cols-2
            lg:items-stretch
          "
        >
          {/* LEFT SIDE: AI CHATROOM */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="w-full h-full flex flex-col"
          >
            <AIChatRoom />
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="w-full h-full flex flex-col"
          >
            <div
              className="
                h-[600px]
                flex
                flex-col
                justify-between
                rounded-2xl
                border
                border-border
                bg-card
                p-6
                shadow-sm
                sm:p-8
                dark:bg-white/[0.025]
              "
            >
              <div>
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-foreground
                  "
                >
                  Send Me a Message
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-muted-foreground
                  "
                >
                  Tell me a little about your project.
                </p>
              </div>

              <form
                className="flex-1 flex flex-col justify-between pt-6 space-y-4"
                onSubmit={handleSubmit}
              >
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-foreground
                    "
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-border
                      bg-background
                      px-4
                      text-sm
                      text-foreground
                      outline-none
                      placeholder:text-muted-foreground
                      transition-all
                      duration-200
                      focus:border-purple-400
                      focus:ring-2
                      focus:ring-purple-500/10
                    "
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-foreground
                    "
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-border
                      bg-background
                      px-4
                      text-sm
                      text-foreground
                      outline-none
                      placeholder:text-muted-foreground
                      transition-all
                      duration-200
                      focus:border-cyan-400
                      focus:ring-2
                      focus:ring-cyan-500/10
                    "
                  />
                </div>

                {/* MESSAGE */}
                <div className="flex-1 flex flex-col min-h-[140px]">
                  <label
                    htmlFor="message"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-foreground
                    "
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello, I'd like to talk about..."
                    required
                    className="
                      flex-1
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-border
                      bg-background
                      px-4
                      py-3
                      text-sm
                      leading-6
                      text-foreground
                      outline-none
                      placeholder:text-muted-foreground
                      transition-all
                      duration-200
                      focus:border-purple-400
                      focus:ring-2
                      focus:ring-purple-500/10
                    "
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    ${
                      status === "sent"
                        ? "bg-emerald-600 shadow-emerald-500/25"
                        : status === "error"
                        ? "bg-rose-600 shadow-rose-500/25"
                        : "bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30"
                    }
                  `}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : status === "sent" ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Message Sent!</span>
                    </>
                  ) : status === "error" ? (
                    <span className="text-xs sm:text-sm text-center px-1">
                      {errorMessage.toLowerCase().includes("activation")
                        ? "Check email & click Activate Form!"
                        : errorMessage || "Failed to send. Try again"}
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send
                        size={16}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};