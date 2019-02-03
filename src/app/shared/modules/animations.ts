import { trigger, state, style, transition, animate } from '@angular/animations';

// #region Button Translate X Animation

export const buttonLabelTranslateX = trigger('btnLabelTranslateX',[
    state('open', style({
        transform: 'translateX(-{{labelTransform}}px)'
    }), {params: {labelTransform: '25'}}),
    state('closed', style({
        transform: 'none'
    })),
    transition('open => closed', [
        animate('300ms ease-in')
    ]),
    transition('closed => open', [
        animate('300ms ease-in')
    ]),
])

export const buttonSpinnerTranslateX = trigger('btnSpinnerTranslateX', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateX({{spinnerPadding}}px)' }), 
        animate('300ms ease-in', style({ opacity: 1,  transform: 'none'}))
    ], {params: {spinnerPadding: '50'}}),
    transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX({{spinnerPadding}}px)' }))
    ], {params: {spinnerPadding: '50'}})
])

export function computeButtonTranslateX(buttonWidth: number, buttonLabelWidth: number){
    //Computation
    let labelTransform = buttonLabelWidth/buttonWidth*100 * 0.25 + 12.5;
    let spinnerPadding = buttonLabelWidth/2 - labelTransform + 12.5;
    return Array<number>(labelTransform, spinnerPadding);
}

//#endregion

/*
/*  Next Animation
/* */