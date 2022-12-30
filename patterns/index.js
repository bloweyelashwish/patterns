// SINGLETON

function Universe() {
  let instance;

  Universe = function Universe() {
    return instance;
  };

  Universe.prototype = this;
  instance = new Universe();

  // reset the constructor of the pointer
  instance.constructor = Universe;

  // functionality ...

  return instance;
}

// FACTORY

function CarMaker() {
  CarMaker.prototype.drive = function () {
    return `Vroom, I have ${this.doors} doors`;
  };

  CarMaker.factory = function (type) {
    const constructor = type;
    let newCar;

    if (typeof CarMaker[constructor] !== 'function') {
      throw { name: 'Error', message: `${constructor} doesn't exist` };
    }
  };

  if (typeof CarMaker[constructor].prototype.drive !== 'function') {
    CarMaker[constructor].prototype = new CarMaker();
  }

  newCar = new CarMaker[constructor]();

  // some methods ...

  return newCar;
}

CarMaker.Compact = function () {
  this.doors = 4;
};

CarMaker.Convertible = function () {
  this.doors = 2;
};

CarMaker.SUV = function () {
  this.doors = 24;
};

const corolla = CarMaker.factory('Compact');
