export interface Game {
  answerCount ?: number
  color       ?: string
  colorClass  ?: string
  colorText   ?: string
  countDown   ?: number
  rightCount  ?: number
  started     ?: boolean
  wrongCount  ?: number
}

import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the Stroop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-stroop',
  templateUrl: 'stroop.html'
})
export class Stroop implements OnDestroy {

  avgResponseTime : number;
  game            : Game = {};
  icon;
  iconTimer       : NodeJS.Timer;
  maxQuestions    = 10;
  responses       = [];
  taskId;
  totalScore      : number;
  totalTime       = 30;

  colorLookup = {
    'r': {
      'text': 'red',
      'color': '#ee6e73'
    },
    'g': {
      'text': 'green',
      'color': '#26a69a'
    },
    'b': {
      'text': 'blue',
      'color': '#2196F3'
    },
    'o': {
      'text': 'orange',
      'color': '#ff9800'
    }
  };

  iconLookup = {
    right: {
      icon: 'thumbs-up',
      color: '#26a69a'
    },
    wrong: {
      icon: 'thumbs-down',
      color: '#ee6e73'
    },
    empty: {
      icon: 'thumbs-down',
      color: '#fff'
    }
  };
  
  constructor(public af: AngularFire, public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.reset();
    this.taskId  = this.params.get( 'taskId' );
  }

  ngOnDestroy() {
    this.reset();
  }

  reset() {
    this.game.countDown = 30;
    this.game.color = 'b';
    this.game.colorClass = this.colorLookup.b.color;
    this.game.colorText = this.colorLookup.r.text;
    this.game.started = false;
    this.game.rightCount = 0;
    this.game.wrongCount = 0;
    this.icon = this.iconLookup.right;

    this.game.answerCount = 0;
  }

  start() {
    if (this.game.started) return;
    this.game.started = true;
    this.icon = this.iconLookup.empty;

    this.setNextProblem();
  }

  stopGame() {
    this.game.started = false;
    this.totalScore = this.game.rightCount;

    let responseTimes     = [];
    let totalResponseTime = 0;
    
    this.responses.forEach((response) => {
      let responseTime  = response.end - response.start;
      totalResponseTime += responseTime;
      responseTimes.push( responseTime );
    });

    this.avgResponseTime  = (totalResponseTime / this.responses.length) / 1000;

    if ( !this.taskId )  return;
    
    let task  = this.af.database.object( `tasks/${this.taskId}` );
    
    task.update({
      answersCorrect      : this.game.rightCount,
      answersIncorrect    : this.game.wrongCount,
      averageResponseTime : this.avgResponseTime,
      complete            : true,
      completedAt         : Date.now(),
      responseTimes       : responseTimes
    });
  }

  getRandom() {
    var choice = ["g", "r", "b", "o"];
    return choice[Math.floor(Math.random() * 4)];
  }

  setNextProblem() {
    var textKey = this.getRandom();
    this.game.colorText = this.colorLookup[textKey].text
    //get the key
    var key = this.getRandom();
    while (key == textKey || key == this.game.color) {
        key = this.getRandom();
    }
    this.game.color = key;
    this.game.colorClass = this.colorLookup[key].color;

    this.responses.push({ start: Date.now() });
  }

  clicked(color) {

    this.responses[this.responses.length-1].end = Date.now();

    clearTimeout( this.iconTimer );
    this.icon = this.iconLookup.empty;
    var clicked = color;
    var isRight = clicked == this.game.color;
    
    this.game.answerCount++;
    
    if (isRight) {
      this.game.rightCount++;
      this.icon = this.iconLookup.right;
    } else {
      this.game.wrongCount++;
      this.icon = this.iconLookup.wrong;
    }
    this.iconTimer = setTimeout(() => {
      this.icon = this.iconLookup.empty;
      
      if (this.game.answerCount == this.maxQuestions) {
        this.stopGame();

      } else {      
        this.setNextProblem();
      }      
    }, 500);
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
