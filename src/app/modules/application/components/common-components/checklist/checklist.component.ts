import { Component, Input, OnInit, Renderer2, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/shared/models/user';
import { ICheckList } from 'src/app/shared/models/boards';

@Component({
  selector: 'common-checklist',
  templateUrl: './checklist.html',
  styleUrls: ['../../../styles/common.scss']
})
export class CheckListComponent implements OnInit {

      //#region Members

      @Input() checklist: ICheckList;
      @Input() users: IUser[];

      @Output() propertiesChanged = new EventEmitter<{name: string, hide: boolean}>();
      @Output() updateCheckitem = new EventEmitter<{id: number, name?: string, checked?: boolean}>();

      nameFormControl: FormControl;
      itemFormControl: FormControl;

      percentage: number;
      currentIndex: number;
      selectedFormControl: number;
      showNameFormControl: boolean;
      canReturnRemove: boolean;

      mentionConfig: any = {
            mentions: [
                {
                    items: [],
                    triggerChar: '@'
                }
            ]
      };

      //#endregion

      //#region Constructor

      constructor(
            private renderer2: Renderer2
      ) { }

      ngOnInit() {
            this.nameFormControl = new FormControl('', Validators.required);
            this.itemFormControl = new FormControl('', Validators.required);
            this.percentage = Math.round(this.checklist.checkitems.filter(m => m.checked).length * 100 / this.checklist.checkitems.length);
            this.showNameFormControl = false;
            this.canReturnRemove = false;
            this.mentionConfig.mentions.items = this.users.map(m => m.fullname);
      }

      //#endregion

      //#region Functions - List

      onNameFormControl(): void {
            this.nameFormControl.setValue(this.checklist.name);
            this.showNameFormControl = true;
      }

      blurNameFormControl(): void {
            this.nameFormControl.setValue((<string>this.nameFormControl.value).trim());
            if (this.nameFormControl.valid && this.nameFormControl.value !== this.checklist.name) {
                  this.propertiesChanged.emit({name: this.nameFormControl.value, hide: this.checklist.hide});
            }
            this.showNameFormControl = false;
      }

      changeChecklistVisibility(): void {
            this.propertiesChanged.emit({name: this.checklist.name, hide: !this.checklist.hide});
      }

      onDeleteChecklist(): void {
            this.propertiesChanged.emit(undefined);
            this.canReturnRemove = true;
      }

      //#endregion

      //#region Functions - Item

      addCheckItem(): void {
            this.updateCheckitem.emit(undefined);
      }

      onItemFormControl(index: number): void {
            this.itemFormControl.setValue(this.checklist.checkitems[index].name);
            this.selectedFormControl = index;
      }

      blurItemFormControl(): void {
            this.itemFormControl.setValue((<string>this.itemFormControl.value).trim());
            if (this.itemFormControl.valid && this.itemFormControl.value !== this.checklist.checkitems[this.selectedFormControl].name) {
                  this.updateCheckitem.emit({
                        id: this.checklist.checkitems[this.selectedFormControl]._id,
                        name: this.itemFormControl.value,
                        checked: this.checklist.checkitems[this.selectedFormControl].checked
                  });
            }
            this.selectedFormControl = -1;
      }

      onCheckedChange(id: number, checked: boolean): void {
            this.updateCheckitem.emit({
                  id: id,
                  name: this.checklist.checkitems.find(m => m._id === id).name,
                  checked: checked
            });
            if (checked) {
                  this.percentage = Math.round((this.checklist.checkitems.filter(m => m.checked).length + 1) * 100 / this.checklist.checkitems.length);
            } else {
                  this.percentage = Math.round((this.checklist.checkitems.filter(m => m.checked).length - 1) * 100 / this.checklist.checkitems.length);
            }
      }

      onDeleteCheckItem(id: number): void {
            this.updateCheckitem.emit({id: id});
            this.canReturnRemove = true;
      }

      //#endregion

      //#region Function - Can Return

      stopPropagation(event: MouseEvent): void {
            if (!this.canReturnRemove) {
                  event.stopPropagation();
            } else {
                  this.canReturnRemove = false;
            }
      }

      //#endregion

      //#region Enter and Out

      cardenter (index: number, event: MouseEvent): void {
            this.currentIndex = index;
            this.renderer2.addClass(event.target, 'mat-elevation-z1');
            this.renderer2.setStyle(event.target, 'background', environment.colors.itemHoverBackground);
      }

      cardleave (event: MouseEvent): void {
            this.currentIndex = undefined;
            this.renderer2.removeClass(event.target, 'mat-elevation-z1');
            this.renderer2.removeStyle(event.target, 'background');
      }

    //#endregion
}
