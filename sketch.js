 var sword,sword_running;
 var PLAY=1;
 var END=0;
 var gamestate=PLAY;
 var fruit, fruitGroup;
 var fruit1,fruit2,fruit3,fruit4;
 var enemyGroup,enemyImage;
var score ;
var gameover_collided;

function preload(){
  sword_running = loadAnimation("sword.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  enemyImage = loadAnimation("alien1.png","alien2.png");
  gameover_collided = loadAnimation("gameover.png");
 
}

function setup(){
  createCanvas (600 ,400);
  
  //creating sword
  sword=createSprite(40,200,20,20);
  sword.addAnimation("running",sword_running);
  sword.addAnimation("collided",gameover_collided);
  
  sword.scale=0.7;
  
  enemyGroup=new Group();
  fruitGroup=new Group();
  
  
  
  score = 0;
  
  
}

function draw(){
background(180);
  if (gamestate===PLAY) {
  sword.y = mouseY;
  sword.x= mouseX;
    
     if (fruitGroup.isTouching(sword)) {
       fruitGroup.destroyEach();
       score = score +2;
     }
     fruit();
     monster();
    
    if(sword.isTouching(enemyGroup)) {
       gamestate = END;
    }
  }
    
  else if (gamestate ===END){
    
       fruitGroup.destroyEach();
       enemyGroup.destroyEach();
       enemyGroup.velocityY = 0;
       enemyGroup.velocityX = 0;
       fruitGroup.velocityY = 0;
       fruitGroup.velocityX = 0;
       
      sword.changeAnimation("collided",gameover_collided);
      sword.x=200;
      sword.y=200;
      
      
      
  
 }
  
  
  text("score :" +score,500,50);
 
  drawSprites();
}


function fruit() {
  if (frameCount% 80 === 0) {
    var fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug=true
    r=Math.round(random(1,4));
    switch (r){
       case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      
      default: break;
    }
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
  }
  
}

function monster() {
  if(frameCount% 200 ===0) {
    var enemy = createSprite(400,200,20,20);
    enemy.addAnimation("running",enemyImage);
    enemy.y = Math.round(random(100,300));
    enemy.velocityX =-8;
    enemy.setLifetime =50;
    enemyGroup.add(enemy);
  }
  
  
}
