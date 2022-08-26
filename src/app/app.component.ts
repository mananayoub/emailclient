import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  signedin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.signedin$.subscribe((signedin) => {
      this.signedin = signedin;
    });
  }
}
