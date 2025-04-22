// app/about/layout.tsx
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: "2px solid green", padding: "1rem" }}>
      <h2>About Layout</h2>
      {children}
    </div>
  );
}
