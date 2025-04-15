import type{ Student } from "@classes";
import {toJson} from 'really-relaxed-json'

/* 
    Promise<type>
    Record<string, bool>
*/

/* @internal */
interface Denis {
  age: number;
  numberPhone: string;
}

abstract class Denis2 {
  abstract sayHi(): void;
}

class Denis3 extends Denis2 {
  override sayHi(): void {
    console.log("Hi");
  }
}

class DenStudent implements Student {
  name: string = "Denis";
  age: number = 18;
  nameGroup: string = "П-311а";
  roleInGroup: string = "Император";
}

interface Denis {
  age: number;
  numberPhone: string;
}
const Student2: Denis = {
  age: 12,
  numberPhone: "324",
};

console.log(Student2.age);
new Denis3().sayHi();
console.log(new DenStudent().age);

const fun = (a: number) => {
  a + 2;
};

console.log(fun(1));

function abc(a: number): number {
  if (4 > 0) {
    return 4;
  }
  return a + 3;
}

abc(123);

type Good<T extends string | number> = T extends number ? "User" : 123;

function test<T extends number | string>(arg: T): Good<T> {
  if (typeof arg === "string") {
    return "User" as Good<T>;
  }
  return 123 as Good<T>;
}

console.log(test<string>("12"));

// interface ABC {
//   a: string;
//   b: number;
//   c: boolean;
// }

// type keyOfABC = keyof ABC;

//  type getFirstArg<T> = T extends (first: infer First, ...args: any[]) => any
//  ? First
//  : never;

//

// Partial / Required
// Readonly

// Omit / Pic
// Extract / Exclude

// type temp = Extract<userAccess, boolean>

// ReturnType<typeof A>
// Parameters ^, ConstructorParametrs

// Awaited - тип промиса

interface IUser {
  users: number;
  getUsers(): number;
}

// function nullUser(targer: Function) {
//   targer.prototype.users = 0;
// }

// Инициализируются сверху вниз, а исполняются снизу вверх
// Инициализируются - до return, исполнение - внутри return

//@threeUser
//@nullUser
//@FabricUsers(100)
class User implements IUser {
  @Max(100)
  users: number = 12;

  @Log
  getUsers(): number {
    return this.users;
  }

  @Catch({rethrow: true})
  getError(): number {
    throw new Error('Error');
  }
}

function Max(maxValue:number){
  return(
    target:Object,  //User
    propertyKey:string | symbol //users
  )=>{ 
      let value:number;

      const setter = function(newValue:number){
        if (newValue > maxValue){
          throw new Error(`Нельзя установить значение больше ${maxValue}`)
        } else{
          value = newValue;
        }
      }

      const getter = function(){
        return value;
      }

      Object.defineProperty(target, propertyKey, {
        set:setter,
        get:getter
      });
  }
}

function Log(
  target:Object, 
  propertyKey:string | symbol, 
  descriptor: TypedPropertyDescriptor<(...args:any) => any>
): TypedPropertyDescriptor<(...args:any) => any> | void{
  console.log(target);
  console.log(propertyKey);
  console.log(descriptor);

 //const oldValue = descriptor.value;

  descriptor.value = (...args:any):any =>{
    console.log('New Value ' + args);
    //oldValue(args);
  }
}

function Catch({rethrow}: {rethrow: boolean} = {rethrow: true}){
  console.log('Я сдесь - ' + rethrow)
  return (
    target:Object, 
    propertyKey:string | symbol, 
    descriptor: TypedPropertyDescriptor<(...args:any[]) => any>
  ): TypedPropertyDescriptor<(...args:any[]) => any> | void => {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);

    const method = descriptor.value;

    descriptor.value = async(...args:any[]) =>{
      try{
        return await method?.apply(target, args);;
      }catch(e){
        console.log('Была ошибка');
      }
    }
  }
}

// function threeUser<T extends { new (...args: any[]): {} }>(constructor: T) {
//   return class extends constructor {
//     users = 8;
//   };
// }

// function FabricUsers(countUser: number) {
//   return (targer: Function) => {
//     targer.prototype.users = countUser;
//   };
// }

console.log(new User().getUsers());

// Паттерн декоратора
function a(object:any){
  object.users = 0;
  return object;
}

function b(object:any){
  object.age = 0;
  return object;
}

console.log(a(b(new User())).getUsers())
//

const user = new User();
user.users = 57;
console.log(user.users);
user.users = 120;
console.log(user.users);

 
const rjson = '[ one two three {foo:bar} ]'
const json = toJson(rjson)
console.log(json);

class AB{
  a:number = 12;
}

function addB(object:any):any{
  object.b = 24;
  return object;
}

console.log(addB(new AB()).b);