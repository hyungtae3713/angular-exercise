import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TodoStoreService } from '../todo-store.service';
import { Todo } from '../todo';

@Component({
    selector: 'todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.less']
})
export class TodoItemComponent implements OnInit  {
    form: FormGroup;
    @Input() todo: Todo;
    @Input() index: number;
    @Output() onRemoveTodo: EventEmitter<number> = new EventEmitter<number>();
    @Output() onUpdateTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

    constructor(
        private formbuiler: FormBuilder, 
        private todoStore: TodoStoreService
    ) { }

    get completed() {
        return this.form.get('completed').value;
    }

    ngOnInit() {
        this.readyForm();
    }

    removeTodo() {
        this.todoStore.remove(this.todo.id);
        this.onRemoveTodo.emit(this.index);
    }

    updateTodo(todo: Todo) {
        this.todoStore.update(todo);
        this.onUpdateTodo.emit(todo);
    }

    private readyForm() {
        this.form = this.formbuiler.group({
            completed: this.todo.completed
        });

        this.form
            .get('completed').valueChanges
            .subscribe(completed => {
                if(!this.todo.id) 
                    return;
                this.updateTodo({ 
                    ...this.todo,
                    completed
                } as Todo);
            });
    }
}
