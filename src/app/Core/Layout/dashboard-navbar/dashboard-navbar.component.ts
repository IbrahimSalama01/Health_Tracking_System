import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import {AvatarModule} from 'primeng/avatar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { user } from '../../../utils/Interfaces';

@Component({
  selector: 'app-dashboard-navbar',
  imports: [ToolbarModule,ButtonModule, AvatarModule,IconFieldModule,InputIconModule],
  templateUrl: './dashboard-navbar.component.html',
  styleUrl: './dashboard-navbar.component.css'
})
export class DashboardNavbarComponent {
  user = input.required<user>()
}
