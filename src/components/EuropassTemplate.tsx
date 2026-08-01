"use client";

import React, { forwardRef, useRef } from "react";
import { useResume } from "../app/context/ResumeContext";
import styles from "./EuropassTemplate.module.css";
import { Phone, Mail, Link, MapPin } from "lucide-react";

const EuropassTemplate = forwardRef<HTMLDivElement>((props, ref) => {
  const { data, updateData } = useResume();
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {children}
      </div>
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData("personalInfo", { ...personalInfo, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const displayName = personalInfo.fullName || `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <div className={styles.resumePage} ref={ref}>
      <div className={styles.pageDecorationTop}></div>
      <div className={styles.pageDecorationBottom}></div>

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
              <div className={styles.headerSection}>
                {/* Profile Picture Upload */}
                <div className={styles.profilePicContainer} onClick={() => fileInputRef.current?.click()}>
                  {personalInfo.profilePicture ? (
                    <img src={personalInfo.profilePicture} alt="Profile" className={styles.profilePic} />
                  ) : (
                    <div className={styles.placeholderPic}>Click to add photo</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Right Side Header Text */}
                <div className={styles.headerRight}>
                  <h1 className={styles.name}>{displayName}</h1>

                  {personalInfo.personalId && (
                    <div className={styles.contactRow}>
                      <span className={styles.bold}>ID:</span>&nbsp;{personalInfo.personalId}
                    </div>
                  )}

                  {personalInfo.nationality && (
                    <div className={styles.contactRow}>
                      <span className={styles.bold}>Nationality:</span>&nbsp;{personalInfo.nationality}
                    </div>
                  )}

                  {personalInfo.dateOfBirth && (
                    <div className={styles.contactRow}>
                      <span className={styles.bold}>Date of birth:</span>&nbsp;{personalInfo.dateOfBirth}
                    </div>
                  )}

                  {personalInfo.placeOfBirth && (
                    <div className={styles.contactRow}>
                      <span className={styles.bold}>Place of birth:</span>&nbsp;{personalInfo.placeOfBirth}
                    </div>
                  )}

                  {personalInfo.phone && (
                    <div className={styles.contactRow}>
                      <Phone size={14} className={styles.icon} />
                      <span className={styles.bold}>Phone number:</span>&nbsp;{personalInfo.phone}
                    </div>
                  )}

                  {personalInfo.email && (
                    <div className={styles.contactRow}>
                      <Mail size={14} className={styles.icon} />
                      <span className={styles.bold}>Email address:</span>&nbsp;
                      <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                    </div>
                  )}

                  {personalInfo.portfolio && (
                    <div className={styles.contactRow}>
                      <Link size={14} className={styles.icon} />
                      <span className={styles.bold}>Website:</span>&nbsp;
                      <a
                        href={
                          personalInfo.portfolio.startsWith("http")
                            ? personalInfo.portfolio
                            : `https://${personalInfo.portfolio}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {personalInfo.portfolio}
                      </a>
                    </div>
                  )}

                  {personalInfo.linkedin && (
                    <div className={styles.contactRow}>
                      <Link size={14} className={styles.icon} />
                      <span className={styles.bold}>LinkedIn:</span>&nbsp;
                      <a
                        href={
                          personalInfo.linkedin.startsWith("http")
                            ? personalInfo.linkedin
                            : `https://${personalInfo.linkedin}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {personalInfo.linkedin}
                      </a>
                    </div>
                  )}

                  {personalInfo.orcid && (
                    <div className={styles.contactRow}>
                      <span className={styles.bold}>ORCID:</span>&nbsp;
                      <a
                        href={
                          personalInfo.orcid.startsWith("http")
                            ? personalInfo.orcid
                            : `https://orcid.org/${personalInfo.orcid}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        {personalInfo.orcid}
                      </a>
                    </div>
                  )}

                  {personalInfo.googleScholar && (
                    <div className={styles.contactRow}>
                      <span className={styles.bold}>Google Scholar:</span>&nbsp;
                      <a
                        href={
                          personalInfo.googleScholar.startsWith("http")
                            ? personalInfo.googleScholar
                            : `https://${personalInfo.googleScholar}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Profile Link
                      </a>
                    </div>
                  )}

                  {personalInfo.researchGate && (
                    <div className={styles.contactRow}>
                      <span className={styles.bold}>ResearchGate:</span>&nbsp;
                      <a
                        href={
                          personalInfo.researchGate.startsWith("http")
                            ? personalInfo.researchGate
                            : `https://${personalInfo.researchGate}`
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Profile Link
                      </a>
                    </div>
                  )}

                  {personalInfo.location && (
                    <div className={`${styles.contactRow} ${styles.locationRow}`}>
                      <MapPin size={14} className={styles.icon} />
                      <span className={styles.bold}>Home:</span>&nbsp;{personalInfo.location}
                    </div>
                  )}
                </div>

                {/* Europass Logo */}
                <div className={styles.europassLogo}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 810 540"
                    width="54"
                    height="36"
                    style={{ borderRadius: "2px" }}
                  >
                    <rect width="810" height="540" fill="#003399" />
                    <g fill="#FFCC00" transform="translate(405,270) scale(27)">
                      <use href="#star" y="-6" />
                      <use href="#star" y="6" />
                      <use href="#star" x="-6" />
                      <use href="#star" x="6" />
                      <use href="#star" x="-5.196" y="-3" />
                      <use href="#star" x="5.196" y="3" />
                      <use href="#star" x="-5.196" y="3" />
                      <use href="#star" x="5.196" y="-3" />
                      <use href="#star" x="-3" y="-5.196" />
                      <use href="#star" x="3" y="5.196" />
                      <use href="#star" x="-3" y="5.196" />
                      <use href="#star" x="3" y="-5.196" />
                    </g>
                    <defs>
                      <path
                        id="star"
                        d="M0-1l.225.69h.726l-.588.428.225.69-.588-.428-.588.428.225-.69-.588-.428h.726z"
                      />
                    </defs>
                  </svg>
                  <span
                    style={{
                      color: "#4a2166",
                      fontSize: "32px",
                      fontWeight: "600",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      letterSpacing: "-0.5px",
                      marginLeft: "10px",
                    }}
                  >
                    europass
                  </span>
                </div>
              </div>

              {/* About Me / Summary */}
              {personalInfo.aboutMe && (
                <Section title="About Me">
                  <p className={styles.aboutMe}>{personalInfo.aboutMe}</p>
                </Section>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <Section title="Education and Training">
                  {education.map((edu) => (
                    <div key={edu.id} className={styles.item}>
                      <div className={styles.itemTitle}>
                        {edu.degree} {edu.major ? `in ${edu.major}` : ""}
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{edu.institution}</span>{" "}
                        <span className={styles.itemDate}>[{edu.date}]</span>
                      </div>
                      {edu.location && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Address:</span> {edu.location}
                        </div>
                      )}
                      {edu.gpa && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>GPA/Grade:</span> {edu.gpa}{" "}
                          {edu.ranking && `(${edu.ranking})`}
                        </div>
                      )}
                      {edu.thesis && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Thesis:</span> "{edu.thesis}"
                          {edu.advisor && ` (Advisor: ${edu.advisor})`}
                        </div>
                      )}
                      {edu.coursework && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Relevant Courses:</span> {edu.coursework}
                        </div>
                      )}
                    </div>
                  ))}
                </Section>
              )}

              {/* Research Experience */}
              {researchExperience && researchExperience.length > 0 && (
                <Section title="Research Experience">
                  {researchExperience.map((rex) => (
                    <div key={rex.id} className={styles.item}>
                      <div className={styles.itemTitle}>{rex.role}</div>
                      <div className={styles.itemSubheader}>
                        <span>{rex.institution}</span>{" "}
                        <span className={styles.itemDate}>[{rex.date}]</span>
                      </div>
                      {rex.location && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Address:</span> {rex.location}
                        </div>
                      )}
                      {rex.supervisor && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Supervisor:</span> {rex.supervisor}
                        </div>
                      )}
                      {rex.bullets.length > 0 && (
                        <ul className={styles.bullets}>
                          {rex.bullets.map((b, i) =>
                            b.trim() ? (
                              <li key={i} className={styles.bullet}>
                                {b}
                              </li>
                            ) : null
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </Section>
              )}

              {/* Professional Experience */}
              {experience && experience.length > 0 && (
                <Section title="Work Experience">
                  {experience.map((exp) => (
                    <div key={exp.id} className={styles.item}>
                      <div className={styles.itemTitle}>{exp.title}</div>
                      <div className={styles.itemSubheader}>
                        <span>{exp.company}</span> <span className={styles.itemDate}>[{exp.date}]</span>
                      </div>
                      {exp.location && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Country:</span> {exp.location}
                        </div>
                      )}
                      {exp.bullets.length > 0 && (
                        <ul className={styles.bullets}>
                          {exp.bullets.map((b, i) =>
                            b.trim() ? (
                              <li key={i} className={styles.bullet}>
                                {b}
                              </li>
                            ) : null
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </Section>
              )}

              {/* Selected Publications */}
              {selectedPublications && selectedPublications.length > 0 && (
                <Section title="Publications">
                  {selectedPublications.map((pub) => (
                    <div key={pub.id} className={styles.item} style={{ marginBottom: "12px" }}>
                      <div className={styles.aboutMe}>
                        {pub.authors}, "{pub.title}"{" "}
                        <span style={{ fontStyle: "italic" }}>
                          {pub.journal}
                          {pub.publisher && `, ${pub.publisher}`}
                        </span>{" "}
                        [{pub.date}] {pub.quartile && `[${pub.quartile}]`} {pub.status && `(${pub.status})`}
                      </div>
                      {pub.link && (
                        <div style={{ marginTop: "2px" }}>
                          <a href={pub.link} className={styles.publicationLink} target="_blank" rel="noreferrer">
                            Link to publication
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </Section>
              )}

              {/* Selected Projects */}
              {selectedProjects && selectedProjects.length > 0 && (
                <Section title="Selected Projects">
                  {selectedProjects.map((proj) => (
                    <div key={proj.id} className={styles.item}>
                      <div className={styles.itemTitle}>
                        {proj.name}
                        {proj.fundingOrGrant && ` [Funding: ${proj.fundingOrGrant}]`}
                      </div>
                      <div className={styles.itemSubheader}>
                        <span className={styles.itemDate}>[{proj.date}]</span>
                      </div>
                      {proj.supervisor && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Supervisor:</span> {proj.supervisor}
                        </div>
                      )}
                      {proj.bullets.length > 0 && (
                        <ul className={styles.bullets}>
                          {proj.bullets.map((b, i) =>
                            b.trim() ? (
                              <li key={i} className={styles.bullet}>
                                {b}
                              </li>
                            ) : null
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </Section>
              )}

              {/* Honours and Awards */}
              {honorsAwardsScholarships && honorsAwardsScholarships.length > 0 && (
                <Section title="Honours and Awards">
                  {honorsAwardsScholarships.map((award) => (
                    <div key={award.id} className={styles.item} style={{ marginBottom: "8px" }}>
                      <div className={styles.bold} style={{ fontSize: "13px" }}>
                        {award.title}
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{award.organization}</span>{" "}
                        <span className={styles.itemDate}>[{award.date}]</span>
                      </div>
                      {award.description && <div className={styles.infoRow}>{award.description}</div>}
                    </div>
                  ))}
                </Section>
              )}

              {/* Standardized Tests */}
              {standardizedTests && standardizedTests.length > 0 && (
                <Section title="Standardized Tests">
                  {standardizedTests.map((test) => (
                    <div key={test.id} className={styles.infoRow} style={{ marginBottom: "6px" }}>
                      <span className={styles.bold}>{test.testName}:</span> {test.score} [{test.date}]
                      {test.breakdown && <div style={{ fontStyle: "italic", fontSize: "12px" }}>{test.breakdown}</div>}
                    </div>
                  ))}
                </Section>
              )}

              {/* Certifications and Training */}
              {certificationsTraining && certificationsTraining.length > 0 && (
                <Section title="Certifications and Training">
                  {certificationsTraining.map((cert) => (
                    <div key={cert.id} className={styles.item} style={{ marginBottom: "8px" }}>
                      <div className={styles.bold} style={{ fontSize: "13px" }}>
                        {cert.title}
                      </div>
                      <div className={styles.itemSubheader}>
                        <span>{cert.organization}</span>{" "}
                        <span className={styles.itemDate}>[{cert.date}]</span>
                      </div>
                      {cert.description && <div className={styles.infoRow}>{cert.description}</div>}
                    </div>
                  ))}
                </Section>
              )}

              {/* Management & Leadership (Activities) */}
              {activities && activities.length > 0 && (
                <Section title="Management and Leadership Experience">
                  {activities.map((act) => (
                    <div key={act.id} className={styles.item}>
                      <div className={styles.itemTitle}>{act.role}</div>
                      <div className={styles.itemSubheader}>
                        <span>{act.organization}</span> <span className={styles.itemDate}>[{act.date}]</span>
                      </div>
                      {act.location && (
                        <div className={styles.infoRow}>
                          <span className={styles.bold}>Country:</span> {act.location}
                        </div>
                      )}
                      {act.bullets.length > 0 && (
                        <ul className={styles.bullets}>
                          {act.bullets.map((b, i) =>
                            b.trim() ? (
                              <li key={i} className={styles.bullet}>
                                {b}
                              </li>
                            ) : null
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </Section>
              )}

              {/* Skills and Abilities */}
              {(additional.technicalSkills ||
                additional.programmingSkills ||
                additional.laboratorySkills ||
                additional.languages ||
                additional.professionalMemberships ||
                additional.peerReviewActivities ||
                additional.additionalAcademicStrength) && (
                <Section title="Skills and Abilities">
                  {additional.technicalSkills && (
                    <div className={styles.infoRow}>
                      <span className={styles.itemTitle}>Technical:</span> {additional.technicalSkills}
                    </div>
                  )}
                  {additional.programmingSkills && (
                    <div className={styles.infoRow}>
                      <span className={styles.itemTitle}>Programming:</span> {additional.programmingSkills}
                    </div>
                  )}
                  {additional.laboratorySkills && (
                    <div className={styles.infoRow}>
                      <span className={styles.itemTitle}>Laboratory:</span> {additional.laboratorySkills}
                    </div>
                  )}
                  {additional.languages && (
                    <div className={styles.infoRow}>
                      <span className={styles.itemTitle}>Languages:</span> {additional.languages}
                    </div>
                  )}
                  {additional.professionalMemberships && (
                    <div className={styles.infoRow}>
                      <span className={styles.itemTitle}>Memberships:</span> {additional.professionalMemberships}
                    </div>
                  )}
                  {additional.peerReviewActivities && (
                    <div className={styles.infoRow}>
                      <span className={styles.itemTitle}>Peer Review:</span> {additional.peerReviewActivities}
                    </div>
                  )}
                  {additional.additionalAcademicStrength && (
                    <div className={styles.infoRow}>
                      <span className={styles.itemTitle}>Academic Strength:</span> {additional.additionalAcademicStrength}
                    </div>
                  )}
                </Section>
              )}

              {/* Dynamic Custom Sections */}
              {customSections && customSections.length > 0 && (
                <>
                  {customSections.map((sec) => (
                    <Section key={sec.id} title={sec.sectionTitle}>
                      {sec.items && sec.items.length > 0 ? (
                        sec.items.map((item) => (
                          <div key={item.id} className={styles.item}>
                            {item.title && <div className={styles.itemTitle}>{item.title}</div>}
                            {(item.subtitle || item.date) && (
                              <div className={styles.itemSubheader}>
                                {item.subtitle && <span>{item.subtitle}</span>}
                                {item.date && <span className={styles.itemDate}>[{item.date}]</span>}
                              </div>
                            )}
                            {item.location && (
                              <div className={styles.infoRow}>
                                <span className={styles.bold}>Location:</span> {item.location}
                              </div>
                            )}
                            {item.description && <div className={styles.infoRow}>{item.description}</div>}
                            {item.bullets && item.bullets.length > 0 && (
                              <ul className={styles.bullets}>
                                {item.bullets.map((b, i) =>
                                  b.trim() ? (
                                    <li key={i} className={styles.bullet}>
                                      {b}
                                    </li>
                                  ) : null
                                )}
                              </ul>
                            )}
                          </div>
                        ))
                      ) : null}
                    </Section>
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

EuropassTemplate.displayName = "EuropassTemplate";

export default EuropassTemplate;
