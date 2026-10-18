"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteClientButton({ clientId, clientName }: { clientId: string, clientName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    // Show a native browser confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete ${clientName}?\n\nThis will erase ALL their records, forms, and exports. This cannot be undone.`
    );
    
    if (!confirmDelete) return;

    setLoading(true);
    const res = await fetch(`/api/owner/clients/${clientId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // Navigate back to the clients list upon success
      router.push("/owner/clients");
      router.refresh();
    } else {
      alert("Failed to delete client. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      style={{
        background: "transparent", border: "1px solid #a8475a", color: "#a8475a",
        padding: "8px 16px", borderRadius: 999, fontSize: "0.85rem", fontWeight: 600,
        cursor: "pointer", transition: "background 0.2s"
      }}
      onMouseOver={(e) => { e.currentTarget.style.background = "#ffe8e8"; }}
      onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      {loading ? "Deleting..." : "Delete Client"}
    </button>
  );
}