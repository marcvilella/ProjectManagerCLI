import { Component, Input, OnInit } from '@angular/core';

@Component({
      selector: 'animated-icon',
      template: `<mat-icon mat-icon-button svgIcon="{{currentIcon}}"></mat-icon> `,
})
export class AnimatedIconComponent implements OnInit {

      @Input() isChecked: boolean = false;
      @Input() icons: string = '';

      parsedIcons: string[];

      get currentIcon() {
            if(this.isChecked)
                  return this.parsedIcons[1];
            else
                  return this.parsedIcons[0];
      }

      ngOnInit() {
            this.parsedIcons = this.icons.split(',');
      }
}