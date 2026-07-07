"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import { 
  FileEdit, 
  ClipboardList, 
  Layers, 
  PhoneCall, 
  Laptop, 
  CalendarOff, 
  Calendar, 
  Clock, 
  MessagesSquare, 
  Video, 
  Mail, 
  ScrollText, 
  FilePlus, 
  CheckCircle2, 
  Search, 
  LogOut, 
  ExternalLink, 
  ArrowRight,
  Copy,
  Check
} from "lucide-react";

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  category: "CV Tools" | "Worksheets & Docs" | "Forms & Attendance" | "Meetings & Mail";
  url: string;
  isExternal: boolean;
  iconName: string;
  iconBg: string;
  iconColor: string;
  copyMessage: string;
}

const DASHBOARD_ITEMS: DashboardItem[] = [
  {
    id: "cv_creator",
    title: "CV Creator",
    description: "Build, format, and download high-quality academic and professional CVs.",
    category: "CV Tools",
    url: "/cv-generator",
    isExternal: false,
    iconName: "FileEdit",
    iconBg: "rgba(16, 185, 129, 0.15)",
    iconColor: "#10b981",
    copyMessage: "Hello! Here is the link to our CV Creator tool. You can use it to build and download your academic & professional CV here: [BASE_URL]/cv-generator"
  },
  {
    id: "client_task_tracking",
    title: "Client Task Tracking Sheet",
    description: "Track ongoing client jobs, task lists, and work statuses in real-time.",
    category: "Worksheets & Docs",
    url: "https://docs.google.com/spreadsheets/d/1e1_Gl935otXzCQMdUwhvxJXfYARXXAlGWyOKl4dvnsg/edit?usp=sharing",
    isExternal: true,
    iconName: "ClipboardList",
    iconBg: "rgba(59, 130, 246, 0.15)",
    iconColor: "#3b82f6",
    copyMessage: "Hello, here is the link to the Client Task Tracking Sheet to view tasks and work progress updates: https://docs.google.com/spreadsheets/d/1e1_Gl935otXzCQMdUwhvxJXfYARXXAlGWyOKl4dvnsg/edit?usp=sharing"
  },
  {
    id: "departmental_worksheet",
    title: "Departmental Work Sheet",
    description: "Easily navigate and organize department sheets and Google Drive assets.",
    category: "Worksheets & Docs",
    url: "https://docs.google.com/spreadsheets/d/1cSJge0e8j1go_KhT3PWZzT6rSOswkcnEI4ec4cafwmg/edit?usp=sharing",
    isExternal: true,
    iconName: "Layers",
    iconBg: "rgba(99, 102, 241, 0.15)",
    iconColor: "#6366f1",
    copyMessage: "Hello, here is the link to the Departmental Work Sheet: https://docs.google.com/spreadsheets/d/1cSJge0e8j1go_KhT3PWZzT6rSOswkcnEI4ec4cafwmg/edit?usp=sharing"
  },
  {
    id: "central_calling_sheet",
    title: "Central Calling Sheet",
    description: "Manage client leads, calling histories, data registries, and call statuses.",
    category: "Worksheets & Docs",
    url: "https://docs.google.com/spreadsheets/d/1RHSxiIcG65XMeTQROurWc_CEa3bm-vI_wzoRaEXGbwI/edit?usp=sharing",
    isExternal: true,
    iconName: "PhoneCall",
    iconBg: "rgba(236, 72, 153, 0.15)",
    iconColor: "#ec4899",
    copyMessage: "Hello, please access the Central Calling Sheet for call logs and data here: https://docs.google.com/spreadsheets/d/1RHSxiIcG65XMeTQROurWc_CEa3bm-vI_wzoRaEXGbwI/edit?usp=sharing"
  },
  {
    id: "work_station",
    title: "Work Station",
    description: "Access essential reference prompts, research briefs, and workspace guides.",
    category: "Worksheets & Docs",
    url: "https://docs.google.com/document/d/177zfifGGBRv_uJhb5oI0VKlfUAbKRvdl44PTNP0slIw/edit?usp=sharing",
    isExternal: true,
    iconName: "Laptop",
    iconBg: "rgba(245, 158, 11, 0.15)",
    iconColor: "#f59e0b",
    copyMessage: "Hello, here is the official Work Station document containing research briefs and guidelines: https://docs.google.com/document/d/177zfifGGBRv_uJhb5oI0VKlfUAbKRvdl44PTNP0slIw/edit?usp=sharing"
  },
  {
    id: "leave_form",
    title: "Leave Form",
    description: "Apply for sick leaves, full day absences, or half day timeouts quickly.",
    category: "Forms & Attendance",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSd9AgEj9gNaWK3_oAKt8XtkN-LH-xp1OpINKIbh7y8XfJ-AnQ/viewform",
    isExternal: true,
    iconName: "CalendarOff",
    iconBg: "rgba(239, 68, 68, 0.15)",
    iconColor: "#ef4444",
    copyMessage: "Hello, you can submit your leave application (sick leave, full day, or half day) using this form: https://docs.google.com/forms/d/e/1FAIpQLSd9AgEj9gNaWK3_oAKt8XtkN-LH-xp1OpINKIbh7y8XfJ-AnQ/viewform"
  },
  {
    id: "client_appointment",
    title: "Client Appointment Form",
    description: "Log, search, and verify all client meetings and consultation scheduling.",
    category: "Worksheets & Docs",
    url: "https://docs.google.com/spreadsheets/d/1fBXZ8TkRyKlUnF635b_b-T3DCXeqNpJ9S8XJv7_zcEo/edit?usp=sharing",
    isExternal: true,
    iconName: "Calendar",
    iconBg: "rgba(139, 92, 246, 0.15)",
    iconColor: "#8b5cf6",
    copyMessage: "Hello, please find the Client Appointment Sheet for checking and scheduling meetings here: https://docs.google.com/spreadsheets/d/1fBXZ8TkRyKlUnF635b_b-T3DCXeqNpJ9S8XJv7_zcEo/edit?usp=sharing"
  },
  {
    id: "attendance_declaration",
    title: "Attendance Declaration",
    description: "Submit check-in updates and timing declarations for late attendance.",
    category: "Forms & Attendance",
    url: "https://forms.gle/hibLrxsAwtB9vNv37",
    isExternal: true,
    iconName: "Clock",
    iconBg: "rgba(6, 182, 212, 0.15)",
    iconColor: "#06b6d4",
    copyMessage: "Hello, please use this form to declare your late attendance: https://forms.gle/hibLrxsAwtB9vNv37"
  },
  {
    id: "book_consultation",
    title: "Book Consultation",
    description: "Set up online video consults or offline meetings for visiting clients.",
    category: "Meetings & Mail",
    url: "https://gainersfuture.com/appointment.html",
    isExternal: true,
    iconName: "MessagesSquare",
    iconBg: "rgba(16, 185, 129, 0.15)",
    iconColor: "#10b981",
    copyMessage: "Dear Client, you can book an online or offline consultation meeting with our advisors using this link: https://gainersfuture.com/appointment.html. Let us know if you need any assistance."
  },
  {
    id: "google_meet",
    title: "Google Meet",
    description: "Quick launch the official meet link. Reserved for Advisor meetings only.",
    category: "Meetings & Mail",
    url: "https://meet.google.com/nke-uurj-xxr",
    isExternal: true,
    iconName: "Video",
    iconBg: "rgba(239, 68, 68, 0.15)",
    iconColor: "#ef4444",
    copyMessage: "Hello, here is the Google Meet link for our upcoming advisor meeting: https://meet.google.com/nke-uurj-xxr. Please join the call when it is time. Thank you!"
  },
  {
    id: "client_mail",
    title: "Client Mail (Hostinger)",
    description: "Access official mailboxes, review inbox, and communicate via hostinger mail.",
    category: "Meetings & Mail",
    url: "https://mail.hostinger.com/mailboxes/INBOX",
    isExternal: true,
    iconName: "Mail",
    iconBg: "rgba(59, 130, 246, 0.15)",
    iconColor: "#3b82f6",
    copyMessage: "Hello, here is the link to log into the Hostinger client email inbox: https://mail.hostinger.com/mailboxes/INBOX"
  },
  {
    id: "call_script",
    title: "Call Script",
    description: "Consult the revised calling script, conversational flowcharts, and rebuttals.",
    category: "Meetings & Mail",
    url: "https://docs.google.com/document/d/1jbP3L9Saf_WwAF6_AUaLhlPsF5I71WOmHcjPSV_giGg/edit?tab=t.0#heading=h.3p15pulrd9rw",
    isExternal: true,
    iconName: "ScrollText",
    iconBg: "rgba(245, 158, 11, 0.15)",
    iconColor: "#f59e0b",
    copyMessage: "Hello, please consult the official Call Script document for outreach and lead updates here: https://docs.google.com/document/d/1jbP3L9Saf_WwAF6_AUaLhlPsF5I71WOmHcjPSV_giGg/edit?tab=t.0#heading=h.3p15pulrd9rw"
  },
  {
    id: "sop_request",
    title: "SOP Request",
    description: "Request Statements of Purpose for academic and scholarship programs.",
    category: "Forms & Attendance",
    url: "https://forms.gle/GshVCL48Z2xD8KYg8",
    isExternal: true,
    iconName: "FilePlus",
    iconBg: "rgba(99, 102, 241, 0.15)",
    iconColor: "#6366f1",
    copyMessage: "Hello, you can submit your Statement of Purpose (SOP) generation request using this link: https://forms.gle/GshVCL48Z2xD8KYg8"
  },
  {
    id: "cv_correction",
    title: "CV Correction",
    description: "Access forms for submitting corrections, errors, and checking corrections.",
    category: "CV Tools",
    url: "https://forms.gle/7khNAQruDQ9PrJL88",
    isExternal: true,
    iconName: "CheckCircle2",
    iconBg: "rgba(139, 92, 246, 0.15)",
    iconColor: "#8b5cf6",
    copyMessage: "Hello! If you have any corrections or modifications for your CV, please submit them using this CV Correction form: https://forms.gle/7khNAQruDQ9PrJL88"
  }
];

