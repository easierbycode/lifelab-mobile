import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NameCapture } from '../name-capture/name-capture';

/*
  Generated class for the QuestionsComplete page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-questions-complete',
  templateUrl: 'questions-complete.html'
})
export class QuestionsComplete {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello QuestionsComplete Page');
  }

  showNameCapture() {
    this.navCtrl.setRoot( NameCapture )
  }

}
