-- ============================================================================
-- KrishiSetu (कृषि सेतु) - Production MySQL Database Schema
-- Academic PBL Project: Centralized Government & NGO Agricultural Schemes Platform
-- ============================================================================

CREATE DATABASE IF NOT EXISTS krishisetu_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE krishisetu_db;

-- ----------------------------------------------------------------------------
-- 1. Table: scheme_categories
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_key VARCHAR(64) NOT NULL UNIQUE,
  name_en VARCHAR(128) NOT NULL,
  name_hi VARCHAR(128) NOT NULL,
  icon VARCHAR(16) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 2. Table: schemes
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS schemes (
  id VARCHAR(64) PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  name_en VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  issuing_body_en VARCHAR(255) NOT NULL,
  issuing_body_hi VARCHAR(255) NOT NULL,
  issuing_type ENUM('CENTRAL_GOVT', 'STATE_GOVT', 'NGO', 'CSR') NOT NULL DEFAULT 'CENTRAL_GOVT',
  tagline_en TEXT NOT NULL,
  tagline_hi TEXT NOT NULL,
  subsidy_highlight VARCHAR(128) NOT NULL,
  badge VARCHAR(64) DEFAULT 'General',
  target_beneficiary VARCHAR(255),
  min_land_hectares DECIMAL(5,2) DEFAULT 0.00,
  max_land_hectares DECIMAL(5,2) DEFAULT 999.00,
  official_url VARCHAR(512) NOT NULL,
  source_url VARCHAR(512) NOT NULL,
  last_verified VARCHAR(64) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_schemes_category FOREIGN KEY (category_id) REFERENCES scheme_categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 3. Table: scheme_benefits
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_benefits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id VARCHAR(64) NOT NULL,
  benefit_text_en TEXT NOT NULL,
  benefit_text_hi TEXT,
  display_order INT DEFAULT 0,
  CONSTRAINT fk_benefits_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 4. Table: scheme_eligibility_criteria
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_eligibility_criteria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id VARCHAR(64) NOT NULL,
  criterion_en TEXT NOT NULL,
  criterion_hi TEXT,
  display_order INT DEFAULT 0,
  CONSTRAINT fk_elig_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 5. Table: scheme_documents
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id VARCHAR(64) NOT NULL,
  document_name_en VARCHAR(255) NOT NULL,
  document_name_hi VARCHAR(255),
  is_mandatory BOOLEAN DEFAULT TRUE,
  CONSTRAINT fk_docs_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 6. Table: scheme_procedures (Numbered Steps)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scheme_procedures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_id VARCHAR(64) NOT NULL,
  step_number INT NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  title_hi VARCHAR(255),
  description_en TEXT NOT NULL,
  description_hi TEXT,
  CONSTRAINT fk_proc_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 7. Table: users (Farmers & Extension Officers)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  farmer_uid VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(128) NOT NULL,
  mobile_number VARCHAR(15) NOT NULL UNIQUE,
  email VARCHAR(128),
  state VARCHAR(64) NOT NULL,
  district VARCHAR(64) NOT NULL,
  sub_district VARCHAR(64),
  village VARCHAR(64),
  land_holding_hectares DECIMAL(5,2) DEFAULT 0.00,
  farmer_category ENUM('MARGINAL', 'SMALL', 'MEDIUM', 'LARGE') DEFAULT 'SMALL',
  social_category VARCHAR(32) DEFAULT 'GENERAL',
  is_dbt_enabled BOOLEAN DEFAULT TRUE,
  preferred_language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 8. Table: saved_schemes (Farmer Bookmarks)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS saved_schemes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  scheme_id VARCHAR(64) NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_saved_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_saved_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_scheme_bookmark (user_id, scheme_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 9. Table: application_progress (Kanban Tracker)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS application_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  scheme_id VARCHAR(64) NOT NULL,
  status ENUM('NOT_STARTED', 'DOCS_PENDING', 'APPLIED', 'APPROVED', 'REJECTED') DEFAULT 'NOT_STARTED',
  official_acknowledgement_number VARCHAR(64),
  submission_date DATE,
  notes TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_progress_scheme FOREIGN KEY (scheme_id) REFERENCES schemes(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_scheme_tracker (user_id, scheme_id)
) ENGINE=InnoDB;

-- ----------------------------------------------------------------------------
-- 10. Table: eligibility_submissions (Audit & Analytics)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS eligibility_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  state VARCHAR(64) NOT NULL,
  land_size DECIMAL(5,2) NOT NULL,
  crop_type VARCHAR(64),
  farmer_category VARCHAR(32),
  income_band VARCHAR(32),
  matched_schemes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_submission_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Indexes for lightning fast full-text & retrieval searches
CREATE INDEX idx_schemes_category ON schemes(category_id);
CREATE INDEX idx_schemes_issuing_type ON schemes(issuing_type);
CREATE INDEX idx_schemes_land ON schemes(min_land_hectares, max_land_hectares);
CREATE FULLTEXT INDEX idx_schemes_search ON schemes(name_en, tagline_en, subsidy_highlight);
