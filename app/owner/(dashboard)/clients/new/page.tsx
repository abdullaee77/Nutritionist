import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import NewClientForm from "./NewClientForm";
export const instant = false; 
export default async function NewClientPage() {
  const session = await auth();
  if (!session) redirect("/owner/login");

  return (
    <div style={{ maxWidth: 620 }}>
      <h1 style={{ fontSize: "2.2rem", marginBottom: 14 }}>New client</h1>
      <div className="ow-card">
        <NewClientForm />
      </div>
    </div>
  );
}