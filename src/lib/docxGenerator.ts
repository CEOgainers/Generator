import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  ExternalHyperlink,
} from "docx";
import { saveAs } from "file-saver";
import { ResumeData } from "../app/context/ResumeContext";

export const generateWordDoc = async (data: ResumeData, template: "ivy" | "modern" | "europass" | "hybrid" = "hybrid") => {
  const sections = [];

  const displayName = data.personalInfo.fullName || `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;

  // Header
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: displayName.toUpperCase(),
          bold: true,
          size: 40, // 20pt
          font: "Times New Roman",
        }),
      ],
    })
  );

  // Contact Info row
  const contactParts = [];
  if (data.personalInfo.location) contactParts.push(data.personalInfo.location);
  if (data.personalInfo.phone) contactParts.push(data.personalInfo.phone);
  if (data.personalInfo.email) contactParts.push(data.personalInfo.email);
  if (data.personalInfo.linkedin) contactParts.push("LinkedIn");
  if (data.personalInfo.portfolio) contactParts.push("Portfolio");
  if (data.personalInfo.orcid) contactParts.push(`ORCID: ${data.personalInfo.orcid}`);
  if (data.personalInfo.nationality) contactParts.push(`Nationality: ${data.personalInfo.nationality}`);
  if (data.personalInfo.personalId) contactParts.push(`ID: ${data.personalInfo.personalId}`);
  if (data.personalInfo.dateOfBirth) contactParts.push(`DOB: ${data.personalInfo.dateOfBirth}`);
  if (data.personalInfo.placeOfBirth) contactParts.push(`POB: ${data.personalInfo.placeOfBirth}`);

  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: contactParts.join(" | "),
          size: 22, // 11pt
          font: "Times New Roman",
        }),
      ],
    })
  );

  const addSectionHeader = (title: string) => {
    sections.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        border: {
          bottom: {
            color: "auto",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
          },
        },
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 24, // 12pt
            font: "Times New Roman",
          }),
        ],
      })
    );
  };

  const addItemHeader = (leftBold: string, rightNormal: string) => {
    sections.push(
      new Paragraph({
        tabStops: [{ type: "right", position: 9000 }],
        children: [
          new TextRun({ text: leftBold, bold: true, size: 22, font: "Times New Roman" }),
          new TextRun({ text: `\t${rightNormal}`, size: 22, font: "Times New Roman" }),
        ],
      })
    );
  };

  const addItemSubheader = (leftItalic: string, rightItalic: string) => {
    sections.push(
      new Paragraph({
        tabStops: [{ type: "right", position: 9000 }],
        spacing: { after: 50 },
        children: [
          new TextRun({ text: leftItalic, italics: true, size: 22, font: "Times New Roman" }),
          new TextRun({ text: `\t${rightItalic}`, italics: true, size: 22, font: "Times New Roman" }),
        ],
      })
    );
  };

  const addBullet = (text: string) => {
    sections.push(
      new Paragraph({
        bullet: { level: 0 },
        children: [
          new TextRun({
            text: text,
            size: 22,
            font: "Times New Roman",
          }),
        ],
      })
    );
  };

  const addParagraph = (text: string, boldPrefix?: string) => {
    const children = [];
    if (boldPrefix) {
      children.push(new TextRun({ text: `${boldPrefix} `, bold: true, size: 22, font: "Times New Roman" }));
    }
    children.push(new TextRun({ text: text, size: 22, font: "Times New Roman" }));

    sections.push(
      new Paragraph({
        children,
        spacing: { after: 50 },
      })
    );
  };

  // Profile Summary / About Me
  if (data.personalInfo.aboutMe) {
    addSectionHeader("Executive Profile");
    addParagraph(data.personalInfo.aboutMe);
  }

  // Research Interests & Focus Areas
  if ((data.resumeStrategy?.researchFocus && data.resumeStrategy.researchFocus.length > 0) || data.resumeStrategy?.careerGoals) {
    addSectionHeader("Research Interests & Focus Areas");
    if (data.resumeStrategy.researchFocus && data.resumeStrategy.researchFocus.length > 0) {
      addParagraph(data.resumeStrategy.researchFocus.join(" • "), "Primary Fields of Interest:");
    }
    if (data.resumeStrategy.careerGoals) {
      addParagraph(data.resumeStrategy.careerGoals, "Academic & Research Trajectory:");
    }
  }

  // Education
  if (data.education && data.education.length > 0) {
    addSectionHeader("Education");
    data.education.forEach((edu) => {
      addItemHeader(edu.institution, edu.location);
      addItemSubheader(`${edu.degree}${edu.major ? ` in ${edu.major}` : ""}`, edu.date);
      if (edu.gpa) {
        addParagraph(`${edu.gpa}${edu.ranking ? ` (${edu.ranking})` : ""}`, "GPA:");
      }
      if (edu.thesis) {
        addParagraph(`"${edu.thesis}"${edu.advisor ? ` (Advisor: ${edu.advisor})` : ""}`, "Thesis:");
      }
      if (edu.coursework) {
        addParagraph(edu.coursework, "Relevant Coursework:");
      }
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Research Experience
  if (data.researchExperience && data.researchExperience.length > 0) {
    addSectionHeader("Research Experience");
    data.researchExperience.forEach((rex) => {
      addItemHeader(rex.institution, rex.location);
      addItemSubheader(`${rex.role}${rex.supervisor ? ` (Supervisor: ${rex.supervisor})` : ""}`, rex.date);
      rex.bullets.forEach((b) => {
        if (b.trim()) addBullet(b);
      });
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Selected Publications
  if (data.selectedPublications && data.selectedPublications.length > 0) {
    addSectionHeader("Selected Publications");
    data.selectedPublications.forEach((pub) => {
      const children: any[] = [
        new TextRun({ text: `${pub.authors}. (${pub.date}). `, size: 22, font: "Times New Roman" }),
      ];

      if (pub.link) {
        children.push(
          new ExternalHyperlink({
            children: [
              new TextRun({
                text: `"${pub.title}"`,
                style: "Hyperlink",
                size: 22,
                font: "Times New Roman",
              }),
            ],
            link: pub.link,
          })
        );
      } else {
        children.push(new TextRun({ text: `"${pub.title}"`, size: 22, font: "Times New Roman" }));
      }

      children.push(new TextRun({ text: ` `, size: 22, font: "Times New Roman" }));
      children.push(new TextRun({ text: pub.journal, italics: true, size: 22, font: "Times New Roman" }));
      
      const extraPubInfo = [];
      if (pub.publisher) extraPubInfo.push(pub.publisher);
      if (pub.quartile) extraPubInfo.push(pub.quartile);
      if (pub.status) extraPubInfo.push(pub.status);
      if (pub.doi) extraPubInfo.push(`DOI: ${pub.doi}`);

      if (extraPubInfo.length > 0) {
        children.push(new TextRun({ text: ` (${extraPubInfo.join(", ")})`, size: 22, font: "Times New Roman" }));
      }
      children.push(new TextRun({ text: `.`, size: 22, font: "Times New Roman" }));

      sections.push(
        new Paragraph({
          children,
          spacing: { after: 100 },
        })
      );
    });
  }

  // Selected Projects
  if (data.selectedProjects && data.selectedProjects.length > 0) {
    addSectionHeader("Selected Projects");
    data.selectedProjects.forEach((proj) => {
      addItemHeader(
        `${proj.name}${proj.fundingOrGrant ? ` [Funding: ${proj.fundingOrGrant}]` : ""}`,
        proj.date
      );
      if (proj.supervisor) {
        addItemSubheader(`Supervisor: ${proj.supervisor}`, "");
      }
      proj.bullets.forEach((b) => {
        if (b.trim()) addBullet(b);
      });
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Professional Experience
  if (data.experience && data.experience.length > 0) {
    addSectionHeader("Professional Experience");
    data.experience.forEach((exp) => {
      addItemHeader(exp.company, exp.location);
      addItemSubheader(exp.title, exp.date);
      exp.bullets.forEach((b) => {
        if (b.trim()) addBullet(b);
      });
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Honors, Awards & Scholarships
  if (data.honorsAwardsScholarships && data.honorsAwardsScholarships.length > 0) {
    addSectionHeader("Honors, Awards & Scholarships");
    data.honorsAwardsScholarships.forEach((award) => {
      addItemHeader(award.title, award.date);
      addItemSubheader(award.organization, "");
      if (award.description) addParagraph(award.description);
      sections.push(new Paragraph({ spacing: { after: 50 } }));
    });
  }

  // Standardized Tests
  if (data.standardizedTests && data.standardizedTests.length > 0) {
    addSectionHeader("Standardized Tests");
    data.standardizedTests.forEach((test) => {
      addItemHeader(`${test.testName}: ${test.score}`, test.date);
      if (test.breakdown) addParagraph(test.breakdown);
      sections.push(new Paragraph({ spacing: { after: 50 } }));
    });
  }

  // Certifications & Training
  if (data.certificationsTraining && data.certificationsTraining.length > 0) {
    addSectionHeader("Certifications & Training");
    data.certificationsTraining.forEach((cert) => {
      addItemHeader(cert.title, cert.date);
      addItemSubheader(cert.organization, "");
      if (cert.description) addParagraph(cert.description);
      sections.push(new Paragraph({ spacing: { after: 50 } }));
    });
  }

  // Activities
  if (data.activities && data.activities.length > 0) {
    addSectionHeader("Extracurricular & Leadership Activities");
    data.activities.forEach((act) => {
      addItemHeader(act.organization, act.location);
      addItemSubheader(act.role, act.date);
      act.bullets.forEach((b) => {
        if (b.trim()) addBullet(b);
      });
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Additional Info
  if (
    data.additional.technicalSkills ||
    data.additional.programmingSkills ||
    data.additional.laboratorySkills ||
    data.additional.languages ||
    data.additional.professionalMemberships ||
    data.additional.peerReviewActivities ||
    data.additional.additionalAcademicStrength
  ) {
    addSectionHeader("Additional Information");
    if (data.additional.technicalSkills) addParagraph(data.additional.technicalSkills, "Technical Skills:");
    if (data.additional.programmingSkills) addParagraph(data.additional.programmingSkills, "Programming Skills:");
    if (data.additional.laboratorySkills) addParagraph(data.additional.laboratorySkills, "Laboratory Skills:");
    if (data.additional.languages) addParagraph(data.additional.languages, "Languages:");
    if (data.additional.professionalMemberships) addParagraph(data.additional.professionalMemberships, "Professional Memberships:");
    if (data.additional.peerReviewActivities) addParagraph(data.additional.peerReviewActivities, "Peer Review Activities:");
    if (data.additional.additionalAcademicStrength) addParagraph(data.additional.additionalAcademicStrength, "Academic Strength:");
  }

  // Dynamic Custom Sections
  if (data.customSections && data.customSections.length > 0) {
    data.customSections.forEach((customSec) => {
      if (customSec.items && customSec.items.length > 0) {
        addSectionHeader(customSec.sectionTitle || "Custom Section");
        customSec.items.forEach((item) => {
          if (item.title || item.date) {
            addItemHeader(item.title || "", item.date || "");
          }
          if (item.subtitle || item.location) {
            addItemSubheader(item.subtitle || "", item.location || "");
          }
          if (item.description) {
            addParagraph(item.description);
          }
          if (item.bullets && item.bullets.length > 0) {
            item.bullets.forEach((b) => {
              if (b.trim()) addBullet(b);
            });
          }
          sections.push(new Paragraph({ spacing: { after: 100 } }));
        });
      }
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720, // 0.5 inch
              right: 1080, // 0.75 inch
              bottom: 720,
              left: 1080,
            },
          },
        },
        children: sections,
      },
    ],
  });

  const clientName = (data.personalInfo.fullName || `${data.personalInfo.firstName || ""} ${data.personalInfo.lastName || ""}`).trim().replace(/\s+/g, "_") || "Client";
  const filename = template === "ivy" 
    ? `${clientName}_Academic V.2.docx` 
    : template === "hybrid" 
    ? `${clientName}_Hybrid_CV.docx` 
    : `${clientName}_Academic_Cv.docx`;

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
};
