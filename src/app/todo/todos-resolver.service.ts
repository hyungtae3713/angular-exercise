import { Injectable } from '@angular/core';
import { 
  Router, 
  Resolve, 
  RouterStateSnapshot,
  ActivatedRouteSnapshot 
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

import { TodoStoreRxService } from './todo-store-rx.service';
import { Todo } from './todo';

@Injectable()
export class TodosResolver implements Resolve<Todo[]> {
  constructor(private todoStore: TodoStoreRxService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todo[]> {
    return this.todoStore.gets().delay(500);
  }
}
