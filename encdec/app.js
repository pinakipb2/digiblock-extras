const crypto = require('crypto');

// Space overhead of base64

const aes256gcm = () => {
  const encrypt = (_key, text) => {
    // 16 bytes IV
    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', _key, IV);
    const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    const payload = IV.toString('hex') + encrypted + cipher.getAuthTag().toString('hex');
    const payload64 = Buffer.from(payload, 'hex').toString('base64');
    return payload64;
  };
  const decrypt = (_key, payload64) => {
    const payload = Buffer.from(payload64, 'base64').toString('hex');
    const IV = payload.substring(0, 32);
    const encrypted = payload.substring(32, payload.length - 32);
    const authTag = payload.substring(payload.length - 32, payload.length);
    const decipher = crypto.createDecipheriv('aes-256-gcm', _key, Buffer.from(IV, 'hex'));
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    const str = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    return str;
  };
  return {
    encrypt,
    decrypt,
  };
};

// 256 bits Key
// const KEY = new Buffer.from(crypto.randomBytes(32), 'utf8');
// console.log(crypto.randomBytes(16).toString('hex'));
const KEY = crypto.randomBytes(16).toString('hex');

const aesCipher = aes256gcm();

const enc = aesCipher.encrypt(KEY, 'abcDEF123');
const decrypted = aesCipher.decrypt(KEY, enc);

console.log(enc);
console.log(decrypted);
