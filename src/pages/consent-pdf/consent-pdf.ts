declare var pdfMake: any;
declare var PDFJS: any;
declare var canvas: any;

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ConsentPdf page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-consent-pdf',
  templateUrl: 'consent-pdf.html'
})
export class ConsentPdf {

  pdfData;
  
  constructor(public navCtrl: NavController, params: NavParams, public viewCtrl: ViewController) {
    pdfMake.createPdf( params.get( 'pdfData' ) ).getBase64(buffer => {
      // this.pdfData  = 'data:application/pdf;base64,' + buffer;
      this.pdfData    = atob( buffer );
      
      // PDFJS.workerSrc = '/assets/pdfjs-dist/build/pdf.worker.js';

      PDFJS.getDocument({data: this.pdfData}).then(function getPdfConsent( pdf ) {
        // Fetch the first page.
        pdf.getPage(1).then(function getPageConsent( page ) {
          var scale = 1.5;
          var viewport = page.getViewport(scale);
          // Prepare canvas using PDF page dimensions.
          var canvas = <HTMLCanvasElement> document.getElementById('pdfViewer');
          var context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          // Render PDF page into canvas context.
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render( renderContext );
        });
      });

    })
  }

  ionViewDidLoad() {
    console.log('Hello ConsentPdf Page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
