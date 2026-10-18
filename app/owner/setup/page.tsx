import { redirect } from "next/navigation";
import { db } from "@/lib/db/client";
import { practitioners } from "@/lib/db/schema";
import SetupForm from "./SetupForm";

export default async function SetupPage() {
  const existing = await db.select({ id: practitioners.id }).from(practitioners).limit(1);
  if (existing.length > 0) redirect("/owner/login");

  return (
    <main className="ow-shell" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div className="ow-card" style={{ maxWidth: 460, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 6 }}>Set up your owner account</h1>
        <p style={{ color: "var(--date)", marginBottom: 20 }}>
          One-time setup. Choose a username and a password (min 8 characters).
          You can change them later in Settings.
        </p>
        <SetupForm />
      </div>
    </main>
  );
}