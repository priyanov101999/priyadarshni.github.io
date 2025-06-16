import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import profilePic from '../asserts/profile.jpeg'; // adjust path if needed

// --- Styled Components ---

const TerminalContainer = styled.div`
  background-color: #000;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #ffcc00;
`;

const Subtitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #66ff66;
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const Cursor = styled.span`
  font-weight: bold;
  font-size: 24px;
  animation: ${blink} 1s infinite;
`;

const TerminalLine = styled.div`
  white-space: pre-wrap;
  color: ${({ isHeading }) => (isHeading ? '#ffcc00' : '#00ff00')};
  font-weight: ${({ isHeading }) => (isHeading ? 'bold' : 'normal')};
  margin-bottom: ${({ isHeading }) => (isHeading ? '10px' : '5px')};
`;

const MenuOption = styled.div`
  cursor: pointer;
  color: #00ff00;
  margin: 5px 0;
  &:hover {
    text-decoration: underline;
  }
`;

// Project card styles
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ProjectCard = styled.div`
  background-color: #111;
  border: 1px solid #00ff00;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003300;
  }
`;

const ProjectTitle = styled.h3`
  color: #ffcc00;
  margin-bottom: 10px;
`;

const ProjectDescription = styled.p`
  margin: 5px 0;
`;

