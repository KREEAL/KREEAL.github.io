let isReloading = false;
let scoreInt = 0;
let health = 100;

let shoot_intervals = new Array();

function removeguys() {
  // let guys = document.getElementsByClassName("guydiv");

  // for (let i = 0; i < guys.length; i++) {
  //   remove(guys[i]);
  // }

  let guys = document.getElementById("guys");
  guys.remove();

  newdiv = document.createElement("div");
  newdiv.id = "guys";
  newdiv.classList.add("guys");

  let gamecontainer = document.getElementById("gamecontainer1");
  gamecontainer.appendChild(newdiv);
}

function endOfGame() {
  health = 100;
  let healthPoint = document.getElementById("health");
  healthPoint.textContent = health;

  let highScore = document.getElementById("HighScore");
  let reallyhight = highScore.textContent;
  if (parseInt(highScore.textContent) < scoreInt) {
    highScore.textContent = scoreInt;
    reallyhight = scoreInt;
  } else {
    reallyhight = reallyhight;
  }

  removeguys();

  for (let i = 0; i < shoot_intervals.length - 1; i++) {
    clearInterval(shoot_intervals[i]);
  }
  shoot_intervals = new Array();

  let lastScore = document.getElementById("lastScore");
  lastScore.textContent = scoreInt;

  let highScoreNew = document.getElementById("jopa");
  highScoreNew.textContent = reallyhight;

  let menu = document.getElementsByClassName("newgame");
  menu[0].style.display = "block";
}

function getFireImg() {
  newFire = document.createElement("IMG");
  newFire.src = "gunfire.png";
  newFire.classList.add("fire");
  return newFire;
}

function spawnFire(guy) {
  let fire = getFireImg();
  fire.style.left = guy.style.left;
  fire.style.top =
    parseInt(guy.style.top) + parseInt(guy.style.height) * 0.5 + "px";

  guy.parentNode.appendChild(fire);
  setTimeout(() => fire.remove(), 1000);
}

function remove(link) {
  link.parentNode.removeChild(link);
}

function defeat_enemy(enemy) {
  let score = document.getElementById("CurrentScore");
  if (enemy.classList[1] == "slide_to_up") {
    scoreInt = scoreInt + 100;
  }
  enemy.classList.remove("slide_to_up");
  enemy.classList.add("slide_to_down");

  for (let i = 0; i < shoot_intervals.length; i++) {
    if (shoot_intervals[i].enemyobj == enemy) {
      console.log(shoot_intervals[i]);
      clearInterval(shoot_intervals[i].id);
      shoot_intervals.splice(i, 1);
    }
  }

  score.textContent = scoreInt;
}

function getRandomImg() {
  let randnum = Math.random();
  let resultstr = "";
  if (randnum <= 0.5) {
    resultstr = "badguy.png";
  } else {
    resultstr = "awfulguy.png";
  }
  return resultstr;
}

function respawn_enemy(enemy) {
  enemy.src = getRandomImg();
  enemy.classList.remove("slide_to_down");
  enemy.classList.add("slide_to_up");

  let alreadyShooting = false;

  for (let i = 0; i < shoot_intervals.length; i++) {
    if (shoot_intervals[i].enemyobj == enemy) {
      alreadyShooting = true;
    }
  }
  if (!alreadyShooting) {
    let shoot_interval = setInterval(function () {
      if (enemy.classList[1] == "slide_to_up") {
        shoot_to_player(enemy);
      }
    }, 3500);

    shoot_intervals.push({ enemyobj: enemy, id: shoot_interval });
  }
}

function shoot_to_player(guy) {
  spawnFire(guy);
  if (document.getElementsByClassName("guydiv").length > 0 && health > 0) {
    let toPlayerSound = new Audio("ak47.wav");
    toPlayerSound.play();

    let health3 = document.getElementById("health");
    health = health - 1;
    health3.innerText = health;
  } else {
    for (let i = 0; i < shoot_intervals.length - 1; i++) {
      clearInterval(shoot_intervals[i]);
    }
    shoot_intervals = new Array();
    endOfGame();
  }

  if (health < 0) {
    health = 100;
    for (let i = 0; i < shoot_intervals.length - 1; i++) {
      clearInterval(shoot_intervals[i]);
    }
    shoot_intervals = new Array();
    endOfGame();
  }
}

function canShoot() {
  if (document.getElementById("bulletstray").childElementCount > 0) {
    can_shoot();
    return true;
  } else {
    cant_shoot();
    return false;
  }
}

