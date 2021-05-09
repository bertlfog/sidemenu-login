import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public user: string;
  public pwd: string;
  public pwdrep: string;
  private error: string;

  constructor(private auth: AuthService, private router: Router, private loadingCtrl:LoadingController) { }

  ngOnInit() {
  }

  Signup(){
    if (this.pwd != this.pwdrep){
      this.error = "Passwort stimmt nicht überein!";
    }
    {
      this.error ="";
      console.log(this.user, this.pwd);
      this.presentLoading().then(x => {
      
      this.auth.signUp(this.user, this.pwd)
      .then(data => {
        console.log('user logged in');
        this.loadingCtrl.dismiss();
        this.router.navigateByUrl('/main');
      })
      .catch(error => {
        this.error = error.message;
        this.loadingCtrl.dismiss();
        
      });
    });  
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create();
    
    return await loading.present();
  }
}
