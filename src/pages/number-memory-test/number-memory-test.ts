import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-number-memory-test',
  templateUrl: 'number-memory-test.html'
})
export class NumberMemoryTest {

  currentAnswer;
  level;
  state;
  timeLimit;
  timerStartedAt;
  userAnswer;
  
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.state = "SPLASH";
    this.level = 0;
  }
  
  nextQuestion() {
    
    this.userAnswer = undefined;
    
      var e, n, i, r;
      this.state = "QUESTION",
      this.level += 1,
      i = this.level,
      n = "" + Math.floor(9 * Math.random() + 1),
      r = function() {
          var t, n, r;
          for (r = [],
          e = t = 0,
          n = i - 1; n >= 0 ? n > t : t > n; e = n >= 0 ? ++t : --t)
              r.push("" + Math.floor(10 * Math.random()));
          return r
      }(),
      this.currentAnswer = n + r.join(""),
      this.timeLimit = 800 * i + 1e3,
      this.timerStartedAt = new Date,
      setTimeout(function(t) {
          return function() {
              return t.promptForAnswer()
          }
      }(this), this.timeLimit)
  }
  
  promptForAnswer() {
      this.state = "PROMPT";
  }
  
  submitAnswer() {
      // this.userAnswer = String( t ),
      if ( this.userAnswer == undefined || this.userAnswer == '' )  return;
      this.state = "SHOWANSWER"
  }
  
  currentAnswerIsCorrect() {
      return String( this.userAnswer ) === this.currentAnswer
  }
  
  wasDigitRight(t) {
      return String( this.userAnswer )[t] === this.currentAnswer[t]
  }
  
  onKeydown( t ) {
    console.log( t );
      51 === t.which && "SHOWANSWER" === this.state && this.currentAnswerIsCorrect() && this.nextQuestion()
  }
  
  getMainClass() {
      switch (this.state) {
      case "SHOWANSWER":
          return this.currentAnswerIsCorrect() ? "correct" : "incorrect";
      default:
          return this.state.toLowerCase()
      }
  }
  
  getDisplayTimer() {
      return 1 - ((new Date).getTime() - this.timerStartedAt.getTime()) / this.timeLimit
  }
  
  save() {

  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
