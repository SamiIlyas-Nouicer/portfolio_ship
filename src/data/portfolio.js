// ─────────────────────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT
//  Edit this file to update the islands. Nothing else needs to change.
//
//  category : 'about' | 'experience' | 'project' | 'education'
//  landmark : visual theme of the island (see src/world/landmarks.js)
//  position : [x, z] in world metres (north = -z)
//  radius   : island radius at the waterline (metres)
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Sami Nouicer',
  headline: 'Data Scientist · ML Engineer · Data Engineer',
  location: 'Paris area, France',
  email: 'nouicer.samiilyas@gmail.com',
  linkedin: 'https://linkedin.com/in/Samillyas-Nouicer',
  github: 'https://github.com/SamiIlyas-Nouicer',
  availability: 'Looking for a Data Scientist / Data Analyst / Data Engineer apprenticeship from September 2026 (4 weeks / 4 weeks rhythm).',
};

export const categories = {
  about:      { label: "Captain's Haven", color: '#b8860b', ink: '#6b4413', icon: 'anchor' },
  experience: { label: 'Naval Campaigns', color: '#9e2a2b', ink: '#7a1c1d', icon: 'swords' },
  project:    { label: 'Artificer Works', color: '#1d5c63', ink: '#14454a', icon: 'sextant' },
  education:  { label: 'Royal Academies', color: '#5c3d75', ink: '#422956', icon: 'scroll' },
};

