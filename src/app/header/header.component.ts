import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  closeSidebar() {
    document.getElementById('btnSidebarClose').click();
  }

  closeLoginModal() {
    document.getElementById('btnCloseLogin').click();
  }
}
