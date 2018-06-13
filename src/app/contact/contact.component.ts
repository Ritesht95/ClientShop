import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Session } from 'protractor';
import { SessionService } from '../services/session.service';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  webInfo: any = '';

  constructor(private userObj: User, private sessionservice: SessionService, private router: Router, private services: ServicesService) { }

  ngOnInit() {
    this.services.getWebInfo().subscribe(res => {
      if (res['key'] === 'false') {
        this.webInfo = res;
        console.log( this.webInfo);
      } else {
        this.webInfo = res;
      }
    });
  }

  sendFeedback(Name: string, Email: string, Message: string) {
    this.services.sendMessage(Name, Email, Message).subscribe(
      res => {
        if (res['key'] === 'true') {
            console.log('sucessfully send feedback');
        } else {
          console.log('error');
        }
      }
    );
    this.router.navigate(['home']);
  }

}
