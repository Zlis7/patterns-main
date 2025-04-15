interface Mediator {
  notify(sender: string, event: string): void;
};

abstract class Mediated {
  mediator!: Mediator;

  setMediator(mediator: Mediator) {
    this.mediator = mediator;
  }
};

class Notifications {
  send() {
    console.log('Отправленно уведомление');
  }
};

class Logs {
  log(message: string) {
    console.log(message);
  }
};

class EventHandler extends Mediated {
  myEvent() {
    this.mediator.notify('EventHandler', 'myEvent');
  }
};

//Концентрация всей бизнес логики
class NotificationMediator implements Mediator {
  constructor(
    public notifications: Notifications,
    public logger: Logs,
    public handler: EventHandler
  ) {}

  notify(_: string, event: string): void {
    switch (event) {
      case 'myEvent':
        this.notifications.send();
        this.logger.log('Отправленно')
        break;
    }
  }
};

const handler = new EventHandler();
const logger = new Logs();
const notifications = new Notifications();

const m = new NotificationMediator(
  notifications, logger, handler
);
handler.setMediator(m);
handler.myEvent();
