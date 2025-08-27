import { Injectable, Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

// class MockCoffeesService {}

// class ConfigService{}
// class DevelopmentConfigService{}
// class ProductionConfigService{}

@Injectable()
export class CoffeeBrandsFactory {
  create(){
     return ['buddy brew', 'nescafe'];
  }
}

//Module decorator include 4 main property
//1.controller
//2.exports: list of providers used in this module and should be available in other module which import this module
//3.imports: import other modules that this module requires
//4.providers: list of services which will be instantiated by the nest injector
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    /*
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
    },
    {
      provide: COFFEE_BRANDS,
      useValue: ['buddy brew', 'nescafe']
    },
    */
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandfactory: CoffeeBrandsFactory) =>
        brandfactory.create(), 
      inject: [CoffeeBrandsFactory]
    },
  ],
  exports: [CoffeesService]
})
export class CoffeesModule {}
