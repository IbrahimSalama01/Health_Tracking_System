import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-popular-doctors',
  imports: [CarouselModule, CardModule ,ButtonModule ,CommonModule , ButtonModule , TagModule],
  templateUrl: './popular-doctors.component.html',
  styleUrl: './popular-doctors.component.css',
  host: {ngSkipHydration: 'true'},
})
export class PopularDoctorsComponent {
  responsiveOptions = [

    {
      breakpoint: '1440px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1200px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
      showIndicators: false
    },
    {
      breakpoint: '600px',
      numVisible: 1,
      numScroll: 1,
      showIndicators: false

    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
      showIndicators: false
    }
  ];
  doctors = [
    {
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      experience: "10 years",
      bio: "Dr. Smith specializes in heart diseases and has successfully treated numerous patients with complex cardiovascular conditions.",
      img: "images/doc3.jpg"
    },
    {
      name: "Dr. Sarah Johnson",
      specialty: "Neurologist",
      experience: "8 years",
      bio: "Dr. Johnson is an expert in neurology, focusing on treating brain and nervous system disorders.",
      img: "images/doc2.jpg"
    },
    {
      name: "Dr. Emily Davis",
      specialty: "Orthopedic Surgeon",
      experience: "12 years",
      bio: "Dr. Davis has extensive experience in treating bone and joint disorders, offering both surgical and non-surgical treatments.",
      img: "images/doc1.png"
    },
    {
      name: "Dr. Michael Brown",
      specialty: "Pediatrician",
      experience: "15 years",
      bio: "Dr. Brown specializes in child healthcare, offering treatment and advice for children from infancy to adolescence.",
      img: "images/doc4.png"
    }
  ];
}
