// ============================================================
// Portfolio Data — single source of truth for the whole site.
// Ported from the old Flutter portfolio (pro-main/portfolio_data.dart).
// Edit anything here and it updates everywhere on the site.
// ============================================================

// Project screenshots
import wagonEye from '../assets/projects/wagon_eye.png';
import restaurantApp from '../assets/projects/restaurant_app.png';
import railops from '../assets/projects/railops.png';
import coachsathi from '../assets/projects/coachsathi.png';
import vpnApp from '../assets/projects/vpn_app.png';
import wellnessz from '../assets/projects/wellnessz.png';
import abcCoaching from '../assets/projects/abc_coaching.png';
import healtho from '../assets/projects/healtho.png';

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
    degree: 'B.Tech in Mechanical Engineering',
    duration: 'July 2019 - August 2022',
  },
  {
    institution: 'PLGPL',
    degree: 'Diploma in Mechanical Engineering',
    duration: 'June 2016 - June 2019',
  },
  {
    institution: 'Ahilyadevi High School',
    degree: 'SSC',
    duration: 'Completed June 2016',
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
    title: 'Restaurant Management System',
    subtitle: 'Cross-Platform POS Solution',
    description:
      'Full-featured cross-platform restaurant POS with Clean Architecture and ObjectBox. Complete workflows: Dashboard, KOT, Billing, KDS and Captain Flow, with TCP-based real-time communication between Server POS ↔ Captain POS ↔ KDS. Bill splitting, order types, reporting, Bluetooth/Network printing and multi-language support (English, Hindi, Arabic).',
    technologies: ['Flutter', 'ObjectBox', 'TCP/Socket', 'Clean Architecture', 'Multi-platform'],
    category: 'Freelance',
    image: restaurantApp,
    highlights: [
      'Real-time TCP communication',
      'Multi-language support',
      'Bluetooth & Network printing',
      'Bill splitting & KOT management',
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
