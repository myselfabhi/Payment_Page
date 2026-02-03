import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { VMRDAHeader } from "@/app/components/vmrda-header";
import { THEME } from "@/app/theme";
import { downloadReceipt } from "@/app/receipt";
import { Download, X } from "lucide-react";

type CheckoutLocationState = {
  showBookingConfirmed?: boolean;
  receiptTxnId?: string;
  receiptDate?: string;
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? null) as CheckoutLocationState | null;
  const [showBookingModal, setShowBookingModal] = useState(() => state?.showBookingConfirmed ?? false);

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
  const fallbackTxnId = useMemo(
    () => `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    []
  );

  const receiptTxnId = state?.receiptTxnId ?? fallbackTxnId;
  const receiptDate = state?.receiptDate ?? currentDate;

  useEffect(() => {
    if (showBookingModal && state?.showBookingConfirmed) {
      window.history.replaceState({}, "", "/checkout");
    }
  }, [showBookingModal, state?.showBookingConfirmed]);

  const handleDownloadReceipt = () => {
    downloadReceipt(receiptTxnId, receiptDate);
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fintech-fade-in"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            className="relative w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 animate-fintech-scale-in"
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
          className="w-full max-w-5xl border-0 shadow-xl overflow-hidden min-w-0 animate-fintech-fade-in-up"
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
