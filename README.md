# 🎓 CampusFind - College Lost & Found Portal

A modern, full-stack **MERN** application designed to streamline the reporting, tracking, and recovery of lost items across university campuses.

![CampusFind Banner](https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80)

---

## 📌 Project Overview

Losing items such as student ID cards, notebooks, electronic devices, lab equipment, or keys on campus is a widespread problem. Traditional lost-and-found notice boards or disorganized WhatsApp groups often fail because items lack centralized indexing, verifiable claim mechanisms, and timely communication.

**CampusFind** solves this by providing:
- 🔍 **Centralized Search & Filters**: Search lost & found items by category, campus building/location, and date.
- 📸 **Visual Verification**: Upload images with descriptions and security questions.
- 🛡️ **Proof-of-Ownership Claims**: Users can submit claims with specific item details before contact info is shared.
- 🔔 **Activity Feed & Notifications**: Real-time status tracking (Reported, Under Claim, Returned).
- 🔐 **College Authentication**: Secure account login and verification.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Modern Vanilla CSS / Design Tokens, Lucide Icons
- **Backend**: Node.js, Express.js *(Upcoming)*
- **Database**: MongoDB & Mongoose *(Upcoming)*
- **File Storage**: Cloudinary *(Upcoming)*
- **Authentication**: JWT & Bcrypt *(Upcoming)*

---

## 📂 Project Structure

```text
College_lost_and_found/
├── client/          # Frontend React application (Vite)
│   ├── public/      # Static assets
│   └── src/         # React components, styles, and state
├── server/          # Backend Node.js / Express API (Upcoming)
│   ├── config/      # Database & Cloudinary config
│   ├── controllers/ # API route logic
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express endpoints
│   └── middleware/  # Auth & error handling
└── README.md
```

---

## 🚀 Quick Start (Frontend Development)

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd College_lost_and_found
```

### 2. Run Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🗓️ 20-Day Development Sprint Roadmap

- [x] **Day 1**: Scaffolding, Design System & Core React UI Prototype
- [ ] **Day 2**: Item Feed, Filter System & Search Interface
- [ ] **Day 3**: Report Item Form & Image Preview UI
- [ ] **Day 4**: Claim Verification Modal & User Dashboard UI
- [ ] **Day 5**: Express.js & MongoDB Server Initialization
- [ ] **Day 6**: Item & User Mongoose Data Models
- [ ] **Day 7**: JWT Authentication & College Email Validation
- [ ] **Day 8**: Lost & Found Items CRUD Endpoints
- [ ] **Day 9**: Cloudinary Image Upload Integration
- [ ] **Day 10**: Advanced Search & Filtering APIs
- [ ] **Day 11**: Claim Request & Verification API
- [ ] **Day 12**: Connecting React Frontend with Auth APIs
- [ ] **Day 13**: Connecting Items Feed & Filtering to Backend
- [ ] **Day 14**: Connecting Image Uploads & Report Form
- [ ] **Day 15**: Connecting Claims Workflow & Status Updates
- [ ] **Day 16**: User Profile & Activity Tracking
- [ ] **Day 17**: Smart Auto-Match Algorithm (Lost vs Found)
- [ ] **Day 18**: Email Notifications for Claim Updates
- [ ] **Day 19**: Full-Stack Deployment (Vercel & Render)
- [ ] **Day 20**: Final Testing, Documentation & Portfolio Showcase

---

## 📄 License
MIT License
