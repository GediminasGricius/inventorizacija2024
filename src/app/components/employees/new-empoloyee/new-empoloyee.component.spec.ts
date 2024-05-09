import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmpoloyeeComponent } from './new-empoloyee.component';

describe('NewEmpoloyeeComponent', () => {
  let component: NewEmpoloyeeComponent;
  let fixture: ComponentFixture<NewEmpoloyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmpoloyeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEmpoloyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
