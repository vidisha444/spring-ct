/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HomePageGuardService } from './home-page-guard.service';

describe('Service: HomePageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomePageGuardService]
    });
  });

  it('should ...', inject([HomePageGuardService], (service: HomePageGuardService) => {
    expect(service).toBeTruthy();
  }));
});
