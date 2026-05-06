"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  date: string;
  gpa: string;
  coursework: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  title: string;
  date: string;
  bullets: string[];
}

export interface Project {
  id: string;
  name: string;
  date: string;
  bullets: string[];
}

export interface Activity {
  id: string;
  organization: string;
  location: string;
  role: string;
  date: string;
  bullets: string[];
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  date: string;
  link: string;
}

export interface Additional {
  technicalSkills: string;
  programmingSkills: string;
  languages: string;
  certifications: string;
  awards: string;
}

export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    nationality?: string;
    profilePicture?: string;
    aboutMe?: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  activities: Activity[];
  publications: Publication[];
  additional: Additional;
}

const initialData: ResumeData = {
  personalInfo: {
    firstName: "First",
    lastName: "Last",
    email: "first.last@ivy.edu",
    phone: "(123) 456-7891",
    location: "City, ST",
    linkedin: "linkedin.com/in/username",
    nationality: "Nigerian (Nigeria)",
    profilePicture: "https://via.placeholder.com/150",
    aboutMe: "Highly focused, energetic, and enthusiastic first class graduate..."
  },
  education: [
    {
      id: "1",
      institution: "Ivy League University",
      location: "City, ST",
      degree: "Bachelor of Engineering, Major in Computer Science",
      date: "Expected May 2024",
      gpa: "3.58/4.0",
      coursework: "Software Engineering, Operating Systems, Algorithms",
    },
  ],
  experience: [
    {
      id: "1",
      company: "Some Engineering Company",
      location: "City, ST",
      title: "Mechanical Engineering Intern",
      date: "Jun 2019 - Sep 2021",
      bullets: [
        "Coordinated hydraulic testing of pumps to verify performance parameters such as total dynamic head, volumetric flow rate, and efficiency; directed post-test work instructions, increasing efficiency by 1-3%",
        "Created pump quotation software using Excel VBA to configure and price vertical circulating water pumps; reducing the lead time of pump quotations by 80%",
      ],
    },
  ],
  projects: [],
  activities: [],
  publications: [],
  additional: {
    technicalSkills: "Advanced in CAD (SolidWorks, AutoCAD)",
    programmingSkills: "Proficient in MATLAB, Python, JavaScript",
    languages: "Fluent in French, English; Conversational in Japanese",
    certifications: "",
    awards: "Dean's List Multiple Semesters",
  },
};

interface ResumeContextType {
  data: ResumeData;
  updateData: (section: keyof ResumeData, value: any) => void;
  updateSectionItem: (section: keyof ResumeData, id: string, field: string, value: any) => void;
  addSectionItem: (section: keyof ResumeData, item: any) => void;
  removeSectionItem: (section: keyof ResumeData, id: string) => void;
  loadData: (newData: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ResumeData>(initialData);

  const updateData = (section: keyof ResumeData, value: any) => {
    setData((prev) => ({ ...prev, [section]: value }));
  };

  const updateSectionItem = (section: keyof ResumeData, id: string, field: string, value: any) => {
    setData((prev) => {
      const list = prev[section] as any[];
      return {
        ...prev,
        [section]: list.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      };
    });
  };

  const addSectionItem = (section: keyof ResumeData, item: any) => {
    setData((prev) => {
      const list = prev[section] as any[];
      return { ...prev, [section]: [...list, item] };
    });
  };

  const removeSectionItem = (section: keyof ResumeData, id: string) => {
    setData((prev) => {
      const list = prev[section] as any[];
      return { ...prev, [section]: list.filter((item) => item.id !== id) };
    });
  };

  const loadData = (newData: any) => {
    // Merge with initial data to ensure all keys exist even if JSON is partial or old
    const mergedData: ResumeData = {
      personalInfo: { ...initialData.personalInfo, ...(newData?.personalInfo || {}) },
      education: newData?.education || [],
      experience: newData?.experience || [],
      projects: newData?.projects || [],
      activities: newData?.activities || [],
      publications: newData?.publications || [],
      additional: { ...initialData.additional, ...(newData?.additional || {}) },
    };
    setData(mergedData);
  };

  return (
    <ResumeContext.Provider value={{ data, updateData, updateSectionItem, addSectionItem, removeSectionItem, loadData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
};
