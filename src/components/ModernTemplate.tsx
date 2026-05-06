"use client";

import React, { forwardRef } from "react";
import { useResume } from "../app/context/ResumeContext";
import styles from "./ModernTemplate.module.css";

const ModernTemplate = forwardRef<HTMLDivElement>((props, ref) => {
  const { data } = useResume();
  const { personalInfo, education, experience, projects, publications, additional } = data;

  return (
    <div className={styles.resumePage} ref={ref}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className={styles.contactInfo}>
          {personalInfo.location} | {personalInfo.phone} | {personalInfo.email} |{" "}
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer">
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="#" target="_blank" rel="noreferrer">
            Portfolio
          </a>
        </p>
      </div>

      {/* Education */}
      {education.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education and Training</h2>
          {education.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{edu.degree}</span>
                <span className={styles.itemDate}>{edu.date}</span>
              </div>
              <div className={styles.itemSubheader}>
                <span>{edu.institution}</span>
                <span>{edu.location}</span>
              </div>
              <ul className={styles.bullets}>
                {edu.gpa && (
                  <li className={styles.bullet}>
                    <span className={styles.bold}>Academic Excellence:</span> GPA of {edu.gpa}.
                  </li>
                )}
                {edu.coursework && (
                  <li className={styles.bullet}>
                    <span className={styles.bold}>Relevant Coursework:</span> {edu.coursework}.
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Research Publications</h2>
          <ul className={styles.bullets}>
            {publications.map((pub) => (
              <li key={pub.id} className={styles.bullet} style={{ marginBottom: "8px" }}>
                {pub.link ? (
                  <a href={pub.link} className={styles.publicationLink} target="_blank" rel="noreferrer">
                    {pub.title}
                  </a>
                ) : (
                  <span className={styles.bold}>{pub.title}</span>
                )}{" "}
                ({pub.date}).
                <br />
                <span style={{ fontStyle: "italic" }}>Authors:</span> {pub.authors}.
                <br />
                <span style={{ fontStyle: "italic" }}>Published in/Submitted to:</span> {pub.journal}.
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{exp.title}</span>
                <span className={styles.itemDate}>{exp.date}</span>
              </div>
              <div className={styles.itemSubheader}>
                <span className={styles.bold}>{exp.company}</span>
                <span className={styles.bold}>{exp.location}</span>
              </div>
              <p className={styles.paragraph}>{exp.bullets.join(" ")}</p>
            </div>
          ))}
        </div>
      )}

      {/* Accomplishments (mapped from Awards) */}
      {additional.awards && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Accomplishments</h2>
          <ul className={styles.bullets}>
            {additional.awards.split('\n').filter(Boolean).map((award, idx) => (
              <li key={idx} className={styles.bullet}>{award}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Notable Projects */}
      {projects.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Notable Projects</h2>
          <ul className={styles.bullets}>
            {projects.map((proj) => (
              <li key={proj.id} className={styles.bullet}>
                <span className={styles.bold}>{proj.name}:</span> {proj.bullets.join(" ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional Skills */}
      {(additional.technicalSkills || additional.programmingSkills) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Technical Skills</h2>
          <ul className={styles.bullets}>
            {additional.technicalSkills && <li className={styles.bullet}>{additional.technicalSkills}</li>}
            {additional.programmingSkills && <li className={styles.bullet}>{additional.programmingSkills}</li>}
          </ul>
        </div>
      )}
    </div>
  );
});

ModernTemplate.displayName = "ModernTemplate";

export default ModernTemplate;
