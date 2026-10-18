import { Suspense } from "react";
import ExportClient from "./ExportClient";

export const instant = false;

export default function ExportPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Loading export tools...</div>}>
      <ExportClient />
    </Suspense>
  );
}