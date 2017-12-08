import { TestBed, inject } from '@angular/core/testing';

import { NgEngineService } from './ng-engine.service';

describe('NgEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgEngineService]
    });
  });

  it('should be created', inject([NgEngineService], (service: NgEngineService) => {
    expect(service).toBeTruthy();
  }));
});
