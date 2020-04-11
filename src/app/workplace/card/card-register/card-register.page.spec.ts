import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardRegisterPage } from './card-register.page';

describe('CardRegisterPage', () => {
  let component: CardRegisterPage;
  let fixture: ComponentFixture<CardRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
