import dotenv from 'dotenv';
import mongoose from 'mongoose';
import SkillTest from '../models/SkillTest.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const skillTestsData = [
  {
    skillName: 'React',
    description: 'Test your knowledge of React fundamentals and hooks',
    duration: 5,
    passingScore: 60,
    totalQuestions: 5,
    questions: [
      {
        question: 'What is the correct way to create a functional component in React?',
        options: [
          'function MyComponent() { return <div>Hello</div>; }',
          'class MyComponent { render() { return <div>Hello</div>; } }',
          'const MyComponent = () => { return "Hello"; }',
          'React.createComponent("MyComponent", () => <div>Hello</div>)'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        question: 'Which hook is used to manage state in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is the purpose of useEffect hook?',
        options: [
          'To create side effects',
          'To manage state',
          'To create context',
          'To optimize performance'
        ],
        correctAnswer: 0,
        difficulty: 'medium'
      },
      {
        question: 'How do you pass data from parent to child component?',
        options: [
          'Using state',
          'Using props',
          'Using context',
          'Using refs'
        ],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is the virtual DOM?',
        options: [
          'A copy of the real DOM kept in memory',
          'A database for storing component data',
          'A rendering engine',
          'A state management tool'
        ],
        correctAnswer: 0,
        difficulty: 'medium'
      }
    ]
  },
  {
    skillName: 'Node.js',
    description: 'Test your knowledge of Node.js and backend development',
    duration: 5,
    passingScore: 60,
    totalQuestions: 5,
    questions: [
      {
        question: 'What is Node.js?',
        options: [
          'A JavaScript runtime built on Chrome\'s V8 engine',
          'A JavaScript framework',
          'A database',
          'A CSS preprocessor'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        question: 'Which module is used to create a web server in Node.js?',
        options: ['fs', 'http', 'path', 'url'],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is npm?',
        options: [
          'Node Package Manager',
          'Node Programming Module',
          'New Programming Method',
          'Node Process Manager'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        question: 'What is the purpose of middleware in Express?',
        options: [
          'To handle database operations',
          'To process requests before reaching route handlers',
          'To render templates',
          'To manage sessions'
        ],
        correctAnswer: 1,
        difficulty: 'medium'
      },
      {
        question: 'Which method is used to read files asynchronously in Node.js?',
        options: [
          'fs.readFileSync()',
          'fs.readFile()',
          'fs.read()',
          'fs.openFile()'
        ],
        correctAnswer: 1,
        difficulty: 'medium'
      }
    ]
  },
  {
    skillName: 'Python',
    description: 'Test your knowledge of Python programming',
    duration: 5,
    passingScore: 60,
    totalQuestions: 5,
    questions: [
      {
        question: 'What is the correct way to create a list in Python?',
        options: [
          'list = []',
          'list = ()',
          'list = {}',
          'list = <>'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        question: 'Which keyword is used to define a function in Python?',
        options: ['function', 'def', 'func', 'define'],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is a dictionary in Python?',
        options: [
          'An ordered collection of items',
          'A collection of key-value pairs',
          'A list of tuples',
          'A set of unique elements'
        ],
        correctAnswer: 1,
        difficulty: 'medium'
      },
      {
        question: 'What is the purpose of __init__ method?',
        options: [
          'To initialize class attributes',
          'To delete objects',
          'To inherit classes',
          'To import modules'
        ],
        correctAnswer: 0,
        difficulty: 'medium'
      },
      {
        question: 'Which library is commonly used for data analysis in Python?',
        options: ['NumPy', 'Flask', 'Django', 'Requests'],
        correctAnswer: 0,
        difficulty: 'medium'
      }
    ]
  },
  {
    skillName: 'JavaScript',
    description: 'Test your knowledge of JavaScript fundamentals',
    duration: 5,
    passingScore: 60,
    totalQuestions: 5,
    questions: [
      {
        question: 'What is the correct syntax for a JavaScript variable declaration?',
        options: [
          'var x = 5;',
          'variable x = 5;',
          'v x = 5;',
          'int x = 5;'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        question: 'What does JSON stand for?',
        options: [
          'JavaScript Object Notation',
          'JavaScript Online Network',
          'Java Standard Object Notation',
          'JavaScript Oriented Notation'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A way to close browser windows',
          'A function with access to parent scope',
          'A loop structure',
          'A type of array'
        ],
        correctAnswer: 1,
        difficulty: 'hard'
      },
      {
        question: 'What is the difference between == and ===?',
        options: [
          'No difference',
          '=== checks type and value, == only checks value',
          '== is faster',
          '=== is deprecated'
        ],
        correctAnswer: 1,
        difficulty: 'medium'
      },
      {
        question: 'What is async/await used for?',
        options: [
          'Synchronous operations',
          'Handling asynchronous operations',
          'Error handling',
          'Type checking'
        ],
        correctAnswer: 1,
        difficulty: 'medium'
      }
    ]
  },
  {
    skillName: 'MongoDB',
    description: 'Test your knowledge of MongoDB database',
    duration: 5,
    passingScore: 60,
    totalQuestions: 5,
    questions: [
      {
        question: 'What type of database is MongoDB?',
        options: [
          'Relational',
          'NoSQL Document',
          'Graph',
          'Key-Value'
        ],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        question: 'What is a collection in MongoDB?',
        options: [
          'A group of databases',
          'A group of documents',
          'A single document',
          'A query result'
        ],
        correctAnswer: 1,
        difficulty: 'easy'
      },
      {
        question: 'Which method is used to insert a document in MongoDB?',
        options: [
          'insertOne()',
          'add()',
          'create()',
          'push()'
        ],
        correctAnswer: 0,
        difficulty: 'easy'
      },
      {
        question: 'What is the default port for MongoDB?',
        options: [
          '3000',
          '5432',
          '27017',
          '8080'
        ],
        correctAnswer: 2,
        difficulty: 'medium'
      },
      {
        question: 'What is an index in MongoDB?',
        options: [
          'A way to sort documents',
          'A data structure that improves query performance',
          'A collection counter',
          'A database backup'
        ],
        correctAnswer: 1,
        difficulty: 'medium'
      }
    ]
  }
];

const seedSkillTests = async () => {
  try {
    await connectDB();

    // Clear existing tests
    await SkillTest.deleteMany({});
    console.log('✓ Cleared existing skill tests');

    // Insert new tests
    const tests = await SkillTest.insertMany(skillTestsData);
    console.log(`✓ Seeded ${tests.length} skill tests`);

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123456', 10);
      
      await User.create({
        name: 'Admin User',
        email: process.env.ADMIN_EMAIL || 'admin@letlearn.com',
        password: hashedPassword,
        role: 'admin',
        bio: 'Platform Administrator',
        isOnline: false
      });
      
      console.log('✓ Created admin user');
      console.log(`  Email: ${process.env.ADMIN_EMAIL || 'admin@letlearn.com'}`);
      console.log(`  Password: ${process.env.ADMIN_PASSWORD || 'admin123456'}`);
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedSkillTests();
