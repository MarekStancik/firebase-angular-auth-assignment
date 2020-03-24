import { RegionRepository } from "./region.repository";

export class RegionService{
    constructor(private repo: RegionRepository){
    }

    updateReg():void{
        this.repo.updateReg();
    }
}