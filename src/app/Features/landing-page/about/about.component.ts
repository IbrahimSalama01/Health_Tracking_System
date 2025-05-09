import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-about',
  imports: [CardModule, AvatarModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  img :string ="images/doctor.png"
}
