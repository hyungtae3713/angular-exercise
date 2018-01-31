import { TestBed, inject } from '@angular/core/testing';

import { TodosResolverService } from './todos-resolver.service';

describe('TodosResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosResolverService]
    });
  });

  it('should be created', inject([TodosResolverService], (service: TodosResolverService) => {
    expect(service).toBeTruthy();
  }));
});
