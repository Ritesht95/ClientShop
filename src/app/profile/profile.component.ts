import { Component, OnInit, ElementRef } from '@angular/core';
import { User } from '../classes/user';
import { SessionService } from '../services/session.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  urls: any = null;
  userData = {};
  addressData = [];
  splittedAddr = [];
  env = environment.apiURL;
  fileToUpload: File = null;
  formData: FormData = new FormData();
  userOrdersData = [];

  constructor(
    private objUser: User,
    private sessionservice: SessionService,
    private elem: ElementRef
  ) {}

  ngOnInit() {
    this.objUser.getUserData(this.sessionservice.getUserID()).subscribe(res => {
      this.userData = res;
    });

    this.objUser
      .getUserAddresses(this.sessionservice.getUserID())
      .subscribe(res => {
        this.addressData = res['records'].slice(0, 3);
        this.addressData.forEach(element => {
          element['Address'] = element['Address'].split(',');
        });
      });
    this.objUser.getUserOrders(this.sessionservice.getUserID()).subscribe(
      res => {
        this.userOrdersData = res['records'].slice(0, 3);
      }
    );
  }

  removeUserImage() {
    this.objUser
      .removeUserImage(this.sessionservice.getUserID())
      .subscribe(res => {
        this.ngOnInit();
      });
  }

  imagePreview(event: any) {
    const files = event.target.files;
    // console.log(files);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.urls = e.target.result;
      // console.log(e.target.result + ' ' + this.urls);
    };
    if (!this.validateFile(files[0].name)) {
      alert('Selected file format is not supported');
      return false;
    } else {
      console.log('start');
      this.formData.append('image', files[0], files[0].name);
      this.formData.append('Id', this.sessionservice.getUserID());
      this.objUser.setUserImage(this.formData).subscribe(res => {
        if (res['key'] === 'true') {
          alert('Profile Image changed successfully.');
        }
      });
      console.log('end');
    }
    reader.readAsDataURL(files[0]);
  }

  validateFile(name) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (
      ext.toLowerCase() === 'png' ||
      ext.toLowerCase() === 'jpg' ||
      ext.toLowerCase() === 'jpeg'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
