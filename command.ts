class User {
  constructor(public uid: number) {}
}

class CommandHistory {
  public commands: Command[] = [];
  push(command: Command) {
    this.commands.push(command);
  }
  remove(command: Command) {
    this.commands = this.commands.filter(
      (c) => c.commandId !== command.commandId
    );
  }
}

abstract class Command {
  public commandId!: number;

  constructor(public history: CommandHistory) {
    this.commandId = Math.random();
  }

  abstract execute(): void;
}

class AddUserCommand extends Command {
  constructor(
    private user: User,
    private receiver: UserService,
    history: CommandHistory
  ) {
    super(history);
  }

  override execute(): void {
    this.receiver.saveUser(this.user);
    this.history.push(this);
  }

  undo() {
    this.receiver.deleteUser(this.user.uid);
    this.history.remove(this);
  }
}

class UserService {
  saveUser(user: User) {
    console.log("Сохранение : " + user.uid);
  }

  deleteUser(uid: number) {
    console.log("Удаление :" + uid);
  }
}

class Controllers {
  receiver!: UserService;
  history: CommandHistory = new CommandHistory();

  addReceiver(receiver: UserService){
    this.receiver = receiver;
  }

  run() {
    const addUserCommand = new AddUserCommand(
      new User(1),
      this.receiver,
      this.history
    );

    addUserCommand.execute();
    console.log(addUserCommand.history);
    addUserCommand.undo();
    console.log(addUserCommand.history);
  }
}

const controller2 = new Controllers();
controller2.addReceiver(new UserService());
controller2.run();
