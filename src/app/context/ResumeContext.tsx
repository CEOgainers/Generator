"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ResumeStrategy {
  targetCountries: string[];
  targetPrograms: string[];
  researchFocus: string[];
  careerGoals: string;
  resumeType: string;
  pageTarget: string;
  maximumPageLimit: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  orcid: string;
  googleScholar: string;
  researchGate: string;
  nationality: string;
  profilePicture: string;
  aboutMe: string;
  personalId: string;
  dateOfBirth: string;
  placeOfBirth: string;
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  major: string;
  date: string;
  gpa: string;
  ranking: string;
  thesis: string;
  advisor: string;
  coursework: string;
}

export interface ResearchExperience {
  id: string;
  institution: string;
  location: string;
  role: string;
  date: string;
  supervisor: string;
  bullets: string[];
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  title: string;
  date: string;
  bullets: string[];
}

export interface SelectedPublication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  publisher: string;
  quartile: string;
  date: string;
  doi: string;
  link: string;
  status: string;
}

export interface SelectedProject {
  id: string;
  name: string;
  date: string;
  fundingOrGrant: string;
  supervisor: string;
  bullets: string[];
}

export interface HonorsAwardsScholarships {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface StandardizedTest {
  id: string;
  testName: string;
  score: string;
  date: string;
  breakdown: string;
}

export interface CertificationsTraining {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Activity {
  id: string;
  organization: string;
  location: string;
  role: string;
  date: string;
  bullets: string[];
}

export interface Additional {
  technicalSkills: string;
  programmingSkills: string;
  laboratorySkills: string;
  languages: string;
  professionalMemberships: string;
  peerReviewActivities: string;
  certifications: string;
  awards: string;
  additionalAcademicStrength: string;
}

export interface RemovedContentJustification {
  removedSections: { sectionName: string; reason: string }[];
  removedPublications: { title: string; reason: string }[];
  removedProjects: { name: string; reason: string }[];
  removedExperience: { title: string; organization: string; reason: string }[];
  removedEducation: { institutionOrLevel: string; reason: string }[];
  overallFilteringSummary: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  date?: string;
  description?: string;
  bullets?: string[];
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface ResumeData {
  resumeStrategy: ResumeStrategy;
  personalInfo: PersonalInfo;
  education: Education[];
  researchExperience: ResearchExperience[];
  experience: Experience[];
  selectedPublications: SelectedPublication[];
  selectedProjects: SelectedProject[];
  honorsAwardsScholarships: HonorsAwardsScholarships[];
  standardizedTests: StandardizedTest[];
  certificationsTraining: CertificationsTraining[];
  activities: Activity[];
  additional: Additional;
  removedContentJustification: RemovedContentJustification;
  customSections?: CustomSection[];
  hiddenSections?: string[];
  themeColor?: "navy" | "slate" | "emerald" | "burgundy" | "classic";
  fontFamily?: "calibri" | "arial" | "times" | "georgia";
}

const initialData: ResumeData = {
  resumeStrategy: {
    targetCountries: [],
    targetPrograms: [],
    researchFocus: [],
    careerGoals: "",
    resumeType: "Academic Scholarship Resume",
    pageTarget: "1–1.5 pages",
    maximumPageLimit: "2 pages"
  },
  personalInfo: {
    firstName: "First",
    lastName: "Last",
    fullName: "First Last",
    email: "first.last@ivy.edu",
    phone: "(123) 456-7891",
    location: "City, Country",
    linkedin: "",
    portfolio: "",
    orcid: "",
    googleScholar: "",
    researchGate: "",
    nationality: "",
    profilePicture: "",
    aboutMe: "",
    personalId: "",
    dateOfBirth: "",
    placeOfBirth: ""
  },
  education: [
    {
      id: "edu_1",
      institution: "Ivy League University",
      location: "City, Country",
      degree: "Bachelor of Science",
      major: "Computer Science",
      date: "Expected May 2024",
      gpa: "3.90/4.0",
      ranking: "Top 5%",
      thesis: "Optimizing Neural Network Architectures for Edge Devices",
      advisor: "Dr. Alan Turing",
      coursework: "Software Engineering, Operating Systems, Algorithms"
    }
  ],
  researchExperience: [
    {
      id: "rex_1",
      institution: "AI Research Laboratory",
      location: "City, Country",
      role: "Graduate Research Assistant",
      date: "Jun 2023 - Present",
      supervisor: "Prof. Jane Doe",
      bullets: [
        "Formulated novel machine learning models improving accuracy by 15% on benchmark datasets.",
        "Authored literature review and co-drafted manuscript for Q1 journal publication."
      ]
    }
  ],
  experience: [
    {
      id: "exp_1",
      company: "Tech Innovators Inc.",
      location: "City, Country",
      title: "Software Engineer Intern",
      date: "Jun 2022 - Sep 2022",
      bullets: [
        "Developed API endpoints serving 10k+ daily active users using Node.js.",
        "Refactored legacy query logic, reducing database load and improving response times by 30%."
      ]
    }
  ],
  selectedPublications: [
    {
      id: "pub_1",
      title: "Deep Learning Architectures for Resource-Constrained Environments",
      authors: "First Last, Jane Doe",
      journal: "IEEE Transactions on Neural Networks",
      publisher: "IEEE",
      quartile: "Q1",
      date: "2024",
      doi: "10.1109/TNNLS.2024.12345",
      link: "https://doi.org/10.1109/TNNLS.2024.12345",
      status: "Published"
    }
  ],
  selectedProjects: [
    {
      id: "proj_1",
      name: "Autonomous Drone Navigation System",
      date: "2023",
      fundingOrGrant: "National Science Foundation ($50,000)",
      supervisor: "Dr. Alan Turing",
      bullets: [
        "Designed real-time obstacle avoidance algorithms utilizing computer vision.",
        "Presented findings at the undergraduate research symposium, winning best project award."
      ]
    }
  ],
  honorsAwardsScholarships: [
    {
      id: "award_1",
      title: "Presidential Gold Medal",
      organization: "Ivy League University",
      date: "2024",
      description: "Awarded to the top academic performer in the engineering graduating class."
    }
  ],
  standardizedTests: [
    {
      id: "test_1",
      testName: "GRE",
      score: "330",
      date: "2023",
      breakdown: "168 Quantitative, 162 Verbal, 4.5 Analytical Writing"
    }
  ],
  certificationsTraining: [
    {
      id: "cert_1",
      title: "Advanced Machine Learning Specialization",
      organization: "Coursera / Stanford University",
      date: "2023",
      description: "Deep learning, reinforcement learning, and generative models."
    }
  ],
  activities: [
    {
      id: "act_1",
      organization: "Computer Science Student Association",
      location: "City, Country",
      role: "Vice President",
      date: "2022 - 2024",
      bullets: [
        "Organized 3 major hackathons with 500+ participants, securing sponsorship from 10+ companies.",
        "Conducted weekly coding tutorials for freshman students, improving course pass rates."
      ]
    }
  ],
  additional: {
    technicalSkills: "Advanced in CAD (SolidWorks, AutoCAD)",
    programmingSkills: "Proficient in Python, C++, SQL, JavaScript",
    laboratorySkills: "Oscilloscope, PCB design, Soldering",
    languages: "Fluent in English; Conversational in Spanish",
    professionalMemberships: "IEEE Student Member",
    peerReviewActivities: "Reviewer for Student Research Journal",
    certifications: "",
    awards: "",
    additionalAcademicStrength: "Experienced in high-performance computing clusters."
  },
  removedContentJustification: {
    removedSections: [],
    removedPublications: [],
    removedProjects: [],
    removedExperience: [],
    removedEducation: [],
    overallFilteringSummary: ""
  },
  customSections: [],
  hiddenSections: [],
  themeColor: "navy",
  fontFamily: "calibri"
};

interface ResumeContextType {
  data: ResumeData;
  updateData: (section: keyof ResumeData, value: any) => void;
  updateSectionItem: (section: keyof ResumeData, id: string, field: string, value: any) => void;
  addSectionItem: (section: keyof ResumeData, item: any) => void;
  removeSectionItem: (section: keyof ResumeData, id: string) => void;
  addCustomSection: (title: string) => void;
  removeCustomSection: (sectionId: string) => void;
  updateCustomSectionTitle: (sectionId: string, title: string) => void;
  addCustomSectionItem: (sectionId: string, item: CustomSectionItem) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, field: keyof CustomSectionItem, value: any) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  moveCustomSection: (sectionId: string, direction: "up" | "down") => void;
  toggleSectionVisibility: (sectionKey: string) => void;
  loadData: (newData: ResumeData) => void;
  clearDraft: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResumeData>(initialData);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on initial load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cv_generator_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setData((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      console.error("Failed to load draft from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage on data change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("cv_generator_draft", JSON.stringify(data));
      } catch (e) {
        console.error("Failed to save draft to localStorage", e);
      }
    }
  }, [data, isHydrated]);

