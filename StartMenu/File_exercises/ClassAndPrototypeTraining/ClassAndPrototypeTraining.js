"use strict"

/* Exercise (1): Battle of the Prototypes (Old Way) */

function Warrior(name , basePower = 2){
    this.name = name;
    this.basePower = basePower;
    console.log(`Warrior ${this.name} with Power ${this.basePower}`);
}

Warrior.prototype.attack = function(enemy) {
   if (enemy.basePower <= 0 || this.basePower <= 0) {
        if(enemy.basePower <= 0){
            console.log(`${enemy.name} is dead`);
        }
        if(this.basePower <= 0){
            console.log(`${this.name} is dead`);
        }
    }else{
        console.log(`Attacker : ` , this , `Attaced : ` ,enemy);
        let AttackResult = Math.ceil(Math.random() * 3);
            switch (AttackResult) {
                case 1:
                    enemy.basePower -= this.basePower
                    console.log(`Attack successful (entered health value : -${this.basePower})`);
                    if(enemy.basePower <= 0){
                        enemy.basePower = 0;
                        console.log(`Warrior ${enemy.name} is dead`);
                    }
                    if(this.basePower <= 0){
                        this.basePower = 0;
                        console.log(`Warrior ${this.name} is dead`);
                    }
                    this.showStatus(this, enemy);
                    break;
                case 2:
                    console.log(`${enemy.name} defended the attack with shield!`);
                    break;
                case 3:
                    this.basePower -= enemy.basePower
                    console.log(`${enemy.name} counterattacked fiercely! (Health received value : -${enemy.basePower})`);
                    if(enemy.basePower <= 0){
                        enemy.basePower = 0;
                        console.log(`Warrior ${enemy.name} is dead`);
                    }
                    if(this.basePower <= 0){
                        this.basePower = 0;
                        console.log(`Warrior ${this.name} is dead`);
                    }
                    this.showStatus(this, enemy);
                    break;
                default:
                    break;
        }
    }
}
Warrior.prototype.train = function() {
    if (this.basePower <= 0) {
        console.log(`${this.name} is dead`);
    }else{
        let TrainingResult = Math.ceil(Math.random() * 3);
        switch (TrainingResult) {
            case 1:
                setTimeout(() => {
                    this.basePower += 1;
                    console.log(`${this.name} power (${this.basePower}) has been updated.`);
                }, 5000);
                console.log(`Training adds 1 power points to ${this.name} after 5 seconds (${this.basePower} + 1 = ${this.basePower + 1})`);
                break;
            case 2:
                setTimeout(() => {
                    this.basePower += 2;
                    console.log(`${this.name} power (${this.basePower}) has been updated.`);
                }, 5000);
                console.log(`Training adds 2 power points to ${this.name} after 5 seconds (${this.basePower} + 2 = ${this.basePower + 2})`);
                break;
            case 3:
                setTimeout(() => {
                this.basePower += 3;
                    console.log(`${this.name} power (${this.basePower}) has been updated.`);
                }, 5000);
                console.log(`Training adds 3 power points to ${this.name} after 5 seconds (${this.basePower} + 3 = ${this.basePower + 3})`);
                break;
            default:
                break;
        }
    }
}

Warrior.prototype.showStatus = function(a, b){
    console.log(`--- STATUS ---`);
    console.log(`${a.name} Power: ${a.basePower}`);
    console.log(`${b.name} Power: ${b.basePower}`);
    console.log(`----------------`);
  }



//test

/* const vilozaka = new Warrior("vilozaka");
const nozokami = new Warrior("nozokami");

nozokami.train();
setTimeout(() => {
nozokami.train();
},5000)
setTimeout(() => {
nozokami.attack(vilozaka);}
,11000) */


/* //Exercise (2): Inheritance of the Vampire Clan (Old Way) */

function Vampire(name , basePower = 2, drinkBlood = 0.5){
    Warrior.call(this , name , basePower);
    this.drinkBlood = drinkBlood;
}
Vampire.prototype = Object.create(Warrior.prototype);
Vampire.prototype.constructor = Vampire; //

