import { OrderlineModel } from "./orderline.model";

export interface OrderModel{
    id: string;
    date: number;
    orderLines: OrderlineModel[];
    visible: boolean;
}