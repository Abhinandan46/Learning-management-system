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
          title: 'Test Video - Never Gonna Give You Up',
          url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          category: 'react'
        },
        {
          id: 105,
          type: 'video',
          title: 'React Full Tutorial (Provided Link)',
          url: 'https://www.youtube.com/embed/sBws8MSXN7A',
          category: 'react'
        },
        {
          id: 106,
          type: 'video',
          title: 'React Deep Dive (timestamped)',
          url: 'https://www.youtube.com/embed/sBws8MSXN7A?start=40390',
          category: 'react'
        },
        {
          id: 107,
          type: 'video',
          title: 'Data Science with Python - Basics',
          url: 'https://www.youtube.com/embed/vmEHCJofslg',
          category: 'data-science'
        },
        {
          id: 108,
          type: 'video',
          title: 'Machine Learning Fundamentals',
          url: 'https://www.youtube.com/embed/ukzFI9rgwfU',
          category: 'ai-ml'
        },
        {
          id: 109,
          type: 'video',
          title: 'Node.js Crash Course',
          url: 'https://www.youtube.com/embed/fBNz5xF-Kx4',
          category: 'nodejs'
        },
        {
          id: 110,
          type: 'video',
          title: 'MongoDB Tutorial',
          url: 'https://www.youtube.com/embed/ofme2o29ngU',
          category: 'mongodb'
        },
        {
          id: 111,
          type: 'video',
          title: 'Express.js Guide',
          url: 'https://www.youtube.com/embed/L72fhGm1tfE',
          category: 'express'
        },
        {
          id: 112,
          type: 'video',
          title: 'Python for Beginners',
          url: 'https://www.youtube.com/embed/rfscVS0vtbw',
          category: 'python'
        },
        {
          id: 113,
          type: 'video',
          title: 'JavaScript ES6 Features',
          url: 'https://www.youtube.com/embed/jS4aFq5-91M',
          category: 'javascript'
        },
        {
          id: 114,
          type: 'video',
          title: 'HTML & CSS Basics',
          url: 'https://www.youtube.com/embed/UB1O30fR-EE',
          category: 'html-css'
        },
        {
          id: 115,
          type: 'video',
          title: 'Git and GitHub Tutorial',
          url: 'https://www.youtube.com/embed/SWYqp7iY_Tc',
          category: 'git'
        },
        {
          id: 116,
          type: 'video',
          title: 'Docker for Beginners',
          url: 'https://www.youtube.com/embed/fqMOX6JJhGo',
          category: 'docker'
        },
        {
          id: 117,
          type: 'video',
          title: 'AWS Cloud Basics',
          url: 'https://www.youtube.com/watch?v=ulprqHHWlng',
          category: 'aws'
        },
        {
          id: 118,
          type: 'video',
          title: 'Cybersecurity Fundamentals',
          url: 'https://www.youtube.com/watch?v=inWWhr5tnEA',
          category: 'cybersecurity'
        },
        {
          id: 119,
          type: 'video',
          title: 'UI/UX Design Principles',
          url: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU',
          category: 'ui-ux'
        },
        {
          id: 120,
          type: 'video',
          title: 'DevOps Overview',
          url: 'https://www.youtube.com/watch?v=Xrgk023l4lI',
          category: 'devops'
        },
        {
          id: 121,
          type: 'video',
          title: 'Python for Data Science - Pandas Tutorial',
          url: 'https://www.youtube.com/watch?v=vmEHCJofslg',
          category: 'python'
        },
        {
          id: 122,
          type: 'video',
          title: 'JavaScript DOM Manipulation',
          url: 'https://www.youtube.com/watch?v=5fb2aPlgoys',
          category: 'javascript'
        },
        {
          id: 123,
          type: 'video',
          title: 'CSS Flexbox Guide',
          url: 'https://www.youtube.com/watch?v=JJSoEo8JSnc',
          category: 'html-css'
        },
        {
          id: 124,
          type: 'video',
          title: 'Git Branching and Merging',
          url: 'https://www.youtube.com/embed/FyAAIHHClqI',
          category: 'git'
        },
        {
          id: 125,
          type: 'video',
          title: 'Docker Compose Tutorial',
          url: 'https://www.youtube.com/embed/HG6yIjZapSA',
          category: 'docker'
        },
        {
          id: 126,
          type: 'video',
          title: 'AWS S3 Bucket Setup',
          url: 'https://www.youtube.com/embed/77lMCrQg6HE',
          category: 'aws'
        },
        {
          id: 127,
          type: 'video',
          title: 'Cybersecurity Basics for Beginners',
          url: 'https://www.youtube.com/embed/rcDO8km6R6c',
          category: 'cybersecurity'
        },
        {
          id: 128,
          type: 'video',
          title: 'UI/UX Design Process',
          url: 'https://www.youtube.com/embed/hvL1339luv0',
          category: 'ui-ux'
        },
        {
          id: 129,
          type: 'video',
          title: 'Machine Learning with Scikit-Learn',
          url: 'https://www.youtube.com/embed/0Lt9w-BxKFQ',
          category: 'ai-ml'
        },
        {
          id: 130,
          type: 'video',
          title: 'Node.js REST API Tutorial',
          url: 'https://www.youtube.com/embed/pKd0Rpw7O48',
          category: 'nodejs'
        },
        {
          id: 131,
          type: 'video',
          title: 'MongoDB Aggregation Pipeline',
          url: 'https://www.youtube.com/embed/0L0kBK9Kc4g',
          category: 'mongodb'
        },
        {
          id: 132,
          type: 'video',
          title: 'Express.js Middleware',
          url: 'https://www.youtube.com/embed/lY6icfhap2o',
          category: 'express'
        },
        {
          id: 133,
          type: 'video',
          title: 'Data Visualization with Matplotlib',
          url: 'https://www.youtube.com/embed/DAQNHzOcO5A',
          category: 'data-science'
        },
        {
          id: 134,
          type: 'video',
          title: 'Advanced React Patterns',
          url: 'https://www.youtube.com/embed/5JzIuAQ7V6U',
          category: 'react'
        },
        {
          id: 102,
          type: 'note',
          title: 'React Hooks Cheatsheet (PDF)',
          url: '#',
          category: 'react'
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
          ],
          category: 'react'
        },
        {
          id: 104,
          type: 'video',
          title: 'Project Setup Guide',
          url: 'https://www.youtube.com/embed/QFaFIcGhPoM',
          category: 'react'
        }
      ]
    },
    // ... Baaki courses same pattern par update kar sakte hain
  ];

