const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Read password from backend/.env or process.env
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found at ' + envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const passMatch = envContent.match(/^DB_PASSWORD=(.+)$/m);
if (!passMatch) {
  console.error('DB_PASSWORD key not found in .env');
  process.exit(1);
}
const appPass = passMatch[1].trim();
const rootMatch = envContent.match(/^ROOT_DB_PASSWORD=(.+)$/m);
const rootPass = process.env.ROOT_DB_PASSWORD || (rootMatch ? rootMatch[1].trim() : '');
if (!rootPass) {
  console.error('ROOT_DB_PASSWORD not found in environment or .env');
  process.exit(1);
}

const mysqlBin = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';

console.log('Setting up krishisetu database and krishisetu_app user in MySQL...');

const setupSql = [
  'CREATE DATABASE IF NOT EXISTS krishisetu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;',
  `CREATE USER IF NOT EXISTS 'krishisetu_app'@'localhost' IDENTIFIED BY '${appPass}';`,
  `ALTER USER 'krishisetu_app'@'localhost' IDENTIFIED BY '${appPass}';`,
  `GRANT ALL PRIVILEGES ON krishisetu.* TO 'krishisetu_app'@'localhost';`,
  'FLUSH PRIVILEGES;'
].join('\n');

try {
  execSync(`"${mysqlBin}" -u root`, {
    input: setupSql,
    env: { ...process.env, MYSQL_PWD: rootPass },
    stdio: ['pipe', 'inherit', 'inherit']
  });
  console.log('Database krishisetu and user krishisetu_app created successfully.');

  // Test connection as krishisetu_app
  const testOut = execSync(`"${mysqlBin}" -u krishisetu_app -D krishisetu -e "SELECT 'krishisetu_connected' AS status;"`, {
    env: { ...process.env, MYSQL_PWD: appPass },
    encoding: 'utf8'
  });
  console.log('Connection test result:');
  console.log(testOut);
} catch (err) {
  console.error('MySQL setup error:', err.message);
  process.exit(1);
}
