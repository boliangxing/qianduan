import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abc'
})
export class AbcPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