export const islands = [
  // ── HOME ──────────────────────────────────────────────────────────────────
  {
    id: 'home',
    category: 'about',
    landmark: 'lighthouse',
    title: 'Sami Nouicer',
    subtitle: 'Data Scientist · ML · Data Engineering',
    date: 'Paris area, France',
    position: [0, 0],
    radius: 26,
    summary:
      "Master's student in Distributed Systems & Data Science Technologies at UPEC. Hands-on experience in data science, machine learning and data analysis on industrial and operational problems. I turn complex data into actionable indicators and explain technical results clearly to non-specialists.",
    bullets: [
      'Looking for a Data Scientist / Data Analyst / Data Engineer apprenticeship starting September 2026 (4 weeks / 4 weeks).',
      'Languages: French (native), English (C1, professional).',
    ],
    skills: {
      Languages: ['Python', 'SQL (advanced)', 'Java', 'JavaScript', 'Bash'],
      'Machine Learning': ['Scikit-learn', 'TensorFlow', 'PyTorch', 'YOLO', 'OpenCV', 'Feature Engineering', 'Model Evaluation', 'Cross-Validation', 'Classification', 'Clustering', 'Model Monitoring'],
      'Data Eng. & MLOps': ['Apache Kafka', 'PySpark', 'Delta Lake', 'MLflow', 'ETL Pipelines', 'Data Modeling', 'Pandas', 'NumPy'],
      Databases: ['PostgreSQL', 'MySQL', 'MongoDB'],
      'Cloud & DevOps': ['AWS', 'Docker', 'Git', 'Linux', 'CI/CD'],
      Visualisation: ['Power BI', 'Looker Studio', 'Tableau', 'Matplotlib', 'Seaborn', 'Excel'],
      Other: ['GitLab', 'Jira', 'Agile', 'Scrum', 'Technical documentation'],
    },
    tags: [],
    metrics: [
      { value: '2', label: 'Internships' },
      { value: '7', label: 'Projects' },
      { value: 'C1', label: 'English' },
    ],
  },

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  {
    id: 'dpworld',
    category: 'experience',
    landmark: 'port',
    title: 'DP World',
    subtitle: 'Data Scientist Intern',
    date: 'May 2024 – Oct 2024',
    org: 'International port logistics',
    position: [150, -95],
    radius: 30,
    summary:
      'Designed and deployed a computer-vision system that automatically recognises shipping containers in a live port environment.',
    bullets: [
      'Built an automatic container recognition system with YOLOv8, reaching 96% accuracy and cutting manual processing by 60%.',
      'Built the full data pipeline: image preparation, model training, handling difficult edge cases and model version tracking to simplify future updates.',
    ],
    tags: ['YOLOv8', 'Computer Vision', 'Python', 'OpenCV', 'Model Versioning', 'Data Pipeline'],
    metrics: [
      { value: '96%', label: 'Accuracy' },
      { value: '−60%', label: 'Manual processing' },
      { value: '6 mo', label: 'Duration' },
    ],
  },
  {
    id: 'sonelgaz',
    category: 'experience',
    landmark: 'powerplant',
    title: 'SONELGAZ',
    subtitle: 'Full Stack Software Engineer Intern',
    date: 'Feb 2023 – Jun 2023',
    org: 'National electricity & gas company',
    position: [255, -10],
    radius: 26,
    summary:
      'Designed and built an internal cloud provisioning portal, front-end to back-end.',
    bullets: [
      'Designed and developed an internal cloud provisioning portal (front-end and back-end).',
      'Back-end development and SQL database integration.',
      'Worked in an Agile / Scrum team.',
    ],
    tags: ['Full Stack', 'JavaScript', 'SQL', 'Cloud Provisioning', 'Agile / Scrum'],
    metrics: [
      { value: '5 mo', label: 'Duration' },
      { value: 'Full', label: 'Stack' },
    ],
  },

  // ── PROJECTS ──────────────────────────────────────────────────────────────
  {
    id: 'grid',
    category: 'project',
    landmark: 'windfarm',
    title: 'Power Grid Forecasting Platform',
    subtitle: 'Real-time streaming & ML forecasting',
    date: 'Apr 2026',
    position: [150, 135],
    radius: 27,
    summary:
      'End-to-end platform that ingests, transforms and reliably stores real-time electricity grid events, then forecasts consumption with monitored ML models.',
    bullets: [
      'Ingests more than 10,000 events per minute in real time, transforms them and stores them reliably for analysis.',
      'Consumption forecasting with automatic model performance tracking.',
      'Automatic anomaly detection with alerting to keep predictions reliable, shown in an interactive dashboard.',
    ],
    tags: ['Kafka', 'PySpark', 'Delta Lake', 'LightGBM', 'MLflow', 'Streamlit', 'Docker'],
    metrics: [
      { value: '10k+', label: 'Events / min' },
      { value: 'Real', label: 'Time' },
    ],
  },
  {
    id: 'waste',
    category: 'project',
    landmark: 'recycling',
    title: 'Automated Waste Sorting',
    subtitle: 'Image recognition with transfer learning',
    date: 'Mar 2026',
    position: [290, 165],
    radius: 22,
    summary:
      'An image classifier that automatically sorts waste into categories by adapting a pre-trained network.',
    bullets: [
      'Built an image classifier that sorts waste into categories automatically, reaching 95% accuracy by adapting a pre-trained model (transfer learning).',
      'Used data augmentation to make the model robust to real-world variation.',
    ],
    tags: ['MobileNetV2', 'TensorFlow', 'Transfer Learning', 'Data Augmentation'],
    metrics: [{ value: '95%', label: 'Accuracy' }],
  },
  {
    id: 'quantum',
    category: 'project',
    landmark: 'crystal',
    title: 'Quantum Machine Learning',
    subtitle: "Master's thesis (PFE)",
    date: '2025',
    position: [40, 265],
    radius: 25,
    summary:
      'Comparative study of quantum vs. classical machine learning models on real-world datasets.',
    bullets: [
      'Compared quantum models (QSVM, VQC, Hybrid QNN) with classical ones (SVM, MLP) on 7 real datasets.',
      'Quantum models proved competitive with classical ones, reaching accuracy up to 0.95.',
      'Thesis graded "Excellent".',
    ],
    tags: ['Qiskit', 'Qiskit ML', 'Scikit-learn', 'PCA', 'SMOTE', 'NumPy'],
    metrics: [
      { value: '0.95', label: 'Best accuracy' },
      { value: '7', label: 'Datasets' },
      { value: '5', label: 'Models compared' },
    ],
  },
  {
    id: 'stereo',
    category: 'project',
    landmark: 'observatory',
    title: '3D Detection & Positioning',
    subtitle: 'Stereo vision system',
    date: '2024 – 2025',
    position: [-95, 300],
    radius: 22,
    summary:
      'A stereo-vision system that detects objects and computes their 3D coordinates in real time.',
    bullets: [
      'Built a stereo-vision system with OpenCV and YOLO.',
      'Implemented triangulation algorithms to compute (x, y, z) coordinates in real time.',
      'Optimised performance for real-time processing.',
    ],
    tags: ['OpenCV', 'YOLO', 'Stereo Vision', 'Triangulation', 'Python'],
    metrics: [{ value: 'x,y,z', label: 'Real time' }],
  },
  {
    id: 'twitter',
    category: 'project',
    landmark: 'birdnest',
    title: 'Twitter Sentiment Analysis',
    subtitle: 'NLP classification pipeline',
    date: '2024',
    position: [200, 280],
    radius: 21,
    summary:
      'NLP pipeline that classifies tweet sentiment on the Sentiment140 dataset (1.6M tweets).',
    bullets: [
      'Preprocessing and feature extraction on 1.6M tweets (Sentiment140).',
      'Compared classical ML models (LR, SVC, KNN) with an RNN; the RNN performed best (AUC 0.87).',
    ],
    tags: ['NLTK', 'Scikit-learn', 'TensorFlow', 'Keras', 'Pandas', 'NumPy'],
    metrics: [
      { value: '1.6M', label: 'Tweets' },
      { value: '0.87', label: 'AUC (RNN)' },
    ],
  },
  {
    id: 'climate',
    category: 'project',
    landmark: 'desert',
    title: 'Algerian Climate & Soil Analysis',
    subtitle: 'Geospatial data fusion & dashboard',
    date: '2024',
    position: [330, 60],
    radius: 24,
    summary:
      'Merged an Algerian soil dataset with ERA5/WFDE5 climate data and built an interactive map dashboard.',
    bullets: [
      'Merged an Algerian soil dataset with the 2019 ERA5/WFDE5 climate dataset using spatial joins on NetCDF4 files.',
      'Built an interactive dashboard with maps and climate-variable visualisations clipped to Algeria.',
    ],
    tags: ['Xarray', 'GeoPandas', 'Folium', 'Streamlit', 'NetCDF4'],
    metrics: [{ value: '2019', label: 'ERA5 / WFDE5' }],
  },
  {
    id: 'lung',
    category: 'project',
    landmark: 'medical',
    title: 'Lung Nodule Segmentation',
    subtitle: "Bachelor's thesis (PFE) · Deep learning",
    date: '2023',
    position: [-60, 170],
    radius: 23,
    summary:
      '2D segmentation of lung nodules in CT scans with deep learning, plus K-means based classification.',
    bullets: [
      'Segmented lung nodules with U-Net and Mask R-CNN and classified them with K-means clustering (LUNA16 CT scans).',
      'U-Net performed best (Dice 0.77, IoU 0.62) vs. Mask R-CNN (Dice 0.67, IoU 0.56).',
      'Desktop interface built with Tkinter.',
    ],
    tags: ['LUNA16', 'U-Net', 'Mask R-CNN', 'TensorFlow', 'Keras', 'OpenCV', 'Scikit-learn', 'Tkinter'],
    metrics: [
      { value: '0.77', label: 'Dice (U-Net)' },
      { value: '0.62', label: 'IoU' },
    ],
  },

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  {
    id: 'upec',
    category: 'education',
    landmark: 'university',
    title: 'UPEC',
    subtitle: "Master's · Distributed Systems & Data Science Technologies",
    date: '2026 – 2028',
    org: 'Créteil, France',
    position: [-165, -70],
    radius: 26,
    summary:
      "Master's programme focused on distributed systems and data-science technologies, as an apprenticeship.",
    bullets: [
      'Distributed systems, big-data processing and data-science engineering.',
      'Apprenticeship rhythm: 4 weeks at school / 4 weeks at the company.',
    ],
    tags: ['Distributed Systems', 'Big Data', 'Data Science'],
    metrics: [{ value: '2026', label: 'Start' }],
  },
  {
    id: 'ece',
    category: 'education',
    landmark: 'tower',
    title: 'ECE Paris',
    subtitle: 'MSc Data Management & Artificial Intelligence',
    date: '2025 – 2026',
    org: 'Paris, France',
    position: [-275, 35],
    radius: 23,
    summary: 'MSc programme in data management and artificial intelligence.',
    bullets: [
      'Data management, data engineering and applied AI.',
    ],
    tags: ['Data Management', 'Artificial Intelligence'],
    metrics: [],
  },
  {
    id: 'usthb',
    category: 'education',
    landmark: 'temple',
    title: 'USTHB',
    subtitle: "Master's in Intelligent Computer Systems · Bachelor's in Information Systems Engineering",
    date: '2020 – 2025',
    org: 'Algiers, Algeria',
    position: [-190, 150],
    radius: 27,
    summary:
      "Five years at USTHB: a Bachelor's in Information Systems Engineering followed by a Master's in Intelligent Computer Systems.",
    bullets: [
      "Master's in Intelligent Computer Systems (2023 – 2025): thesis graded \"Excellent\" (Quantum Machine Learning).",
      "Bachelor's in Information Systems Engineering (2020 – 2023): thesis on lung nodule segmentation with deep learning.",
    ],
    tags: ['Artificial Intelligence', 'Information Systems', 'Software Engineering'],
    metrics: [
      { value: '5 yrs', label: 'Studies' },
      { value: 'Excellent', label: 'Thesis grade' },
    ],
  },
];
