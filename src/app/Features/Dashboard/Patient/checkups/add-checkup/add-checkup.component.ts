import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-add-checkup',
  imports: [ButtonModule, DialogModule, AvatarModule],
  templateUrl: './add-checkup.component.html',
  styleUrl: './add-checkup.component.css',
})
export class AddCheckupComponent {
  visible = false;

  showDialog() {
    this.visible = true;
  }
}
