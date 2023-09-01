import { FindPersonDto } from 'src/person/dto/find-person.dto';
import { Md5 } from 'ts-md5';

function getSign(params: any, signKey: string) {
  const keyArray = Object.keys(params);
  keyArray.forEach((key) => {
    if (
      ((!params[key] && params[key] !== 0) ||
        JSON.stringify(params[key]) === '{}') &&
      params[key] !== false &&
      params[key] !== ''
    ) {
      delete params[key];
    }
  });
  const str = sortParams(params, signKey);
  return Md5.hashStr(str).toLocaleLowerCase();
}

function sortParams(params, signKey) {
  const keyArray = Object.keys(params);
  const newkey = keyArray.sort();

  let str = '';
  for (let i = 0; i < newkey.length; i++) {
    if (params[newkey[i]] !== undefined) {
      if (
        (params[newkey[i]] && params[newkey[i]] instanceof Object) ||
        params[newkey[i]] instanceof Array
      ) {
        const value = JSON.stringify(params[newkey[i]]);
        str += newkey[i] + value;
      } else {
        str += newkey[i] + params[newkey[i]];
      }
    }
  }
  str = signKey + str + signKey;
  return str;
}

export function verifySign(
  params: FindPersonDto,
  sign: string,
  signKey: string,
) {
  const calculatedSign = getSign(params, signKey);
  return calculatedSign.length === sign.length; // 我这里只做有没有sign判断
}
