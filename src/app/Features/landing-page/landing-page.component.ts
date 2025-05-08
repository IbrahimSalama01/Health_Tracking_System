import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { AboutComponent } from "./about/about.component";
import { ServiesComponent } from "./servies/servies.component";
import { PopularDoctorsComponent } from "./popular-doctors/popular-doctors.component";

@Component({
  selector: 'app-landing-page',
  imports: [HeroSectionComponent, AboutComponent, ServiesComponent, PopularDoctorsComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
