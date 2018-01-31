import { Injectable } from '@angular/core';


@Injectable()
export class StorageService {
    storage = window.localStorage;

    clear(): void {
        this.storage.clear();
    }

    find(id: string): any {
        if(!id) 
            return;
        return this.storage.getItem(id);
    }

    gets(): any[] {
        const values = [];
        const keys = Object.keys(this.storage);
        let i = keys.length;

        while(i--)
            values.push(this.storage.getItem(keys[i]));

        return values;
    }

    has(id: string): boolean {
        return this.find(id) !== null;
    }

    remove(id: string): void {
        this.storage.removeItem(id);
    }

    set(id: string, value: any): void {
        // TODO: 현재 value가 object일 경우만 처리되어 있어서 그 외 경우에 대한 처리 필요(htkim, 180131)
        this.storage.setItem(id, JSON.stringify(value));
    }
}
