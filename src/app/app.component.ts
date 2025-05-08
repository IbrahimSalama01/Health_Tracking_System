import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Core/Layout/navbar/navbar.component';
import { LandingPageComponent } from "./Features/landing-page/landing-page.component";
import { FooterComponent } from "./Core/Layout/footer/footer.component";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LandingPageComponent, FooterComponent,ButtonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Health_Tracking_System';
  toggleDarkMode(){
    const element = document.querySelector('html');
    if(element !== null){
      element.classList.toggle('my-app-dark')
    }
  }

}

