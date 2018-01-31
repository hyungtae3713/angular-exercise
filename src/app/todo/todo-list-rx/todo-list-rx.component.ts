import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { forkJoin } from 'rxjs/observable/forkJoin';
import 'rxjs/add/operator/filter';

import { TodoListComponent } from '../todo-list/todo-list.component';

import { TodoStoreRxService } from '../todo-store-rx.service';
import { Todo } from '../todo';

@Component({
    selector: 'todo-list-rx',
    templateUrl: './todo-list-rx.component.html',
    styleUrls: ['./todo-list-rx.component.less']
})
export class TodoListRxComponent implements OnInit {
    form: FormGroup;
    todos$: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

    constructor(
        private route: ActivatedRoute,
        private formbuiler: FormBuilder, 
        private todoStore: TodoStoreRxService
    ) { }

    addTodo() {
        const title = this.form.get('title').value;
        this.form.patchValue({ title: '' });
        
        let todo = new Todo(title);
        this.todoStore
            .add(todo)
            .subscribe((todo) => {
                let todos = this.todos$.getValue();
                todos.push(todo);
                this.todos$.next(todos);
            });
    }

    ngOnInit() {
        this.readyForm();
        this.loadTodos();
    }

    removeAllCompletedTodo() {
        let todos = this.todos$.getValue();
        todos = todos.filter(todo => todo.completed);
        let subscribables = todos.map(todo => this.todoStore.remove(todo.id));
        forkJoin(...subscribables).subscribe((res) => {
            this.todoStore.gets().subscribe((todos) => {
                this.todos$.next(todos);
            });
        });

        let completedOnly =  this.form.get('completedOnly').value;
        if(completedOnly)
            this.showOnlyCompletedTodos();
    }

    removeTodoAt(id) {
        let todos = this.todos$.getValue();
        todos.splice(id, 1);
        this.todos$.next(todos);
    }

    updateTodo(todo) {
        let todos = this.todos$.getValue();
        todos = todos.map((_todo, idx) => ((_todo.id === todo.id) ? { ...todo } : _todo));
        this.todos$.next(todos);
    }

    private loadTodos() {
        this.route.data.subscribe(data => this.todos$.next(data.todos as Todo[]));
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
                    this.todoStore.gets().subscribe((todos) => this.todos$.next(todos));
            });
    }

    private showOnlyCompletedTodos() {
        let todos = this.todos$.getValue();
        todos = todos.filter(todo => todo.completed);
        this.todos$.next(todos);
    }
}
