import React, { useState } from "react";

const questions = [
    {
        q: "What is React?",
        a: "React is a JavaScript library for building user interfaces."
    },
    {
        q: "What is a component?",
        a: "A component is a reusable piece of UI in React."
    },
    {
        q: "What is useState?",
        a: "useState is a React Hook that allows you to manage state."
    },
    {
        q: "What is useEffect?",
        a: "useEffect is a hook used for side effects like API calls."
    }
];

function Interview() {
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const next = () => {
        setShowAnswer(false);
        setIndex(prev => prev + 1);
    };

    if (index >= questions.length) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>Interview Completed!</h2>
                <p>Great job! Practice again to improve more.</p>
            </div>
        );
    }

    const current = questions[index];

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "500px",
                margin: "auto",
                textAlign: "center"
            }}
        >
            <h2>Mock Interview</h2>

            <div
                style={{
                    padding: "20px",
                    background: "#f5f5f5",
                    borderRadius: "10px",
                    marginTop: "20px"
                }}
            >
                <h3>{current.q}</h3>

                {!showAnswer ? (
                    <button
                        onClick={() => setShowAnswer(true)}
                        style={{
                            marginTop: "15px",
                            padding: "10px 20px",
                            fontSize: "16px"
                        }}
                    >
                        Show Answer
                    </button>
                ) : (
                    <>
                        <p style={{ marginTop: "15px" }}>{current.a}</p>

                        <button
                            onClick={next}
                            style={{
                                marginTop: "15px",
                                padding: "10px 20px",
                                fontSize: "16px"
                            }}
                        >
                            Next Question
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Interview;