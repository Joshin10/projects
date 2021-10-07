var gameState="play"
var buildingGroup,skyGroup,coinGroup
var score=0
//var flag='home'
function preload(){
bg=loadImage("background.jpg")
heliImg=loadAnimation("helicopter.png")
build1=loadImage("Building1.png")
build2=loadImage("building2.png")
build3=loadImage("building3.png")
object1=loadImage("object1.png")
object2=loadImage("object2.png")
object3=loadImage("object3.png")
blast=loadAnimation("blastImg.png")
coinImg=loadImage("coin.png")
gameOverImg=loadImage("gameover.png")
//restartImg=loadImage("restart.png")
}

function setup() {
  createCanvas(1365,575);
edges=createEdgeSprites()
  player=createSprite(400, 250, 50, 50);
  player.addAnimation("player",heliImg);
  player.addAnimation("blast",blast);
  player.scale=0.125; 
  gameOver=createSprite(650,240,50,50)
  gameOver.addImage("gameOver",gameOverImg)
  gameOver.visible=false
  player.setCollider("rectangle",0,0,2000,405)
  buildingGroup=new Group ()
  skyGroup=new Group()
  coinGroup=new Group()
  
}

function draw() {
  background(bg);  
  if(gameState==="play"){

  
  if(keyDown("up")){
    player.y=player.y-4
  }
  if(keyDown("down")){
    player.y=player.y+4
  }
spawnObstacle()
spawnSkyObstacle()
spawnCoins()

if(coinGroup.isTouching(player)){
  for(var x = 0;x<coinGroup.length;x++){
    if(coinGroup[x].isTouching(player)){
      score=score+5
      coinGroup[x].destroy()
    }
  }
}
if(buildingGroup.isTouching(player)||skyGroup.isTouching(player)){
gameState="end"

}

}
else if(gameState==="end"){
  player.changeAnimation("blast",blast);
  //player.scale=1
player.velocityY=0
buildingGroup.setVelocityXEach(0)
skyGroup.setVelocityXEach(0)
coinGroup.setVelocityXEach(0)
gameOver.visible=true 
//restart.visible=true

setTimeout(function(){
player.visible=false
},2000)
}
player.collide(edges[2])
player.collide(edges[3])



  drawSprites();

fill ("yellow")
textSize(30)
text("Score "+score,1200,50)

}
/*function reset(){
gameOver.visible=false
restart.visible=false
player.visible=true
player.scale=0.5
player.changeAnimation("player",heliImg);
gameState="play"
skyGroup.destroyEach()
buildingGroup.destroyEach()
coinGroup.destroyEach()

}*/

function spawnObstacle(){
if(frameCount%50===0){
  var building=createSprite(1365,450,100,100) 
  var obj=Math.round(random(1,3))
  //building.debug=true;
  building.setCollider("rectangle",0,0,200,400)
  building.velocityX=-(10+3*score/10)
  if(obj===1){
    building.addImage(build1)
    building.scale=0.5
  }
  if(obj===2){
    building.addImage(build2)
    building.scale=0.7
  }
  if(obj===3){
    building.addImage(build3)
    building.scale=0.9
  }
  building.lifetime=140
buildingGroup.add(building)
  
}

} 
function spawnSkyObstacle(){

  if(frameCount%100===0){
  var object=createSprite(1400,100,100,100)
  var obj2=Math.round(random(1,3))
  object.y=Math.round(random(50,200))
  object.velocityX=-(20+3*score/10)

  //object.debug=true
  object.setCollider("rectangle",0,0,500,200)
  if(obj2===1){
object.addImage(object1)
object.scale=0.5
    }
if(obj2===2){
object.addImage(object2)
object.scale=0.09
          }
if(obj2===3){
object.addImage(object3)
object.scale=0.09
                }
   object.lifetime=140
   skyGroup.add(object)                 
}

}
function spawnCoins(){
  if(frameCount%100===0){
    var coin=createSprite(1365,450,100,100) 
    coin.y=Math.round(random(50,300))
 //   var obj=Math.round(random(1,3))
    //building.debug=true;
    //building.setCollider("rectangle",0,0,200,400)
    coin.velocityX=-10
      coin.addImage(coinImg)
      coin.scale=0.2
    coin.lifetime=140
  coinGroup.add(coin)
  }
  }