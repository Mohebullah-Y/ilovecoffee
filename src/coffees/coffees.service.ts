import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

//Service saperate business logic from the controller
//business logic saperation makes the logic reusable in muliple parts of application
//in nestjs each Service is a provider which injects dependencies. it means that object can create various relationships to eachother
//CoffeeServie is designed to be used by CoffeesController and anything that might need this functionality

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
      // {
      //  id: 1,
      //  name: "Spresso",
      //  brand: 'Buddy Brew',
      //  flavors: ['chocolate','vanilla'] 
      // },
    ];
    
    findAll(){
      return this.coffees;
    }

    findOne(id: string){
      // throw 'A random erroer';
      const coffee = this.coffees.find(item => item.id === +id);
       if(!coffee){
           throw new NotFoundException(`Coffee #${id} not found`);
        }
       return coffee;
    }

    create(createCoffeeDto: any){
      this.coffees.push(createCoffeeDto);
      return createCoffeeDto;
    }

    update(id: string, updateCoffeeDto: any){
      const existingCoffee = this.findOne(id);
      if(existingCoffee){
        //update the existing entity
      }
    }

    remove(id: string){
       const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
       if(coffeeIndex >= 0){
         this.coffees.splice(coffeeIndex, 1);
       }
    }
}
