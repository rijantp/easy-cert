import { TestBed } from '@angular/core/testing';

import { PlotDataService } from './plot-data.service';

describe('PlotDataService', () => {
  let service: PlotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
