import { TestBed, inject } from '@angular/core/testing';

import { TableauService } from './tableau.service';

describe('TableauService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableauService]
    });
  });

  it('should be created', inject([TableauService], (service: TableauService) => {
    expect(service).toBeTruthy();
  }));
});
