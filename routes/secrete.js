import crypto from 'crypto';
import fs from 'fs';

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  return secretKey;
};

const secretKey = generateSecretKey();
fs.writeFileSync('secretKey.txt', secretKey);
console.log('Secret key generated and saved.');

export default secretKey;
