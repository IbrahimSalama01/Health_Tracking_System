import { Component, input } from '@angular/core';
import { sidenavItem } from '../../../utils/Interfaces';
import { SideBarItemComponent } from '../../../Shared/side-bar-item/side-bar-item.component';
import {RippleModule} from 'primeng/ripple';
@Component({
  selector: 'app-sidebar',
  imports: [SideBarItemComponent,RippleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidenavItems = input.required<sidenavItem[]>()
  hover = false
}
