
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

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
