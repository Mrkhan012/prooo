import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personal } from '../data/portfolio';

// A few canned bot replies so the chat feels alive.
const quickReplies = [
  'Tell me about your projects',
  'What tech stack do you use?',
  'Are you available for hire?',
  'How can I contact you?',
];

// Keyword → reply matcher. Kept simple and predictable.
const matchReply = (text) => {
  const t = text.toLowerCase().trim();
  if (!t) return null;
  if (/(hi|hello|hey|hola|hii|heyy)/.test(t))
    return `Hey there 👋 I'm a quick overview of ${personal.firstName}. Ask me anything or hit "Talk to me" to get in touch.`;
  if (/(project|portfolio|work|app)/.test(t))
    return 'I build cross-platform Flutter apps — mobile, web & desktop. Scroll to the Projects section to see a few, or check my GitHub.';
  if (/(stack|tech|flutter|dart|technology|language|framework)/.test(t))
    return 'Primary stack: Flutter / Dart, Clean Architecture, BLoC, REST APIs, Firebase. Also comfortable with React, Node and Python.';
  if (/(hire|hire you|available|job|freelance|work with)/.test(t))
    return `Yes — ${personal.firstName} is currently open to freelance and full-time opportunities. Use the form below or the Contact section to reach out.`;
  if (/(contact|email|phone|whatsapp|reach|talk|message)/.test(t))
    return `You can reach ${personal.firstName} at ${personal.email} or on WhatsApp. The form on the right sends straight to inbox.`;
  if (/(who are you|your name|about you)/.test(t))
    return `I'm a tiny assistant representing ${personal.fullName} — a Software Developer based in ${personal.location}.`;
  if (/(location|where|based|from)/.test(t))
    return `Based in ${personal.location}. Open to remote work worldwide.`;
  if (/(resume|cv)/.test(t))
    return "I don't have a download link wired up here yet — drop a message via the form and I'll share the latest resume.";
  if (/(thank|thanks|ty)/.test(t))
    return "Anytime! 😊";
  return null;
};

