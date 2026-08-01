import React from "react";

/**
 * Parses a text string and converts:
 *  - ***text*** or ___text___ => <strong><em>text</em></strong> (Bold Italic)
 *  - **text** or __text__ => <strong>text</strong> (Bold)
 *  - *text* or _text_ => <em>text</em> (Italic)
 */
export function formatText(text: string | undefined | null): React.ReactNode {
  if (!text) return "";

  // Split by markdown formatting syntax: ***bolditalic***, **bold**, *italic*, _italic_
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*\*[\s\S]+?\*\*\*|\_\_\_[\s\S]+?\_\_\_|\*\*[\s\S]+?\*\*|\_\_[\s\S]+?\_\_|\*[\s\S]+?\*|\_[\s\S]+?\_)/g;

  const rawParts = text.split(regex);

  rawParts.forEach((part, index) => {
    if (!part) return;

    if ((part.startsWith("***") && part.endsWith("***")) || (part.startsWith("___") && part.endsWith("___"))) {
      const content = part.slice(3, -3);
      parts.push(
        <strong key={index}>
          <em>{content}</em>
        </strong>
      );
    } else if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) {
      const content = part.slice(2, -2);
      parts.push(<strong key={index}>{content}</strong>);
    } else if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) {
      const content = part.slice(1, -1);
      parts.push(<em key={index}>{content}</em>);
    } else {
      parts.push(part);
    }
  });

  return <>{parts}</>;
}
