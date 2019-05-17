import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as socketIo from 'socket.io-client';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SocketService {

      private socket: SocketIOClient.Socket;
      connected$ = new BehaviorSubject<boolean>(false);

      constructor() {
            console.log('Socket Service');

            if (localStorage.getItem('access_token') !== null) {
                  this.socket = socketIo(environment.socket.baseUrl + '?token=' + localStorage.getItem('access_token'));

                  this.socket.on('connect', () => this.connected$.next(true));
                  this.socket.on('disconnect', () => this.connected$.next(false));
            }
      }

      join(room: string) {
            // auto rejoin after reconnect mechanism
            this.connected$.subscribe(connected => {
                  if (connected) {
                        console.log('Joining ' + room);
                        this.socket.emit('join', room);
                  }
            });
      }

      disconnect() {
            this.socket.disconnect();
            this.connected$.next(false);
      }

      emit(event: string, data?: any) {

            console.group();
            console.log('----- SOCKET OUTGOING -----');
            console.log('Action: ', event);
            console.log('Payload: ', data);
            console.groupEnd();

            this.socket.emit(event, data);
      }

      public listen(event: string): Observable<any> {
            return new Observable<any>( observer => {

                  this.socket.on(event, (data: any) => {

                        console.group();
                        console.log('----- SOCKET INBOUND -----');
                        console.log('Action: ', event);
                        console.log('Payload: ', data);
                        console.groupEnd();

                        observer.next(data);
                  });
              // dispose of the event listener when unsubscribed
              return () => this.socket.off(event);
            });
      }

}
