export const courses = [
    {
      id: 1,
      title: "Full Stack MERN Bootcamp",
      instructor: "Rahul Sharma",
      rating: 4.8,
      price: "₹4999",
      thumbnail: "https://via.placeholder.com/300x200.png?text=MERN+Stack",
      description: "Complete MERN Stack course with Notes and Quizzes.",
      // Syllabus ab Objects ka Array hai
      syllabus: [
        {
          id: 101,
          type: 'video',
          title: 'Introduction to React',
          url: 'https://youtu.be/LuNPCSNr-nE?si=dt_yIVnjB-AgU9vY' // React Tutorial Link
        },
        {
          id: 102,
          type: 'note',
          title: 'React Hooks Cheatsheet (PDF)',
          url: '#' // Dummy PDF Link
        },
        {
          id: 103,
          type: 'quiz',
          title: 'React Basics Quiz',
          questions: [
            {
              question: "React mein UI banane ke liye kya use hota hai?",
              options: ["Components", "Database", "Server"],
              correct: "Components"
            },
            {
              question: "useEffect kab chalta hai?",
              options: ["Sirf mount par", "Mount aur Update par", "Kabhi nahi"],
              correct: "Mount aur Update par"
            }
          ]
        },
        {
          id: 104,
          type: 'video',
          title: 'Project Setup Guide',
          url: 'https://www.youtube.com/watch?v=QFaFIcGhPoM'
        }
      ]
    },
    // ... Baaki courses same pattern par update kar sakte hain
  ];