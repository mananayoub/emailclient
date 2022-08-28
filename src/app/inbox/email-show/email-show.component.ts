import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss']
})
export class EmailShowComponent implements OnInit {
  email!: Email;

  constructor(
    private route: ActivatedRoute) {

     this.email = route.snapshot.data['email'];
     
     this.route.data.subscribe(({  email }) => {
        this.email = email;
     });
    }

  ngOnInit(): void {    
  }
}
