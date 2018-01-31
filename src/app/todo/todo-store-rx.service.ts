import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { StorageService } from '../core/storage.service';
import { Todo } from './todo';

@Injectable()
export class TodoStoreRxService {
    constructor(private storageService: StorageService) { }

    add(todo: Todo): Observable<Todo> {
        const id = `${new Date().getTime()}-${todo.title}`;
        const data = { id, ...todo };
        this.storageService.set(id, { ...todo, id });
        return of(data as Todo);
    }

    find(id: string): Observable<Todo> {
        let data = this.storageService.find(id);
        
        if(!data)
            return null;

        data = JSON.parse(data);

        if(typeof data === 'object')
            return  of(data as Todo);
        return null;
    }

    gets(): Observable<Todo[]> {
        const dataBundle = this.storageService.gets();
        const todos: Todo[] = dataBundle
            .map((data) => {
                if(!data)
                    return;
                return data = JSON.parse(data);
            })
            .filter((data) => {
                if(typeof data === 'object')
                    return  data as Todo;
            });
        return of(todos);
    }

    remove(id: string): Observable<string|number> {
        this.storageService.remove(id);
        return (this.storageService.has(id) ? of(-1) : of(id));
    }

    update(todo: Todo): Observable<string|number> {
        if(!this.storageService.has(todo.id))
            return of(-1);
        this.storageService.set(todo.id, todo);
        return of(todo.id);
    }
}
