// 서버 컴포넌트 – 현재 시간 출력
export default async function ServerTime() {
  const now = new Date().toISOString();

  return (
    <div>
      <h2>🕒 현재 시간 (서버 기준)</h2>
      <p>{now}</p>
    </div>
  );
}
