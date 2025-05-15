import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../Core/Layout/sidebar/sidebar.component';
import { sidenavItem, user } from '../../../utils/Interfaces';
import { RouterOutlet } from '@angular/router';
import { DashboardNavbarComponent } from '../../../Core/Layout/dashboard-navbar/dashboard-navbar.component';
import { AuthService } from '../../../Core/services/auth/auth.service';
@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, RouterOutlet,DashboardNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  items!: sidenavItem[]
  user!:user

constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user: user|null) => {
      this.user = user!;
    })
    if (this.user.role == 'patient') {
      this.items = [
        { name: 'Dashboard', icon: 'pi pi-chart-pie', route: '/dashboard' },
        { name: 'Checkups', icon: 'pi pi-inbox', route: 'checkups' },
        { name: 'My Doctors', icon: 'pi pi-users', route: 'my-doctors' },
      ]
    }
  }
}
