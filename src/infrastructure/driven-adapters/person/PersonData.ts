import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'persons'})
export class PersonData {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string;

    @Column({type: 'varchar', name: 'document_type'})
    public documentType: string;

    @Column({type: 'varchar'})
    public document: string;

    @Column({type: 'varchar'})
    public state: string;

    @Column({type: 'timestamp', name: 'created_date'})
    public createdDate: Date;

    @Column({type: 'timestamp', name: 'update_date'})
    public updateDate: Date;

}