import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalDataService } from '../global-data.service';
import { articles } from '../Models/articles.interface';
import { RestResourceServiceService } from '../Services/rest-resource-service.service';

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
  constructor(private restApi:RestResourceServiceService,private globalDataService:GlobalDataService,) {
      this.Article={
        title:'',
        subtitle:'',
        category:'',
        content:'',
        auther:{}
      }
   }

  ngOnInit() {
    this.restApi.getResource('/api/article/all').then(data=>{
      this.Articles = data;
    }).catch(err=>{
      console.log(err);
    })

    this.restApi.getResource('/api/auther/all').then(data=>{
      this.Authers = data;
    }).catch(err=>{
      console.log(err);
    });
  }

  save(model:articles,isValid:boolean){
    console.log(this.Article);

    this.restApi.postResource('/api/article/save',model).then(data=>{
      console.log('Article saved -> '+JSON.stringify(data));
      this.Articles.push(data);
    }).catch(err=>{
      console.log(err);
    });
  }
}
