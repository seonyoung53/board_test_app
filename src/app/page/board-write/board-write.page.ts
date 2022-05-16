import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoardService} from "../../service/board.service";
import {Router} from "@angular/router";
import {CommonUiService} from "../../shared/service/common-ui.service";

@Component({
  selector: 'app-board-write',
  templateUrl: './board-write.page.html',
  styleUrls: ['./board-write.page.scss'],
})
export class BoardWritePage implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private boardService: BoardService,
              private router: Router,
              private commonUiService: CommonUiService) { }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  // 게시글 작성
  async boardWrite() {
    this.boardService.boardWrite(this.form.value).subscribe( async res => {
      if (res) {
        await this.commonUiService.showConfirm('게시글 작성이 완료되었습니다.')
        await this.boardService.getBoardList$.next(null);
        await this.router.navigateByUrl('/board');
      }
    }, async err => {
      await this.commonUiService.showConfirm('게시글 작성이 도중 오류가 발생하였습니다.')
    })
  }

}
