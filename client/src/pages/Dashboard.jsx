import React, { useMemo, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLaptopCode, FaDatabase, FaRobot, FaServer, FaCode, FaPython, FaJs, FaHtml5, FaGit, FaDocker, FaCloud, FaLock, FaPaintBrush, FaTools } from 'react-icons/fa';
import { courses, interviewQuestions } from '../data';

const Dashboard = () => {
  // 1. State Initialization
  const [coursesData, setCoursesData] = useState([]);
  const [interviewQuestionsData, setInterviewQuestionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Data Fetching (Simulated)
  useEffect(() => {
    // Data load hone ka wait karein taaki turant crash na ho
    setCoursesData(courses || []);
    setInterviewQuestionsData(interviewQuestions || []);
    setLoading(false);
  }, []);

  // 3. Derived Data (Calculations)
  // Safety check: Agar coursesData empty hai, to undefined use mat karo
  const featuredCourse = coursesData && coursesData.length > 0 ? coursesData[0] : null;
  
  // Safety check for syllabus
  const recommendedLessons = featuredCourse?.syllabus 
    ? featuredCourse.syllabus.filter(item => item.type === 'video').slice(0, 6) 
    : [];

  // Helper: Extract Video ID
  const extractVideoId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  // Aggregate resources (Memoized for performance)
  const allVideos = useMemo(() => {
    if (!coursesData) return [];
    return coursesData.flatMap(course => (course.syllabus || [])
      .filter(s => s.type === 'video')
      .map(s => ({ ...s, courseTitle: course.title, courseId: course.id })));
  }, [coursesData]);

  const allNotes = useMemo(() => {
    if (!coursesData) return [];
    return coursesData.flatMap(course => (course.syllabus || [])
      .filter(s => s.type === 'note')
      .map(s => ({ ...s, courseTitle: course.title, courseId: course.id })));
  }, [coursesData]);

  const allExams = useMemo(() => {
    if (!coursesData) return [];
    return coursesData.flatMap(course => (course.syllabus || [])
      .filter(s => s.type === 'quiz')
      .map(s => ({ ...s, courseTitle: course.title, courseId: course.id })));
  }, [coursesData]);

  // UI States
  const [videoErrors, setVideoErrors] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalVideoUrl, setModalVideoUrl] = useState(null);

  // Interview States
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [interviewCategory, setInterviewCategory] = useState('all');

  const location = useLocation();

  // 4. Interview Logic
  useEffect(() => {
    if (!interviewQuestionsData || interviewQuestionsData.length === 0) return;

    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const filteredQuestions = interviewCategory === 'all' 
      ? interviewQuestionsData 
      : interviewQuestionsData.filter(q => q.category === interviewCategory);
    
    setShuffledQuestions(shuffleArray(filteredQuestions));
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowAnswer(false);
  }, [interviewCategory, interviewQuestionsData]);

  // URL Category Logic
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setActiveCategory(cat.toLowerCase());
  }, [location.search]);


  // --- RETURN: Loading Screen (To prevent White Screen) ---
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  // --- RETURN: Empty State (To prevent Crash) ---
  if (!coursesData || coursesData.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '4rem' }}>
        <h2>No Data Found</h2>
        <p>Please check your data.js file.</p>
      </div>
    );
  }

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="container">
        <div className="dash-hero">
          <div className="dash-hero-left">
            <div className="dash-hero-player">
              {/* Safe Check: Video tabhi dikhao jab URL maujood ho */}
              {recommendedLessons[0] && recommendedLessons[0].url ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractVideoId(recommendedLessons[0].url)}`}
                  title={recommendedLessons[0].title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setVideoErrors(prev => ({ ...prev, [recommendedLessons[0].id]: true }))}
                />
              ) : (
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'100%', background:'#000', color:'white'}}>
                  Video Loading...
                </div>
              )}
            </div>
          </div>
          <div className="dash-hero-right">
            {/* Safe Checks using ?. */}
            <h1 className="dash-hero-title">{featuredCourse?.title || "Course Title"}</h1>
            <p className="dash-hero-subtitle">Kickstart your learning with our most popular course.</p>
            <div className="dash-hero-meta">
              <span>⭐ {featuredCourse?.rating || "4.5"}</span>
              <span className="price">{featuredCourse?.price || "Free"}</span>
            </div>
            {featuredCourse && (
              <Link to={`/course/${featuredCourse.id}`} className="btn">Continue Learning</Link>
            )}
          </div>
        </div>
      </section>

      {/* 2. RECOMMENDED VIDEOS */}
      <section className="container">
        <h2 className="section-title">Recommended Videos</h2>
        <div className="video-grid">
          {recommendedLessons.map(item => (
            <div key={item.id} className="video-card">
              {videoErrors[item.id] ? (
                <div style={{ height: '200px', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Unavailable
                </div>
              ) : (
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${extractVideoId(item.url)}`}
                  title={item.title}
                  frameBorder="0"
                  allowFullScreen
                  onError={() => setVideoErrors(prev => ({ ...prev, [item.id]: true }))}
                />
              )}
              <div className="video-card-body">
                <h3 className="video-title">{item.title}</h3>
                {featuredCourse && (
                   <Link to={`/course/${featuredCourse.id}`} className="btn" style={{ width: 'auto' }}>
                     Watch Lesson
                   </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES & RESOURCES */}
      <section className="container">
        <h2 className="section-title">Explore Resources</h2>

        {!activeCategory ? (
          <div className="category-grid">
             {/* Aapke saare categories wapas aa gaye hain */}
            <div className="category-card" onClick={() => setActiveCategory('react')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaLaptopCode /></div><p className="category-label">React</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('data-science')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaDatabase /></div><p className="category-label">Data Science</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('ai-ml')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaRobot /></div><p className="category-label">AI & ML</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('nodejs')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaServer /></div><p className="category-label">Node.js</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('mongodb')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaDatabase /></div><p className="category-label">MongoDB</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('express')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaCode /></div><p className="category-label">Express.js</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('python')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaPython /></div><p className="category-label">Python</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('javascript')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaJs /></div><p className="category-label">JavaScript</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('html-css')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaHtml5 /></div><p className="category-label">HTML & CSS</p>
            </div>
             <div className="category-card" onClick={() => setActiveCategory('git')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaGit /></div><p className="category-label">Git</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('docker')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaDocker /></div><p className="category-label">Docker</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('aws')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaCloud /></div><p className="category-label">AWS</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('cybersecurity')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaLock /></div><p className="category-label">Security</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('ui-ux')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaPaintBrush /></div><p className="category-label">UI/UX</p>
            </div>
            <div className="category-card" onClick={() => setActiveCategory('devops')} style={{cursor: 'pointer'}}>
              <div className="category-icon"><FaTools /></div><p className="category-label">DevOps</p>
            </div>
          </div>
        ) : (
          <div>
            <button className="back-btn" onClick={() => setActiveCategory(null)}>← Back to categories</button>
            
            <div className="resource-grid" style={{marginTop: '1rem'}}>
              
              {/* Courses Logic */}
              {activeCategory === 'courses' && coursesData.map(c => (
                <div key={c.id} className="resource-card">
                  <img src={c.thumbnail} alt={c.title} />
                  <div>
                    <h3>{c.title}</h3>
                    <Link to={`/course/${c.id}`} className="btn">Open Course</Link>
                  </div>
                </div>
              ))}

              {/* Videos Logic */}
              {(activeCategory === 'videos' || !['courses', 'notes', 'exams'].includes(activeCategory)) && 
                allVideos.filter(v => activeCategory === 'videos' || v.category === activeCategory).map((v, idx) => (
                  <div key={idx} className="resource-card resource-small">
                    <div className="resource-media">
                      <iframe width="160" height="90" src={`https://www.youtube.com/embed/${extractVideoId(v.url)}`} frameBorder="0" title={v.title} />
                    </div>
                    <div>
                      <h4>{v.title}</h4>
                      <button onClick={() => setModalVideoUrl(v.url)} className="btn" style={{width:'auto'}}>Watch</button>
                    </div>
                  </div>
              ))}

              {/* Notes Logic */}
              {(activeCategory === 'notes' || !['courses', 'videos', 'exams'].includes(activeCategory)) && 
                allNotes.filter(n => activeCategory === 'notes' || n.category === activeCategory).map((n, idx) => (
                  <div key={idx} className="resource-card resource-small">
                    <div className="resource-media pdf-placeholder">PDF</div>
                    <div>
                      <h4>{n.title}</h4>
                      <a href={n.url} target="_blank" rel="noreferrer" className="btn" style={{width:'auto'}}>Download</a>
                    </div>
                  </div>
              ))}

               {/* Quiz Logic */}
               {(activeCategory === 'exams' || !['courses', 'videos', 'notes'].includes(activeCategory)) && 
                allExams.filter(e => activeCategory === 'exams' || e.category === activeCategory).map((e, idx) => (
                  <div key={idx} className="resource-card resource-small">
                    <div className="resource-media exam-placeholder">Quiz</div>
                    <div>
                      <h4>{e.title}</h4>
                      <Link to={`/course/${e.courseId}`} className="btn" style={{width:'auto'}}>Attempt</Link>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {modalVideoUrl && (
        <div className="video-modal" onClick={() => setModalVideoUrl(null)}>
          <div className="video-modal-inner" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setModalVideoUrl(null)}>✕</button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${extractVideoId(modalVideoUrl)}`}
              title="Video Player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 4. INTERVIEW SECTION */}
      <section className="container" id="interview-section">
        <h2 className="section-title">Interview Questions Practice</h2>
        
        {/* Filter Dropdown */}
        <div className="interview-filters" style={{marginBottom: '2rem'}}>
          <select 
            value={interviewCategory} 
            onChange={(e) => setInterviewCategory(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', marginRight: '1rem' }}
          >
            <option value="all">All Categories</option>
            <option value="react">React</option>
            <option value="javascript">JavaScript</option>
            <option value="nodejs">Node.js</option>
            <option value="mongodb">MongoDB</option>
            <option value="python">Python</option>
          </select>
          <button 
             className="btn"
             onClick={() => {
                // Shuffle logic reused
                if(interviewQuestionsData.length === 0) return;
                const questions = interviewCategory === 'all' ? interviewQuestionsData : interviewQuestionsData.filter(q => q.category === interviewCategory);
                const shuffled = [...questions].sort(() => Math.random() - 0.5);
                setShuffledQuestions(shuffled);
                setCurrentQuestionIndex(0);
                setShowAnswer(false);
             }}
          >
            Shuffle
          </button>
        </div>

        {shuffledQuestions.length > 0 && shuffledQuestions[currentQuestionIndex] ? (
          <div className="interview-question-card" style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem', marginRight: '10px' }}>
                 {currentQuestionIndex + 1} / {shuffledQuestions.length}
              </span>
              <span style={{ background: '#e5e7eb', padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem' }}>
                {shuffledQuestions[currentQuestionIndex]?.category?.toUpperCase()}
              </span>
            </div>

            <h3 style={{ marginBottom: '1.5rem' }}>{shuffledQuestions[currentQuestionIndex]?.question}</h3>

            {/* MCQ Options */}
            {shuffledQuestions[currentQuestionIndex]?.type === 'mcq' && (
               <div style={{marginBottom: '1.5rem'}}>
                 {shuffledQuestions[currentQuestionIndex].options.map((opt, i) => (
                   <div key={i} style={{marginBottom: '0.5rem'}}>
                     <label style={{cursor:'pointer'}}>
                       <input 
                         type="radio" 
                         name="ans" 
                         value={opt} 
                         checked={selectedAnswer === opt}
                         onChange={(e) => setSelectedAnswer(e.target.value)}
                         style={{marginRight: '10px'}}
                       />
                       {opt}
                     </label>
                   </div>
                 ))}
               </div>
            )}
             {/* Text Input for Short Answer */}
            {shuffledQuestions[currentQuestionIndex]?.type !== 'mcq' && (
                <textarea 
                  placeholder="Type your answer..." 
                  style={{width:'100%', padding:'10px', marginBottom:'1rem', borderRadius:'8px', border:'1px solid #ccc'}}
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
            )}

            {!showAnswer ? (
              <button onClick={() => setShowAnswer(true)} className="btn">Show Answer</button>
            ) : (
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px' }}>
                <strong>Answer: </strong>
                {shuffledQuestions[currentQuestionIndex]?.answer || shuffledQuestions[currentQuestionIndex]?.correct}
                {shuffledQuestions[currentQuestionIndex]?.explanation && <p style={{marginTop: '0.5rem', color: '#555'}}>{shuffledQuestions[currentQuestionIndex]?.explanation}</p>}
              </div>
            )}

            <button 
              onClick={() => {
                setShowAnswer(false);
                setSelectedAnswer('');
                setCurrentQuestionIndex((prev) => (prev + 1) % shuffledQuestions.length);
              }} 
              className="btn"
              style={{marginLeft: '1rem'}}
            >
              Next Question
            </button>
          </div>
        ) : (
          <p>No interview questions available.</p>
        )}
      </section>

      {/* 5. CTA SECTION (Fixed) */}
      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Keep your streak going!</h2>
          <p>Complete at least one lesson today and earn bonus points.</p>
          {featuredCourse ? (
            <Link to={`/course/${featuredCourse.id}`} className="btn" style={{ width: 'auto' }}>
              Resume Course
            </Link>
          ) : (
             <button className="btn" disabled>Loading...</button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;