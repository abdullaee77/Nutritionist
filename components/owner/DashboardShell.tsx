"use client";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse on mobile when first loading
      if (mobile && window.innerWidth < 768 && !sessionStorage.getItem("sidebar-init")) {
        setIsOpen(false);
        sessionStorage.setItem("sidebar-init", "true");
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="ow-shell" style={{ minHeight: "100vh", display: "flex", position: "relative" }}>
      
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 35 }}
        />
      )}

      {/* Sidebar Container */}
      <div style={{ 
        position: isMobile ? "fixed" : "sticky", 
        top: 0, 
        left: 0, 
        height: "100vh", 
        zIndex: 40,
        // On mobile, slide it in/out. On desktop, just keep it rendered.
        transform: isMobile ? (isOpen ? "translateX(0)" : "translateX(-100%)") : "none",
        transition: "transform 0.3s ease"
      }}>
        <Sidebar 
          name="Owner" 
          isOpen={isOpen} 
          toggle={() => setIsOpen(!isOpen)} 
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: isMobile ? "16px" : "32px", overflowX: "hidden", width: "100%" }}>
        
        {/* Mobile Menu Button */}
        {isMobile && !isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            style={{ 
              background: "var(--pom)", color: "var(--cream)", border: "none", 
              padding: "10px 16px", borderRadius: 8, marginBottom: 16, 
              fontWeight: "bold", display: "flex", alignItems: "center", gap: 8 
            }}
          >
            ☰ Menu
          </button>
        )}

        {children}
      </div>
    </div>
  );
}