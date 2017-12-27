import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
public Articles;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get('/api/article/all').subscribe(data=>{
      this.Articles = data;
    });
  }

}
