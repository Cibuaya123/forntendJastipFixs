import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  openItemDetails() {
    this.router.navigateByUrl('/item-details');
  }

  logout() {
    // Logika logout di sini
    // Misalnya, menghapus token atau menghancurkan sesi login

    // Arahkan pengguna ke halaman login
    this.router.navigate(['/login']);
  }
}
