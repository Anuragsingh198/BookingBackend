const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain:process.env.FIREBASE_GOOGLE_DOMAIN
};

console.log (" this is the service  ur l : ", serviceAccount)

const admin = require("firebase-admin");
console.log("service : " , serviceAccount)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const testWrite = async () => {
  try {
    const res = await db.collection("test_collection").add({
      name: "Test User",
      createdAt: new Date().toISOString(),
    });
    console.log("✅ Test write success:", res.id);
  } catch (err) {
    console.error("❌ Test write failed:", err.code, err.message);
  }
};

testWrite();

module.exports = db;
