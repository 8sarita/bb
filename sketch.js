//create var 
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;

var bowImage, arrowImage, green_balloonImage, red_balloonImage, 
    pink_balloonImage ,blue_balloonImage, backgroundImage;

var gameOverImg,gameover;
var resetImg,reset;
var getreadyImg,getready;
var enemyGroup,enemyImg;

var PLAY=1;

var END=0;

var gameState=PLAY;
var touches=[]; 
var highest=[];
var li;

var release;
var blast;
var gameoverSound;
var button,buttonImg;

function preload(){
  //loading images
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  
  bowImage = loadImage("bow0.png");
  
  red_balloonImage = loadImage("red_balloon0.png");
  
  green_balloonImage = loadImage("green_balloon0.png");
  
  pink_balloonImage = loadImage("pink_balloon0.png");
  
  blue_balloonImage = loadImage("blue_balloon0.png");

  cloudImage = loadImage("cloud.png");

  gameOverImg = loadImage("game over.gif");

  resetImg = loadImage("reset.gif");

  getreadyImg = loadImage("getready.gif");

  enemyImg = loadImage("enemy.gif");

  release = loadSound("realese.mp3");

  blast= loadSound("blast.mp3");

  gameoverSound = loadSound("game overs.wav");

  buttonImg = loadImage("shootbutton.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  //creating background
  // background = createSprite(windowWidth-800,windowHeight-500);
  // background.addImage(backgroundImage);
  // background.scale = 2.5;
  
  // creating bow to shoot arrow
  bow = createSprite(width-80,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1.4;
  
  //create groups of allballoons and arrow
  redB=new Group();
  blueB=new Group();
  greenB=new Group();
  pinkB=new Group();
  arrowGroup=new Group();
  enemyGroup=new Group();

  cloudsGroup = createGroup();
  //score =0
   score = 0  
   s = 0;
  

   getready=createSprite(width/2,height/2,50,50);
        getready.addImage(getreadyImg);
        getready.scale=0.8;

        gameover= createSprite(-width-180,height-350,50,50);
     gameover.addImage(gameOverImg);
     gameover.scale=0.8;
    

      reset= createSprite(-width-180,height-300,50,50);
     reset.addImage(resetImg);
     reset.scale=0.1;


     li=createSprite(width/0.9,height/2,6,1000);

     button= createSprite(width/4.5,height/1.3,50,50);
     button.addImage(buttonImg);
     button.scale=0.6;
}

function draw() {

  background("skyblue");

  textSize(20);
  textFont("CALVIN");
  stroke("black");
  strokeWeight(4 );
  fill("red");
  text("HIGHEST SCORE "+ highest,width/1.5,height/1.08);
 
 
  // condition game state=PLAY then 
  if (gameState===PLAY){
    
     // moving ground
    // background.velocityX = -(3+2 * score/4);
    
    // release arrow when space key is pressed
  if (touches.length === 48||touches.height === 502|| keyWentDown("space")) {
    createArrow();
    release.play();
    touches =[];

  } 
    
       //moving bow
    
       
  bow.y = World.mouseY
       
     //creating continous enemies
  var select_balloon = Math.round(random(1,5));
    
   //spawnning random balloons
    if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    }else if(select_balloon === 4){
      enemys();
    }
    else if(select_balloon === 5) {
      pinkBalloon();
    }
    
  }
      
    //condition when arrowGroup touch redB then destroy both arrow  Group and redB and score+1
    if (arrowGroup.isTouching(redB)){
      redB.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
      highest=highest[s=s+1];
      blast.play();
    }
    
    if (arrowGroup.isTouching(blueB)){
      blueB.destroyEach();
      arrowGroup.destroyEach();
      score=score+3;
      highest=highest[s=s+3];
      blast.play();
    }
    
    if (arrowGroup.isTouching(greenB)){
      greenB.destroyEach();
      arrowGroup.destroyEach();
      score=score+2;
      
      blast.play();
      highest=highest[s=s+2];
    } 
    
    
    if (arrowGroup.isTouching(pinkB)){
      pinkB.destroyEach();
      arrowGroup.destroyEach();
      score=score+1;
      highest=highest[s=s+1];
      blast.play();
    }

    if (arrowGroup.isTouching(enemyGroup)){
      gameState=END;
      score=score-10;
      arrowGroup.setVelocityXEach(0);
      gameoverSound.play();
    }
   
   

    //condition when balloon touch bow then gameState=END
    if (redB.isTouching(bow)||
        pinkB.isTouching(bow)||
       blueB.isTouching(bow)||greenB.isTouching(bow)||
       enemyGroup.isTouching(bow)){ 
        gameoverSound.play();
      gameState=END;
    }
 
      
      if(redB.isTouching(li)||
      pinkB.isTouching(li)||
     blueB.isTouching(li)||greenB.isTouching(li)||
     enemyGroup.isTouching(li)){
      gameState=END;
      gameoverSound.play();
     }
     
      if(frameCount % 60===0){
        getready.x=-width-180;
      }
       
      gameover.x=-width-180;
      reset.x=-width-180;
     
    spawnClouds();
    console.log(mouseX,mouseY);
  } 
  
  else if(gameState === END){
    // background.velocityX=0;
    
    redB.setVelocityXEach(0);
    greenB.setVelocityXEach(0);
    blueB.setVelocityXEach(0);
    pinkB.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);

    gameover.x=width/2;
      reset.x=width/2;
    textSize(20);
    
    //condition if r key is pressed then gameState=PLAY and score=0

    
 if(mousePressedOver(reset)|| touches.length === width/2){
    r();
    
 }






  }
 
    // bow.debug=true;
    // if (background.x < 0){
    //   background.x = background.width/2;
    // }
    fill(rgb(24, 148, 193));
    
   rect(width/2.55,height/40,120,50);
   line(width/2000,height-25,2000,height-25);
   line(width/2000,height-80,2000,height-80);
  highest=[s];
  drawSprites();
  
  //displaying score
    fill("pink");
    textFont("CALVIN");
    textSize(28);
    stroke("yellow");
    stroke("black");
    strokeWeight(6);
    text("Score: "+ score, width/2.5,50); 
    noFill();
    noFill();
    noStroke();
    noStroke();

    
  //condition when gameState=END then display given text
 if (gameState===END){
    fill("black");
   textFont("CALVIN");
    // text("GAME_OVER!",width-260,height/2);
    noFill();
   fill("red");
  //  text("PRESS R RESTART",width-285,height-300);
 } 
  
 

}

