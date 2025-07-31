import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { CoffeesService } from './coffees.service';
import { error } from 'console';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService){}

    @Get()
    findAll(@Query() paginationQuery){
        // const {limit, offset} = paginationQuery;
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        // throw 'A random erroer';
        const coffee = this.coffeesService.findOne(id);
        if(!coffee){
           throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    @Post()
    create(@Body() body){
        return this.coffeesService.create(body);
    }

    //There two https methods for update put/patch. put replaces entire resouce but patch modify resource partially 
    @Patch(':id')
    update(@Param('id') id: string, @Body() body){
        return this.coffeesService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.coffeesService.remove(id);
    }
}
