import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ideas } from '../Models/ideas.interface';
import { RestResourceServiceService } from '../Services/rest-resource-service.service'; 
@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {
  title = 'Ideas';
  subTitle='An idea can make you or break you!!';
  public Ideas;
  public Authers;
  public Idea;
  constructor(private restApi:RestResourceServiceService) {
    this.Idea={
      thought:'',
      category:'',
      context:'',
      auther:{}
    }
   }

  ngOnInit() {
    this.restApi.getResource('/api/ideas/all').then(data=>{
      this.Ideas = data;
    }).catch(err=>{
      console.log(err);
    });

    this.restApi.getResource('/api/auther/all').then(data=>{
      this.Authers = data;
    }).catch(err=>{
      console.log(err);
    });
  }

  save(model:ideas,isValid:boolean){
    this.restApi.postResource('/api/ideas/save',model).then(data=>{
      this.Ideas.push(data);
    });
  }
}
