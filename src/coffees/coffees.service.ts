import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';

//Service saperate business logic from the controller
//business logic saperation makes the logic reusable in muliple parts of application
//in nestjs each Service is a provider which injects dependencies. it means that object can create various relationships to eachother
//CoffeeServie is designed to be used by CoffeesController and anything that might need this functionality

@Injectable()
export class CoffeesService {
//typeorm supports repository design pattern, it means each entity create its own repository which this repository class is available from typeorm as an abstraction to the data source
    constructor(
      @InjectRepository(Coffee)
      private readonly coffeeRepository: Repository<Coffee>,
      @InjectRepository(Flavor)
      private readonly flavorRepository: Repository<Flavor>
    ){}

    findAll(){
      return this.coffeeRepository.find({
         relations: ['flavors']
      });
    }

    async findOne(id: string){
      // throw 'A random erroer';
      const coffee = await this.coffeeRepository.findOne({
          where: {id: +id},
          relations: ['flavors']
      });
       if(!coffee){
           throw new NotFoundException(`Coffee #${id} not found`);
        }
       return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto){
       const flavors = await Promise.all(
         createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
       );
      
       const coffee = this.coffeeRepository.create({
          ...createCoffeeDto,
          flavors
      });
       return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto){
      const flavors = updateCoffeeDto.flavors &&
        (await Promise.all(
          updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        ))  
      const coffee = await this.coffeeRepository.preload({
          id: +id,
          ...updateCoffeeDto,
          flavors
        });
        if(!coffee){
          throw new NotFoundException(`Coffee #${id} not found`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string){
       const coffee = await this.findOne(id);
       return this.coffeeRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor>{
      const existingFlavor = await this.flavorRepository.findOne({where: {name: name}});
      if(existingFlavor){
        return existingFlavor;
      }
     return this.flavorRepository.create({name});
    }
}
