var trex, ground, score, cloudgroup,  obstacle, gamestate, gameover, restart, cloud,obstacle1, select;
var cloudimg, gameoverimg, ground2img, o1,o2, o3, o4,o5, o6, restartimg, trexrunning, trexcolliding;
function preload(){
cloudimg=loadImage("cloud.png");
ground2img=loadImage("ground2.png");
gameoverimg=loadImage("gameOver.png");
o1=loadImage("obstacle1.png");
o2=loadImage("obstacle2.png");
o3=loadImage("obstacle3.png");  
o4=loadImage("obstacle4.png");  
o5=loadImage("obstacle5.png");  
o6=loadImage("obstacle6.png");  
restartimg=loadImage("restart.png");
trexrunning=loadAnimation("dino1.jpg", "dino2.jpg", "dino3.jpg", "dino4.jpg", "dino5.jpg", "dino5.jpg", "dino6.jpg", "dino7.jpg", "dino8.jpg", "dino9.jpg", "dino10.jpg");
//trexcolliding=loadAnimation("trex_collided.png");  
}
function setup(){ 
createCanvas(windowWidth, windowHeight);
trex = createSprite(88, 280, 20, 20);
trex.addAnimation("trex", trexrunning);
//trex.addAnimation("colliding", trexcolliding);
trex.scale=0.5;
 ground = createSprite(200, 380, 400, 10);
ground.addImage(ground2img);
 score=0;
//trex.debug=true;
trex.setCollider("circle", 0, 0, 35);
//var invisibleground = createSprite(200, 390, 400, 5);
//invisibleground.visible=false;
 cloudgroup = createGroup();
 obstacle = createGroup();
 gamestate="play";
 gameover = createSprite(width/2, height/2-150, 20, 20);  
gameover.addImage(gameoverimg);  
 restart = createSprite(width/2, height/2-50, 20, 20);
restart.addImage(restartimg);
gameover.visible=false;
restart.visible=false;
}
function draw() {
background("white");
drawSprites();
trex.collide(ground); 
  textSize(25);
text("score="+score, 60, 67);
  if (gamestate=="play") {
  ground.velocityX=-(6+score/100);  
  
  if (touches.length>0 || keyDown("space") && trex.y>=339) {
  trex.velocityY = -13;
 touches=[];    //playSound("sound://category_jump/arcade_game_jump_1.mp3");
  }
  trex.velocityY = trex.velocityY+0.8;

score=score+Math.round(frameRate()/40);
if (score%100==0) {
//playSound("sound://category_bell/choose_background.mp3", false);
}

if (ground.x<0) {
 ground.x=ground.width/2; 
}
if (trex.isTouching(obstacle)) {
gamestate="end";
gameover.visible=true;
restart.visible=true;
 // playSound("sound://category_music/gameover.mp3");
}
console.log("hello "+7);

 clouds(); 
obstacles();
  }  
if (gamestate=="end") {
    ground.velocityX=0;  
trex.velocityX=0;
cloudgroup.setVelocityXEach(0);  
obstacle.setVelocityXEach(0);
cloudgroup.setLifetimeEach(-1);
obstacle.setLifetimeEach(-1);
cloudgroup.destroyEach();
obstacle.destroyEach();
//trex.changeAnimation("colliding", trexcolliding);
if (touches.length>0 || mousePressedOver(restart)) {
gamestate="play";  
trex.changeAnimation("trex", trexrunning);
gameover.visible=false;
restart.visible=false;
score=0;
touches=[];
}
}
}
function clouds(){
if (frameCount%80==0) {
 cloud = createSprite(width, random(30, 250), 20, 20); 
cloud.addImage(cloudimg);
cloud.velocityX=-(6+score/100);
cloud.lifetime=800;
cloudgroup.add(cloud);
}  
}
function obstacles(){
if (frameCount%80==0) {
 obstacle1 = createSprite(width, 360, 20, 20); 
 select=Math.round(random(1,6));
switch(select){
case 1:    
obstacle1.addImage(o1);
break
case 2:    
obstacle1.addImage(o2);
break
case 3:    
obstacle1.addImage(o3);
break
case 4:    
obstacle1.addImage(o4);
break
case 5:    
obstacle1.addImage(o5);
break
case 6:    
obstacle1.addImage(o6);
break
default:break}
obstacle1.scale=0.7;
obstacle1.velocityX=-(6+score/100);
obstacle1.lifetime=800;
obstacle1.depth=trex.depth;
trex.depth=trex.depth+1;  
obstacle.add(obstacle1);
}  
}
