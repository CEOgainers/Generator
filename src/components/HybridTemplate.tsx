"use client";

import React, { forwardRef } from "react";
import { useResume } from "../app/context/ResumeContext";
import { formatText } from "../lib/formatText";
import styles from "./HybridTemplate.module.css";

const HybridTemplate = forwardRef<HTMLDivElement>((props, ref) => {
  const { data } = useResume();
  const {
    personalInfo,
    resumeStrategy,
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
    hiddenSections = [],
    themeColor = "navy",
    fontFamily = "calibri",
  } = data;

  const displayName = personalInfo.fullName || `${personalInfo.firstName} ${personalInfo.lastName}`;

  // Theme Class Mapping
  const themeClassMap: Record<string, string> = {
    navy: styles.themeNavy,
    slate: styles.themeSlate,
    emerald: styles.themeEmerald,
    burgundy: styles.themeBurgundy,
    classic: styles.themeClassic,
  };

  const fontClassMap: Record<string, string> = {
    calibri: styles.fontCalibri,
    arial: styles.fontArial,
    times: styles.fontTimes,
    georgia: styles.fontGeorgia,
  };

  const currentThemeClass = themeClassMap[themeColor] || styles.themeNavy;
  const currentFontClass = fontClassMap[fontFamily] || styles.fontCalibri;

  const isVisible = (key: string) => !hiddenSections.includes(key);

  return (
    <div className={`${styles.resumePage} ${currentThemeClass} ${currentFontClass}`} ref={ref}>
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
                <h1 className={styles.name}>{formatText(displayName)}</h1>
                <p className={styles.contactInfo}>
                  {formatText(personalInfo.location)}
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

              {/* Executive Summary / About Me */}
              {isVisible("aboutMe") && personalInfo.aboutMe && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Executive Profile</h2>
                  <p className={styles.paragraph} style={{ textAlign: "justify" }}>
                    {formatText(personalInfo.aboutMe)}
                  </p>
                </div>
              )}

              {/* Research Interests & Focus Areas */}
              {isVisible("researchFocus") && ((resumeStrategy?.researchFocus && resumeStrategy.researchFocus.length > 0) || resumeStrategy?.careerGoals) && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Research Interests & Focus Areas</h2>
                  {resumeStrategy.researchFocus && resumeStrategy.researchFocus.length > 0 && (
                    <p className={styles.paragraph}>
                      <span className={styles.bold}>Primary Fields of Interest: </span>
                      {formatText(resumeStrategy.researchFocus.join(" • "))}
                    </p>
                  )}
                  {resumeStrategy.careerGoals && (
                    <p className={styles.paragraph} style={{ fontStyle: "italic", color: "#334155" }}>
                      <span className={styles.bold} style={{ fontStyle: "normal" }}>Academic & Research Trajectory: </span>
                      {formatText(resumeStrategy.careerGoals)}
                    </p>
                  )}
                </div>
              )}

              {/* Core Competencies & Skills */}
              {isVisible("skills") && (additional.technicalSkills ||
                additional.programmingSkills ||
                additional.laboratorySkills ||
                additional.languages ||
                additional.professionalMemberships ||
                additional.peerReviewActivities ||
                additional.additionalAcademicStrength) && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Core Competencies & Skills</h2>
                  <ul className={styles.bullets}>
                    {additional.technicalSkills && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Technical Skills:</span> {formatText(additional.technicalSkills)}
                      </li>
                    )}
                    {additional.programmingSkills && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Programming Skills:</span> {formatText(additional.programmingSkills)}
                      </li>
                    )}
                    {additional.laboratorySkills && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Laboratory & R&D Skills:</span> {formatText(additional.laboratorySkills)}
                      </li>
                    )}
                    {additional.languages && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Languages:</span> {formatText(additional.languages)}
                      </li>
                    )}
                    {additional.professionalMemberships && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Professional Memberships:</span> {formatText(additional.professionalMemberships)}
                      </li>
                    )}
                    {additional.peerReviewActivities && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Peer Review & Advisory:</span> {formatText(additional.peerReviewActivities)}
                      </li>
                    )}
                    {additional.additionalAcademicStrength && (
                      <li className={styles.bullet}>
                        <span className={styles.bold}>Academic & Domain Strengths:</span> {formatText(additional.additionalAcademicStrength)}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Professional Experience */}
              {isVisible("experience") && experience && experience.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Professional Experience</h2>
                  {experience.map((exp) => (
                    <div key={exp.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{formatText(exp.title)}</span>
                        <span className={styles.itemDate}>{formatText(exp.date)}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span className={styles.bold}>{formatText(exp.company)}</span>
                        <span>{formatText(exp.location)}</span>
                      </div>
                      <ul className={styles.bullets}>
                        {exp.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {formatText(bullet)}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Academic Background & Education */}
              {isVisible("education") && education && education.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Education & Credentials</h2>
                  {education.map((edu) => (
                    <div key={edu.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{formatText(edu.degree)} {edu.major ? `in ${edu.major}` : ""}</span>
                        <span className={styles.itemDate}>{formatText(edu.date)}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{formatText(edu.institution)}</span>
                        <span>{formatText(edu.location)}</span>
                      </div>
                      <ul className={styles.bullets}>
                        {edu.gpa && (
                          <li className={styles.bullet}>
                            <span className={styles.bold}>GPA/Ranking:</span> {formatText(edu.gpa)} {edu.ranking && `(${edu.ranking})`}
                          </li>
                        )}
                        {edu.thesis && (
                          <li className={styles.bullet}>
                            <span className={styles.bold}>Thesis:</span> "{formatText(edu.thesis)}"{edu.advisor && ` (Advisor: ${edu.advisor})`}
                          </li>
                        )}
                        {edu.coursework && (
                          <li className={styles.bullet}>
                            <span className={styles.bold}>Key Coursework:</span> {formatText(edu.coursework)}
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Research Experience */}
              {isVisible("researchExperience") && researchExperience && researchExperience.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Research Experience</h2>
                  {researchExperience.map((rex) => (
                    <div key={rex.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{formatText(rex.role)}</span>
                        <span className={styles.itemDate}>{formatText(rex.date)}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{formatText(rex.institution)}{rex.supervisor && ` (Supervisor: ${rex.supervisor})`}</span>
                        <span>{formatText(rex.location)}</span>
                      </div>
                      <ul className={styles.bullets}>
                        {rex.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {formatText(bullet)}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Publications */}
              {isVisible("selectedPublications") && selectedPublications && selectedPublications.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Publications & Scholarly Works</h2>
                  <ul className={styles.bullets}>
                    {selectedPublications.map((pub) => (
                      <li key={pub.id} className={styles.bullet} style={{ marginBottom: "6px" }}>
                        {pub.link ? (
                          <a href={pub.link} className={styles.publicationLink} target="_blank" rel="noreferrer">
                            "{formatText(pub.title)}"
                          </a>
                        ) : (
                          <span className={styles.bold}>"{formatText(pub.title)}"</span>
                        )}{" "}
                        ({pub.date}).
                        <br />
                        <span style={{ fontStyle: "italic" }}>Authors:</span> {formatText(pub.authors)}.
                        <br />
                        <span style={{ fontStyle: "italic" }}>Venue:</span> {formatText(pub.journal)}
                        {pub.publisher && `, ${pub.publisher}`}
                        {pub.quartile && ` [${pub.quartile}]`}
                        {pub.status && ` (${pub.status})`}
                        {pub.doi && ` | DOI: ${pub.doi}`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Selected Projects */}
              {isVisible("selectedProjects") && selectedProjects && selectedProjects.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Key R&D & Academic Projects</h2>
                  {selectedProjects.map((proj) => (
                    <div key={proj.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>
                          {formatText(proj.name)}
                          {proj.fundingOrGrant && ` (Funding: ${proj.fundingOrGrant})`}
                        </span>
                        <span className={styles.itemDate}>{formatText(proj.date)}</span>
                      </div>
                      {proj.supervisor && (
                        <div className={styles.itemSubheader}>
                          <span>Supervisor: {formatText(proj.supervisor)}</span>
                        </div>
                      )}
                      <ul className={styles.bullets}>
                        {proj.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {formatText(bullet)}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Honors, Awards & Scholarships */}
              {isVisible("honorsAwardsScholarships") && honorsAwardsScholarships && honorsAwardsScholarships.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Honors, Awards & Grants</h2>
                  <ul className={styles.bullets}>
                    {honorsAwardsScholarships.map((award) => (
                      <li key={award.id} className={styles.bullet} style={{ marginBottom: "6px" }}>
                        <span className={styles.bold}>{formatText(award.title)}</span> - {formatText(award.organization)} ({award.date})
                        {award.description && <span style={{ display: "block", fontSize: "13.5px", color: "#475569" }}>{formatText(award.description)}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Standardized Tests */}
              {isVisible("standardizedTests") && standardizedTests && standardizedTests.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Standardized Tests</h2>
                  <ul className={styles.bullets}>
                    {standardizedTests.map((test) => (
                      <li key={test.id} className={styles.bullet}>
                        <span className={styles.bold}>{formatText(test.testName)}:</span> {formatText(test.score)} ({test.date})
                        {test.breakdown && <span style={{ fontStyle: "italic", marginLeft: "8px" }}>[{formatText(test.breakdown)}]</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Certifications & Training */}
              {isVisible("certificationsTraining") && certificationsTraining && certificationsTraining.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Certifications & Training</h2>
                  <ul className={styles.bullets}>
                    {certificationsTraining.map((cert) => (
                      <li key={cert.id} className={styles.bullet} style={{ marginBottom: "6px" }}>
                        <span className={styles.bold}>{formatText(cert.title)}</span> - {formatText(cert.organization)} ({cert.date})
                        {cert.description && <span style={{ display: "block", fontSize: "13.5px", color: "#475569" }}>{formatText(cert.description)}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Extracurricular & Leadership */}
              {isVisible("activities") && activities && activities.length > 0 && (
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Leadership & Extracurriculars</h2>
                  {activities.map((act) => (
                    <div key={act.id} className={styles.item}>
                      <div className={styles.itemHeader}>
                        <span className={styles.itemTitle}>{formatText(act.role)}</span>
                        <span className={styles.itemDate}>{formatText(act.date)}</span>
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{formatText(act.organization)}</span>
                        <span>{formatText(act.location)}</span>
                      </div>
                      <ul className={styles.bullets}>
                        {act.bullets.map((bullet, idx) =>
                          bullet.trim() ? (
                            <li key={idx} className={styles.bullet}>
                              {formatText(bullet)}
                            </li>
                          ) : null
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Dynamic Custom Sections */}
              {isVisible("customSections") && customSections && customSections.length > 0 && (
                <>
                  {customSections.map((sec) => (
                    <div key={sec.id} className={styles.section}>
                      <h2 className={styles.sectionTitle}>{formatText(sec.sectionTitle)}</h2>
                      {sec.items && sec.items.length > 0 ? (
                        sec.items.map((item) => (
                          <div key={item.id} className={styles.item}>
                            {(item.title || item.date) && (
                              <div className={styles.itemHeader}>
                                {item.title && <span className={styles.itemTitle}>{formatText(item.title)}</span>}
                                {item.date && <span className={styles.itemDate}>{formatText(item.date)}</span>}
                              </div>
                            )}
                            {(item.subtitle || item.location) && (
                              <div className={styles.itemSubheader}>
                                {item.subtitle && <span>{formatText(item.subtitle)}</span>}
                                {item.location && <span>{formatText(item.location)}</span>}
                              </div>
                            )}
                            {item.description && (
                              <p className={styles.paragraph}>{formatText(item.description)}</p>
                            )}
                            {item.bullets && item.bullets.length > 0 && (
                              <ul className={styles.bullets}>
                                {item.bullets.map((b, idx) =>
                                  b.trim() ? (
                                    <li key={idx} className={styles.bullet}>
                                      {formatText(b)}
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

HybridTemplate.displayName = "HybridTemplate";

export default HybridTemplate;
