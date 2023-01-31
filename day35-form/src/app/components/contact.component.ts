import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from '../model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm !: FormGroup
  values$ !: Subscription
  state$ !: Subscription

  constructor(private fb: FormBuilder, private cSvc: ContactService) { }

  ngOnInit(): void {
    this.initForm()
  }

  postContact() {
    const data: Contact = this.contactForm.value as Contact
    console.info('>>>> form data: ', data)

    this.cSvc.postContact(data)
      .then(result => {
        console.info('>>> posted details: ', result)
        this.initForm()
      })
      .catch(error => {
        console.error('>>> error: ', error)
      })
  }

  private initForm() {
    this.contactForm = this.createForm()
    if (this.values$) {
      this.values$.unsubscribe()
      this.state$.unsubscribe()
    }
    this.values$ = this.contactForm.valueChanges.subscribe(
      (values) => {
        console.info(">>> values: ", values)
    })

    this.state$ = this.contactForm.statusChanges.subscribe(
      (state) => {
        console.info(">>> state: ", state)
    })
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email])
    })
  }
  
}