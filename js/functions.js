const checkLength = function(str, len) {
  return(str.length <= len);
};

const isPalindrome = function(str) {
  const newStr = str.replaceAll(' ', '').toUpperCase();
  let reversedStr = '';
  for(let i = newStr.length - 1; i >= 0; i--){
    reversedStr += newStr[i];
  }
  return (newStr === reversedStr);
};

const getNumbers = function(input) {
  let res = '';
  const str = String(input);

  for (let i = 0; i < str.length; i++) {
    const digit = parseInt(str[i], 10);

    if (!Number.isNaN(digit)) {
      res += digit;
    }
  }

  if (res === '') {
    return NaN;
  }

  return parseInt(res, 10);
};

checkLength('проверяемая строка', 20);
isPalindrome('топот');
getNumbers('а я томат');
