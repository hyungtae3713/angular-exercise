import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';


const STORAGE_ITEM_NAME = 'ANGULAR_EXERCISE_TODO_STORAGE';


@Injectable()
export class TodoStoreRxService {
    private _todos: BehaviorSubject<Todo[]>;

    constructor() {
        this._todos = new BehaviorSubject([]);
    }

    get todos(): Observable<Todo[]> {
        return this._todos.asObservable();
    }

    registerReadTodosSource(source: Observable<any>) {
    }

    registerAddTodoSource(source: Observable<string>) {
    }

    registerToggleTodoSource(source: Observable<Todo>) {
    }

    registerRemoveTodoSource(source: Observable<Todo>) {
    }

    destroy() {
    }

    pullTodos() {
        const source = Observable.create((observer) => {
            observer.next();
            observer.complete();
        });

        this.registerReadTodosSource(source);
    }
}
