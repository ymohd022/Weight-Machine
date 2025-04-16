import { TestBed } from '@angular/core/testing';

import { WeightScaleService } from './weight-scale.service';

describe('WeightScaleService', () => {
  let service: WeightScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
