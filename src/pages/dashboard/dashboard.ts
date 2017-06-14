declare var PushNotification : any;
declare var window: any;
declare var cordova: any;
declare var localStorage: any;

import { Component, animate, trigger, state, style, transition } from '@angular/core';
import { AlertController, FabContainer, NavController, ModalController, Platform } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ModalsContent } from '../modals-content/modals-content';
import { BloodSpot } from '../blood-spot/blood-spot';
import { Eligibility } from '../eligibility/eligibility';
import { Reaction } from '../reaction/reaction';
import { Stroop } from '../stroop/stroop';
import { TestChoices } from '../test-choices/test-choices';
import { ConsentDocument } from '../../providers/consent-document';
import { ConsentPdf } from '../consent-pdf/consent-pdf';
import moment from 'moment';
import { Highcharts } from 'angular2-highcharts';
import HighchartsMore from 'highcharts/highcharts-more.src';
import 'rxjs';


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
  providers: [FabContainer],
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
    ]),
    trigger('slideInRight', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in-out')
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
  activeTasks;
  tasks         : FirebaseListObservable<any>;

  constructor(public af: AngularFire, alertCtrl: AlertController, consent: ConsentDocument, public modalCtrl: ModalController, public navCtrl: NavController, platform: Platform) {
    this.deviceIsSetup  = af.database.object( `withingsOauth/${localStorage.firebaseUid}` );
    var yearMonth       = moment().format( 'YYYY/MM' );
    this.dailyActivity  = this.af.database.list( `activityMeasures/${localStorage.firebaseUid}/${yearMonth}`, { query: { orderByChild: 'date', limitToLast: 1 } });
    this.dailyActivity.subscribe();
    this.sleepSummary   = af.database.list( `sleepSummaries/${localStorage.firebaseUid}/${yearMonth}`, { query: { orderByChild: 'date', limitToLast: 1 } });
    this.sleepSummary.subscribe(snap => {
      if (!snap || snap.length == 0)  return;
      
      this.sleepSummaryDate = `${yearMonth}/${snap[0].$key}`;
      this.totalSleep       = this.secondsTohhmm( snap[0].deepsleepduration + snap[0].lightsleepduration );
    });
    this.tasks          = af.database.list( 'tasks', { query: { orderByChild: 'user', equalTo: localStorage.firebaseUid } } );
    this.tasks.subscribe(snap => {
      this.activeTasks  = snap.filter(task => { return task.complete === false })
    });

    let user            = af.database.object( `users/${localStorage.firebaseUid}` );

    console.log( platform.platforms() );
    
    user.take(1).subscribe(userSnap => {

      if ( platform.is( 'android' ) && !userSnap.androidTokens )  {

        // register with google
        // then send token to backend

        // must test for PushNotification inside window to avoid ReferenceError
        if ( window.PushNotification )  {
          
          var push = PushNotification.init({
            android: {
                // senderID: 'XXXXXXXX'//,
                senderID: '854803506412'
                // topics: ['all']
            }
          });

          push.on('registration', (data) => {

            // save token to Firebase
            user.update({ androidTokens : [data.registrationId] });
            
            alert("registration id=" + data.registrationId);

            console.log('registration event: ' + data.registrationId);
            
            var oldRegId = localStorage.getItem( 'registrationId' );

            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }
          });

          push.on('notification', (data) => {
            // this.dataList.push(data);
            console.log( 'notification event: ' + data.message );
            alert(JSON.stringify(data));
            // navigator.notification.alert(
            //         data.message,         // message
            //         null,                 // callback
            //         data.title,           // title
            //         'Ok'                  // buttonName
            // );
          });

          push.on('error', (e) => {
            console.log('push error = ' + e.message);
            // this.error = e;
            alert(e);
          });

        }

      } else if ( platform.is( 'ios' ) && !userSnap.iosTokens )  {
      
        console.log( 'IS iOS!!!' );
        
        // must test for PushNotification inside window to avoid ReferenceError
        if ( window.PushNotification )  {

          console.log( 'window.PushNotification' );
          
          var push = PushNotification.init({
            ios: {
              alert: true
            }
          });

          push.on('registration', (data) => {

            // save token to Firebase
            user.update({ iosTokens : [data.registrationId] });
            
            alert("registration id=" + data.registrationId);

            console.log('registration event: ' + data.registrationId);
            
            var oldRegId = localStorage.getItem( 'iosToken' );

            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('iosToken', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }
          });

        }
  
      }
      
    })

    // if name exists they filled out consent - must be new user
    let name;  
    if ( name = consent.getParticipantName() ) {
      let consentFormSections = af.database.list( 'pages/consentForm' );  
      

      user.take(1).subscribe(userSnap => {
        
        if ( !userSnap || !userSnap.consentForm ) {
          consentFormSections.subscribe(userSnap => {

            // create consentForm sections
            userSnap.forEach(section => consent.addConsentSection( section.title, section.content ));

            // save consentForm
            var newConsentForm  = af.database.list( 'consentForms' ).push({
              base64  : consent.getDocument(),
              user    : localStorage.firebaseUid
            });

            // save user
            user.update({
              email       : localStorage.userEmail,
              consentForm : newConsentForm.key,
              firstName   : name.first,
              lastName    : name.last
            }).then(() => {

              let modal   = this.modalCtrl.create(ConsentPdf, { pdfData: consent.getDocument() });
              modal.present();
              
              
              let prompt  = alertCtrl.create({
                title   : 'Your consent form is ready!',
                message : 'Would you like a copy via email?',
                buttons: [
                  {
                    text: 'No',
                    handler: data => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'Yes',
                    handler: data => {
                      newConsentForm.update({
                        awaitingEmail: true
                      });
                    }
                  }
                ]
              });

              prompt.present();

            })
          })
        }
      })
    }
  }

  getTaskIcon( choreName ) {
    return {
      bloodSpot     : 'water',
      reactionTest  : 'finger-print',
      stroopTest    : 'timer'
    }[choreName]
  }

  showTaskModal( task ) {
    var modalComponent = (function(): any {
      switch (task.chore) {
        case 'bloodSpot':
          return BloodSpot;
        case 'stroopTest':
          return Stroop;
        case 'reactionTest':
          return Reaction;
      }
    })();

    let modal = this.modalCtrl.create(modalComponent, { taskId :task.$key });
    modal.present();
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

  openBloodSpotModal( taskId ) {
    let modal = this.modalCtrl.create(BloodSpot, { taskId });
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
  
  openTestChoices( fab: FabContainer ) {
    fab.close();
    let modal = this.modalCtrl.create( TestChoices );
    modal.present();
  }
  
  signOut( fab ) {
    fab.close();
    this.af.auth.logout();
    this.navCtrl.setRoot( Eligibility );
  }

}