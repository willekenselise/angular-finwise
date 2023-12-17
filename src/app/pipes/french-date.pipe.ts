import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localefr from '@angular/common/locales/fr';

registerLocaleData(localefr, 'fr-fr');


@Pipe({
  name: 'frenchDate',
})
export class FrenchDatePipe implements PipeTransform {

  transform(value: any, format: string = 'mediumDate'): any {
    const datePipe = new DatePipe('fr-FR'); // 'fr-FR' is the locale for French
    return datePipe.transform(value, format);
  }
}
