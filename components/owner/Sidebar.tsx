"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogoMark } from "../Logo";
import { Icons } from "./SidebarIcons";

const mainLinks = [
  { href: "/owner", label: "Dashboard", icon: Icons.Dashboard },
  { href: "/owner/clients", label: "Clients", icon: Icons.Clients },
  { href: "/owner/resources", label: "Resources", icon: Icons.Resources },
  { href: "/owner/tools/calorie-phases", label: "Calculator", icon: Icons.Calculator },
  { href: "/owner/studio", label: "Instagram Studio", icon: Icons.Instagram },
];

const bottomLinks = [
  { href: "/owner/guide", label: "Owner Guide", icon: Icons.Guide },
  { href: "/owner/settings", label: "Settings", icon: Icons.Settings },
];

export default function Sidebar({ name, isOpen, toggle }: { name: string, isOpen: boolean, toggle: () => void }) {
  const path = usePathname();
  
  return (
    <aside style={{ 
      background: "var(--pom)", color: "var(--cream)", 
      width: isOpen ? "260px" : "80px",
      transition: "width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0, overflowX: "hidden",
      borderRight: "1px solid rgba(0,0,0,0.1)",
      zIndex: 40,
      padding: "24px 0"
    }}>
      
      {/* Header & Toggle */}
      <div style={{ 
        display: "flex", alignItems: "center", 
        justifyContent: isOpen ? "space-between" : "center", 
        padding: isOpen ? "0 20px" : "0", 
        marginBottom: 24, minHeight: 40, flexShrink: 0
      }}>
        {isOpen && (
          <Link href="/owner" style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
            <LogoMark n="#F7F1E6" size={32} />
            <span style={{ fontFamily: "var(--font-head)", fontWeight: 700, letterSpacing: "0.1em" }}>NAFLAR</span>
          </Link>
        )}
        <button 
          onClick={toggle} 
          style={{ 
            background: "rgba(247,241,230,0.15)", border: "none", color: "var(--cream)", 
            cursor: "pointer", display: "grid", placeItems: "center", 
            padding: 8, borderRadius: 12, transition: "background 0.2s" 
          }}
        >
          {isOpen ? <Icons.ChevronLeft /> : <Icons.Menu />}
        </button>
      </div>

      {/* Main Navigation Links */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: isOpen ? "0 16px" : "0", flexShrink: 0 }}>
        {mainLinks.map((it) => {
          const active = path === it.href || (it.href !== "/owner" && path.startsWith(it.href));
          return (
            <Link key={it.href} href={it.href}
              style={{
                margin: isOpen ? 0 : "0 12px",
                padding: "14px", borderRadius: 14,
                background: active ? "rgba(247,241,230,.16)" : "transparent",
                fontFamily: "var(--font-head)", fontWeight: 600,
                display: "flex", alignItems: "center", gap: 14,
                whiteSpace: "nowrap", transition: "background 0.2s",
                justifyContent: isOpen ? "flex-start" : "center"
              }}
              title={!isOpen ? it.label : undefined}
            >
              <div style={{ display: "flex", opacity: active ? 1 : 0.7 }}>
                <it.icon />
              </div>
              <span style={{ 
                opacity: isOpen ? 1 : 0, 
                transform: isOpen ? "translateX(0)" : "translateX(-10px)",
                transition: "opacity 0.2s, transform 0.2s",
                display: isOpen ? "block" : "none"
              }}>
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Spacer to push bottom links down */}
      <div style={{ flexGrow: 1 }} />

      {/* Bottom Links & Sign Out */}
      <div style={{ padding: isOpen ? "0 16px" : "0", flexShrink: 0 }}>
        
        {/* Bottom Links (Guide & Settings) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24, padding: isOpen ? 0 : "0" }}>
          {bottomLinks.map((it) => {
            const active = path === it.href;
            return (
              <Link key={it.href} href={it.href}
                style={{
                  margin: isOpen ? 0 : "0 12px",
                  padding: "12px", borderRadius: 14,
                  background: active ? "rgba(247,241,230,.16)" : "transparent",
                  fontFamily: "var(--font-head)", fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 14,
                  whiteSpace: "nowrap", transition: "background 0.2s",
                  justifyContent: isOpen ? "flex-start" : "center",
                  // REMOVED OPACITY HERE SO TEXT IS BRIGHT
                }}
                title={!isOpen ? it.label : undefined}
              >
                <div style={{ display: "flex", opacity: active ? 1 : 0.7 }}>
                  <it.icon />
                </div>
                <span style={{ 
                  opacity: isOpen ? 1 : 0, 
                  transition: "opacity 0.2s",
                  display: isOpen ? "block" : "none",
                  fontSize: "0.9rem"
                }}>
                  {it.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* User Profile & Sign Out */}
        <div style={{ 
          display: "flex", alignItems: "center", gap: 12, marginBottom: 16, padding: isOpen ? "0 4px" : "0",
          justifyContent: isOpen ? "flex-start" : "center"
        }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(247,241,230,0.2)", display: "grid", placeItems: "center", flexShrink: 0, border: "1px solid rgba(247,241,230,0.3)" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--cream)" }}>{name.charAt(0).toUpperCase()}</span>
          </div>
          {isOpen && (
            <div style={{ whiteSpace: "nowrap", overflow: "hidden", display: "grid", gap: 2 }}>
              <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "0.95rem" }}>{name}</div>
              <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Administrator</div>
            </div>
          )}
        </div>

        <button 
          onClick={() => signOut({ callbackUrl: "/owner/login" })}
          style={{ 
            width: "100%", padding: "14px", borderRadius: 14, border: "none", background: "var(--honey)", color: "var(--ink)",
            fontFamily: "var(--font-head)", fontWeight: 700, cursor: "pointer", 
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            margin: isOpen ? 0 : "0 8px",
            flexShrink: 0
          }}
        >
          {isOpen ? "Sign out" : "X"}
        </button>
      </div>
    </aside>
  );
}