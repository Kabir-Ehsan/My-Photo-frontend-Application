import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: string[];
  public success: string[];

  constructor() { 
    this.messages = [];
    this.success = [];
  }

  newMessage(message: string){
    this.messages.unshift(message);
    this.messages= this.messages.slice(0,1);
  }

  newSuccess(message: string){
    this.success.unshift(message);
    this.success= this.success.slice(0,1);
  }
  clearMessages()
  {
    this.messages = [];
    this.success = [];
  }
}
