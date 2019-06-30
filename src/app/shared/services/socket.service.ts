import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelperService } from './helper.service';
import { addBoardTimestamp } from '../store/reducers/board.reducers';

@Injectable()
export class SocketService {

      private socket: SocketIOClient.Socket;
      connected$ = new BehaviorSubject<boolean>(false);

      constructor(private helper: HelperService) {
            console.log('Socket Service');

            if (localStorage.getItem('access_token') !== null) {
                  this.socket = socketIo(environment.server.url + '?token=' + localStorage.getItem('access_token'));

                  this.socket.on('connect', () => this.connected$.next(true));
                  this.socket.on('disconnect', () => this.connected$.next(false));
            }
      }

      reConnect(): void {
            if (this.socket === undefined && localStorage.getItem('access_token') !== null) {
                  this.socket = socketIo(environment.server.url + '?token=' + localStorage.getItem('access_token'));

                  this.socket.on('connect', () => this.connected$.next(true));
                  this.socket.on('disconnect', () => this.connected$.next(false));

                  // TODO: Add here listens that has to be always
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
            console.log('disconnect');
            this.socket.disconnect();
            this.connected$.next(false);
      }

      emit(event: string, data?: any): void {

            if (data !== undefined) {
                  data.timestamp = this.helper.generateRandom();
                  switch (event.substring(1, event.indexOf(']', 1))) {
                        case 'Board':
                        addBoardTimestamp(event, data.timestamp);
                        break;
                  }
            }

            console.group();
            console.log('----- SOCKET OUTGOING -----');
            console.log('Action: ', event);
            console.log('Payload: ', data);
            console.groupEnd();

            this.socket.emit(event, data);
      }

      listen(event: string): Observable<any> {
            return new Observable<any>( observer => {

                  if (this.socket !== undefined) {
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
                  }
            });
      }

}
