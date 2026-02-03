import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { THEME } from "@/app/theme";
import { RECEIPT_DATA, downloadReceipt } from "@/app/receipt";
import { CheckCircle2, Download, Printer } from "lucide-react";

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(6);

  const currentDate = useMemo(
    () =>
      new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    []
  );
  const txnId = useMemo(
    () => `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    []
  );

  useEffect(() => {
    if (countdown === 0) {
      navigate("/checkout", {
        state: {
          showBookingConfirmed: true,
          receiptTxnId: txnId,
          receiptDate: currentDate,
        },
      });
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    downloadReceipt(txnId, currentDate);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: THEME.pageBg }}
    >
      <main className="w-full flex items-center justify-center p-3 sm:p-4 min-w-0 box-border">
        <Card
          className="w-full max-w-2xl min-w-0 mx-1 border-0 shadow-xl animate-fintech-fade-in-up"
          style={{ backgroundColor: "#ffffff", borderColor: THEME.borderLight }}
        >
          <CardHeader className="text-center px-4 sm:px-6 pt-4 sm:pt-6 pb-4" style={{ borderBottom: `1px solid ${THEME.borderLight}` }}>
            <div className="flex justify-center mb-3 sm:mb-4">
              <div
                className="p-3 sm:p-4 rounded-full animate-fintech-success-pop"
                style={{ backgroundColor: THEME.bgSoft }}
              >
                <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16" style={{ color: THEME.tealCardHeader }} />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl" style={{ color: THEME.tealCardHeader }}>
              Payment Successful!
            </CardTitle>
            <p className="text-sm mt-2" style={{ color: THEME.textSecondary }}>
              Your payment has been processed successfully
            </p>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pt-6 pb-0">
            {/* Payment Receipt */}
            <div
              className="border rounded-lg p-4 sm:p-6 space-y-4 overflow-x-auto"
              style={{ backgroundColor: "#ffffff", borderColor: THEME.borderLight }}
            >
              <div className="text-center border-b pb-3 sm:pb-4" style={{ borderColor: THEME.borderLight }}>
                <h2 className="text-lg sm:text-xl font-semibold" style={{ color: THEME.textPrimary }}>Payment Receipt</h2>
                <p className="text-xs sm:text-sm mt-1" style={{ color: THEME.textSecondary }}>Transaction Confirmation</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span style={{ color: THEME.textSecondary }}>Transaction ID:</span>
                  <span className="font-medium" style={{ color: THEME.textPrimary }}>{txnId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: THEME.textSecondary }}>Date & Time:</span>
                  <span className="font-medium" style={{ color: THEME.textPrimary }}>{currentDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: THEME.textSecondary }}>Order ID:</span>
                  <span className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: THEME.textSecondary }}>Payment Method:</span>
                  <span className="font-medium" style={{ color: THEME.textPrimary }}>Online Payment</span>
                </div>
              </div>

              <Separator style={{ backgroundColor: THEME.borderLight }} />

              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base" style={{ color: THEME.textPrimary }}>Customer Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>
                    <span style={{ color: THEME.textSecondary }}>Name:</span>
                    <p className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.customerName}</p>
                  </div>
                  <div>
                    <span style={{ color: THEME.textSecondary }}>Contact:</span>
                    <p className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.customerContact}</p>
                  </div>
                  <div className="col-span-2">
                    <span style={{ color: THEME.textSecondary }}>Email:</span>
                    <p className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.customerEmail}</p>
                  </div>
                </div>
              </div>

              <Separator style={{ backgroundColor: THEME.borderLight }} />

              <div className="space-y-2">
                <h3 className="font-semibold text-sm sm:text-base" style={{ color: THEME.textPrimary }}>Booking Details</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span style={{ color: THEME.textSecondary }}>Venue:</span>
                    <span className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: THEME.textSecondary }}>Venue Type:</span>
                    <span className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.venueType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: THEME.textSecondary }}>From Date:</span>
                    <span className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.fromDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: THEME.textSecondary }}>To Date:</span>
                    <span className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.toDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: THEME.textSecondary }}>Amount per Day:</span>
                    <span className="font-medium" style={{ color: THEME.textPrimary }}>{RECEIPT_DATA.amountPerDay}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-lg pt-2 border-t" style={{ borderColor: THEME.borderLight }}>
                  <span className="font-semibold" style={{ color: THEME.textPrimary }}>Total Paid:</span>
                  <span className="font-semibold" style={{ color: THEME.tealCardHeader }}>{RECEIPT_DATA.totalPaid}</span>
                </div>
              </div>

              <div
                className="rounded-lg p-3 text-sm"
                style={{ backgroundColor: THEME.bgSoft, border: `1px solid ${THEME.borderLight}` }}
              >
                <p className="font-semibold" style={{ color: THEME.tealAccent }}>Payment Status: Confirmed</p>
                <p className="text-xs mt-1" style={{ color: THEME.textSecondary }}>A confirmation email has been sent to your registered email address.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={handlePrint}
                className="w-full sm:flex-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderColor: THEME.borderLight, color: THEME.tealAccent }}
              >
                <Printer className="h-4 w-4 mr-2 shrink-0" />
                Print
              </Button>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="w-full sm:flex-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{ borderColor: THEME.borderLight, color: THEME.tealAccent }}
              >
                <Download className="h-4 w-4 mr-2 shrink-0" />
                Download
              </Button>
            </div>

            <p className="text-center text-sm pb-4" style={{ color: THEME.textSecondary }}>
              Redirecting to checkout in <span className="font-semibold animate-fintech-pulse-soft" style={{ color: THEME.tealCardHeader }}>{countdown}</span> seconds...
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
