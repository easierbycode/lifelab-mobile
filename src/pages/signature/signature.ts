interface ExtendedElement extends Element {
  offsetHeight: number
}

declare var window: any;

import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Login } from '../login/login';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ConsentDocument } from '../../providers/consent-document';

/*
  Generated class for the SignaturePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'signature.html'
})
export class Signature {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signatureData: string;
  
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 568, //548
    'canvasHeight': 275 //320
  };
  
  // constructor(private navCtrl: NavController, private platform: Platform, public push: Push) {
  constructor(public consent: ConsentDocument, private navCtrl: NavController, private platform: Platform) {
    // push.register().then((t: PushToken) => {
    //   return push.saveToken(t, {ignore_user:true});
    // }).then((t: PushToken) => {
    //   console.log('Token saved:', t.token);
    // });

    // push.rx.notification()
    //   .subscribe((msg) => {
    //     console.log( 'PUSH MESSAGE RECEIVED' );
    //     console.log( msg );
    //     alert(msg.title + ': ' + msg.text);
    //   });
  }

  ngAfterViewInit() {
    // set screen orientation to landscape
    window.screen.lockOrientation && window.screen.lockOrientation('landscape');

    let headerHeight = (<ExtendedElement[]><any>document.getElementsByTagName('ion-header'))[0].offsetHeight;
    
    // this.signaturePad is now available
    if (this.platform.is( 'ios' )) {
      this.signaturePad.set( 'canvasWidth', window.screen.availHeight + 20 );
      this.signaturePad.set( 'canvasHeight', window.screen.availWidth - headerHeight );
    } else {
      this.signaturePad.set( 'canvasWidth', window.screen.availWidth );
      this.signaturePad.set( 'canvasHeight', window.screen.availHeight - headerHeight );
    }
  }

  doOnEnd() {
    // will be notified of szimek/signature_pad's onEnd event
    this.signatureData = this.signaturePad.toDataURL();
  }

  clearSignature() {
    this.signaturePad.clear();
    this.signatureData  = null;
  }

  showLogin() {
    this.consent.addParticipantSignature( this.signatureData );
    this.navCtrl.setRoot( Login )
  }

}