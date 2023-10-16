import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss'],
})
export class AccountInfoPage implements OnInit {
  loggedInUserEmail: string = '';
  loggedInUser: any;
  recharge: number = 0;

  constructor(private accountService: AccountService, private router: Router) {}

  async ionViewWillEnter() {
    this.loggedInUser = await this.accountService.getCurrentAccount();
    if (this.loggedInUser) {
      this.loggedInUserEmail = this.loggedInUser._email;
      this.recharge = this.loggedInUser._money;
    } else {
      // Nếu không có tài khoản đăng nhập, chuyển hướng về trang đăng nhập
      this.router.navigate(['/login']);
    }
  }

  homeRedirect() {
    this.router.navigate(['/home']);
  }
  ngOnInit() {}
}
