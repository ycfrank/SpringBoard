//Vehicle Type
class Vehicle {
    constructor(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }
  
    honk() {
      return "Beep.";
    }
  
    toString() {
      return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }
  }
  
  //Cars are vehicles with 4 wheels
  class Car extends Vehicle {
    constructor(make, model, year) {
      super(make, model, year);
      this.numWheels = 4;
    }
  }
  
  // motorcycles are vehicles with 2 wheels
  
  class Motorcycle extends Vehicle {
    constructor(make, model, year) {
      super(make, model, year);
      this.numWheels = 2;
    }
  
    revEngine() {
      return "VROOM!!!";
    }
  }

  //stores vehicles
  class Garage {
    constructor(capacity) {
      this.vehicles = [];
      this.capacity = capacity;
    }
  
    add(newVehicle) {
      if (!(newVehicle instanceof Vehicle)) {
        return "Only vehicles are allowed in here!";
      }
      if (this.vehicles.length >= this.capacity) {
        return "Sorry, we're full.";
      }
      this.vehicles.push(newVehicle);
      return "Vehicle added!";
    }
  }