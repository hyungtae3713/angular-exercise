export class Todo {
    private _completed = false;
    private _title: string;

    constructor(title: string, completed = false) {
        this.title = title;
        this._completed = completed;
    }

    get completed(): boolean {
        return this._completed;
    }

    get title(): string {
        return this._title;
    }
    set title(value: string) {
        this._title = value.trim();
    }

    toggle() {
        this._completed = !this._completed;
    }
}
