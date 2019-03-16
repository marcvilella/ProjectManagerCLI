import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as socketIo from 'socket.io-client';
import { Observable, Observer } from 'rxjs';
import { Config } from '../models/config';


@Injectable()
export class ComponentSocketService {
      
      private socket: SocketIOClient.Socket;

      constructor(){
            this.socket = socketIo(Config.socketConnection + '?token=' + localStorage.getItem('access_token'));
      }

      // public initSocket(): void {
      //       console.log('Component Socket Service')
      //       this.socket = socketIo(Config.socketConnection + '?token=' + localStorage.getItem('access_token'));
      //       console.log(this.socket)

      //       this.socket.on('reconnect_attempt', () => {
      //             this.socket.io.opts.query = {
      //               token: localStorage.getItem('access_token')
      //             }
      //       });
      // }

      public send(event: string, message: any): void {
            this.socket.emit(event, message);
      }

      // public onMessage(): Observable<Message> {
      //       return new Observable<Message>(observer => {
      //             this.socket.on('message', (data: Message) => observer.next(data));
      //       });
      // }

      public onMessage(event: string): Observable<any> {
            return new Observable<any>(observer => {
                  this.socket.on(event, (data: any) => observer.next(data));
            });
      }

      // public onEvent(event: Event): Observable<any> {
      //       return new Observable<Event>(observer => {
      //             this.socket.on(event, () => observer.next());
      //       });
      // }
}