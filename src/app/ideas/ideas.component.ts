import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ideas } from '../Models/ideas.interface';
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
  constructor(private http:HttpClient) {
    this.Idea={
      thought:'',
      category:'',
      context:'',
      auther:{}
    }
   }

  ngOnInit() {
    this.http.get('/api/ideas/all').subscribe(data=>{
      this.Ideas = data;
    });

    this.http.get('/api/auther/all').subscribe(data=>{
      this.Authers = data;
    });
  }

  save(model:ideas,isValid:boolean){
    this.http.post('/api/ideas/save',model,{}).subscribe(data=>{
      console.log("Idea created "+data);
    });
  }
}
