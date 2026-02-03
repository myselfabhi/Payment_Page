import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { THEME } from "@/app/theme";
import { ShoppingCart } from "lucide-react";

export function StartPage() {
  const navigate = useNavigate();

  const handlePayNow = () => {
    navigate("/payment-summary");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: THEME.pageBg }}
    >
      <main className="w-full flex items-center justify-center p-3 sm:p-4">
        <Card
          className="w-full max-w-md shadow-xl border-0 min-w-0 mx-1"
          style={{ backgroundColor: "#ffffff", borderColor: THEME.borderLight }}
        >
          <CardHeader className="text-center px-4 sm:px-6 pt-4 sm:pt-6 pb-4" style={{ borderBottom: `1px solid ${THEME.borderLight}` }}>
            <div className="flex justify-center mb-3 sm:mb-4">
              <div
                className="p-3 sm:p-4 rounded-full"
                style={{ backgroundColor: THEME.tealPrimary }}
              >
                <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl" style={{ color: THEME.textPrimary }}>
              Welcome to Checkout
            </CardTitle>
            <CardDescription className="text-sm" style={{ color: THEME.textSecondary }}>
              Complete your purchase securely
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-4 sm:px-6 pt-6">
            <div
              className="rounded-lg p-4 sm:p-6 text-center"
              style={{ backgroundColor: THEME.bgSoft }}
            >
              <p className="text-xs sm:text-sm mb-2" style={{ color: THEME.textSecondary }}>
                Your Cart Total
              </p>
              <p className="text-2xl sm:text-4xl font-semibold" style={{ color: THEME.tealAccent }}>
                ₹35,960.00
              </p>
            </div>
            <div className="space-y-2 text-xs sm:text-sm" style={{ color: THEME.textSecondary }}>
              <div className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: THEME.tealPrimary }}
                />
                <span>Secure payment gateway</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: THEME.tealPrimary }}
                />
                <span>Multiple payment options</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: THEME.tealPrimary }}
                />
                <span>Fast & easy checkout</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-4 sm:px-6 pt-0 pb-0">
            <Button
              onClick={handlePayNow}
              className="w-full h-11 rounded-full text-white hover:opacity-90 transition-opacity"
              size="lg"
              style={{ backgroundColor: THEME.tealPrimary }}
            >
              Pay Now
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
