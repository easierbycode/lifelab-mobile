import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the LearnMoreModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-learn-more-modal',
  templateUrl: 'learn-more-modal.html'
})
export class LearnMoreModal {

  learnMoreText;
  
  constructor(public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.learnMoreText = this.params.get( 'learnMoreText' );
  }

  ionViewDidLoad() {
    console.log('Hello LearnMoreModal Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