const ProjectLink = styled.a`
  color: #66ffcc;
  text-decoration: underline;
  display: inline-block;
  margin-top: 8px;
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #111;
  border: 2px solid #00ff00;
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  color: #00ff00;
  font-family: 'Courier New', Courier, monospace;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  border: 1px solid #00ff00;
  color: #00ff00;
  font-size: 18px;
  cursor: pointer;
  border-radius: 4px;
  padding: 3px 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #00ff00;
    color: #000;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

// Project images
const projectImages = [
  'https://via.placeholder.com/600x200?text=Advanced+Summarization+Engine',
  'https://via.placeholder.com/600x200?text=Student+Safety+App',
  'https://via.placeholder.com/600x200?text=Sign+Language+Detection',
  'https://via.placeholder.com/600x200?text=Stock+Prediction+Model',
  'https://via.placeholder.com/600x200?text=Anomaly+Detection+in+Diabetic+Health',
  'https://via.placeholder.com/600x200?text=Clothing+Design+DCGAN',
];

const projects = [
  {
    title: 'Advanced Summarization Engine with BERT and Clustering',
    stack: 'LLMS, Flask, Next.js, React, BERT, spaCy',
    details: [
      'Built an AI-powered Summarization platform using Flask, BERT embeddings, and KMeans clustering for efficient document summarization, improving speed by 40% and boosting ROUGE scores by 20%.',
      'Designed a frontend with Next.js and React, integrated Mysql and Redis for optimized data storage and caching.',
    ],
    link: 'https://github.com/priyanov101999/Summarizer'
  },
  {
    title: 'Student Safety App',
    stack: 'Node.js, React Native, React.js, Socket.io',
    details: [
      'Developed and Deployed an app that instantly alerts the nearest police station in under a few seconds for students in emergency situations where speaking or calling is not possible, using Socket.io for seamless real-time communication and GPS integration to provide accurate location data.',
      'Built authentication and authorization for different user roles by developing a Police Station web application using React.js, a Student mobile app using React Native, and a backend system with Node.js.',
    ],
    link: 'https://github.com/priyanov101999/StudentSafety/tree/dev'
  },
  {
    title: 'Sign Language Detection for the Deaf and Mute',
    stack: 'Python, PyTorch, Angular, PostgreSQL, Deep Learning Models',
    details: [
      'Implemented real-time sign language recognition to facilitate communication between deaf individuals and the hearing community, leveraging the SSD architecture for accurate and efficient object detection in PyTorch.',
      'Created an Angular frontend for intuitive user interaction, integrated PostgreSQL for optimized data storage.'
    ],
    link: 'https://github.com/priyanov101999/sign-language-detection'
  },
  {
    title: 'Advanced Stock Prediction Model with Multivariate RNNs',
    stack: 'Python, PyTorch, NumPy, Pandas',
    details: [
      'Developed an LSTM-based deep learning model to predict stock prices using 10-day sliding windows of historical Open, High, Low, and Close data.',
      'Preprocessed and scaled time-series financial data, implemented a custom PyTorch Dataset and DataLoader for efficient model training and evaluation.',
      'Achieved accurate stock price forecasting with reduced loss and visualized predictions aligning closely with actual prices, demonstrating strong model performance.'
    ],
    link: 'https://github.com/priyanov101999/ML-DL-Hub/tree/main/Stock%20market%20prediction'
  },
  {
    title: 'Anomaly Detection in Diabetic Health Data',
    stack: 'Python, PyTorch, NumPy, Pandas',
    details: [
      'Detected irregularities using an autoencoder-based system.',
      'Autoencoder trained on normalized 7-feature input data to reconstruct input; training loss steadily decreased over 20 epochs (from ~0.79 to ~0.35 MSE).',
      'Used reconstruction error on training data to set anomaly detection threshold (mean + 1.5×std); then detected anomalies in test data where reconstruction loss exceeded this threshold.',
      'Visualized distribution of reconstruction errors with histogram and threshold line to illustrate anomaly cutoff and error spread in training data.'
    ],
    link: 'https://github.com/priyanov101999/ML-DL-Hub/tree/main/Anomaly%20Detection%20in%20Healthcare%20Diabetes%20Dataset'
  },
  
  {
    title: 'Innovative Clothing Design with DCGANs',
    stack: 'Python, PyTorch, NumPy, Pandas',
    details: [
      'Built a DCGAN model to generate high-resolution clothing designs.'
    ],
    link: 'https://github.com/priyanov101999/ML-DL-Hub/tree/main/Stock%20market%20prediction'
  }
];

// Terminal component
const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [initialRendered, setInitialRendered] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    
      
      const welcomeLines = [
        "Welcome to Priyadarshni Sundararajan's Portfolio Terminal!",
        '',
        "Type 'menu' to see the list of available commands.",
      ];
      
      setOutput(welcomeLines);
  
      // Instead of setting input and triggering the command twice,
      // directly call handleCommand('menu') after a short delay.
      handleCommand('menu');
  }, []);

  const handleCommand = (command) => {
    const lowerCmd = command.toLowerCase();
    switch (lowerCmd) {
      case 'menu':
        setOutput((prev) => [
          ...prev,
          `> ${command}`,
          <MenuOption key="about" onClick={() => handleCommand('about')}>About</MenuOption>,
          <MenuOption key="education" onClick={() => handleCommand('education')}>Education</MenuOption>,
          <MenuOption key="experience" onClick={() => handleCommand('experience')}>Experience</MenuOption>,
          <MenuOption key="skills" onClick={() => handleCommand('skills')}>Skills</MenuOption>,
          <MenuOption key="projects" onClick={() => handleCommand('projects')}>Projects</MenuOption>,
          <MenuOption key="awards" onClick={() => handleCommand('awards')}>Awards and Recognition</MenuOption>,
          <MenuOption key="contact" onClick={() => handleCommand('contact')}>Contact</MenuOption>,
          
        ]);
        break;

      case 'about':
        setOutput((prev) => [
          ...prev,
          `> ${command}`,
          'I am Priyadarshni Sundararajan,a passionate Full-Stack Developer with 2.5 years of hands-on experience building scalable, high-performance web and mobile applications, complemented by 1.5 years of graduate studies specializing in Artificial Intelligence and Machine Learning at the University at Buffalo.',
          'My career bridges the gap between robust software engineering and AI innovation — designing seamless user experiences while architecting intelligent systems that solve real-world problems.',
        ]);
        break;

      case 'education':
        setOutput((prev) => [
          ...prev,
          `> ${command}`,
          '',
          'State University of New York, Buffalo',
          'Masters in Computer Science | Jan 2024 - May 2025 | GPA: 3.7/4.0',
          '',
          'Anna University, Chennai',
          'B.Tech in Information Technology | Aug 2017 - May 2021 | GPA: 8.43/10',
        ]);
        break;

        case 'experience':
          setOutput((prev) => [
            ...prev,
            <span style={{ color: '#8BE9FD' }}>{`> ${command}`}</span>, // cyan for command
            <br />,
            <span style={{ color: '#F8F8F2' }}> </span>, // blank line (white)
            <span style={{ color: '#50FA7B', fontWeight: 'bold' }}>
              Virdhi Tech Lab | Full Stack Developer | Dec 2021 - Dec 2023
            </span>,
            <br />,
            <span style={{ color: '#F1FA8C', fontStyle: 'italic' }}>Campus Automation Software Project</span>,
            <br />,
            <span style={{ color: '#BD93F9' }}>
              Stacks:{' '}
              <span style={{ color: '#F1FA8C' }}>
                React.js, PostgreSQL, Node.js, AWS, React Native, Firebase, TypeScript, Microservices, Laravel
              </span>
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Developed a campus resource platform for 20,000+ users using React.js, Node.js, and React Native, collaborating with cross-functional teams to deliver a seamless experience.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Designed and integrated high-performance RESTful APIs, optimizing response times by 25%, and deployed containerized backend APIs on AWS EC2 with Amazon S3 and RDS for scalable storage and management.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Built a scalable Node.js common module enabling 40% faster data retrieval across 20+ listing APIs, while implementing a secure login flow for 6 user roles, reducing unauthorized access by 60%.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Integrated refresh token functionality in Node.js, ensuring seamless authentication for 20,000+ users, enhancing security, and maintaining system reliability.
            </span>,
            <br />,
            <span style={{ color: '#F1FA8C', fontStyle: 'italic' }}>English Power Academy Project</span>,
            <br />,
            <span style={{ color: '#BD93F9' }}>
              Stacks:{' '}
              <span style={{ color: '#F1FA8C' }}>
                React Native, Next.js, Laravel, React.js, Node.js, PostgresQL, HTML, CSS, Material UI, Socket.io, GraphQL
              </span>
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Developed high-performance, scalable web and mobile user interfaces with React and React Native, ensuring 95% responsiveness and engaging user experiences while collaborating closely with UI/UX designers.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Led a 4-member mobile development team, built 50+ reusable, modular components with hardware access, optimized performance using Material-UI and Bootstrap, and conducted UI tests (Jest, React Testing Library) to ensure a smooth, bug-free user experience.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Designed a cost-efficient storage solution for 10,000+ video uploads, reducing AWS S3 usage by 40%, optimizing Cloud Storage performance and Database Management Systems.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Led POC and Research & Development for interactive features like text-to-speech with synchronized word highlighting, while optimizing video upload UI to reduce AWS S3 dependency and minimize cloud storage costs.
            </span>,
            <br />,
            <span style={{ color: '#50FA7B', fontWeight: 'bold' }}>
              Sirius Computer Solutions | Software Consultant | May 2021 - Dec 2021
            </span>,
            <br />,
            <span style={{ color: '#BD93F9' }}>
              Stacks:{' '}
              <span style={{ color: '#F1FA8C' }}>
                Software Consultant | Java, Angular, Spring Boot, Design Patterns, HTML, AEM
              </span>
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}> </span>, // blank line
            <span style={{ color: '#F8F8F2' }}>
              • Developed reusable backend components in Spring Boot with Java, reducing code redundancy by 30% and improving system scalability.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Troubleshooted and resolved 50+ critical and non-critical bugs across AEM, Angular, and Java, reducing downtime.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Optimized backend and frontend performance in Spring Boot applications, reducing API response times by 25% for a smoother user experience.
            </span>,
            <br />,
            <span style={{ color: '#F8F8F2' }}>
              • Developed and tested Spring Boot backend RESTful services, writing 100+ JUnit test cases, achieving 90%+ test coverage, and managing dependencies and builds with Maven.
            </span>,
          ]);
          break;
        
        case 'skills':
  setOutput((prev) => [
    ...prev,
    <span style={{ color: '#8BE9FD' }}>{`> ${command}`}</span>,
    <span style={{ color: '#F1FA8C' }}>
      Programming Languages: <span style={{ color: '#50FA7B' }}>JavaScript, Java, Python, C, PHP, TypeScript</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      Databases: <span style={{ color: '#50FA7B' }}>MySQL, MongoDB, PostgreSQL, NoSQL, SQL, Database Design, Relational Databases, SQL Queries</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      Front-End Development: <span style={{ color: '#50FA7B' }}>React.js, Angular, Next.js, Redux, HTML5, CSS, Material UI, Bootstrap, jQuery, CSS3</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      Back-End Development: <span style={{ color: '#50FA7B' }}>Node.js, Laravel, Flask, Spring Boot, FASTApi, Socket.io, Express.js, Hibernate, J2EE, Core Java, GraphQL</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      Machine Learning and Data Analysis: <span style={{ color: '#50FA7B' }}>ML/DL Frameworks, scikit-learn, PyTorch, NumPy, Pandas, Matplotlib, Data Processing</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      Mobile Application Development: <span style={{ color: '#50FA7B' }}>React Native, Expo, iOS, Android, mobile apps</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      Version Control Systems: <span style={{ color: '#50FA7B' }}>Git, GitHub, GitLab</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      Cloud Services: <span style={{ color: '#50FA7B' }}>Amazon Web Services (AWS), Azure, Firebase</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      DevOps and CI/CD Pipelines: <span style={{ color: '#50FA7B' }}>Jenkins, Docker, Kubernetes, Maven, Developer Tools (NPM, Webpack, JIRA)</span>
    </span>,
    <span style={{ color: '#F1FA8C' }}>
      System Design & Scalability: <span style={{ color: '#50FA7B' }}>Microservices, Load Balancing, Caching (Redis, Memcached), Distributed Systems</span>
    </span>,
  ]);
  break;


      case 'projects':
        setOutput((prev) => [
          ...prev,
          `> ${command}`,
          <CardGrid key="project-cards">
            {projects.map((project, index) => (
              <ProjectCard key={index} onClick={() => setSelectedProject(index)} tabIndex={0} onKeyPress={(e) => {
                if (e.key === 'Enter') setSelectedProject(index);
              }}>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription><strong>Stack:</strong> {project.stack}</ProjectDescription>
                <ProjectDescription>{project.details[0]}</ProjectDescription>
                <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
                  GitHub Link
                </ProjectLink>
              </ProjectCard>
            ))}
          </CardGrid>
        ]);
        break;
        case 'awards':
          setOutput((prev) => [
            ...prev,
            `> ${command}`,
            '',
            'Outstanding Contribution Award - Virdhi Tech Lab ',
            "\n",
            ' For exceptional impact in full-stack development and delivering scalable SaaS solutions with React, Node.js, and AWS.',
            
          ]);
          break;
      case 'contact':
        setOutput((prev) => [
          ...prev,
          `> ${command}`,
          <a href="tel:+17164655771" key="phone" style={{ color: '#00ff00', display: 'block', marginBottom: '5px' }}>Phone: +1 716-465-5771</a>,
          <a href="mailto:Priyadarshni.Sundararajan@gmail.com" key="email" style={{ color: '#00ff00', display: 'block', marginBottom: '5px' }}>Email: Priyadarshni.Sundararajan@gmail.com</a>,
          <a href="https://www.linkedin.com/in/priyadarshni/" target="_blank" rel="noopener noreferrer" key="linkedin" style={{ color: '#00ff00', display: 'block', marginBottom: '5px' }}>LinkedIn</a>,
          <a href="https://github.com/priyanov101999" target="_blank" rel="noopener noreferrer" key="github" style={{ color: '#00ff00', display: 'block', marginBottom: '5px' }}>GitHub</a>,
        ]);
        break;

      default:
        setOutput((prev) => [
          ...prev,
          `> ${command}`,
          `Command '${command}' not recognized. Type 'menu' to see available commands.`,
        ]);
        break;
    }
    setInput('');
  };

  const handleChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      handleCommand(input.trim());
    }
  };

  const closeModal = () => setSelectedProject(null);

  return (
    <TerminalContainer>
      <Header>
        <ProfileImage src={profilePic} alt="Profile" />
        <div>
          <Title>Priyadarshni Sundararajan</Title>
          <Subtitle>CS Graduate Student | Full Stack Developer | AI/ML Enthusiast</Subtitle>
        </div>
      </Header>

      {output.map((line, index) => (
        <TerminalLine
          key={index}
          isHeading={typeof line === 'string' && line.startsWith('>')}
        >
          {line}
        </TerminalLine>
      ))}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            backgroundColor: '#000',
            color: '#00ff00',
            border: 'none',
            outline: 'none',
            width: '100%',
            marginLeft: '5px',
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: '16px',
            padding: '5px',
          }}
          placeholder="Type a command here..."
          autoFocus
          spellCheck={false}
        />
        <Cursor>|</Cursor>
      </div>

      {/* Modal for project details */}
      {selectedProject !== null && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal} aria-label="Close modal">X</CloseButton>
            <ProjectImage
              src={projectImages[selectedProject]}
              alt={projects[selectedProject].title}
            />
            <ProjectTitle>{projects[selectedProject].title}</ProjectTitle>
            <ProjectDescription>
              <strong>Stack:</strong> {projects[selectedProject].stack}
            </ProjectDescription>
            {projects[selectedProject].details.map((d, i) => (
              <ProjectDescription key={i}>{d}</ProjectDescription>
            ))}
            <ProjectLink
              href={projects[selectedProject].link}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Link
            </ProjectLink>
          </ModalContent>
        </ModalOverlay>
      )}
    </TerminalContainer>
  );
};

export default Terminal;
