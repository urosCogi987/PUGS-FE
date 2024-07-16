import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    
  }

  contactForm : FormGroup = new FormGroup({
    senderName: new FormControl('', Validators.required),     // boga im i frontendu
    senderEmail: new FormControl('', [Validators.required, Validators.email]),
    senderMessage: new FormControl('', [Validators.required, Validators.minLength(10)])
  });    

  submitForm() {
    console.log(this.contactForm.valid)
  }
}
