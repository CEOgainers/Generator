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

export const generateWordDoc = async (data: ResumeData, template: "ivy" | "modern" = "ivy") => {
  const sections = [];

  // Header
  sections.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.toUpperCase(),
          bold: true,
          size: 40, // 20pt
          font: "Times New Roman",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
          text: `${data.personalInfo.location} | ${data.personalInfo.phone} | ${data.personalInfo.email} | ${data.personalInfo.linkedin}`,
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
        text: text,
        bullet: { level: 0 },
        size: 22,
        font: "Times New Roman",
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
      })
    );
  };

  // Education
  if (data.education.length > 0) {
    addSectionHeader("Education");
    data.education.forEach((edu) => {
      addItemHeader(edu.institution, edu.location);
      addItemSubheader(edu.degree, edu.date);
      if (edu.gpa) addParagraph(`GPA: ${edu.gpa}`);
      if (edu.coursework) addParagraph(edu.coursework, "Relevant Coursework:");
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Experience
  if (data.experience.length > 0) {
    addSectionHeader("Work Experience");
    data.experience.forEach((exp) => {
      addItemHeader(exp.company, exp.location);
      addItemSubheader(exp.title, exp.date);
      exp.bullets.forEach((b) => addBullet(b));
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Projects
  if (data.projects.length > 0) {
    addSectionHeader("University Projects");
    data.projects.forEach((proj) => {
      addItemHeader(proj.name, proj.date);
      proj.bullets.forEach((b) => addBullet(b));
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Activities
  if (data.activities.length > 0) {
    addSectionHeader("Activities");
    data.activities.forEach((act) => {
      addItemHeader(act.organization, act.location);
      addItemSubheader(act.role, act.date);
      act.bullets.forEach((b) => addBullet(b));
      sections.push(new Paragraph({ spacing: { after: 100 } }));
    });
  }

  // Publications
  if (data.publications.length > 0) {
    addSectionHeader("Publications");
    data.publications.forEach((pub) => {
      const children = [
        new TextRun({ text: `${pub.authors}. (${pub.date}). `, size: 22, font: "Times New Roman" }),
      ];

      if (pub.link) {
        children.push(
          new ExternalHyperlink({
            child: new TextRun({
              text: `"${pub.title}"`,
              style: "Hyperlink",
              size: 22,
              font: "Times New Roman",
            }),
            link: pub.link,
          })
        );
      } else {
        children.push(new TextRun({ text: `"${pub.title}"`, size: 22, font: "Times New Roman" }));
      }

      children.push(new TextRun({ text: ` `, size: 22, font: "Times New Roman" }));
      children.push(new TextRun({ text: pub.journal, italics: true, size: 22, font: "Times New Roman" }));
      children.push(new TextRun({ text: `.`, size: 22, font: "Times New Roman" }));

      sections.push(
        new Paragraph({
          children,
          spacing: { after: 100 },
        })
      );
    });
  }

  // Additional
  if (
    data.additional.technicalSkills ||
    data.additional.programmingSkills ||
    data.additional.languages ||
    data.additional.certifications ||
    data.additional.awards
  ) {
    addSectionHeader("Additional");
    if (data.additional.technicalSkills) addParagraph(data.additional.technicalSkills, "Technical Skills:");
    if (data.additional.programmingSkills) addParagraph(data.additional.programmingSkills, "Programming Skills:");
    if (data.additional.languages) addParagraph(data.additional.languages, "Languages:");
    if (data.additional.certifications) addParagraph(data.additional.certifications, "Certifications & Training:");
    if (data.additional.awards) addParagraph(data.additional.awards, "Awards:");
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

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.docx`);
};
