# VisitorFlow MVP - Product Requirements Document (PRD)

## 1. Executive Summary
**Objective:** Develop a scalable, WhatsApp-first visitor management system to digitize entry processes for Delivery Personnel and External Visitors.
**Core Value:** Frictionless entry using WhatsApp (no app download for visitors), robust security via Guard validation and Host approvals, and comprehensive audit logs.
**Tech Stack Strategy:** Robust backend with NestJS, PostgreSQL for persistence, and BullMQ for handling asynchronous messaging workflows.

## 2. User Personas
1.  **Delivery Personnel:** Needs rapid entry; willing to provide photo proof of vehicle/parcel.
2.  **External Visitor:** Guest, parent, or vendor meeting a specific host. Requires verification.
3.  **Host (Employee/Resident):** The person the visitor is coming to see. Has authority to approve/reject.
4.  **Security Guard:** Gatekeeper. Validates physical reality against digital claims.
5.  **Admin:** System overseer. Manages configurations, views analytics, and handles edge cases.

## 3. User Stories

### A. Delivery Personnel (Fast-Track)
*   **US-1:** As a Delivery Person, I want to scan a QR code at the gate to start the registration process on WhatsApp without downloading an app.
*   **US-2:** As a Delivery Person, I want to easily upload photos of my bike and parcel so that I can prove my intent.
*   **US-3:** As a Delivery Person, I want to receive an Entry QR code immediately after submission so I don't waste time waiting.

### B. External Visitor (Verified Access)
*   **US-4:** As a Visitor, I want to search for the person I am meeting (Host) so they can approve my entry.
*   **US-5:** As a Visitor, I want to receive a notification when my request is approved/rejected.
*   **US-6:** As a Host, I want to receive a WhatsApp message when someone wants to meet me, with buttons to Approve or Deny.

### C. Security Guard (Gatekeeper)
*   **US-7:** As a Guard, I want to scan an Entry QR code to see the visitor's details and photos.
*   **US-8:** As a Guard, I want to visually verify the photos (Bike, Parcel, Face) against the real person before allowing entry.
*   **US-9:** As a Guard, I want to scan the QR code upon exit to close the visit loop.

### D. Admin (Oversight)
*   **US-10:** As an Admin, I want a live dashboard showing who is currently on campus.
*   **US-11:** As an Admin, I want to search past logs by name, date, or visit type for security audits.

## 4. Detailed Feature Flows

### Flow 1: Delivery Personnel (Auto-Approve + Guard Validation)
1.  **Initiation:** Delivery Person scans "Gate QR" -> Opens WhatsApp Chat with preset message (e.g., "Hi, I'm at Gate A").
2.  **Selection:** Bot asks "Purpose of Visit?" -> User selects "Delivery".
3.  **Data Collection (WhatsApp Flow):**
    *   Input: Name, Company (e.g., Swiggy, Amazon).
    *   Upload: Selfie, Bike Photo (with Plate), Parcel Photo.
4.  **Processing:** System saves data -> Generates `VisitID`.
5.  **Output:** System instantly sends **Entry QR Code** to Delivery Person on WhatsApp.
6.  **Gate Entry:**
    *   Delivery Person shows QR to Guard.
    *   Guard scans QR.
    *   Guard App displays: Name, Company, **Photos (Selfie, Bike, Parcel)**.
    *   Guard verifies physically.
    *   Guard clicks **"Allow Entry"** in App.
    *   Status updates to `ENTERED`.

### Flow 2: External Visitor (Host Approval)
1.  **Initiation:** Visitor scans "Gate QR" -> Opens WhatsApp Chat.
2.  **Selection:** Bot asks "Purpose of Visit?" -> User selects "Visitor".
3.  **Data Collection (WhatsApp Flow):**
    *   Input: Name, Phone, Purpose.
    *   **Host Selection:** Search/Select Host Name (or enter manually).
4.  **Verification (Wait State):**
    *   System sends WhatsApp message to **Host**: *"Visitor [Name] is at the gate for [Purpose]. Approve?"*
    *   Visitor receives message: *"Waiting for host approval..."*
5.  **Approval:**
    *   Host clicks **"Approve"** on WhatsApp.
    *   System updates status to `APPROVED`.
    *   System sends **Entry QR Code** to Visitor.
6.  **Gate Entry:**
    *   Visitor shows QR to Guard.
    *   Guard scans QR -> Verifies details -> Clicks **"Allow Entry"**.

### Flow 3: Exit Process
1.  Visitor/Delivery Person approaches gate to leave.
2.  Guard scans the **same Entry QR Code**.
3.  System marks visit as `EXITED`.
4.  (Optional) Visitor gets "Thanks for visiting" message.

## 5. Technical Requirements

### Backend (`visitorflow-api`)
*   **Framework:** NestJS v11.
*   **Database:** PostgreSQL (via TypeORM or Prisma).
    *   Tables: `Users` (Admin/Guard/Host), `Visits`, `Attachments` (Photos).
*   **Queue:** BullMQ (Redis) for handling WhatsApp webhooks and async message sending.
*   **Logging:** `nestjs-pino` or `winston` for structured JSON logging.
*   **Integrations:** WhatsApp Cloud API (Meta).

### Guard Mobile App (`visitorflow-mobile`)
*   **Framework:** React Native (Expo).
*   **Key Features:**
    *   QR Code Scanner (Camera access).
    *   Photo Viewer (to inspect delivery proofs).
    *   Real-time status updates (Socket.io or Polling).

### Admin Web Dashboard (`visitorflow-web`)
*   **Framework:** React 19 + Tailwind CSS.
*   **Features:**
    *   **Live Dashboard:** Cards for "Active Visits", "Pending Approvals", "Today's Total". Graph of visits per hour.
    *   **Logs Table:** Server-side pagination, Filtering (Date Range, Type, Status).
    *   **Manual Override:** Admin can forcibly approve/reject/checkout a visit.

## 6. Implementation Roadmap
1.  **Infrastructure:** Setup Docker for Postgres & Redis.
2.  **Backend Core:** Setup NestJS with TypeORM & BullMQ.
3.  **WhatsApp Integration:** Implement Webhook handler & Message Sender.
4.  **Guard App:** Basic QR Scanning & API integration.
5.  **Admin Panel:** Dashboard & Logs view.