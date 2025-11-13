import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icons import karein
import { FaLaptopCode, FaDatabase, FaBullhorn, FaCertificate, FaInfinity, FaVideo, FaRobot, FaCloud, FaPaintBrush, FaTools, FaLock, FaChartLine, FaServer, FaCode, FaPython, FaJs, FaHtml5, FaGit, FaDocker, FaRocket, FaUsers, FaBookOpen, FaGraduationCap, FaTrophy, FaFire, FaStar, FaQuestionCircle, FaClock } from 'react-icons/fa';

const Home = () => {
  const [animatedCounters, setAnimatedCounters] = useState({
    students: 0,
    courses: 0,
    hours: 0,
    rating: 0
  });

  const [visibleSections, setVisibleSections] = useState(new Set());
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      // Animate counters
      const targets = {
        students: 12500,
        courses: 150,
        hours: 25000,
        rating: 4.8
      };

      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedCounters({
          students: Math.floor(targets.students * progress),
          courses: Math.floor(targets.courses * progress),
          hours: Math.floor(targets.hours * progress),
          rating: Math.min(targets.rating * progress, targets.rating)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedCounters(targets);
        }
      }, increment);

      return () => clearInterval(timer);
    } catch (error) {
      console.error('Counter animation error:', error);
    }
  }, []);

  useEffect(() => {
    try {
      // Intersection Observer for scroll animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      }, observerOptions);

      // Observe all sections
      const sections = document.querySelectorAll('[data-animate]');
      sections.forEach(section => observer.observe(section));

      return () => observer.disconnect();
    } catch (error) {
      console.error('Intersection observer error:', error);
    }
  }, []);

  const handleInterviewClick = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  try {
    return (
      <div>
        {/* Floating Action Button */}
        <button className="fab tooltip" onClick={handleInterviewClick}>
          <FaQuestionCircle />
          <span className="tooltip-text">Quick access to Interview Questions</span>
        </button>

        {/* Toast Notification */}
        {showToast && (
          <div className="toast toast-success show">
            <span className="toast-icon">🚀</span>
            <div>
              <strong>Interview Practice</strong>
              <p>Redirecting to interview questions...</p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="hero">
          <div className="particles">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          <h1 className="fade-in-up">Unlock Your Potential</h1>
          <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            Learn from industry experts and boost your career today.
          </p>

          {/* Stats Section */}
          <div className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div className="stat-card">
                <span className="stat-number animate-count">{animatedCounters.students.toLocaleString()}</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-card">
                <span className="stat-number animate-count">{animatedCounters.courses}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-card">
                <span className="stat-number animate-count">{animatedCounters.hours.toLocaleString()}</span>
                <span className="stat-label">Learning Hours</span>
              </div>
              <div className="stat-card">
                <span className="stat-number animate-count">{animatedCounters.rating}</span>
                <span className="stat-label">Avg Rating</span>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.floor(animatedCounters.rating) ? '#f59e0b' : '#e5e7eb'} size={16} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW: Categories Section --- */}
        <div className="container" data-animate id="categories-section">
          <h2 className={`section-title ${visibleSections.has('categories-section') ? 'fade-in-up' : ''}`}>Popular Categories</h2>
          <div className={`category-grid ${visibleSections.has('categories-section') ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
            <Link to="/dashboard?category=react" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaLaptopCode /></div>
                <p className="category-label">React</p>
              </div>
            </Link>

            <Link to="/dashboard?category=data-science" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaDatabase /></div>
                <p className="category-label">Data Science</p>
              </div>
            </Link>

            <Link to="/dashboard?category=ai-ml" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaRobot /></div>
                <p className="category-label">AI & Machine Learning</p>
              </div>
            </Link>

            <Link to="/dashboard?category=nodejs" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaServer /></div>
                <p className="category-label">Node.js</p>
              </div>
            </Link>

            <Link to="/dashboard?category=mongodb" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaDatabase /></div>
                <p className="category-label">MongoDB</p>
              </div>
            </Link>

            <Link to="/dashboard?category=express" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaCode /></div>
                <p className="category-label">Express.js</p>
              </div>
            </Link>

            <Link to="/dashboard?category=python" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaPython /></div>
                <p className="category-label">Python</p>
              </div>
            </Link>

            <Link to="/dashboard?category=javascript" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaJs /></div>
                <p className="category-label">JavaScript</p>
              </div>
            </Link>

            <Link to="/dashboard?category=html-css" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaHtml5 /></div>
                <p className="category-label">HTML & CSS</p>
              </div>
            </Link>

            <Link to="/dashboard?category=git" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaGit /></div>
                <p className="category-label">Git & GitHub</p>
              </div>
            </Link>

            <Link to="/dashboard?category=docker" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaDocker /></div>
                <p className="category-label">Docker</p>
              </div>
            </Link>

            <Link to="/dashboard?category=aws" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaCloud /></div>
                <p className="category-label">AWS</p>
              </div>
            </Link>

            <Link to="/dashboard?category=cybersecurity" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaLock /></div>
                <p className="category-label">Cybersecurity</p>
              </div>
            </Link>

            <Link to="/dashboard?category=ui-ux" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaPaintBrush /></div>
                <p className="category-label">UI/UX Design</p>
              </div>
            </Link>

            <Link to="/dashboard?category=devops" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="category-card">
                <div className="category-icon"><FaTools /></div>
                <p className="category-label">DevOps</p>
              </div>
            </Link>
          </div>
        </div>

        {/* --- NEW: Why Choose Us Section --- */}
        <div className="why-choose-us">
          <div className="container">
            <h2 className="section-title" style={{color: 'white'}}>Why Learn With Us?</h2>
            <div className="features-grid">
              <div className="feature-item">
                <FaCertificate size={40} />
                <h3>Get Certified</h3>
                <p>Finish courses and receive a certificate of completion.</p>
              </div>
              <div className="feature-item">
                <FaInfinity size={40} />
                <h3>Lifetime Access</h3>
                <p>Access your courses anytime, anywhere, for life.</p>
              </div>
              <div className="feature-item">
                <FaVideo size={40} />
                <h3>Expert Instructors</h3>
                <p>Learn from professionals with real-world experience.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW: Learning Progress Section --- */}
        <div className="container" data-animate id="progress-section">
          <h2 className={`section-title ${visibleSections.has('progress-section') ? 'fade-in-up' : ''}`}>Your Learning Journey</h2>
          <div className={`progress-grid ${visibleSections.has('progress-section') ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.2s' }}>
            <div className="progress-card">
              <div className="progress-header">
                <FaBookOpen size={24} />
                <span className="progress-title">Courses Completed</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
              <span className="progress-text">15 of 20 courses</span>
            </div>

            <div className="progress-card">
              <div className="progress-header">
                <FaClock size={24} />
                <span className="progress-title">Study Hours</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '60%'}}></div>
              </div>
              <span className="progress-text">120 of 200 hours</span>
            </div>

            <div className="progress-card">
              <div className="progress-header">
                <FaTrophy size={24} />
                <span className="progress-title">Achievements</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '45%'}}></div>
              </div>
              <span className="progress-text">9 of 20 badges</span>
            </div>

            <div className="progress-card">
              <div className="progress-header">
                <FaStar size={24} />
                <span className="progress-title">Average Score</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '88%'}}></div>
              </div>
              <span className="progress-text">88% overall</span>
            </div>
          </div>
        </div>

        {/* --- NEW: Student Achievements Section --- */}
        <div className="container">
          <h2 className="section-title">Student Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <span className="badge-emoji">🏅</span>
              <h3>Top Performer</h3>
              <p>Completed 5 courses with distinction.</p>
            </div>
            <div className="achievement-card">
              <span className="badge-emoji">🔥</span>
              <h3>7-Day Streak</h3>
              <p>Learned every day this week.</p>
            </div>
            <div className="achievement-card">
              <span className="badge-emoji">🚀</span>
              <h3>Project Launched</h3>
              <p>Built and deployed a full-stack app.</p>
            </div>
          </div>
        </div>

        {/* --- NEW: BCA Notes Section --- */}
        <div className="container">
          <h2 className="section-title">BCA Study Notes</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Semester 1 Notes</h3>
              <p>Computer Fundamentals, Programming in C, Mathematics</p>
              <Link to="/dashboard?category=notes" className="btn" style={{width: 'auto'}}>Download</Link>
            </div>
            <div className="resource-card">
              <h3>Semester 2 Notes</h3>
              <p>Data Structures, OOP with C++, Digital Electronics</p>
              <Link to="/dashboard?category=notes" className="btn" style={{width: 'auto'}}>Download</Link>
            </div>
            <div className="resource-card">
              <h3>Semester 3 Notes</h3>
              <p>Database Management, Web Technologies, Python Programming</p>
              <Link to="/dashboard?category=notes" className="btn" style={{width: 'auto'}}>Download</Link>
            </div>
            <div className="resource-card">
              <h3>Semester 4 Notes</h3>
              <p>Java Programming, Software Engineering, Computer Networks</p>
              <Link to="/dashboard?category=notes" className="btn" style={{width: 'auto'}}>Download</Link>
            </div>
            <div className="resource-card">
              <h3>Semester 5 Notes</h3>
              <p>Android Development, Cloud Computing, Data Mining</p>
              <Link to="/dashboard?category=notes" className="btn" style={{width: 'auto'}}>Download</Link>
            </div>
            <div className="resource-card">
              <h3>Semester 6 Notes</h3>
              <p>Project Management, AI & ML, Cybersecurity</p>
              <Link to="/dashboard?category=notes" className="btn" style={{width: 'auto'}}>Download</Link>
            </div>
          </div>
        </div>

        {/* --- NEW: BCA Syllabus Section --- */}
        <div className="container">
          <h2 className="section-title">BCA Syllabus</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Complete BCA Syllabus</h3>
              <p>Official BCA syllabus from Himachal Pradesh University</p>
              <a href="https://hpuniv.ac.in/upload/syllabus/596af9ceda572BCACBCSSyllabus20161730.pdf" target="_blank" rel="noreferrer" className="btn" style={{width: 'auto'}}>Download Syllabus</a>
            </div>
            <div className="resource-card">
              <h3>Subject-wise Topics</h3>
              <p>Detailed breakdown of topics for each subject</p>
              <a href="https://hpuniv.ac.in/upload/syllabus/596af9ceda572BCACBCSSyllabus20161730.pdf" target="_blank" rel="noreferrer" className="btn" style={{width: 'auto'}}>Explore Topics</a>
            </div>
            <div className="resource-card">
              <h3>Practical Lab Syllabus</h3>
              <p>Hands-on lab exercises and project guidelines</p>
              <a href="https://hpuniv.ac.in/upload/syllabus/596af9ceda572BCACBCSSyllabus20161730.pdf" target="_blank" rel="noreferrer" className="btn" style={{width: 'auto'}}>Lab Guide</a>
            </div>
            <div className="resource-card">
              <h3>Elective Subjects</h3>
              <p>Specialization options and elective course details</p>
              <a href="https://hpuniv.ac.in/upload/syllabus/596af9ceda572BCACBCSSyllabus20161730.pdf" target="_blank" rel="noreferrer" className="btn" style={{width: 'auto'}}>View Electives</a>
            </div>
          </div>
        </div>

        {/* --- NEW: BCA Question Papers Section --- */}
        <div className="container">
          <h2 className="section-title">BCA Question Papers</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Previous Year Papers</h3>
              <p>Question papers from 2018-2024 with solutions</p>
              <Link to="/dashboard?category=exams" className="btn" style={{width: 'auto'}}>Download Papers</Link>
            </div>
            <div className="resource-card">
              <h3>Sample Papers</h3>
              <p>Practice papers with detailed answer keys</p>
              <Link to="/dashboard?category=exams" className="btn" style={{width: 'auto'}}>Practice Now</Link>
            </div>
            <div className="resource-card">
              <h3>Important Questions</h3>
              <p>Frequently asked questions and model answers</p>
              <Link to="/dashboard?category=exams" className="btn" style={{width: 'auto'}}>Study Questions</Link>
            </div>
            <div className="resource-card">
              <h3>Mock Tests</h3>
              <p>Online mock tests with instant results</p>
              <Link to="/dashboard?category=exams" className="btn" style={{width: 'auto'}}>Take Test</Link>
            </div>
            <div className="resource-card">
              <h3>Subject-wise Papers</h3>
              <p>Question papers organized by subject and semester</p>
              <Link to="/dashboard?category=exams" className="btn" style={{width: 'auto'}}>Browse Papers</Link>
            </div>
            <div className="resource-card">
              <h3>University Guidelines</h3>
              <p>Exam patterns, marking schemes, and guidelines</p>
              <Link to="/dashboard?category=exams" className="btn" style={{width: 'auto'}}>Exam Guide</Link>
            </div>
          </div>
        </div>

        {/* --- NEW: Study Resources --- */}
        <div className="container">
          <h2 className="section-title">Study Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Interview Questions</h3>
              <p>Most asked React, Node.js, and MongoDB interview questions.</p>
              <Link to="/dashboard#interview-section">
                <button className="btn">Start Practicing</button>
                </Link>
            </div>
            <div className="resource-card">
              <h3>Cheatsheets</h3>
              <p>Quick reference PDFs for Hooks, Express, and Mongoose.</p>
              <Link to="/dashboard" className="btn" style={{width: 'auto'}}>Download</Link>
            </div>
            <div className="resource-card">
              <h3>Career Resources</h3>
              <p>Resume tips, job search guides, and career advice.</p>
              <Link to="/dashboard" className="btn" style={{width: 'auto'}}>Explore</Link>
            </div>
          </div>
        </div>

        {/* --- NEW: Testimonials Section --- */}
        <div className="testimonials" data-animate id="testimonials-section">
          <div className="container">
            <h2 className={`section-title ${visibleSections.has('testimonials-section') ? 'fade-in-up' : ''}`} style={{color: 'white'}}>What Our Students Say</h2>
            <div className={`testimonial-grid ${visibleSections.has('testimonials-section') ? 'fade-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
              <div className="testimonial-card">
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>
                  {'★'.repeat(5)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#e5e7eb' }}>
                  "This platform transformed my career! The React course was comprehensive and the interview questions helped me land my dream job."
                </p>
                <div className="t-meta">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" alt="Sarah Johnson" />
                  <div>
                    <strong style={{ color: 'white' }}>Sarah Johnson</strong>
                    <span>Frontend Developer</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>
                  {'★'.repeat(5)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#e5e7eb' }}>
                  "The BCA study materials are excellent. The syllabus coverage and question papers helped me score 95% in my exams."
                </p>
                <div className="t-meta">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="Rahul Sharma" />
                  <div>
                    <strong style={{ color: 'white' }}>Rahul Sharma</strong>
                    <span>BCA Student</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fbbf24' }}>
                  <span style={{ color: '#fbbf24' }}>{'★'.repeat(5)}</span>
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#e5e7eb' }}>
                  "Node.js and MongoDB courses are top-notch. The practical projects and real-world examples made learning enjoyable."
                </p>
                <div className="t-meta">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="Emily Chen" />
                  <div>
                    <strong style={{ color: 'white' }}>Emily Chen</strong>
                    <span>Full Stack Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW: Newsletter Signup Section --- */}
        <div className="container" data-animate id="newsletter-section">
          <div className={`newsletter-signup ${visibleSections.has('newsletter-section') ? 'fade-in-up' : ''}`}>
            <div className="newsletter-content">
              <h2>Stay Updated</h2>
              <p>Get the latest courses, study materials, and exclusive offers delivered to your inbox.</p>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                />
                <button className="btn newsletter-btn">Subscribe</button>
              </div>
              <p className="newsletter-note">No spam, unsubscribe at any time.</p>
            </div>
          </div>
        </div>

      </div>
    );
  } catch (error) {
    console.error('Home component render error:', error);
    return (
      <div style={{ padding: '20px', background: '#f8fafc', minHeight: '100vh' }}>
        <h1>Error Loading Home Page</h1>
        <p>There was an error loading the home page. Please try refreshing the page.</p>
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
          Error: {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            background: '#06b6d4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }
};

export default Home;