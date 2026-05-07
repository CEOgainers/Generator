"use client";

import React, { forwardRef } from "react";
import { useResume } from "../app/context/ResumeContext";
import styles from "./ResumeTemplate.module.css";

const ResumeTemplate = forwardRef<HTMLDivElement>((props, ref) => {
  const { data } = useResume();
  const { personalInfo, education, experience, projects, activities, publications, additional } = data;

  return (
    <div className={styles.resumePage} ref={ref}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{personalInfo.firstName} {personalInfo.lastName}</h1>
        <p className={styles.contactInfo}>
          {personalInfo.location}
          {personalInfo.phone && ` | ${personalInfo.phone}`}
          {personalInfo.email && ` | ${personalInfo.email}`}
          {personalInfo.linkedin && (
            <>
              {" | "}
              <a
                href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              {" | "}
              <a
                href={personalInfo.portfolio.startsWith("http") ? personalInfo.portfolio : `https://${personalInfo.portfolio}`}
                target="_blank"
                rel="noreferrer"
              >
                Portfolio
              </a>
            </>
          )}
        </p>
      </div>

      {/* Education */}
      {education.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{edu.institution}</span>
                <span className={styles.itemDate}>{edu.location}</span>
              </div>
              <div className={styles.itemSubheader}>
                <span>{edu.degree}</span>
                <span>{edu.date}</span>
              </div>
              {edu.gpa && <p className={styles.paragraph}>GPA: {edu.gpa}</p>}
              {edu.coursework && (
                <p className={styles.paragraph}>
                  <span className={styles.bold}>Relevant Coursework:</span> {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{exp.company}</span>
                <span className={styles.itemDate}>{exp.location}</span>
              </div>
              <div className={styles.itemSubheader}>
                <span>{exp.title}</span>
                <span>{exp.date}</span>
              </div>
              <ul className={styles.bullets}>
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>University Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{proj.name}</span>
                <span className={styles.itemDate}>{proj.date}</span>
              </div>
              <ul className={styles.bullets}>
                {proj.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Activities */}
      {activities.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Activities</h2>
          {activities.map((act) => (
            <div key={act.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.itemTitle}>{act.organization}</span>
                <span className={styles.itemDate}>{act.location}</span>
              </div>
              <div className={styles.itemSubheader}>
                <span>{act.role}</span>
                <span>{act.date}</span>
              </div>
              <ul className={styles.bullets}>
                {act.bullets.map((bullet, idx) => (
                  <li key={idx} className={styles.bullet}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Publications</h2>
          {publications.map((pub) => (
            <div key={pub.id} className={styles.item}>
              <p className={styles.paragraph}>
                {pub.authors}. ({pub.date}).{" "}
                {pub.link ? (
                  <a href={pub.link} className={styles.publicationLink} target="_blank" rel="noreferrer">
                    "{pub.title}"
                  </a>
                ) : (
                  `"${pub.title}"`
                )}{" "}
                <span style={{ fontStyle: "italic" }}>{pub.journal}</span>.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Additional */}
      {(additional.technicalSkills || additional.programmingSkills || additional.languages || additional.certifications || additional.awards) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Additional</h2>
          {additional.technicalSkills && (
            <p className={styles.additionalText}>
              <span className={styles.bold}>Technical Skills:</span> {additional.technicalSkills}
            </p>
          )}
          {additional.programmingSkills && (
            <p className={styles.additionalText}>
              <span className={styles.bold}>Programming Skills:</span> {additional.programmingSkills}
            </p>
          )}
          {additional.languages && (
            <p className={styles.additionalText}>
              <span className={styles.bold}>Languages:</span> {additional.languages}
            </p>
          )}
          {additional.certifications && (
            <p className={styles.additionalText}>
              <span className={styles.bold}>Certifications & Training:</span> {additional.certifications}
            </p>
          )}
          {additional.awards && (
            <p className={styles.additionalText}>
              <span className={styles.bold}>Awards:</span> {additional.awards}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
