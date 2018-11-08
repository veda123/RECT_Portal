import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../report-details/confirmation-dialog/confirmation-dialog.component';


@Injectable()
export class ConfirmationDialogService {
  
  constructor(private modalService: NgbModal) {}
  
  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    btnCancelText: string = 'Cancel',
    
    dialogSize: 'sm'|'lg' = 'lg'): Promise<boolean> {
    let modalRef = this.modalService.open(ConfirmationDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
