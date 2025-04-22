// src/app/@modal/contact/page.tsx
export default function ContactModal() {
  return (
    <div
      style={{
        position: "fixed",
        top: "30%",
        left: "30%",
        width: "40%",
        background: "white",
        border: "2px solid black",
        padding: "1rem",
        zIndex: 1000,
      }}
    >
      <h2>📬 Contact Modal</h2>
      <p>Get in touch with us!</p>
    </div>
  );
}
