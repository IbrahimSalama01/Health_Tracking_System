import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import {ToastModule} from 'primeng/toast';

import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-contact-us',
  imports: [
     CommonModule,
     ImageModule ,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    CardModule,
    MessagesModule,
    MessageModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  providers: [MessageService]
})
export class ContactUsComponent {
  contactForm: FormGroup;
  submitted = false;
  img :string= 'images/contactdoc.png'

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone:['',[Validators.required]] ,
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.messageService.add({
        key: 'tl',
        severity: 'success',
        summary: 'Success',
        detail: 'Your message has been sent successfully!'
      });
      console.log('Form Submitted');
      this.contactForm.reset();
      this.submitted = false;
    } else {

      this.messageService.add({
        key: 'tl',
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields correctly'
      });
    }
  }
}
