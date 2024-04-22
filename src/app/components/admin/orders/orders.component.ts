import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


import { OrderDetail } from 'src/app/modals/orderDetail';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { EditdialogComponent } from '../editdialog/editdialog.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  orderDisplayedColumns: string[] = ['orderId', 'orderStatus', 'orderAmount', 'user', 'deliveryAddress',  'deliveryPostCode','deliveryContactNumber' ];

  constructor(private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getOrders();
  }
  
  getOrders() {
    this.cartService.getAllOrders().subscribe(
      (orders: OrderDetail[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error fetching orders:', error);
        this.snackBar.open('Failed to fetch orders. Please try again later.', 'Close', {
          duration: 3000,
        });
      }
    );
}


  

openEditDialog(order): void {
  console.log("the order data", order);
  const dialogRef = this.dialog.open(EditdialogComponent, {
    width: '250px',
    data: { order },
    panelClass: 'my-dialog',
    backdropClass: 'my-dialog-backdrop'
  });

  dialogRef.afterClosed().subscribe(result => {
    
    
      this.getOrders(); 
    
  });
}


}