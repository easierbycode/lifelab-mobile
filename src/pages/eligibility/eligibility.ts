import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { NavController } from 'ionic-angular';
import { EligibilityQuestions } from '../eligibility-questions/eligibility-questions';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the EligibilityPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-eligibility',
  templateUrl: 'eligibility.html',
})
export class Eligibility {

  slides: FirebaseListObservable<any>;
  slideOptions = { pager:true }

  
  constructor(af: AngularFire, public sanitizer: DomSanitizer, private navCtrl: NavController) {
    this.slides  = af.database.list( 'pages/tutorial' )
  }

  showEligibilityQuestions() {
    this.navCtrl.setRoot( EligibilityQuestions )
  }

  showLogin() {
    this.navCtrl.setRoot( Login )
  }

}