import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dvaltrickUi-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Input() public title: string;
  @Input() public colorList: string[];
  @Input() public maxRowItems: number;
  @Output() public changeSelectedColor = new EventEmitter();

  private colorPickerItems: any[] = [];
  private selectedColor:string = "";
  
  constructor() {
    if (this.maxRowItems === undefined) {
      this.maxRowItems = 9999;
    }
  }

  private loadColors() {
    let colorCollums = [];
    if (this.colorList !== undefined) {
      this.colorList.map(color => {
        colorCollums.push(color);

        if (colorCollums.length >= this.maxRowItems) {
          this.colorPickerItems.push(colorCollums);
          colorCollums = [];
        }
      });

      if (colorCollums.length > 0) {
        this.colorPickerItems.push(colorCollums);
      }
    }

    if (this.colorPickerItems.length > 0) {
      this.selectedColor = this.colorPickerItems[0][0];
    }
  }

  private select(color) {
    this.selectedColor = color;
    this.onChangeSelectedColor(color);
  }

  onChangeSelectedColor(color) {
    this.changeSelectedColor.emit(color);
  }

  ngOnInit() {
    this.loadColors();
  }

}
