export function Footer() {
  return (
    <footer
      className="mt-16 py-4 pb-16 px-4"
      style={{ background: "var(--bg)", position: "relative", zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-mono text-xs" style={{ color: "#d4cfc5" }}>
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
