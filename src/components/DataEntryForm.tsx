"use client";

import React, { useState } from "react";
import { useResume, Education, Experience, Project, Activity, Publication } from "../app/context/ResumeContext";
import styles from "./DataEntryForm.module.css";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export default function DataEntryForm() {
  const { data, updateData, updateSectionItem, addSectionItem, removeSectionItem } = useResume();
  const [openSection, setOpenSection] = useState<string>("personalInfo");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const SectionHeader = ({ title, sectionName }: { title: string; sectionName: string }) => (
    <div className={styles.sectionHeader} onClick={() => toggleSection(sectionName)}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {openSection === sectionName ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </div>
  );

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.mainTitle}>Resume Data Entry</h2>

      {/* Personal Info */}
      <div className={styles.section}>
        <SectionHeader title="Personal Information" sectionName="personalInfo" />
        {openSection === "personalInfo" && (
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input className={styles.inputField} value={data.personalInfo.firstName} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, firstName: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input className={styles.inputField} value={data.personalInfo.lastName} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, lastName: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input className={styles.inputField} value={data.personalInfo.email} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, email: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Phone</label>
              <input className={styles.inputField} value={data.personalInfo.phone} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, phone: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Location (City, ST)</label>
              <input className={styles.inputField} value={data.personalInfo.location} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, location: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Nationality (Europass only)</label>
              <input className={styles.inputField} value={data.personalInfo.nationality || ""} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, nationality: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Profile Picture URL (Europass only)</label>
              <input className={styles.inputField} value={data.personalInfo.profilePicture || ""} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, profilePicture: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>About Me Summary (Europass only)</label>
              <textarea className={styles.inputField} rows={4} value={data.personalInfo.aboutMe || ""} onChange={(e) => updateData("personalInfo", { ...data.personalInfo, aboutMe: e.target.value })} />
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div className={styles.section}>
        <SectionHeader title="Education" sectionName="education" />
        {openSection === "education" && (
          <div className={styles.sectionContent}>
            {data.education.map((edu: Education) => (
              <div key={edu.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{edu.institution || "New Institution"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("education", edu.id)}><Trash2 size={16} /></button>
                </div>
                <input className={styles.inputField} placeholder="Institution" value={edu.institution} onChange={(e) => updateSectionItem("education", edu.id, "institution", e.target.value)} />
                <input className={styles.inputField} placeholder="Location (City, ST)" value={edu.location} onChange={(e) => updateSectionItem("education", edu.id, "location", e.target.value)} />
                <input className={styles.inputField} placeholder="Degree Title" value={edu.degree} onChange={(e) => updateSectionItem("education", edu.id, "degree", e.target.value)} />
                <input className={styles.inputField} placeholder="Date (Expected May 2024)" value={edu.date} onChange={(e) => updateSectionItem("education", edu.id, "date", e.target.value)} />
                <input className={styles.inputField} placeholder="GPA (e.g. 3.58/4.0)" value={edu.gpa} onChange={(e) => updateSectionItem("education", edu.id, "gpa", e.target.value)} />
                <textarea className={styles.inputField} placeholder="Relevant Coursework" value={edu.coursework} onChange={(e) => updateSectionItem("education", edu.id, "coursework", e.target.value)} />
              </div>
            ))}
            <button className={styles.addBtn} onClick={() => addSectionItem("education", { id: Date.now().toString(), institution: "", location: "", degree: "", date: "", gpa: "", coursework: "" })}>
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className={styles.section}>
        <SectionHeader title="Work Experience" sectionName="experience" />
        {openSection === "experience" && (
          <div className={styles.sectionContent}>
            {data.experience.map((exp: Experience) => (
              <div key={exp.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{exp.company || "New Experience"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("experience", exp.id)}><Trash2 size={16} /></button>
                </div>
                <input className={styles.inputField} placeholder="Company Name" value={exp.company} onChange={(e) => updateSectionItem("experience", exp.id, "company", e.target.value)} />
                <input className={styles.inputField} placeholder="Location" value={exp.location} onChange={(e) => updateSectionItem("experience", exp.id, "location", e.target.value)} />
                <input className={styles.inputField} placeholder="Title" value={exp.title} onChange={(e) => updateSectionItem("experience", exp.id, "title", e.target.value)} />
                <input className={styles.inputField} placeholder="Dates" value={exp.date} onChange={(e) => updateSectionItem("experience", exp.id, "date", e.target.value)} />
                <textarea className={styles.inputField} placeholder="Bullet points (one per line)" value={exp.bullets.join("\n")} onChange={(e) => updateSectionItem("experience", exp.id, "bullets", e.target.value.split("\n"))} rows={5} />
              </div>
            ))}
            <button className={styles.addBtn} onClick={() => addSectionItem("experience", { id: Date.now().toString(), company: "", location: "", title: "", date: "", bullets: [""] })}>
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Publications */}
      <div className={styles.section}>
        <SectionHeader title="Publications" sectionName="publications" />
        {openSection === "publications" && (
          <div className={styles.sectionContent}>
            {data.publications.map((pub: Publication) => (
              <div key={pub.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{pub.title || "New Publication"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("publications", pub.id)}><Trash2 size={16} /></button>
                </div>
                <input className={styles.inputField} placeholder="Title" value={pub.title} onChange={(e) => updateSectionItem("publications", pub.id, "title", e.target.value)} />
                <input className={styles.inputField} placeholder="Authors (e.g. A. Demir and D. Moazed)" value={pub.authors} onChange={(e) => updateSectionItem("publications", pub.id, "authors", e.target.value)} />
                <input className={styles.inputField} placeholder="Journal/Venue" value={pub.journal} onChange={(e) => updateSectionItem("publications", pub.id, "journal", e.target.value)} />
                <input className={styles.inputField} placeholder="Date (e.g. 2024)" value={pub.date} onChange={(e) => updateSectionItem("publications", pub.id, "date", e.target.value)} />
                <input className={styles.inputField} placeholder="Hyperlink URL (optional)" value={pub.link} onChange={(e) => updateSectionItem("publications", pub.id, "link", e.target.value)} />
              </div>
            ))}
            <button className={styles.addBtn} onClick={() => addSectionItem("publications", { id: Date.now().toString(), title: "", authors: "", journal: "", date: "", link: "" })}>
              <Plus size={16} /> Add Publication
            </button>
          </div>
        )}
      </div>

      {/* Additional */}
      <div className={styles.section}>
        <SectionHeader title="Additional Info (Skills, Awards)" sectionName="additional" />
        {openSection === "additional" && (
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Technical Skills</label>
              <input className={styles.inputField} value={data.additional.technicalSkills} onChange={(e) => updateData("additional", { ...data.additional, technicalSkills: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Programming Skills</label>
              <input className={styles.inputField} value={data.additional.programmingSkills} onChange={(e) => updateData("additional", { ...data.additional, programmingSkills: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Languages</label>
              <input className={styles.inputField} value={data.additional.languages} onChange={(e) => updateData("additional", { ...data.additional, languages: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Certifications & Training</label>
              <input className={styles.inputField} value={data.additional.certifications} onChange={(e) => updateData("additional", { ...data.additional, certifications: e.target.value })} />
            </div>
            <div className={styles.formGroup}>
              <label>Awards</label>
              <input className={styles.inputField} value={data.additional.awards} onChange={(e) => updateData("additional", { ...data.additional, awards: e.target.value })} />
            </div>
          </div>
        )}
      </div>

      {/* Online Profiles & Links */}
      <div className={styles.section}>
        <SectionHeader title="🔗 Online Profiles & Links" sectionName="onlineProfiles" />
        {openSection === "onlineProfiles" && (
          <div className={styles.sectionContent}>
            <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
              These links will only appear on the CV if filled in. When provided, they will be automatically hyperlinked.
            </p>
            <div className={styles.formGroup}>
              <label>LinkedIn URL</label>
              <input
                className={styles.inputField}
                placeholder="e.g. linkedin.com/in/yourname"
                value={data.personalInfo.linkedin}
                onChange={(e) => updateData("personalInfo", { ...data.personalInfo, linkedin: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Portfolio / Personal Website URL</label>
              <input
                className={styles.inputField}
                placeholder="e.g. github.com/yourname or yoursite.com"
                value={data.personalInfo.portfolio || ""}
                onChange={(e) => updateData("personalInfo", { ...data.personalInfo, portfolio: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
