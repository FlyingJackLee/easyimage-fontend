import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage <=> LoginPage', [
      //fisrt make sure the <div> is relative so the position would be normal with bound.
      style({ position: 'relative' }),

      // set the outlet as a absolute element
      query(":enter, :leave", [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),

      query(':enter', [
        style({
          opacity:0,
        })
      ]),

      query(':leave', animateChild()),


      group([
        query(':leave', [
          animate('1ms cubic-bezier(.17,.67,.88,.1)', style({
            opacity:0
          }))
        ]),

        query(':enter', [
          animate('300ms cubic-bezier(.17,.67,.88,.1)', style({
            opacity:1,
          }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);
