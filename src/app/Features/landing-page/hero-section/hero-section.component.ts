import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  imports:[CarouselModule,ButtonModule,TagModule],
  host: {ngSkipHydration: 'true'},
})
export class HeroSectionComponent  {
  heroImg = 'images/image.png';
  background = 'images/background.jpg';


  responsiveOptions = [

    {
      breakpoint: '1200px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  images = [
    {
      title: 'Track Your Health',
      subtitle: 'Monitor daily activities and stay fit' ,
      src: 'images/img1.jpg',
    } ,
    {
    src:'images/img2.jpg',
     title: 'Heart Rate Analysis',
    subtitle: 'Real-time heart monitoring'
    },
    {
    src: 'images/img3.jpg',
      title: 'Sleep Insights',
    subtitle: 'Improve your sleep quality'
    },
    {
      src:'images/img4.jpg',
        title: 'Heart Rate Analysis',
    subtitle: 'Real-time heart monitoring'

    },
    {
      src:'images/img5.jpg',
        title: 'Heart Rate Analysis',
      subtitle: 'Real-time heart monitoring'
    }
  ];


}
