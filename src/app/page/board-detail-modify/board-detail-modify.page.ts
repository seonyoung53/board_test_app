import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoardService} from "../../service/board.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonUiService} from "../../shared/service/common-ui.service";
import {BoardItem} from "../../models/board";

@Component({
  selector: 'app-board-detail-modify',
  templateUrl: './board-detail-modify.page.html',
  styleUrls: ['./board-detail-modify.page.scss'],
})
export class BoardDetailModifyPage implements OnInit {
  form: FormGroup;

  idx: number;
  boardDetail: BoardItem;

  constructor(private fb: FormBuilder,
              private boardService: BoardService,
              private router: Router,
              private commonUiService: CommonUiService,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe((param: any) => {
      if (param){
        this.idx = param.idx;
        this.getBoardDetail();
      }
    });
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  // 게시글 조회
  getBoardDetail(){
    this.boardService.getBoardDetail(this.idx).subscribe(res => {
      this.boardDetail = res;
      this.form.patchValue({title: res?.title, content: res?.content});
    });
  }

  // 게시글 삭제
  async boardDelete(idx: number) {
    this.commonUiService.showYesOrNo('해당 게시글을 삭제하시겠습니까?').then(ok => {
      if (ok) {
        this.boardService.boardDelete(idx).subscribe( async res => {
          await this.commonUiService.showConfirm('게시글이 삭제되었습니다.');
          await this.router.navigateByUrl('/board');
        }, async err => {
          await this.commonUiService.showAlert('게시글을 삭제하는 도중 오류가 발생하였습니다.');
        });
      }
      });
  }

  // 게시글 수정
  async boardModify() {
    const reqVo = {
      title: this.form.get('title').value,
      content: this.form.get('content').value,
      idx: this.idx
    }
    this.boardService.boardModify(reqVo).subscribe( async res => {
      if (res) {
        await this.commonUiService.showConfirm('게시글 수정이 완료되었습니다.')
        await this.router.navigateByUrl('/board');
      }
    }, async err => {
      await this.commonUiService.showConfirm('게시글 수정 도중 오류가 발생하였습니다.')
    })
  }

}
