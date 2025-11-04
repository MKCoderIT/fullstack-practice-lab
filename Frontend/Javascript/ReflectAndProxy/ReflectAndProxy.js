'use strict'

/* Practice (1) Reflect and Proxy (API)*/
class Student {
    constructor(name = '', score = 0) {
        this.name = name;
        this.score = score;
    }
}

class StudentProxy {
    static construct(name , score){
        const resultProxy = new Proxy(Student , {
            construct(target , args){
                if(args[1] >= 0 && args[1] <= 20){
                    return Reflect.construct(target , args);
                    }else{
                        throw new Error("❌The score must be between 0 and 20.");
                    }
            }
        })
        return new resultProxy(name , score);
    }
    static create (name , score){
        return new Proxy(StudentProxy.construct(name , score), {
        get(target, prop) {
            if (prop === 'name'){
                return `👉 You are viewing the name : ${Reflect.get(target , prop)}`
            }else if(!Reflect.has(target , prop)){
                throw new Error("❗No such property exists.")
            }
            return Reflect.get(target , prop);
        },
        set(target, prop, value) {
            if (prop === 'score') {
                if(value >= 0 && value <= 20){
                    return Reflect.set(target , prop , value);
                }
                else{
                    throw new Error("❌The score must be between 0 and 20.")
                }
            }
            return Reflect.set(target , prop , value);
        },
        });
    }
}

 // const student = StudentProxy.create("Mohsen" , 20);
 // student.name = "Reza";
 // student.score = 19;

 // console.log(student.name)
 // console.log(student.score)

 // console.log(student.age); //error
 // student.score = 22; //error


 /* Practice (2) Reflect and Proxy (API) SecureUser*/

 class SecureUser {
    static Admin = 0;
    static User = 1;

    constructor(username, password, role = SecureUser.User) {
      this.username = username;
      this.password = password;
      this.role = role;
    }
    revealSecrets (){
        if(this.role === SecureUser.Admin){
            return `Your pass : ${this.password}`
        }else{
            throw new Error("Access denied.");
        }
    }
  }

  class SecureUserProxy {
    static construct(username, password) {
      const ProxyClass = new Proxy(SecureUser, {
        construct(target, args) {
          const [Argusername, Argpassword] = args;

          if (Argusername.trim().length < 5) {
            throw new Error("Username length cannot be less than 5 characters.");
          }

          if (Argpassword.trim().length < 6 || Argpassword.includes(" ")) {
            throw new Error("Password must be at least 6 characters and without spaces.");
          }

          const isAdmin = Argusername === "admin" && Argpassword === "adminpass";
          const role = isAdmin ? SecureUser.Admin : SecureUser.User;

          const user = new target(Argusername, Argpassword, role);

          //Object.freeze(); 👇
          Reflect.defineProperty(user, "username", {
            value: Argusername,
            writable: true,
            enumerable: true,
            configurable: false
          });

          Reflect.defineProperty(user, "password", {
            value: Argpassword,
            writable: false,
            enumerable: isAdmin,
            configurable: false
          });

          Reflect.defineProperty(user, "role", {
            value: role,
            writable: false,
            enumerable: isAdmin,
            configurable: false
          });

          if(!isAdmin){
            Reflect.preventExtensions(user);
          }
          return user;
        }
      });
      return new ProxyClass(username, password);
    }
  }

  class CreateSecureUser {
    constructor(){

    }


    static create(username, password) {
      const target = SecureUserProxy.construct(username, password);

      return new Proxy(target, {
        ownKeys(target) {
          if (target.role === SecureUser.Admin) {
            return Reflect.ownKeys(target);
          } else {
            return Reflect.ownKeys(target);
          }
        },
        set(target , propery , newValue){
            if(target.role === SecureUser.Admin){
                console.log(`You have set the property : ${propery}`);
                return Reflect.set(target , propery , newValue);
            }else{
                throw new Error("Access denied.");
            }
        },
        get(target , propery){
            if(target.role === SecureUser.Admin){
                console.log(`You have get the property : ${propery}`);
                return Reflect.get(target , propery);
            }else{
                throw new Error("Access denied.");
            }

        }
      });
    }
  }

  const admin = CreateSecureUser.create("admin", "adminpass");
  console.log(Object.keys(admin));
  console.log(admin.revealSecrets());
  admin.username = 'addmin2';
  admin.username = 'addmin3';
  console.log(admin.username);

  const user = CreateSecureUser.create("user1", "userpass");
  console.log(Object.keys(user));
  user.username = 'user2';
  console.log(user.username);
  console.log(user.revealSecrets()); //Error
