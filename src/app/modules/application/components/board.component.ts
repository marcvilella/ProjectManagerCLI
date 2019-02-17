import { Component, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'board',
    templateUrl: '../views/board.html',
    styleUrls: ['../application.component.scss', '../../../app.component.scss']
})

export class BoardComponent{

    //#region Properties  
    
    settings: boolean;
    isTitleEditable: boolean;
    editable:boolean = false;
    CurrentItem: number;
    CurrentList: number;

    cards: String[] = [
        'One'
        // 'Two',
        // 'Three'
      ];

    //#endregion

    //#region FormControls

    //#endregion
    
    //#region Constructor

    constructor(private router: Router, public translate: TranslateService, private renderer2: Renderer2) {

        this.settings = false;
        this.isTitleEditable = false;

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              (<any>window).ga('set', 'page', event.urlAfterRedirects);
              (<any>window).ga('send', 'pageview');
            }
        });
    }

    //#endregion

    //#region Functions

    mouseenter (event: MouseEvent, indexList: number, indexItem: number) {
        this.CurrentList = indexList;
        this.CurrentItem = indexItem;
        this.renderer2.addClass(event.target, 'mat-elevation-z5');
        this.renderer2.setStyle(event.target, 'background', 'rgb(224, 224, 224)') 
    }

    mouseleave (event: MouseEvent) {
       this.CurrentList = -1;
       this.CurrentItem = -1;
       this.renderer2.removeClass(event.target, 'mat-elevation-z5')
       this.renderer2.removeStyle(event.target, 'background')
    }

    //#endregion

}