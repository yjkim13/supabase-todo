// src/app/components/SSGClock.tsx
export default async function SSGClock() {
  const now = new Date().toISOString();

  return (
    <div style={{ background: "#f0f8ff", padding: "1rem" }}>
      <h2>📦 SSG Clock</h2>
      <p>{now}</p>
    </div>
  );
}