  const updateData = (section: keyof ResumeData, value: any) => {
    setData((prev) => ({ ...prev, [section]: value }));
  };

  const updateSectionItem = (section: keyof ResumeData, id: string, field: string, value: any) => {
    setData((prev) => {
      const list = (prev[section] || []) as any[];
      return {
        ...prev,
        [section]: list.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      };
    });
  };

  const addSectionItem = (section: keyof ResumeData, item: any) => {
    setData((prev) => {
      const list = (prev[section] || []) as any[];
      return { ...prev, [section]: [...list, item] };
    });
  };

  const removeSectionItem = (section: keyof ResumeData, id: string) => {
    setData((prev) => {
      const list = (prev[section] || []) as any[];
      return { ...prev, [section]: list.filter((item) => item.id !== id) };
    });
  };

  const addCustomSection = (sectionTitle: string) => {
    const newSection: CustomSection = {
      id: `custom_${Date.now()}`,
      sectionTitle: sectionTitle || "Custom Section",
      items: [],
    };
    setData((prev) => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection],
    }));
  };

  const removeCustomSection = (sectionId: string) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).filter((s) => s.id !== sectionId),
    }));
  };

  const updateCustomSectionTitle = (sectionId: string, sectionTitle: string) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((s) =>
        s.id === sectionId ? { ...s, sectionTitle } : s
      ),
    }));
  };

  const addCustomSectionItem = (sectionId: string, item: CustomSectionItem) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, item] } : s
      ),
    }));
  };

  const updateCustomSectionItem = (sectionId: string, itemId: string, field: keyof CustomSectionItem, value: any) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          items: s.items.map((it) => (it.id === itemId ? { ...it, [field]: value } : it)),
        };
      }),
    }));
  };

  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    setData((prev) => ({
      ...prev,
      customSections: (prev.customSections || []).map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          items: s.items.filter((it) => it.id !== itemId),
        };
      }),
    }));
  };

  const moveCustomSection = (sectionId: string, direction: "up" | "down") => {
    setData((prev) => {
      const list = [...(prev.customSections || [])];
      const idx = list.findIndex((s) => s.id === sectionId);
      if (idx === -1) return prev;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= list.length) return prev;
      const temp = list[idx];
      list[idx] = list[targetIdx];
      list[targetIdx] = temp;
      return { ...prev, customSections: list };
    });
  };

  const toggleSectionVisibility = (sectionKey: string) => {
    setData((prev) => {
      const hidden = new Set(prev.hiddenSections || []);
      if (hidden.has(sectionKey)) {
        hidden.delete(sectionKey);
      } else {
        hidden.add(sectionKey);
      }
      return { ...prev, hiddenSections: Array.from(hidden) };
    });
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem("cv_generator_draft");
    } catch (e) {
      console.error("Failed to clear draft", e);
    }
    setData(initialData);
  };

  const loadData = (newData: any) => {
    const mergedData: ResumeData = {
      resumeStrategy: { ...initialData.resumeStrategy, ...(newData?.resumeStrategy || {}) },
      personalInfo: { ...initialData.personalInfo, ...(newData?.personalInfo || {}) },
      education: newData?.education || [],
      researchExperience: newData?.researchExperience || [],
      experience: newData?.experience || [],
      selectedPublications: newData?.selectedPublications || [],
      selectedProjects: newData?.selectedProjects || [],
      honorsAwardsScholarships: newData?.honorsAwardsScholarships || [],
      standardizedTests: newData?.standardizedTests || [],
      certificationsTraining: newData?.certificationsTraining || [],
      activities: newData?.activities || [],
      additional: { ...initialData.additional, ...(newData?.additional || {}) },
      removedContentJustification: { ...initialData.removedContentJustification, ...(newData?.removedContentJustification || {}) },
      customSections: newData?.customSections || [],
      hiddenSections: newData?.hiddenSections || [],
      themeColor: newData?.themeColor || "navy",
      fontFamily: newData?.fontFamily || "calibri",
    };
    setData(mergedData);
  };

  return (
    <ResumeContext.Provider
      value={{
        data,
        updateData,
        updateSectionItem,
        addSectionItem,
        removeSectionItem,
        addCustomSection,
        removeCustomSection,
        updateCustomSectionTitle,
        addCustomSectionItem,
        updateCustomSectionItem,
        removeCustomSectionItem,
        moveCustomSection,
        toggleSectionVisibility,
        loadData,
        clearDraft,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
};
