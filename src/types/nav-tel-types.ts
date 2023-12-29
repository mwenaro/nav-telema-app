
export type Driver = {
    _id? : string
    firstName: string;
    lastName: string;
    driverNumber: string;
    state: string;
    city: string;
    contactNumber: string;
    defaultObjectNo?: string;
    password: string;
    status?: boolean
  }
  
  export type Truck = {
    _id?: string;
    name: string;
    plateNumber: string;
    objectModel: string;
    simCardNumber: string;
    secondarySimNumber: string;
    imeiNumber: string;
    objectCategory: string;
    objectAxel: string;
    manufactureDate: string;
    purchaseDate: string;
    gpsInstallationDate: string;
    gpsWarranty: string;
    chassisNumber: string;
    engineNumber: string;
    odometer: string;
    passengerSeatCount: string;
  }