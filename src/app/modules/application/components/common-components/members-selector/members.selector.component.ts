import { Component, Input, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IUser } from 'src/app/shared/models/user';
import { ICardItem } from 'src/app/shared/models/boards';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
      selector: 'common-members-selector',
      templateUrl: './members.selector.html',
      styleUrls: ['../../../styles/common.scss'],
      animations: [
            trigger('onSelectionChange', [
                  state('false', style({
                        transform: 'translateX(100px)'
                  })),
                  state('true', style({
                        transform: 'none'
                  })),
                  transition('false => true', animate('250ms ease-in')),
                  transition('true => false', animate('250ms ease-in')),
            ])
      ]
})
export class MembersSelectorComponent {

      @Input() card: ICardItem;

      //#region Members

      canReturn: boolean;

      searchFormControl: FormControl;
      selectedUsers: Array<String>;
      // users: Array<IUser>;
      users: Array<String>;
      filteredUsers: Array<String>;

      //#endregion

      //#region Constructor

      constructor(
            private renderer2: Renderer2
      ) {
            this.canReturn  = false;

            this.searchFormControl = new FormControl('');
            this.selectedUsers = new Array<String>();
            this.users = new Array<String>();
            this.users.push('Marc Vilella');
            this.users.push('Xavier Vilella');
            this.users.push('Marc Muñoz');
            this.users.push('Xavier Muñoz');
            this.users.push('Marc Pallarès');
            this.filteredUsers = this.users;
      }

      //#endregion

      //#region Functions

      stopPropagation(event: MouseEvent): void {
            event.stopPropagation();
      }

      userSearcherUpdated(): void {
            this.filteredUsers = this.users.filter(m => m.match(new RegExp(this.searchFormControl.value, 'i')));
      }

      selectUser(user: String): void {
            this.selectedUsers.push(user);
            this.canReturn  = !this.canReturn;
      }

      //#endregion

      //#region Enter and Out

      cardenter (event: MouseEvent): void {
            this.renderer2.addClass(event.target, 'mat-elevation-z5');
      }

      cardleave (event: MouseEvent): void {
            this.renderer2.removeClass(event.target, 'mat-elevation-z5');
      }

    //#endregion
}
