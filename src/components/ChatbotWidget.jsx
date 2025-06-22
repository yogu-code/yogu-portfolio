'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Bot, User, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
// Import highlight.js styles for code syntax highlighting
import 'highlight.js/styles/github.css';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const inactivityTimerRef = useRef(null);
  const router = useRouter();

  const INACTIVITY_TIMEOUT = 120000; // 2 minutes in milliseconds
  const INACTIVITY_CHECK_INTERVAL = 10000; // Check every 10 seconds

  const messagesEndRef = useRef(null);

  // Function to fetch bot response from the API
  const fetchBotResponse = async (userMessage) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_CHATBOT_BACKEND;
      console.log('API URL:', backendUrl);
      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.reply; // Expecting Markdown-formatted response
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return 'Sorry, I encountered an error while processing your request.';
    }
  };

  // Function to handle sending a message
  const handleSend = async () => {
    if (input.trim() === '') return;

    // Record user activity
    recordUserActivity();

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setBotTyping(true);

    setTimeout(async () => {
      const botResponse = await fetchBotResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
      setBotTyping(false);
    }, 1000);
  };

  // Function to send inactivity message
  const sendInactivityMessage = () => {
    const lastMessage = messages[messages.length - 1];
    if (
      !isOpen ||
      !lastMessage ||
      (lastMessage.sender === 'bot' &&
        lastMessage.text.includes('Are you still there?'))
    ) {
      return;
    }

    const inactivityMessage = `
Are you still there? I'm here to help!
`;
    setMessages((prev) => [...prev, { text: inactivityMessage, sender: 'bot' }]);
  };

  // Record user activity
  const recordUserActivity = () => {
    setLastActivityTime(Date.now());
  };

  // Set up inactivity timer
  useEffect(() => {
    if (isOpen) {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }

      inactivityTimerRef.current = setInterval(() => {
        const now = Date.now();
        if (now - lastActivityTime >= INACTIVITY_TIMEOUT) {
          sendInactivityMessage();
          setLastActivityTime(now);
        }
      }, INACTIVITY_CHECK_INTERVAL);
    } else {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    }

    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [isOpen, lastActivityTime, messages]);

  // Add event listeners for user activity
  useEffect(() => {
    const handleActivity = () => {
      if (isOpen) {
        recordUserActivity();
      }
    };

    window.addEventListener('keydown', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    return () => {
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
    };
  }, [isOpen]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, botTyping]);

  // Handle chat button click
  const handleChatButtonClick = () => {
    recordUserActivity();
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Widget Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 border border-gray-100 overflow-hidden bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 animate-gradient shadow-xl flex flex-col
                       bottom-16 right-4 w-11/12 h-4/5 rounded-2xl
                       sm:bottom-20 sm:right-6 sm:w-80 sm:h-96 sm:max-h-[32rem]
                       md:w-96 md:h-[28rem]
                       lg:w-[32rem]"
            onClick={recordUserActivity}
          >
            {/* Content container */}
            <div className="flex flex-col h-full">
              {/* Heading */}
              <div className="px-4 pt-4 pb-2 sm:px-5 sm:pt-6 sm:pb-3">
                <div className="flex items-center mb-2">
                  <div className="bg-white p-2 rounded-2xl shadow-sm mr-3">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  </div>
                  <div>
                    <h1 className="text-base sm:text-lg font-semibold text-gray-800">TomoBot</h1>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-auto bg-white p-1.5 sm:p-2 rounded-full transition-all duration-200 hover:bg-gray-100 shadow-sm"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 px-3 py-2 sm:px-4 sm:py-3 overflow-y-auto space-y-3 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => {
                    const isUser = msg.sender === 'user';

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="flex-shrink-0 mt-1 bg-white p-1.5 rounded-full shadow-sm">
                            <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 rounded-2xl max-w-[75%] sm:max-w-[85%] text-xs leading-relaxed shadow-sm ${
                            isUser
                              ? 'bg-purple-500 text-white'
                              : 'bg-white text-gray-700'
                          }`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight, rehypeSanitize]}
                            components={{
                              code({ node, inline, className, children, ...props }) {
                                return inline ? (
                                  <code className="bg-gray-100 px-1 rounded text-red-600" {...props}>
                                    {children}
                                  </code>
                                ) : (
                                  <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                                    <code className={className} {...props}>
                                      {children}
                                    </code>
                                  </pre>
                                );
                              },
                              a({ href, children }) {
                                return (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                  >
                                    {children}
                                  </a>
                                );
                              },
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                        {isUser && (
                          <div className="flex-shrink-0 mt-1 bg-purple-500 p-1.5 rounded-full shadow-sm">
                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {botTyping && (
                  <div className="flex items-start gap-2 justify-start">
                    <div className="flex-shrink-0 mt-1 bg-white p-1.5 rounded-full shadow-sm">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                    </div>
                    <div className="flex space-x-1.5 px-3 py-2 rounded-2xl max-w-[75%] sm:max-w-[85%] text-xs bg-white text-gray-700 shadow-sm">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-0"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Field */}
              <div className="p-3 sm:p-4 border-t border-gray-100">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      recordUserActivity();
                    }}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-gray-100 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-transparent transition-all duration-200 shadow-sm"
                  />
                  <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-xl transition-colors duration-200 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <div className="fixed z-50 bottom-4 right-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleChatButtonClick}
          className="bg-white p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-100"
        >
          {isOpen ? (
            <X className="w-4 h-4 text-gray-600" />
          ) : (
            <Bot className="w-5 h-5 text-purple-500" />
          )}
        </motion.button>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(203, 213, 224, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: transparent;
          border-radius: 10px;
        }
        .custom-scrollbar {
          scroll-behavior: smooth;
        }
        .delay-0 {
          animation-delay: 0ms;
        }
        .delay-150 {
          animation-delay: 150ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }

        /* Gradient Animation */
        @keyframes gradientBG {
          0% {
            background: linear-gradient(45deg, #d8b4fe, #e9d5ff, #e9d5ff);
          }
          50% {
            background: linear-gradient(45deg, #c084fc, #ddd6fe, #c084fc);
          }
          100% {
            background: linear-gradient(45deg, #d8b4fe, #e9d5ff, #e9d5ff);
          }
        }

        .animate-gradient {
          animation: gradientBG 5s ease infinite;
        }

        /* Markdown-specific styles */
        .markdown-content {
          line-height: 1.5;
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          font-weight: 600;
          margin: 0.5em 0;
        }
        .markdown-content ul,
        .markdown-content ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
        }
        .markdown-content li {
          margin-bottom: 0.25em;
        }
        .markdown-content a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .markdown-content code {
          font-family: 'Courier New', Courier, monospace;
        }
        .markdown-content pre {
          background-color: #f7fafc;
          padding: 0.5em;
          border-radius: 0.5em;
          overflow-x: auto;
        }
      `}</style>
    </>
  );
}