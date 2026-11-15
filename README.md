# SMS Sender - Web SMS Client

A clean single-page SMS messaging web application built with pure **HTML**, **CSS**, and **Vanilla JavaScript** (no framework or build step required), integrated with the **TextBee SMS Gateway API**.

---

## Features

- **Pure HTML/CSS/JS**: Zero build tools required. Can be run by simply opening `index.html` in any modern web browser or serving with any static file server.
- **Reference Image Faithful Design**:
  - Dark Navy left sidebar (`#0c1a30`) with custom speed lines logo, paper airplane vector, and navigation menu.
  - White card form with recipient phone number and message inputs.
  - Interactive tilted smartphone illustration with SMS speech bubble and soaring origami plane.
  - Green success banner and red error banners.
  - Message history table with pre-seeded `Nov 6, 2026 • 03:15 PM` entry and real-time dynamic additions.
- **Form Validation & Constraints**:
  - Live `0 / 160` character limit counter.
  - Validates recipient phone number format (+63, 09..., or E.164) and message before sending.
- **TextBee Gateway Integration (`api.textbee.dev`)**:
  - Connects directly to TextBee's REST endpoint (`https://api.textbee.dev/api/v1/gateway/send-sms`).
  - Configure your API Key & Android Device ID via the in-app **TextBee API** modal (persisted securely in browser `localStorage`).
  - Works out of the box with built-in realistic simulation if no API key is set.
- **Persistent History**: Stores transmission records in `localStorage` across sessions.

---

## How to Run

### Option 1: Direct File
Simply double-click [`index.html`](file:///c:/Users/Admin/OneDrive/Documents/CODES/sms-gateway/index.html) to open it in Chrome, Edge, or Firefox.

### Option 2: Local HTTP Server
Run any static HTTP server in the project folder:

```bash
# Python
python -m http.server 3000

# or Node / npx
npx serve
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.
