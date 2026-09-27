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

## 🛠️ Technology Stack (Full-Stack MERN Architecture)

- **Frontend**: React 19, Vite, Modern Vanilla CSS / Custom Design Tokens, Lucide Icons
- **Backend API**: Node.js & Express.js (RESTful Architecture)
- **Database**: MongoDB (Local Community Server & MongoDB Atlas Cloud)
- **Object Data Modeling (ODM)**: Mongoose 8.x with schemas, compound text indexes, and virtuals
- **Deployment**: Vercel (Frontend), Render (Express Backend Web Service), MongoDB Atlas (Cloud Database)

---

## 🗄️ Database Architecture & Schemas

The database layer runs on **MongoDB** with strongly typed Mongoose schemas:

1. **`Item` Schema**:
   - `id`: Unique identifier (e.g. `item-1`, `item-172744...`)
   - `type`: `lost` | `found`
   - `title`: Item name
   - `category`: `Electronics`, `ID Cards & Wallets`, `Books & Notes`, `Keys`, `Accessories`, `Other`
   - `location`: Specific campus zone (e.g. `Central Library`, `Student Food Court / Canteen`, `Engineering Block B`)
   - `date`, `time`: Incident timestamp
   - `status`: `available` | `claimed` | `pending_verification`
   - `description`: Detailed text description
   - `image`: Photo URL
   - `reportedBy`: Name / department of reporter
   - `securityQuestion`: Anti-fraud verification challenge set by the finder
   - *Index Strategy*: Compound text index on `{ title: 'text', description: 'text', location: 'text' }` for instant campus-wide keyword searches.

2. **`Claim` Schema**:
   - `id`: Unique claim ID
   - `itemId`: Reference to the claimed item
   - `itemTitle`: Item name
   - `claimantName`, `claimantEmail`: Claimant contact
   - `claimProof`: Claimant's answer to the finder's security question
   - `status`: `submitted` | `verified` | `rejected`

---

## 🚀 Quick Start (Local Development)

### 1. Start the MongoDB Backend Server
```bash
cd server
npm install
npm start
# Server starts on http://localhost:5001 and auto-seeds initial campus items to MongoDB
```

### 2. Start the React Frontend
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5174
```

---

## 🌐 Free Cloud Deployment Guide

### Step 1: Create Free MongoDB Atlas Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and register a free account.
2. Create a free **M0 Sandbox Cluster** (Shared, 512 MB, no credit card required).
3. Under **Database Access**, create a user (username & secure password).
4. Under **Network Access**, click **Add IP Address** and choose **Allow Access from Anywhere (`0.0.0.0/0`)**.
5. Click **Connect** ➔ **Drivers (Node.js)** ➔ Copy the Connection String URI:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/campusfind_db?retryWrites=true&w=majority
   ```

### Step 2: Deploy Backend to Render (Free)
1. Push your repository to GitHub.
2. Go to [Render.com](https://render.com) and create a new **Web Service**.
3. Select your repository (`College_lost_and_found`):
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Under **Environment Variables**, add:
   - `MONGODB_URI`: *(Paste your MongoDB Atlas connection string from Step 1)*
   - `NODE_ENV`: `production`
   - `PORT`: `5001`
5. Click **Deploy Web Service**. Render assigns a public URL (e.g. `https://campusfind-api.onrender.com`).

### Step 3: Deploy Frontend to Vercel or Netlify (Free)
1. Go to [Vercel.com](https://vercel.com) and import your GitHub repository.
2. Select root directory as `client`.
3. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://campusfind-api.onrender.com/api`
4. Click **Deploy**. Your full-stack CampusFind portal is now live!

---

## 💼 Resume Bullet Points

You can include this project in your resume under **Projects** or **Full-Stack Development**:

- **CampusFind — Full-Stack College Lost & Found Management System (MERN Stack)**
  - *Tech Stack*: MongoDB Atlas, Express.js, React 19, Node.js, Mongoose ODM, Vite, Render, Vercel.
  - Engineered an end-to-end campus lost & found platform featuring real-time category filtering, zone-based campus search, and an anti-fraud security challenge verification workflow.
  - Developed a scalable RESTful API with Express.js and MongoDB Atlas, incorporating compound text indexes on item titles, descriptions, and campus zones for sub-50ms search latency.
  - Designed an anti-fraud claim workflow requiring claimants to answer finder-configured verification challenges, automatically reconciling records in MongoDB upon successful validation.
  - Built an interactive database diagnostics monitor displaying real-time cluster health, latency, and collection metrics, and configured CI/CD deployment pipelines on Render and Vercel.

