import { TestBed, inject } from '@angular/core/testing';

import { DictionariesService } from './dictionaries.service';

describe('DictionariesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DictionariesService]
    });
  });

  it('should be created', inject([DictionariesService], (service: DictionariesService) => {
    expect(service).toBeTruthy();
  }));
});
