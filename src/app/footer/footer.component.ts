import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Session } from 'protractor';
import { SessionService } from '../services/session.service';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  webInfo: any = '';
  var1: any = '';
  var2: any = '';
  var3: any = '';

  constructor(private userObj: User, private sessionservice: SessionService, private router: Router, private services: ServicesService) { }

  ngOnInit() {
    this.services.getWebInfo().subscribe(res => {
      if (res['key'] === 'false') {
        this.webInfo = res;
        this.var1 = this.webInfo.Name.split(' ');
        this.var3 = this.var1[0];
        this.var2 = this.var1[1];
        console.log( this.webInfo);
      } else {
        this.webInfo = res;
        this.var1 = this.webInfo.Name.split(' ');
        this.var3 = this.var1[0];
        this.var2 = this.var1[1];
        // document
        //   .getElementById('profileImageIn')
        //   .setAttribute(
        //     'src',
        //     environment.apiURL + 'Assets/WebsiteLogo/' + this.webInfo.Logo
        //   );
        // document
        //   .getElementById('profileImageIn')
        //   .setAttribute('alt', this.webInfo.LogoAlt);
      }
    });
  }

}
