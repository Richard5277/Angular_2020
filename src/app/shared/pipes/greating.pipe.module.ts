import { Pipe, PipeTransform } from '@angular/core';
import * as R from 'ramda';

function doubleSay(mystr: string) {
  return `${mystr}, ${mystr}`;
}

function capitalize(str: string) {
  const newStr = str.split(',', 2);
  return `${newStr[0].toUpperCase()}, ${newStr[1]}`;
}

function exclaim(str: string) {
  return str + '!';
}

@Pipe({
  name: 'greating',
  pure: false
})

export class GreatingPipe implements PipeTransform {

  transform(value: string) {
    return R.pipe(
      doubleSay,
      capitalize,
      exclaim)(value);
  }

}
