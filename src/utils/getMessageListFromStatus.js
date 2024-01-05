const getMessageFromStatus = (OutOfSite, PowerOFF, Vibration) => {
  if (OutOfSite === 1) {
    return 'Theft';
  }
  if (PowerOFF === 1) {
    return 'PowerOFF';
  }
  if (Vibration === 1) {
    return 'Vibration';
  }
  return null;
};

export default getMessageFromStatus;
