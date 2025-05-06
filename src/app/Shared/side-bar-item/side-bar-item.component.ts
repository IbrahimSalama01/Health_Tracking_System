import { Component,input } from '@angular/core';
import { sidenavItem } from '../../utils/Interfaces';
import {ButtonModule} from 'primeng/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-side-bar-item',
  imports: [ButtonModule,RouterLink],
  templateUrl: './side-bar-item.component.html',
  styleUrl: './side-bar-item.component.css'
})
export class SideBarItemComponent {
  item = input.required<sidenavItem>();
  hovered  = input.required<boolean>();
}
