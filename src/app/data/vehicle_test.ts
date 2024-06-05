export class Vehicle {
    constructor(
        id: number,
        brand: string,
        model: string,
        color: string,
        licensePlate: string,
        mileage: number,
        enginePower: number,
        fuelType: string,
        numberOfSeats: number,
        rentalPrice: number,
        consumption: number
    ) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.color = color;
        this.license_plate = licensePlate;
        this.mileage = mileage;
        this.engine_power = enginePower;
        this.fuel_type = fuelType;
        this.number_of_seats = numberOfSeats;
        this.rental_price = rentalPrice;
        this.consumption = consumption;
    }
    
    public id!: number;
    public brand: string = '';
    public model: string = '';
    public color: string = '';
    public license_plate: string = '';
    public mileage: number = 0;
    public engine_power: number = 0;
    public fuel_type: string = '';
    public number_of_seats: number = 0;
    public rental_price: number = 0;
    public consumption: number = 0;
  }


  