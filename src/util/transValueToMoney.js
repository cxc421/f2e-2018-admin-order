export const transValueToMoney = num => {
  let arr = [];
  let s = num.toString();

  if (s.length < 4) {
    return s;
  }

  let len = s.length % 3;
  if (len === 0) {
    len = 3;
  }
  for (let i = 0; i + 3 <= s.length;) {
    arr.push(s.substr(i, len));
    i += len;
    len = 3;
  }
  return arr.join(',');
};