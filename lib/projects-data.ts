export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  techStack: string[]
  impact: string[]
  imageUrl: string
  repoUrl: string
  demoUrl: string
  screenshots: string[]
}

export const projects: Project[] = [
  {
    id: "chat-connect",
    title: "ChatConnect",
    description: "Real-time multi-room chat application with persistent messaging and user presence indicators.",
    longDescription:
      "ChatConnect is a real-time chat platform that enables seamless communication across multiple channels. Built with a focus on performance and reliability, it features instant message delivery, persistent storage, and user presence tracking. The application supports both private and group conversations, with end-to-end message delivery confirmation and read receipts. ChatConnect was designed with scalability in mind, handling thousands of concurrent users while maintaining consistent performance across all devices.",
    techStack: ["React", "Node.js", "Socket.io", "TypeScript"],
    impact: [
      "99.9% uptime since deployment",
      "Reduced message latency from 200ms to 150ms",
      "Supports 5,000+ concurrent users",
    ],
    imageUrl: "/ChatConnectimg.png?height=400&width=600",
    repoUrl: "https://github.com/Khushal-Me/ChatConnect",
    demoUrl: "https://chat-connect-project.glitch.me/",
    screenshots: [
      "/ChatConnect1.png?height=400&width=600",
      "/ChatConnect2.png?height=400&width=600",
    ],
  },
  {
    id: "macro-mind",
    title: "MacroMind",
    description:
      "Gemini-powered nutrition tracker that analyzes food images and provides detailed nutritional insights.",
    longDescription:
      "MacroMind revolutionizes nutrition tracking by leveraging Google's Gemini AI to analyze food images and provide comprehensive nutritional information. Users can simply take a photo of their meal, and MacroMind identifies the food items, estimates portions, and calculates detailed macro and micronutrient content. The application includes personalized dietary recommendations, meal planning features, and progress tracking. MacroMind's API optimization reduced response times dramatically while maintaining high accuracy in food recognition and nutritional analysis.",
    techStack: [ "Python", "Gemini API", "Flask","Discord",],
    impact: [
      "Reduced API response time from 1400ms to 150ms",
      "Supports 200+ concurrent users",
      "95% accuracy in food recognition",
    ],
    imageUrl: "/MacroMindimg.png?height=400&width=600",
    repoUrl: "https://github.com/Khushal-Me/MacroMind",
    demoUrl: "https://macro-mind-demo.vercel.app",
    screenshots: [
      "/MM1.png?height=400&width=600",
      "/MM2.png?height=400&width=600",
      "/MM3.png?height=400&width=600",
      "/MM4.png?height=400&width=600",
      "/MM5.png?height=400&width=600",
    ],
  },
  {
    id: "conscient",
    title: "Conscient",
    description: "Mental health AI assistant with mood tracking, Smart diary and personalized wellness recommendations.",
    longDescription:
      "Conscient is an AI-powered mental health companion designed to support users' emotional wellbeing through continuous mood tracking and personalized interventions. The application uses natural language processing to analyze journal entries and conversation patterns, identifying emotional states and potential concerns. Conscient's Random Forest classifier achieves remarkable accuracy in mood detection, enabling timely and relevant support. The platform offers guided meditation sessions, cognitive behavioral therapy exercises, and connects users with professional resources when needed, all while maintaining strict privacy and data security standards.",
    techStack: ["React", "Python", "scikit-learn", "NLP", "Firebase", "TensorFlow", "Llama", "Random Forest"],
    impact: [
      "Random Forest mood classifier with 97.4% accuracy",
      "4.8/5 user satisfaction rating",
      "Used by 100+ people",
    ],
    imageUrl: "/Conscientimg.png?height=400&width=600",
    repoUrl: "https://github.com/Khushal-Me/Conscient",
    demoUrl: "https://www.youtube.com/watch?v=dE0HKtUL-vY",
    screenshots: [
      "/Conscient1.png?height=400&width=600",
      "/Conscient2.png?height=400&width=600",
      "/Conscient3.png?height=400&width=600",
      "/Conscient4.png?height=400&width=600",
    ],
  },
  {
  id: "pixel-pets",
  title: "Pixel Pets",
  description: "Virtual pet simulation game built with Java Swing where players adopt and care for different pet types with comprehensive stat management.",
  longDescription: "Pixel Pets is an engaging virtual pet simulation game that combines nostalgic pixel art aesthetics with modern gameplay mechanics. Players can adopt and nurture different types of pets including Dogs, Cats, and Birds, each with unique characteristics and needs. The game features a comprehensive stat management system tracking Health, Hunger, Social interaction, Sleep, and overall Mood. Built with Java Swing, the application provides an intuitive graphical interface with mouse and keyboard controls. The game includes advanced features like save/load functionality, parental controls with password protection, and playtime monitoring. With its charming pixel art style and engaging pet care mechanics, Pixel Pets offers a delightful experience for players of all ages while teaching responsibility and time management through virtual pet ownership.",
  techStack: ["Java", "Java Swing", "File I/O", "Game Development"],
  impact: [
    "Fully functional pet simulation with 5 comprehensive stat systems",
    "Save/load game state with persistent data management",
    "Parental controls with playtime monitoring and restrictions",
    "Multi-pet system supporting Dogs, Cats, and Birds"
  ],
  imageUrl: "/PP3.png?height=400&width=600",
  repoUrl: "https://github.com/Khushal-Me/PixelPets",
  demoUrl: "https://www.youtube.com/watch?v=yYQYRpzi9Fo",
  screenshots: [
    "/PP1.png?height=400&width=600",
    "/PP2.png?height=400&width=600"
  ],
  },
 {
  id: "privacy-solution",
  title: "Thermal Imaging Privacy Solution",
  description: "Intelligent privacy-preserving thermal imaging detection system using YOLOv8 and thermal intensity analysis for secure surveillance applications.",
  longDescription: "Privacy Solution is a cutting-edge computer vision system that revolutionizes surveillance technology by combining advanced object detection with privacy preservation. Built on YOLOv8 architecture, the system analyzes thermal imagery to detect people, vehicles, and bicycles while maintaining strict privacy standards. The solution employs sophisticated thermal intensity validation techniques to minimize false positives and uses spatial filtering to focus on relevant detection zones. By working exclusively with grayscale thermal data instead of traditional RGB video, the system ensures privacy protection while maintaining high detection accuracy. The application features automated TIFF to JPEG conversion, CLAHE enhancement for improved contrast, and customizable confidence thresholds. With its innovative approach to thermal imaging analysis and privacy-first design philosophy, Privacy Solution addresses the critical need for secure surveillance systems in sensitive environments while delivering reliable object detection performance.",
  techStack: ["Python", "YOLOv8", "OpenCV", "PyTorch", "NumPy", "PIL", "Computer Vision", "Thermal Imaging", "Machine Learning"],
  impact: [
    "Privacy-preserving surveillance with thermal intensity validation",
    "YOLOv8-powered detection with custom class mapping system",
    "Automated thermal image preprocessing with CLAHE enhancement",
    "Spatial filtering and customizable detection thresholds"
  ],
  imageUrl: "/PS1.png?height=400&width=600",
  repoUrl: "https://github.com/Khushal-Me/Privacy-Solution",
  demoUrl: "null",
  screenshots: [
    "/PS2.jpeg?height=400&width=600",
    "/PS3.jpeg?height=400&width=600"
  ],
},
{
  id: "termiknight",
  title: "TermiKnight",
  description: "Terminal-based C++ RPG adventure game featuring turn-based combat, multiple character classes, and dynamic exploration across fantasy lands.",
  longDescription: "TermiKnight is an immersive terminal-based RPG that brings classic adventure gaming to the command line with modern C++ architecture. Set in a captivating modern-day fantasy world, players embark on an epic quest across multiple mystical lands, each filled with randomized structures including caves, castles, and villages. The game features a sophisticated class system with four unique character types - Civilian, Bandit, Mage, and Soldier - each offering distinct gameplay strategies and special abilities. Combat employs a strategic turn-based system where players face enemies in challenging one-on-one battles, utilizing attacks, blocks, fleeing tactics, and class-specific skills. The dynamic world generation ensures each playthrough offers unique experiences with randomly distributed treasures, enemy encounters, and puzzle-solving opportunities. Players must navigate through structure rooms, solve riddles to unlock powerful artifacts, and manage their inventory strategically to succeed. With comprehensive save/load functionality, auto-saving features, and estimated 25-60 minutes of engaging gameplay, TermiKnight delivers a complete RPG experience entirely through terminal interface, showcasing advanced C++ programming techniques and game design principles.",
  techStack: ["C++", "Object-Oriented Programming", "Game Development", "Terminal Interface", "File I/O", "Random Generation", "Turn-Based Combat Systems"],
  impact: [
    "Complete RPG experience with 4 unique character classes and special abilities",
    "Dynamic world generation with randomized structures and room layouts",
    "Strategic turn-based combat system with multiple tactical options",
    "Comprehensive save/load system with auto-saving functionality"
  ],
  imageUrl: "/TK.png?height=400&width=600",
  repoUrl: "https://github.com/Khushal-Me/TermiKnight",
  demoUrl: "null",
  screenshots: [
    "/TK.png?height=400&width=600"
  ],
},
{
  id: "minesweeper-qt",
  title: "Minesweeper-Qt",
  description: "Cross-platform Minesweeper game built with Qt framework, featuring Docker containerization and headless server deployment capabilities.",
  longDescription: "Minesweeper-Qt is a sophisticated recreation of the classic Minesweeper game, engineered with modern cross-platform development practices using the Qt framework. This project demonstrates advanced GUI programming techniques while maintaining compatibility across Linux and macOS environments. The application features a polished Qt-based interface that delivers the familiar Minesweeper gameplay experience with enhanced visual design and responsive controls. What sets this implementation apart is its robust deployment architecture, incorporating Docker containerization for consistent builds and specialized headless server support for remote execution environments like university computing clusters. The project includes comprehensive SSH X11 forwarding integration, enabling seamless remote gameplay sessions through terminal connections. With XQuartz compatibility for macOS users and native Linux support, the application showcases professional software distribution practices. The codebase demonstrates expertise in Qt development, cross-platform GUI programming, containerized build systems, and remote desktop technologies, making it both an engaging game and a technical showcase of modern C++ application development.",
  techStack: ["Qt Framework", "C++", "Cross-Platform Development", "Docker", "SSH X11 Forwarding", "XQuartz", "GUI Programming", "Linux Development"],
  impact: [
    "Cross-platform Qt application with Linux and macOS support",
    "Docker containerization for consistent build environments",
    "Headless server deployment with SSH X11 forwarding integration",
    "Professional GUI implementation with modern Qt framework"
  ],
  imageUrl: "/QT.png?height=400&width=600",
  repoUrl: "https://github.com/Khushal-Me/Minesweeper-Qt",
  demoUrl: "https://private-user-images.githubusercontent.com/159512417/410240625-080a6b60-65af-4b3f-a770-4b186819ddae.mov?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDgwNzMwODUsIm5iZiI6MTc0ODA3Mjc4NSwicGF0aCI6Ii8xNTk1MTI0MTcvNDEwMjQwNjI1LTA4MGE2YjYwLTY1YWYtNGIzZi1hNzcwLTRiMTg2ODE5ZGRhZS5tb3Y_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTI0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUyNFQwNzQ2MjVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05NmRjYjFkZDBjNzZhMmM3M2U3ZTkyMDI5ODE4ZWYyMWY0N2U5YzY4ZmUwMzlhZDdjM2Y3YWFkZDZiNzc5OWZjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.qP3ZLRE4J-sN1ieyZsuj53rGb4MfbW_3-2NMg5-F9vE",
  screenshots: [
    "/QT.png?height=400&width=600"
  ],
},
{
  id: "echo-horror",
  title: "Echo",
  description: "Immersive sound-based horror experience using 3D spatial audio and darkness navigation mechanics built with Three.js and Web Audio API.",
  longDescription: "Echo is a groundbreaking horror game that revolutionizes the genre by prioritizing audio over visual elements, creating an intensely immersive experience through sound-based gameplay mechanics. Players must navigate through complete darkness using only spatial audio cues to locate an escape point while evading a relentless threat that hunts them through the environment. Built with cutting-edge web technologies including Three.js for 3D rendering and the Web Audio API for sophisticated spatial sound processing, Echo demonstrates advanced implementation of 3D positional audio in web browsers. The game employs dynamic sound generation where the threat's proximity is conveyed through increasing audio intensity, while environmental sounds create atmospheric tension and disorientation. The escape objective, represented by a faint blue sphere, produces distinct audio signatures that guide players toward safety. This innovative approach to horror gaming challenges traditional visual-centric design paradigms, proving that audio alone can create compelling, terrifying, and engaging interactive experiences. Echo showcases expertise in web-based game development, advanced audio programming, and experimental game design that pushes the boundaries of browser-based entertainment.",
  techStack: ["Three.js", "Web Audio API", "JavaScript", "WebGL", "3D Spatial Audio", "Game Development", "Browser Technologies", "HTML5"],
  impact: [
    "Revolutionary sound-based horror gameplay with 3D spatial audio",
    "Advanced Web Audio API implementation for immersive audio experience",
    "Innovative darkness navigation mechanics using audio cues",
    "Cross-browser compatible web game with modern HTML5 technologies"
  ],
  imageUrl: "/EC1.png?height=400&width=600",
  repoUrl: "https://github.com/Khushal-Me/Echo",
  demoUrl: "https://khushal-me.github.io/Echo/",
  screenshots: [
    "/EC2.png?height=400&width=600"
  ],
},
{
  id: "minesweeper-web",
  title: "Minesweeper Web Game",
  description: "Modern, responsive Minesweeper game with dark mode, customizable gameplay, and high score tracking built using HTML5, Tailwind CSS, and JavaScript.",
  longDescription: "This modern Minesweeper implementation brings the classic puzzle game into the contemporary web development era with a sleek, responsive design and enhanced user experience features. Built with a mobile-first approach using Tailwind CSS, the game adapts seamlessly across all device sizes, ensuring optimal gameplay whether on desktop or mobile platforms. The application features a sophisticated dark mode toggle system that provides users with comfortable viewing options in any lighting condition. Advanced customization options allow players to create personalized gaming experiences by adjusting grid dimensions and mine density to match their skill level and preferences. The integrated high score system utilizes the browser's LocalStorage API to maintain persistent leaderboards across sessions, creating competitive replay value with separate tracking for different difficulty levels. The intuitive user interface incorporates familiar Minesweeper mechanics including right-click flagging, visual mine counters, and real-time timers, all enhanced with modern web design principles. Clean, semantic HTML5 structure combined with responsive Tailwind utilities and vanilla JavaScript functionality demonstrates best practices in modern web development while delivering an engaging, accessible gaming experience that honors the classic Minesweeper legacy.",
  techStack: ["HTML5", "Tailwind CSS", "JavaScript", "LocalStorage API", "Responsive Design", "Web Development", "CSS Grid", "DOM Manipulation"],
  impact: [
    "Fully responsive design optimized for desktop and mobile gameplay",
    "Advanced customization with adjustable grid size and mine count",
    "Persistent high score system with separate difficulty leaderboards",
    "Modern UI/UX with dark mode toggle and intuitive controls"
  ],
  imageUrl: "/MS.png?height=400&width=600",
  repoUrl: "https://github.com/Khushal-Me/Minesweeper-Game",
  demoUrl: "https://khushal-me.github.io/Minesweeper-Game/",
  screenshots: [
    "/MS.png?height=400&width=600"
  ],
},
{
  id: "sudoku-web",
  title: "Sudoku Web Game",
  description: "Modern, responsive Sudoku puzzle game with automatic puzzle generation, dark mode, and comprehensive scoring system built using HTML5, Tailwind CSS, and JavaScript.",
  longDescription: "This sophisticated Sudoku implementation transforms the beloved number puzzle into a feature-rich web application that combines classic gameplay with modern user experience design. Built with responsive web technologies, the game delivers seamless puzzle-solving experiences across all devices, from desktop computers to mobile phones. The application features an intelligent puzzle generation algorithm that creates unique, solvable Sudoku grids across multiple difficulty levels, ensuring endless gameplay variety and appropriate challenge progression. Advanced UI features include number highlighting for enhanced visibility, real-time mistake tracking, and comprehensive game state management with undo functionality. The integrated scoring system leverages LocalStorage API to maintain persistent leaderboards, creating competitive elements with separate tracking for Easy, Medium, and Hard difficulty levels. Visual enhancements include a polished dark mode toggle system and clean, modern interface design powered by Tailwind CSS utilities. The game incorporates thoughtful UX elements such as progress tracking through timers and mistake counters, intuitive controls for game reset and undo operations, and accessibility-focused design principles. This implementation demonstrates advanced JavaScript programming techniques including puzzle generation algorithms, DOM manipulation, and browser storage management, showcasing how traditional puzzle games can be elevated through contemporary web development practices and user-centered design philosophy.",
  techStack: ["HTML5", "Tailwind CSS", "JavaScript", "LocalStorage API", "Puzzle Generation Algorithms", "Responsive Design", "DOM Manipulation", "Web Development"],
  impact: [
    "Intelligent puzzle generation algorithm with multiple difficulty levels",
    "Comprehensive scoring system with persistent local leaderboards",
    "Advanced UI features including number highlighting and mistake tracking",
    "Fully responsive design with dark mode and accessibility considerations"
  ],
  imageUrl: "/SG.png?height=400&width=600",
  repoUrl: "https://github.com/Khushal-Me/Sudoku-Game",
  demoUrl: "https://khushal-me.github.io/Sudoku-Game/",
  screenshots: [
    "/SG.png?height=400&width=600"
  ],
}
]
