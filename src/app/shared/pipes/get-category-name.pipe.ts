import { Pipe, PipeTransform } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'getCategoryName',
})
export class GetCategoryNamePipe implements PipeTransform {
  constructor(private categoryService : CategoriesService) { }

  transform(categoryId: string): Observable<string> {
    return this.categoryService.getCategoryNameById(categoryId);
  }
}
