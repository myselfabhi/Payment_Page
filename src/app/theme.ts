/**
 * VMRDA / Fintech theme tokens (aligned with Confirm Booking / page 1).
 * Use these across all pages for a consistent look.
 */
export const THEME = {
  /** Primary teal - CTAs, links, total amount */
  tealPrimary: "#62C9BF",
  tealPrimaryHover: "#23a0ad",
  /** Accent teal - table headers, secondary emphasis */
  tealAccent: "#3097C7",
  /** Card/merchant header teal */
  tealCardHeader: "#29b6c4",
  /** Light border and soft backgrounds (VMRDA teal tint) */
  borderLight: "#d4ebf3",
  /** Soft background for Total Amount strip, inputs, highlights – same hue as header gradient */
  bgSoft: "#e8f6f5",
  /** Page background gradient (cream → light grey) */
  pageBg: "linear-gradient(180deg, #F5F8DF 0%, #f8faf5 30%, #f0f9fb 100%)",
  /** Text */
  textPrimary: "#363636",
  textSecondary: "#414042",
} as const;
