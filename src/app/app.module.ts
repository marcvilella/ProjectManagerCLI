import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Services
import { SharedModule } from './shared/modules/shared.module';

// Providers
import { AuthService, AuthGuard } from './shared/services/auth.service';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';

// Elements
import { environment } from 'src/environments/environment';
import { appReducers } from './shared/store/reducers/app.reducers';
import { UserEffects } from './shared/store/effects/user.effects';
import { BoardEffects } from './shared/store/effects/board.effects';
import { MessageEffects } from './shared/store/effects/message.effects';
import { UsersService } from './shared/services/users.service';
import { BoardsService } from './shared/services/boards.service';
import { MessagesService } from './shared/services/messages.service';
import { SocketService } from './shared/services/socket.service';
import { HelperService } from './shared/services/helper.service';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['http://localhost:3000', 'localhost:3000']
      }
    }),
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot([UserEffects, BoardEffects, MessageEffects]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }) : []
  ],
  providers: [AuthService, SocketService, UsersService, BoardsService, MessagesService, AuthGuard, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
