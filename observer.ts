interface Observer {
  update(subject: Subject): void;
};

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
};

class Lead {
  constructor(public name: string, public phone: string) {}
};

class NewLead implements Subject {
  private observers: Observer[] = [];
  public state: Lead;

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  };

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex !== -1) {
      this.observers.splice(observerIndex, 1);
    }
  };

  notify(): void {
    this.observers.forEach(observer => observer.update(this));
  };
}

class Service1 implements Observer{
  update(subject: Subject): void {
      console.log(subject);
  }
}

class Service2 implements Observer{
  update(subject: Subject): void {
      console.log(subject);
  }
}

const subject = new NewLead();
subject.state = new Lead('Anton', '00000');

const s1 = new Service1();
const s2 = new Service2();

subject.attach(s1);
subject.attach(s2);

subject.notify();

subject.detach(s1);

subject.notify();