import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IsEligible } from '../is-eligible/is-eligible';
import { IsNotEligible } from '../is-not-eligible/is-not-eligible';

/*
  Generated class for the EligibilityQuestionsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'eligibility-questions.html',
})
export class EligibilityQuestions {

  is18        = '';
  isCitizen   = '';
  isLiterate  = '';

  allSelected = false
  allYes      = false
  
  constructor(private navCtrl: NavController) {

  }

  enableNextIfAllSelected() {
    let questions     = [this.is18, this.isCitizen, this.isLiterate];
    this.allSelected  = questions.every(q => { return q !== '' });
    this.allYes       = questions.every(q => { return q === 'yes' });
  }

  showEligibilityResult() {
    if ( this.allYes )  return this.navCtrl.setRoot( IsEligible );
    
    return this.navCtrl.setRoot( IsNotEligible );
  }

}