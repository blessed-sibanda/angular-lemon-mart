import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthMode } from './auth.enum';
import { CustomAuthService } from './custom-auth.service';
import { InMemoryAuthService } from './in-memory-auth.service';

export function authFactory(httpClient: HttpClient) {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService();
    case AuthMode.CustomServer:
      return new CustomAuthService(httpClient);
  }
}
