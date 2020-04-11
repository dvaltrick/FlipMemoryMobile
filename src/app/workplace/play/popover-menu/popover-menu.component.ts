import { PopoverController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {

  popoverController: PopoverController;
  constructor(private router: Router, navParams: NavParams) { 
    this.popoverController = navParams.get('popoverController');
  }

  ngOnInit() {}

  public navigateTo(page) {
    this.router.navigate([page]);

    this.popoverController.dismiss();
  }

}
