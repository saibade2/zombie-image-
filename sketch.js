var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombie_img;
var bullet,bullet_img;
var zombieGroup,score=0;
var heart_1img,heart_2img,heart_3img;
var heart_1,heart_2,heart_3;
var lives=3;
var gameState="play";

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombie_img= loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bullet_img= loadImage("assets/bullet.png")
  heart_1img= loadImage("assets/heart_1.png")
  heart_2img= loadImage("assets/heart_2.png")
  heart_3img= loadImage("assets/heart_3.png")
  trophy_img=loadImage("assets/trophy.png")
  lost_img=loadImage("assets/lost.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
bullet= createSprite(-100,-100,0.5,0.5)

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

heart_1= createSprite(1200,50,)
 heart_1.addImage(heart_1img)
 heart_1.scale= 0.35
 heart_1.visible=false

 heart_2= createSprite(1200,50,)
 heart_2.addImage(heart_2img)
 heart_2.scale= 0.35
 heart_2.visible=false

 heart_3= createSprite(1200,50,)
 heart_3.addImage(heart_3img)
 heart_3.scale= 0.35



lost = createSprite(600,400,50,50)
lost.addImage(lost_img)
lost.scale=0.25
lost.visible=false

zombieGroup= createGroup()

}

function draw() {
  background(0); 


if(gameState=="play"){

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
 
if(lives==2){
  heart_2.visible=true
  heart_3.visible=false
}

if(lives==1){
  heart_2.visible=false
  heart_1.visible=true
}

if(lives==0){
  gameState="end"
}


  for(var i =0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy()
      lives=lives-1
      console.log(lives)
    }
  }


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet= createSprite(player.x+40,player.y-20,10,10)
  bullet.addImage(bullet_img)
  bullet.velocityX=8
  bullet.scale= 0.09
  player.addImage(shooter_shooting)

 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombieGroup.isTouching(bullet)){
   score=score+1
   for(var i =0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bullet)){
      zombieGroup[i].destroy()
      bullet.destroy()
      console.log(score)
    }
   }
  }

drawSprites();
spawnZombie();
textSize(25)
fill("white")
text("score:"+score,1000,90)
 }
 if(gameState=="end"){
 textSize(50)
 fill("red")
 text("GAME OVER! BETTER LUCK NEXT TIME!!",500,500)
 lost.visible=true
 }

 if(score==2){
  gameState="won"
 }

 if(gameState=="won"){
trophy = createSprite(600,400,50,50)
trophy.addImage(trophy_img)
trophy.scale=0.25
  textSize(50)
 fill("green")
 text("CONGRATULATION! YOU WON!!",500,500,)

 }

 if(score<1){
  textSize(30);
  fill("white");
  text("You Have To Score 2 To Win This Game  ", 500,500);
  gameState ="play";
}
}
 
function spawnZombie(){
  if(frameCount % 90 ===0){
    y= Math.round(random(200,600))
    zombie = createSprite(1350,y,50,50)
    zombie.addImage(zombie_img)
    zombie.velocityX = -3
    zombie.scale=0.15
   zombieGroup.add(zombie) 
   zombie.debug=false
  }
}
