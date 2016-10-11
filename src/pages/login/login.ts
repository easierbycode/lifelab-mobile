declare var localStorage: any;

import { Component, animate, keyframes, trigger, state, style, transition } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseAuth } from 'angularfire2';
import { Dashboard } from '../dashboard/dashboard';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'login.html',
  animations: [
    // logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    // background image
    trigger('scrollBgPosition', [
      state('in', style({
        backgroundPosition: '50% 50%'
      })),
      transition('void => *', [
        style({ backgroundPosition:'0% 0%' }),
        animate( '1500ms ease-in-out' )
      ])
    ]),

    // login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    // login button
    trigger('fadeIn', [
        state('in', style({
            opacity: 1
        })),
        transition('void => *', [
            style({opacity: 0}),
            animate('1000ms 2000ms ease-in')
        ])
    ])
  ]
})
export class Login {

  bgState: any = 'in';
  formState: any = 'in';
  loginState: any = 'in';
  logoState: any = 'in';
  user = { email:'tgloerstad@gmail.com', password:'trondheim' };
  
  constructor(private auth: FirebaseAuth, private navCtrl: NavController) {

  }

  doLogin( credentials ) {
    this.auth.login( credentials ).then(( authData : any ) => {
      localStorage.firebaseUid  = authData.uid;
      localStorage.authToken    = authData.auth.kd;
      this.loginSuccess();
    });
  }

  loginSuccess(): void {
    this.navCtrl.setRoot( Dashboard )
  }

}