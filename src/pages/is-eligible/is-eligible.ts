import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Consent } from '../consent/consent';

/*
  Generated class for the IsEligiblePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'is-eligible.html',
})
export class IsEligible {

  constructor(private navCtrl: NavController) {

  }

  showConsent() {
    this.navCtrl.setRoot( Consent )
  }

}