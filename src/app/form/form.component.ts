import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormArray} from '@angular/forms';
import { Subscription} from 'rxjs';

import { OrdersService } from '../services/orders.service';
import { AssetService } from '../services/asset.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  garmentColors: any[] = [];
  garmetGenders: any[] = [];
  garmetSizes: any[] = [];
  garmetTextilType: any[] = [];

  subscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private AssetService: AssetService, private ordersService: OrdersService) {
    this.form = this.fb.group ({
      name: ['', Validators.required],
      cell_phone: ['', Validators.required],
      email: [''],
      orders: this.fb.array([], Validators.required)
    });
   }

  ngOnInit(): void {
    this.AssetService.getColors().subscribe(colors => this.garmentColors = colors);
    this.AssetService.getGenders().subscribe(genders => this.garmetGenders = genders);
    this.AssetService.getSizes().subscribe(sizes => this.garmetSizes = sizes);
    this.AssetService.getTextilType().subscribe(textilType => this.garmetTextilType = textilType);
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
      sizeOption: ['0', Validators.required],
      printType: ['', Validators.required],
      coments: ['']
    })
    this.orders.push(newOrder);
    console.log(this.form.value);
  }

  saveOrder() {
    this.ordersService.saveFormData(this.form.value).subscribe(res => {
      console.log(res);
    })
  }

  get buttonDisabled() {
    let isValid = (this.form.invalid && this.form.controls["orders"].value.length === 0, this.form.controls["orders"].invalid);
    return isValid
  }
}
