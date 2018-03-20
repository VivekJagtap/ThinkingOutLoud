import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestResourceServiceService {
  header = new HttpHeaders({'x-access-token':localStorage.getItem('jwtApplicationToken')});
  constructor(private http:HttpClient) { 
  }

 /**
  * For requesting Get Resource.
  * @param url 
  */
 getResource(url){
  return new Promise((resolve,reject)=>{
    this.http.get(url,{headers:this.header}).subscribe(data=>{
      resolve(data);
    },err=>{
      reject(err);
    });
  })
   
 }

 /**
  * For requesting Post Resource.
  * @param url
  * @param model 
  */
 postResource(url,model){
  return new Promise((resolve,reject)=>{
    this.http.post(url,model,{headers:this.header}).subscribe(data=>{
      resolve(data);
    },err=>{
      reject(err);
    })
  });
 }

 /**
  * For requesting Put method.
  * @param url
  * @param model 
  */
 putResource(url,model){
   return new Promise((resolve,reject)=>{
      this.http.put(url,model,{headers:this.header}).subscribe(data=>{
        resolve(data);
      },err=>{
        reject(err);
      });
   });
 }

 /**
  * For requesting delete resource.
  * @param url 
  */
 deleteResource(url){
   return new Promise((resolve,reject)=>{
      this.http.delete(url,{headers:this.header}).subscribe(data=>{
          resolve(data);
      },err=>{
          reject(err);
      });
   })
   
 }

}