function redBalloon() {
  var red = createSprite(width/9,Math.round(random(70, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = (3+2 * score/4);
  red.lifetime = 800;
  red.scale = 0.2;
  redB.add(red);
  return red
  
}

function blueBalloon() {
  var blue = createSprite(width/9,Math.round(random(70, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX =  (3+2 * score/4);
  blue.lifetime = 800;
  blue.scale = 0.2;
   blueB.add(blue);
  return blue;
 
}

function greenBalloon() {
  var green = createSprite(width/9,Math.round(random(70, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX =  (3+2 * score/4);
  green.lifetime = 800;
  green.scale = 0.2;
  greenB.add(green);
  return green;   
}

function pinkBalloon() {
  var pink = createSprite(width/9,Math.round(random(70, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX =  (3+2 * score/4);
  pink.lifetime = 800;
  pink.scale = 1.2
  pinkB.add(pink);
  return pink;
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(20, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = bow.x;
  arrow.y=bow.y;
  arrow.velocityX = -8;
  arrow.lifetime = 800;
  arrow.scale = 0.3;
  // arrow.debug=true;
   arrow.setCollider("rectangle",0,0,200,20);
   arrowGroup.add(arrow);
  return arrow;
   
}


function destroyed(){
  redB.destroyEach();
  blueB.destroyEach();
  greenB.destroyEach();
  pinkB.destroyEach();
  cloudsGroup.destroyEach();
  enemyGroup.destroyEach();
  arrowGroup.destroyEach();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {

    var cloud = createSprite(width/1,120,40,10);
    cloud.y = Math.round(random(10,windowHeight));
    cloud.addImage(cloudImage);
    cloud.scale = 1.4;
    cloud.velocityX = -(3+2* score/4);
    cloud.shapeColor="red";
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth= redB.depthEach-1;
    cloud.depth= blueB.depthEach-1;
    cloud.depth= greenB.depthEach-1;
    cloud.depth= pinkB.depthEach-1;
    cloud.depth= bow.depth-1;

    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function r(){
  redB.destroyEach();
  blueB.destroyEach();
  greenB.destroyEach();
  pinkB.destroyEach();

  cloudsGroup.destroyEach();

  enemyGroup.destroyEach();

  arrowGroup.destroyEach();
  gameState=PLAY;

  getready.x=width/2;
  gameoverSound.stop();
  score=0;
}

function enemys() {
  var enemy = createSprite(width/9,Math.round(random(70, 370)), 10, 10);
  enemy.addImage(enemyImg);
  enemy.velocityX =  (3+2 * score/4);
  enemy.lifetime = 800;
  enemy.scale = 0.3;
 
  enemyGroup.add(enemy);

  return enemy;   
}