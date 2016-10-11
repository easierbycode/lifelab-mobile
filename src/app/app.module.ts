import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Login } from '../pages/login/login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Eligibility } from '../pages/eligibility/eligibility';
import { EligibilityQuestions } from '../pages/eligibility-questions/eligibility-questions';
import { IsEligible } from '../pages/is-eligible/is-eligible';
import { IsNotEligible } from '../pages/is-not-eligible/is-not-eligible';
import { LearnMoreModal } from '../pages/learn-more-modal/learn-more-modal';
import { ModalsContent } from '../pages/modals-content/modals-content';
import { SharingOptions } from '../pages/sharing-options/sharing-options';
import { Question1 } from '../pages/question1/question1';
import { Question2 } from '../pages/question2/question2';
import { QuestionsComplete } from '../pages/questions-complete/questions-complete';
import { Consent } from '../pages/consent/consent';
import { NameCapture } from '../pages/name-capture/name-capture';
import { Signature } from '../pages/signature/signature';
import * as firebase from 'firebase';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { ChartModule } from 'angular2-highcharts';

export const firebaseConfig = {
  apiKey: "AIzaSyCIxTVbDqxREaM6b5nFfrEp88WbdUQfNUk",
  authDomain: "lifelab-1259.firebaseapp.com",
  databaseURL: "https://lifelab-1259.firebaseio.com",
  storageBucket: ""
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    Login,
    Dashboard,
    ModalsContent,
    Eligibility,
    EligibilityQuestions,
    IsEligible,
    IsNotEligible,
    LearnMoreModal,
    SharingOptions,
    Question1,
    Question2,
    QuestionsComplete,
    Consent,
    NameCapture,
    Signature
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp( firebaseConfig, firebaseAuthConfig ),
    ChartModule,
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Dashboard,
    ModalsContent,
    Eligibility,
    EligibilityQuestions,
    IsEligible,
    IsNotEligible,
    LearnMoreModal,
    SharingOptions,
    Question1,
    Question2,
    QuestionsComplete,
    Consent,
    NameCapture,
    Signature
  ],
  providers: []
})
export class AppModule {}
