//middleware = цепочка команд

interface IMiddleware {
  next(mid: IMiddleware): IMiddleware;
  handle(request: any): any;
}

abstract class AbstractIMiddleware implements IMiddleware {
  private nextMiddleware!: IMiddleware;

  next(mid: IMiddleware): IMiddleware {
    this.nextMiddleware = mid;
    return mid;
  }

  handle(request: any) {
    if (this.nextMiddleware) {
      return this.nextMiddleware.handle(request);
    }
    return;
  }
}

class AuthMiddleware extends AbstractIMiddleware{
  override handle(request: any) {
      console.log('AuthMiddleware')
      if(request.userId === 1){
        super.handle(request);
      }
      return {error: '404 Forbidden'};
  }
}

class ValidateMiddleware extends AbstractIMiddleware{
  override handle(request: any) {
      console.log('ValidateMiddleware')
      if(request.body){
        super.handle(request);
      }
      return {error: '400 Bad request'};
  }
}

class Controller extends AbstractIMiddleware{
  override handle(request: any) {
      return {success: request};
  }
}

const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller);