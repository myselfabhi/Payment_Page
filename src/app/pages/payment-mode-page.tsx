import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ChevronDown, ChevronRight, CreditCard, Building2, Smartphone, Wallet, Loader2, CheckCircle2 } from "lucide-react";
import { THEME } from "@/app/theme";
import vmrdaLogo from "@/assets/brand/VMRDA Logo.png";
import npstLogo from "@/assets/brand/npst_logo_ic.svg";
import bankCanara from "@/assets/banks/CANBK.NS.png";
import bankEnkash from "@/assets/banks/Enkash.png";
import bankHdfc from "@/assets/banks/HDFC.png";
import bankIndian from "@/assets/banks/INDIANB.NS.png";
import bankIob from "@/assets/banks/indian-overseas logo.png";
import bankRazorpay from "@/assets/banks/razorpay-logo.png";
import bankCashfree from "@/assets/banks/Cashfree logo.png";
import tpapBhim from "@/assets/tpap/icons8-bhim-48.png";
import tpapGooglePay from "@/assets/tpap/icons8-google-pay-48.png";
import tpapPaytm from "@/assets/tpap/icons8-paytm-48.png";
import tpapPhonePe from "@/assets/tpap/icons8-phone-pe-48.png";
import tpapTez from "@/assets/tpap/download (1).png";
import tpapJioMoney from "@/assets/tpap/download.png";
import tpapFreecharge from "@/assets/tpap/png-transparent-freecharge-gurugram-mobile-phones-payment-customer-service-sbi-mutual-fund-orange-logo-payment.png";
import tpapAmazonPay from "@/assets/tpap/id3U2wm0WO_1770115495327.png";
import tpapMobikwik from "@/assets/tpap/idIw1jTu4S_1770115582105.png";
import ruPaySvg from "@/assets/card/RuPay.png";
import bobLogo from "@/assets/banks/BOB.png";
import kotakLogo from "@/assets/banks/KOTAK.png";
import sbiLogo from "@/assets/banks/SBI-logo.png";
import footerPciDss from "@/assets/footer/PCI_DSS_logo.png";
import footerVerisign from "@/assets/footer/verisign_verified_logo.png";
import footerVisa from "@/assets/footer/Visa_logo.png";
import footerMastercard from "@/assets/footer/mastercard_securecode_logo.png";

// Payment gateway / card network logos (Visa, Mastercard from CDN; RuPay from local)
const CARD_LOGOS = {
  visa: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/120px-Visa_Inc._logo.svg.png",
  mastercard: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/120px-Mastercard-logo.svg.png",
  rupay: ruPaySvg,
};

// Bank logos from Wikimedia Commons
const BANK_LOGOS: Record<string, string> = {
  hdfc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/120px-HDFC_Bank_Logo.svg.png",
  icici: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/120px-ICICI_Bank_Logo.svg.png",
  axis: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/120px-Axis_Bank_logo.svg.png",
  kotak: kotakLogo,
  bob: bobLogo,
  sbi: sbiLogo,
};

// UPI QR code image (generated from UPI string for demo)
const UPI_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent("upi://pay?pa=merchant@paytm&pn=Sample%20Store&am=6468&cu=INR")}`;
// Netbanking QR (demo)
const NETBANKING_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("https://pay.example.com/nb/qr?amount=6468&ref=NB2024")}`;

// UPI app logos from TPAP Logos (Scan the QR section – left to right)
const UPI_APP_LOGOS = [
  { src: tpapGooglePay, alt: "Google Pay", id: "gpay" },
  { src: tpapPhonePe, alt: "PhonePe", id: "phonepe" },
  { src: tpapPaytm, alt: "Paytm", id: "paytm" },
  { src: tpapBhim, alt: "BHIM", id: "bhim" },
  { src: tpapTez, alt: "TPAP", id: "tez" },
];

// Wallet logos from TPAP Logos (Wallet tab – order: Paytm, PhonePe, Amazon Pay, FreeCharge, Mobikwik, Jio Money)
const WALLET_LOGOS = [
  { src: tpapPaytm, alt: "Paytm", id: "paytm" },
  { src: tpapPhonePe, alt: "PhonePe", id: "phonepe" },
  { src: tpapAmazonPay, alt: "Amazon Pay", id: "amazon" },
  { src: tpapFreecharge, alt: "FreeCharge", id: "freecharge" },
  { src: tpapMobikwik, alt: "Mobikwik", id: "mobikwik" },
  { src: tpapJioMoney, alt: "Jio Money", id: "jiomoney" },
];

