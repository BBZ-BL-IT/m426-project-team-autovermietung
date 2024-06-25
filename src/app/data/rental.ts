import { Vehicle } from './vehicle';
import { User } from './user';

export class Rental{
  public id!: number;
  public car_id!: number;
  public user_id!: number;
  public rentalStart!: Date;
  public rentalEnd!: Date;
  public totalCost!: number;
  public status?: string;
  public car: Vehicle = new Vehicle();
  public user: User = new User();
}
