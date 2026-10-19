// ============================================================
// Portfolio Data — single source of truth for the whole site.
// Ported from the old Flutter portfolio (pro-main/portfolio_data.dart).
// Edit anything here and it updates everywhere on the site.
// ============================================================

// Project screenshots
import wagonEye from '../assets/projects/wagon_eye.png';
import restaurantApp from '../assets/projects/restaurant_app.png';
import rhPosWeb from '../assets/projects/rh_pos_web.jpg';
import dfccUnusual from '../assets/projects/dfcc_unusual.jpg';
import railops from '../assets/projects/railops.png';
import coachsathi from '../assets/projects/coachsathi.png';
import vpnApp from '../assets/projects/vpn_app.png';
import wellnessz from '../assets/projects/wellnessz.png';
import abcCoaching from '../assets/projects/abc_coaching.png';
import healtho from '../assets/projects/healtho.png';
import nexusAi from '../assets/projects/nexus_ai.jpg';

// ---------- Personal Information ----------
export const personal = {
  fullName: 'Afarojkha Pathan',
  displayName: 'Afarojkha Pathan',
  firstName: 'Afarojkha',
  lastName: 'Pathan',
  title: 'Software Developer',
  location: 'Latur, India',
  email: 'afroz.w9199@gmail.com',
  phone: '+91 91562 91160',
  phoneRaw: '+919156291160',
  whatsapp: '919156291160', // without + for wa.me links
};

// ---------- Social Links ----------
export const socials = {
  linkedin: 'https://www.linkedin.com/in/afarojkha-pathan-3617b3223',
  github: 'https://github.com/Mrkhan012',
  whatsapp: 'https://wa.me/919156291160',
};

// ---------- Resume summary (used by tools/generate-resume-pdf.js) ----------
export const resumeSummary =
  'Software Engineer with 3+ years of experience building cross-platform mobile, web, and desktop applications using Flutter, FastAPI, and PostgreSQL. Experienced in REST API integration, CI/CD automation, scalable application architecture, and multi-environment deployments. Built production applications across railway operations, healthcare, POS, and wellness domains. Skilled in Flutter state management, backend development, and performance optimization in Agile development teams.';

// ---------- Hero Section ----------
export const hero = {
  tagline: 'Architecting Digital Ecosystems',
  subtitle: 'Transforming complex requirements into elegant Flutter solutions.',
  description:
    'Senior Flutter Developer building scalable, cross-platform apps for Android, iOS, Windows, Linux and macOS — expert in Clean Architecture, advanced State Management and robust, error-free code.',
};

// ---------- About Me ----------
export const about = {
  intro:
    "I'm a dedicated Flutter Developer with a passion for creating seamless cross-platform experiences. My expertise spans the entire mobile development lifecycle — from sophisticated UI/UX to complex backend integration.",
  body:
    'I write clean, modular, testable code using industry-standard architectures like Clean Architecture and MVVM. Whether it’s real-time communication over Sockets, complex state management with BLoC/Riverpod, or app performance optimization, every line of code serves a purpose. Beyond coding, I lead code reviews, manage deadlines and design scalable architecture to deliver high-performance applications that drive business value.',
  // Top skills shown as chips in the About badge area
  highlights: [
    { name: 'Flutter', icon: '💙' },
    { name: 'Dart', icon: '🎯' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Node.js', icon: '💚' },
    { name: 'REST APIs', icon: '🔗' },
  ],
};

// Quick stats shown under the hero / about
export const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '15+', label: 'Apps Delivered' },
  { value: '5', label: 'Platforms' },
  { value: '100%', label: 'Clean Architecture' },
];

