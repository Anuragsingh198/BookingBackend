// const Call = require("../models/call");
// const Client = require("../models/user");
// const getDayOfWeek = (dateStr) => new Date(dateStr).getDay();

const db = require("../config/firebase");


// exports.getCallsByDate = async (date) => {
//   const dayOfWeek = getDayOfWeek(date);
//   return await Call.find({
//     $or: [
//       { date: date },
//       { recurring: true, dayOfWeek: dayOfWeek }
//     ]
//   });
// };

// exports.getClientsBYId =   async(id)=>{
//      return  await Client.find({_id:id});
// }

// exports.getAllClients = async () => {
//   return await Client.find();
// };

// exports.createCall = async (data, client) => {
//   const callData = {
//     clientId: data.clientId,
//     clientName: client.name,
//     clientPhone: client.phone,
//     date: data.date,
//     time: data.time,
//     type: data.callType,
//     recurring: data.callType === 'followup',
//     dayOfWeek: data.callType === 'followup' ? getDayOfWeek(data.date) : null
//   };
//   const call = new Call(callData);
//   return await call.save();
// };

// exports.deleteCallById  = async (id) => {
//   return await Call.findByIdAndDelete(id);
// };


const getDayOfWeek = (dateStr) => new Date(dateStr).getDay();

exports.getCallsByDate = async (date) => {
  const dayOfWeek = getDayOfWeek(date);
  const snapshot = await db.collection("calls").get();

  const calls = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    if (
      data.date === date ||
      (data.recurring && data.dayOfWeek === dayOfWeek)
    ) {
      calls.push({ _id: doc.id, ...data }); // 🔸 Return _id for frontend compatibility
    }
  });

  return calls;
};

// 🔹 Get a single client by Firestore doc ID
exports.getClientById = async (id) => {
  const doc = await db.collection("clients").doc(id).get();
  return doc.exists ? { _id: doc.id, ...doc.data() } : null;
};

exports.getAllClients = async () => {
  const snapshot = await db.collection("clients").get();
  return snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));
};

exports.createCall = async (data, client) => {
  const callData = {
    clientId: data.clientId,
    clientName: client.clientName,
    clientPhone: client.clientPhone,
    date: data.date,
    time: data.time,
    type: data.callType,
    recurring: data.callType === "followup",
    dayOfWeek: data.callType === "followup" ? getDayOfWeek(data.date) : null,
    createdAt: new Date().toISOString(),
  };

  const docRef = await db.collection("calls").add(callData);
  return { _id: docRef.id, ...callData };
};

// 🔹 Delete a call by Firestore doc ID
exports.deleteCallById = async (id) => {
  await db.collection("calls").doc(id).delete();
  return { message: "Call deleted", _id: id };
};


