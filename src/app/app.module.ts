import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Login } from '../pages/login/login';
import { BloodSpot } from '../pages/blood-spot/blood-spot';
import { ConsentPdf } from '../pages/consent-pdf/consent-pdf';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Eligibility } from '../pages/eligibility/eligibility';
import { EligibilityQuestions } from '../pages/eligibility-questions/eligibility-questions';
import { IsEligible } from '../pages/is-eligible/is-eligible';
import { IsNotEligible } from '../pages/is-not-eligible/is-not-eligible';
import { LearnMoreModal } from '../pages/learn-more-modal/learn-more-modal';
import { MemoryTest } from '../pages/memory-test/memory-test';
import { ModalsContent } from '../pages/modals-content/modals-content';
import { NumberMemoryTest } from '../pages/number-memory-test/number-memory-test';
import { SharingOptions } from '../pages/sharing-options/sharing-options';
import { Question1 } from '../pages/question1/question1';
import { Question2 } from '../pages/question2/question2';
import { QuestionsComplete } from '../pages/questions-complete/questions-complete';
import { Reaction } from '../pages/reaction/reaction';
import { Stroop } from '../pages/stroop/stroop';
import { TestChoices } from '../pages/test-choices/test-choices';
import { Consent } from '../pages/consent/consent';
import { NameCapture } from '../pages/name-capture/name-capture';
import { Signature } from '../pages/signature/signature';
import * as firebase from 'firebase';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { ChartModule } from 'angular2-highcharts';
import { ConsentDocument } from '../providers/consent-document';
import { Safe } from '../pipes/safe';

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
    BloodSpot,
    ConsentPdf,
    Dashboard,
    ModalsContent,
    NumberMemoryTest,
    Eligibility,
    EligibilityQuestions,
    IsEligible,
    IsNotEligible,
    LearnMoreModal,
    MemoryTest,
    SharingOptions,
    Question1,
    Question2,
    QuestionsComplete,
    Reaction,
    Stroop,
    TestChoices,
    Consent,
    NameCapture,
    Signature,
    Safe
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
    BloodSpot,
    ConsentPdf,
    Dashboard,
    ModalsContent,
    NumberMemoryTest,
    Eligibility,
    EligibilityQuestions,
    IsEligible,
    IsNotEligible,
    LearnMoreModal,
    MemoryTest,
    SharingOptions,
    Question1,
    Question2,
    QuestionsComplete,
    Reaction,
    Stroop,
    TestChoices,
    Consent,
    NameCapture,
    Signature
  ],
  providers: [ConsentDocument]
})
export class AppModule {}
