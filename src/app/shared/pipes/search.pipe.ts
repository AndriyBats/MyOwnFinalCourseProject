import { Pipe, PipeTransform } from '@angular/core';
import { IAnalyzesResponse } from '../interfaces/analyzes-and-cost/analyzes-and-cost.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IAnalyzesResponse>, searchWord: string ): Array<IAnalyzesResponse> {
    if(!searchWord){
      return value;
    }else if(!value){
      return  [];
    }
    return value.filter(name => {
      return name.analyzName.toLowerCase().includes(searchWord); 
    })
  }
}
