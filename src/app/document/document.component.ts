import { Component, OnInit, OnDestroy } from '@angular/core';
import {DocumentService} from '../document.service';
import {Subscription} from 'rxjs';
import {Document} from '../document';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy {

  document:Document;
  private _docSub:Subscription;

  constructor(private documentService:DocumentService) { }

  ngOnInit() {
    this._docSub = this.documentService.CurrentDocument.pipe(
          startWith({ id: '', doc: 'Select an existing document or create a new one to get started'})
        ).subscribe(document => this.document = document);
  }

  ngOnDestroy(){
    this._docSub.unsubscribe();
  }

  editDoc(){
    this.documentService.editDocument(this.document);
  }
}
