import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() private categoryTitle: string = "";
  @Input() private question: string = "";
  @Input() private answer: string = "";
  @Input() private backColor: string = "";
  @Input() private expanded: boolean = false;
  @Output() public onRevealed = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  public reveal() {
    this.expanded = true;
    this.onRevealed.emit("true");
  }

}
