import { RegionController } from "./region.controller";
import { RegionService } from "./region.service";

export class RegionControllerFirebase implements RegionController{
    constructor(private regionService: RegionService){}
}