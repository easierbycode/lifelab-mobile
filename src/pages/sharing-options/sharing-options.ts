import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Question1 } from '../question1/question1';

/*
  Generated class for the SharingOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sharing-options',
  templateUrl: 'sharing-options.html'
})
export class SharingOptions {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SharingOptions Page');
  }

  showQuestion1() {
    this.navCtrl.setRoot( Question1 )
  }

}
