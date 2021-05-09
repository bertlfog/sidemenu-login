import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    pwd: new FormControl(''),
  });
  private error: string;

  constructor(private auth: AuthService, private router: Router, private loadingCtrl:LoadingController) { }

  ngOnInit() {

  }

  LogInWithGoogle(){
    console.log('Login with Google');
    this.presentLoading().then(x => {
      
      this.auth.googleSignin()
      .then(data => {
        console.log('user logged in');
        this.loadingCtrl.dismiss();
        this.router.navigateByUrl('/account');
      })
      .catch(error => {
        this.loadingCtrl.dismiss();
        this.displayError('Error on Login', error);
      });
    });  
  }
  LogIn() {
    console.log(this.loginForm.value);
    this.presentLoading().then(x => {
      
      this.auth.emailSignin(this.loginForm.value.email, this.loginForm.value.pwd)
      .then(data => {
        console.log('user logged in');
        this.loadingCtrl.dismiss();
        this.router.navigateByUrl('/account');
      })
      .catch(error => {
        this.error = error.message;
        this.loadingCtrl.dismiss();
        this.displayError('Error on Login', error);
      });
    });  
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create();
    
    return await loading.present();
  }
  displayError(header:string, error:any){
    console.log(header, error);
  }
}
