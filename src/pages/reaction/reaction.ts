import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the Reaction page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reaction',
  templateUrl: 'reaction.html'
})
export class Reaction {

  maxTaps         = 10;
  responseTimes   = [];
  tapsAvgTime     : number;
  tapsCurrentTime : number;
  taps            = 0;
  tapsTotalTime   = 0;
  tapsStartTime   : number;
  taskId;
  view            = 'instructions'
  
  constructor(public af: AngularFire, public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.taskId = params.get( 'taskId' );
  }

  showResults() {
    this.view         = 'results';

    if ( !this.taskId )  return;
    
    let task  = this.af.database.object( `tasks/${this.taskId}` );

    task.update({
      averageResponseTime : this.tapsAvgTime,
      complete            : true,
      completedAt         : Date.now(),
      responseTimes       : this.responseTimes
    });
  }
  
  showWaiting() {
    this.view = 'waiting';
    setTimeout(() => {
      this.view = 'go';
      this.tapsStartTime  = Date.now();
    }, 1000 + Math.random() * 6000);
  }
  
  clickedBg() {
    if ( this.view == 'instructions' || this.view == 'result' ) this.showWaiting();

    if ( this.view == 'go' ) {
      this.tapsCurrentTime  = Date.now() - this.tapsStartTime;
      this.responseTimes.push( this.tapsCurrentTime );
      this.tapsTotalTime    += this.tapsCurrentTime;
      this.taps++;
      this.tapsAvgTime      = (this.tapsTotalTime / this.taps) / 1000;

      if ( this.taps < this.maxTaps ) {
        this.showWaiting()
      } else {
        this.showResults()
      }
    } 
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
