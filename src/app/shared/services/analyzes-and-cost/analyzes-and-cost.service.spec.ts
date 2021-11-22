import { TestBed } from '@angular/core/testing';

import { AnalyzesAndCostService } from './analyzes-and-cost.service';

describe('AnalyzesAndCostService', () => {
  let service: AnalyzesAndCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyzesAndCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
