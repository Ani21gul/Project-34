//Create variables here
var dog, happyDog;
var dogImg, happyDogImg
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  happyDog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  happyDog.scale= 0.25;
  happyDog.addImage(happyDogImg);
  happyDog.visible=false;
  foodStock= database.ref('food');
  foodStock.on("value", readStock)

}


function draw() {  
  background(46, 139, 87);
  fill("black");
  text("Press up arrow to feed the dog",250,100);

  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.visible=false;
    happyDog.visible=true;
  }
  drawSprites();
  //add styles here

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<= 0){
    x=0
  }else{
    x = x-1
  }
  database.ref('/').update({
    food:x
  })
}



