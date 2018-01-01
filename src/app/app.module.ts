import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './UiComponents/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticlesComponent } from './articles/articles.component';
import { IdeasComponent } from './ideas/ideas.component';
import { AutherComponent } from './auther/auther.component';
import { ModalComponent } from './UiComponents/modal/modal.component';

// Define the routes
const ROUTES = [
  {
    path: '*',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'articles',
    component: ArticlesComponent
  },
  {
    path: 'ideas',
    component: IdeasComponent
  },
  {
    path: 'auther',
    component: AutherComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    DashboardComponent,
    ArticlesComponent,
    IdeasComponent,
    AutherComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
