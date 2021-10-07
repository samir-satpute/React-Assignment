import CryptoJS from "crypto-js";
import SecureStorage from "secure-web-storage";
 
// https://www.npmjs.com/package/secure-web-storage

const secretKey = "SECURE_KEY"; // define this in env file
export const secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        return CryptoJS.SHA256(key, secretKey).toString();
    },
    encrypt: function encrypt(data) {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    },
    decrypt: function decrypt(data) {
        return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
    }
});

export default secureStorage;
