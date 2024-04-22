import { Delivery } from './delivery';

export class OrderDetail {
    orderId: number;
    orderStatus: string;
    orderAmount: number;
    user: any;
    delivery: Delivery;

    constructor(
        orderStatus: string,
        orderAmount: number,
        user: any,
        delivery: Delivery
    ) {
        this.orderStatus = orderStatus;
        this.orderAmount = orderAmount;
        this.user = user;
        this.delivery = delivery;
    }
}