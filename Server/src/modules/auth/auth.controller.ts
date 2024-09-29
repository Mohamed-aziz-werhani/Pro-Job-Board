import { Controller, HttpStatus, Get, Post, Put, Delete, Req, Res, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { query, Request, Response } from "express";
import * as bcrypt from "bcrypt"
import { AuthService } from "./auth.service";
import { UserService } from '../user/user.service';


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userservice: UserService
  ){}
  @Post("login")
async userConnect(@Req() req:Request){  
    try{
        const {email,password}=req.body;
        const users=await this.userservice.getuserByemail(email);
        const user=users[0];
        const user1={name:user.name,id:user.id}
       // console.log(user)
        
        if(!user){
            return "il n'y a pas un utlisateur avec cette email"
        }

        const testingPass=await bcrypt.compare(password,user.password);
        
        if(!testingPass){
            return "l'email est incorrect ou le password est incorrect";
        }
       // console.log(user);
        const user_complete=(await this.authService.login(user));
       
        return user_complete;
    }catch(err){
        return err; 
    }
}
  

  /*return this.authService.login(user)*/
  
}

