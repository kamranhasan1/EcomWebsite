import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  constructor(private toastr: ToastrService) {}
  userName: string = '';
  userEmail: string = '';
  message: string = '';

  onSubmit(e: Event) {
    if (this.userName === '' || this.userEmail === '' || this.message === '') {
      this.toastr.error('Please fill in all the fields');
      return;
    }

    emailjs
      .sendForm(
        'service_aagorxh',
        'template_l98bzgi',
        e.target as HTMLFormElement,
        'Mgvlq7j63f0-nV-yu'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          this.toastr.success('Thankyou for your response!');
        },
        (error) => {
          console.log(error);
        }
      );

    this.userName = '';
    this.userEmail = '';
    this.message = '';
  }
}
