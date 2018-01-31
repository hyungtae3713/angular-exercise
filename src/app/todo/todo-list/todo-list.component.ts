import { Component, OnInit, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TodoStoreService } from '../todo-store.service';
import { Todo } from '../todo';

@Component({
    selector: 'todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {
    form: FormGroup;
    todos: Todo[] = [];
    completedOnly: boolean;

    constructor(
        private formbuiler: FormBuilder, 
        private todoStore: TodoStoreService
    ) { }

    addTodo() {
        const title = this.form.get('title').value;
        let todo = new Todo(title);
        todo = this.todoStore.add(todo);
        this.form.patchValue({ title: '' });
        this.todos.push(todo);
    }

    ngOnInit() {
        this.readyForm();
        this.loadTodos();
    }

    removeAllCompletedTodo() {
        this.todos
            .filter(todo => todo.completed)
            .forEach(todo => this.todoStore.remove(todo.id));
        this.loadTodos();
        
        let completedOnly =  this.form.get('completedOnly').value;
        if(completedOnly)
            this.showOnlyCompletedTodos();
    }

    removeTodoAt(id) {
        this.todos.splice(id, 1);
    }

    updateTodo(todo) {
        this.todos = this.todos.map((_todo, idx) => ((_todo.id === todo.id) ? { ...todo } : _todo));
    }

    private loadTodos() {
        this.todos = this.todoStore.gets();
    }

    private readyForm() {
        this.form = this.formbuiler.group({
            title: ['', Validators.required ],
            completedOnly: false
        });

        this.form
            .get('completedOnly').valueChanges
            .subscribe(completedOnly => {
                if(completedOnly)
                    this.showOnlyCompletedTodos();
                else
                    this.loadTodos();
            });
    }

    private showOnlyCompletedTodos() {
        this.todos = this.todos.filter(todo => todo.completed);
    }
}
