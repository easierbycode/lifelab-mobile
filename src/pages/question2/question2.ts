import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Question2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-question2',
  templateUrl: 'question2.html'
})
export class Question2 {

  answer: boolean;
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Question2 Page');
  }

}
