import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Pane } from './child.viewchildren';
import { of } from 'rxjs';

@Component({
  selector: 'example-app',
  template: `
    <pane id="1"></pane>
    <pane id="2"></pane>
    <pane id="3" *ngIf="shouldShow"></pane>

    <button (click)="show()">Show 3</button>

    <div>panes: {{serializedPanes}}</div>
  `,
})
export class ViewChildrenComp implements AfterViewInit {
  @ViewChildren(Pane) panes!: QueryList<Pane>;
  serializedPanes: string = '';

  shouldShow = false;

  

  show() {
    this.shouldShow = true;
  }

  

  ngAfterViewInit() {
    this.calculateSerializedPanes();
    this.panes.changes.subscribe((r) => {
      this.calculateSerializedPanes();
    });
    const myObservable = of(1, 2, 3);

// Create observer object
const myObserver = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};

// Execute with the observer object
myObservable.subscribe(myObserver);
  }

  calculateSerializedPanes() {
    setTimeout(() => {
      this.serializedPanes = this.panes.map(p => p.id).join(', ');
    }, 0);
  }
}