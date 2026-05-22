import dynamic from "next/dynamic";
const StoreExplorer = dynamic(() => import("@/components/StoreExplorer"), { ssr: false });
export default function ExplorerTestPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>3D Store Explorer — Phase 1 test</h1>
      <StoreExplorer />
    </main>
  );
}
