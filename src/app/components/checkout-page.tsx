import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { VMRDAHeader } from "@/app/components/vmrda-header";
import { THEME } from "@/app/theme";

export function CheckoutPage() {
  const navigate = useNavigate();

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
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>71300</td>
                      <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b" style={{ color: THEME.textSecondary, borderColor: THEME.borderLight }}>142600</td>
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