// ---------- Skills ----------
export const skills = [
  { name: 'Flutter (Advanced)', category: 'Mobile Development', level: 95, icon: '💙' },
  { name: 'Dart', category: 'Languages', level: 95, icon: '🎯' },
  { name: 'Clean Architecture', category: 'Architecture', level: 90, icon: '🏛️' },
  { name: 'MVVM & Modular', category: 'Architecture', level: 90, icon: '🧩' },
  { name: 'Multi-platform', category: 'Mobile Development', level: 90, icon: '📲' },
  { name: 'Push Notifications', category: 'Mobile Development', level: 85, icon: '🔔' },
  { name: 'BLoC', category: 'State Management', level: 95, icon: '🧱' },
  { name: 'Provider', category: 'State Management', level: 90, icon: '⚡' },
  { name: 'Riverpod', category: 'State Management', level: 85, icon: '🌊' },
  { name: 'GetX', category: 'State Management', level: 85, icon: '🚀' },
  { name: 'Node.js', category: 'Backend', level: 80, icon: '💚' },
  { name: 'Socket.IO', category: 'Realtime', level: 85, icon: '🔌' },
  { name: 'TCP/Socket', category: 'Realtime', level: 85, icon: '📡' },
  { name: 'REST APIs', category: 'Backend', level: 90, icon: '🔗' },
  { name: 'Firebase', category: 'Backend', level: 90, icon: '🔥' },
  { name: 'ObjectBox/Hive', category: 'Backend', level: 85, icon: '📦' },
  { name: 'Git & GitHub', category: 'Tools', level: 90, icon: '🐙' },
  { name: 'Figma', category: 'Design', level: 80, icon: '🎨' },
  { name: 'Postman', category: 'Tools', level: 90, icon: '📮' },
  { name: 'Android Studio', category: 'Tools', level: 90, icon: '🤖' },
  { name: 'Java', category: 'Languages', level: 80, icon: '☕' },
  { name: 'JavaScript', category: 'Languages', level: 80, icon: '💛' },
  { name: 'Python', category: 'Languages', level: 85, icon: '🐍' },
  { name: 'FastAPI', category: 'Backend', level: 80, icon: '⚡' },
  { name: 'Machine Learning', category: 'AI / ML', level: 75, icon: '🧠' },
  { name: 'Team Leadership', category: 'Professional', level: 85, icon: '👥' },
  { name: 'Code Review', category: 'Professional', level: 90, icon: '👀' },
  { name: 'Debugging', category: 'Professional', level: 95, icon: '🐞' },
];

// ---------- Experience ----------
export const experiences = [
  {
    company: 'Sarva Suvidha en Pvt Ltd',
    role: 'Lead Flutter Developer',
    location: 'Patna, India (Remote)',
    duration: 'June 2025 - Present',
    points: [
      'Leading development of mission-critical railway apps (RailOps, CoSathi).',
      'Architected scalable Flutter solutions using Provider and REST APIs.',
      'Integrated biometric authentication and real-time data syncing.',
      'Mentored the development team and established code-quality standards.',
      'Delivered secure, production-ready logistics management systems.',
    ],
    technologies: ['Flutter', 'Provider', 'REST APIs', 'Biometric Auth', 'Clean Architecture'],
  },
  {
    company: 'WellnessZ',
    role: 'Software Developer (Flutter)',
    location: 'Remote, India',
    duration: 'Aug 2024 - May 2025',
    points: [
      'Built the WellnessZ web platform and integrated it with the companion Flutter app via REST APIs.',
      'Delivered new product features end-to-end within a cross-functional team, improving release stability.',
      'Diagnosed and resolved data synchronization and database defects, reducing recurring production issues.',
      'Implemented state management using Riverpod to ensure responsive user experiences.',
    ],
    technologies: ['Flutter', 'Flutter Web', 'Riverpod', 'REST APIs'],
  },
  {
    company: 'Incrasoft Pvt Ltd',
    role: 'Flutter Developer',
    location: 'Hyderabad, India',
    duration: 'December 2023 - July 2024',
    points: [
      'Delivered production-grade Flutter applications.',
      'Collaborated with cross-functional teams for seamless integration.',
      'Adapted to new technologies, boosting team productivity.',
      'Debugged complex software issues resulting in stable releases.',
      'Maintained high code quality and development standards.',
    ],
    technologies: ['Flutter', 'Dart', 'REST APIs', 'Git', 'Agile'],
  },
];