export const interviewQuestions = [
  // React Questions
  {
    id: 1,
    category: 'react',
    type: 'mcq',
    question: 'What is JSX in React?',
    options: ['JavaScript XML', 'JavaScript Extension', 'JSON XML', 'Java Syntax Extension'],
    correct: 'JavaScript XML',
    explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React.'
  },
  {
    id: 2,
    category: 'react',
    type: 'short',
    question: 'Explain the difference between state and props in React.',
    answer: 'Props are immutable and passed from parent to child components, while state is mutable and managed within a component.'
  },
  {
    id: 3,
    category: 'react',
    type: 'mcq',
    question: 'Which hook is used for side effects in React?',
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correct: 'useEffect',
    explanation: 'useEffect is used to perform side effects in functional components.'
  },
  {
    id: 4,
    category: 'react',
    type: 'short',
    question: 'What is the virtual DOM in React?',
    answer: 'Virtual DOM is a lightweight representation of the actual DOM that React uses to optimize rendering performance.'
  },
  {
    id: 5,
    category: 'react',
    type: 'mcq',
    question: 'What does the useMemo hook do?',
    options: ['Manages state', 'Memoizes expensive calculations', 'Handles side effects', 'Manages context'],
    correct: 'Memoizes expensive calculations',
    explanation: 'useMemo memoizes the result of expensive calculations to avoid unnecessary re-computations.'
  },

  // JavaScript Questions
  {
    id: 6,
    category: 'javascript',
    type: 'mcq',
    question: 'What is the output of typeof null?',
    options: ['null', 'undefined', 'object', 'boolean'],
    correct: 'object',
    explanation: 'In JavaScript, typeof null returns "object" due to a historical bug in the language.'
  },
  {
    id: 7,
    category: 'javascript',
    type: 'short',
    question: 'Explain the difference between == and === in JavaScript.',
    answer: '== performs type coercion before comparison, while === performs strict comparison without type coercion.'
  },
  {
    id: 8,
    category: 'javascript',
    type: 'mcq',
    question: 'Which method is used to add an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correct: 'push()',
    explanation: 'push() method adds one or more elements to the end of an array.'
  },
  {
    id: 9,
    category: 'javascript',
    type: 'short',
    question: 'What is a closure in JavaScript?',
    answer: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.'
  },
  {
    id: 10,
    category: 'javascript',
    type: 'mcq',
    question: 'What is the purpose of the async/await keywords?',
    options: ['To create loops', 'To handle asynchronous operations', 'To define classes', 'To create arrays'],
    correct: 'To handle asynchronous operations',
    explanation: 'async/await is used to handle asynchronous operations in a synchronous manner.'
  },

  // Node.js Questions
  {
    id: 11,
    category: 'nodejs',
    type: 'mcq',
    question: 'What is Node.js?',
    options: ['A database', 'A web browser', 'A JavaScript runtime', 'A CSS framework'],
    correct: 'A JavaScript runtime',
    explanation: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.'
  },
  {
    id: 12,
    category: 'nodejs',
    type: 'short',
    question: 'Explain the event loop in Node.js.',
    answer: 'The event loop is a mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel.'
  },
  {
    id: 13,
    category: 'nodejs',
    type: 'mcq',
    question: 'Which module is used for file system operations in Node.js?',
    options: ['http', 'fs', 'path', 'url'],
    correct: 'fs',
    explanation: 'The fs module provides an API for interacting with the file system.'
  },
  {
    id: 14,
    category: 'nodejs',
    type: 'short',
    question: 'What is npm in Node.js?',
    answer: 'npm (Node Package Manager) is the default package manager for Node.js that allows installation and management of packages.'
  },
  {
    id: 15,
    category: 'nodejs',
    type: 'mcq',
    question: 'What does the __dirname variable represent?',
    options: ['Current file name', 'Current directory path', 'Parent directory', 'Root directory'],
    correct: 'Current directory path',
    explanation: '__dirname represents the directory name of the current module.'
  },

  // MongoDB Questions
  {
    id: 16,
    category: 'mongodb',
    type: 'mcq',
    question: 'What type of database is MongoDB?',
    options: ['Relational', 'NoSQL', 'Graph', 'Key-Value'],
    correct: 'NoSQL',
    explanation: 'MongoDB is a NoSQL document database.'
  },
  {
    id: 17,
    category: 'mongodb',
    type: 'short',
    question: 'What is a document in MongoDB?',
    answer: 'A document is a set of key-value pairs that represents a single record in a MongoDB collection.'
  },
  {
    id: 18,
    category: 'mongodb',
    type: 'mcq',
    question: 'Which command is used to insert a document in MongoDB?',
    options: ['insertOne()', 'addOne()', 'createOne()', 'putOne()'],
    correct: 'insertOne()',
    explanation: 'insertOne() is used to insert a single document into a MongoDB collection.'
  },
  {
    id: 19,
    category: 'mongodb',
    type: 'short',
    question: 'Explain indexing in MongoDB.',
    answer: 'Indexing improves query performance by creating data structures that allow for faster data retrieval.'
  },
  {
    id: 20,
    category: 'mongodb',
    type: 'mcq',
    question: 'What is the default port for MongoDB?',
    options: ['27017', '3306', '5432', '6379'],
    correct: '27017',
    explanation: 'MongoDB runs on port 27017 by default.'
  },

  // Express.js Questions
  {
    id: 21,
    category: 'express',
    type: 'mcq',
    question: 'What is Express.js?',
    options: ['A database', 'A web framework for Node.js', 'A testing library', 'A CSS preprocessor'],
    correct: 'A web framework for Node.js',
    explanation: 'Express.js is a minimal and flexible Node.js web application framework.'
  },
  {
    id: 22,
    category: 'express',
    type: 'short',
    question: 'What is middleware in Express.js?',
    answer: 'Middleware functions are functions that have access to the request object, response object, and the next middleware function.'
  },
  {
    id: 23,
    category: 'express',
    type: 'mcq',
    question: 'Which method is used to define a route in Express?',
    options: ['route()', 'path()', 'get()', 'define()'],
    correct: 'get()',
    explanation: 'get() method is used to define GET routes in Express.js.'
  },
  {
    id: 24,
    category: 'express',
    type: 'short',
    question: 'Explain the purpose of body-parser middleware.',
    answer: 'body-parser middleware parses incoming request bodies in a middleware before your handlers, available under req.body property.'
  },
  {
    id: 25,
    category: 'express',
    type: 'mcq',
    question: 'What does the next() function do in middleware?',
    options: ['Ends the request', 'Passes control to the next middleware', 'Redirects the request', 'Sends a response'],
    correct: 'Passes control to the next middleware',
    explanation: 'next() passes control to the next middleware function in the stack.'
  },

  // Python Questions
  {
    id: 26,
    category: 'python',
    type: 'mcq',
    question: 'What is Python?',
    options: ['A snake', 'A programming language', 'A database', 'An IDE'],
    correct: 'A programming language',
    explanation: 'Python is a high-level programming language known for its simplicity and readability.'
  },
  {
    id: 27,
    category: 'python',
    type: 'short',
    question: 'Explain the difference between lists and tuples in Python.',
    answer: 'Lists are mutable (can be changed), while tuples are immutable (cannot be changed after creation).'
  },
  {
    id: 28,
    category: 'python',
    type: 'mcq',
    question: 'Which keyword is used to define a function in Python?',
    options: ['function', 'def', 'define', 'func'],
    correct: 'def',
    explanation: 'def keyword is used to define functions in Python.'
  },
  {
    id: 29,
    category: 'python',
    type: 'short',
    question: 'What is PEP 8?',
    answer: 'PEP 8 is the style guide for Python code that defines coding conventions and best practices.'
  },
  {
    id: 30,
    category: 'python',
    type: 'mcq',
    question: 'What does the len() function return?',
    options: ['Length of a string', 'Length of a list/tuple', 'Both A and B', 'None of the above'],
    correct: 'Both A and B',
    explanation: 'len() returns the number of items in a container (string, list, tuple, etc.).'
  },

  // Data Science Questions
  {
    id: 31,
    category: 'data-science',
    type: 'mcq',
    question: 'What is machine learning?',
    options: ['A type of computer', 'Learning from data without explicit programming', 'A programming language', 'A database system'],
    correct: 'Learning from data without explicit programming',
    explanation: 'Machine learning is a subset of AI that enables systems to learn and improve from experience.'
  },
  {
    id: 32,
    category: 'data-science',
    type: 'short',
    question: 'Explain the difference between supervised and unsupervised learning.',
    answer: 'Supervised learning uses labeled data, while unsupervised learning finds patterns in unlabeled data.'
  },
  {
    id: 33,
    category: 'data-science',
    type: 'mcq',
    question: 'Which library is commonly used for data manipulation in Python?',
    options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
    correct: 'Pandas',
    explanation: 'Pandas is a powerful library for data manipulation and analysis in Python.'
  },
  {
    id: 34,
    category: 'data-science',
    type: 'short',
    question: 'What is overfitting in machine learning?',
    answer: 'Overfitting occurs when a model learns the training data too well, including noise, and performs poorly on new data.'
  },
  {
    id: 35,
    category: 'data-science',
    type: 'mcq',
    question: 'What does SQL stand for?',
    options: ['Simple Query Language', 'Structured Query Language', 'Standard Query Language', 'System Query Language'],
    correct: 'Structured Query Language',
    explanation: 'SQL stands for Structured Query Language, used for managing relational databases.'
  },

  // HTML/CSS Questions
  {
    id: 36,
    category: 'html-css',
    type: 'mcq',
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
    correct: 'Hyper Text Markup Language',
    explanation: 'HTML stands for Hyper Text Markup Language, the standard markup language for web pages.'
  },
  {
    id: 37,
    category: 'html-css',
    type: 'short',
    question: 'Explain the box model in CSS.',
    answer: 'The CSS box model describes the rectangular boxes generated for elements, consisting of content, padding, border, and margin.'
  },
  {
    id: 38,
    category: 'html-css',
    type: 'mcq',
    question: 'Which CSS property is used to change text color?',
    options: ['font-color', 'text-color', 'color', 'foreground-color'],
    correct: 'color',
    explanation: 'The color property sets the color of text in CSS.'
  },
  {
    id: 39,
    category: 'html-css',
    type: 'short',
    question: 'What is the difference between inline and block elements?',
    answer: 'Inline elements take only the space they need, while block elements take the full width available.'
  },
  {
    id: 40,
    category: 'html-css',
    type: 'mcq',
    question: 'Which HTML tag is used for the largest heading?',
    options: ['<h1>', '<h6>', '<heading>', '<head>'],
    correct: '<h1>',
    explanation: '<h1> represents the highest level heading in HTML.'
  },

  // Git Questions
  {
    id: 41,
    category: 'git',
    type: 'mcq',
    question: 'What is Git?',
    options: ['A database', 'Version control system', 'Programming language', 'Web browser'],
    correct: 'Version control system',
    explanation: 'Git is a distributed version control system for tracking changes in source code.'
  },
  {
    id: 42,
    category: 'git',
    type: 'short',
    question: 'Explain the difference between git merge and git rebase.',
    answer: 'git merge creates a merge commit, while git rebase rewrites history by moving commits to a new base.'
  },
  {
    id: 43,
    category: 'git',
    type: 'mcq',
    question: 'Which command is used to check the status of the repository?',
    options: ['git status', 'git check', 'git info', 'git state'],
    correct: 'git status',
    explanation: 'git status shows the current state of the working directory and staging area.'
  },
  {
    id: 44,
    category: 'git',
    type: 'short',
    question: 'What is a Git branch?',
    answer: 'A branch is a separate line of development that allows you to work on features independently.'
  },
  {
    id: 45,
    category: 'git',
    type: 'mcq',
    question: 'What does git clone do?',
    options: ['Creates a new repository', 'Copies an existing repository', 'Deletes a repository', 'Merges repositories'],
    correct: 'Copies an existing repository',
    explanation: 'git clone creates a copy of an existing Git repository.'
  },

  // Additional Questions
  {
    id: 46,
    category: 'ai-ml',
    type: 'mcq',
    question: 'What is artificial intelligence?',
    options: ['A type of computer hardware', 'Machines performing tasks that typically require human intelligence', 'A programming language', 'A database system'],
    correct: 'Machines performing tasks that typically require human intelligence',
    explanation: 'AI refers to machines performing tasks that normally require human intelligence.'
  },
  {
    id: 47,
    category: 'docker',
    type: 'short',
    question: 'What is a Docker container?',
    answer: 'A container is a lightweight, standalone, executable package that includes everything needed to run an application.'
  },
  {
    id: 48,
    category: 'aws',
    type: 'mcq',
    question: 'What is AWS?',
    options: ['A programming language', 'Amazon Web Services cloud platform', 'A database', 'An IDE'],
    correct: 'Amazon Web Services cloud platform',
    explanation: 'AWS is a comprehensive cloud computing platform provided by Amazon.'
  },
  {
    id: 49,
    category: 'cybersecurity',
    type: 'short',
    question: 'What is encryption?',
    answer: 'Encryption is the process of converting data into a coded format to prevent unauthorized access.'
  },
  {
    id: 50,
    category: 'ui-ux',
    type: 'mcq',
    question: 'What does UX stand for?',
    options: ['User Experience', 'Universal Experience', 'User Extension', 'Unified Experience'],
    correct: 'User Experience',
    explanation: 'UX stands for User Experience, focusing on the overall experience of users with a product.'
  }
];