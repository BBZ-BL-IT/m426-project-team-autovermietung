import { Vehicle } from './vehicle';
import { User } from './user';

export class Rental{
  public id!: number;
  public carId!: number;
  public userId!: number;
  public rentalStart!: Date;
  public rentalEnd!: Date;
  public totalCost!: number;
  public status?: '';
  public car: Vehicle = new Vehicle();
  public user: User = new User();
}
