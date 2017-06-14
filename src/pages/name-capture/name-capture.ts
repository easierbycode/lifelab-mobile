import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Signature } from '../signature/signature';
import { ConsentDocument } from '../../providers/consent-document'

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

  firstName : string;
  lastName  : string;
  
  constructor(public consent: ConsentDocument, public navCtrl: NavController) {}
  
  addParticipantNameThenShowSignature( form ) {
    this.consent.addParticipantName( form.value );
    this.navCtrl.setRoot( Signature );
  }

}
