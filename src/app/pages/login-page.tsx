import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import loginBg from "@/assets/misc/login_bg.jpg";
import { ArrowRight, Facebook, Youtube } from "lucide-react";

const ORANGE = "#e85d04";

export function LoginPage() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/checkout");
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-no-repeat px-4"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-4 sm:gap-5">
        {/* Top: Welcome to VMRDA + social icons */}
        <div
          className="w-full rounded-xl px-6 py-5 sm:py-6 flex flex-col items-center text-center"
          style={{ backgroundColor: "rgba(232, 93, 4, 0.85)" }}
        >
          <p className="text-white text-sm sm:text-base font-semibold">Welcome to</p>
          <h1 className="text-white text-2xl sm:text-3xl font-bold mt-0.5">VMRDA</h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <a href="#" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors" aria-label="X">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors" aria-label="Instagram">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom: Book your venue now card */}
        <div className="w-full rounded-xl border bg-white px-6 py-5 sm:py-6 flex flex-col items-center text-center shadow-lg" style={{ borderColor: "#d1d5db" }}>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Book your venue now</h2>
          <p className="text-sm text-gray-600 mt-1">Visit our website to book your venue now</p>
          <Button
            type="button"
            onClick={handleBookNow}
            className="mt-4 w-full sm:w-auto min-w-[160px] h-11 text-white font-semibold rounded-lg transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
            style={{ backgroundColor: ORANGE }}
          >
            Book Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
