const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const bcrypt = require(path.join(__dirname, 'node_modules/bcryptjs'));

// Read environment
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

function getEnv(key, def = '') {
  const m = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return m ? m[1].trim() : def;
}

const appPass = getEnv('DB_PASSWORD');
const adminEmail = getEnv('ADMIN_EMAIL', 'admin@krishisetu.in');
const adminMobile = getEnv('ADMIN_MOBILE', '9876543210');
const adminPassword = getEnv('ADMIN_PASSWORD', 'Admin@KrishiSetu2026!');
const demoFarmerPassword = 'Farmer@123';

if (!appPass) throw new Error('DB_PASSWORD not found in .env');

// Read data
const dataPath = path.join(__dirname, '../../js/schemes-data.js');
const rawCode = fs.readFileSync(dataPath, 'utf8');
const fn = new Function(rawCode + '\nreturn { SCHEMES_DATA, SCHEME_CATEGORIES };');
const { SCHEMES_DATA, SCHEME_CATEGORIES } = fn();

console.log(`Read ${SCHEME_CATEGORIES.length} categories and ${SCHEMES_DATA.length} schemes.`);

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number' || typeof val === 'boolean') return val;
  const str = String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `'${str}'`;
}

function jsonEsc(obj) {
  if (obj === null || obj === undefined) return 'NULL';
  const str = JSON.stringify(obj).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `'${str}'`;
}

const statements = [];
statements.push('-- Auto-generated Seed SQL for KrishiSetu');
statements.push('USE krishisetu;');
statements.push('SET FOREIGN_KEY_CHECKS = 0;');
statements.push('TRUNCATE TABLE scheme_documents;');
statements.push('TRUNCATE TABLE saved_schemes;');
statements.push('TRUNCATE TABLE application_progress;');
statements.push('TRUNCATE TABLE eligibility_submissions;');
statements.push('TRUNCATE TABLE recently_viewed;');
statements.push('TRUNCATE TABLE chat_messages;');
statements.push('TRUNCATE TABLE user_profiles;');
statements.push('DELETE FROM users;');
statements.push('DELETE FROM schemes;');
statements.push('DELETE FROM scheme_categories;');
statements.push('SET FOREIGN_KEY_CHECKS = 1;');

// 1. Categories
const catMap = new Map();
SCHEME_CATEGORIES.forEach((cat, index) => {
  const catId = index + 1;
  catMap.set(cat.name, catId);
  catMap.set(cat.id, catId);
  statements.push(`INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (${catId}, ${esc(cat.id)}, ${esc(cat.name)}, ${esc(cat.nameHi)}, ${esc(cat.icon)}, ${index + 1});`);
});

// 2. Schemes
SCHEMES_DATA.forEach((s) => {
  const catId = catMap.get(s.category) || 1;
  const slug = s.id;
  const code = s.code || `SCH-${s.id.toUpperCase()}`;
  const nameEn = s.name;
  const nameHi = s.nameHi || s.name;
  const issuingBody = s.issuingBody || 'Government of India';
  const issuingBodyHi = s.issuingBodyHi || s.issuingBody;
  const summaryEn = s.tagline || '';
  const summaryHi = s.taglineHi || s.tagline;
  const benefitsJson = jsonEsc(s.benefits || []);
  const eligJson = jsonEsc(s.eligibility || []);
  const docsJson = jsonEsc(s.documents || []);
  const stepsJson = jsonEsc(s.procedure || []);
  const officialUrl = s.officialUrl || 'https://agriwelfare.gov.in';
  const applyUrl = s.applyUrl ? esc(s.applyUrl) : 'NULL';
  const tagsJson = jsonEsc(s.farmerTypes || []);
  const keywordsJson = jsonEsc(s.keywords || []);
  const subsidyHighlight = s.subsidyHighlight || 'Government Subsidy';
  const badge = s.badge || 'Verified';
  const minLand = s.minLand !== undefined ? s.minLand : 0.00;
  const maxLand = s.maxLand !== undefined ? s.maxLand : 999.00;
  const targetBeneficiary = s.targetBeneficiary || 'Indian Farmers';
  const lastVerified = s.lastVerified || 'September 2026';
  const sourceUrl = s.sourceUrl || officialUrl;

  statements.push(`INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    ${esc(s.id)}, ${esc(code)}, ${esc(slug)}, ${esc(nameEn)}, ${esc(nameHi)}, ${catId},
    ${esc(issuingBody)}, ${esc(issuingBodyHi)}, ${esc(summaryEn)}, ${esc(summaryHi)},
    ${benefitsJson}, ${eligJson}, ${docsJson}, ${stepsJson},
    ${esc(officialUrl)}, ${applyUrl}, ${tagsJson}, ${keywordsJson},
    ${esc(subsidyHighlight)}, ${esc(badge)}, ${minLand}, ${maxLand},
    ${esc(targetBeneficiary)}, ${esc(lastVerified)}, ${esc(sourceUrl)}, 1
  );`);

  // Documents
  if (Array.isArray(s.officialDocuments)) {
    s.officialDocuments.forEach((doc) => {
      statements.push(`INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        ${esc(s.id)}, ${esc(doc.title)}, ${esc(doc.url)}, ${esc(doc.type || 'pdf')}, ${esc(doc.source || issuingBody)}, ${esc(doc.year || '2024')}
      );`);
    });
  }
});

