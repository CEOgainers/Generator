"use client";

import React, { forwardRef } from "react";
import { useResume } from "../app/context/ResumeContext";
import styles from "./ResumeTemplate.module.css";

const ResumeTemplate = forwardRef<HTMLDivElement>((props, ref) => {
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
    customSections,
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
                        <span className={styles.itemTitle}>{edu.institution}</span>
                        <span className={styles.itemDate}>{edu.location}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>
                          {edu.degree} {edu.major ? `in ${edu.major}` : ""}
                        </span>
                        <span>{edu.date}</span>
                      </div>
                      {edu.gpa && (
                        <p className={styles.paragraph}>
                          <span className={styles.bold}>GPA:</span> {edu.gpa}
                          {edu.ranking && ` (${edu.ranking})`}
                        </p>
                      )}
                      {edu.thesis && (
                        <p className={styles.paragraph}>
                          <span className={styles.bold}>Thesis:</span> "{edu.thesis}"
                          {edu.advisor && ` (Advisor: ${edu.advisor})`}
                        </p>
                      )}
                      {edu.coursework && (
                        <p className={styles.paragraph}>
                          <span className={styles.bold}>Relevant Coursework:</span> {edu.coursework}
                        </p>
                      )}
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
                        <span className={styles.itemTitle}>{rex.institution}</span>
                        <span className={styles.itemDate}>{rex.location}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>
                          {rex.role}
                          {rex.supervisor && ` (Supervisor: ${rex.supervisor})`}
                        </span>
                        <span>{rex.date}</span>
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
                  <h2 className={styles.sectionTitle}>Selected Publications</h2>
                  {selectedPublications.map((pub) => (
                    <div key={pub.id} className={styles.item} style={{ marginBottom: "6px" }}>
                      <p className={styles.paragraph}>
                        {pub.authors}. ({pub.date}).{" "}
                        {pub.link ? (
                          <a href={pub.link} className={styles.publicationLink} target="_blank" rel="noreferrer">
                            "{pub.title}"
                          </a>
                        ) : (
                          `"${pub.title}"`
                        )}
                        {". "}
                        <span style={{ fontStyle: "italic" }}>{pub.journal}</span>
                        {pub.publisher && `, ${pub.publisher}`}
                        {pub.quartile && ` (${pub.quartile})`}
                        {pub.status && ` - [${pub.status}]`}
                        {pub.doi && ` (DOI: ${pub.doi})`}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Projects */}
              {selectedProjects && selectedProjects.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Selected Projects</h2>
                  {selectedProjects.map((proj) => (
                    <div key={proj.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>
                          {proj.name}
                          {proj.fundingOrGrant && ` [Funding: ${proj.fundingOrGrant}]`}
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

              {/* Experience (Work) */}
              {experience && experience.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Professional Experience</h2>
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

              {/* Honors, Awards & Scholarships */}
              {honorsAwardsScholarships && honorsAwardsScholarships.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Honors, Awards & Scholarships</h2>
                  {honorsAwardsScholarships.map((award) => (
                    <div key={award.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{award.title}</span>
                        <span className={styles.itemDate}>{award.date}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{award.organization}</span>
                      </div>
                      {award.description && <p className={styles.paragraph}>{award.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Standardized Tests */}
              {standardizedTests && standardizedTests.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Standardized Tests</h2>
                  {standardizedTests.map((test) => (
                    <div key={test.id} className={styles.item} style={{ marginBottom: "6px" }}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>
                          {test.testName}: <span style={{ fontWeight: "normal" }}>{test.score}</span>
                        </span>
                        <span className={styles.itemDate}>{test.date}</span>
                      </div>
                      {test.breakdown && <p className={styles.paragraph} style={{ fontStyle: "italic" }}>{test.breakdown}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Certifications & Training */}
              {certificationsTraining && certificationsTraining.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Certifications & Training</h2>
                  {certificationsTraining.map((cert) => (
                    <div key={cert.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{cert.title}</span>
                        <span className={styles.itemDate}>{cert.date}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{cert.organization}</span>
                      </div>
                      {cert.description && <p className={styles.paragraph}>{cert.description}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Activities */}
              {activities && activities.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Extracurricular & Leadership Activities</h2>
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

              {/* Additional Info */}
              {(additional.technicalSkills ||
                additional.programmingSkills ||
                additional.laboratorySkills ||
                additional.languages ||
                additional.professionalMemberships ||
                additional.peerReviewActivities ||
                additional.additionalAcademicStrength) && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Additional Information</h2>
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
                  {additional.laboratorySkills && (
                    <p className={styles.additionalText}>
                      <span className={styles.bold}>Laboratory Skills:</span> {additional.laboratorySkills}
                    </p>
                  )}
                  {additional.languages && (
                    <p className={styles.additionalText}>
                      <span className={styles.bold}>Languages:</span> {additional.languages}
                    </p>
                  )}
                  {additional.professionalMemberships && (
                    <p className={styles.additionalText}>
                      <span className={styles.bold}>Professional Memberships:</span> {additional.professionalMemberships}
                    </p>
                  )}
                  {additional.peerReviewActivities && (
                    <p className={styles.additionalText}>
                      <span className={styles.bold}>Peer Review Activities:</span> {additional.peerReviewActivities}
                    </p>
                  )}
                  {additional.additionalAcademicStrength && (
                    <p className={styles.additionalText}>
                      <span className={styles.bold}>Academic Strength:</span> {additional.additionalAcademicStrength}
                    </p>
                  )}
                </div>
              )}

              {/* Dynamic Custom Sections */}
              {customSections && customSections.length > 0 && (
                <>
                  {customSections.map((sec) => (
                    <div key={sec.id} className={styles.section}>
                      <h2 className={styles.sectionTitle}>{sec.sectionTitle}</h2>
                      {sec.items && sec.items.length > 0 ? (
                        sec.items.map((item) => (
                          <div key={item.id} className={styles.item}>
                            {(item.title || item.date) && (
                              <div className={styles.itemHeader}>
                                {item.title && <span className={styles.itemTitle}>{item.title}</span>}
                                {item.date && <span className={styles.itemDate}>{item.date}</span>}
                              </div>
                            )}
                            {(item.subtitle || item.location) && (
                              <div className={styles.itemSubheader}>
                                {item.subtitle && <span>{item.subtitle}</span>}
                                {item.location && <span>{item.location}</span>}
                              </div>
                            )}
                            {item.description && (
                              <p className={styles.paragraph}>{item.description}</p>
                            )}
                            {item.bullets && item.bullets.length > 0 && (
                              <ul className={styles.bullets}>
                                {item.bullets.map((b, idx) =>
                                  b.trim() ? (
                                    <li key={idx} className={styles.bullet}>
                                      {b}
                                    </li>
                                  ) : null
                                )}
                              </ul>
                            )}
                          </div>
                        ))
                      ) : null}
                    </div>
                  ))}
                </>
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

ResumeTemplate.displayName = "ResumeTemplate";

export default ResumeTemplate;
