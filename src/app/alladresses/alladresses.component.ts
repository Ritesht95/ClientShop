import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-alladresses',
  templateUrl: './alladresses.component.html',
  styleUrls: ['./alladresses.component.css']
})
export class AlladressesComponent implements OnInit {
  addressData = [];
  splittedAddr = [];

  constructor(private objUser: User, private sessionservice: SessionService) {}

  ngOnInit() {
    this.objUser
      .getUserAddresses(this.sessionservice.getUserID())
      .subscribe(res => {
        this.addressData = res['records'];
        this.addressData.forEach(element => {
          element['Address'] = element['Address'].split(',');
        });
      });
  }
}
