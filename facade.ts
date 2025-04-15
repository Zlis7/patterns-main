class Notify{
  send(template:string, to:string){
    console.log('Отправляю: ' + template + ', ' + to);
  }
}

class Log{
  log(message:string){
    console.log(message);
  }
}

class Template{
  private templates = [
    {name:'other', template:'<h1>Шаблн</h1>'}
  ];

  getName(name:string){
    return this.templates.find(t => t.name === name);
  }
}

class Facade{
  private notify:Notify;
  private logger:Log;
  private template:Template;

  constructor(){
    this.notify = new Notify();
    this.logger = new Log();
    this.template = new Template();
  }

  send(to:string, templateName:string){
    const data = this.template.getName(templateName);

    if(!data){
      this.logger.log('Шаблон не найден');
      return;
    }
    this.notify.send(data.template, to);
    this.logger.log('Шаблон отправлен');
  };
}

const s = new Facade();
s.send('a@a.ru', 'other');