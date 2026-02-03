import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { VMRDAHeader } from "@/app/components/vmrda-header";
import { THEME } from "@/app/theme";
import { Download, X } from "lucide-react";

export function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(
    () => (location.state as { showBookingConfirmed?: boolean } | null)?.showBookingConfirmed ?? false
  );

  useEffect(() => {
    if (showBookingModal && (location.state as { showBookingConfirmed?: boolean } | null)?.showBookingConfirmed) {
      window.history.replaceState({}, "", "/checkout");
    }
  }, [showBookingModal, location.state]);

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

  const handleDownloadReceipt = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Payment Receipt</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 560px; margin: 24px auto; padding: 16px; color: #363636; }
    h1 { color: #29b6c4; font-size: 1.25rem; }
    h2 { font-size: 1rem; margin-top: 16px; }
    .row { display: flex; justify-content: space-between; margin: 8px 0; font-size: 14px; }
    .label { color: #414042; }
    .value { font-weight: 500; }
    hr { border: none; border-top: 1px solid #d4ebf3; margin: 12px 0; }
    .total { font-weight: 600; font-size: 1.125rem; margin-top: 12px; padding-top: 12px; border-top: 1px solid #d4ebf3; }
    .status { background: #e8f6f5; border: 1px solid #d4ebf3; padding: 12px; border-radius: 8px; margin-top: 16px; font-size: 14px; }
  </style>
</head>
<body>
  <h1>Payment Receipt</h1>
  <p style="color:#414042;font-size:14px;">Transaction Confirmation</p>
  <hr/>
  <div class="row"><span class="label">Transaction ID:</span><span class="value">${txnId}</span></div>
  <div class="row"><span class="label">Date & Time:</span><span class="value">${currentDate}</span></div>
  <div class="row"><span class="label">Order ID:</span><span class="value">#ORD-2026-001</span></div>
  <div class="row"><span class="label">Payment Method:</span><span class="value">Online Payment</span></div>
  <hr/>
  <h2>Customer Details</h2>
  <div class="row"><span class="label">Name:</span><span class="value">Deepak Thakur</span></div>
  <div class="row"><span class="label">Contact:</span><span class="value">9916645647</span></div>
  <div class="row"><span class="label">Email:</span><span class="value">deepakthakur19@gmail.com</span></div>
  <hr/>
  <h2>Booking Details</h2>
  <div class="row"><span class="label">Venue:</span><span class="value">Children's Arena</span></div>
  <div class="row"><span class="label">Venue Type:</span><span class="value">Auditorium in Ground Floor(A/c)</span></div>
  <div class="row"><span class="label">From Date:</span><span class="value">04-03-2026</span></div>
  <div class="row"><span class="label">To Date:</span><span class="value">05-03-2026</span></div>
  <div class="row"><span class="label">Amount per Day:</span><span class="value">₹71,300.00</span></div>
  <hr/>
  <div class="row"><span class="label">Subtotal:</span><span>₹1,42,600.00</span></div>
  <div class="row"><span class="label">Tax (GST 18%):</span><span>₹25,668.00</span></div>
  <div class="row total"><span>Total Paid:</span><span style="color:#29b6c4;">₹1,68,268.00</span></div>
  <div class="status">
    <strong style="color:#3097C7;">Payment Status: Confirmed</strong><br/>
    <span style="color:#414042;">A confirmation email has been sent to your registered email address.</span>
  </div>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${txnId}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleProceedToPay = () => {
    navigate("/payment-summary");
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: THEME.pageBg }}
    >
      {/* Booking confirmed modal – shown after redirect from receipt page */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8"
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${THEME.borderLight}`,
            }}
          >
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ color: THEME.textSecondary }}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h2
              className="text-center text-xl sm:text-2xl font-bold pr-8"
              style={{ color: THEME.tealCardHeader }}
            >
              Your booking is confirmed !!!
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
              <Button
                onClick={handleDownloadReceipt}
                variant="outline"
                className="w-full sm:flex-1"
                style={{ borderColor: THEME.borderLight, color: THEME.tealAccent }}
              >
                <Download className="h-4 w-4 mr-2 shrink-0" />
                Download receipt
              </Button>
              <Button
                onClick={() => {
                  setShowBookingModal(false);
                  navigate("/");
                }}
                className="w-full sm:flex-1 text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: THEME.tealPrimary }}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

      <VMRDAHeader />

      <main className="flex-1 flex items-start justify-center p-3 sm:p-4 md:p-6 w-full min-w-0 max-w-[100vw] box-border">
        <Card
          className="w-full max-w-5xl border-0 shadow-xl overflow-hidden min-w-0"
          style={{ backgroundColor: "#ffffff", borderColor: THEME.borderLight }}
        >
          <CardHeader className="pb-4 px-4 sm:px-6" style={{ borderBottom: `1px solid ${THEME.borderLight}` }}>
            <CardTitle
              className="text-lg sm:text-xl font-semibold"
              style={{ color: THEME.textPrimary }}
            >
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 pt-4 sm:pt-6 px-4 sm:px-6 pb-6">
            {/* Customer Information Table */}
            <div className="overflow-x-auto rounded-lg border -mx-1 sm:mx-0" style={{ borderColor: THEME.borderLight }}>
              <table className="w-full border-collapse min-w-[640px] sm:min-w-0">
                <thead>
                  <tr style={{ backgroundColor: THEME.bgSoft }}>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Name</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Contact No.</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Address</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Email</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Proof Type</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Proof</th>
                    <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Uploaded File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>Deepak Thakur</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>9916645647</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>home</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b break-all" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>deepakthakur19@gmail.com</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>pan</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>dqips5276m</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-sm border-b" style={{ borderColor: THEME.borderLight }}>
                      <Button
                        size="sm"
                        className="rounded-full text-white hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: THEME.tealPrimary }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Booking Information */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm sm:text-base" style={{ color: THEME.textPrimary }}>
                Booking Information
              </h3>
              <div className="overflow-x-auto rounded-lg border -mx-1 sm:mx-0" style={{ borderColor: THEME.borderLight }}>
                <table className="w-full border-collapse min-w-[560px] sm:min-w-0">
                  <thead>
                    <tr style={{ backgroundColor: THEME.bgSoft }}>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Venue Name</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Venue Type</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>From Date</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>To Date</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Amount per Day</th>
                      <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b whitespace-nowrap" style={{ color: THEME.tealAccent, borderColor: THEME.borderLight }}>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>Children's Arena</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b max-w-[140px] sm:max-w-none truncate sm:whitespace-normal" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }} title="Auditorium in Ground Floor(A/c) b/w 8AM - 2 PM">Auditorium in Ground Floor(A/c) b/w 8AM - 2 PM</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b whitespace-nowrap" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>04-03-2026</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b whitespace-nowrap" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>05-03-2026</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>17980</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>35960</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row sm:flex-wrap gap-3 sm:gap-4 pt-4">
              <Button
                onClick={handleClose}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-12 border-2"
                style={{ borderColor: THEME.tealAccent, color: THEME.tealAccent }}
              >
                Close
              </Button>
              <Button
                onClick={handleProceedToPay}
                size="lg"
                className="w-full sm:w-auto sm:ml-auto px-6 sm:px-12 rounded-full text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: THEME.tealPrimary }}
              >
                Confirm Booking
              </Button>
            </div>

            {/* Note */}
            <div className="pt-2">
              <p className="text-sm italic" style={{ color: "#b91c1c" }}>
                <span className="font-semibold not-italic">Note:</span> Electrical & other statutory charges should be separately borne by the applicant / customer
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
