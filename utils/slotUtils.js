exports.generateTimeSlots = () => {
  const slots = [];
  const start = new Date();
  start.setHours(10, 30, 0, 0);
  const end = new Date();
  end.setHours(19, 30, 0, 0);
  let current = new Date(start);
  while (current <= end) {
    slots.push(current.toTimeString().slice(0, 5));
    current.setMinutes(current.getMinutes() + 20);
  }
  return slots;
};

exports.getSlotsNeeded = (callType) => {
  return callType === 'onboarding' ? 2 : 1;
};

exports.getDayOfWeek = (dateStr) => new Date(dateStr).getDay();