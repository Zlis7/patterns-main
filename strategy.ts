class User2 {
  githubToken: string = '';
  jwtToken: string = '';
}

interface AuthStrategy {
  auth(user: User2): boolean;
}

class Auth {
  constructor(private straragy: AuthStrategy) {}

  setStrategy(straragy: AuthStrategy) {
    this.straragy = straragy;
  }

  public authUser(user: User2): boolean {
    return this.straragy.auth(user);
  }
}

class JWTStrategy implements AuthStrategy {
  auth(user: User2): boolean {
    if (user.jwtToken) {
      return true;
    }
    return false;
  }
}

class GithubStrategy implements AuthStrategy {
  auth(user: User2): boolean {
    if (user.githubToken) {
      return true;
    }
    return false;
  }
}

//Минус стратегии - мы должны знать какая должна быть стратегия
const user3 = new User2();
user3.jwtToken = "token";
const auth5 = new Auth(new JWTStrategy());
console.log(auth5.authUser(user3));
auth5.setStrategy(new GithubStrategy());
