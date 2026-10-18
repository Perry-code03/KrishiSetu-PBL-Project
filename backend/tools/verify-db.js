const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const env = fs.readFileSync(envPath, 'utf8');
const passMatch = env.match(/^DB_PASSWORD=(.+)$/m);
const appPass = passMatch[1].trim();

const mysqlBin = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';
const query = 'SELECT ' +
  '(SELECT COUNT(*) FROM scheme_categories) AS categories, ' +
  '(SELECT COUNT(*) FROM schemes) AS schemes, ' +
  '(SELECT COUNT(*) FROM scheme_documents) AS proof_docs, ' +
  '(SELECT COUNT(*) FROM users) AS users, ' +
  '(SELECT COUNT(*) FROM saved_schemes) AS saved_schemes, ' +
  '(SELECT COUNT(*) FROM application_progress) AS progress_records;';

const out = execSync(`"${mysqlBin}" -u krishisetu_app -D krishisetu -t -e "${query}"`, {
  env: { ...process.env, MYSQL_PWD: appPass },
  encoding: 'utf8'
});

console.log('Database Table Counts:');
console.log(out);

const users = execSync(`"${mysqlBin}" -u krishisetu_app -D krishisetu -t -e "SELECT id, full_name, email, mobile, role FROM users;"`, {
  env: { ...process.env, MYSQL_PWD: appPass },
  encoding: 'utf8'
});
console.log('Seeded Users:');
console.log(users);
