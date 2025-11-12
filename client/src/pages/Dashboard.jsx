import React, { useMemo, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Link, useLocation } from 'react-router-dom';
import { courses, interviewQuestions } from '../data';
import { FaPlayCircle, FaFilePdf, FaClipboardList, FaBook, FaLaptopCode, FaDatabase, FaRobot, FaServer, FaCode, FaPython, FaJs, FaHtml5, FaGit, FaDocker, FaCloud, FaLock, FaPaintBrush, FaTools } from 'react-icons/fa';

const Dashboard = () => {
  const featuredCourse = courses[0];
  const recommendedLessons =
    (featuredCourse?.syllabus || []).filter(item => item.type === 'video').slice(0, 6);

  // Aggregate resources across all courses
  const allVideos = useMemo(() => {
    return courses.flatMap(course => (course.syllabus || [])
      .filter(s => s.type === 'video')
      .map(s => ({ ...s, courseTitle: course.title, courseId: course.id })));
  }, []);

  const allNotes = useMemo(() => {
    return courses.flatMap(course => (course.syllabus || [])
      .filter(s => s.type === 'note')
      .map(s => ({ ...s, courseTitle: course.title, courseId: course.id })));
  }, []);

  const allExams = useMemo(() => {
    return courses.flatMap(course => (course.syllabus || [])
      .filter(s => s.type === 'quiz')
      .map(s => ({ ...s, courseTitle: course.title, courseId: course.id })));
  }, []);

  const [activeTab, setActiveTab] = useState('courses');
  const [activeCategory, setActiveCategory] = useState(null); // null => show categories
  const [modalVideoUrl, setModalVideoUrl] = useState(null);

  // Interview questions state
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [interviewCategory, setInterviewCategory] = useState('all');

  const allCourses = courses || [];

  const location = useLocation();

  // Shuffle interview questions
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const filteredQuestions = interviewCategory === 'all' 
      ? interviewQuestions 
      : interviewQuestions.filter(q => q.category === interviewCategory);
    
    setShuffledQuestions(shuffleArray(filteredQuestions));
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowAnswer(false);
  }, [interviewCategory]);

  // Initialize questions on mount
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setShuffledQuestions(shuffleArray(interviewQuestions));
  }, []);

  useEffect(() => {
    // Read query param 'category' and set activeCategory when present
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      // normalize common values
      const c = cat.toLowerCase();
      const validCategories = ['courses', 'videos', 'notes', 'exams', 'react', 'data-science', 'ai-ml', 'nodejs', 'mongodb', 'express', 'python', 'javascript', 'html-css', 'git', 'docker', 'aws', 'cybersecurity', 'ui-ux', 'devops'];
      if (validCategories.includes(c)) {
        setActiveCategory(c);
      }
    }
  }, [location.search]);

  return (
    <div>
      {/* Featured Video Hero */}
      <section className="container">
        <div className="dash-hero">
          <div className="dash-hero-left">
            <div className="dash-hero-player">
              {recommendedLessons[0] && (
                <ReactPlayer
                  url={recommendedLessons[0].url}
                  width="100%"
                  height="100%"
                  controls
                />
              )}
            </div>
          </div>
          <div className="dash-hero-right">
            <h1 className="dash-hero-title">{featuredCourse?.title}</h1>
            <p className="dash-hero-subtitle">Kickstart your learning with our most popular course.</p>
            <div className="dash-hero-meta">
              <span>⭐ {featuredCourse?.rating}</span>
              <span className="price">{featuredCourse?.price}</span>
            </div>
            <Link to={`/course/${featuredCourse?.id}`} className="btn">Continue Learning</Link>
          </div>
        </div>
      </section>

      {/* Recommended Videos */}
      <section className="container">
        <h2 className="section-title">Recommended Videos</h2>
        <div className="video-grid">
          {recommendedLessons.map(item => (
            <div key={item.id} className="video-card">
              <ReactPlayer
                url={item.url}
                width="100%"
                height="200px"
                light
                controls
                playing={false}
              />
              <div className="video-card-body">
                <h3 className="video-title">{item.title}</h3>
                <Link to={`/course/${featuredCourse?.id}`} className="btn" style={{ width: 'auto' }}>
                  Watch Full Lesson
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories-first view: show categories; click to drill into items */}
      <section className="container">
        <h2 className="section-title">Explore Resources</h2>

        {!activeCategory && (
          <div className="category-grid">
            <div className="category-card" onClick={() => setActiveCategory('react')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaLaptopCode /></div>
              <p className="category-label">React</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('data-science')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaDatabase /></div>
              <p className="category-label">Data Science</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('ai-ml')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaRobot /></div>
              <p className="category-label">AI & Machine Learning</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('nodejs')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaServer /></div>
              <p className="category-label">Node.js</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('mongodb')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaDatabase /></div>
              <p className="category-label">MongoDB</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('express')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaCode /></div>
              <p className="category-label">Express.js</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('python')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaPython /></div>
              <p className="category-label">Python</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('javascript')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaJs /></div>
              <p className="category-label">JavaScript</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('html-css')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaHtml5 /></div>
              <p className="category-label">HTML & CSS</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('git')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaGit /></div>
              <p className="category-label">Git & GitHub</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('docker')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaDocker /></div>
              <p className="category-label">Docker</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('aws')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaCloud /></div>
              <p className="category-label">AWS</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('cybersecurity')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaLock /></div>
              <p className="category-label">Cybersecurity</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('ui-ux')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaPaintBrush /></div>
              <p className="category-label">UI/UX Design</p>
            </div>

            <div className="category-card" onClick={() => setActiveCategory('devops')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaTools /></div>
              <p className="category-label">DevOps</p>
            </div>
          </div>
        )}

        {activeCategory && (
          <div>
            <button className="back-btn" onClick={() => setActiveCategory(null)}>← Back to categories</button>
            <div className="resource-grid" style={{marginTop: '1rem'}}>
              {activeCategory === 'courses' && allCourses.map(c => (
                <div key={c.id} className="resource-card">
                  <img src={c.thumbnail} alt={c.title} />
                  <div>
                    <h3>{c.title}</h3>
                    <p className="instructor">By {c.instructor}</p>
                    <div className="meta-info">
                      <span>⭐ {c.rating}</span>
                      <span className="price">{c.price}</span>
                    </div>
                    <Link to={`/course/${c.id}`} className="btn" style={{width: 'auto'}}>Open Course</Link>
                  </div>
                </div>
              ))}

              {activeCategory === 'videos' && allVideos.map(v => (
                <div key={`${v.id}-${v.courseId}`} className="resource-card resource-small">
                  <div className="resource-media">
                    <ReactPlayer url={v.url} light width="160px" height="90px" />
                  </div>
                  <div>
                    <h4>{v.title}</h4>
                    <p className="muted">From: {v.courseTitle}</p>
                    <button onClick={() => setModalVideoUrl(v.url)} className="btn" style={{width: 'auto'}}>Watch</button>
                  </div>
                </div>
              ))}

              {activeCategory && !['videos', 'notes', 'exams', 'courses'].includes(activeCategory) && allVideos.filter(v => v.category === activeCategory).map(v => (
                <div key={`${v.id}-${v.courseId}`} className="resource-card resource-small">
                  <div className="resource-media">
                    <ReactPlayer url={v.url} light width="160px" height="90px" />
                  </div>
                  <div>
                    <h4>{v.title}</h4>
                    <p className="muted">From: {v.courseTitle}</p>
                    <button onClick={() => {
                      console.log('Watch button clicked for category video:', v.title, 'URL:', v.url);
                      setModalVideoUrl(v.url);
                    }} className="btn" style={{width: 'auto'}}>Watch</button>
                  </div>
                </div>
              ))}

              {activeCategory === 'notes' && allNotes.map(n => (
                <div key={`${n.id}-${n.courseId}`} className="resource-card resource-small">
                  <div className="resource-media pdf-placeholder">PDF</div>
                  <div>
                    <h4>{n.title}</h4>
                    <p className="muted">From: {n.courseTitle}</p>
                    <a href={n.url || '#'} className="btn" style={{width: 'auto'}}>Download</a>
                  </div>
                </div>
              ))}

              {activeCategory && !['videos', 'notes', 'exams', 'courses'].includes(activeCategory) && allNotes.filter(n => n.category === activeCategory).map(n => (
                <div key={`${n.id}-${n.courseId}`} className="resource-card resource-small">
                  <div className="resource-media pdf-placeholder">PDF</div>
                  <div>
                    <h4>{n.title}</h4>
                    <p className="muted">From: {n.courseTitle}</p>
                    <a href={n.url || '#'} className="btn" style={{width: 'auto'}}>Download</a>
                  </div>
                </div>
              ))}

              {activeCategory === 'exams' && allExams.map(e => (
                <div key={`${e.id}-${e.courseId}`} className="resource-card resource-small">
                  <div className="resource-media exam-placeholder">Quiz</div>
                  <div>
                    <h4>{e.title}</h4>
                    <p className="muted">From: {e.courseTitle}</p>
                    <Link to={`/course/${e.courseId}`} className="btn" style={{width: 'auto'}}>Attempt</Link>
                  </div>
                </div>
              ))}

              {activeCategory && !['videos', 'notes', 'exams', 'courses'].includes(activeCategory) && allExams.filter(e => e.category === activeCategory).map(e => (
                <div key={`${e.id}-${e.courseId}`} className="resource-card resource-small">
                  <div className="resource-media exam-placeholder">Quiz</div>
                  <div>
                    <h4>{e.title}</h4>
                    <p className="muted">From: {e.courseTitle}</p>
                    <Link to={`/course/${e.courseId}`} className="btn" style={{width: 'auto'}}>Attempt</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Video modal overlay (plays videos inline, no redirect) */}
      {modalVideoUrl && (
        <div className="video-modal" onClick={() => setModalVideoUrl(null)}>
          {console.log('Modal opened with URL:', modalVideoUrl)}
          <div className="video-modal-inner" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setModalVideoUrl(null)}>✕</button>
            <div style={{width: '100%', height: '100%', background: 'white'}}>
              <ReactPlayer 
                url={modalVideoUrl} 
                playing={true}
                controls 
                width="100%" 
                height="100%" 
                config={{
                  youtube: {
                    playerVars: { 
                      showinfo: 1,
                      autoplay: 1,
                      modestbranding: 1
                    }
                  }
                }}
                onReady={() => console.log('Video ready:', modalVideoUrl)}
                onError={(error) => console.error('Video error:', error)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Interview Questions Section */}
      <section className="container" id="interview-section">
        <h2 className="section-title">Interview Questions Practice</h2>
        
        {/* Category Filter */}
        <div className="interview-filters" style={{marginBottom: '2rem'}}>
          <select 
            value={interviewCategory} 
            onChange={(e) => setInterviewCategory(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              background: 'white',
              fontSize: '0.9rem'
            }}
          >
            <option value="all">All Categories</option>
            <option value="react">React</option>
            <option value="javascript">JavaScript</option>
            <option value="nodejs">Node.js</option>
            <option value="mongodb">MongoDB</option>
            <option value="express">Express.js</option>
            <option value="python">Python</option>
            <option value="data-science">Data Science</option>
            <option value="html-css">HTML/CSS</option>
            <option value="git">Git</option>
            <option value="docker">Docker</option>
            <option value="aws">AWS</option>
            <option value="ai-ml">AI/ML</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="ui-ux">UI/UX</option>
            <option value="devops">DevOps</option>
          </select>
          
          <button 
            onClick={() => {
              const shuffleArray = (array) => {
                const shuffled = [...array];
                for (let i = shuffled.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
              };
              const filteredQuestions = interviewCategory === 'all' 
                ? interviewQuestions 
                : interviewQuestions.filter(q => q.category === interviewCategory);
              setShuffledQuestions(shuffleArray(filteredQuestions));
              setCurrentQuestionIndex(0);
              setSelectedAnswer('');
              setShowAnswer(false);
            }}
            className="btn"
            style={{marginLeft: '1rem'}}
          >
            Shuffle Questions
          </button>
        </div>

        {/* Question Display */}
        {shuffledQuestions.length > 0 && (
          <div className="interview-question-card" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <div style={{marginBottom: '1.5rem'}}>
              <span style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
              </span>
              <span style={{
                marginLeft: '1rem',
                background: '#f3f4f6',
                color: '#374151',
                padding: '0.25rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {shuffledQuestions[currentQuestionIndex]?.category.toUpperCase()}
              </span>
            </div>

            <h3 style={{marginBottom: '1.5rem', color: '#111827'}}>
              {shuffledQuestions[currentQuestionIndex]?.question}
            </h3>

            {shuffledQuestions[currentQuestionIndex]?.type === 'mcq' ? (
              <div style={{marginBottom: '1.5rem'}}>
                {shuffledQuestions[currentQuestionIndex]?.options.map((option, index) => (
                  <div key={index} style={{marginBottom: '0.5rem'}}>
                    <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        disabled={showAnswer}
                        style={{marginRight: '0.75rem'}}
                      />
                      <span style={{color: showAnswer && option === shuffledQuestions[currentQuestionIndex]?.correct ? '#059669' : '#374151'}}>
                        {option}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{marginBottom: '1.5rem'}}>
                <textarea
                  placeholder="Type your answer here..."
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  disabled={showAnswer}
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    resize: 'vertical'
                  }}
                />
              </div>
            )}

            <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              {!showAnswer ? (
                <button 
                  onClick={() => setShowAnswer(true)}
                  className="btn"
                  disabled={shuffledQuestions[currentQuestionIndex]?.type === 'mcq' && !selectedAnswer}
                >
                  Show Answer
                </button>
              ) : (
                <div style={{width: '100%'}}>
                  <div style={{
                    background: shuffledQuestions[currentQuestionIndex]?.type === 'mcq' && selectedAnswer === shuffledQuestions[currentQuestionIndex]?.correct ? '#d1fae5' : '#fef3c7',
                    border: `1px solid ${shuffledQuestions[currentQuestionIndex]?.type === 'mcq' && selectedAnswer === shuffledQuestions[currentQuestionIndex]?.correct ? '#059669' : '#d97706'}`,
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <h4 style={{
                      margin: '0 0 0.5rem 0',
                      color: shuffledQuestions[currentQuestionIndex]?.type === 'mcq' && selectedAnswer === shuffledQuestions[currentQuestionIndex]?.correct ? '#059669' : '#d97706'
                    }}>
                      {shuffledQuestions[currentQuestionIndex]?.type === 'mcq' && selectedAnswer === shuffledQuestions[currentQuestionIndex]?.correct ? '✅ Correct!' : 'Answer:'}
                    </h4>
                    
                    {shuffledQuestions[currentQuestionIndex]?.type === 'mcq' ? (
                      <div>
                        <p style={{margin: '0 0 0.5rem 0', fontWeight: '600'}}>
                          Correct Answer: {shuffledQuestions[currentQuestionIndex]?.correct}
                        </p>
                        {shuffledQuestions[currentQuestionIndex]?.explanation && (
                          <p style={{margin: 0, fontSize: '0.9rem', color: '#6b7280'}}>
                            {shuffledQuestions[currentQuestionIndex]?.explanation}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p style={{margin: 0}}>
                        {shuffledQuestions[currentQuestionIndex]?.answer}
                      </p>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowAnswer(false);
                      setSelectedAnswer('');
                      setCurrentQuestionIndex((prev) => 
                        prev < shuffledQuestions.length - 1 ? prev + 1 : 0
                      );
                    }}
                    className="btn"
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Keep your streak going!</h2>
          <p>Complete at least one lesson today and earn bonus points.</p>
          <Link to={`/course/${featuredCourse?.id}`} className="btn" style={{ width: 'auto' }}>
            Resume Course
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

