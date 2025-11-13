# Learning Management System (LMS)

A comprehensive Learning Management System built with React and Vite, designed to provide an interactive and engaging educational experience. This LMS includes features like course categories, video lectures, interview question practice, BCA-specific study materials, and a modern, responsive UI with authentication.

## Features

- **Course Categories**: Explore various programming and technology courses including Web Development, Data Science, Mobile Development, and more.
- **Video Lectures**: Integrated YouTube video player for seamless learning experience.
- **Interview Questions**: Practice with over 50 interview questions covering technical concepts, coding problems, and theory.
- **BCA Study Materials**: Dedicated section for BCA students with notes, syllabus, and question papers.
- **User Authentication**: Secure login and registration system with persistent sessions.
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop).
- **Modern UI**: Clean, attractive interface with animations, floating buttons, and interactive elements.
- **Progress Tracking**: Visual progress indicators for course completion.
- **Search and Filter**: Easy navigation and filtering of content.

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Video Player**: React Player
- **Icons**: FontAwesome
- **Styling**: Custom CSS with CSS Variables
- **Authentication**: Custom Auth Context with localStorage
- **Deployment**: GitHub Pages / Vercel

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Abhinandan46/Learning-management-system.git
   cd Learning-management-system
   ```

2. **Navigate to the client directory**:
   ```bash
   cd client
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and visit `http://localhost:5173`

## Usage

- **Home Page**: Browse course categories and BCA study materials.
- **Dashboard**: Access video lectures and interview questions after logging in.
- **Login/Register**: Create an account or log in to access premium features.
- **Course Details**: Click on any course to view details and start learning.
- **Interview Practice**: Take quizzes and practice coding questions.

## Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── CourseDetail.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── CourseDetail.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── data.js
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub**: [Abhinandan46](https://github.com/Abhinandan46)
- **Repository**: [Learning-management-system](https://github.com/Abhinandan46/Learning-management-system)

---

*Built with ❤️ using React and Vite*