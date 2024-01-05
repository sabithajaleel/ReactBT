const getAlarmsCount = (uniqueTrackersList = {}) => {
  const count = {
    Theft: 0,
    Vibration: 0,
    PowerOFF: 0,
  };

  Object.keys(uniqueTrackersList).forEach((tracker) => {
    if (tracker.includes('Theft')) {
      count.Theft += 1;
    }
    if (tracker.includes('Vibration')) {
      count.Vibration += 1;
    }
    if (tracker.includes('PowerOFF')) {
      count.PowerOFF += 1;
    }
  });
  console.log({ count });
  return count;
};

export default getAlarmsCount;