// 3. Admin User & Demo Farmer User
const adminHash = bcrypt.hashSync(adminPassword, 10);
const farmerHash = bcrypt.hashSync(demoFarmerPassword, 10);

statements.push(`-- Seed Admin User`);
statements.push(`INSERT INTO users (id, full_name, email, mobile, password_hash, role, preferred_language, is_active, email_verified) VALUES (
  1, 'KrishiSetu Admin', ${esc(adminEmail)}, ${esc(adminMobile)}, ${esc(adminHash)}, 'ADMIN', 'en', 1, 1
);`);

statements.push(`-- Seed Demo Farmer User (Ramesh Patel)`);
statements.push(`INSERT INTO users (id, full_name, email, mobile, password_hash, role, preferred_language, is_active, email_verified) VALUES (
  2, 'Ramesh Patel', 'farmer@krishisetu.in', '9876543211', ${esc(farmerHash)}, 'FARMER', 'hi', 1, 1
);`);

statements.push(`INSERT INTO user_profiles (user_id, state, district, land_size_acres, farmer_category, primary_crops, annual_income_band, gender, social_category, is_fpo_member, avatar_url) VALUES (
  2, 'Madhya Pradesh', 'Ujjain', 2.50, 'Small Farmer', 'Wheat, Soybean, Gram', 'below_2lakh', 'Male', 'OBC', 1, 'RP'
);`);

// 4. Demo Farmer Bookmarks & Progress
statements.push(`-- Demo Farmer Bookmarks`);
statements.push(`INSERT INTO saved_schemes (user_id, scheme_id) VALUES (2, 'pm-kisan'), (2, 'pmfby'), (2, 'kcc');`);

statements.push(`-- Demo Farmer Kanban Application Progress`);
statements.push(`INSERT INTO application_progress (user_id, scheme_id, status, notes) VALUES
  (2, 'pm-kisan', 'APPROVED', 'Received 17th installment. Aadhaar eKYC fully verified.'),
  (2, 'pmfby', 'APPLIED', 'Application submitted for Kharif Soybean crop insurance. Policy doc pending.'),
  (2, 'kcc', 'DOCUMENTS_PENDING', 'Aadhaar and Khasra copies gathered. Bank land valuation pending.'),
  (2, 'pmksy', 'NOT_STARTED', 'Evaluating drip irrigation setup for 2.5 acres.');`);

// Write seed.sql
const seedSql = statements.join('\n');
const seedPath = path.join(__dirname, '..', 'db', 'seed.sql');
fs.writeFileSync(seedPath, seedSql, 'utf8');
console.log(`Generated ${statements.length} SQL statements into backend/db/seed.sql`);

// Execute seed script against MySQL
const mysqlBin = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';
console.log('Seeding krishisetu database...');
execSync(`"${mysqlBin}" -u krishisetu_app -D krishisetu`, {
  input: seedSql,
  env: { ...process.env, MYSQL_PWD: appPass },
  stdio: ['pipe', 'inherit', 'inherit']
});

console.log('Database seeded successfully.');

// Verification
const counts = execSync(`"${mysqlBin}" -u krishisetu_app -D krishisetu -e "
  SELECT 
    (SELECT COUNT(*) FROM scheme_categories) AS categories_count,
    (SELECT COUNT(*) FROM schemes) AS schemes_count,
    (SELECT COUNT(*) FROM scheme_documents) AS proof_docs_count,
    (SELECT COUNT(*) FROM users) AS users_count,
    (SELECT COUNT(*) FROM saved_schemes) AS saved_schemes_count,
    (SELECT COUNT(*) FROM application_progress) AS progress_records_count;
"`, {
  env: { ...process.env, MYSQL_PWD: appPass },
  encoding: 'utf8'
});

console.log('\n--- Seed Verification Results ---');
console.log(counts);
