import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {mustMatch} from "../../util/utils";
import {AuthService} from "../../service/auth.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {CommonUiService} from "../../shared/service/common-ui.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;

  idRegEx = /^[a-zA-Z](?=.{0,18}[0-9])[0-9a-zA-Z]{4,19}$/;
  pwRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#$^+=!*()@%&`~,./?-_=+]).[^/<>:\\]{8,15}$/;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private commonUiService: CommonUiService) {
    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(this.idRegEx)]],
      idChk: [false, [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.pwRegEx)]],
      passwordChk: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(/^[가-힣a-zA-Z]+$/)]]
    }, {
      validators: mustMatch('password', 'passwordChk')
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  // 아이디 중복 확인
  async idDoubleChk() {
    if (!this.form.get('id').value){
      await this.commonUiService.showConfirm('아이디를 입력해 주세요.');
      return false;
    } else {
      if (this.form.controls.id.invalid) {
        await this.commonUiService.showConfirm('아이디 형식에 맞게 입력해 주세요.');
        return false;
      }
    }
    this.authService.idDoubleChk(this.form.get('id').value).pipe().subscribe(async res => {
      await this.commonUiService.showConfirm('사용 가능한 아이디입니다.');
      this.form.patchValue({idChk : true});
    }, async err => {
      await this.commonUiService.showConfirm('중복된 아이디가 있습니다.');
      return false;
    });
  }

  // 회원가입
  async signUp() {
    const reqVo: User = {
      id: this.form.get('id').value,
      password: this.form.get('password').value,
      name: this.form.get('name').value
    }
    this.authService.signUp(reqVo).pipe().subscribe(async res => {
      await this.commonUiService.showConfirm('회원가입이 완료되었습니다. <br> 로그인 화면으로 이동합니다.');
      await this.router.navigateByUrl('/login');
    }, async err => {
      await this.commonUiService.showConfirm('회원가입 도중 오류가 발생하였습니다.');
      return false;
    });
  }
}
