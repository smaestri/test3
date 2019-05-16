import { TestBed } from '@angular/core/testing';

import { Bookservice } from './bookservice.service';

describe('BookserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Bookservice = TestBed.get(Bookservice);
    expect(service).toBeTruthy();
  });
});
