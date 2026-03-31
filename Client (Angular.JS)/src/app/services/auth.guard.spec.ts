import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    });

    guard = TestBed.inject(AuthGuard); 
    routerMock = TestBed.inject(Router); 
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if token is valid and role is admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummyAdminToken');
    spyOn(guard, 'decodeToken').and.returnValue({ role: 'admin' });

    const result = guard.canActivate({} as any, {} as any);
    expect(result).toBeTrue();
  });

  it('should redirect to "/" if role is not admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dummyUserToken');
    spyOn(guard, 'decodeToken').and.returnValue({ role: 'user' });

    const result = guard.canActivate({} as any, {} as any);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(result).toBeFalse();
  });

  it('should redirect to "/login" if no token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    const result = guard.canActivate({} as any, {} as any);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    expect(result).toBeFalse();
  });
});
