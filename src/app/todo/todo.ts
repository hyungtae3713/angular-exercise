export class Todo {
    id: string;
    /**
     * 어차피 getter로 접근할거면, private이 무의미한 것 같아요.
     * 그리고 private variable에 '_' prefix는 지양하는 것이 좋다고 하네요(https://angular.io/guide/styleguide#properties-and-methods).
     * commented by htkim(180130)
     */
    constructor(
        public title: string, 
        public completed = false
    ) { }
}
