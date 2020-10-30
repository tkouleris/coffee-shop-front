import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrdersService} from '../services/orders.service';
import {OrderPayload} from '../dto/responses/order-payload';
import {OrdersResponse} from '../dto/responses/OrdersResponse';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:Array<OrderPayload>

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    let table_id = +this.route.snapshot.paramMap.get('table_id');
    this.loadOrders(table_id);
  }

  loadOrders(table_id:number)
  {
    this.ordersService.getUnpaidTableOrders(table_id).subscribe( (response: OrdersResponse) => {
      this.orders = response.data;
    });
  }

  payOrder(id: number) {

  }

  deliverOrder(id: number) {

  }
}
