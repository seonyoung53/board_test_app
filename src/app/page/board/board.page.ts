import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {AlertController, NavController} from "@ionic/angular";
import {CommonService} from "../../shared/service/common.service";
import {CommonUiService} from "../../shared/service/common-ui.service";
import {BoardService} from "../../service/board.service";
import {Page} from "../../models/page";
import {BoardItem} from "../../models/board";

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  page: Page = {
    currentPage: 1, // 현재 페이지
    pageLimit: 10, // 표출 할 게시글 수
    pageOffset: 0, // 기준점
    total: 0, // 총 게시글 수
    totalPage: 0 // 총 페이지 수
  }

  boardList: BoardItem[];

  constructor(private authService: AuthService,
              private router: Router,
              private alertCtrl: AlertController,
              private commonService: CommonService,
              private commonUiService: CommonUiService,
              private boardService: BoardService,
              private navController: NavController)
  {
    this.boardService.getBoardList$.subscribe((res: any) => {
      this.boardReset();
      this.getBoardList();
    });
    this.boardReset();
    this.getBoardList();
  }

  ngOnInit() {
  }

  // 게시판 리스트 조회
  getBoardList() {
    this.boardService.getBoardList(this.page).subscribe( res => {
      for (const item of res?.items) {
        this.boardList.push(item);
      }
      this.page.total = res?.total;
      const ttPage: any = this.page.total / this.page.pageLimit;
      this.page.totalPage = parseInt(ttPage) +1;
    }, err => {
      this.commonUiService.showAlert('게시판 리스트를 조회하는 도중 오류가 발생하였습니다.');
    });
  }

  // 게시글 상세 조회
  // TODO navController > router
  goDetailPage(idx: number) {
    this.navController.navigateRoot('/board-detail-modify', { queryParams : { idx: idx } });
  }

  // 인피니티 스크롤 적용
  loadData(event){
    setTimeout(() => {
      this.page.currentPage++; // 페이지 수 증가
      this.page.pageOffset += this.page.pageLimit;
      event.target.complete();
      this.getBoardList();
      if (this.page.currentPage >= this.page.totalPage){
        event.target.disabled = true;
      }
    }, 500);
  }

  // 로그아웃
  async logout(){
    this.commonUiService.showYesOrNo('로그아웃 하시겠습니까?')
      .then(ok => {
        if (ok) {
          this.authService.logout().subscribe( async res => {
            if (res) {
            }
          }, async err => {
            await this.commonUiService.showConfirm('로그아웃 되었습니다.');
            this.commonService.clearStorage();
            await this.router.navigateByUrl('/login');
          })
        }
      });
  }

  // 게시판 조건 초기화
  boardReset(){
    this.page = {
      currentPage: 1, // 현재 페이지
      pageLimit: 10, // 표출 할 게시글 수
      pageOffset: 0, // 기준점
      total: 0, // 총 게시글 수
      totalPage: 0 // 총 페이지 수
    }
    this.boardList = [];
  }
}
