const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const passMatch = envContent.match(/^DB_PASSWORD=(.+)$/m);
if (!passMatch) throw new Error('DB_PASSWORD not found');
const appPass = passMatch[1].trim();

const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

const mysqlBin = 'C:\\Program Files\\MySQL\\MySQL Server 8.0\\bin\\mysql.exe';

console.log('Applying schema.sql to database krishisetu...');
execSync(`"${mysqlBin}" -u krishisetu_app -D krishisetu`, {
  input: schemaSql,
  env: { ...process.env, MYSQL_PWD: appPass },
  stdio: ['pipe', 'inherit', 'inherit']
});

console.log('Schema applied successfully.');

const tables = execSync(`"${mysqlBin}" -u krishisetu_app -D krishisetu -e "SHOW TABLES;"`, {
  env: { ...process.env, MYSQL_PWD: appPass },
  encoding: 'utf8'
});

console.log('Tables in krishisetu database:');
console.log(tables);
