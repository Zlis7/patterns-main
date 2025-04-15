class DocumentItem {
  public text!: string;
  private state!: DocumentItemState;

  constructor(){
    this.setState(new DraftDocumentItemState());
  }

  getState(){
    return this.state;
  }

  setState(state: DocumentItemState){
    this.state = state;
    this.state.setContext(this);
  }

  publishDoc(){
    this.state.publish();
  }

  deleteDoc(){
    this.state.delete();
  }
}

abstract class DocumentItemState{
  public name!: string;
  public item!: DocumentItem;
  
  public setContext(item: DocumentItem){
    this.item = item;
  }

  public abstract publish():void;
  public abstract delete():void;
}

class DraftDocumentItemState extends DocumentItemState{
  constructor(){
    super();
    this.name = 'DraftDocument'
  }

  public override publish(): void {
    console.log('Текст отправлен');
    this.item.setState(new PublishDocumentItemState());
  }

  public override delete(): void {
    console.log('Удален');
  }
}

class PublishDocumentItemState extends DocumentItemState{
  constructor(){
    super();
    this.name = 'DraftDocument'
  }

  public override publish(): void {
    console.log('Уже опубликован');
  }

  public override delete(): void {
    console.log('Снято c публикации')

  }
}

const item = new DocumentItem();
item.text = 'МОй пост';
console.log(item.getState());
item.publishDoc();
console.log(item.getState());
item.publishDoc();
item.deleteDoc();
console.log(item.getState());