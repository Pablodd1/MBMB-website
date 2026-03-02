import crypto from 'crypto';

export function encryptData(data, key) {
    if (data === undefined || data === null) return data;
    const strData = typeof data === 'string' ? data : JSON.stringify(data);
    const sek = process.env.SEK || "0123456789abcdef0123456789abcdef";
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', sek, iv);
    let encrypted = cipher.update(strData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export function decryptData(encryptedData, key) {
    if (encryptedData === undefined || encryptedData === null) return encryptedData;
    const strData = typeof encryptedData === 'string' ? encryptedData : JSON.stringify(encryptedData);
    const sek = process.env.SEK || "0123456789abcdef0123456789abcdef";
    const [ivHex, encrypted] = strData.split(':');
    if (!ivHex || !encrypted) return strData;
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', sek, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}