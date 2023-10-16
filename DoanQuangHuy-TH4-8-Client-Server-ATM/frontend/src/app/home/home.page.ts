import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loggedInUserEmail: string = '';

  constructor(private route: Router, private accountService: AccountService) {}

  ionViewWillEnter() {
    // Lấy email từ local storage
  }
  // go to next page
  goCameraPage() {
    this.route.navigate(['/camera']);
  }
  goMap() {
    this.route.navigate(['/map']);
  }
  nextpage() {
    this.route.navigate(['/account-info']);
  }

  async logout() {
    try {
      await this.accountService.logout();
      alert('Đăng xuất thành công.');
      this.route.navigate(['/login']);
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      alert('Có lỗi xảy ra khi đăng xuất.');
    }
  }

  ngOnInit() {}
}
