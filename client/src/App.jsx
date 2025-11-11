import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global CSS
import './App.css';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail'; // Fix #1: Path ko 'pages' kiya
import Login from './pages/Login'; // Fix #2: Login component import kiya
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
      {/* Navbar ab hamesha top par rahega */}
      <Navbar />
      
      {/* Fix #3: Wo extra padding wala div hata diya */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} /> {/* Fix #4: h2 tag ki jagah Login component dala */}
          
          {/* Placeholder for future */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
      </BrowserRouter>
  );
}

export default App;