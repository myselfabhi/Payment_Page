import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { THEME } from "@/app/theme";
import { ArrowLeft } from "lucide-react";
import vmrdaLogo from "@/assets/brand/VMRDA Logo.png";
import npstLogo from "@/assets/brand/npst_logo_ic.svg";
import footerPciDss from "@/assets/footer/PCI_DSS_logo.png";
import footerVerisign from "@/assets/footer/verisign_verified_logo.png";
import footerVisa from "@/assets/footer/Visa_logo.png";
import footerMastercard from "@/assets/footer/mastercard_securecode_logo.png";

export function ContactDetailsPage() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/payment-mode");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: THEME.pageBg }}
    >
      <main className="w-full flex flex-col items-center justify-center py-3 sm:py-4 px-3 sm:px-4 box-border min-w-0">
        <div className="w-full max-w-lg flex flex-col items-center gap-3 sm:gap-4 min-w-0 px-1">
          {/* Back */}
          <div className="flex items-center justify-start w-full min-w-0 animate-fintech-fade-in-up">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/payment-summary")}
              className="h-9 w-9 rounded-full shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{ color: THEME.textPrimary }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          <Card
            className="w-full border-0 shadow-xl overflow-hidden shrink-0 min-w-0 rounded-t-xl rounded-b-xl animate-fintech-fade-in-up animate-fintech-stagger-2"
            style={{ borderColor: THEME.borderLight, backgroundColor: "#ffffff" }}
          >
            {/* VMRDA logo strip – top of card, rounded top only, joined to content below */}
            <div
              className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 rounded-t-xl"
              style={{ background: "linear-gradient(135deg, #3d9a92 0%, #5eb5ad 50%, #7ec9c2 100%)" }}
            >
              <img
                src={vmrdaLogo}
                alt="VMRDA - Face of Change"
                className="h-12 w-auto sm:h-14 object-contain"
              />
            </div>

            <CardHeader className="pb-2 pt-2 sm:pt-3 px-4 sm:px-6 border-b rounded-none" style={{ borderColor: THEME.borderLight }}>
              <div className="space-y-0.5">
                <CardTitle className="text-lg sm:text-xl font-semibold" style={{ color: THEME.textPrimary }}>
                  Contact details
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm" style={{ color: THEME.textSecondary }}>
                  Enter mobile & email to continue
                </CardDescription>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="px-4 sm:px-6 space-y-4 pt-4 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium" style={{ color: THEME.textPrimary }}>
                    Mobile number
                  </Label>
                  <div className="flex rounded-md border overflow-hidden" style={{ borderColor: THEME.borderLight }}>
                    <div
                      className="flex items-center gap-1 px-3 text-sm font-medium shrink-0 border-r"
                      style={{ backgroundColor: THEME.bgSoft, borderColor: THEME.borderLight, color: THEME.textSecondary }}
                    >
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 h-10"
                      style={{ backgroundColor: "#ffffff" }}
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a 10-digit mobile number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium" style={{ color: THEME.textPrimary }}>
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10"
                    style={{ borderColor: THEME.borderLight }}
                    required
                  />
                </div>
              </CardContent>

              <CardFooter className="p-0 !pb-0 flex flex-col shrink-0">
                <Button
                  type="submit"
                  className="w-full h-11 rounded-t-none rounded-b-xl text-white hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                  size="lg"
                  style={{ backgroundColor: THEME.tealPrimary }}
                >
                  Continue
                </Button>
              </CardFooter>
            </form>
          </Card>

          <p
            className="w-full max-w-lg flex items-center justify-between gap-2 text-sm sm:text-base italic"
            style={{ color: THEME.textSecondary }}
          >
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <img src={footerPciDss} alt="PCI DSS" className="h-5 sm:h-6 w-auto object-contain" />
              <img src={footerVerisign} alt="Verified" className="h-5 sm:h-6 w-auto object-contain" />
              <img src={footerVisa} alt="Visa" className="h-5 sm:h-6 w-auto object-contain" />
              <img src={footerMastercard} alt="Mastercard SecureCode" className="h-5 sm:h-6 w-auto object-contain" />
            </div>
            <span className="flex items-center gap-1.5 ml-auto">
              <span>powered by</span>
              <img src={npstLogo} alt="NPST" className="h-4 sm:h-5 w-auto object-contain" />
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
