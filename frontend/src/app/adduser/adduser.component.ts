import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { UserModel } from '../shared/usermodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  private user: UserModel = {
    email: '',
    lastName: '',
    firstName: '',
    password: ''
  };

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
  }

  save() {
    this.loginService.saveUser(this.user).subscribe((resp) => {
      this.loginService.login(this.user).subscribe(() => {
        this.router.navigate(['/home/my-books']);
      })
    }, (response) => {
      if (response && response.status === 409) {
        alert('utilisateur existe deja avec cet e-mail');
        return;
      }

      if (response && response.error &&
        response.error.errors && response.error.errors.length > 0) {
         alert('erreurs détectées : ' + JSON.stringify(response.error.errors))
        };
      })
    }
}
