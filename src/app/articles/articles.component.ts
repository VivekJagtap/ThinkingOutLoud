import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalDataService } from '../global-data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers:[GlobalDataService]
})
export class ArticlesComponent implements OnInit {
  title = 'Articles!';
  subTitle='You can share your Experiences,Knowledge and Advices, Or you can just tell a sweet story!!';
  public Articles;
  constructor(private http:HttpClient,private globalDataService:GlobalDataService) {
   }

  ngOnInit() {

    this.http.get('/api/article/all').subscribe(data=>{
      this.Articles = data;
    });
  }

}
