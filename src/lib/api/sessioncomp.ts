import CryptoJS from "crypto-js";
import { NextApiRequest, NextApiResponse } from "next";

const secret = process.env.AUTHSECRET || "devsecret";
const salt = process.env.SALT || "devsalt";

// Encrypt the user session
export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, secret + salt).toString();
}

// Decrypt the user session
export function decrypt(text: string) {
  const bytes = CryptoJS.AES.decrypt(text, secret + salt);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Create a new session and return it
export function createData(id: string, refresh_token: string) {
  const data = { id, refresh_token, created_at: new Date().toISOString() };
  const encryptedUser = encrypt(JSON.stringify(data));
  return [data, encryptedUser];
}
