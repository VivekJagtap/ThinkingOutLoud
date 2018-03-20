import { TestBed, inject } from '@angular/core/testing';

import { RestResourceServiceService } from './rest-resource-service.service';

describe('RestResourceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestResourceServiceService]
    });
  });

  it('should be created', inject([RestResourceServiceService], (service: RestResourceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