// ---------- Education ----------
export const education = [
  {
    institution: 'Sandipani Technical Campus, Latur',
    degree: 'B.Tech in Computer Science & Engineering',
    duration: 'July 2019 - August 2022',
  },
  {
    institution: 'Government Polytechnic, Latur',
    degree: 'Diploma in Computer Engineering',
    duration: 'June 2016 - June 2019',
  },
  {
    institution: 'Ahilyadevi High School',
    degree: 'SSC',
    duration: 'Completed June 2016',
  },
];

// ---------- Certifications (Forage Job Simulations) ----------
export const certifications = [
  {
    title: 'Tata — Data Visualisation: Empowering Business with Effective Insights',
    issuer: 'Forage (in partnership with Tata Consultancy Services)',
    issued: 'July 2023',
    credentialId: '3e4s3BLTkoQYw8znZ',
    url: 'https://www.theforage.com/completion-certificates/Tata/N8Muuhk6XsXgMTeu2_Tata%20Consultancy%20Services_E8H3AkKXQn3ykq29K_1689837268360_completion_certificate.pdf',
    company: 'Tata',
  },
  {
    title: 'Tata — ESG Job Simulation',
    issuer: 'Forage (in partnership with Tata Consultancy Services)',
    issued: 'July 2023',
    credentialId: 'QbNuAyvbmqdECPaLR',
    url: 'https://www.theforage.com/completion-certificates/Tata/N8Muuhk6XsXgMTeu2_Tata%20Consultancy%20Services_E8H3AkKXQn3ykq29K_1689837268360_completion_certificate.pdf',
    company: 'Tata',
  },
  {
    title: 'Infosys — Power Programmer Job Simulation',
    issuer: 'Forage (in partnership with Infosys)',
    issued: 'April 2022',
    credentialId: 'FW93vd2ZwZ62uqggv',
    url: 'https://www.theforage.com/completion-certificates/Infosys/qyS5w2xfLoFEKAFpH_Infosys_E8H3AkKXQn3ykq29K_1650308829878_completion_certificate.pdf',
    company: 'Infosys',
  },
  {
    title: 'Accenture Nordics — Developer Job Simulation',
    issuer: 'Forage (in partnership with Accenture Nordics)',
    issued: 'February 2022',
    credentialId: 'yEhtXmjydK8tJHn5Z',
    url: 'https://www.theforage.com/completion-certificates/Accenture%20Nordics/yEhtXmjydK8tJHn5Z_Accenture%20Nordics_E8H3AkKXQn3ykq29K_1644844432480_completion_certificate.pdf',
    company: 'Accenture',
  },
];

