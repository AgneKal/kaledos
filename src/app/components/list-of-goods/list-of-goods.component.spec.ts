import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfGoodsComponent } from './list-of-goods.component';

describe('ListOfGoodsComponent', () => {
  let component: ListOfGoodsComponent;
  let fixture: ComponentFixture<ListOfGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfGoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