export default function Dashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentDate, setCurrentDate] = useState("");
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    router.push("/login");
  };

  const getIcon = (name: string, color: string) => {
    switch (name) {
      case "FileEdit": return <FileEdit size={24} color={color} />;
      case "ClipboardList": return <ClipboardList size={24} color={color} />;
      case "Layers": return <Layers size={24} color={color} />;
      case "PhoneCall": return <PhoneCall size={24} color={color} />;
      case "Laptop": return <Laptop size={24} color={color} />;
      case "CalendarOff": return <CalendarOff size={24} color={color} />;
      case "Calendar": return <Calendar size={24} color={color} />;
      case "Clock": return <Clock size={24} color={color} />;
      case "MessagesSquare": return <MessagesSquare size={24} color={color} />;
      case "Video": return <Video size={24} color={color} />;
      case "Mail": return <Mail size={24} color={color} />;
      case "ScrollText": return <ScrollText size={24} color={color} />;
      case "FilePlus": return <FilePlus size={24} color={color} />;
      case "CheckCircle2": return <CheckCircle2 size={24} color={color} />;
      default: return <FileEdit size={24} color={color} />;
    }
  };

  const handleCardClick = (url: string, isExternal: boolean) => {
    if (isExternal) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      router.push(url);
    }
  };

  const handleCopyMessage = (e: React.MouseEvent, copyMsg: string, itemId: string) => {
    e.stopPropagation(); // Avoid card click navigation triggering
    
    // Resolve dynamic base URL if needed
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const resolvedMessage = copyMsg.replace("[BASE_URL]", origin);

    navigator.clipboard.writeText(resolvedMessage)
      .then(() => {
        setCopiedItemId(itemId);
        setTimeout(() => setCopiedItemId(null), 2500);
      })
      .catch((err) => {
        console.error("Failed to copy message:", err);
      });
  };

  const filteredItems = DASHBOARD_ITEMS.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "CV Tools", "Worksheets & Docs", "Forms & Attendance", "Meetings & Mail"];

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.wrapper}>
        
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1>Gainer's Future Dashboard</h1>
            <p>{currentDate || "Welcome Back!"}</p>
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userBadge}>Active Operator</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>

        {/* Search & Filters */}
        <section className={styles.controlsRow}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search tools, forms, worksheets..." 
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.categories}>
            {categories.map((cat) => (
              <button 
                key={cat}
                className={`${styles.categoryBtn} ${activeCategory === cat ? styles.activeCategoryBtn : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Cards Grid */}
        <section className={styles.grid}>
          {filteredItems.map((item) => {
            const isCopied = copiedItemId === item.id;
            return (
              <div 
                key={item.id}
                className={styles.card}
                onClick={() => handleCardClick(item.url, item.isExternal)}
              >
                <div className={styles.cardIconWrapper} style={{ backgroundColor: item.iconBg }}>
                  {getIcon(item.iconName, item.iconColor)}
                </div>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardDescription}>{item.description}</p>
                <div className={styles.cardFooter}>
                  <button 
                    className={`${styles.copyMsgBtn} ${isCopied ? styles.copied : ""}`}
                    onClick={(e) => handleCopyMessage(e, item.copyMessage, item.id)}
                    title="Copy professional message with link"
                  >
                    {isCopied ? (
                      <><Check size={13} /> Copied Msg</>
                    ) : (
                      <><Copy size={13} /> Copy Msg</>
                    )}
                  </button>
                  <span className={styles.actionText}>
                    {item.isExternal ? (
                      <>Open <ExternalLink size={13} /></>
                    ) : (
                      <>Open <ArrowRight size={13} /></>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

      </div>
    </main>
  );
}
