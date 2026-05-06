"use client";

import React, { forwardRef, useRef } from "react";
import { useResume } from "../app/context/ResumeContext";
import styles from "./EuropassTemplate.module.css";
import { Phone, Mail, Link, MapPin } from "lucide-react";

const EuropassTemplate = forwardRef<HTMLDivElement>((props, ref) => {
  const { data, updateData } = useResume();
  const { personalInfo, education, experience, projects, publications, additional, activities } = data;
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

  return (
    <div className={styles.resumePage} ref={ref}>
      <div className={styles.pageDecorationTop}></div>
      <div className={styles.pageDecorationBottom}></div>
      
      <table className={styles.printTable}>
        <thead><tr><td><div className={styles.printSpaceTop}></div></td></tr></thead>
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
          <h1 className={styles.name}>
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          
          {personalInfo.nationality && (
            <div className={styles.contactRow}>
              <span className={styles.bold} style={{ marginRight: '8px' }}>Nationality:</span> {personalInfo.nationality}
            </div>
          )}
          
          {personalInfo.phone && (
            <div className={styles.contactRow}>
              <Phone size={14} className={styles.icon} /> {personalInfo.phone}
            </div>
          )}
          
          {personalInfo.email && (
            <div className={styles.contactRow}>
              <Mail size={14} className={styles.icon} /> 
              <span className={styles.bold}>Email address:</span>&nbsp;<a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className={styles.contactRow}>
              <Link size={14} className={styles.icon} /> 
              <span className={styles.bold}>LinkedIn:</span>&nbsp;<a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer">{personalInfo.linkedin}</a>
            </div>
          )}
          
          {personalInfo.location && (
            <div className={styles.contactRow}>
              <MapPin size={14} className={styles.icon} /> 
              <span className={styles.bold}>Address:</span>&nbsp;{personalInfo.location}
            </div>
          )}
        </div>

        {/* Europass Logo */}
        <div className={styles.europassLogo}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 810 540" width="54" height="36" style={{ borderRadius: '2px' }}>
            <rect width="810" height="540" fill="#003399"/>
            <g fill="#FFCC00" transform="translate(405,270) scale(27)">
              <use href="#star" y="-6"/>
              <use href="#star" y="6"/>
              <use href="#star" x="-6"/>
              <use href="#star" x="6"/>
              <use href="#star" x="-5.196" y="-3"/>
              <use href="#star" x="5.196" y="3"/>
              <use href="#star" x="-5.196" y="3"/>
              <use href="#star" x="5.196" y="-3"/>
              <use href="#star" x="-3" y="-5.196"/>
              <use href="#star" x="3" y="5.196"/>
              <use href="#star" x="-3" y="5.196"/>
              <use href="#star" x="3" y="-5.196"/>
            </g>
            <defs>
              <path id="star" d="M0-1l.225.69h.726l-.588.428.225.69-.588-.428-.588.428.225-.69-.588-.428h.726z"/>
            </defs>
          </svg>
          <span style={{ 
            color: '#4a2166', 
            fontSize: '32px', 
            fontWeight: '600', 
            fontFamily: 'Arial, Helvetica, sans-serif',
            letterSpacing: '-0.5px',
            marginLeft: '10px'
          }}>
            europass
          </span>
        </div>
      </div>

      {/* About Me */}
      {personalInfo.aboutMe && (
        <Section title="About Me">
          <p className={styles.aboutMe}>{personalInfo.aboutMe}</p>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education and Training">
          {education.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.itemTitle}>{edu.degree}</div>
              <div className={styles.itemSubheader}>
                <span>{edu.institution}</span> <span className={styles.itemDate}>[{edu.date}]</span>
              </div>
              {edu.location && (
                <div className={styles.infoRow}>
                  <span className={styles.bold}>Address:</span> {edu.location}
                </div>
              )}
              {edu.gpa && (
                <div className={styles.infoRow}>
                  <span className={styles.bold}>Final grade:</span> {edu.gpa}
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

      {/* Experience */}
      {experience.length > 0 && (
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
                  {exp.bullets.map((b, i) => <li key={i} className={styles.bullet}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Publications */}
      {publications.length > 0 && (
        <Section title="Publications">
          {publications.map((pub) => (
            <div key={pub.id} className={styles.item} style={{ marginBottom: '12px' }}>
              <div className={styles.aboutMe}>
                {pub.authors}, "{pub.title}" <span style={{ fontStyle: 'italic' }}>{pub.journal}</span> [{pub.date}]
              </div>
              {pub.link && (
                <div style={{ marginTop: '2px' }}>
                  <a href={pub.link} className={styles.publicationLink} target="_blank" rel="noreferrer">Link to abstract</a>
                </div>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Management & Leadership (Mapped from Activities) */}
      {activities.length > 0 && (
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
                  {act.bullets.map((b, i) => <li key={i} className={styles.bullet}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Honours and Awards */}
      {additional.awards && (
        <Section title="Honours and Awards">
          {additional.awards.split('\n').filter(Boolean).map((award, idx) => (
            <div key={idx} className={styles.infoRow}>
              {award}
            </div>
          ))}
        </Section>
      )}

      {/* Skills and Abilities */}
      {(additional.technicalSkills || additional.programmingSkills || additional.languages) && (
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
          {additional.languages && (
            <div className={styles.infoRow}>
              <span className={styles.itemTitle}>Languages:</span> {additional.languages}
            </div>
          )}
        </Section>
      )}

            </td>
          </tr>
        </tbody>
        <tfoot><tr><td><div className={styles.printSpaceBottom}></div></td></tr></tfoot>
      </table>

    </div>
  );
});

EuropassTemplate.displayName = "EuropassTemplate";

export default EuropassTemplate;
