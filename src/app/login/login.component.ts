import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    public commonService: CommonService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    const isValidForm = () =>
      this.loginForm.get('username').value === this.commonService.validUserDetails.username &&
      this.loginForm.get('password').value === this.commonService.validUserDetails.password;

    if (isValidForm) {
      this.commonService.loggedIn = true;
      this.router.navigateByUrl('/landing');
    }
  }

}
