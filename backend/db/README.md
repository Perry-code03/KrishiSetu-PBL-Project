# KrishiSetu Database Setup Guide

This directory contains the database definition and seed data for the **KrishiSetu (कृषि सेतु)** platform.

## Architecture
- **Database Engine:** MySQL 8.0+
- **Default Database:** `krishisetu`
- **Character Set:** `utf8mb4` (collation: `utf8mb4_unicode_ci` for authentic Devanagari Hindi support)
- **Application User:** Dedicated user `krishisetu_app`@`localhost` with restricted privileges only on `krishisetu.*`

---

## One-Time MySQL Setup

### 1. Configure `.env`
Ensure `backend/.env` exists (copied from `backend/.env.example`):
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=krishisetu
DB_USER=krishisetu_app
DB_PASSWORD=<your_chosen_strong_password>
JWT_SECRET=<your_base64_random_jwt_secret>
JWT_EXPIRATION_HOURS=24
SERVER_PORT=8080
ADMIN_EMAIL=admin@krishisetu.in
ADMIN_MOBILE=9876543210
ADMIN_PASSWORD=<your_admin_password>
```

### 2. Create Database & User
Log in to MySQL as root (using your root password):
```bash
mysql -u root -p
```
Run the following SQL setup:
```sql
CREATE DATABASE IF NOT EXISTS krishisetu 
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'krishisetu_app'@'localhost' IDENTIFIED BY '<your_chosen_strong_password>';
ALTER USER 'krishisetu_app'@'localhost' IDENTIFIED BY '<your_chosen_strong_password>';
GRANT ALL PRIVILEGES ON krishisetu.* TO 'krishisetu_app'@'localhost';
FLUSH PRIVILEGES;
```

Alternatively, run the automated setup tool:
```bash
node backend/tools/db-setup.js
```

### 3. Apply Schema
Apply the DDL schema to create all 13 production tables and indexes:
```bash
mysql -u krishisetu_app -p krishisetu < backend/db/schema.sql
```
Or via tool:
```bash
node backend/tools/apply-schema.js
```

### 4. Seed 36 Verified Schemes & Demo Data
Seed all 16 categories, 36 grounded schemes, official proof documents, and demo users:
```bash
mysql -u krishisetu_app -p krishisetu < backend/db/seed.sql
```
Or via automated sync tool (which keeps `js/schemes-data.js` and DB in sync):
```bash
node backend/tools/seed-db.js
```

### 5. Verify Row Counts
```bash
node backend/tools/verify-db.js
```
Expected result:
- 16 Categories
- 36 Verified Schemes
- 37 Official Proof Documents
- 2 Users (Admin & Demo Farmer Ramesh Patel)
- 3 Bookmarks & 4 Application Pipeline Milestones

---

## Demo Accounts
- **Demo Farmer:**
  - Email: `farmer@krishisetu.in` or Mobile: `9876543211`
  - Password: `Farmer@123`
  - Profile: Ramesh Patel, Small Farmer, 2.5 Acres, Ujjain, MP
- **Admin:**
  - Email: `admin@krishisetu.in` or Mobile: `9876543210`
  - Password: configured in `backend/.env`
