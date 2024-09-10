import { createEncryptor } from "simple-encryptor";

const crypt = createEncryptor({
    key:
        process.env.NEXT_PUBLIC_CRYPT_KEY ||
        process.env.CRYPT_KEY ||
        "2f313a18-b994-446f-859f-94a8e449b02c",
    hmac: false,
    debug: false,
});

export default crypt;
