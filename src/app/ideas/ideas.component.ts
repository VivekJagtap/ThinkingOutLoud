import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {
public Ideas;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get('/api/ideas/all').subscribe(data=>{
      this.Ideas = data;
    });
  }

}
