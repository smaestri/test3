import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    }, () => {
      alert('ko')
    }
    )
  }

}
