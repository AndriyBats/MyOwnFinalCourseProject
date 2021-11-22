import { TestBed } from '@angular/core/testing';

import { ResearchPackagesService } from './research-packages.service';

describe('ResearchPackagesService', () => {
  let service: ResearchPackagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResearchPackagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
