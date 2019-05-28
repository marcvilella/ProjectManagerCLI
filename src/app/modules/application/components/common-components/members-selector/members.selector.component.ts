import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IUser } from 'src/app/shared/models/user';
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
export class MembersSelectorComponent implements OnInit {

      //#region Members

      @Input() users: IUser[];
      @Input() selectedUsers: IUser[];
      @Output() userSelected = new EventEmitter<number>();
      @Output() userDeleted = new EventEmitter<number>();

      searchFormControl: FormControl;
      filteredUsers: IUser[];
      canReturn: boolean;

      //#endregion

      //#region Constructor

      constructor() {}

      ngOnInit() {
            this.searchFormControl = new FormControl('');
            this.filteredUsers = this.users;
            this.canReturn  = false;
      }

      //#endregion

      //#region Functions

      stopPropagation(event: MouseEvent): void {
            event.stopPropagation();
      }

      userSearcherUpdated(): void {
            this.filteredUsers = this.users.filter(m => m.fullname.match(new RegExp(this.searchFormControl.value, 'i')));
      }

      selectUser(id: number): void {
            if (this.selectedUsers.some(m => m._id === id)) {
                  this.userDeleted.emit(id);
            } else {
                  this.userSelected.emit(id);
            }
      }

      //#endregion
}
