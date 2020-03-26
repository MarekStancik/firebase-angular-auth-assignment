import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";

export class StockControllerFirebase implements StockController{
    constructor(private StockService: StockService){
        
    }
}