function can_shoot() {
  let canShootSound = new Audio("ShotAk47.mp3");
  canShootSound.play();
}

function cant_shoot() {
  let cantShootSound = new Audio("emptyshot.mp3");
  cantShootSound.play();
}

function reload() {
  reloadBullets(10);
}

function reloadBullets(bullets_quantity) {
  isReloading = true;
  console.log("AUFFF");
  let bulletstray = document.getElementById("bulletstray");
  let current_bullets = bulletstray.childElementCount;

  let reloadSound = new Audio("reload.mp3");
  reloadSound.play();

  setTimeout(function () {
    for (let i = current_bullets; i < bullets_quantity; i++) {
      if (current_bullets < bullets_quantity - 1) {
        newBullet = document.createElement("IMG");
        newBullet.src = "bullet.png";
        bulletstray.appendChild(newBullet);
      }
    }
    isReloading = false;
  }, 2000);

  console.log("Reloaded");
}

function refreshBullets() {
  console.log("NOOO");
  let bulletstray = document.getElementById("bulletstray");
  let bullets = [];

  let reloadSound = new Audio("reload.mp3");
  reloadSound.play();

  for (let i = 0; i < 10; i++) {
    newBullet = document.createElement("IMG");
    newBullet.src = "bullet.png";
  }
}

function getPosition(pointx, pointy) {
  let postionObject = {
    left: pointx,
    top: pointy,
  };

  return postionObject;
}

function getRandomTerrorist() {
  newTerrorist = document.createElement("IMG");
  newTerrorist.src = getRandomImg();
  return newTerrorist;
}

function getSize(widt, heigh) {
  let sizeObject = {
    width: widt,
    height: heigh,
  };

  return sizeObject;
}

function makeTerrorist(position, size, id) {
  let terroristImg = getRandomTerrorist();
  terroristCords = position;
  terroristImg.style.left = position.left + "px";
  terroristImg.style.top = position.top + "px";
  terroristImg.style.width = size.width + "px";
  terroristImg.style.height = size.height + "px";

  terroristImg.id = id;
  terroristImg.classList.add("standart");
  terroristImg.classList.add("slide_to_down");

  newdiv = document.createElement("div");
  newdiv.id = "div" + id;
  newdiv.classList.add("guydiv");
  newdiv.appendChild(terroristImg);
  return newdiv;
}

function plaseToPositions() {
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);

  // Clear any timeout/interval up to that id
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }

  let positions = new Array();
  let guystray = document.getElementById("guys");

  guystray.appendChild(
    makeTerrorist(getPosition(60, 202), getSize(100, 125), "guy1")
  );
  guystray.appendChild(
    makeTerrorist(getPosition(520, 356), getSize(80, 100), "guy2")
  );
  guystray.appendChild(
    makeTerrorist(getPosition(610, 255), getSize(100, 125), "guy3")
  );
  guystray.appendChild(
    makeTerrorist(getPosition(870, 251), getSize(80, 100), "guy4")
  );
  guystray.appendChild(
    makeTerrorist(getPosition(1160, 257), getSize(90, 113), "guy5")
  );
  guystray.appendChild(
    makeTerrorist(getPosition(720, 47), getSize(70, 88), "guy6")
  );
  guystray.appendChild(
    makeTerrorist(getPosition(1050, 82), getSize(70, 88), "guy7")
  );
  setTimeout(function () {
    respawnDead();
    setTimeout(function () {
      respawnDead();
      setTimeout(function () {
        respawnDead();
        setTimeout(function () {
          respawnDead();
          setTimeout(function () {
            respawnDead();
            setTimeout(function () {
              respawnDead();
              setTimeout(function () {
                respawnDead();
              }, 1000);
            }, 1100);
          }, 1300);
        }, 1400);
      }, 1600);
    }, 1700);
  }, 2000);
}

function respawnDead() {
  let guys = document.getElementsByClassName("standart");
  let deadguys = new Array();
  for (let i = 0; i < guys.length; i++) {
    if (guys[i].classList[1] === "slide_to_down") {
      deadguys.push(guys[i]);
    }
  }

  if (deadguys.length > 0) {
    let randnum = Math.floor(
      Math.random() * (Math.floor(deadguys.length - 1) - Math.ceil(0)) +
        Math.ceil(0)
    );
    respawn_enemy(deadguys[randnum]);
  }
}
