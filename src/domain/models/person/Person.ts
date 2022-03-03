export class Person {

    public id: number;
    public name: string;
    public documentType: string;
    public document: string;
    public state: string;
    public createdDate: Date;
    public updateDate: Date;

    constructor() {
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}