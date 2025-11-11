import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { courses } from '../data';

const Dashboard = () => {
  const featuredCourse = courses[0];
  const recommendedLessons =
    (featuredCourse?.syllabus || []).filter(item => item.type === 'video').slice(0, 6);

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

