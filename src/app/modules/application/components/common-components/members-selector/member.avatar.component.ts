import { Component, Input, Renderer2, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';

@Component({
      selector: 'common-member-avatar',
      templateUrl: './member.avatar.html',
      styleUrls: ['../../../styles/common.scss'],
})
export class MemberAvatarComponent implements OnInit {

      //#region Members

      @Input() user: IUser;
      @Input() size = 36;
      @Input() textRadio = 3;
      @Input() boardId: number;

      canReturn: Boolean;

      //#endregion

      //#region Constructor

      constructor(private renderer2: Renderer2) {
            this.canReturn = false;
      }

      ngOnInit(): void {
            if (this.boardId !== undefined) {
                  const index = this.user.boards.findIndex(m => m._id === this.boardId);
                  if (this.user.boards[index].settings.role === 'manager') {
                        this.user.tempRole = 'manager';
                  } else if (this.user.boards[index].settings.role === 'admin') {
                        this.user.tempRole = 'admin';
                  } else if (this.user.boards[index].settings.role === 'member') {
                        this.user.tempRole = 'member';
                  } else {
                        this.user.tempRole = undefined;
                  }
            }
      }

      //#endregion

      //#region Functions - General

      stopPropagation(event: MouseEvent): void {
            if (!this.canReturn) {
                  event.stopPropagation();
            } else {
                  this.canReturn = false;
            }
      }

      //#endregion

      //#region Enter and Out

      cardenter (event: MouseEvent): void {
            this.renderer2.addClass(event.target, 'mat-elevation-z2');
      }

      cardleave (event: MouseEvent): void {
            this.renderer2.removeClass(event.target, 'mat-elevation-z2');
      }

      //#endregion
}
