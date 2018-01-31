import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoListRxComponent } from './todo/todo-list-rx/todo-list-rx.component';

import { TodosResolver } from './todo/todos-resolver.service';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: TodoListComponent,
    },
    {
        path: 'rx',
        component: TodoListRxComponent,
        resolve: {
            todos: TodosResolver
        }
    }
];


@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule],
    providers: [TodosResolver]
})
export class AppRoutingModule {
}
