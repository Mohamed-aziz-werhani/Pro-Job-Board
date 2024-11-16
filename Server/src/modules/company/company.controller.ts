import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req ,UseInterceptors, UploadedFile,Res} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyEntity } from 'src/models/company.entity';
import { ApiTags } from '@nestjs/swagger';
import IResponse from 'src/common/types';
import { Request ,Response} from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller({ version: '1', path: 'companies' })
@ApiTags('Companies Management Routes')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post("create")
  async create(
    @Body() payload: Partial<CompanyEntity>
  ): Promise<IResponse> {
    const response = await this.companyService.create(payload);
    return {
      data: response,
      status: 201
    }
  }

  @Post("createCom")
 /**/
 @UseInterceptors(FileInterceptor('image'))
  async createcom(@Req() req:Request,@Res() res:Response,@UploadedFile() file:Express.Multer.File){
  /*,*/
    const data=req.body;
    console.log("hello"+file);
    const com=await this.companyService.createcom(data,file);
    res.json("l'entreprise crée")
  }
@Get("addrec")
async ajouteRec(@Req() req:Request){
  return await this.companyService.findbyname(req.body.name)

}


  @Get()
  async findAll(): Promise<IResponse> {
    const companies = await this.companyService.findAll();
    return {
      data: companies,
      status: 200,
      count: companies.length
    }
  }
  
  @Get("get/:id")
  async findwithId(@Param("id") id:string) {
    const companie = await this.companyService.find(id);
    return companie;
      
    
    }
    @Get("getbyname")
  async findwithname(@Query("name") name:string) {
    const companie = await this.companyService.findbyname(name);
    return companie;
      
    
    }
    
    

  @Delete(':id')
  async remove(@Param('id') id: string) {
    this.companyService.remove(+id);
  }
  @Get("verif_rec_com/:id")
  async verif(@Param("id") id:string,@Req() req:Request){
    const decision=await this.companyService.verif_rec_com(id,req.body.name)
    return decision;
  }
  @Get("verif_ceo_com/:id")
  async verif1(@Param("id") id:string,@Req() req:Request){
    const decision=await this.companyService.verif_ceo_com(id,req.body.name)
    return decision;
  }
  
}
