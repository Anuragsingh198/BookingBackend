const Call = require("../models/call");
const Client = require("../models/user");
const getDayOfWeek = (dateStr) => new Date(dateStr).getDay();

exports.getCallsByDate = async (date) => {
  const dayOfWeek = getDayOfWeek(date);
  return await Call.find({
    $or: [
      { date: date },
      { recurring: true, dayOfWeek: dayOfWeek }
    ]
  });
};

exports.getClientsBYId =   async(id)=>{
     return  await Client.find({_id:id});
}

exports.getAllClients = async () => {
  return await Client.find();
};

exports.createCall = async (data, client) => {
  const callData = {
    clientId: data.clientId,
    clientName: client.name,
    clientPhone: client.phone,
    date: data.date,
    time: data.time,
    type: data.callType,
    recurring: data.callType === 'followup',
    dayOfWeek: data.callType === 'followup' ? getDayOfWeek(data.date) : null
  };
  const call = new Call(callData);
  return await call.save();
};

exports.deleteCallById  = async (id) => {
  return await Call.findByIdAndDelete(id);
};
