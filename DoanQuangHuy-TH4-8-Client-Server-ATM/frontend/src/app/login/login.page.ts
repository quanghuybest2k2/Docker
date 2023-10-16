import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData: { email: string; password: string } = {
    email: 'quanghuybest@gmail.com',
    password: '123456',
  };

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {}
  // Điều hướng
  goHomePgae() {
    this.router.navigateByUrl('/home');
  }

  validator(): boolean {
    if (!this.formData.email || !this.formData.password) {
      alert('Vui lòng nhập cả email và mật khẩu.');
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(this.formData.email)) {
      alert('Vui lòng nhập một địa chỉ email hợp lệ.');
      return false;
    }

    return true;
  }
  // thêm tài khoản
  async addAccount() {
    const { email, password } = this.formData;
    try {
      await this.accountService.addAccount(email, password);
      alert('Tài khoản đã được thêm thành công.');
      // Gọi hàm loadAccounts() để cập nhật danh sách tài khoản
      this.loadAccounts();
    } catch (error) {
      console.error('Lỗi khi thêm tài khoản:', error);
      alert('Có lỗi xảy ra khi thêm tài khoản.');
    }
  }
  async login() {
    const { email, password } = this.formData;

    try {
      const loggedIn = await this.accountService.login(email, password);
      if (loggedIn) {
        this.router.navigate(['/home']); // Thay thế '/home' bằng đường dẫn đúng
        alert('Đăng nhập thành công.');
      } else {
        alert('Sai tên tài khoản hoặc mật khẩu!');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
  }
  async deleteAccount() {
    const { email, password } = this.formData;

    try {
      const deleted = await this.accountService.deleteAccount(email, password);
      if (deleted) {
        this.router.navigateByUrl('/login');
        alert('Xóa tài khoản thành công.');
      } else {
        alert('Xóa tài khoản không thành công.');
      }
    } catch (error) {
      console.error('Lỗi xóa tài khoản:', error);
    }
  }
  async loadAccounts() {
    try {
      const accounts = await this.accountService.getAccounts();

      if (accounts.length > 0) {
        const accountDetails = accounts
          .map((account) => {
            return `Email: ${account._email}\nMật khẩu: ${account._password}\nSố tiền: ${account._money}`;
          })
          .join('\n\n');

        alert(`Danh sách tài khoản:\n\n${accountDetails}`);
      } else {
        alert('Không có tài khoản nào.');
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách tài khoản:', error);
    }
  }
}
