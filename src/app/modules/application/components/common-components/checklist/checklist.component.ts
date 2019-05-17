import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ICheckList } from 'src/app/shared/models/boards';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'common-checklist',
  templateUrl: './checklist.html',
  styleUrls: ['../../../styles/common.scss']
})
export class CheckListComponent implements OnInit {

      //#region Members

      @Input() checklist: ICheckList;
      @ViewChildren('textarea') textareas: QueryList<ElementRef>;

      percentage: number;
      currentIndex: number;

      textFormControl: FormControl;
      selectedFormControl: number;

      mentionConfig: any = {
            mentions: [
                {
                    items: [ 'Noah', 'Liam', 'Mason', 'Jacob' ],
                    triggerChar: '@'
                },
                {
                    items: [ 'Red', 'Yellow', 'Green' ],
                    triggerChar: '#'
                },
            ]
      };

      //#endregion

      //#region Constructor

      constructor(
            private renderer2: Renderer2
      ) { }

      ngOnInit() {
            this.textFormControl = new FormControl('');
            this.percentage = Math.round(this.checklist.checkitems.filter(m => m.checked).length / this.checklist.checkitems.length);
      }
      //#endregion

      //#region Functions

      onSelectedFormControl(index: number): void {
            this.textFormControl.setValue(this.checklist.checkitems[index].name);
            this.selectedFormControl = index;
      };

      onBlurFormControl(): void {
            console.log(this.textareas.map(m => m.nativeElement));
            console.log(this.textareas.map(m => m.nativeElement.offsetHeight));
            console.log(this.textareas.map(m => m.nativeElement.offsetWidth));
            console.log(this.textareas.map(m => m.nativeElement.offsetTop));
            console.log(this.textareas.map(m => m.nativeElement.offsetLeft));

            this.selectedFormControl = undefined;
      };

      onCheckedChange(id: number, checked: boolean): void {
            this.checklist.checkitems.find(m => m._id === id).checked = checked;
            this.percentage = Math.round(this.checklist.checkitems.filter(m => m.checked).length * 100 / this.checklist.checkitems.length);
      };

      onDeleteCheckItem(index: number): void {

      };

      //#endregion

      //#region Autocomplete

      //#endregion

      //#region Enter and Out

      cardenter (index: number, event: MouseEvent): void {
            this.currentIndex = index;
            this.renderer2.addClass(event.target, 'mat-elevation-z1');
            this.renderer2.setStyle(event.target, 'background', environment.colors.itemHoverBackground);
      };

      cardleave (event: MouseEvent): void {
            this.currentIndex = undefined;
            this.renderer2.removeClass(event.target, 'mat-elevation-z1');
            this.renderer2.removeStyle(event.target, 'background');
      };

    //#endregion
}
