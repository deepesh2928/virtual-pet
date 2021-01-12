var happydog;
var dog,Dog;
var foodS, foodStock;
var db;

function preload(){
  dog=loadImage("images/Dog.png");
  happydog=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);

  
  Dog=createSprite(250,350,20,20);
  Dog.addImage(dog);
  Dog.scale=0.3;
  
  db=firebase.database();

  foodStock= db.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyCode===32){
    writeStock(foodS);
    Dog.addImage(happydog);

    if(World.frameCount % 1000000 === 0){
      Dog.addImage(dog);
    }
  }
 
  // console.log(World.frameCount);

  drawSprites();

  textSize(20);
  fill(255,255,255);
  text("Food remaining : "+foodS,20,40);
}

function readStock(data) {
  foodS=data.val();    
}
function writeStock(x) {
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  db.ref('/').update({
    Food:x
  })
}