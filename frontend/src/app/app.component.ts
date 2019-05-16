import { Component } from '@angular/core';
import { LoginService } from './shared/login.service';
import { SpinnerService } from './shared/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sharebook-frontend';

  spinnerVisible: boolean;

  constructor(private loginService: LoginService,
    private spinnerService: SpinnerService,
    private router: Router) {
    this.spinnerService.spinnerObs$.subscribe(visible => {
      // prevent ExpressionChangedAfterItHasBeenCheckedError angular error
      setTimeout(() => {
        this.spinnerVisible = visible;
      })
    });
  }
}
