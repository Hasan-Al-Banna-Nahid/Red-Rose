import React, { useEffect, useState } from "react";

const useEncryption = (publicKey) => {
  const [encryptedPublicKey, setEncryptedPublicKey] = useState(null);
  const [encryptedMessage, setEncryptedMessage] = useState(null);

  useEffect(() => {
    const generateSymmetricKey = async () => {
      return crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
    };

    const encryptMessage = async (message, key) => {
      const encodedMessage = new TextEncoder().encode(message);
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ciphertext = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
        },
        key,
        encodedMessage
      );

      return { ciphertext, iv };
    };

    const convertPemToBinary = (pem) => {
      const lines = pem.split("\n");
      const encoded = lines
        .filter(
          (line) =>
            line.trim().length > 0 &&
            !line.includes("BEGIN") &&
            !line.includes("END")
        )
        .join("");
      return Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
    };

    const encryptPublicKey = async (publicKey) => {
      const publicKeyBinary = convertPemToBinary(publicKey);

      const importedKey = await crypto.subtle.importKey(
        "spki",
        publicKeyBinary,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        true,
        ["encrypt"]
      );

      const encryptedKey = await crypto.subtle.encrypt(
        {
          name: "RSA-OAEP",
        },
        importedKey,
        new Uint8Array(0) // Empty array because RSA-OAEP doesn't require input data
      );

      setEncryptedPublicKey(
        btoa(String.fromCharCode(...new Uint8Array(encryptedKey)))
      );
    };

    generateSymmetricKey().then(async (symmetricKey) => {
      const { ciphertext, iv } = await encryptMessage(
        "Encrypted",
        symmetricKey
      );
      setEncryptedMessage(
        btoa(String.fromCharCode(...new Uint8Array(ciphertext)))
      );
    });

    if (publicKey) {
      encryptPublicKey(publicKey);
    }
  }, [publicKey]);

  return { encryptedPublicKey, encryptedMessage };
};

export default useEncryption;
