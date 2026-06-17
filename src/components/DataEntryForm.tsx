"use client";

import React, { useState } from "react";
import { useResume } from "../app/context/ResumeContext";
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

      {/* Resume Strategy */}
      <div className={styles.section}>
        <SectionHeader title="Resume Strategy" sectionName="resumeStrategy" />
        {openSection === "resumeStrategy" && (
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Target Countries (Comma-separated)</label>
              <input
                className={styles.inputField}
                value={data.resumeStrategy.targetCountries.join(", ")}
                onChange={(e) =>
                  updateData("resumeStrategy", {
                    ...data.resumeStrategy,
                    targetCountries: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Target Programs (Comma-separated)</label>
              <input
                className={styles.inputField}
                value={data.resumeStrategy.targetPrograms.join(", ")}
                onChange={(e) =>
                  updateData("resumeStrategy", {
                    ...data.resumeStrategy,
                    targetPrograms: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Research Focus Areas (Comma-separated)</label>
              <input
                className={styles.inputField}
                value={data.resumeStrategy.researchFocus.join(", ")}
                onChange={(e) =>
                  updateData("resumeStrategy", {
                    ...data.resumeStrategy,
                    researchFocus: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Career & Future Academic Goals</label>
              <textarea
                className={styles.inputField}
                rows={3}
                value={data.resumeStrategy.careerGoals}
                onChange={(e) =>
                  updateData("resumeStrategy", {
                    ...data.resumeStrategy,
                    careerGoals: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Resume Type</label>
              <input
                className={styles.inputField}
                value={data.resumeStrategy.resumeType}
                onChange={(e) =>
                  updateData("resumeStrategy", {
                    ...data.resumeStrategy,
                    resumeType: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Page Target</label>
              <input
                className={styles.inputField}
                value={data.resumeStrategy.pageTarget}
                onChange={(e) =>
                  updateData("resumeStrategy", {
                    ...data.resumeStrategy,
                    pageTarget: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Maximum Page Limit</label>
              <input
                className={styles.inputField}
                value={data.resumeStrategy.maximumPageLimit}
                onChange={(e) =>
                  updateData("resumeStrategy", {
                    ...data.resumeStrategy,
                    maximumPageLimit: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Personal Info */}
      <div className={styles.section}>
        <SectionHeader title="Personal Information" sectionName="personalInfo" />
        {openSection === "personalInfo" && (
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.firstName}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, firstName: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.lastName}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, lastName: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Full Name</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.fullName}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, fullName: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.email}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, email: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.phone}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, phone: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Location (City, Country)</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.location}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, location: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Nationality</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.nationality}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, nationality: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>LinkedIn URL</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.linkedin}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, linkedin: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Portfolio / Personal Website</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.portfolio}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, portfolio: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>ORCID ID</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.orcid}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, orcid: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Google Scholar Link</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.googleScholar}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, googleScholar: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>ResearchGate Profile Link</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.researchGate}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, researchGate: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Profile Picture URL</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.profilePicture}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, profilePicture: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>About Me / Profile Summary</label>
              <textarea
                className={styles.inputField}
                rows={4}
                value={data.personalInfo.aboutMe}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, aboutMe: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Personal ID</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.personalId || ""}
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, personalId: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Date of Birth</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.dateOfBirth || ""}
                placeholder="e.g. 17/08/2000"
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, dateOfBirth: e.target.value })
                }
              />
            </div>
            <div className={styles.formGroup}>
              <label>Place of Birth</label>
              <input
                className={styles.inputField}
                value={data.personalInfo.placeOfBirth || ""}
                placeholder="e.g. Chattogram, Bangladesh"
                onChange={(e) =>
                  updateData("personalInfo", { ...data.personalInfo, placeOfBirth: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Education */}
      <div className={styles.section}>
        <SectionHeader title="Education" sectionName="education" />
        {openSection === "education" && (
          <div className={styles.sectionContent}>
            {data.education.map((edu) => (
              <div key={edu.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{edu.institution || "New Institution"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("education", edu.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateSectionItem("education", edu.id, "institution", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Location (City, Country)"
                  value={edu.location}
                  onChange={(e) => updateSectionItem("education", edu.id, "location", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Degree Title"
                  value={edu.degree}
                  onChange={(e) => updateSectionItem("education", edu.id, "degree", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Major"
                  value={edu.major}
                  onChange={(e) => updateSectionItem("education", edu.id, "major", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Dates / Expected Completion"
                  value={edu.date}
                  onChange={(e) => updateSectionItem("education", edu.id, "date", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="GPA (e.g. 3.90/4.0)"
                  value={edu.gpa}
                  onChange={(e) => updateSectionItem("education", edu.id, "gpa", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Ranking (e.g. Top 5%)"
                  value={edu.ranking}
                  onChange={(e) => updateSectionItem("education", edu.id, "ranking", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Thesis Title"
                  value={edu.thesis}
                  onChange={(e) => updateSectionItem("education", edu.id, "thesis", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Advisor"
                  value={edu.advisor}
                  onChange={(e) => updateSectionItem("education", edu.id, "advisor", e.target.value)}
                />
                <textarea
                  className={styles.inputField}
                  placeholder="Relevant Coursework"
                  value={edu.coursework}
                  onChange={(e) => updateSectionItem("education", edu.id, "coursework", e.target.value)}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("education", {
                  id: `edu_${Date.now()}`,
                  institution: "",
                  location: "",
                  degree: "",
                  major: "",
                  date: "",
                  gpa: "",
                  ranking: "",
                  thesis: "",
                  advisor: "",
                  coursework: "",
                })
              }
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
        )}
      </div>

      {/* Research Experience */}
      <div className={styles.section}>
        <SectionHeader title="Research Experience" sectionName="researchExperience" />
        {openSection === "researchExperience" && (
          <div className={styles.sectionContent}>
            {data.researchExperience?.map((rex) => (
              <div key={rex.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{rex.institution || "New Research Lab"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("researchExperience", rex.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Institution/Lab"
                  value={rex.institution}
                  onChange={(e) => updateSectionItem("researchExperience", rex.id, "institution", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Location"
                  value={rex.location}
                  onChange={(e) => updateSectionItem("researchExperience", rex.id, "location", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Role (e.g. Research Assistant)"
                  value={rex.role}
                  onChange={(e) => updateSectionItem("researchExperience", rex.id, "role", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Dates"
                  value={rex.date}
                  onChange={(e) => updateSectionItem("researchExperience", rex.id, "date", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Supervisor"
                  value={rex.supervisor}
                  onChange={(e) => updateSectionItem("researchExperience", rex.id, "supervisor", e.target.value)}
                />
                <textarea
                  className={styles.inputField}
                  placeholder="Bullets (one per line)"
                  value={rex.bullets.join("\n")}
                  onChange={(e) => updateSectionItem("researchExperience", rex.id, "bullets", e.target.value.split("\n"))}
                  rows={4}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("researchExperience", {
                  id: `rex_${Date.now()}`,
                  institution: "",
                  location: "",
                  role: "",
                  date: "",
                  supervisor: "",
                  bullets: [""],
                })
              }
            >
              <Plus size={16} /> Add Research Experience
            </button>
          </div>
        )}
      </div>

      {/* Work Experience */}
      <div className={styles.section}>
        <SectionHeader title="Work Experience" sectionName="experience" />
        {openSection === "experience" && (
          <div className={styles.sectionContent}>
            {data.experience.map((exp) => (
              <div key={exp.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{exp.company || "New Experience"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("experience", exp.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => updateSectionItem("experience", exp.id, "company", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) => updateSectionItem("experience", exp.id, "location", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Title"
                  value={exp.title}
                  onChange={(e) => updateSectionItem("experience", exp.id, "title", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Dates"
                  value={exp.date}
                  onChange={(e) => updateSectionItem("experience", exp.id, "date", e.target.value)}
                />
                <textarea
                  className={styles.inputField}
                  placeholder="Bullet points (one per line)"
                  value={exp.bullets.join("\n")}
                  onChange={(e) => updateSectionItem("experience", exp.id, "bullets", e.target.value.split("\n"))}
                  rows={5}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("experience", {
                  id: `exp_${Date.now()}`,
                  company: "",
                  location: "",
                  title: "",
                  date: "",
                  bullets: [""],
                })
              }
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
        )}
      </div>

      {/* Selected Publications */}
      <div className={styles.section}>
        <SectionHeader title="Publications" sectionName="selectedPublications" />
        {openSection === "selectedPublications" && (
          <div className={styles.sectionContent}>
            {data.selectedPublications?.map((pub) => (
              <div key={pub.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{pub.title || "New Publication"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("selectedPublications", pub.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Title"
                  value={pub.title}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "title", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Authors (e.g. A. Demir and D. Moazed)"
                  value={pub.authors}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "authors", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Journal/Venue"
                  value={pub.journal}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "journal", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Publisher"
                  value={pub.publisher}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "publisher", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Quartile (e.g. Q1/Q2)"
                  value={pub.quartile}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "quartile", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Date (e.g. 2024)"
                  value={pub.date}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "date", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="DOI"
                  value={pub.doi}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "doi", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Link"
                  value={pub.link}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "link", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Status (e.g. Published, Submitted, In Review)"
                  value={pub.status}
                  onChange={(e) => updateSectionItem("selectedPublications", pub.id, "status", e.target.value)}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("selectedPublications", {
                  id: `pub_${Date.now()}`,
                  title: "",
                  authors: "",
                  journal: "",
                  publisher: "",
                  quartile: "",
                  date: "",
                  doi: "",
                  link: "",
                  status: "",
                })
              }
            >
              <Plus size={16} /> Add Publication
            </button>
          </div>
        )}
      </div>

      {/* Selected Projects */}
      <div className={styles.section}>
        <SectionHeader title="Selected Projects" sectionName="selectedProjects" />
        {openSection === "selectedProjects" && (
          <div className={styles.sectionContent}>
            {data.selectedProjects?.map((proj) => (
              <div key={proj.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{proj.name || "New Project"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("selectedProjects", proj.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => updateSectionItem("selectedProjects", proj.id, "name", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Date"
                  value={proj.date}
                  onChange={(e) => updateSectionItem("selectedProjects", proj.id, "date", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Funding/Grant info (optional)"
                  value={proj.fundingOrGrant}
                  onChange={(e) => updateSectionItem("selectedProjects", proj.id, "fundingOrGrant", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Supervisor"
                  value={proj.supervisor}
                  onChange={(e) => updateSectionItem("selectedProjects", proj.id, "supervisor", e.target.value)}
                />
                <textarea
                  className={styles.inputField}
                  placeholder="Bullets (one per line)"
                  value={proj.bullets.join("\n")}
                  onChange={(e) => updateSectionItem("selectedProjects", proj.id, "bullets", e.target.value.split("\n"))}
                  rows={4}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("selectedProjects", {
                  id: `proj_${Date.now()}`,
                  name: "",
                  date: "",
                  fundingOrGrant: "",
                  supervisor: "",
                  bullets: [""],
                })
              }
            >
              <Plus size={16} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* Honors, Awards & Scholarships */}
      <div className={styles.section}>
        <SectionHeader title="Honors, Awards & Scholarships" sectionName="honorsAwardsScholarships" />
        {openSection === "honorsAwardsScholarships" && (
          <div className={styles.sectionContent}>
            {data.honorsAwardsScholarships?.map((award) => (
              <div key={award.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{award.title || "New Award"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("honorsAwardsScholarships", award.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Award Title"
                  value={award.title}
                  onChange={(e) => updateSectionItem("honorsAwardsScholarships", award.id, "title", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Granting Organization"
                  value={award.organization}
                  onChange={(e) => updateSectionItem("honorsAwardsScholarships", award.id, "organization", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Date"
                  value={award.date}
                  onChange={(e) => updateSectionItem("honorsAwardsScholarships", award.id, "date", e.target.value)}
                />
                <textarea
                  className={styles.inputField}
                  placeholder="Description"
                  value={award.description}
                  onChange={(e) => updateSectionItem("honorsAwardsScholarships", award.id, "description", e.target.value)}
                  rows={2}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("honorsAwardsScholarships", {
                  id: `award_${Date.now()}`,
                  title: "",
                  organization: "",
                  date: "",
                  description: "",
                })
              }
            >
              <Plus size={16} /> Add Award/Scholarship
            </button>
          </div>
        )}
      </div>

      {/* Standardized Tests */}
      <div className={styles.section}>
        <SectionHeader title="Standardized Tests" sectionName="standardizedTests" />
        {openSection === "standardizedTests" && (
          <div className={styles.sectionContent}>
            {data.standardizedTests?.map((test) => (
              <div key={test.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{test.testName || "New Test"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("standardizedTests", test.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Test Name (e.g. GRE, TOEFL, IELTS)"
                  value={test.testName}
                  onChange={(e) => updateSectionItem("standardizedTests", test.id, "testName", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Score"
                  value={test.score}
                  onChange={(e) => updateSectionItem("standardizedTests", test.id, "score", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Date"
                  value={test.date}
                  onChange={(e) => updateSectionItem("standardizedTests", test.id, "date", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Breakdown (e.g. Q: 168, V: 162)"
                  value={test.breakdown}
                  onChange={(e) => updateSectionItem("standardizedTests", test.id, "breakdown", e.target.value)}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("standardizedTests", {
                  id: `test_${Date.now()}`,
                  testName: "",
                  score: "",
                  date: "",
                  breakdown: "",
                })
              }
            >
              <Plus size={16} /> Add Standardized Test
            </button>
          </div>
        )}
      </div>

      {/* Certifications & Training */}
      <div className={styles.section}>
        <SectionHeader title="Certifications & Training" sectionName="certificationsTraining" />
        {openSection === "certificationsTraining" && (
          <div className={styles.sectionContent}>
            {data.certificationsTraining?.map((cert) => (
              <div key={cert.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{cert.title || "New Certification"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("certificationsTraining", cert.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Title"
                  value={cert.title}
                  onChange={(e) => updateSectionItem("certificationsTraining", cert.id, "title", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Organization"
                  value={cert.organization}
                  onChange={(e) => updateSectionItem("certificationsTraining", cert.id, "organization", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Date"
                  value={cert.date}
                  onChange={(e) => updateSectionItem("certificationsTraining", cert.id, "date", e.target.value)}
                />
                <textarea
                  className={styles.inputField}
                  placeholder="Description"
                  value={cert.description}
                  onChange={(e) => updateSectionItem("certificationsTraining", cert.id, "description", e.target.value)}
                  rows={2}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("certificationsTraining", {
                  id: `cert_${Date.now()}`,
                  title: "",
                  organization: "",
                  date: "",
                  description: "",
                })
              }
            >
              <Plus size={16} /> Add Certification/Training
            </button>
          </div>
        )}
      </div>

      {/* Activities */}
      <div className={styles.section}>
        <SectionHeader title="Extracurricular Activities" sectionName="activities" />
        {openSection === "activities" && (
          <div className={styles.sectionContent}>
            {data.activities.map((act) => (
              <div key={act.id} className={styles.itemCard}>
                <div className={styles.cardHeader}>
                  <h4>{act.organization || "New Activity"}</h4>
                  <button className={styles.deleteBtn} onClick={() => removeSectionItem("activities", act.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  className={styles.inputField}
                  placeholder="Organization"
                  value={act.organization}
                  onChange={(e) => updateSectionItem("activities", act.id, "organization", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Location (City, Country)"
                  value={act.location}
                  onChange={(e) => updateSectionItem("activities", act.id, "location", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Role"
                  value={act.role}
                  onChange={(e) => updateSectionItem("activities", act.id, "role", e.target.value)}
                />
                <input
                  className={styles.inputField}
                  placeholder="Date"
                  value={act.date}
                  onChange={(e) => updateSectionItem("activities", act.id, "date", e.target.value)}
                />
                <textarea
                  className={styles.inputField}
                  placeholder="Bullets (one per line)"
                  value={act.bullets.join("\n")}
                  onChange={(e) => updateSectionItem("activities", act.id, "bullets", e.target.value.split("\n"))}
                  rows={4}
                />
              </div>
            ))}
            <button
              className={styles.addBtn}
              onClick={() =>
                addSectionItem("activities", {
                  id: `act_${Date.now()}`,
                  organization: "",
                  location: "",
                  role: "",
                  date: "",
                  bullets: [""],
                })
              }
            >
              <Plus size={16} /> Add Activity
            </button>
          </div>
        )}
      </div>

      {/* Additional */}
      <div className={styles.section}>
        <SectionHeader title="Additional Skills & Sections" sectionName="additional" />
        {openSection === "additional" && (
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Technical Skills</label>
              <input
                className={styles.inputField}
                value={data.additional.technicalSkills}
                onChange={(e) => updateData("additional", { ...data.additional, technicalSkills: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Programming Skills</label>
              <input
                className={styles.inputField}
                value={data.additional.programmingSkills}
                onChange={(e) => updateData("additional", { ...data.additional, programmingSkills: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Laboratory Skills</label>
              <input
                className={styles.inputField}
                value={data.additional.laboratorySkills}
                onChange={(e) => updateData("additional", { ...data.additional, laboratorySkills: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Languages</label>
              <input
                className={styles.inputField}
                value={data.additional.languages}
                onChange={(e) => updateData("additional", { ...data.additional, languages: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Professional Memberships</label>
              <input
                className={styles.inputField}
                value={data.additional.professionalMemberships}
                onChange={(e) => updateData("additional", { ...data.additional, professionalMemberships: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Peer Review Activities</label>
              <input
                className={styles.inputField}
                value={data.additional.peerReviewActivities}
                onChange={(e) => updateData("additional", { ...data.additional, peerReviewActivities: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Certifications (Backup Field)</label>
              <input
                className={styles.inputField}
                value={data.additional.certifications}
                onChange={(e) => updateData("additional", { ...data.additional, certifications: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Awards (Backup Field)</label>
              <input
                className={styles.inputField}
                value={data.additional.awards}
                onChange={(e) => updateData("additional", { ...data.additional, awards: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Additional Academic Strength</label>
              <textarea
                className={styles.inputField}
                rows={3}
                value={data.additional.additionalAcademicStrength}
                onChange={(e) => updateData("additional", { ...data.additional, additionalAcademicStrength: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Removed Content & Justification (Filtering) */}
      <div className={styles.section}>
        <SectionHeader title="Removed Content & Justification (Internal)" sectionName="removedJustification" />
        {openSection === "removedJustification" && (
          <div className={styles.sectionContent}>
            <div className={styles.formGroup}>
              <label>Overall Filtering Summary</label>
              <textarea
                className={styles.inputField}
                rows={3}
                value={data.removedContentJustification?.overallFilteringSummary || ""}
                onChange={(e) =>
                  updateData("removedContentJustification", {
                    ...data.removedContentJustification,
                    overallFilteringSummary: e.target.value,
                  })
                }
              />
            </div>
            {/* We can list removed items as text areas where they can enter/view the filtering logs */}
            <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
              These justifications are for audit purposes and will not render directly on the academic CV template.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
