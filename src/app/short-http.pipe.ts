import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortHTTP'
})
export class ShortHTTPPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let data = value.replace('https://' , '');
    data =  data.replace('http://' , '');
    data = data.replace(/\/$/, "");


    return data;
  }

}
