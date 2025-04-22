// src/app/layout.tsx
import "./globals.css";

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({
  children,
  modal, // 병렬 라우트 슬롯 이름과 일치해야 함
}: LayoutProps) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
