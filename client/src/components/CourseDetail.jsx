import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data';

// Helper function to extract YouTube video ID from URL
const extractVideoId = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

// --- Helper Component: Quiz Section ---
const QuizWindow = ({ quizData }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === quizData.questions[currentQ].correct) {
      setScore(score + 1);
    }
    const nextQ = currentQ + 1;
    if (nextQ < quizData.questions.length) {
      setCurrentQ(nextQ);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div style={{ textAlign: 'center', padding: '20px', background: '#e0e7ff', borderRadius: '10px' }}>
        <h3>🎉 Quiz Completed!</h3>
        <p style={{ fontSize: '1.2rem', margin: '10px 0' }}>
          Your Score: <strong>{score} / {quizData.questions.length}</strong>
        </p>
        <button onClick={resetQuiz} className="btn" style={{ width: 'auto' }}>Retry Quiz</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', background: '#fff', border: '1px solid #eee', borderRadius: '10px' }}>
      <h4>📝 {quizData.title}</h4>
      <p style={{ marginBottom: '15px', color: '#666' }}>Question {currentQ + 1} of {quizData.questions.length}</p>
      
      <h3 style={{ marginBottom: '20px' }}>{quizData.questions[currentQ].question}</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {quizData.questions[currentQ].options.map((opt, index) => (
          <button 
            key={index} 
            onClick={() => handleAnswer(opt)}
            style={{ 
              padding: '12px', 
              border: '1px solid #ccc', 
              borderRadius: '5px', 
              background: 'white', 
              cursor: 'pointer',
              textAlign: 'left' 
            }}
            onMouseOver={(e) => e.target.style.background = '#f9f9f9'}
            onMouseOut={(e) => e.target.style.background = 'white'}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id));
  const [currentLesson, setCurrentLesson] = useState(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (course && course.syllabus) {
      setCurrentLesson(course.syllabus[0]);
      setVideoError(false); // Reset error when changing lessons
    }
  }, [course]);

  if (!course) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <Link to="/" style={{ color: '#666', textDecoration: 'none' }}>&larr; Back to Courses</Link>

      <div className="layout-grid" style={{ marginTop: '20px' }}>
        
        {/* --- LEFT SIDE: Content Display Area --- */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            
            {/* 1. VIDEO LOGIC */}
            {currentLesson?.type === 'video' && (
              <div className="video-player" style={{ overflow: 'hidden', backgroundColor: 'black', position: 'relative' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractVideoId(currentLesson.url)}`}
                  title="Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => {
                    console.error('Course video error:', currentLesson.url);
                    setVideoError(true);
                  }}
                />
                {videoError && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.8)',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    <p>Video unavailable</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>This video may have embedding disabled</p>
                  </div>
                )}
              </div>
            )}

            {/* 2. NOTES LOGIC */}
            {currentLesson?.type === 'note' && (
              <div style={{ 
                height: '400px', 
                background: '#fff', 
                border: '1px solid #ddd', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                borderRadius: '12px'
              }}>
                <span style={{ fontSize: '4rem' }}>📄</span>
                <h2>{currentLesson.title}</h2>
                <p>Download and read the notes for this chapter.</p>
                <button className="btn" style={{ width: 'auto', marginTop: '15px' }}>Download PDF</button>
              </div>
            )}

            {/* 3. QUIZ LOGIC */}
            {currentLesson?.type === 'quiz' && (
              <QuizWindow quizData={currentLesson} />
            )}

          </div>

          <div className="detail-header">
            <h1>{currentLesson?.title || course.title}</h1>
            <p className="instructor">Course by {course.instructor}</p>
          </div>
        </div>

        {/* --- RIGHT SIDE: Syllabus List --- */}
        <div>
          <div className="syllabus-card">
            <h3>Course Content</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
              {course.syllabus?.map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    setCurrentLesson(item);
                    setVideoError(false);
                  }}
                  className={`syllabus-item ${currentLesson?.id === item.id ? 'active' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* Icons based on Type */}
                    <span>
                      {item.type === 'video' ? '🎥' : item.type === 'note' ? '📄' : '📝'}
                    </span>
                    <span>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;