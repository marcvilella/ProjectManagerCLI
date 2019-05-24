export interface IMessage {
      _id: number;
      cardId?: number;
      userId: number;
      userName?: string;
      priority: number;
      date: Date;
      text: string;
      edited: boolean;
}