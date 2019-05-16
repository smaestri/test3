import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { UserModel } from '../shared/usermodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: UserModel = {
    email: '',
    password: ''
  }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user).subscribe(() => {
      this.router.navigate(['/home/my-books']);
    }, () => {
      alert('erreur d\'authentification');
    }
    )
  }

}
