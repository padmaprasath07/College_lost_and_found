# 🎓 CampusFind - College Lost & Found Portal

A centralized web application designed for university campuses to streamline the reporting, tracking, and recovery of lost personal belongings.

---

## 📌 What is CampusFind?

Every day on college campuses, hundreds of valuable items—student ID cards, earphones, textbooks, calculators, water bottles, and keys—go missing in libraries, cafeterias, lecture halls, and sports complexes. 

Typically, students rely on scattered WhatsApp groups, informal Instagram story notices, or physical lost-and-found boxes with no search capabilities or verification mechanisms. This often leads to items remaining unclaimed, privacy concerns, or wrongful claims.

**CampusFind** solves this by providing a unified digital platform specifically tailored to university campuses, making item recovery transparent, fast, and secure.

---

## ✨ Key Features

- **Dual Reporting System**:
  - **Report Lost Item**: Quickly post details of items you have misplaced with date, time, and last seen location.
  - **Report Found Item**: Post items discovered across campus to help return them to their rightful owners.

- **Intelligent Campus Search & Filtering**:
  - Filter items by specific campus zones (Central Library, Canteen, Engineering Blocks, Science Labs, Gym, Auditorium).
  - Categorize by item type (Electronics, ID Cards & Wallets, Books & Notes, Keys, Accessories, and more).
  - Instant text search across item titles, descriptions, and location tags.

- **Ownership Verification (Anti-Fraud Claim System)**:
  - Finders can attach a **security question** or prompt (e.g., *"What wallpaper is on the lock screen?"*, *"What name is inside the ID sleeve?"*, or *"Describe the keychain"*).
  - Claimants must provide verifiable proof before sensitive contact information or handover instructions are shared.

- **Status & Lifecycle Tracking**:
  - Items move through clear lifecycle states: `Reported` ➔ `Under Claim Review` ➔ `Claimed / Resolved`.

- **Student Privacy & Safe Handovers**:
  - Prevents public spam and protects student contact numbers from being exposed to the open web.

---

## 🔄 How It Works

```text
[ Finder / Loser ]  ──►  Reports Item (Photos, Campus Location, Security Question)
                                    │
                                    ▼
[ Search & Browse ] ──►  Filtered by Campus Zone & Item Category
                                    │
                                    ▼
[ Claim Request ]   ──►  Claimant answers Security Question & provides proof
                                    │
                                    ▼
[ Verification ]    ──►  Finder reviews proof & approves valid owner
                                    │
                                    ▼
[ Item Resolved ]   ──►  Item marked as Claimed / Handover Complete
```

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Modern Vanilla CSS / Design Tokens, Lucide Icons
- **Backend**: Node.js & Express.js *(RESTful API)*
- **Database**: MongoDB & Mongoose
- **File Storage**: Cloudinary (for item photos & proof documents)
- **Authentication**: JWT & Secure Password Hashing

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/padmaprasath07/College_lost_and_found.git
   cd College_lost_and_found
   ```

2. **Run the React Frontend:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
