import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, Slides } from 'ionic-angular';
import { SharingOptions } from '../sharing-options/sharing-options';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { DomSanitizer } from '@angular/platform-browser'
import { LearnMoreModal } from '../learn-more-modal/learn-more-modal';

/*
  Generated class for the Consent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-consent',
  templateUrl: 'consent.html'
})
export class Consent {

  @ViewChild( 'consentSlider' ) slider: Slides
  
  // lastSlide = false;
  pages: FirebaseListObservable<any>;
  sliderOptions = { pager:false };
  
  constructor(af: AngularFire, public modalCtrl: ModalController, public navCtrl: NavController, public sanitizer: DomSanitizer) {
    this.pages  = af.database.list( 'pages/consentForm' )
  }

  ionViewDidLoad() {
    console.log('Hello Consent Page');
  }

  nextSlide() {
    // if( this.slider.getActiveIndex() == this.slider.length() - 2 )  this.lastSlide  = true;

    if ( this.slider.getActiveIndex() < this.slider.length() - 1 ) {
      this.slider.slideNext(); 
    } else {
      this.showSharingOptions();
    }
  }

  showSharingOptions() {
    this.navCtrl.setRoot( SharingOptions )
  }

  showLearnMoreModal( learnMoreText ) {
    let modal = this.modalCtrl.create( LearnMoreModal, learnMoreText );
    modal.present();
  }

}
