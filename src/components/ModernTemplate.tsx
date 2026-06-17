"use client";

import React, { forwardRef } from "react";
import { useResume } from "../app/context/ResumeContext";
import styles from "./ModernTemplate.module.css";

const ModernTemplate = forwardRef<HTMLDivElement>((props, ref) => {
  const { data } = useResume();
  const {
    personalInfo,
    education,
    researchExperience,
    experience,
    selectedPublications,
    selectedProjects,
    honorsAwardsScholarships,
    standardizedTests,
    certificationsTraining,
    activities,
    additional,
  } = data;

  const displayName = personalInfo.fullName || `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className={styles.resumePage} ref={ref}>
      <table className={styles.printTable}>
        <thead>
          <tr>
            <td>
              <div className={styles.printSpaceTop}></div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {/* Header */}
              <div className={styles.header}>
                <h1 className={styles.name}>{displayName}</h1>
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
                  {personalInfo.orcid && (
                    <>
                      {" | "}
                      <a
                        href={personalInfo.orcid.startsWith("http") ? personalInfo.orcid : `https://orcid.org/${personalInfo.orcid}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ORCID: {personalInfo.orcid}
                      </a>
                    </>
                  )}
                  {personalInfo.googleScholar && (
                    <>
                      {" | "}
                      <a
                        href={personalInfo.googleScholar.startsWith("http") ? personalInfo.googleScholar : `https://${personalInfo.googleScholar}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Google Scholar
                      </a>
                    </>
                  )}
                  {personalInfo.researchGate && (
                    <>
                      {" | "}
                      <a
                        href={personalInfo.researchGate.startsWith("http") ? personalInfo.researchGate : `https://${personalInfo.researchGate}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ResearchGate
                      </a>
                    </>
                  )}
                </p>
              </div>

              {/* About Me summary (optional) */}
              {personalInfo.aboutMe && (
                <div className={styles.section}>
                  <p className={styles.paragraph} style={{ fontStyle: "italic", textAlign: "justify" }}>
                    {personalInfo.aboutMe}
                  </p>
                </div>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Education</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{edu.degree} {edu.major ? `in ${edu.major}` : ""}</span>
                        <span className={styles.itemDate}>{edu.date}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{edu.institution}</span>
                        <span>{edu.location}</span>
                      </div>
                      <ul className={styles.bullets}>
                        {edu.gpa && (
                          <li className={styles.bullet}>
                            <span className={styles.bold}>Academic Standing:</span> GPA: {edu.gpa} {edu.ranking && `(${edu.ranking})`}.
                          </li>
                        )}
                        {edu.thesis && (
                          <li className={styles.bullet}>
                            <span className={styles.bold}>Thesis:</span> "{edu.thesis}"{edu.advisor && ` (Advisor: ${edu.advisor})`}.
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

              {/* Research Experience */}
              {researchExperience && researchExperience.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Research Experience</h2>
                  {researchExperience.map((rex) => (
                    <div key={rex.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{rex.role}</span>
                        <span className={styles.itemDate}>{rex.date}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{rex.institution}{rex.supervisor && ` (Supervisor: ${rex.supervisor})`}</span>
                        <span>{rex.location}</span>
                      </div>
                      <ul className={styles.bullets}>
                        {rex.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {bullet}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Publications */}
              {selectedPublications && selectedPublications.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Research Publications</h2>
                  <ul className={styles.bullets}>
                    {selectedPublications.map((pub) => (
                      <li key={pub.id} className={styles.bullet} style={{ marginBottom: "8px" }}>
                        {pub.link ? (
                          <a href={pub.link} className={styles.publicationLink} target="_blank" rel="noreferrer">
                            "{pub.title}"
                          </a>
                        ) : (
                          <span className={styles.bold}>"{pub.title}"</span>
                        )}{" "}
                        ({pub.date}).
                        <br />
                        <span style={{ fontStyle: "italic" }}>Authors:</span> {pub.authors}.
                        <br />
                        <span style={{ fontStyle: "italic" }}>Journal:</span> {pub.journal}
                        {pub.publisher && `, Published by ${pub.publisher}`}
                        {pub.quartile && ` [${pub.quartile}]`}
                        {pub.status && ` (${pub.status})`}
                        {pub.doi && ` | DOI: ${pub.doi}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Selected Projects */}
              {selectedProjects && selectedProjects.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Research & Academic Projects</h2>
                  {selectedProjects.map((proj) => (
                    <div key={proj.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>
                          {proj.name}
                          {proj.fundingOrGrant && ` (Funding: ${proj.fundingOrGrant})`}
                        </span>
                        <span className={styles.itemDate}>{proj.date}</span>
                      </div>
                      {proj.supervisor && (
                        <div className={styles.itemSubheader}>
                          <span>Supervisor: {proj.supervisor}</span>
                        </div>
                      )}
                      <ul className={styles.bullets}>
                        {proj.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {bullet}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Professional Experience */}
              {experience && experience.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Professional Experience</h2>
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
                      <ul className={styles.bullets}>
                        {exp.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {bullet}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Honors & Awards */}
              {honorsAwardsScholarships && honorsAwardsScholarships.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Honors, Awards & Scholarships</h2>
                  <ul className={styles.bullets}>
                    {honorsAwardsScholarships.map((award) => (
                      <li key={award.id} className={styles.bullet} style={{ marginBottom: "6px" }}>
                        <span className={styles.bold}>{award.title}</span> - {award.organization} ({award.date})
                        {award.description && <span style={{ display: "block", fontSize: "14px", color: "#444" }}>{award.description}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Standardized Tests */}
              {standardizedTests && standardizedTests.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Standardized Tests</h2>
                  <ul className={styles.bullets}>
                    {standardizedTests.map((test) => (
                      <li key={test.id} className={styles.bullet}>
                        <span className={styles.bold}>{test.testName}:</span> {test.score} ({test.date})
                        {test.breakdown && <span style={{ fontStyle: "italic", marginLeft: "8px" }}>[{test.breakdown}]</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications & Training */}
              {certificationsTraining && certificationsTraining.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Certifications & Training</h2>
                  <ul className={styles.bullets}>
                    {certificationsTraining.map((cert) => (
                      <li key={cert.id} className={styles.bullet} style={{ marginBottom: "6px" }}>
                        <span className={styles.bold}>{cert.title}</span> - {cert.organization} ({cert.date})
                        {cert.description && <span style={{ display: "block", fontSize: "14px", color: "#444" }}>{cert.description}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Activities */}
              {activities && activities.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Extracurricular & Leadership Activities</h2>
                  {activities.map((act) => (
                    <div key={act.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{act.role}</span>
                        <span className={styles.itemDate}>{act.date}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{act.organization}</span>
                        <span>{act.location}</span>
                      </div>
                      <ul className={styles.bullets}>
                        {act.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {bullet}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Technical Skills */}
              {(additional.technicalSkills ||
                additional.programmingSkills ||
                additional.laboratorySkills ||
                additional.languages ||
                additional.professionalMemberships ||
                additional.peerReviewActivities ||
                additional.additionalAcademicStrength) && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Skills & Additional Information</h2>
                  <ul className={styles.bullets}>
                    {additional.technicalSkills && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Technical Skills:</span> {additional.technicalSkills}
                      </li>
                    )}
                    {additional.programmingSkills && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Programming Skills:</span> {additional.programmingSkills}
                      </li>
                    )}
                    {additional.laboratorySkills && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Laboratory Skills:</span> {additional.laboratorySkills}
                      </li>
                    )}
                    {additional.languages && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Languages:</span> {additional.languages}
                      </li>
                    )}
                    {additional.professionalMemberships && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Professional Memberships:</span> {additional.professionalMemberships}
                      </li>
                    )}
                    {additional.peerReviewActivities && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Peer Review Activities:</span> {additional.peerReviewActivities}
                      </li>
                    )}
                    {additional.additionalAcademicStrength && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Academic Strength:</span> {additional.additionalAcademicStrength}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div className={styles.printSpaceBottom}></div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
});

ModernTemplate.displayName = "ModernTemplate";

export default ModernTemplate;
