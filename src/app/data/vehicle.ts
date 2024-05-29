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
        this.licensePlate = licensePlate;
        this.mileage = mileage;
        this.enginePower = enginePower;
        this.fuelType = fuelType;
        this.numberOfSeats = numberOfSeats;
        this.rentalPrice = rentalPrice;
        this.consumption = consumption;
    }
    
    public id!: number;
    public brand: string = '';
    public model: string = '';
    public color: string = '';
    public licensePlate: string = '';
    public mileage: number = 0;
    public enginePower: number = 0;
    public fuelType: string = '';
    public numberOfSeats: number = 0;
    public rentalPrice: number = 0;
    public consumption: number = 0;
  }


  