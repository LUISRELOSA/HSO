import { useState } from "react";

// =========================
// Pretest Result Component
// =========================
function PretestResult({ score, isHighRisk, onRestart }) {
  let riskLevel = "";
  if (isHighRisk || score >= 5) riskLevel = "HIGH RISK";
  else if (score >= 3) riskLevel = "MODERATE RISK";
  else riskLevel = "LOW RISK";

  return (
    <div
      className="border-2 rounded-lg shadow-xl p-6 w-full"
      style={{
        backgroundColor: "rgba(80,160,103,0.6)",
        borderColor: "#195134",
      }}
    >
      <h2
        className="text-4xl font-bold mb-6 text-center"
        style={{ color: "#195134" }}
      >
        Assessment Result
      </h2>

      <div className="space-y-4 text-center">
        <p className="text-2xl">
          Your total score is: <strong>{score}</strong>
        </p>

        <p className="text-3xl font-bold">
          Risk Level:{" "}
          <span className="text-red-600 font-extrabold">{riskLevel}</span>
        </p>
      </div>

      <div className="mt-8 text-left space-y-4">
        <h3 className="text-2xl font-bold" style={{ color: "#195134" }}>
          Scoring & Risk Level Interpretation
        </h3>

        <p className="text-xl">
          <strong>Automatic High Risk:</strong> If you answered "Yes" to any auto
          high-risk question.
        </p>

        <div className="text-xl space-y-2">
          <p>
            <strong>High Risk (5+ Points):</strong> Testing is strongly
            recommended.
          </p>
          <p>
            <strong>Moderate Risk (3–4 Points):</strong> Consider getting tested.
          </p>
          <p>
            <strong>Low Risk (0–2 Points):</strong> No immediate concern.
          </p>
        </div>

        <h3 className="text-2xl font-bold mt-6" style={{ color: "#195134" }}>
          Next Steps
        </h3>

        <p className="text-xl">
          If you are High or Moderate Risk, visit your nearest testing clinic.
        </p>

        <p className="text-xl">
          Baguio City Health Services Office – Reproductive Health and Wellness
          Center, Room 101.
        </p>

        <p className="mt-2 text-xl">
          <strong>☎ Hotline:</strong> 0985-251-5968 | 442-9800
        </p>

        <p className="text-xl">
          <strong>💻 Facebook:</strong>{" "}
          <a
            href="https://www.facebook.com/me/"
            target="_blank"
            className="text-blue-700 underline"
          >
            Baguio Reproductive Health and Wellness Center – Avong Treatment Hub
          </a>
        </p>
      </div>

      <div className="flex justify-center space-x-15 mt-10 ">
        <button
          onClick={onRestart}
          className="px-6 py-4 text-xl shadow-md"
          style={{  backgroundColor: "#195134", padding: "8px" , borderRadius: "5px",  marginRight:"10px" ,  color: "white"}}
        >
          Take Test Again
        </button>

        <button
          onClick={() => alert("Thank you for completing the assessment. Stay informed and stay safe!")}
          className="px-6 py-4 text-2xl shadow-md"
          style={{  backgroundColor: "#195134", padding: "8px" , borderRadius: "5px", color: "white" }}
        >
          Done
        </button>
      </div>

      <p className="mt-6 text-lg italic text-gray-700 text-center">
        Thank you for completing the assessment. Stay informed and stay safe!
      </p>
    </div>
  );
}

// =========================
// Main Pretest Component
// =========================


