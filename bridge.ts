interface Provider{
  sendMessage(message:string):void;
  connect(config: string):void;
  disconnect():void;
}

class TelegramProvider implements Provider{
  sendMessage(message: string): void {
    console.log(message);
  };

  connect(config: string): void {
    console.log(config);
  };

  disconnect(): void {
    console.log('Disconnect TG');
  };
}

class WhatsUpProvider implements Provider{
  sendMessage(message: string): void {
    console.log(message);
  };

  connect(config: string): void {
    console.log(config);
  };

  disconnect(): void {
    console.log('Disconnect WU');
  };
}

class NotificationSender{
  constructor(private provider: Provider){}

  send(){
    this.provider.connect('connect');
    this.provider.sendMessage('message');
    this.provider.disconnect();
  }
}

class DelayNotificationSender extends NotificationSender{
  constructor(provider: Provider){
    super(provider);
  }

  sendDelay(){

  }
}

const sender = new NotificationSender(new TelegramProvider());
sender.send();

const sender2 = new NotificationSender(new WhatsUpProvider());
sender2.send();


