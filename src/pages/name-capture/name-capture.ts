import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Signature } from '../signature/signature';

/*
  Generated class for the NameCapture page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-name-capture',
  templateUrl: 'name-capture.html'
})
export class NameCapture {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello NameCapture Page');
  }

  showSignature() {
    this.navCtrl.setRoot( Signature );
  }

}
