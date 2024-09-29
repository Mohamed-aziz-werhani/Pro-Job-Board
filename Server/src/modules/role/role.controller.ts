import { RoleService } from './role.service';
import {Controller ,HttpStatus,Get,Post,Put,Delete, Req, Res, Body, Param, Query, UsePipes, ValidationPipe} from '@nestjs/common'
import { Request ,Response} from 'express';
import * as bcrypt from 'bcrypt';



@Controller("role")
export class RoleController {
    constructor(private readonly roleService: RoleService) {}
    @Post("create")
    createrole(@Req() req:Request,@Res() res:Response){
        const role=this.roleService.createrole(req.body)
        res.json(role)
    }

    @Get("getrole/:id")
    async getRole(@Param("id") id:string,@Res() res:Response){
        const role=await this.roleService.getRolebyId(id);
        res.json(role)
    }
    @Get("getroleuser/:id")
     async getRoleByID(@Param("id") id:string,@Res() res:Response){
    const role= await this.roleService.getRolebyUserId(id);
    res.json(role)
//    return role;
        
    }

}
