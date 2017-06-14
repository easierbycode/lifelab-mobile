import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NumberMemoryTest } from '../number-memory-test/number-memory-test';
import { MemoryTest } from '../memory-test/memory-test';
import { Reaction } from '../reaction/reaction';
import { Stroop } from '../stroop/stroop';

/*
  Generated class for the TestChoices page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-choices',
  templateUrl: 'test-choices.html'
})
export class TestChoices {

  constructor(public navCtrl: NavController) {}
  
  showNumberMemory() {
    this.navCtrl.setRoot( NumberMemoryTest )
  }
  
  showReactionTime() {
    this.navCtrl.setRoot( Reaction )
  }
  
  showVisualMemory() {
    this.navCtrl.setRoot( MemoryTest )
  }
  
  showStroop() {
    this.navCtrl.setRoot( Stroop )
  }

}
