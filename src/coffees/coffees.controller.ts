import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { response } from 'express';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll(response){
        return 'This action returns all coffees';
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `This action returns #${id} coffee`;
    }

    @Post()
    create(@Body() body){
        return body;
    }

    //There two https methods for update put/patch. put replaces entire resouce but patch modify resource partially 
    @Patch(':id')
    update(@Param('id') id: string, @Body() body){
        return `This action updates #${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string){
       return `This action removes #${id} coffee`;
    }
}
