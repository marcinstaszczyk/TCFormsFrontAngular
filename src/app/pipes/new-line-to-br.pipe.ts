import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';

@Pipe({
  name: 'newLineToBr'
})
export class NewLineToBrPipe implements PipeTransform {

  constructor(private sanitizer: Sanitizer) {

  }

  transform(value: any, args?: any): any {
    if (!value) {
      return value;
    }
    return this.sanitizer.sanitize(SecurityContext.HTML, value).replace(/&#10;/g,'<br/>');
  }

}
