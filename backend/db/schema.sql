-- ============================================================================
-- KrishiSetu (कृषि सेतु) - Production MySQL Database Schema
-- Academic PBL Project: Centralized Government & NGO Agricultural Schemes Platform
-- ============================================================================

CREATE DATABASE IF NOT EXISTS krishisetu
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE krishisetu;

-- ----------------------------------------------------------------------------
-- 1. Table: scheme_categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  name_en VARCHAR(128) NOT NULL,
  name_hi VARCHAR(128) NOT NULL,
  icon VARCHAR(16) NOT NULL DEFAULT '🌾',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Table: schemes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS schemes (
  id VARCHAR(64) PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  slug VARCHAR(128) NOT NULL UNIQUE,
  name_en VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  issuing_body VARCHAR(255) NOT NULL,
  issuing_body_hi VARCHAR(255),
  summary_en TEXT NOT NULL,
  summary_hi TEXT NOT NULL,
  benefits JSON NOT NULL,
  eligibility JSON NOT NULL,
  documents_required JSON NOT NULL,
  steps JSON NOT NULL,
  official_url VARCHAR(512) NOT NULL,
  apply_url VARCHAR(512) NULL,
  tags JSON NULL,
  keywords JSON NULL,
  subsidy_highlight VARCHAR(128) NOT NULL,
  badge VARCHAR(64) DEFAULT 'General',
  min_land_hectares DECIMAL(5,2) DEFAULT 0.00,
  max_land_hectares DECIMAL(5,2) DEFAULT 999.00,
  target_beneficiary VARCHAR(255),
  deadline VARCHAR(64) NULL,
  last_verified_date VARCHAR(64) NOT NULL,
  source_url VARCHAR(512) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_schemes_category FOREIGN KEY (category_id) REFERENCES scheme_categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Table: scheme_documents (Official Proof Documents)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(512) NOT NULL,
  doc_type VARCHAR(16) NOT NULL DEFAULT 'pdf',
  source_name VARCHAR(255) NOT NULL,
  year VARCHAR(8) DEFAULT '2024',
  verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_docs_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Table: users
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NULL,
  mobile VARCHAR(20) UNIQUE NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('FARMER', 'ADMIN') NOT NULL DEFAULT 'FARMER',
  preferred_language ENUM('en', 'hi') NOT NULL DEFAULT 'en',
  is_active BOOLEAN DEFAULT TRUE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP NULL,
  CONSTRAINT chk_user_contact CHECK (email IS NOT NULL OR mobile IS NOT NULL)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. Table: user_profiles
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id INT PRIMARY KEY,
  state VARCHAR(64),
  district VARCHAR(64),
  land_size_acres DECIMAL(6,2) DEFAULT 0.00,
  farmer_category VARCHAR(32) DEFAULT 'Small',
  primary_crops VARCHAR(255),
  annual_income_band VARCHAR(64),
  gender VARCHAR(16),
  social_category VARCHAR(32),
  is_fpo_member BOOLEAN DEFAULT FALSE,
  avatar_url VARCHAR(255),
  CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. Table: saved_schemes (User Bookmarks)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS saved_schemes (
  user_id INT NOT NULL,
  scheme_id VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, scheme_id),
  CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. Table: application_progress (Kanban Tracker)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS application_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  scheme_id VARCHAR(64) NOT NULL,
  status ENUM('NOT_STARTED', 'DOCUMENTS_PENDING', 'APPLIED', 'APPROVED', 'REJECTED', 'UNKNOWN') NOT NULL DEFAULT 'NOT_STARTED',
  notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_scheme_progress (user_id, scheme_id),
  CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_progress_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. Table: eligibility_submissions
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS eligibility_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  answers JSON NOT NULL,
  matched_scheme_ids JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_elig_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Table: recently_viewed
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS recently_viewed (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  scheme_id VARCHAR(64) NOT NULL,
  viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_user_recent_scheme (user_id, scheme_id),
  CONSTRAINT fk_recent_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_recent_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 10. Table: chat_messages
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  session_id VARCHAR(64) NOT NULL,
  role ENUM('user', 'assistant') NOT NULL,
  content TEXT NOT NULL,
  scheme_ids JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_chat_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 11. Table: notifications
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(32) NOT NULL,
  title VARCHAR(128) NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 12. Table: password_reset_tokens
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token_hash VARCHAR(128) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  CONSTRAINT fk_token_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 13. Table: auth_audit_log
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS auth_audit_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  event ENUM('REGISTER', 'LOGIN_OK', 'LOGIN_FAIL', 'LOGOUT', 'PASSWORD_RESET') NOT NULL,
  ip VARCHAR(64),
  user_agent VARCHAR(256),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Search & Lookup Indexes
-- ----------------------------------------------------------------------------
CREATE INDEX idx_schemes_category ON schemes(category_id);
CREATE INDEX idx_schemes_active ON schemes(is_active);
CREATE INDEX idx_schemes_land ON schemes(min_land_hectares, max_land_hectares);
CREATE FULLTEXT INDEX idx_schemes_search ON schemes(name_en, summary_en);
CREATE INDEX idx_saved_user ON saved_schemes(user_id);
CREATE INDEX idx_progress_user ON application_progress(user_id);
CREATE INDEX idx_chat_session ON chat_messages(session_id);
CREATE INDEX idx_audit_created ON auth_audit_log(created_at);
