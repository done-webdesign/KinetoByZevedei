import { useState } from "react";
import { Menu, X } from "lucide-react"; // optional

export default function MobileDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToDespre = () => {
    const target = document.getElementById("despre-zevedei");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <nav className=" z-index top-0 fixed w-full bg-[var(--primary)] shadow-md">
      {/* Header bar */}
      <div className="flex  justify-between items-center h-28 px-11 py-2.5 ">
        <a href="/" className="self-end">
          {" "}
          <img src="/small-logo.jpg" alt="Logo" className="h-20 self-end" />
        </a>

        <a
          onClick={() => setIsOpen(!isOpen)}
          className="text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </a>
      </div>

      {/* Dropdown menu */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 py-6" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-6 py-6">
          <a
            href="/servicii"
            onClick={() => setIsOpen(false)}
            style={{
              color: "var(--text)",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 300,
              lineHeight: "normal",
              letterSpacing: "-0.205px",
            }}
          >
            Serviciile noastre
          </a>

          <a
            href="/#despre-zevedei"
            style={{
              color: "var(--text)",
              textAlign: "center",
              fontSize: 16,
              fontWeight: 300,
              lineHeight: "normal",
              letterSpacing: "-0.205px",
            }}
          >
            Despre Zevedei
          </a>
          <a
            href="/servicii#contact"
            style={{
              color: "var(--text)",
              textAlign: "center",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: "24px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
            className="bg-[var(--assets)]  px-2.5 py-2.5 rounded-full shadow"
            onClick={() => setIsOpen(false)}
          >
            CONTACTEAZĂ-NE
          </a>
        </div>
      </div>
    </nav>
  );
}
