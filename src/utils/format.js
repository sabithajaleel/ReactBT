export const getInitialFromName = (name) => {
  const arr = name.split(' ');
  const initial = arr[0][0] + arr[1][0];
  return initial;
};
