import { TestBed } from '@angular/core/testing';

import { DataShareService } from './data-share-service';

describe('DataShareServiceService', () => {
  let service: DataShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
