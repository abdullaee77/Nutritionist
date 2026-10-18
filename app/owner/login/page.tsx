import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <main className="ow-shell" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div className="ow-card" style={{ maxWidth: 420, width: "100%" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: 6 }}>Owner sign in</h1>
        <p style={{ color: "var(--date)", marginBottom: 20 }}>Naflar Health Care — private dashboard.</p>
        <LoginForm />
      </div>
    </main>
  );
}