// ---------- Projects ----------
export const projects = [
  {
    title: 'Wagon Eye CCTV',
    subtitle: 'Railway Station Surveillance Platform',
    description:
      'Enterprise-grade React web app for real-time CCTV surveillance across railway stations, enabling complete train (Malgadi) tracking. Streams live & recorded feeds, supports video playback with smooth pagination, full PDF report generation and one-click video download, with role-based access and high-performance lazy video loading for 24/7 monitoring.',
    technologies: ['React', 'JavaScript', 'REST APIs', 'PDF Generation', 'Video Streaming'],
    category: 'Professional',
    image: wagonEye,
    highlights: [
      'Live & recorded CCTV surveillance',
      'PDF report generation & download',
      'Video download & playback',
      'Pagination & camera filtering',
    ],
  },
  {
    title: 'RH POS — Restaurant POS Application',
    subtitle: 'Restaurant POS & Terminal Ecosystem',
    description:
      'Built the RH POS terminal ecosystem in Flutter: a Windows POS terminal, an Android captain/waiter app, and a Kitchen Display System (KDS) app. Architected an offline-first terminal and captain app with ObjectBox local persistence, syncing orders in real time over LAN via Socket.IO and custom TCP/UDP channels across the terminal, captain devices and KDS. Implemented Bluetooth thermal bill/KOT printing with PDF generation and pre-warmed Google Font caching to remove first-print latency, plus REST integration via Dio and sales analytics dashboards using fl_chart. Added secure cloud database backup/restore using AWS S3-compatible storage with HMAC-SHA256 signed requests.',
    technologies: [
      'Flutter',
      'GetX',
      'ObjectBox',
      'Dio',
      'Socket.IO',
      'fl_chart',
      'PDF Generation',
      'Bluetooth Printing',
      'AWS S3',
      'Google Fonts',
    ],
    category: 'Freelance',
    image: restaurantApp,
    highlights: [
      'Windows POS terminal, Android captain app & KDS ecosystem',
      'Offline-first sync via ObjectBox, Socket.IO & LAN TCP/UDP',
      'Bluetooth thermal bill/KOT printing with PDF generation',
      'Secure AWS S3 backup/restore with HMAC-SHA256',
    ],
  },
  {
    title: 'RH POS — Web Back-Office',
    subtitle: 'Restaurant Admin & Customer Ordering Web App',
    description:
      'Built the companion React + Vite web back-office for RH POS, spanning 14 management modules (live orders, billing, menu, inventory, reports, tables, users). Implemented JWT auth with proactive token refresh and role/permission-based access control, plus English/Hindi/Arabic (RTL) multilingual support. Developed a companion customer-facing ordering website integrated with the back-office.',
    technologies: ['React.js', 'Vite', 'JWT', 'i18next', 'REST APIs', 'RBAC'],
    category: 'Freelance',
    image: rhPosWeb,
    highlights: [
      '14 management modules (live orders, billing, menu, inventory)',
      'JWT auth with proactive token refresh & RBAC',
      'English, Hindi & Arabic (RTL) multilingual support',
      'Integrated customer-facing ordering website',
    ],
  },
  {
    title: 'DFCC Unusual — Railway Field Inspection App',
    subtitle: 'Railway Defect Reporting Platform · Sarva Suvidhaen',
    description:
      'Built a cross-platform Flutter app (Android + Web) for DFCCIL field engineers to report railway defects (hot axles, brake binding, wheel defects) with photo/video evidence and GPS tagging, as part of the railway applications portfolio at Sarva Suvidhaen Pvt Ltd. Architected an offline-first submission workflow with a persistent photo-upload queue that survives app restarts and auto-retries on reconnection, ensuring zero data loss in low-connectivity environments. Implemented JWT auth with transparent token refresh via custom Dio interceptors, and optimistic UI updates for a seamless user experience during network delays. Automated CI/CD pipelines using GitHub Actions to deploy web builds to Netlify and Android App Bundles to the Play Store production track on every main branch push.',
    technologies: ['Flutter', 'Dart', 'BLoC', 'Dio', 'GitHub Actions', 'Offline-First'],
    category: 'Professional',
    image: dfccUnusual,
    highlights: [
      'Railway defect reporting with photo/video & GPS tagging',
      'Offline-first persistent upload queue surviving restarts',
      'JWT auth with transparent Dio token refresh & optimistic UI',
      'CI/CD pipelines to Netlify & Play Store production track',
    ],
  },
  {
    title: 'RailOps App',
    subtitle: 'Railway Operations Management',
    description:
      'Production-grade railway operations app using Provider and Clean Architecture. Integrated RESTful APIs, robust error handling, SMS autofill, biometric login (fingerprint & face) and secure data flows. Led team tasks and ensured code quality.',
    technologies: ['Flutter', 'Provider', 'REST APIs', 'Biometric Auth', 'Team Lead'],
    category: 'Professional',
    image: railops,
    highlights: [
      'Biometric authentication',
      'SMS autofill integration',
      'Team leadership',
      'Production deployment',
    ],
  },
  {
    title: 'CoachSathi App',
    subtitle: 'Train Service Staff Management',
    description:
      'App for coach attendants and train service staff with notification-based task updates, attendance workflows and service-check modules — built with Provider, Clean Architecture and RESTful APIs with role-based permissions.',
    technologies: ['Flutter', 'Provider', 'Push Notifications', 'REST APIs', 'RBAC'],
    category: 'Professional',
    image: coachsathi,
    highlights: [
      'Push notification workflows',
      'Attendance tracking',
      'Role-based access',
      'Service check modules',
    ],
  },
  {
    title: 'Nexus AI Voice Assistant',
    subtitle: 'Offline-Capable Desktop Voice Assistant',
    description:
      'Offline-capable desktop voice assistant that classifies spoken commands using a trained scikit-learn + NLTK intent model. Engineered a modular architecture with speech-to-text listening, text-to-speech responses, and an action executor for application launches, system controls, and automated queries.',
    technologies: ['Python', 'Machine Learning', 'scikit-learn', 'NLTK', 'Speech Recognition'],
    category: 'Personal',
    image: nexusAi,
    highlights: [
      'Trained scikit-learn + NLTK intent classification model',
      'Offline-capable desktop voice assistant architecture',
      'Speech-to-text listening & text-to-speech responses',
      'Modular action executor for system controls & app launching',
    ],
  },
  {
    title: 'VPN App',
    subtitle: 'Multi-Country VPN Client',
    description:
      'VPN app with GetX state management and Hive local storage. Features 19+ countries, real-time connection status, search functionality and integrated Google Mobile Ads, using a free public VPN API for server data.',
    technologies: ['Flutter', 'GetX', 'Hive', 'HTTP', 'Google Ads'],
    category: 'Personal',
    image: vpnApp,
    highlights: [
      '19+ country VPN servers',
      'Real-time status management',
      'Ad integration',
      'Search functionality',
    ],
  },
  {
    title: 'WellnessZ Platform',
    subtitle: 'Health & Fitness Tracking',
    description:
      'Comprehensive wellness platform for health tracking with mobile and web versions. Responsive web app with health tracking, personalized recommendations and user-friendly dashboards, ensuring feature parity across platforms.',
    technologies: ['Flutter', 'Flutter Web', 'Responsive Design', 'Firebase', 'REST APIs'],
    category: 'Professional',
    image: wellnessz,
    highlights: [
      'Cross-platform (Mobile + Web)',
      'Health activity tracking',
      'Responsive design',
      'Firebase integration',
    ],
  },
  {
    title: 'ABC Coaching App',
    subtitle: 'Coaching Services Management',
    description:
      'Platform for managing student coaching services with Riverpod state management. Integrated the Cashfree payment gateway for secure transactions, with user-friendly access to courses and schedules.',
    technologies: ['Flutter', 'Riverpod', 'Cashfree', 'Payment Gateway', 'REST APIs'],
    category: 'Professional',
    image: abcCoaching,
    highlights: [
      'Payment gateway integration',
      'Course management',
      'Schedule tracking',
      'Secure transactions',
    ],
  },
  {
    title: 'Healtho App',
    subtitle: 'Healthcare Appointment Booking',
    description:
      'Healthcare app for appointment booking and medicine ordering using GetX. Leveraged RESTful APIs for efficient data handling with a token-based secure access system.',
    technologies: ['Flutter', 'GetX', 'REST APIs', 'Token Auth', 'Healthcare'],
    category: 'Professional',
    image: healtho,
    highlights: [
      'Appointment booking',
      'Medicine ordering',
      'Token-based auth',
      'Healthcare workflows',
    ],
  },
];
