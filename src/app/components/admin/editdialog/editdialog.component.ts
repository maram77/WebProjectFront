import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { OrderDetail } from 'src/app/modals/orderDetail';
import {OrdersComponent} from '../orders/orders.component'
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']
})
export class EditdialogComponent implements OnInit {

  editedText: string;
  saveResult: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
      console.log('Received data:', this.data);
      
  }

  save(): void {
    const orderId = this.data.order.orderId;
    console.log('Data retreived from the data:', orderId);
    const updatedOrderDetail: OrderDetail = {
      orderId: orderId,
      orderAmount: this.data.order.orderAmount,
      user: this.data.order.user,
      delivery: this.data.order.delivery,
      orderStatus: this.editedText
    };

    this.cartService.updateOrderDetail(orderId, updatedOrderDetail).subscribe(
      (updatedOrder) => {
        console.log('Order status updated successfully:', updatedOrder);
      
        this.dialogRef.close();
      },
      (error) => {
        console.error('Failed to update order status:', error);
      }
    );
  }
}