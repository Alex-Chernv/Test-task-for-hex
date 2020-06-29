const salt = '61082669095548704068334695475925';
const diviz = ['18446744073709551533', '18446744073709551557'];

function string2Hex(str) {
  const result = []
  for (let i = 0; i < str.length; i++) {
    result.unshift(str.charCodeAt(i).toString(16));
  }
  return result.join('');
}

const hexInputString = string2Hex('The logic of encoding Unicode in UTF-8 is basically');
console.log(hexInputString);

let hexSaltString = BigInt(salt).toString(16);
console.log(BigInt(salt));

let hexStringOfNumber = hexInputString.concat(hexSaltString);
console.log(hexStringOfNumber);

let bigIntNumber = BigInt(parseInt(hexStringOfNumber, 16));
console.log(bigIntNumber);
let result = [];

diviz.forEach(function (item, arr) {
  result.push((bigIntNumber % BigInt(item)).toString(16))
});
console.log(result);

result.forEach((item, result) => {
  console.log(item);
});
console.log(result.join(''));