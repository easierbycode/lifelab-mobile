declare var cordova: any;
declare var localStorage: any;

import { Component, animate, trigger, state, style, transition } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ModalsContent } from '../modals-content/modals-content';
import moment from 'moment';
import { Highcharts } from 'angular2-highcharts';
import HighchartsMore from 'highcharts/highcharts-more.src';


HighchartsMore(Highcharts);

Highcharts.setOptions({
	global: {
		useUTC: false
	}
});

/*
  Generated class for the Dashboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  animations: [
    trigger('flyInTopSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,-2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ])
  ]
})
export class Dashboard {

  dailyActivity : FirebaseListObservable<any>;
  deviceIsSetup : FirebaseObjectObservable<any>;
  mastheadState = 'in';
  sleepSummary  : FirebaseListObservable<any>;
  sleepSummaryDate;
  totalSleep;
  
  constructor(af: AngularFire, public modalCtrl: ModalController, public navCtrl: NavController) {
    this.deviceIsSetup  = af.database.object( `withingsOauth/${localStorage.firebaseUid}` );
    var yearMonth       = moment().format( 'YYYY/MM' );
    this.dailyActivity  = af.database.list( `activityMeasures/${localStorage.firebaseUid}/${yearMonth}`, { query: { orderByChild: 'date', limitToLast: 1 } });
    this.dailyActivity.subscribe();
    this.sleepSummary   = af.database.list( `sleepSummaries/${localStorage.firebaseUid}/${yearMonth}`, { query: { orderByChild: 'date', limitToLast: 1 } });
    this.sleepSummary.subscribe(snap => {
      this.sleepSummaryDate = `${yearMonth}/${snap[0].$key}`;
      this.totalSleep       = this.secondsTohhmm( snap[0].deepsleepduration + snap[0].lightsleepduration )
    });
  }

  secondsTohhmm( totalSeconds ) {
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);

    return `${hours}:${this.pad( minutes, 2 )}`;
  }

  pad( num, size ) {
    var s = '0' + num;
    return s.substr( s.length - size );
  }

  openModal( date ) {
    let modal = this.modalCtrl.create(ModalsContent, { date });
    modal.present();
  }
  
  openWithingsOauth() {
    var browserRef = cordova.InAppBrowser.open(
        `http://api.golifelab.com/?firebaseUid=${localStorage.firebaseUid}`,
        '_blank',
        'location=no,clearsessioncache=yes,clearcache=yes'
    );

    browserRef.addEventListener( 'loadstart', ( event ) => {
        if (( event.url ).startsWith( 'http://api.golifelab.com/activity/intraday' )) {
          browserRef.close();
        }
    });
  }

}