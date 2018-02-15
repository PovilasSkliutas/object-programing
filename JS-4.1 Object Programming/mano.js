$(function(){

    let cc = prompt("Iveskite masinu skaiciu", 5);
        cc = parseInt(cc);
        if (cc > 0) {
            raceDistance = prompt("Iveskite distancija", 500);
            let finishdiv = $("<div style='position:absolute; top: "+raceDistance+"px; width: "+(cc+1)*25+"px; height: 2px; background-color: blue;'></div>");
            finishdiv.appendTo(document.body)
            if (raceDistance > 0) {
                // sukuriame masinas
                for (let i = 1; i <= cc; i++) {
                    allCars.push(new Car("Car"+i, i));
                };
                speedChange();
                raceIntervalId = setInterval(race, 500);
                setIntervalId = setInterval(speedChange, 2000);
            } else {
                alert("bloga distancija")
            }
        } else {
            alert("blogas masimu skaicius")
        };

});

// aprasome klase Car su savybemis
function Car(name, lane) {
    this.name = name;
    this.speed = 0;
    this.distance = 0;
    this.lane = lane;
    this.cardiv = $("<div style='position:absolute; top: 0px; left:"+this.lane*25+"px; width: 20px; height: 40px; background-color: red;'></div>");
    this.cardiv.appendTo(document.body)
};
// kuriame funkcionaluma, masina greiteja
Car.prototype.speedup = function (up) {
    this.speed += up;
    // patikriname ar greitis lygus musu nustatytam maksimaliam greiciau, jeigu taip priskiriam maksimaliam
    if (this.speed > 150) {
        this.speed = 150;
    }
};
// kuriame funkcionaluma, masina leteja
Car.prototype.slowdown = function (down) {
    this.speed += down;
    // patikriname ar greitis nera neigiamas, jeigu taip priskiriam 0
    if (this.speed < 0) {
        this.speed = 0;
    }
};
// kuriame funkcionaluma, masina juda (vaziuoja), pasikeite distancija per laika
Car.prototype.move = function (t) {
    this.distance += this.speed * t;
    this.cardiv.css("top", Math.round(this.distance));
};
// apsirasome kintamuosius
let raceIntervalId;
let setIntervalId;
let raceDistance;
let allCars = [];

function speedChange() {
    for (let i = 0; i < allCars.length; i++) {
        if (Math.random() >= 0.5) {
            allCars[i].speedup(
                Math.round(Math.random()*5)
            );
        } else {
            allCars[i].slowdown(
                Math.round(Math.random()*5)
            );
        }
    }
};

function race() {
    let winner = -1;
    for (let i = 0; i < allCars.length; i++) {
        allCars[i].move(0.5);
        if (allCars[i].distance >= raceDistance) {
            winner = i+1;
            break;
        }
    }
    if (winner >= 0) {
        clearInterval(raceIntervalId);
        clearInterval(setIntervalId);
        console.log("Laimejo "+winner+" Masina");
    }
    for (let i = 0; i < allCars.length; i++) {
        console.log("masina "+allCars[i].name+" Greitis "+allCars[i].speed+" Atstumas "+allCars[i].distance);
    }
};
