export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  impact: string;
  highlights: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  highlights: string[];
};

export type ProjectItem = {
  name: string;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  image: string;
};

export type SkillCluster = {
  domain: string;
  skills: string[];
};

export const portfolioData = {
  profile: {
    name: "Gopinath S",
    title: "AI Augmented Quality Analyst",
    location: "Chennai, India",
    currentRole: "Quality Assurance & Engineering",
    linkedin: "https://in.linkedin.com/in/gopinath-s-006a681a0",
    email: "gopinathqa01@gmail.com",
    phone: "+91-XXXXXXXXXX",
    summary:
      "I make software question its life choices. 😎 | Quality Analyst @ Agilysys | Ex-Amazonian | M.Tech @ SRMIST | I test, automate, break, and improve things — because if it works perfectly on the first try, I probably haven’t tested it enough. 🐛🚀",
    avatar: "/images/profile-main.jpg",
  },
  kpis: [
    { label: "Years in QA", value: "3+" },
    { label: "Projects Delivered", value: "10+" },
    { label: "Automation Efficiency", value: "70%" },
    { label: "Cross-Functional Teams", value: "10+" },
  ],
  philosophy: [
    "Quality is a product feature, not a testing phase.",
    "Automation should accelerate confidence, not complexity.",
    "Leadership means enabling teams to ship faster with fewer regressions.",
  ],
  experience: [
    {
      company: "Agilysys, Inc",
      role: "Quality Analyst",
      period: "Oct 2025 - Present",
      impact: "Built scalable quality systems across product squads.",
      highlights: [
        "Reduced regression effort with test automation architecture.",
        "Partnered with Product Teams and Software engineers to improve release quality metrics.",
        "Maintaining quality Initiatives for leadership/Managers visibility.",
      ],
    },
    {
      company: "Amazon India",
      role: "Testing Associate",
      period: "Oct 2023 - Oct 2025",
      impact: "Established stable test practices for high velocity releases.",
      highlights: [
        "Created robust test strategy for critical modules.",
        "Improved defect discovery earlier in STLC and in production.",
        "Mentored junior Test engineers on Product Testing standards.",
      ],
    },
    {
      company: "Cognizant Technology Solutions",
      role: "Programmer Analyst Trainee",
      period: "May 2023 - Aug 2023",
      impact: "Contributed to software performance testing initiatives.",
      highlights: [
        "Developed and maintained performance testing code.",
        "Assisted in testing and quality assurance activities.",
        "Collaborated with cross-functional teams on project deliverables.",
      ],
    },
  ] as ExperienceItem[],
  education: [
    {
      institution: "SRM Institute of Science and Technology",
      degree: "M.Tech",
      period: "2024 - 2026",
      highlights: [
        "Focused on Cloud Computing and Blockchain fundamentals.",
        "Built projects related to Blockchain based Counterfeit Product Verification System.",
      ],
    },
    {
      institution: "RMD Engineering College",
      degree: "B.Tech",
      period: "2019 - 2023",
      highlights: [
        "Focused on Information Technology and Software Engineering.",
        "Built projects related to AI based Attendance Registration System",
      ],
    },
    {
      institution: "Tagore Matric Hr Sec School",
      degree: "HSC +2",
      period: "2018 - 2019",
      highlights: [
        "Focused on Computer Science and Mathematics group.",
        "Highly active and interested in CS and Language papers scored more than 95% on each.",
      ],
    },
  ] as EducationItem[],
  achievements: [
    "SUPER SQUAD AWARD from Agilysys for my Support to the team and contributions to the product",
    "SPOT AWARD from Amazon for my Exemplary Performance",
    "EXTRA MILE AWARD from Amazon for my contributions to the team",
    "RISING THE BAR AWARD from Amazon for my Ownership, Customer Obsession, and Delivering Results to the Customers",
  ],
  skillClusters: [
    {
      domain: "Testing",
      skills: ["Functional Testing", "Regression", "API Testing", "UAT", "Performance Testing", "Load Testing", "UI & Device Testing"],
    },
    {
      domain: "Automation",
      skills: ["Playwright", "Load Runner", "Jmeter", "CI Pipelines", "Framework Design"],
    },
    {
      domain: "AI in QA",
      skills: ["Copilot", "Claude", "ChatGpt", "Test Automation", "Time Consuming Tasks", "Scenario Generation", "Requirements Analysis"],
    },
    {
      domain: "Quality Assurance",
      skills: ["Test Strategy", "Risk Analysis", "Quality Gates", "Metrics", "Release Readiness", "Defect Management"],
    },
    {
      domain: "Agile",
      skills: ["Sprint Planning", "Backlog Grooming", "Cross-Functional Collaboration", "Continuous Improvement"],
    },
    {
      domain: "Product Thinking",
      skills: ["User Journeys", "Prioritization", "Business Impact"],
    },
    {
      domain: "Leadership",
      skills: ["Mentorship", "Task Management", "Team Enablement", "Knowledge Transfer"],
    },
    {
      domain: "Technical Tools",
      skills: ["Jira", "Azure", "TestRail", "Postman", "SQL", "GitHub Actions"],
    },
  ] as SkillCluster[],
  projects: [
    {
      name: "Blockchain Based counterfeit Product verification System",
      problem: "Traditional product verification methods were prone to fraud and inefficiency.",
      solution: "Implemented a blockchain-based verification system to ensure product authenticity and originality.",
      impact: "Reduced fraud and improved efficiency by hybrid blockchain in product verification.",
      tools: ["Python", "Solidity", "RemixIDE"],
      image: "/images/M.Tech_Project.jpg",
    },
    {
      name: "Facial Attendance Using Artificial Intelligence",
      problem: "Manual attendance tracking was time-consuming and error-prone.",
      solution: "Developed an AI-based facial recognition system for automated attendance.",
      impact: "Reduced attendance tracking time and improved accuracy.",
      tools: ["Python", "OpenCV", "Machine Learning"],
      image: "/images/B.Tech_Project.webp",
    },
  ] as ProjectItem[],
  testimonials: [
    {
      author: "QA Manager from Amazon",
      quote:
        "Gopinath consistently turns quality into a strategic advantage for delivery teams.",
    },
    {
      author: "QA Manager from Agilysys",
      quote:
        "Strong product sense plus technical depth. A rare combination in QA leadership.",
    },
  ],
};

export const linkedinImportGuide = {
  note: "LinkedIn blocked direct structured scraping in this environment. Update this file with exact details from your profile for a fully accurate portfolio.",
  fieldsToUpdate: [
    "profile.title",
    "profile.currentRole",
    "profile.summary",
    "experience",
    "education",
    "achievements",
    "projects",
    "skillClusters",
    "profile.email",
    "profile.phone",
  ],
};
