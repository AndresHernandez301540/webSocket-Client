import { Component, OnInit, OnDestroy } from '@angular/core';

import {Observable,Subscription} from 'rxjs';
import {DocumentService} from '../document.service';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Observable<string[]>;
  currentDoc:String;
  private _docSub:Subscription;


  constructor(private documentService:DocumentService) { }

  ngOnInit() {
    this.documents=this.documentService.documents;
    this._docSub=this.documentService.CurrentDocument.subscribe(doc=>this.currentDoc=doc.id);
  }

  ngOnDestroy(){
    this._docSub.unsubscribe();
  }

  loadDoc(id:String){
    this.documentService.getDocument(id);
  }

  newDoc(){
    this.documentService.newDocument();
  }


}
