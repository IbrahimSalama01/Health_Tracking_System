import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [
    FormsModule,
    MenubarModule,
    ColorPickerModule,
    RouterModule,
    ImageModule,
    ButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  host: { ngSkipHydration: 'true' },
})
export class NavbarComponent implements OnInit {
  logoImg: string = 'images/icon.png';
  items: MenuItem[] = [];
  selectedColor: string = '#007bff';

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: '/',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'About',
        routerLink: '/about',
        routerLinkActiveOptions: { exact: true },
      },
      {
        label: 'Services',
        routerLink: '/services',
        routerLinkActiveOptions: { exact: true },
      },
      { label: 'Contacts', routerLink: '/contacts' },
    ];
    console.log('Menu items:', this.items);
  }
  // ngOnDestroy(): void {
  //   console.log('NavbarComponent destroyed');
  // }
}
