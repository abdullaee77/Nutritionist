import { Suspense } from "react";
import StudioClient from "./StudioClient";

export default function StudioPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading Studio...</div>}>
      <StudioClient />
    </Suspense>
  );
}