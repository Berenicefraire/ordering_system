import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormArray} from '@angular/forms';
import { Subscription, take} from 'rxjs';

import { OrdersService } from '../../services/orders.service';
import { AssetService } from '../../services/asset.service';
@Component({
  selector: 'new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
  form: FormGroup;
  garmentColors: any[] = [];
  garmetGenders: any[] = [];
  garmetSizes: any[] = [];
  garmetTextilType: any[] = [];
  orderPlaces: any[] = [];

  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private AssetService: AssetService, private ordersService: OrdersService) {
    this.form = this.fb.group ({
      name: ['', Validators.required],
      cell_phone: ['', Validators.required],
      email: [''],
      orderPlace: ['', Validators.required],
      orders: this.fb.array([], Validators.required)
    });
   }

  ngOnInit(): void {
    this.AssetService.getColors().pipe(take(1)).subscribe(colors => this.garmentColors = colors);
    this.AssetService.getGenders().pipe(take(1)).subscribe(genders => this.garmetGenders = genders);
    this.AssetService.getSizes().pipe(take(1)).subscribe(sizes => this.garmetSizes = sizes);
    this.AssetService.getTextilType().pipe(take(1)).subscribe(textilType => this.garmetTextilType = textilType);
    this.AssetService.getOrderPlace().pipe(take(1)).subscribe(orderPlace => this.orderPlaces = orderPlace);
    console.log(this.form)
  }

  get orders() {
    return this.form.controls["orders"] as FormArray;
  }

  addNewOrder() {
    const newOrder = this.fb.group({
      design: ['', Validators.required],
      payment: ['', Validators.required],
      totalCost: ['', Validators.required],
      cost: ['', Validators.required],
      colorsOption: ['', Validators.required],
      genderOption: ['', Validators.required],
      sizeOption: ['', Validators.required],
      printType: ['', Validators.required],
      coments: ['']
    })
    this.orders.push(newOrder);
  }

  saveOrder() {
    const payload = {
      customer: {
        name: this.form.get('name')?.value,
        cell_phone: this.form.get('cell_phone')?.value,
        email: this.form.get('email')?.value,
        order_place: this.form.get('orderPlace')?.value,
      },
      orders: this.form.get('orders')?.value
    }
    this.ordersService.saveFormData(payload).subscribe(res => {
      console.log(res)
    })
  }

  get buttonDisabled() {
    let isValid = (this.form.invalid && this.form.controls["orders"].value.length === 0);
    return isValid
  }
}
