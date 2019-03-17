import { Component, Input, Renderer2 } from '@angular/core';

import { ICard } from 'src/app/shared/models/boards';

@Component({
  selector: 'board-card-item',
  templateUrl: './board-card-item.component.html',
  styleUrls: ['../../../styles/board.component.scss']
})
export class BoardCardItemComponent {

  @Input() card: ICard;
  @Input() index: number;

  showEditable: boolean;

  constructor(
    private renderer2: Renderer2, 
  ) {
    this.showEditable = false;
  }

  //#region Moving in and out

  cardenter (event: MouseEvent): void {
    this.showEditable = true;
    this.renderer2.addClass(event.target, 'mat-elevation-z5');
    this.renderer2.setStyle(event.target, 'background', 'rgb(224, 224, 224)') 
  }

  cardleave (event: MouseEvent): void {
    this.showEditable = false;
    this.renderer2.removeClass(event.target, 'mat-elevation-z5')
    this.renderer2.removeStyle(event.target, 'background')
  }

  //#endregion

}