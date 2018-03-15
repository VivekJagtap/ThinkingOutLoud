import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalDataService } from '../global-data.service';
import { articles } from '../Models/articles.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers:[GlobalDataService]
})
export class ArticlesComponent implements OnInit {
  Title = 'Articles!';
  subTitle='You can share your Experiences,Knowledge and Advices, Or you can just tell a sweet story!!';
  public Articles;
  public Article;
  public Authers;
  constructor(private http:HttpClient,private globalDataService:GlobalDataService) {
      this.Article={
        title:'',
        subtitle:'',
        category:'',
        content:'',
        auther:{}
      }
   }

  ngOnInit() {
    this.http.get('/api/article/all').subscribe(data=>{
      this.Articles = data;
    });

    this.http.get('/api/auther/all').subscribe(data=>{
      this.Authers = data;
    });
  }

  save(model:articles,isValid:boolean){
    console.log(this.Article);
    this.http.post('/api/article/save',model,{}).subscribe(data=>{
      console.log('Article saved -> '+JSON.stringify(data));
      this.Articles.push(data);
    });
  }
}