export default function Pretest() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasConsented, setHasConsented] = useState(false);

  const questions = [
    { id: 1, text: "Have you had unprotected sex in the past 6 months?", type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }] },
    { id: 2, text: "Have you had multiple sexual partners in the past year?", type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }] },
    { id: 3, text: "Have you had sexual contact with someone whose HIV status is unknown?", type: "single", options: [{ label: "Yes", points: 1 }, { label: "No", points: 0 }] },
    { id: 4, text: "Do you have a partner diagnosed with HIV?", type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }] },
    { id: 5, text: "Have you had condomless sex with someone who injects drugs?", type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }] },
    { id: 6, text: "Have you engaged with a commercial sex worker?", type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }] },
    { id: 7, text: "Have you shared needles?", type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }] },
    { id: 8, text: "Have you received a blood transfusion before 1992?", type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }] },
    { id: 9, text: "Did you get a tattoo/piercing with unsterilized equipment?", type: "single", options: [{ label: "Yes", points: 2 }, { label: "No", points: 0 }] },
    { id: 10, text: "Are you a healthcare worker exposed to needle-stick injury?", type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }] },
    { id: 11, text: "Were you born to an untreated HIV-positive mother?", type: "single", options: [{ label: "Yes", autoHighRisk: true }, { label: "No" }] },

    {
      id: 12,
      text: "Are you experiencing any symptoms?",
      type: "multi",
      options: [
        { label: "Unexplained fever > 2 weeks", points: 1 },
        { label: "Night sweats & weight loss", points: 2 },
        { label: "Swollen lymph nodes", points: 1 },
        { label: "Persistent diarrhea", points: 1 },
        { label: "No symptoms", points: 0 },
      ],
    },

    { id: 13, text: "Have you been tested in the last 6 months?", type: "single", options: [{ label: "Yes", points: -1 }, { label: "No", points: 0 }] },
  ];

  const questionsPerPage = 4;
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const currentQuestions = questions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage === totalPages
      ? questions.length
      : (currentPage - 1) * questionsPerPage + questionsPerPage
  );

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const calculateScore = () => {
    let total = 0;
    let highRisk = false;

    questions.forEach((q) => {
      const answer = answers[q.id];
      if (!answer) return;

      if (q.type === "multi") {
        answer.forEach((opt) => {
          if (opt.autoHighRisk) highRisk = true;
          if (typeof opt.points === "number") total += opt.points;
        });
      } else {
        if (answer.autoHighRisk) highRisk = true;
        if (typeof answer.points === "number") total += answer.points;
      }
    });

    setScore(total);
    setIsHighRisk(highRisk);
    setShowResult(true);
  };

  const restart = () => {
    setAnswers({});
    setShowResult(false);
    setScore(0);
    setIsHighRisk(false);
    setCurrentPage(1);
    setHasConsented(false);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-6">

      <div className="flex flex-col md:flex-row gap-6 mx-auto" style={{ width: "80%" }}>
        
        {/* LEFT COLUMN - VIDEOS */}
        <div className="flex flex-col gap-6" style={{ width: "30%" }}>
          {/* First Video */}
          <div className="w-full">
            <div className="mb-3 p-4 bg-white rounded-lg">
              <h3 className="section-substitle font-bold text-[#195134] text-left">
                Start HIV treatment as soon as possible after diagnosis
              </h3>
            </div>
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/604tb9pehxE"
                title="Start HIV treatment as soon as possible"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Second Video */}
          <div className="w-full">
            <div className="mb-3 p-4 bg-white rounded-lg ">
              <h3 className="section-subtitle text-2xl font-bold text-[#195134] text-left">
                Why get tested?
              </h3>
            </div>
            <div className="w-full aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/uScEAA9LlZw"
                title="Why get tested?"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - PRETEST*/}
        <div style={{ width: "70%" }}>
          {showResult ? (
            <PretestResult
              score={score}
              isHighRisk={isHighRisk}
              onRestart={restart}
            />
          ) : !hasConsented ? (
            <div
              className="p-8 border-2 rounded-lg shadow-xl w-full h-full flex flex-col"
              style={{
                borderColor: "#195134",
                backgroundColor: "rgba(80,160,103,0.6)",
                padding: "40px",
              }}
            >
              <h2 className="section-subtitle text-[var(--dominant)] text-center">
                Reproductive Health and Wellness Center
              </h2>

              <h3 className="section-substitle text-[var(--dominant)] text-center ">
                STI/HIV Risk Assessment Questionnaire
              </h3>
                  <br></br>
              <h3 className="section-subs text-black text-left">
                Consent Form
              </h3>

              <p className="section-subs text-black text-left">
                This assessment is confidential and voluntary. No personal
                information will be collected.
              </p>
              <br></br>
              <p className="section-subs text-black text-left">
                By continuing, you agree to:
              </p>
              <br></br>
              <ul className="section-subs text-black text-left mt-4">
                <li>Participate voluntarily</li> 
                <li>Allow anonymous statistics</li> 
                <li>Receive testing recommendations</li> 
              </ul>
              <br></br>
              <div className="flex items-center mb-8">
                <input
                  type="checkbox"
                  checked={hasConsented}
                  onChange={(e) => setHasConsented(e.target.checked)}
                  className="h-6 w-6"
                />
                <label className="section-subs text-black text-center">I agree to proceed</label>
              </div>
              <br></br>

              <button
                onClick={() => setHasConsented(true)}
                disabled={!hasConsented}
                className={`w-full py-4 rounded-lg font-bold text-2xl transition ${
                  hasConsented
                    ? "text-white"
                    : "bg-[#195134] text-white cursor-not-allowed"
                }`}
                style={hasConsented ? { backgroundColor: "#195134" } : {}}
              >
                Proceed to Assessment
              </button>
            </div>
          ) : (
            <div
              className="border-2 rounded-lg shadow-xl h-full flex flex-col justify-between"
              style={{
                borderColor: "#195134",
                backgroundColor: "rgba(80,160,103,0.6)",
                padding: "20px",
              }}
            >
              <div>
                <h1 className="text-4xl font-bold mb-6 text-center text-green-900">
                  HIV Risk Assessment
                </h1>

                <div className="space-y-8">
                  {currentQuestions.map((q) => (
                    <div key={q.id} className="pb-6 border-b space-y-4">
                      <p className="font-semibold text-2xl">
                        {q.id}. {q.text}
                      </p>

                      {q.type === "single" &&
                        q.options.map((opt, idx) => (
                          <label key={idx} className="block cursor-pointer text-xl py-2">
                            <input
                              type="radio"
                              name={`q${q.id}`}
                              checked={answers[q.id]?.label === opt.label}
                              onChange={() => handleChange(q.id, opt)}
                              className="mr-3 h-5 w-5"
                            />
                            {opt.label}
                          </label>
                        ))}

                      {q.type === "multi" &&
                        q.options.map((opt, idx) => (
                          <label key={idx} className="block cursor-pointer text-xl py-2">
                            <input
                              type="checkbox"
                              checked={
                                answers[q.id]?.some((o) => o.label === opt.label) ||
                                false
                              }
                              onChange={(e) => {
                                const prev = answers[q.id] || [];
                                if (e.target.checked)
                                  handleChange(q.id, [...prev, opt]);
                                else
                                  handleChange(
                                    q.id,
                                    prev.filter((o) => o.label !== opt.label)
                                  );
                              }}
                              className="mr-3 h-5 w-5"
                            />
                            {opt.label}
                          </label>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="flex justify-between">
                  {currentPage > 1 && (
                    <button
                      className="px-8 py-4 bg-gray-300 text-gray-800 text-xl font-semibold rounded-lg"
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>
                  )}

                  {currentPage < totalPages ? (
                    <button
                      className="ml-auto px-15 py-7 shadow"
                      style={{ backgroundColor: "#195134", padding: "8px" , borderRadius: "5px" ,  color: "white"}}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="ml-auto px-8 py-4 shadow"
                      style={{  backgroundColor: "#195134", padding: "8px" , borderRadius: "5px" ,  color: "white" }}
                      onClick={calculateScore}
                    >
                      Submit
                    </button>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <p className="text-lg text-gray-700">
                    Page {currentPage} of {totalPages}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}