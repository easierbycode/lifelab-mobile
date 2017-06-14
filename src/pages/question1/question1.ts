import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Question2 } from '../question2/question2';
import { QuestionsComplete } from '../questions-complete/questions-complete';

/*
  Generated class for the Question1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-question1',
  templateUrl: 'question1.html'
})
export class Question1 {

  answer: string;
  
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Question1 Page');
  }

  showQuestion2() {
    this.navCtrl.setRoot( Question2 )
  }

  showQuestionsComplete() {
    this.navCtrl.setRoot( QuestionsComplete )
  }

}
