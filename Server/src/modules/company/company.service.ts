import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/models/company.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(CompanyEntity) private readonly companyRepository: Repository<CompanyEntity>
  ) { }

  async create(payload: Partial<CompanyEntity>) {
    try {
      const newcompany=this.companyRepository.create(payload)
      await this.companyRepository.save(newcompany);
      return newcompany;
    } catch (error) {
      return error
    }
  }
 
  private async saveImageFile(file: Express.Multer.File):Promise<string>{
    const filePath = join(process.cwd(), 'src', 'uploads', file.originalname);
    await writeFile(filePath, file.buffer); // Sauvegarde le fichier dans le dossier 'uploads'
    return `/uploads/${file.originalname}`; // Retourne le chemin de l'image
  }

  async createcom(data:any,imagefile:Express.Multer.File){

    const image1=this.saveImageFile(imagefile);

    const com=this.companyRepository.create({
      name:data.name,
      email:data.email,
      ceoId:data.ceoId,
      id_recs:null,
      phone:data.phone,
      about:data.about,
      image:await image1
    });
     await this.companyRepository.save(com);
     return com;
    
  
    }




  async findAll() {
    try {
      return await this.companyRepository.find();
    } catch (error) {
      return error
    }
  }
  async find(id :string) {
    try {
     const com =await this.companyRepository.find({
        where:{id:id}
      });
      return com;
    } catch (error) {
      return error
    }
  }
  async findbyname(name :string) {
    try {
      return await this.companyRepository.find({
        where:{name:name}
      });
    } catch (error) {
      return error
    }
  }

  async remove(id: number) {
    try {
      return await this.companyRepository.delete(id);
    } catch (error) {
      return error
    }
  }
  async addIdRec(id:string,name:string){
    const coms=await this.companyRepository.find(
      {
        where:{name:name}
      }
    )
    coms.map(async (com)=>{
      com.id_recs.push(id)
      await this.companyRepository.save(com)
    })
  }
  async verif_rec_com(id:string,name:string){
   let verif=false;
     const coms= await this.companyRepository.find({
        where:{name:name}
      });
     
      coms.map((com)=>{
        verif=com.id_recs.includes(id)
      })
    
  return verif;
  }
  async verif_ceo_com(id:string,name:string){
    let verif=false;
      const coms= await this.companyRepository.find({
         where:{name:name}
       });
      
       coms.map((com)=>{
         if(id==com.ceoId){
          verif=true;
         }
       })
     
   return verif;
   }
}
