// 

import { useState } from "react";
import {
  Send,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";

import { motion } from "framer-motion";
import { AIChatRoom } from "./AIChatRoom";

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("manaspal28313@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
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
            Have a project in mind or want to collaborate?
            Feel free to reach out. I'm always open to
            discussing new ideas and opportunities.
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


              <form className="flex-1 flex flex-col justify-between pt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>

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
                    placeholder="Your Name"
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
                    placeholder="Your Email"
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
                    placeholder="Hello, I'd like to talk about..."
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
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-purple-600
                    via-pink-500
                    to-cyan-500
                    px-6
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-purple-500/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:shadow-purple-500/30
                  "
                >
                  Send Message

                  <Send
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </button>

              </form>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};