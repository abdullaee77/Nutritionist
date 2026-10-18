"use client";
import { useState, useRef } from "react";
import { toJpeg } from "html-to-image";

const TEMPLATES = [
  { id: "quote", name: "Quote Card (Fulfill)" },
  { id: "tip-feed", name: "Daily Tip (Feed)" },
  { id: "tip-balance", name: "Daily Tip (Balance)" },
  { id: "new-plan", name: "Program Announcement" },
];

export default function StudioClient() {
  const [template, setTemplate] = useState("quote");
  const [format, setFormat] = useState<"square" | "story">("square");
  const [headline, setHeadline] = useState("Feed the Purpose, Balance the Life.");
  const [body, setBody] = useState("Evidence-based clinical nutrition, joined with the moderation and routine of the Sunnah. Plain words, calm tone, one clear next step.");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const isQuote = template === "quote";
  const isTipFeed = template === "tip-feed";
  const isTipBalance = template === "tip-balance";
  const isPlan = template === "new-plan";

  const bgColor = isQuote || isPlan ? "var(--pom)" : "var(--cream)";
  const textColor = isQuote || isPlan ? "var(--cream)" : "var(--ink)";
  const labelColor = isQuote || isPlan ? "var(--honey)" : "var(--date)";

  // Scale variable for the preview
  const scaleValue = format === "square" ? 0.35 : 0.2;

  async function downloadImage() {
    if (!canvasRef.current) return;
    setLoading(true);
    
    try {
      // 1. Get the scaled wrapper (the parent of the canvas)
      const wrapper = canvasRef.current.parentElement;
      
      // 2. Temporarily remove the scale so it captures full 1080x1080
      if (wrapper) wrapper.style.transform = "none";
      
      const dataUrl = await toJpeg(canvasRef.current, { quality: 0.95, pixelRatio: 1 });
      
      // 3. Restore the scale for the UI
      if (wrapper) wrapper.style.transform = `scale(${scaleValue})`;
      
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Naflar_${template}_${format}_${Date.now()}.jpg`;
      a.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    }
    setLoading(false);
  }

  const canvasWidth = 1080;
  const canvasHeight = format === "square" ? 1080 : 1920;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 40, alignItems: "start", width: "100%" }}>
      
      {/* CONTROLS PANEL */}
      <div className="ow-card" style={{ display: "grid", gap: 20, padding: 24 }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: 8 }}>Instagram Studio</h2>
        
        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: "0.9rem" }}>
          Layout Format
          <select 
            value={format} 
            onChange={(e) => setFormat(e.target.value as "square" | "story")}
            style={{ font: "inherit", padding: "14px 16px", borderRadius: 14, border: "1.5px solid #e2d6bf", background: "var(--cream)", color: "var(--ink)" }}
          >
            <option value="square">Square Post (1080 x 1080)</option>
            <option value="story">Story / Reel (1080 x 1920)</option>
          </select>
        </label>

        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: "0.9rem" }}>
          Template Theme
          <select 
            value={template} 
            onChange={(e) => setTemplate(e.target.value)}
            style={{ font: "inherit", padding: "14px 16px", borderRadius: 14, border: "1.5px solid #e2d6bf", background: "var(--cream)", color: "var(--ink)" }}
          >
            {TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </label>

        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: "0.9rem" }}>
          Headline
          <textarea 
            rows={3} 
            value={headline} 
            onChange={(e) => setHeadline(e.target.value)} 
            style={{ font: "inherit", padding: "14px 16px", borderRadius: 14, border: "1.5px solid #e2d6bf", background: "var(--cream)", color: "var(--ink)", resize: "vertical" }}
          />
        </label>

        <label style={{ display: "grid", gap: 6, fontWeight: 600, fontSize: "0.9rem" }}>
          Body Text
          <textarea 
            rows={5} 
            value={body} 
            onChange={(e) => setBody(e.target.value)} 
            style={{ font: "inherit", padding: "14px 16px", borderRadius: 14, border: "1.5px solid #e2d6bf", background: "var(--cream)", color: "var(--ink)", resize: "vertical" }}
          />
        </label>

        <button className="btn btn-primary" onClick={downloadImage} disabled={loading} style={{ marginTop: 10 }}>
          {loading ? "Generating JPG..." : "Download Image"}
        </button>
      </div>

      {/* LIVE CANVAS PREVIEW */}
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        width: "100%", 
        minHeight: "400px",
        overflow: "hidden" 
      }}>
        
        {/* 
          The outer container is constrained to the screen width.
          We use aspect-ratio to maintain the shape, and overflow:hidden to crop nothing.
        */}
        <div style={{ 
          width: "100%", 
          maxWidth: canvasWidth,
          aspectRatio: format === "square" ? "1 / 1" : "9 / 16",
          position: "relative",
          display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          
          {/* The actual scaled canvas */}
          <div style={{ 
            width: canvasWidth, 
            height: canvasHeight, 
            transform: `scale(${scaleValue})`, 
            transformOrigin: "center center",
            boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
            borderRadius: 8,
            overflow: "hidden",
            position: "absolute" // Removes it from the document flow so it doesn't break the phone width
          }}>
            
            <div 
              ref={canvasRef}
              style={{
                width: canvasWidth, height: canvasHeight, 
                background: bgColor, color: textColor,
                fontFamily: "var(--font-body)", position: "relative", overflow: "hidden",
                display: "flex", flexDirection: "column"
              }}
            >
              <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: "50%", background: "var(--sage)", filter: "blur(80px)", opacity: 0.6 }} />
              <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "var(--honey)", filter: "blur(80px)", opacity: 0.5 }} />

              <div style={{ margin: "60px 60px 0", padding: "20px 40px", background: isQuote || isPlan ? "rgba(247,241,230,0.1)" : "rgba(255,255,255,0.7)", backdropFilter: "blur(10px)", borderRadius: 999, border: `1px solid ${isQuote || isPlan ? "rgba(247,241,230,0.2)" : "rgba(168,71,90,0.1)"}`, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
                <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "0.15em", color: isQuote || isPlan ? "var(--cream)" : "var(--pom)" }}>NAFLAR</div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.1em", color: labelColor, background: isQuote || isPlan ? "rgba(227,184,102,0.2)" : "var(--cream-2)", padding: "10px 20px", borderRadius: 999 }}>
                  {isTipFeed ? "FEED" : isTipBalance ? "BALANCE" : isPlan ? "NEW PROGRAM" : "FULFILL"}
                </div>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 100px", zIndex: 10 }}>
                
                {isQuote && (
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 200, color: "var(--honey)", opacity: 0.4, lineHeight: 0.5, marginBottom: 40, marginLeft: -10 }}>“</div>
                )}

                <div style={{ 
                  fontFamily: "var(--font-display)", fontSize: 80, lineHeight: 1.1, marginBottom: 30, fontWeight: 600, letterSpacing: "-0.02em",
                  color: isTipFeed ? "var(--pom)" : isTipBalance ? "var(--pom)" : textColor
                }}>
                  {headline}
                </div>

                <div style={{ width: 80, height: 4, background: "var(--honey)", borderRadius: 4, marginBottom: 30 }} />

                <div style={{ fontSize: 36, lineHeight: 1.5, opacity: 0.9, maxWidth: 850, fontWeight: 400 }}>
                  {body}
                </div>
              </div>

              <div style={{ padding: "40px 60px", borderTop: `1px solid ${isQuote || isPlan ? "rgba(247,241,230,0.1)" : "rgba(42,58,48,0.1)"}`, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 600, zIndex: 10, color: labelColor }}>
                <div>naflarhealth.com</div>
                <div style={{ display: "flex", gap: 20 }}>
                  <span>Feed</span> · <span>Balance</span> · <span>Fulfill</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}