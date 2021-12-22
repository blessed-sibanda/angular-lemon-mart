import { MediaChange } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of, Subscription } from 'rxjs';
import { MaterialModule } from '../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
import { UiService } from './ui.service';

export class MediaObserverFake {
  isActive(query: string): boolean {
    return false;
  }

  asObservable(): Observable<MediaChange> {
    return of({} as MediaChange);
  }

  subscribe(
    next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return new Subscription();
  }
}

export const commonTestingProviders: any[] = [
  {
    provide: AuthService,
    useValue: jasmine.createSpyObj(AuthService, ['login', 'logout', '']),
  },
  {
    provide: UiService,
    useValue: jasmine.createSpyObj(UiService, ['showToast', 'showDialog']),
  },
];

export const commonTestingModules: any[] = [
  ReactiveFormsModule,
  MaterialModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
];
