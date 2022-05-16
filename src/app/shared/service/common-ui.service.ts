import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class CommonUiService {

  constructor(private alertCtrl: AlertController) { }

  // 닫기 버튼
  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: '닫기',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await alert.present();
  }

  // 확인 버튼
  async showConfirm(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: '확인',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });
    await alert.present();
  }

  // 예, 아니오 버튼
  async showYesOrNo(message: string, title?: string) {
    const buttons = [
      { textId: '예', role: 'confirm' },
      { textId: '아니오', role: 'cancel' }
    ];
    return this.showOptions(buttons, message, title);
  }

  showOptions(
    buttons: ButtonDef[],
    message: string,
    title?: string,
    backdropDismiss: boolean = true
  ): Promise<boolean|any> {
    return new Promise(async (resolve) => {
      const header = title ? title : '';
      const buttonsWithAction = buttons.map(btn => {
        let handler: any;

        if (btn.role === 'cancel') {
          handler = () => resolve(false);
        } else if (btn.role === 'confirm') {
          handler = (data: any) => resolve(data ? data : true);
        } else {
          handler = () => resolve(btn.textId);
        }

        return {
          text: btn.textId,
          role: btn.role,
          handler
        };
      });

      const alert = await this.alertCtrl.create({
        header: header,
        message: message,
        buttons: buttonsWithAction,
        backdropDismiss
      });
      await alert.present();
    });
  }
}

/** 버튼 용도 정의*/
export interface ButtonDef {
  /** 메시지 ID */
  textId: string;
  /** 버튼 용도, nullable (confirm|cancel) */
  role?: string;
}
