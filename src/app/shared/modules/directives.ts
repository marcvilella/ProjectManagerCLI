// Directive
import { Directive, Input, ElementRef, AfterContentInit, Output, EventEmitter, HostListener, AfterContentChecked,OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterContentInit  {
    @Input() public appAutoFocus: boolean;

    public constructor(private el: ElementRef) {}
  
    public ngAfterContentInit() {
        this.el.nativeElement.focus();
        
        //   setTimeout(() => {

        //       this.el.nativeElement.focus();

        //   }, 100);
    }
}


@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef : ElementRef) {
    }
 
    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}

@Directive({
    selector: '[clickInside]'
})
export class ClickInsideDirective {
    constructor(private _elementRef : ElementRef) {
    }
 
    @Output()
    public clickInside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (clickedInside) {
            this.clickInside.emit(event);
        }
    }
}

@Directive({
    selector: '[AutoSizeInput]',
})
export class AutoSizeInputDirective implements AfterContentChecked, OnChanges {

    @Input() extraWidth = 0;
    @Input() includePlaceholder = true;
    @Input() includeBorders = false;
    @Input() includePadding = true;
    @Input() minWidth = -1;
    @Input() maxWidth = -1;

    borderWidth: number;
    paddingWidth: number;

    @HostListener('input', ['$event.target'])
    public onInput(): void {
        this.adjustWidth();
    }

    constructor(public element: ElementRef) {
    }
  
    ngAfterContentChecked(): void {
        this.adjustWidth();
    }

    ngOnChanges(changes: SimpleChanges): void
    {
        this.adjustWidth();
    }

    adjustWidth(): void {
        if (this.includeBorders) {
            this.borderWidth = 2 * parseInt(window
                .getComputedStyle(this.element.nativeElement, '')
                .getPropertyValue('border'), 10);
        } else {
            this.borderWidth = 0;
        }

        if (this.includePadding) {
            this.paddingWidth = parseInt(window
                    .getComputedStyle(this.element.nativeElement, '')
                    .getPropertyValue('padding-left'), 10) +
                parseInt(window
                    .getComputedStyle(this.element.nativeElement, '')
                    .getPropertyValue('padding-right'), 10);
        } else {
            this.paddingWidth = 0;
        }

        const inputText = this.element.nativeElement.value;
        let placeHolderText = '';

        try {
            placeHolderText =  this.element.nativeElement.placeholder;
        } catch (error) {
            placeHolderText = '';
        }

        const inputTextWidth = this.calculateTextWidth(inputText) + this.extraWidth + this.borderWidth + this.paddingWidth;

        // Min Width
        if (this.minWidth > 0 && (this.minWidth > inputTextWidth)) {
            this.setWidth(this.minWidth);
            return;
        }

        // Placeholder Width
        if (this.includePlaceholder && placeHolderText.length > 0 &&
            (this.calculateTextWidth(placeHolderText) > this.calculateTextWidth(inputText))) {
            this.setWidthByValue(placeHolderText);
            return;
        }

        // Max Width
        if (this.maxWidth > 0 && (this.maxWidth < inputTextWidth)) {
            this.setWidth(this.maxWidth);
            return;
        }

        this.setWidthByValue(inputText);
    }

    calculateTextWidth(value: string) {
        const style = this.getStyle(),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        ctx.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        return ctx!.measureText(value).width;
    }

    getStyle() {
        const fontFamily = this.element.nativeElement.style.fontFamily ? this.element.nativeElement.style.fontFamily :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family'),
            fontStyle = this.element.nativeElement.style.fontStyle ? this.element.nativeElement.style.fontStyle :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-style'),
            fontSize = this.element.nativeElement.style.fontSize ? this.element.nativeElement.style.fontSize :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size'),
            fontVariant = this.element.nativeElement.style.fontSize ? this.element.nativeElement.style.fontSize :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-variant'),
            fontWeight = this.element.nativeElement.style.fontWeight ? this.element.nativeElement.style.fontWeight :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-weight');

        return {fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, fontStyle: fontStyle, fontVariant: fontVariant};
    }

    setWidth(width: any) {
        this.element.nativeElement.style.width = width + 'px';
    }

    setWidthByValue(value: any) {
        this.element.nativeElement.style.width =
            this.calculateTextWidth(value) +
                this.extraWidth +
                this.borderWidth +
                this.paddingWidth + 'px';
    }
}