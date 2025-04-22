// src/app/components/SSRClock.tsx
export default async function SSRClock() {
  const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Seoul", {
    cache: "no-store", // 매 요청마다 다시 가져오기 (SSR)
  });
  const data = await res.json();

  return (
    <div style={{ background: "#fff0f5", padding: "1rem" }}>
      <h2>🔁 SSR Clock</h2>
      <p>{data.datetime}</p>
    </div>
  );
}