Vampire.prototype.attack = function(enemy) {
    if (enemy.basePower <= 0 || this.basePower <= 0) {
        Warrior.prototype.attack.call(this, enemy);
    }else{
        console.log(`Attacker : ` , this , `Attaced : ` ,enemy);
        let AttackResult = Math.ceil(Math.random() * 3);
            switch (AttackResult) {
                case 1:
                    enemy.basePower = Math.ceil(enemy.basePower * this.drinkBlood);
                    console.log(`The enemy's Power ${(1 - this.drinkBlood) * 100}% decreased.\nEnemy power now is : ${enemy.basePower}.`);

                    enemy.basePower -= this.basePower
                    console.log(`Attack successful (entered health value : -${this.basePower})`);
                    if(enemy.basePower <= 0){
                        enemy.basePower = 0;
                        console.log(`Warrior ${enemy.name} is dead`);
                    }
                    if(this.basePower <= 0){
                        this.basePower = 0;
                        console.log(`Warrior ${this.name} is dead`);
                    }
                    this.showStatus(this, enemy);
                    break;
                case 2:
                    console.log(`${enemy.name} defended the attack with shield!`);
                    break;
                case 3:
                    this.basePower -= enemy.basePower
                    console.log(`${enemy.name} counterattacked fiercely! (Health received value : -${enemy.basePower})`);
                    if(enemy.basePower <= 0){
                        enemy.basePower = 0;
                        console.log(`Warrior ${enemy.name} is dead`);
                    }
                    if(this.basePower <= 0){
                        this.basePower = 0;
                        console.log(`Warrior ${this.name} is dead`);
                    }
                    this.showStatus(this, enemy);
                    break;
                default:
                    break;
        }
    }
}

//test
/* const bros = new Vampire("bros");
const eldin = new Warrior("eldin" , 4);

bros.train();
eldin.train();

setTimeout(() => {
bros.attack(eldin);}
,6000) */


/*  Exercise (3): Royal Rebirth with Classes (Modern Way) */

class King {
    constructor(name , land , command = {}){
        this.name = name;
        this.land = land;
        this.command = command;
    }
    rule(){
        console.log(`This is ${this.land}, the land of King ${this.name}.`);
        console.log(`The laws of this land are as follows:`);
        for (const key in this.command) {
            console.log(`[${key}] law is as follows: ${this.command[key]}`)
        }
    }
    addCommand(Title , Content){
        this.command[Title] = Content;
    }

}
//test

/* const KingIran = new King('Korosh' , 'IRAN' , {
    Pendarnic : `Let's speak good, true, and honest words.`,
});

KingIran.addCommand('Raftarnic' , 'Right and sincere behaviors');
KingIran.rule(); */


/*   Exercise (4): Wizardry and Class Inheritance (Modern Way) */

class Wizardry extends King {
    constructor(name , land , command){
        super(name , land , command);
    }

    castSpell(spellSelector){
        let spell;
        switch(spellSelector){
            case 1:
                spell = "Ice";
            break;
            case 2:
                spell = "Fire";
            break;
            case 3:
                spell = "Power";
            break;
            default:
                console.log(`There is no such spell.`);
            return;
        }

        console.log(`The ${spell} spell was activated.`);
    };
}
//test

/* const ShazemSoyasho = new Wizardry('Shazem' , 'Soyasho' , {
    Power : `Power is life`,
});

ShazemSoyasho.addCommand('War' , 'War is Power');
ShazemSoyasho.rule();
ShazemSoyasho.castSpell(2); */


/* Exercise (5): Prototype Chain Detective */
const KingIran = new King('Korosh' , 'IRAN' , {
    Pendarnic : `Let's speak good, true, and honest words.`,
});

KingIran.addCommand('Raftarnic' , 'Right and sincere behaviors');
KingIran.rule();

console.log(`=========================`);

 const ShazemSoyasho = new Wizardry('Shazem' , 'Soyasho' , {
    Power : `Power is life`,
});

ShazemSoyasho.addCommand('War' , 'War is Power');
ShazemSoyasho.rule();
ShazemSoyasho.castSpell(2);

console.log(`=========================`);

// 1
console.log(ShazemSoyasho instanceof King);
// 2
const vilozaka = new Warrior("vilozaka");
console.log(vilozaka instanceof Object);
// 3
console.log(Object.prototype);
