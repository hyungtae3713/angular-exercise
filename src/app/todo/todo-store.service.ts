import { Injectable } from '@angular/core';

import { StorageService } from '../core/storage.service';
import { Todo } from './todo';

@Injectable()
export class TodoStoreService {
    constructor(private storageService: StorageService) { }

    add(todo: Todo): Todo {
        const id = `${new Date().getTime()}-${todo.title}`;
        const data = { id, ...todo };
        this.storageService.set(id, data);
        return data as Todo;
    }

    find(id: string): Todo {
        let data = this.storageService.find(id);
        
        if(!data)
            return null;

        data = JSON.parse(data);

        if(typeof data === 'object')
            return  data as Todo;
        return null;
    }

    gets(): Todo[] {
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
        return todos;
    }

    remove(id: string): string|number {
        this.storageService.remove(id);
        return (this.storageService.has(id) ? -1 : id);
    }

    update(todo: Todo): string|number {
        if(!this.storageService.has(todo.id))
            return -1;
        this.storageService.set(todo.id, todo);
        return todo.id;
    }
}
