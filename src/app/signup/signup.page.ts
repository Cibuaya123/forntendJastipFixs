import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form = {
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmation_password: ''
  };

  constructor(
    private util: UtilService,
    private navCtrl: NavController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async signup() {
    // Enabling Side Menu
    this.util.setMenuState(true);

    console.log(this.form);

    try {
      const res = await fetch(environment.urlApi + '/api/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          address: this.form.address,
          password: this.form.password,
          confirmation_password: this.form.confirmation_password
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

      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error(error);
    }
  }
}
