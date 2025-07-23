// const Call = require("../models/call");
// const Client = require("../models/user");
// const { getCallsByDate,  getAllClients, deleteCallById } = require("../services/callService");
// const { generateTimeSlots, getSlotsNeeded, getDayOfWeek } = require('../utils/slotUtils');

// exports.getCalls = async (req, res) => {
//   const { date } = req.query;
//   if (!date) return res.status(400).json({ message: 'Missing date' });

//   try {
//     const calls = await getCallsByDate(date);
//     res.json({ calls });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching calls' });
//   }
// };

// exports.createCall = async (req, res) => {
//   try {
//     const data = req.body;

//     const client = await Client.findById(data.clientId);
//     if (!client) {
//       return res.status(404).json({ success: false, message: 'Client not found' });
//     }

//     const timeSlots = generateTimeSlots();
//     const slotsNeeded = getSlotsNeeded(data.callType);
//     const startIndex = timeSlots.indexOf(data.time);
//     const targetSlots = timeSlots.slice(startIndex, startIndex + slotsNeeded);

//     if (targetSlots.length < slotsNeeded) {
//       return res.status(400).json({ success: false, message: 'Invalid start time or duration' });
//     }

//     const callsOnDate = await Call.find({ date: data.date });

//     const conflictingCalls = callsOnDate.filter((call) => {
//       const callStart = timeSlots.indexOf(call.time);
//       const callSlots = timeSlots.slice(callStart, callStart + getSlotsNeeded(call.type));
//       return callSlots.some(slot => targetSlots.includes(slot));
//     });

//     if (conflictingCalls.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'Conflict with existing calls',
//         conflictingCalls
//       });
//     }

//     const newCall = new Call({
//       clientId: client._id,
//       clientName: client.name,
//       clientPhone: client.phone,
//       date: data.date,
//       time: data.time,
//       type: data.callType,
//       recurring: data.callType === 'followup',
//       dayOfWeek: data.callType === 'followup' ? getDayOfWeek(data.date) : null
//     });

//     await newCall.save();

//     res.status(201).json({ success: true, call: newCall });
//   } catch (err) {
//     console.error('Error creating call:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.deleteCall = async (req, res) => {
//   try {
//     const deleted = await  deleteCallById(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Call not found' });
//     res.json({ success: true, message: 'Call deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting call' });
//   }
// };


// exports.getAllClients = async (req, res) => {
//   try {
//     const allClients = await getAllClients();
//     if (!allClients || allClients.length === 0) {
//       return res.status(404).json({ success: false, message: 'No clients found' });
//     }
//     res.status(200).json({ success: true, clients: allClients });
//   } catch (error) {
//     console.error('Error fetching clients:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch all clients' });
//   }
// };



const {
  getCallsByDate,
  getAllClients: fetchAllClients,
  getClientById,
  createCall,
  deleteCallById
} = require("../services/callService");

const {
  generateTimeSlots,
  getSlotsNeeded,
  getDayOfWeek
} = require("../utils/slotUtils");

exports.getCalls = async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ message: 'Missing date' });

  try {
    const calls = await getCallsByDate(date);
    res.json({ success: true, calls }); 
  } catch (err) {
    console.error("Error fetching calls:", err);
    res.status(500).json({ success: false, message: 'Error fetching calls' });
  }
};
exports.createCall = async (req, res) => {
  try {
    const data = req.body;

    const client = await getClientById(data.clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }

    const timeSlots = generateTimeSlots();
    const slotsNeeded = getSlotsNeeded(data.callType);
    const startIndex = timeSlots.indexOf(data.time);
    const targetSlots = timeSlots.slice(startIndex, startIndex + slotsNeeded);

    if (targetSlots.length < slotsNeeded) {
      return res.status(400).json({ success: false, message: 'Invalid start time or duration' });
    }

    const allCalls = await getCallsByDate(data.date);

    const conflictingCalls = allCalls.filter((call) => {
      const callStart = timeSlots.indexOf(call.time);
      const callSlots = timeSlots.slice(callStart, callStart + getSlotsNeeded(call.type));
      return callSlots.some(slot => targetSlots.includes(slot));
    });

    if (conflictingCalls.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Conflict with existing calls',
        conflictingCalls
      });
    }

    const newCall = await createCall(data, client); 

    res.status(201).json({ success: true, call: newCall });
  } catch (err) {
    console.error('Error creating call:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteCall = async (req, res) => {
  try {
    const deleted = await deleteCallById(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Call not found' });
    res.json({ success: true, message: 'Call deleted', _id: deleted._id });
  } catch (err) {
    console.error("Error deleting call:", err);
    res.status(500).json({ success: false, message: 'Error deleting call' });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const allClients = await fetchAllClients();
    if (!allClients || allClients.length === 0) {
      return res.status(404).json({ success: false, message: 'No clients found' });
    }
    res.status(200).json({ success: true, clients: allClients }); // ✅ Each client has _id
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch all clients' });
  }
};
