import { Injectable } from '@angular/core';

@Injectable()
export class GlobalDataService {
  title = 'Your Thoughts,Your Way!';
  subTitle='Our thought is most powerful thing in the world, If you think you can be something then you will become something!';
  constructor() { }

  setTitle(Title){
    this.title = Title;
  }

  getTitle(){
    return this.title;
  }

  setSubTitle(SubTitle){
    this.subTitle = SubTitle;
  }

  getSubTitle(){
    return this.subTitle;
  }
}
