import { IsString } from "class-validator";
//dto let us to create definition for the shape of the data
export class CreateCoffeeDto {
   @IsString()
   readonly name: string;

   @IsString()
   readonly brand: string;
   
   @IsString({each: true})
   readonly flavors: string[];
}
