import { useState, useEffect, useRef } from "react";
import chatbotIcon from "./assets/chatbot.gif";

function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [page, setPage] = useState(0);
  const chatRef = useRef(null);

  const itemsPerPage = 6;

  const faqList = [
    {
      question: "Do you offer online consultations?",
      answer: (
        <span>
          We do not offer direct online consultations through this chat. For more information, visit the following NGO's for Anonymous advise{" "}
          <a
            href="https://www.youtube.com/watch?v=ZfL61cOUImw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            WHO STI Facts
          </a>.
        </span>
      )
    },
    {
      question: "How is HIV transmitted?",
      answer: <span>Through blood, semen, vaginal fluids, rectal fluids, and breast milk.</span>
    },
    {
      question: "Can I get HIV from kissing?",
      answer: <span>No, HIV is not spread through kissing, hugging, or casual contact.</span>
    },
    {
      question: "What are STDs?",
      answer: <span>STDs are infections passed through sexual contact, like chlamydia or gonorrhea.</span>
    },
    {
      question: "How can I prevent STDs?",
      answer: <span>Use condoms, get tested, and have honest talks with your partner.</span>
    },
    {
      question: "What is PrEP?",
      answer: <span>PrEP is a medication taken to prevent HIV infection before exposure.</span>
    },
    {
      question: "Can STDs be cured?",
      answer: <span>Some can be cured with antibiotics; others are managed long-term.</span>
    },
    {
      question: "Is HIV still deadly?",
      answer: <span>HIV is manageable with medication, and many live long healthy lives.</span>
    },
    {
      question: "How often should I get tested?",
      answer: <span>At least once a year, or more often if you're sexually active with multiple partners.</span>
    }
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && chatRef.current && !chatRef.current.contains(e.target)) {
        setIsOpen(false);
        setOpenQuestion(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const startIndex = page * itemsPerPage;
  const currentFaqs = faqList.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(faqList.length / itemsPerPage);

  return (
    <>

      <button
        className="fixed bottom-6 right-6 bg-[#195134] rounded-full p-3 hover:scale-110 transition-all z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chat FAQ"
        style={{
          animation: isOpen ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          width: '90px',
          height: '80px'
        }}
      >
        <style>{`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
        `}</style>
        <img src={chatbotIcon} alt="Chat icon" className="w-full h-full rounded-full object-cover" />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-24 right-6 w-96 bg-white border-4 border-[#195134] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          style={{ height: '300px' }}
        >
          {/* Header */}
          <div className="p-5 font-bold bg-gradient-to-r from-[#195134] to-[#50A067] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={chatbotIcon} alt="Bot" className="w-15 h-10 rounded-full p-1" />
              <div>
                <h3 className="text-lg">Health Assistant</h3>
                <p className="text-xs opacity-90">HIV & STD FAQ</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:text-[#195134] rounded-full w-8 h-8 flex items-center justify-center transition-all"
            >
              ✕
            </button>
          </div>

          {/* FAQ Content */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-3 bg-gray-50 flex-1">
            {currentFaqs.map((item, idx) => {
              const realIndex = startIndex + idx;
              return (
                <div 
                  key={realIndex} 
                  className="border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                  style={{ padding: '10px' }}
                >
                  <button
                    onClick={() => setOpenQuestion(openQuestion === realIndex ? null : realIndex)}
                    className="w-full text-left px-4 py-3 bg-white hover:bg-[#50A067] hover:text-white font-semibold transition-all flex items-center justify-between"
                  >
                    <span className="flex-1">{item.question}</span>
                  </button>
                  {openQuestion === realIndex && (
                    <div className="px-4 py-3 text-sm bg-green-50 text-gray-800 border-t-2 border-gray-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pagination Footer */}
          <div className="flex justify-between items-center px-4 py-3 border-t-2 border-gray-200 bg-white">
            <button
              onClick={() => {
                setPage((prev) => Math.max(prev - 1, 0));
                setOpenQuestion(null);
              }}
              disabled={page === 0}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                page === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#195134] text-white hover:bg-[#50A067] shadow-md hover:shadow-lg"
              }`}
            >
              ← Prev
            </button>

            <span className="text-sm font-medium text-gray-600">
              Page {page + 1} of {totalPages}
            </span>

            <button
              onClick={() => {
                setPage((prev) => Math.min(prev + 1, totalPages - 1));
                setOpenQuestion(null);
              }}
              disabled={page >= totalPages - 1}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                page >= totalPages - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-[#195134] text-white hover:bg-[#50A067] shadow-md hover:shadow-lg"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingChatBot;