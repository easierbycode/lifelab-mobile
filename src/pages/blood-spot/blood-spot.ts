declare var cordova: any;
declare var localStorage: any;

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the BloodSpot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-blood-spot',
  templateUrl: 'blood-spot.html'
})
export class BloodSpot {

  barcodeData;
  
  constructor(public af: AngularFire, public navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    console.log( 'taskId: ', params.get('taskId') );
  }

  ionViewDidLoad() {
    console.log('Hello BloodSpot Page');
  }

  scan() {
    cordova.plugins.barcodeScanner.scan(( barcodeData ) => {
      // Sample has been linked to your account and is ready to mail!
      this.barcodeData = barcodeData;
      var task  = this.af.database.object( `tasks/${this.params.get('taskId')}` );
      task.update({ barcode: barcodeData.text, complete: true, completedAt: Date.now() });
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
