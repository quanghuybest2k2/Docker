import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly localStorageKey = 'accounts';
  private readonly localStorageAccountKey = 'account';
  private readonly loggedInKey = 'loggedIn';
  public accounts: Account[] = [];
  public account: Account | null = null;

  constructor(private storageService: StorageService) {
    this.addAccount('quanghuybest@gmail.com', '123456');
  }

  // Lấy danh sách tài khoản từ localStorage
  async getAccounts(): Promise<Account[]> {
    try {
      const response = await fetch('http://localhost/accounts');

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Fetching the accounts failed.');
      }

      return resData.accounts as Account[];
    } catch (error) {
      console.error('Error:', error);
      console.log('server is down!!');
      return [];
    }
  }

  getCurrentAccount(): Promise<Account | null> {
    const accounts = this.storageService.get(this.localStorageAccountKey);

    console.log(typeof accounts);
    return accounts;
  }

  async login(email: string, password: string): Promise<boolean> {
    const accounts = await this.getAccounts();

    const foundAccount = accounts.some(
      (acc) => acc._email === email && acc._password === password
    );

    if (foundAccount) {
      await this.storageService.set(this.loggedInKey, 'true');
      this.account = {
        _email: email,
        _password: password,
        _money: 100000,
      } as Account;
      await this.storageService.set(this.localStorageAccountKey, this.account);
      return true;
    }

    return false;
  }

  async logout(): Promise<void> {
    this.account = null;
    await this.storageService.set(this.localStorageAccountKey, null);
    await this.storageService.set(this.loggedInKey, 'false');
  }

  // Thêm tài khoản mới
  async addAccount(email: string, password: string): Promise<any> {
    try {
      const response = await fetch('http://localhost/accounts', {
        method: 'POST',
        body: JSON.stringify({
          _email: email,
          _password: password,
          _money: 100000,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the goal failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('server is down!!');
    }

    this.accounts = await this.getAccounts();
  }

  // Xoá tài khoản
  async deleteAccount(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(
        'http://localhost/accounts/' + email + '/' + password,
        {
          method: 'DELETE',
        }
      );

      const resData = await response.json();

      console.log(response);
      console.log(resData);

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the goal failed.');
      }

      this.accounts = await this.getAccounts();

      return true;
    } catch (err) {
      return false;
    }
  }
}
