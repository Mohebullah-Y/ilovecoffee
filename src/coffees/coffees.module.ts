import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';

//Module decorator include 4 main property
//1.controller
//2.exports: list of providers used in this module and should be available in other module which import this module
//3.imports: import other modules that this module requires
//4.providers: list of services which will be instantiated by the nest injector
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Coffee.name,
                schema: CoffeeSchema,
            }
        ]),
    ],
    controllers: [CoffeesController],
    providers: [CoffeesService] 
})
export class CoffeesModule {}
