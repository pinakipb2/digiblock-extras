const crypto = require("crypto");

const encrypt = (_key, text) => {
    try {
        text = text.toString();
        const key = Buffer.from(_key, 'utf-8');
        const plainText = Buffer.from(text, 'utf8');
        const cipher = crypto.createCipheriv('aes-256-ecb', key, Buffer.from([]));
        let cipherText = Buffer.concat([cipher.update(plainText), cipher.final()]);
        cipherText = cipherText.toString('base64');
        return ({ status: 1, data: cipherText });
    } catch (err) {
        return ({ status: 0, data: err.message });
    }
}

const decrypt = (_key, text) => {
    try {
        const key = Buffer.from(_key, 'utf-8');
        const decipher = crypto.createDecipheriv('aes-256-ecb', key, Buffer.from([]));
        let clearText = decipher.update(text, 'base64', 'utf8');
        clearText += decipher.final('utf-8');
        return ({ status: 1, data: clearText });
    } catch (err) {
        return ({ status: 0, data: err.message });
    }
}

const secret = crypto.randomBytes(16).toString('hex'); // 32 bytes secret
console.log(secret);
const a = encrypt(secret, 'This is a string');
const b = decrypt(secret, a.data);
console.log(a);
console.log(b);