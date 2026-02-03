/**
 * Shared receipt data and HTML generator.
 * Used by payment-success page and checkout modal so both Download buttons produce the same receipt.
 */
export const RECEIPT_DATA = {
  orderId: "#ORD-2026-001",
  customerName: "Deepak Thakur",
  customerContact: "9916645647",
  customerEmail: "deepakthakur19@gmail.com",
  venue: "Children's Arena",
  venueType: "Auditorium in Ground Floor(A/c)",
  fromDate: "04-03-2026",
  toDate: "05-03-2026",
  amountPerDay: "₹17,980.00",
  totalPaid: "₹35,960.00",
} as const;

export function getReceiptHtml(txnId: string, dateTime: string): string {
  const d = RECEIPT_DATA;
  return `<!DOCTYPE html>
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
  <div class="row"><span class="label">Date & Time:</span><span class="value">${dateTime}</span></div>
  <div class="row"><span class="label">Order ID:</span><span class="value">${d.orderId}</span></div>
  <div class="row"><span class="label">Payment Method:</span><span class="value">Online Payment</span></div>
  <hr/>
  <h2>Customer Details</h2>
  <div class="row"><span class="label">Name:</span><span class="value">${d.customerName}</span></div>
  <div class="row"><span class="label">Contact:</span><span class="value">${d.customerContact}</span></div>
  <div class="row"><span class="label">Email:</span><span class="value">${d.customerEmail}</span></div>
  <hr/>
  <h2>Booking Details</h2>
  <div class="row"><span class="label">Venue:</span><span class="value">${d.venue}</span></div>
  <div class="row"><span class="label">Venue Type:</span><span class="value">${d.venueType}</span></div>
  <div class="row"><span class="label">From Date:</span><span class="value">${d.fromDate}</span></div>
  <div class="row"><span class="label">To Date:</span><span class="value">${d.toDate}</span></div>
  <div class="row"><span class="label">Amount per Day:</span><span class="value">${d.amountPerDay}</span></div>
  <hr/>
  <div class="row total"><span>Total Paid:</span><span style="color:#29b6c4;">${d.totalPaid}</span></div>
  <div class="status">
    <strong style="color:#3097C7;">Payment Status: Confirmed</strong><br/>
    <span style="color:#414042;">A confirmation email has been sent to your registered email address.</span>
  </div>
</body>
</html>`;
}

export function downloadReceipt(txnId: string, dateTime: string): void {
  const html = getReceiptHtml(txnId, dateTime);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `receipt-${txnId}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
