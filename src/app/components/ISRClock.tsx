// src/app/components/ISRClock.tsx

export default async function ISRClock() {
  try {
    const res = await fetch(
      "https://worldtimeapi.org/api/timezone/Asia/Seoul",
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      // 응답 코드가 200이 아닐 경우
      throw new Error(`Fetch 실패: 상태 코드 ${res.status}`);
    }

    const data = await res.json();

    return (
      <div style={{ background: "#f5fffa", padding: "1rem" }}>
        <h2>🕒 ISR Clock (10초)</h2>
        <p>{data.datetime}</p>
      </div>
    );
  } catch (err) {
    console.error("🚨 [ISRClock] fetch error:", err);

    return (
      <div style={{ background: "#ffecec", padding: "1rem", color: "#b20000" }}>
        <h2>🕒 ISR Clock (에러)</h2>
        <p>⚠️ 시간 정보를 불러오지 못했습니다.</p>
      </div>
    );
  }
}
