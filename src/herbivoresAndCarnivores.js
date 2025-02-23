'use strict';

class Animal {
  static alive = [];

  constructor(name) {
    this.name = name;
    this.health = 100;
    Animal.alive.push(this);
  }
}

class Herbivore extends Animal {
  hidden = false;

  hide() {
    this.hidden = !this.hidden;
  }
}

class Carnivore extends Animal {
  bite(target) {
    if (target instanceof Animal && target !== this) {
      // Перевіряємо, що ціль — це тварина (не обов'язково травоїдна)
      if (target instanceof Herbivore && target.hidden) {
        return;
      } // Якщо травоїдне сховалося — не кусати

      if (target instanceof Carnivore) {
        return; // Не кусати інших хижаків
      }

      target.health = Math.max(0, target.health - 50);

      if (target.health === 0) {
        const filterAlive = (animal) => animal !== target;

        Animal.alive = Animal.alive.filter(filterAlive);
      }
    }
  }
}

// Експортуємо класи для тестів
module.exports = { Animal, Herbivore, Carnivore };
