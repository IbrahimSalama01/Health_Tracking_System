import { Component } from '@angular/core';
import { SidebarComponent } from '../../../Core/Layout/sidebar/sidebar.component';
import { sidenavItem } from '../../../utils/Interfaces';
import { RouterOutlet } from '@angular/router';
import { DashboardNavbarComponent } from '../../../Core/Layout/dashboard-navbar/dashboard-navbar.component';
@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, RouterOutlet,DashboardNavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  items!: sidenavItem[]
  userType = 'patient'
  user= {id:"1",name:"Ibrahim Salama", email:"qXV0n@example.com",type:"patient",gender:"male",address:{city:"cairo",country:"egypt"},
    image:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" }
  constructor() {
    if (this.userType == 'patient') {
      this.items = [
        { name: 'Dashboard', icon: 'pi pi-chart-pie', route: '/dashboard' },
        { name: 'Checkups', icon: 'pi pi-inbox', route: 'checkups' },
        { name: 'My Doctors', icon: 'pi pi-users', route: 'my-doctors' },
      ]
    }
  }
}
