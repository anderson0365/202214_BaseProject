import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreEntity } from '../store/store.entity';


export enum ProductType {
    PERISHABLE = 'perishable',
    NON_PERISHABLE = 'non-perishable'
}

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  type: ProductType;

  @ManyToMany(() => StoreEntity, (store) => store.products)
  stores: StoreEntity[];
}

