import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = {
    email: '',
    password: ''
  };

  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async login() {
    // Enabling Side Menu
    this.util.setMenuState(true);

    console.log(this.form);

    try {
      const res = await fetch(environment.urlApi + '/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.form.email,
          password: this.form.password
        })
      });

      const data = await res.json();

      if (res.status !== 200) {
        this.toastController.create({
          message: data.message,
          duration: 2000
        }).then(toast => toast.present());

        return;
      }

      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error(error);
    }
  }
}
