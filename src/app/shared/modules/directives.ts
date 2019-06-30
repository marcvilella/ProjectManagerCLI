// Directive
import { Directive, Input, ElementRef, AfterContentInit, Output, EventEmitter, HostListener,
         AfterContentChecked, OnChanges, SimpleChanges, OnDestroy, NgZone } from '@angular/core';
import { ReplaySubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterContentInit  {
    @Input() public appAutoFocus: boolean;

    public constructor(private el: ElementRef) {}

    public ngAfterContentInit() {
        this.el.nativeElement.focus();
    }
}

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {
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
    constructor(private _elementRef: ElementRef) {
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

    ngOnChanges(changes: SimpleChanges): void {
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

@Directive({
    selector: '[autoSizeTextArea]'
})
export class AutoSizeTextAreaDirective implements OnDestroy, OnChanges, AfterContentChecked {
    @Input() minRows: number;
    @Input() maxRows: number;
    @Input() onlyGrow = false;
    @Input() useImportant = false;

    private MAX_LOOKUP_RETRIES = 3;

    private retries = 0;
    private textAreaEl: any;

    private _oldContent: string;
    private _oldWidth: number;

    private _destroyed$ = new ReplaySubject(1);

    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(
        public element: ElementRef,
        private _zone: NgZone
    ) {
        if (this.element.nativeElement.tagName !== 'TEXTAREA') {
            this._findNestedTextArea();

        } else {
            this.textAreaEl = this.element.nativeElement;
            this.textAreaEl.style.overflow = 'hidden';
            this._onTextAreaFound();
        }
    }

    ngOnDestroy() {
        this._destroyed$.next(true);
        this._destroyed$.complete();
    }

    ngAfterContentChecked() {
        this.adjust();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.adjust(true);
    }

    _findNestedTextArea() {
        this.textAreaEl = this.element.nativeElement.querySelector('TEXTAREA');

        if (!this.textAreaEl && this.element.nativeElement.shadowRoot) {
            this.textAreaEl = this.element.nativeElement.shadowRoot.querySelector('TEXTAREA');
        }

        if (!this.textAreaEl) {
            if (this.retries >= this.MAX_LOOKUP_RETRIES) {
                // console.warn('ngx-autosize: textarea not found');

            } else {
                this.retries++;
                setTimeout(() => {
                    this._findNestedTextArea();
                }, 100);
            }
            return;
        }

        this.textAreaEl.style.overflow = 'hidden';
        this._onTextAreaFound();

    }

    _onTextAreaFound() {
        this._zone.runOutsideAngular(() => {
            fromEvent(window, 'resize')
                .pipe(
                    takeUntil(this._destroyed$),
                    debounceTime(200),
                    distinctUntilChanged()
                )
                .subscribe(() => {
                    this._zone.run(() => {
                        this.adjust();
                    });
                });
        });
        setTimeout(() => {
            this.adjust();
        });
    }

    adjust(inputsChanged = false): void {
        if (this.textAreaEl) {

            const currentText = this.textAreaEl.value;

            if (
                inputsChanged === false &&
                currentText === this._oldContent &&
                this.textAreaEl.offsetWidth === this._oldWidth
            ) {
                return;
            }

            this._oldContent = currentText;
            this._oldWidth = this.textAreaEl.offsetWidth;

            const clone = this.textAreaEl.cloneNode(true);
            const parent = this.textAreaEl.parentNode;
            clone.style.visibility = 'hidden';
            parent.appendChild(clone);

            clone.style.overflow = 'auto';
            clone.style.height = 'auto';

            let height = clone.scrollHeight;
            const willGrow = height > this.textAreaEl.offsetHeight;

            if (this.onlyGrow === false || willGrow) {
                const lineHeight = this._getLineHeight();
                const rowsCount = height / lineHeight;

                let styleAttribute = '';

                if (this.minRows && this.minRows >= rowsCount) {
                    height = this.minRows * lineHeight;

                } else if (this.maxRows && this.maxRows <= rowsCount) {
                    height = this.maxRows * lineHeight;
                    styleAttribute += 'overflow: auto;';

                } else {
                    styleAttribute += 'overflow: hidden;';
                }

                styleAttribute += `height: ${height}px`;

                styleAttribute += this.useImportant ? '!important;' : ';';

                this.textAreaEl.setAttribute('style', styleAttribute);
            }

            parent.removeChild(clone);
        }
    }

    private _getLineHeight() {
        let lineHeight = parseInt(this.textAreaEl.style.lineHeight, 10);
        if (isNaN(lineHeight) && window.getComputedStyle) {
            const styles = window.getComputedStyle(this.textAreaEl);
            lineHeight = parseInt(styles.lineHeight, 10);
        }

        if (isNaN(lineHeight)) {
            const fontSize = window.getComputedStyle(this.textAreaEl, null).getPropertyValue('font-size');
            lineHeight = Math.floor(parseInt(fontSize.replace('px', ''), 10) * 1.5);
        }

        return lineHeight;
    }
}
