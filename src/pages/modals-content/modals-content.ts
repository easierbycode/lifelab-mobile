declare var localStorage: any;

import { Component } from '@angular/core';
import { NavParams, Platform, ViewController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'page-modals-content',
  templateUrl: 'modals-content.html'
})
export class ModalsContent {
  
  options: any;
  sleepMeasures: FirebaseObjectObservable<any>;
  
  constructor(
    af: AngularFire,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ){
    
    var yearMonthDay    = this.params.get( 'date' );
    this.sleepMeasures  = af.database.object( `sleepMeasures/${localStorage.firebaseUid}/${yearMonthDay}` );

    this.sleepMeasures.subscribe(snap => {
      let awakeData = snap.filter(( item ) => { return item.state === 0 }).map( this.formatData );
      let lightData = snap.filter(( item ) => { return item.state === 1 }).map( this.formatData );
      let deepData  = snap.filter(( item ) => { return item.state === 2 }).map( this.formatData );

      this.options = {
        chart: {
          inverted: true,
          type: 'columnrange'
        },
        
        credits: {
          enabled: false
        },
        
        title: {
          text: null
        },
        
        tooltip: {
          formatter: function() {
            return `${this.series.name}, ${new Date( this.point.low ).toLocaleTimeString()} - ${new Date( this.point.high ).toLocaleTimeString()}`;
          }
        },
        
        yAxis: {
          gridLineWidth: 0,
          tickInterval: 3600 * 1000,
          title: {
            text: null
          },
          type: 'datetime',
          dateTimeLabelFormats : {
            hour: '%I %p',
            minute: '%I:%M %p'
          }
        },
        
        xAxis: {
          labels: {
            enabled: false
          },
          lineWidth: 0,
          tickLength: 0
        },
        
        series: [
          {
            "name": "Awake",
            "data": awakeData,
            "color": "#ffb829"
          },
          {
            "name": "Light",
            "data": lightData,
            "color": "#7684cf"
          },
          {
            "name": "Deep",
            "data": deepData,
            "color": "#3f51b5"
          }
        ]
      };
    })
  }

  formatData( item ) {
    return [item.startdate * 1000, item.enddate * 1000];
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
