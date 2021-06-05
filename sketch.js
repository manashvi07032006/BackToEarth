var spaceship, spaceshipImg, spaceshipImg2;
var START = 0
var PLAY = 1; 
var END = 2;
var gameState = START;

var back;
var level = 0, score = 0, count=0, lives = 5;
var birds, birds3, bulletGroup, bulletImg;
var chick, motherHen, stones, attackGroup;
var scoreboard, happyEnd;
var chirpSound, hitSound, shootSound, overSound, winSound, scoreSound;
var replay, goodToGo, letsGo, goal, goalImg, instructions, instructImg;
var jupiter, jupiterImg, belt, beltImg, mars, marsImg, title, titleImg;

function preload(){
   spaceshipImg = loadImage("Images/spaceship.png");
   spaceshipImg2 = loadImage("Images/spaceship_tilt.png");
   bulletImg = loadImage("Images/shoot.png");
   bgImg = loadImage("Images/background.png");
   chick_blue = loadAnimation("Images/c1.png", "Images/c2.png", "Images/c3.png");
   chick_black = loadAnimation("Images/b1.png", "Images/b2.png", "Images/b3.png");
   chick_red = loadAnimation("Images/r1.png", "Images/r2.png", "Images/r3.png");
   stone1 = loadImage("Images/stone (1).png");
   stone2 = loadImage("Images/stone (2).png");
   stone3 = loadImage("Images/stone (3).png");
   stone4 = loadImage("Images/stone (4).png");
   egg1 = loadImage("Images/egg1.png");
   egg2 = loadImage("Images/egg2.png");
   egg3 = loadImage("Images/egg3.png");
   scoreboard = loadImage("Images/score.png");
   goodToGo = loadImage("Images/go.png");
   earthImg = loadImage("Images/earth.png");
   happyEndImg = loadImage("Images/happyEnd.png");
   sadEndImg = loadImage("Images/sadEnd.png");
   replayImg = loadImage("Images/replay.png");
   goalImg = loadImage("Images/goal.png");
   instructImg = loadImage("Images/instructions.png")

   jupiterImg = loadImage("Images/jupiter.png");
   beltImg = loadImage("Images/belt.png");
   marsImg = loadImage("Images/mars.png");
   titleImg = loadImage("Images/title.png")

   chirpSound = loadSound("Sounds/chirp.mp3");
   shootSound = loadSound("Sounds/shoot.mp3");
   overSound = loadSound("Sounds/over.mp3");
   winSound = loadSound("Sounds/win.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  title = createSprite(width/2 , 60, 20, 20);
  title.addImage("topic", titleImg);
  title.scale = 0.6

  back = createSprite(width/2, height/2, 20, 20);
  back.addImage("bg", bgImg);
  back.visible = false;
 
  goal = createSprite(width/2 , height/2 , 250, 60);
  goal.addImage("goal", goalImg);
  goal.scale=0.5;

  replay = createSprite(width/2 +400, height/2 + 200, 250, 60);
  replay.addImage("replay", replayImg);
  replay.scale = 0.5;
  replay.visible = false;

  letsGo = createSprite(width/2 + 300, height/2 +300, 250, 60);
  letsGo.addImage("Go",goodToGo);
  letsGo.scale = 0.5;
  letsGo.visible = false;

  motherHen = createSprite(width/2, -200, 5,5);
  motherHen.addImage("fine", egg1);
  motherHen.addImage("tattered", egg2);
  motherHen.addImage("broken", egg3);
  motherHen.scale= 2;
  motherHen.visible = false;
  motherHen.setCollider("circle", 0, 0, 75);

  birds = new Group();
  birds3 = new Group();
  stones = new Group();
  bulletGroup = new Group();
  
  spaceship = createSprite(width/2, height, 20, 20);
  spaceship.addImage("space", spaceshipImg);
  spaceship.addImage("space2", spaceshipImg2);
  spaceship.scale = 0.5;
  spaceship.setCollider("circle", 0, 0, 100)
  spaceship.visible = false;

  earth = createSprite(width/2, height/2, 20,20);
  earth.addImage("earth", earthImg);
  earth.scale = 2;
  earth.visible = false;

  happyEnd= createSprite(width/2, 150, 500, 50);
  happyEnd.addImage("happy", happyEndImg);
  happyEnd.visible = false;

  sadEnd= createSprite(width/2, height/2, 500, 50);
  sadEnd.addImage("sad", sadEndImg);
  sadEnd.visible = false;

  jupiter = createSprite(180, 120, 20, 20);
  jupiter.addImage("jup", jupiterImg);
  jupiter.visible = false;
  jupiter.scale = 0.5
  belt = createSprite(180, 120, 20, 20);
  belt.addImage("jup", beltImg);
  belt.visible = false;
  belt.scale = 0.5
  mars = createSprite(180, 120, 20, 20);
  mars.addImage("jup", marsImg);
  mars.visible = false;
  mars.scale = 0.5
}

function draw(){
  background("pink");
  
  if(gameState === START ){
    textSize(30)
    fill("deepPink")
    textSize(40)
    text("PRESS SPACE TO START!!", width/2 - 200, height-50)
    
    if(touches.length>0 || keyWentDown("space")){
      gameState = PLAY;
      level = 1;
      goal.visible = false;
      title.visible = false;
      touches = []
    }
  }

  if(gameState === PLAY){
    back.velocityY = -6;
    if(back.y<0){
      back.y = height/2;
    }
    back.visible = true;
    jupiter.visible = true;

    //start of level1
    if(level === 1 && score<10500){
      spaceship.visible = true;
      level1();
      keyPressed();

      if((touches.length > 0 || keyWentDown("SPACE")) && score!=10500) {
        touches = [];
        shoot();
      }
  
      for (var i = 0; i < birds.length; i++) {
        if(birds.get(i) != undefined){
          if (birds.get(i).isTouching(spaceship)){
            birds.get(i).destroy();
            lives=lives-1;
          }
        }
      }
      for (var i = 0; i < birds.length; i++) {
        for(var j = 0; j < bulletGroup.length; j++){
          if(birds.get(i) != undefined){
            if (birds.get(i).isTouching(bulletGroup.get(j))){
              birds.get(i).destroy();
              bulletGroup.get(j).destroy();
              score+=200;
            }
          }
        }
      }
      if(score>=10500 ){
        birds.destroyEach();
        jupiter.visible = false;
        level = 2;
      }
    }//end of level1

    //start of level2
    if(level===2 && score<30500){
      belt.visible = true;
      spaceship.visible = true;
      level2();
      keyPressed();

      if((touches.length > 0 || keyWentDown("SPACE")) && score!=30500) {
        touches = [];
        shoot();
      }

      for (var i = 0; i < stones.length; i++) {
        for(var j = 0; j < bulletGroup.length; j++)
        if(stones.get(i) != undefined){
          if (stones.get(i).isTouching(bulletGroup.get(j))) {
            stones.get(i).destroy();
            bulletGroup.get(j).destroy();
            score+=300;
          }
        } 
      }  

      for (var i = 0; i < stones.length; i++) {
        if(stones.get(i) != undefined){
          if (stones.get(i).isTouching(spaceship)){
            stones.get(i).destroy();
            lives=lives-1;
          }
        }
      }

      for(var k = 0; k<stones.length; k++){
        if(stones.get(k)!=undefined && (stones.get(k).x<=0 || stones.get(k).y>=height)){
          stones.get(k).destroy();
        }
      }

      if(score>=30500){
        stones.destroyEach();
        belt.visible = false;
        level = 3;
      }

    }//end of level2

    //start of level3
    if(level === 3 && score<50000){
      spaceship.visible = true;
      mars.visible = true;
      level3();
      keyPressed();

      if((touches.length > 0 || keyWentDown("SPACE")) && score!=50000) {
        touches = [];
        shoot();
      }
  
      for(var j = 0; j < bulletGroup.length; j++){
        if (motherHen.isTouching(bulletGroup.get(j))) {
          bulletGroup.get(j).destroy();
          score+=100;
          count++;
        }
      }

      for(var k = 0; k<birds3.length; k++){
        if(birds3.get(k)!=undefined && (birds3.get(k).y>=height)){
          birds3.get(k).destroy();
        }
      }

      for (var i = 0; i < birds3.length; i++) {
        if(birds3.get(i) != undefined){
          if (birds3.get(i).isTouching(spaceship)){
            birds3.get(i).destroy();
            lives=lives-1;
          }
        }
      }

      for (var i = 0; i < birds3.length; i++) {
        for(var j = 0; j < bulletGroup.length; j++){
          if(birds3.get(i) != undefined){
            if (birds3.get(i).isTouching(bulletGroup.get(j))) {
              birds3.get(i).destroy();
              bulletGroup.get(j).destroy();
              score+=300;
            }
          }
        }
      } 
      if(score>=50000){
        birds.destroyEach();
        motherHen.destroy();
        bulletGroup.destroyEach();
        spaceship.velocityY = -10;
        mars.visible = false;
        gameState = END;
        winSound.play();
      }
    }//end of level3

    if(lives <=0){
      gameState = END;
      overSound.play();
      birds.destroyEach();
      birds3.destroyEach();
      stones.destroyEach();
      bulletGroup.destroyEach();
    }

  }

  //start of end state
  if(gameState === END){
    jupiter.visible = false;
    belt.visible = false;
    mars.visible = false;
    motherHen.visible = false;

    if(lives<=0){
      back.visible = false;
      spaceship.visible = false;
      sadEnd.visible=true;
      birds3.destroyEach();
      replay.visible = true;
    }
    if(score>=50000){
      spaceship.x = width/2 - 300;
      spaceship.y = height/2 + 200;
      spaceship.velocityY = 0;
      back.velocityY = 0;
      spaceship.changeImage("space2", spaceshipImg2);
      earth.visible = true;
      happyEnd.visible = true;
      birds3.destroyEach();
      replay.visible = true;
    }

    if(touches.length>0 || keyWentDown("SPACE")) {      
      reset();
      touches = []
    }
  }//end of end state
  
  drawSprites();
  if(gameState!=START){
    image(scoreboard, -15, -30, 500, 80);
    textSize(30);
    fill("blue");
    textFont("Lucida Fax");
    text("Score: " + score , 30, 30);
    text(lives , 350, 30);
    fill("red");
    text("❤ " , 300, 30);
  }
}


function shoot(){
  var bullet = createSprite(spaceship.x, spaceship.y, 20, 20);
  bullet.addImage("bullet", bulletImg);
  bullet.scale = 0.6;
  bullet.velocityY = -20;
  bulletGroup.add(bullet);
  shootSound.play();
}

function level1(){
  if(frameCount%15 === 0){
    var bird = createSprite(0, height/2, 40, 40);
    var rann = Math.round(random(1,2));
    if(rann===1){
      bird.addAnimation("chick", chick_blue);
    }
    else if(rann===2){
      bird.addAnimation("chick", chick_red);
    }
    bird.scale = 0.5;
    bird.y = random(100,height - 50);
    
    var rand = Math.round(random(1,2));
    if(rand===1){
      bird.x = 0;
      bird.velocityX = (8);
    }
    else if(rand===2){
      bird.x = width;
      bird.velocityX = -(8);
    }
    bird.lifetime = width/bird.velocityX;
    birds.add(bird);
    chirpSound.play();
  }
}

function level2(){
  if(frameCount%10 === 0){
    var stone = createSprite(0, 0, 40, 40);  
    var rand = Math.round(random(1,2));
    if(rand ===1){
       stone.x = Math.round(random(200, width));
       stone.y = 0;
    }
    else if(rand === 2){
      stone.x = width;
      stone.y = Math.round(random(0, height));

    }
    
    var randi = Math.round(random(1,4));
    switch(randi) {
      case 1: stone.addImage(stone1);
              break;
      case 2: stone.addImage(stone2);
              break;
      case 3: stone.addImage(stone3);
              break;
      case 4: stone.addImage(stone4);
              break;
      default: break;
    }
    stone.lifetime = width/stone.velocityX;
    stones.add(stone);
    stones.setVelocityEach(-8,7)
  }
}

function level3(){
  motherHen.visible = true; 
  if(motherHen.y<height/2 - 100){ 
    motherHen.velocityY = 2;
  }
  else if(motherHen.y>height/2 - 100){
    motherHen.velocityY = 0;
  }
  else if(count >= 100 && motherHen.y<height/2 - 100){
    motherHen.velocityY = -2;
  }
  
  if(count===40){
    motherHen.changeImage("tattered", egg2);
  }
  if(count === 80){
    motherHen.changeImage("broken", egg3);
  }

  if(frameCount%20 === 0){
    var bird = createSprite();
    bird.addAnimation("chick", chick_black);
    bird.scale = 0.5;
    //bird.velocityY = 3;

    var rand = Math.round(random(1,3));
    if(rand===1){
      bird.x = 0;
      bird.y = Math.round(random(40, height-20));
      bird.velocityX = (8);
    }
    else if(rand===2){
      bird.x = width;
      bird.y = Math.round(random(40, height-20));
      bird.velocityX = -(8);
    }
    else if(rand===3){
      bird.x = Math.round(random(50,width - 50));
      bird.y = 0;
      bird.velocityY = (8);
    }
    console.log(rand);

    bird.lifetime = width/bird.velocityX;
    birds3.add(bird);
  }
}

function keyPressed(){
  if(keyDown(LEFT_ARROW) && spaceship.x>50 && spaceship.x<width-20){
    spaceship.x -= 10;
}
  if(keyDown(RIGHT_ARROW) && spaceship.x<(width-50) && spaceship.x>20){
      spaceship.x += 10;         
  }
  if(keyDown(UP_ARROW) && spaceship.y>0){
      spaceship.y -= 10;
  }
  if(keyDown(DOWN_ARROW) && spaceship.y<height){
      spaceship.y += 10;         
  }
}

function reset(){
  gameState = START;
  lives = 5;
  score = 0;
  level = 1;
  count = 0;
  replay.visible = false;
  title.visible = true;
  goal.visible = true;
  back.visible = false;
  earth.visible = false;
  happyEnd.visible = false;
  sadEnd.visible=false;
  spaceship.changeImage("space", spaceshipImg);
  jupiter.visible = false;
  belt.visible = false;
  mars.visible = false;
  spaceship.x = width/2;
  spaceship.y = height;
}