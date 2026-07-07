"use client";

import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import DataEntryForm from "../../components/DataEntryForm";
import ResumeTemplate from "../../components/ResumeTemplate";
import ModernTemplate from "../../components/ModernTemplate";
import EuropassTemplate from "../../components/EuropassTemplate";
import { useResume } from "../context/ResumeContext";
import { generateWordDoc } from "../../lib/docxGenerator";
import styles from "./page.module.css";
import { Download, Printer, Upload, Save, ArrowLeft } from "lucide-react";
import { saveAs } from "file-saver";
import Link from "next/link";

export default function CVGeneratorPage() {
  const { data, loadData } = useResume();
  const componentRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<"ivy" | "modern" | "europass">("modern");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pastedJSON, setPastedJSON] = useState("");

  const clientName = data?.personalInfo
    ? (data.personalInfo.fullName || `${data.personalInfo.firstName || ""} ${data.personalInfo.lastName || ""}`).trim().replace(/\s+/g, "_")
    : "Client";
  const finalClientName = clientName || "Client";
  const documentTitle = template === "ivy" ? `${finalClientName}_Academic V.2` : `${finalClientName}_Academic_Cv`;

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle,
  });

  const handleWordExport = async () => {
    try {
      await generateWordDoc(data, template);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document. Please check console for errors.");
    }
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(blob, "resume_data.json");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        loadData(json);
        alert("Resume data loaded successfully!");
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePasteJSONSubmit = () => {
    try {
      const json = JSON.parse(pastedJSON);
      loadData(json);
      alert("Resume data loaded successfully!");
      setIsPasteModalOpen(false);
      setPastedJSON("");
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Invalid JSON format. Please check your text.");
    }
  };

  return (
    <main className={styles.container}>
      {/* Paste JSON Modal */}
      {isPasteModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', 
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)', padding: '24px', 
            borderRadius: '8px', width: '600px', display: 'flex', 
            flexDirection: 'column', gap: '16px', border: '1px solid var(--border-color)'
          }}>
            <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>Paste JSON Data</h2>
            <textarea 
              style={{ width: '100%', height: '300px', padding: '12px', borderRadius: '6px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontFamily: 'monospace' }}
              value={pastedJSON}
              onChange={(e) => setPastedJSON(e.target.value)}
              placeholder="Paste your JSON here..."
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className={styles.secondaryBtn} onClick={() => setIsPasteModalOpen(false)}>Cancel</button>
              <button className={styles.primaryBtn} onClick={handlePasteJSONSubmit}>Load Data</button>
            </div>
          </div>
        </div>
      )}

      {/* Left Panel: Data Entry */}
      <section className={styles.leftPanel}>
        <div style={{ padding: '16px 24px 0 24px' }}>
          <Link href="/" className={styles.secondaryBtn} style={{ width: 'fit-content', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
        <DataEntryForm />
      </section>

      {/* Right Panel: Live Preview & Actions */}
      <section className={styles.rightPanel}>
        <div className={styles.actionPanel}>
          <div style={{ display: 'flex', gap: '8px', marginRight: 'auto' }}>
            <button className={styles.secondaryBtn} onClick={() => fileInputRef.current?.click()}>
              <Upload size={18} /> Import JSON File
            </button>
            <button className={styles.secondaryBtn} onClick={() => setIsPasteModalOpen(true)}>
              📋 Paste JSON
            </button>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImportJSON} 
            />
            <button className={styles.secondaryBtn} onClick={handleExportJSON}>
              <Save size={18} /> Save JSON
            </button>
            <select 
              className={styles.secondaryBtn} 
              value={template} 
              onChange={(e) => setTemplate(e.target.value as "ivy" | "modern" | "europass")}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              <option value="modern">Modern Academic</option>
              <option value="ivy">Ivy League</option>
              <option value="europass">Europass Style</option>
            </select>
          </div>
          
          <button className={styles.secondaryBtn} onClick={() => handlePrint()}>
            <Printer size={18} />
            PDF
          </button>
          <button className={styles.primaryBtn} onClick={handleWordExport}>
            <Download size={18} />
            .docx
          </button>
        </div>
        <div className={styles.resumeContainer}>
          {template === "ivy" && <ResumeTemplate ref={componentRef} />}
          {template === "modern" && <ModernTemplate ref={componentRef} />}
          {template === "europass" && <EuropassTemplate ref={componentRef} />}
        </div>
      </section>
    </main>
  );
}
