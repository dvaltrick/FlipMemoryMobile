import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { CategoryRegisterComponent } from './category-register/category-register.component';
import { ColorPickerComponent } from 'src/app/ui/color-picker/color-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule
  ],
  entryComponents: [CategoryRegisterComponent, ColorPickerComponent],
  declarations: [CategoryPage, CategoryRegisterComponent, ColorPickerComponent]
})
export class CategoryPageModule {}