const initialMessages = [
  {
    from: 'bot',
    text: `Hi! I'm ${personal.firstName}'s mini assistant.`,
  },
  {
    from: 'bot',
    text: "Want to talk about a project, a job, or just say hi? Pick a quick option or type below 👇",
  },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false); // "Hello!" speech bubble
  const [stage, setStage] = useState('hello'); // hello → askWant → chat
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const listRef = useRef(null);

  // First-time "Hello 👋" pop, then prompt, then open chat.
  useEffect(() => {
    if (open || stage !== 'hello') return;
    const t1 = setTimeout(() => setShowGreeting(true), 1200); // bubble appears
    const t2 = setTimeout(() => {
      setShowGreeting(false);
      setStage('askWant');
    }, 4200); // bubble fades, "Want to talk?" appears
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open, stage]);

  // Auto-scroll messages
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, stage]);

  // Open the chat panel directly when user clicks "Yes, let's talk"
  const acceptTalk = () => {
    setStage('chat');
    setOpen(true);
    setMessages((m) => [
      ...m,
      { from: 'user', text: "Yes, let's talk" },
      { from: 'bot', text: "Awesome! Tell me a bit about what you have in mind, or fill the contact form below and I'll get back to you within 24 hours." },
    ]);
  };

  const dismissTalk = () => {
    setStage('idle'); // hide prompt, keep bubble clickable
  };

  const sendMessage = (text) => {
    const value = (text ?? input).trim();
    if (!value) return;
    const reply = matchReply(value);
    setMessages((m) => [...m, { from: 'user', text: value }]);
    setInput('');
    if (reply) {
      // little delay so it feels conversational
      setTimeout(() => {
        setMessages((m) => [...m, { from: 'bot', text: reply }]);
      }, 400);
    } else {
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            from: 'bot',
            text: "I might not have a smart answer for that one — but the contact form will get the message to me directly. Want to try that?",
          },
        ]);
      }, 400);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    // No backend wired up — emulate a send and show success state.
    setSent(true);
    setMessages((m) => [
      ...m,
      { from: 'user', text: `[Contact form] ${form.name} • ${form.email} — ${form.message}` },
      {
        from: 'bot',
        text: `Got it, ${form.name.split(' ')[0]}! Your message is on its way to ${personal.email}. I'll reply within 24 hours.`,
      },
    ]);
    setTimeout(() => {
      setForm({ name: '', email: '', message: '' });
      setSent(false);
    }, 4000);
  };

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col items-start gap-3 font-sans">
      {/* Greeting bubble that pops out the first time */}
      <AnimatePresence>
        {showGreeting && !open && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="ml-2 px-4 py-2 rounded-2xl rounded-bl-sm bg-white text-black text-sm font-semibold shadow-2xl border border-white/30 max-w-[220px]"
          >
            Hello! 👋
            <span className="absolute -bottom-2 left-3 w-3 h-3 bg-white rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Want to talk?" prompt panel */}
      <AnimatePresence>
        {stage === 'askWant' && !open && (
          <motion.div
            key="askwant"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="ml-2 w-72 rounded-2xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-2 text-white text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Want to talk?
              </div>
              <p className="mt-1 text-xs text-white/60">
                I'm a quick assistant for {personal.firstName}. Tap below to start a chat or send a message.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={acceptTalk}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#ff2a2a] text-white text-sm font-semibold hover:bg-[#e02222] transition-colors"
                >
                  Yes, let's talk
                </button>
                <button
                  onClick={dismissTalk}
                  className="px-3 py-2 rounded-lg bg-white/5 text-white/80 text-sm hover:bg-white/10 transition-colors"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble — the persistent entry point */}
      <button
        onClick={() => {
          setOpen(true);
          if (stage === 'hello' || stage === 'idle' || stage === 'askWant') setStage('chat');
        }}
        aria-label="Open chat"
        className="relative w-14 h-14 rounded-full bg-[#ff2a2a] text-white shadow-[0_8px_24px_rgba(255,42,42,0.45)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </motion.svg>
          )}
        </AnimatePresence>
        {/* Unread dot if not yet opened */}
        {stage !== 'chat' && !open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black" />
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="w-[340px] max-w-[calc(100vw-2.5rem)] h-[480px] max-h-[calc(100vh-7rem)] rounded-2xl bg-[#0b0b0b] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#ff2a2a] to-[#c8161d]">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white font-black">
                {personal.firstName[0]}
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-sm leading-tight">
                  Chat with {personal.firstName}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Online • replies in minutes
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full hover:bg-white/10 text-white flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#0b0b0b]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                      m.from === 'user'
                        ? 'bg-[#ff2a2a] text-white rounded-br-sm'
                        : 'bg-white/8 text-white/90 border border-white/10 rounded-bl-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Quick reply chips, shown until first user message */}
              {messages.filter((m) => m.from === 'user').length === 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 text-xs rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Contact form — always visible at the bottom for easy access */}
            <form
              onSubmit={submitForm}
              className="px-3 pt-2 pb-2 border-t border-white/10 bg-[#0a0a0a] space-y-1.5"
            >
              <div className="flex gap-1.5">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="flex-1 min-w-0 px-2.5 py-1.5 text-xs rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ff2a2a]"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex-1 min-w-0 px-2.5 py-1.5 text-xs rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ff2a2a]"
                />
              </div>
              <textarea
                required
                rows={2}
                placeholder="Type your message…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ff2a2a] resize-none"
              />
              <button
                type="submit"
                disabled={sent}
                className="w-full px-3 py-1.5 text-xs font-bold rounded-md bg-[#ff2a2a] hover:bg-[#e02222] text-white transition-colors disabled:opacity-60"
              >
                {sent ? '✓ Message sent' : 'Send message'}
              </button>
            </form>

            {/* Chat input */}
            <div className="px-3 py-2 border-t border-white/10 bg-[#0a0a0a] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything…"
                className="flex-1 px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#ff2a2a]"
              />
              <button
                onClick={() => sendMessage()}
                aria-label="Send"
                className="w-9 h-9 rounded-full bg-[#ff2a2a] hover:bg-[#e02222] text-white flex items-center justify-center transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
