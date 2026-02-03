import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { THEME } from "@/app/theme";
import { ArrowLeft } from "lucide-react";
import vmrdaLogo from "@/VMRDA Logo.png";
import npstLogo from "@/npst_logo_ic.svg";

export function PaymentPage() {
  const navigate = useNavigate();

  const handlePayNow = () => {
    navigate("/contact-details");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: THEME.pageBg }}
    >
      <main className="w-full flex flex-col items-center justify-center py-3 sm:py-4 px-3 sm:px-4 box-border min-w-0">
        <div className="w-full max-w-lg flex flex-col items-center gap-3 sm:gap-4 min-w-0 px-1">
          {/* Back */}
          <div className="flex items-center justify-start w-full min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/checkout")}
              className="h-9 w-9 rounded-full shrink-0"
              style={{ color: THEME.textPrimary }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>

          <Card
            className="w-full border-0 shadow-xl overflow-hidden shrink-0 min-w-0 rounded-t-xl rounded-b-xl"
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
                  Payment Summary
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm" style={{ color: THEME.textSecondary }}>
                  Review your order details before proceeding
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-4 sm:px-6 space-y-4 pt-4 pb-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm" style={{ color: THEME.textSecondary }}>Order ID</span>
                  <span className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>#ORD-2026-001</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm" style={{ color: THEME.textSecondary }}>VMRDA</span>
                  <span className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>Venue Name</span>
                </div>
              </div>

              <Separator className="my-3" style={{ backgroundColor: THEME.borderLight }} />

              <div className="space-y-2">
                <h3 className="text-sm font-semibold mb-2" style={{ color: THEME.textPrimary }}>Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm" style={{ color: THEME.textSecondary }}>Rent</span>
                    <span className="text-sm font-medium" style={{ color: THEME.textPrimary }}>₹20,000.00</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm" style={{ color: THEME.textSecondary }}>Cleaning Charges</span>
                    <span className="text-sm font-medium" style={{ color: THEME.textPrimary }}>₹2,000.00</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm" style={{ color: THEME.textSecondary }}>Security Deposits</span>
                    <span className="text-sm font-medium" style={{ color: THEME.textPrimary }}>₹10,000.00</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm" style={{ color: THEME.textSecondary }}>GST</span>
                    <span className="text-sm font-medium" style={{ color: THEME.textPrimary }}>₹3,960.00</span>
                  </div>
                </div>
              </div>

              <Separator className="my-3" style={{ backgroundColor: THEME.borderLight }} />
              <div
                className="flex justify-between items-center py-3 px-4 rounded-lg w-full box-border"
                style={{ backgroundColor: THEME.bgSoft }}
              >
                <span className="text-base font-semibold" style={{ color: THEME.textPrimary }}>Total Amount</span>
                <span className="text-lg font-bold" style={{ color: THEME.tealCardHeader }}>₹35,960.00</span>
              </div>
            </CardContent>

            <CardFooter className="p-0 !pb-0 flex flex-col shrink-0">
              <Button
                onClick={handlePayNow}
                className="w-full h-11 rounded-t-none rounded-b-xl text-white hover:opacity-90 transition-opacity"
                size="lg"
                style={{ backgroundColor: THEME.tealPrimary }}
              >
                Pay Now
              </Button>
            </CardFooter>
          </Card>

          <p
            className="w-full max-w-lg flex items-center justify-between gap-2 text-sm sm:text-base italic"
            style={{ color: THEME.textSecondary }}
          >
            <img
              src="https://go-assets.ibcdn.com/u/MMT/images/1719381692923-safePayment.png"
              alt="Safe Payment"
              className="h-7 sm:h-8 w-auto object-contain shrink-0"
            />
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
