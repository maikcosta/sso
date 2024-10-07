import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProcessAuthPage } from './process-auth.page';

describe('ProcessAuthPage', () => {
  let component: ProcessAuthPage;
  let fixture: ComponentFixture<ProcessAuthPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessAuthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