// Bank logos for the single tab above Payment mode (left to right order)
const BANK_LOGO_LIST = [
  { src: bankCanara, alt: "Canara", id: "canara" },
  { src: bankHdfc, alt: "HDFC", id: "hdfc" },
  { src: bankIndian, alt: "Indian Bank", id: "indian" },
  { src: bankIob, alt: "IOB", id: "iob" },
  { src: bankRazorpay, alt: "Razorpay", id: "razorpay" },
  { src: bankCashfree, alt: "Cashfree", id: "cashfree" },
  { src: bankEnkash, alt: "Enkash", id: "enkash" },
];

export function PaymentModePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upi" | "card" | "netbanking 2.0" | "wallet">("upi");
  const [qrRevealed, setQrRevealed] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [bankLogoErrors, setBankLogoErrors] = useState<Set<string>>(new Set());
  const [netbankingMode, setNetbankingMode] = useState<"choice" | "qr" | "redirect">("choice");
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success">("idle");
  const [redirectCountdown, setRedirectCountdown] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStatus("processing");
  };

  useEffect(() => {
    if (paymentStatus !== "processing") return;
    const t = setTimeout(() => setPaymentStatus("success"), 2500);
    return () => clearTimeout(t);
  }, [paymentStatus]);

  useEffect(() => {
    if (paymentStatus === "success") setRedirectCountdown(3);
  }, [paymentStatus]);

  useEffect(() => {
    if (paymentStatus !== "success" || redirectCountdown <= 0) return;
    const t = setTimeout(() => {
      setRedirectCountdown((c) => {
        if (c <= 1) navigate("/payment-success");
        return c - 1;
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [paymentStatus, redirectCountdown, navigate]);

  const banks = [
    { id: "hdfc", name: "HDFC", color: "#004C8F", initial: "H" },
    { id: "icici", name: "ICICI", color: "#E65100", initial: "I" },
    { id: "axis", name: "Axis", color: "#6E0E7E", initial: "A" },
    { id: "kotak", name: "Kotak", color: "#E30613", initial: "K" },
    { id: "bob", name: "BOB", color: "#E65100", initial: "B" },
    { id: "sbi", name: "SBI", color: "#003D7A", initial: "S" },
  ];

  const upiApps = [
    { id: "gpay", name: "Google Pay", initial: "G", bg: "#4285F4" },
    { id: "phonepe", name: "PhonePe", initial: "P", bg: "#5F259F" },
    { id: "paytm", name: "Paytm", initial: "P", bg: "#00BAF2" },
    { id: "bhim", name: "BHIM", initial: "B", bg: "#00796B" },
  ];

  const wallets = WALLET_LOGOS;

  const tabs = [
    { id: "upi", label: "UPI", icon: Smartphone },
    { id: "card", label: "Card", icon: CreditCard },
    { id: "netbanking 2.0", label: "Netbanking 2.0", icon: Building2 },
    { id: "wallet", label: "Wallet", icon: Wallet },
  ] as const;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center w-full min-w-0 overflow-x-hidden"
      style={{ background: THEME.pageBg }}
    >
      {/* Payment processing / success overlay */}
      {paymentStatus !== "idle" && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 animate-fintech-fade-in"
          style={{ background: "rgba(245, 248, 223, 0.92)" }}
        >
          <Card
            className="w-full max-w-sm border-0 shadow-2xl overflow-hidden rounded-2xl animate-fintech-scale-in"
            style={{ borderColor: THEME.borderLight, backgroundColor: "#ffffff" }}
          >
            <div
              className="w-full flex justify-center items-center py-4 px-6 rounded-t-2xl"
              style={{ background: "linear-gradient(135deg, #3d9a92 0%, #5eb5ad 50%, #7ec9c2 100%)" }}
            >
              {paymentStatus === "processing" ? (
                <Loader2 className="h-12 w-12 text-white animate-spin" />
              ) : (
                <CheckCircle2 className="h-12 w-12 text-white animate-fintech-success-pop" />
              )}
            </div>
            <CardContent className="pt-6 pb-6 px-6 text-center">
              {paymentStatus === "processing" ? (
                <>
                  <p className="text-base font-semibold mb-1" style={{ color: THEME.textPrimary }}>
                    Processing payment
                  </p>
                  <p className="text-sm" style={{ color: THEME.textSecondary }}>
                    Please wait while we are processing the payment.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold mb-1" style={{ color: THEME.textPrimary }}>
                    Payment successful
                  </p>
                  <p className="text-sm" style={{ color: THEME.textSecondary }}>
                    Redirecting you to the confirmation page…
                  </p>
                  <p className="text-lg font-bold mt-3 tabular-nums animate-fintech-pulse-soft" style={{ color: THEME.tealCardHeader }}>
                    {redirectCountdown} second{redirectCountdown !== 1 ? "s" : ""}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <main className="w-full flex flex-col items-center justify-center py-3 sm:py-4 px-3 sm:px-4 box-border min-w-0">
        <div className="w-full max-w-lg flex flex-col items-center gap-3 sm:gap-4 min-w-0 px-1">
          {/* Back */}
          <div className="flex items-center justify-start w-full min-w-0 animate-fintech-fade-in-up">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/contact-details")}
              className="h-9 w-9 rounded-full shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95"
              style={{ color: THEME.textPrimary }}
            >
              <ChevronRight className="h-5 w-5 rotate-180" />
            </Button>
          </div>

          <Card
            className="w-full border-0 shadow-xl overflow-hidden shrink-0 min-w-0 rounded-t-xl rounded-b-xl gap-0 animate-fintech-fade-in-up animate-fintech-stagger-2"
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

            {/* Single tab: Bank logos – gradient dark (top) to light (bottom), merges with sections above and below */}
            <div
              className="px-4 sm:px-6 py-2 border-b flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
              style={{
                borderColor: THEME.borderLight,
                background: "linear-gradient(180deg, #374151 0%, #4b5563 50%, #6b7280 100%)",
              }}
            >
              {BANK_LOGO_LIST.map((logo, i) => {
                const staggerClass = ["animate-fintech-stagger-1", "animate-fintech-stagger-2", "animate-fintech-stagger-3", "animate-fintech-stagger-4", "animate-fintech-stagger-5", "animate-fintech-stagger-6", "animate-fintech-stagger-7"][Math.min(i, 6)];
                return (
                  <div
                    key={logo.id}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white border p-0.5 transition-transform duration-200 hover:scale-110 animate-fintech-fade-in-up ${staggerClass}`}
                    style={{ borderColor: THEME.borderLight }}
                    title={logo.alt}
                  >
                    <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" />
                  </div>
                );
              })}
            </div>

            <CardHeader className="pb-2 pt-2 sm:pt-3 px-4 sm:px-6 border-b rounded-none" style={{ borderColor: THEME.borderLight }}>
              <div className="space-y-0.5">
                <CardTitle className="text-lg sm:text-xl font-semibold" style={{ color: THEME.textPrimary }}>
                  Payment mode
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm" style={{ color: THEME.textSecondary }}>
                  Select UPI, card, netbanking or wallet
                </CardDescription>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="px-4 sm:px-6 space-y-4 pt-4 pb-4 sm:space-y-5">
              {/* Tabs: UPI | Card | Netbanking | Wallet */}
              <div className="flex flex-wrap sm:flex-nowrap gap-1 p-1 rounded-lg overflow-x-auto" style={{ backgroundColor: THEME.borderLight }}>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        if (tab.id !== "netbanking 2.0") setNetbankingMode("choice");
                      }}
                      className={`flex-1 min-w-[calc(25%-4px)] sm:min-w-0 flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-md text-[10px] sm:text-xs font-medium transition-all duration-200 shrink-0 active:scale-[0.98] ${
                        activeTab === tab.id ? "text-white shadow" : "hover:bg-white/50"
                      }`}
                      style={activeTab === tab.id ? { backgroundColor: THEME.tealCardHeader } : { color: THEME.textSecondary }}
                    >
                      <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI content */}
              {activeTab === "upi" && (
                <div className="space-y-5 animate-fintech-content-swap">
                  {/* QR Section */}
                  <div>
                    <h3 className="text-sm font-semibold mb-2" style={{ color: THEME.textPrimary }}>UPI QR</h3>
                    <div className="flex items-start gap-4">
                      {/* QR Code with blur effect */}
                      <div
                        className="relative shrink-0 w-32 h-32 rounded-lg overflow-hidden flex items-center justify-center"
                        style={{ backgroundColor: THEME.bgSoft, border: `1px solid ${THEME.borderLight}` }}
                      >
                        <img
                          src={UPI_QR_URL}
                          alt="UPI QR Code"
                          className="w-full h-full object-contain transition-all duration-300"
                          style={{ filter: qrRevealed ? "none" : "blur(8px)" }}
                        />
                        {!qrRevealed && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                              type="button"
                              onClick={() => setQrRevealed(true)}
                              size="sm"
                              className="bg-white/90 hover:bg-white font-medium text-xs shadow-md"
                              style={{ color: THEME.textPrimary }}
                            >
                              Show QR
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm mb-3" style={{ color: THEME.textSecondary }}>Scan the QR using any UPI App</p>
                        <div className="flex flex-wrap gap-2">
                          {UPI_APP_LOGOS.map((app) => (
                            <div
                              key={app.id}
                              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 overflow-hidden border bg-white cursor-pointer hover:scale-110 transition-transform p-1"
                              style={{ borderColor: THEME.borderLight }}
                              title={app.alt}
                            >
                              <img src={app.src} alt={app.alt} className="w-full h-full object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UPI ID input */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>Pay with UPI ID / Number</h3>
                    <Input
                      placeholder="example@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="h-10"
                      style={{ borderColor: THEME.borderLight }}
                    />
                  </div>
                </div>
              )}

              {/* Card content */}
              {activeTab === "card" && (
                <div className="space-y-4 animate-fintech-content-swap">
                  {/* Card network logos */}
                  <div className="flex items-center gap-3">
                    <img src={CARD_LOGOS.visa} alt="Visa" className="h-5 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <img src={CARD_LOGOS.mastercard} alt="Mastercard" className="h-5 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <img src={CARD_LOGOS.rupay} alt="RuPay" className="h-5 w-auto object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>

                  <h3 className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>Add a new card</h3>
                  <div className="space-y-2">
                    <Label className="text-sm" style={{ color: THEME.textSecondary }}>Card Number</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                      className="h-10"
                      style={{ borderColor: THEME.borderLight }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm" style={{ color: THEME.textSecondary }}>MM / YY</Label>
                      <Input
                        placeholder="MM / YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="h-10"
                        style={{ borderColor: THEME.borderLight }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm" style={{ color: THEME.textSecondary }}>CVV</Label>
                      <Input
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="h-10"
                        style={{ borderColor: THEME.borderLight }}
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" style={{ color: THEME.textSecondary }}>Enter name on card</Label>
                    <Input
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="h-10"
                      style={{ borderColor: THEME.borderLight }}
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="rounded"
                    style={{ borderColor: THEME.borderLight }}
                    />
                    <span className="text-sm" style={{ color: THEME.textSecondary }}>Save this card as per RBI guidelines</span>
                  </label>
                </div>
              )}

              {/* Netbanking 2.0 content */}
              {activeTab === "netbanking 2.0" && (
                <div className="space-y-4 animate-fintech-content-swap">
                  {netbankingMode === "choice" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setNetbankingMode("qr")}
                        className="flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border-2 transition-colors hover:opacity-90 text-left w-full"
                        style={{ borderColor: THEME.borderLight, backgroundColor: THEME.bgSoft }}
                      >
                        <span className="text-sm font-semibold w-full" style={{ color: THEME.textPrimary }}>Via QR code</span>
                        <span className="text-xs w-full" style={{ color: THEME.textSecondary }}>Scan to pay with your bank app</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNetbankingMode("redirect")}
                        className="flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border-2 transition-colors hover:opacity-90 text-left w-full"
                        style={{ borderColor: THEME.borderLight, backgroundColor: THEME.bgSoft }}
                      >
                        <span className="text-sm font-semibold w-full" style={{ color: THEME.textPrimary }}>Pay Via redirection</span>
                        <span className="text-xs w-full" style={{ color: THEME.textSecondary }}>Redirect to your bank to pay</span>
                      </button>
                    </div>
                  )}

                  {netbankingMode === "qr" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold" style={{ color: THEME.textPrimary }}>Scan to pay</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          style={{ color: THEME.tealCardHeader }}
                          onClick={() => setNetbankingMode("choice")}
                        >
                          Back
                        </Button>
                      </div>
                      <div
                        className="w-full flex justify-center py-6 rounded-lg"
                        style={{ backgroundColor: THEME.bgSoft, border: `1px solid ${THEME.borderLight}` }}
                      >
                        <img
                          src={NETBANKING_QR_URL}
                          alt="Netbanking QR Code"
                          className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                        />
                      </div>
                      <p className="text-xs text-center" style={{ color: THEME.textSecondary }}>Scan with your bank app to complete payment</p>
                    </div>
                  )}

                  {netbankingMode === "redirect" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs sm:text-sm font-semibold" style={{ color: THEME.textPrimary }}>Choose your bank</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          style={{ color: THEME.tealCardHeader }}
                          onClick={() => setNetbankingMode("choice")}
                        >
                          Back
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {banks.map((bank) => {
                          const logoUrl = BANK_LOGOS[bank.id];
                          const showFallback = !logoUrl || bankLogoErrors.has(bank.id);
                          return (
                            <button
                              key={bank.id}
                              type="button"
                              onClick={() => setSelectedBank(selectedBank === bank.id ? null : bank.id)}
                              className={`flex flex-col items-center justify-center gap-2 py-3 rounded-lg border-2 transition-colors ${
                                selectedBank === bank.id ? "bg-[#d4ebf3]/30" : "hover:bg-[#f0f9fb]"
                              }`}
                              style={{ borderColor: selectedBank === bank.id ? THEME.tealCardHeader : THEME.borderLight }}
                            >
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden bg-white" style={{ border: `1px solid ${THEME.borderLight}` }}>
                                {showFallback ? (
                                  <span
                                    className="w-full h-full flex items-center justify-center text-white text-sm font-bold"
                                    style={{ backgroundColor: bank.color }}
                                  >
                                    {bank.initial}
                                  </span>
                                ) : (
                                  <img
                                    src={logoUrl}
                                    alt={bank.name}
                                    className="w-full h-full object-contain p-1"
                                    onError={() => setBankLogoErrors((prev) => new Set(prev).add(bank.id))}
                                  />
                                )}
                              </div>
                              <span className="text-xs font-medium text-center leading-tight" style={{ color: THEME.textSecondary }}>{bank.name}</span>
                            </button>
                          );
                        })}
                      </div>
                      <button
                        type="button"
                        className="w-full py-2.5 rounded-lg border-2 border-dashed text-sm font-medium hover:opacity-90"
                        style={{ borderColor: THEME.borderLight, color: THEME.tealCardHeader }}
                      >
                        View all banks
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Wallet content */}
              {activeTab === "wallet" && (
                <div className="space-y-4 animate-fintech-content-swap">
                  <h3 className="text-xs sm:text-sm font-semibold" style={{ color: THEME.textPrimary }}>Choose your wallet</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {wallets.map((wallet) => (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() => setSelectedWallet(selectedWallet === wallet.id ? null : wallet.id)}
                        className={`flex flex-col items-center justify-center gap-2 py-3 rounded-lg border-2 transition-colors ${
                          selectedWallet === wallet.id ? "bg-[#d4ebf3]/30" : "hover:bg-[#f0f9fb]"
                        }`}
                        style={{ borderColor: selectedWallet === wallet.id ? THEME.tealCardHeader : THEME.borderLight }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white border p-1"
                          style={{ borderColor: THEME.borderLight }}
                        >
                          <img src={wallet.src} alt={wallet.alt} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xs font-medium text-center leading-tight" style={{ color: THEME.textSecondary }}>{wallet.alt}</span>
                      </button>
                    ))}
                  </div>

                  {selectedWallet && (
                    <div className="space-y-2 pt-2">
                      <Label className="text-sm" style={{ color: THEME.textSecondary }}>Enter registered mobile number</Label>
                      <Input
                        placeholder="10-digit mobile number"
                        type="tel"
                        className="h-10"
                        style={{ borderColor: THEME.borderLight }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Amount + View Details */}
              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: THEME.borderLight }}>
                <div>
                  <p className="text-base font-bold" style={{ color: THEME.textPrimary }}>₹35,960.00</p>
                  <button type="button" className="text-xs flex items-center gap-0.5 mt-0.5" style={{ color: THEME.tealCardHeader }}>
                    View Details <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
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
