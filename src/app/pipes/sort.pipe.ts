import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe'
})
export class SortPipe implements PipeTransform {

  //sorting logic based on user selection of the fields
  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a:any, b:any) =>{
      if (a[args].toLowerCase() < b[args].toLowerCase())      return -1;
      else if( a[args].toLowerCase() > b[args].toLowerCase()) return 1;
      else return 0; 
    });
    return array;
  }

}
