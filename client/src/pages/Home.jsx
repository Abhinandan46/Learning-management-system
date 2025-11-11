import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data';
// Icons import karein
import { FaLaptopCode, FaDatabase, FaBullhorn, FaCertificate, FaInfinity, FaVideo } from 'react-icons/fa';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>Unlock Your Potential</h1>
        <p style={{ marginTop: '10px', opacity: '0.9' }}>
          Learn from industry experts and boost your career today.
        </p>
      </div>

      {/* --- NEW: Categories Section --- */}
      <div className="container">
        <h2 className="section-title">Popular Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <FaLaptopCode size={30} />
            <p>Web Development</p>
          </div>
          <div className="category-card">
            <FaDatabase size={30} />
            <p>Data Science</p>
          </div>
          <div className="category-card">
            <FaBullhorn size={30} />
            <p>Marketing</p>
          </div>
          <div className="category-card">
            {/* Business icon */}
            <span style={{fontSize: '30px'}}>📈</span>
            <p>Business</p>
          </div>
        </div>
      </div>

      {/* --- Featured Courses Section --- */}
      <div className="container">
        <h2 className="section-title">Featured Courses</h2>
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.thumbnail} alt={course.title} />
              <div className="card-body">
                <h3>{course.title}</h3>
                <p className="instructor">By {course.instructor}</p>
                <div className="meta-info">
                  <span>⭐ {course.rating}</span>
                  <span className="price">{course.price}</span>
                </div>
                <Link to={`/course/${course.id}`} className="btn">
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
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

      {/* --- NEW: Student Testimonials --- */}
      <div className="testimonials">
        <div className="container">
          <h2 className="section-title" style={{color: 'white'}}>What Students Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>"The courses are concise and practical. I landed an internship!"</p>
              <div className="t-meta">
                <img src="https://i.pravatar.cc/48?img=12" alt="student" />
                <div>
                  <strong>Priya Sharma</strong>
                  <span>Frontend Learner</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"The quizzes and projects boosted my confidence for interviews."</p>
              <div className="t-meta">
                <img src="https://i.pravatar.cc/48?img=32" alt="student" />
                <div>
                  <strong>Arjun Verma</strong>
                  <span>MERN Track</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p>"Loved the lifelong access. I revisit lessons whenever I need."</p>
              <div className="t-meta">
                <img src="https://i.pravatar.cc/48?img=5" alt="student" />
                <div>
                  <strong>Neha Gupta</strong>
                  <span>Data Science</span>
                </div>
              </div>
            </div>
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
            <Link to="/dashboard" className="btn" style={{width: 'auto'}}>Start Practicing</Link>
          </div>
          <div className="resource-card">
            <h3>Cheatsheets</h3>
            <p>Quick reference PDFs for Hooks, Express, and Mongoose.</p>
            <Link to="/dashboard" className="btn" style={{width: 'auto'}}>Download</Link>
          </div>
          <div className="resource-card">
            <h3>Community</h3>
            <p>Join our Discord to collaborate and get help.</p>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="btn" style={{width: 'auto'}}>Join Now</a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;