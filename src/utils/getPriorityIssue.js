const priority = {
  Vibration: 1,
  PowerOFF: 2,
  Theft: 3,
};

export default function getPriorityIssue(trackers) {
  let issue = 'Vibration';
  trackers.forEach(({ Message }) => {
    if (Message === 'Theft') {
      issue = Message;
      return;
    }
    if (priority[Message] > priority[issue]) {
      issue = Message;
    }
  });

  return issue;
}
