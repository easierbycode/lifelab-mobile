declare var pdfMake: any;

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import moment from 'moment';

/*
  Generated class for the ConsentDocument provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConsentDocument {

  consentDocument;
  pdfDefinition;
  pdfContent;
  pdfTitle;
  pdfName;
  pdfSignature;
  
  constructor(public http: Http) {
    console.log('Hello ConsentDocument Provider');
    this.initDocument();
  }

  initDocument() {
    this.pdfDefinition = { 
            pageSize: 'LEGAL',
            pageMargins: [ 50, 50, 50, 50 ],
            styles: {
                title: { fontSize: 18, bold: true },
                header: { fontSize: 15, bold: true },
                paragraph: { fontSize: 12, alignment: 'justify' },
                footer: { fontSize: 10, alignment: 'center', margin: [ 0,10,0,0 ] }
            }//,
            //footer: function(currentPage, pageCount) { return { text: 'Page ' + currentPage.toString() + ' of ' + pageCount, style: 'footer' }; },
        };

    this.pdfContent = [{ text: 'Consent', style: 'title' }, ' '];
  }

//   addConsentTitle( title ) {
//     if ( !this.pdfDefinition )  this.initDocument();
//     this.pdfContent = [{ text: title, style: 'title' }, ' '];
//   }

  addConsentSection( title, content ) {
    this.pdfContent.push({ text: title, style: 'header' });
    this.pdfContent.push({ text: content, style: 'paragraph' });
  }

//   addConsentBody( content ) {
//     if ( this.pdfDefinition ) {
//       this.pdfContent.push({ text: content, style: 'paragraph' });
//     }
//   }

  addParticipantName( formData ) {
    this.pdfName = formData.firstName + ' ' + formData.lastName;
  }

  addParticipantSignature( signature ) {
    this.pdfSignature = signature;
  }

    addConsentParticipant() {
        // if ( this.pdfDefinition ) {
            this.pdfContent.push({ text: '\n\n\n', style: 'paragraph' });
            this.pdfContent.push({ image: this.pdfSignature, fit: [150, 150] });
            this.pdfContent.push({
                columns: [
                    {
                        width: '*',
                        text: this.pdfName.toUpperCase()
                    },
                    {
                        width: '*',
                        text: moment().format( 'MM/DD/YYYY' )
                    }
                ],
                columnGap: 10
            });            
            this.pdfContent.push({
                columns: [
                    {
                        width: '*',
                        text: '______________________________'
                    },
                    {
                        width: '*',
                        text: '______________________________'
                    }
                ],
                columnGap: 10
            });
            this.pdfContent.push({
                columns: [
                    {
                        width: '*',
                        text: 'Participant Name & Signature' 
                    },
                    {
                        width: '*',
                        text: 'Date'
                    }
                ],
                columnGap: 10
            });
        // }
    }

    getParticipantName() {
      if ( this.pdfName ) {
        let namePieces  = this.pdfName.split(' ');
        return {
          first : namePieces[0],
          last  : namePieces[1]
        }
      }
    }
    
    getDocument() {

        // didn't fill out consent - must be existing user
        if ( !this.pdfName || !this.pdfSignature )  return;

        // if ( this.pdfDefinition ) {
        this.addConsentParticipant();
        this.pdfDefinition.content = this.pdfContent;
            // this.consentDocument = pdfMake.createPdf( this.pdfDefinition );
        // }
        // return this.consentDocument;
        return this.pdfDefinition;
    }; 

}
