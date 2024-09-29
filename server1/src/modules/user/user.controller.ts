import { UserService } from "./user.service";
import { Controller, HttpStatus, Get, Post, Put, Delete, Req, Res, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { query, Request, Response } from "express";
import { CompanyService } from "../company/company.service";
import * as bcrypt from "bcrypt"
import { RoleService } from "../role/role.service";
import { UserRole } from "src/models/role.entity";
import { CLIENT_RENEG_LIMIT } from "tls";




@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService,
     private readonly comService: CompanyService,
      private readonly roleService: RoleService, 
      /*private readonly jwtService: JwtService*/
    ) { }

  @Post("condidat")
  async createuser(@Req() req: Request, @Res() res: Response) {
    try {
      const hashPasswoard = await bcrypt.hash(req.body.password, 10);
      const newuser ={
        name: req.body.name,
        email: req.body.email,
        password: hashPasswoard
      }
      const user1= await this.userService.createUser(newuser)
       await this.roleService.createrole({
        name:req.body.type,
        id_user:user1.id
       })
       if(req.body.type=="RECRUTEUR"){
       await this.comService.addIdRec(user1.id,req.body.com_name);
       }
       
      res.status(200).json(newuser)


    } catch (err) {
      res.status(500).json({ mesaage: "l'operation de post est échoue" });
    }
  }

  @Get("verifcom/:id")
  async verif(@Param("id") id: string, @Res() res: Response) {
    const reponse = await this.userService.verif_com_existe(id)
    res.json(reponse);
  }
  @Get("verifuser/:id")
  async verifUser(@Param("id") id :string){
   return await this.userService.verifuser(id);
  }

   @Post("ceo/:IdRNE")
   async createceo(@Param("IdRNE") id: string, @Req() req: Request, @Res() res: Response) {
    const verif = await this.userService.verif_com_existe(id);
    const hashPasswoard = await bcrypt.hash(req.body.password, 10);
   const verifuser=await this.userService.verifuser(req.body.name); 
   
   
  const ceo = {
    name: req.body.name,
    email: req.body.email,
    password: hashPasswoard
  // password:req.body.password
  };
    if (verif) {
    //verification de company
   const newceo= await  this.userService.createUser(ceo) 
   const company = {
    name: req.body.name_com,
    ceoId: newceo.id,
    phone: req.body.phone_com,
    email: req.body.email_com,
    id_recs:null
  };
      await this.comService.create(company)
      const role ={
        name:req.body.type,
        id_user:newceo.id
      };
      await this.roleService.createrole(role)
      if(!verifuser){
       await  this.userService.Delete(newceo.id);
      }
  //const role_rec=this.roleService.createrole()
      //res.json("l'operation effectue avec succés")
      res.json({ceo,company,role})
    }else{
      res.json("hello")
    }
  }

 

  /*Processus de création d'un recruteur :

Créer un utilisateur : Créer un nouvel utilisateur dans le système.
Créer un rôle : Attribuer le rôle de RECRUTEUR à cet utilisateur.
Vérification par le CEO :
Le CEO récupère la liste de tous les recruteurs.
comme 
Si un utilisateur ne fait pas partie de l'entreprise du CEO, ce dernier doit supprimer ce compte.
Ce processus assure une gestion des permissions et des accès pour la création de comptes recruteurs.
  */
  @Delete("deleteuser/:id")
  async Deleteuser(@Param("id") id:string,@Req() req:Request, @Res() res: Response){
  if(req.body.id==id){
    await this.userService.Delete(id) 

  }
  const roles=this.roleService.getRolebyUserId(id);
  (await roles).map((role)=>{
   this.roleService.deleterole(role.id)
  })
   res.json("l'utilisateur est supprimé")
  }
/*get the liste of rec by one com */
@Get("bycategorie/:type")
async getusers(@Param("type") type:string,@Req() req:Request,@Query("ceoId") id:string){
  if(this.comService.verif_ceo_com(id,req.body.com_name)){
    const roles = await this.userService.findUsersByRole(type);   
    // Utiliser Promise.all pour attendre que toutes les promesses se résolvent
    const userDetails = await Promise.all(roles.map(async (role) => {
      if(this.comService.verif_rec_com(role.id_user,req.body.com_name)){
        return this.userService.getuser(role.id_user);
      }
      
    }));
    return userDetails;
  }
  return "vous ne pouvez lister juste la liste de votre company";


}
/*@Post("login")
async userConnect(@Req() req:Request,@Res() res:Response){
  const user=req.body;
  
}*/

 /* 
 Methode recherche sans utilisation des requetes types orm 
 @Get("getusersBycategorie")
  async getAllusers(@Query("role") role:string){
    const userType=[];
   const users=await this.userService.getusers();
   users.map(async (user)=>{
    const userrole=await this.roleService.getRolebyUserId(user.id);
    userrole.map(async (Role)=>{
      if(Role.name==role){
      let user1= await this.userService.getuser(user.id);
    userType.push(user1);
       
      }
    })
   })
   return userType;
  }*/
 

}
