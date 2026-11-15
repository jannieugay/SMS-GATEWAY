# QuickSMS Gateway Console

A modern single-page SMS gateway application built with **Nuxt 4**, **Vue 3 Composition API**, and **Tailwind CSS**. Designed for carrier dispatching, live validation, GSM-7/UCS-2 segment calculation, and transmission analytics.

---

## Features

- **Form Composition & Validation**:
  - E.164 international phone number format validation (e.g., `+1 555 123 4567`).
  - Required fields checking before dispatch with clear inline visual errors.
  - Quick-fill test message templates (2FA OTP, Order Dispatch, Appointment Reminder).
  - Keyboard shortcuts (`Ctrl+Enter` or `Cmd+Enter` to send).
- **GSM-7 & UCS-2 Multi-Part Segment Calculator**:
  - Real-time character and segment counter.
  - Automatically identifies non-GSM Unicode characters (emojis, accents) and alerts when shifting to UCS-2 (70 chars per segment).
- **Provider Connectivity**:
  - **Zero-Config Simulated Direct Transit**: Out-of-the-box carrier simulation with simulated network latency and carrier routing.
  - **Live Twilio API Support**: Set credentials in `.env` to connect directly to Twilio.
  - **Custom HTTP Gateway**: Direct dispatch to enterprise webhook endpoints.
- **Dedicated QA Test Numbers**:
  - `+1 (555) 234-8901`: Simulates normal successful carrier delivery (200 OK).
  - `+1 (555) 000-0100`: Simulates Carrier Network Timeout (504).
  - `+1 (555) 000-0144`: Simulates Unreachable Roaming Carrier (422).
  - `+1 (555) 000-9999`: Simulates Gateway Credits Depleted (402).
- **Audit Dashboard & History**:
  - Live transmission feed of recent attempts with delivery status, latency, and carrier name.
  - Search filter by recipient phone number, carrier, or message text.
  - Status tabs: Filter by `All`, `Delivered`, or `Failed`.
  - Detailed telemetry modal (raw audit payload, latency, headers, cost estimate).
  - One-click actions: "Prefill Form / Resend", "Export CSV", and "Clear History".
- **KPI Metrics Overview**:
  - Total messages dispatched & segment counts.
  - Delivery SLA success rate percentage.
  - Roundtrip network latency.
  - Estimated transit routing cost ($USD).

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env` if connecting to a live Twilio account:
```bash
cp .env.example .env
```
```env
SMS_PROVIDER=mock # or 'twilio'
TWILIO_ACCOUNT_SID=your_sid_here
TWILIO_AUTH_TOKEN=your_token_here
TWILIO_FROM_NUMBER=+15005550006
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```
