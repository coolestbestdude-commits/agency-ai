export default function Navbar() {
  return (
    <div
      className="w-full flex items-center justify-between px-6 shadow-md"
      style={{
        background: "linear-gradient(90deg, #fff9c4, #ffe0b2)",
        paddingTop: "6px",
        paddingBottom: "6px",
      }}
    >
      {/* Small Logo */}
    <img
  src="/Massage Logo.jpg"
  alt="Massage Logo"
  className="ml-2"
  style={{
    height: "60px",
    width: "auto",
    maxHeight: "60px",
    maxWidth: "60px",
    objectFit: "contain",
  }}
/>



      {/* Pricing Button */}
      <a
        href="/pricing"
        className="shadow-md transition hover:bg-blue-700"
        style={{
          backgroundColor: "#1976d2",
          color: "white",
          fontWeight: "bold",
          textDecoration: "none",
          borderRadius: "12px",
          padding: "10px 20px",
          display: "inline-block",
        }}
      >
        Pricing
      </a>
    </div>
  );
}
