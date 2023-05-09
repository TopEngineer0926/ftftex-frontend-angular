import { TestBed } from '@angular/core/testing';

import { TradingSocketServiceService } from './trading-socket-service.service';

describe('TradingSocketServiceService', () => {
  let service: TradingSocketServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingSocketServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
