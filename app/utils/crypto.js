import CryptoJS from "crypto-js";

const SECRET_KEY = "inspectElementEqualsLoser";

export const encrypt = (value) => {
    // console.log("Encrypting: ", value);
    if (value !== null) {
        const valueStr = value.toString();
        const encrypted = CryptoJS.AES.encrypt(valueStr, SECRET_KEY).toString();
        return encrypted;
    }
}

export const decrypt = (value) => {
    // console.log("Decrypting: ", value);
    if (value !== null) {
        try {
            const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

            if (!decryptedData || decryptedData === "") {
                return "tampered";
            }

            return decryptedData;
        } catch (error) {
            return "tampered";
        }
    }
    return null;
}