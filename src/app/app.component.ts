import { Component } from '@angular/core';

import { GlobalDataService } from './global-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[GlobalDataService]
})
export class AppComponent {
  title = '';
  subTitle='';
  constructor(private globalDataService : GlobalDataService){
    this.title = globalDataService.getTitle();
    this.subTitle = globalDataService.getSubTitle();
  }
}
