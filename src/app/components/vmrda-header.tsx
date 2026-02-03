import { Menu } from "lucide-react";
import { Button } from "@/app/components/ui/button";

import vmrdaLogo from "@/assets/brand/VMRDA Logo.png";

/* Darker teal on the left for logo contrast; transitions to original palette toward the right */
const HEADER_GRADIENT = "linear-gradient(90deg, #1B6B65 0%, #248277 18%, #3A9A8E 35%, #5FC0B8 50%, #B8D9B0 75%, #F5F8DF 100%)";
const TITLE_COLOR = "#363636";
const MENU_BTN_BG = "#62C9BF";

export function VMRDAHeader() {
  return (
    <header
      className="w-full flex flex-wrap items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 py-3 sm:py-4 shrink-0 min-w-0"
      style={{ background: HEADER_GRADIENT }}
    >
      {/* Left: VMRDA logo */}
      <div className="flex items-center shrink-0 min-w-0">
        <img
          src={vmrdaLogo}
          alt="VMRDA - Face of Change"
          className="h-10 w-auto sm:h-12 object-contain object-left"
        />
      </div>

      {/* Center: Main title - hidden on very small, truncated on larger */}
      <h1
        className="order-last w-full sm:order-none sm:w-auto text-center text-xs sm:text-sm md:text-base lg:text-lg font-semibold flex-1 min-w-0 px-2 sm:px-4 truncate"
        style={{ color: TITLE_COLOR }}
        title="Visakhapatnam Metropolitan Region Development Authority"
      >
        <span className="hidden sm:inline truncate">Visakhapatnam Metropolitan Region Development Authority</span>
        <span className="sm:hidden">VMRDA</span>
      </h1>

      {/* Right: Welcome + menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <span
          className="text-xs sm:text-sm font-medium hidden sm:inline truncate max-w-[120px] md:max-w-none"
          style={{ color: TITLE_COLOR }}
        >
          Welcome, Deepak Thakur
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg text-white hover:opacity-90 hover:bg-white/10 shrink-0"
          style={{ backgroundColor: MENU_BTN_BG }}
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </header>
  );
}
