import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
public data;
  constructor(private modalService: NgbModal) { }


  open(Data){
    this.data = Data;
    this.modalService.open(Data).result.then((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
