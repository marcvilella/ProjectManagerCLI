import { Component, Input, OnInit } from '@angular/core';

@Component({
      selector: 'animated-icon',
      template: `<mat-icon mat-icon-button class="icon" [ngStyle]="styles" svgIcon="{{currentIcon}}"></mat-icon> `,
      styles: [`
            .icon{

                  height: 24px;
                  width: 24px;
            }

            .icon:hover{
                  border-radius: 14px;
                  background: lightgray;
                  opacity: 0.9;
            }`
      ]
})
export class AnimatedIconComponent implements OnInit {

      @Input() isChecked = false;
      @Input() icons = '';
      @Input() styles: any = {};

      parsedIcons: string[];

      get currentIcon() {
            if (this.isChecked === undefined) {
                  console.log(this.isChecked)
            }
            if (this.isChecked) {
                  return this.parsedIcons[1];
            } else {
                  return this.parsedIcons[0];
            }
      }

      ngOnInit() {
            this.parsedIcons = this.icons.split(',');
      }
}
