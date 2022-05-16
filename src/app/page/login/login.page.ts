import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {CommonUiService} from "../../shared/service/common-ui.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private commonUiService: CommonUiService) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit() {
  }

  // 로그인
  async login(){
    this.authService.login(this.form.value).subscribe( async res => {
      if (res) {
        await this.router.navigateByUrl('/board');
      }
    }, async err => {
      await this.commonUiService.showConfirm(err.error?.message);
    })
  }
}
