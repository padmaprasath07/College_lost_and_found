# 🎓 CampusFind — College Lost & Found Management System

**CampusFind** is a centralized web platform designed for university campuses to streamline the reporting, tracking, and recovery of lost personal belongings among students, faculty, and campus staff.

---

## 📌 Problem Statement

On university campuses with thousands of students moving between classrooms, libraries, cafeterias, and labs, misplaced items are an everyday occurrence. Currently, colleges handle this through:

- **Disorganized WhatsApp & Telegram Groups**: Messages get buried quickly under regular chat traffic.
- **Social Media Stories**: Temporary, untrackable, and lack any search capabilities.
- **Physical Lost-and-Found Boxes**: Require students to physically visit multiple campus buildings with no visibility into what is stored.
- **False Claims & Privacy Risks**: Anyone can falsely claim an item, and students often share sensitive contact information publicly.

---

## 💡 The Solution

**CampusFind** transforms campus lost-and-found management into an organized, searchable, and secure digital portal. It provides a structured workflow where:
1. Students can quickly search across campus-specific locations and item categories.
2. Finders can list items without exposing their private phone numbers to the public.
3. Claimants must prove genuine ownership through security questions before an item is released.

---

## ✨ Core Capabilities & Features

### 1. Dual Reporting System
- **Report Lost Item**: Post details about an item you misplaced, including the last known location, date, time, and distinctive characteristics.
- **Report Found Item**: Post items discovered on campus so the owner can identify and recover them.

### 2. Campus Zone & Category Filtering
- **Campus Locations**: Filter listings by specific campus zones such as Central Library, Canteen / Food Court, Engineering Blocks, Science Labs, Auditorium, and Sports Complex.
- **Item Categories**: Browse by categories such as Electronics, ID Cards & Wallets, Books & Study Material, Keys, Accessories, and Personal Belongings.
- **Instant Search**: Real-time keyword search across item titles, descriptions, and campus areas.

### 3. Anti-Fraud Ownership Verification
- To prevent wrongful claims, finders can set a **Security Verification Challenge** (e.g., *"What is the lock screen wallpaper?"*, *"What name is inside the ID holder?"*, or *"Describe the keychain"*).
- The claimant must answer the challenge or describe hidden identifiers before contact information or pickup instructions are released.

### 4. Item Lifecycle Management
- Clear status indicators for every listing:
  - **Available / Reported**: Open for community browsing.
  - **Under Claim Review**: A claim has been submitted and is pending verification.
  - **Resolved / Claimed**: The item has been successfully reunited with its owner.

### 5. Privacy & Campus Security
- Student phone numbers and personal emails are never displayed publicly.
- All claims and listings are tied to verified campus roll numbers or student email accounts.

---

## 🔄 The Item Recovery Workflow

```text
1. REPORT
   Student reports a lost or found item with details, photos, and campus location.
      │
      ▼
2. DISCOVER
   Students search and filter by campus zones and categories.
      │
      ▼
3. VERIFY & CLAIM
   The claimant submits proof or answers the security question set by the finder.
      │
      ▼
4. APPROVE & HANDOVER
   Finder verifies the claimant's answer and arranges a safe campus handover.
      │
      ▼
5. RESOLVE
   The item status updates to "Resolved / Returned".
```

---

## 👥 Who Is This For?

- **Students**: Quickly locate misplaced laptops, ID cards, chargers, keys, and notebooks.
- **Faculty & Staff**: Return items left behind in lecture halls and laboratories.
- **Campus Security Desks & Library Staff**: Maintain an organized, transparent digital registry of handed-in belongings instead of keeping manual logbooks.

---

## 🛠️ Technology Stack

- **Frontend**: React, Modern Vanilla CSS / Design Tokens, Lucide Icons
- **Backend**: Node.js & Express.js (RESTful Architecture)
- **Database**: MongoDB & Mongoose
- **Image Storage**: Cloudinary Media Storage
- **Authentication**: JWT & Secure Password Hashing
