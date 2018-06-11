import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { stat } from 'fs';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  addressID = '';
  addressData = '';

  constructor(
    private actRoute: ActivatedRoute,
    private userObj: User,
    private sessionservice: SessionService
  ) {}

  ngOnInit() {
    this.actRoute.queryParams.subscribe(params => {
      this.addressID = params['id'];
    });
    this.userObj.getSingleAddress(this.addressID).subscribe(res => {
      this.addressData = res;
    });
  }

  addAddress(
    Name: string,
    PhoneNo: string,
    Pincode: string,
    Locality: string,
    Address: string,
    City: string,
    State: string,
    Landmark: string,
    Country: string,
    AddressType: string
  ) {
    if (this.addressID === undefined) {
      this.addressID = 'new';
    }
    console.log(this.addressID);
    this.userObj
      .addAddress(
        this.sessionservice.getUserID(),
        this.addressID,
        Name,
        PhoneNo,
        Pincode,
        Locality,
        Address,
        City,
        State,
        Landmark,
        Country,
        AddressType
      )
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }
}
