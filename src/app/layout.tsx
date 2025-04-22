// src/app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
  modal, // 병렬 라우트 슬롯 이름과 일치해야 함
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal ?? null}
      </body>
    </html>
  );
}
