var dog,saddog,happydog;
var foodObj;
var foodS, foodStock;
var fedTime,lastFed,feed,addFood;
var gameState;

function preload()
{
	//load images here
  saddog = loadImage("Images/Dog.png");
  happydog = loadImage("Images/dog2.png");
  garden=loadImage("Images/Garden.png");
washroom=loadImage("Images/WashRoom.png");
bedroom=loadImage("Images/BedRoom.png");
livingroom = loadImage("Images/Living Room.png");
vaccination = loadImage("Images/Vaccination.jpg");
dogvaccination = loadImage("Images/dogVaccination.png");
foodstock = loadImage("Images/Food Stock.png");
run = loadImage("Images/running.png");
runleft = loadImage("Images/runningLeft.png");


}

function setup() {
	createCanvas(1000, 1000);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,200,150,150);
  dog.addImage(saddog);
  dog.scale = 0.15;

  food = createButton("Feed the dog");
  food.position(200,95);
  food.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(300,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
 

 
background("green");
  foodObj.display();
  

  if(foodS == 0){

    dog.addImage(happydog);
    this.image.visible = false;
  }
  else{
    dog.addImage(saddog);
    this.image.visible = true;
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >=12){
    text ("Last Feed: "+lastFed%12+"PM",350,90);
   }
   else{
     text("Last Feed : "+lastFed+"AM",350,30);
   }
   textSize(25);
text ("HE'S NAME IS JOJI",20,350);
   if(gameState === 1){

    dog.addImage(happyDog);
    dog.scale = 0.175;
    dog.y = 250;
   }

   if(gameState === 2){
     dog.addImage(sadDog);
     dog.scale = 0.175;
     this.image.visible = false;
     dog.y =250;
   }

   var Bath = createButton("I want to take bath");
   Bath.position(200,125);
   if(Bath.mousePressed(function(){
     gameState =3;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===3){
     dog.addImage(washroom);
     dog.scale = 1;
     this.image.visible = false;
     textSize(20);
     text("THE WATER SO COLD BUT I LIKE TO BATH",10,240);
   }
   var Sleep = createButton("I am very sleepy");
   Sleep.position(400,125);
   if(Sleep.mousePressed(function(){
     gameState =4;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===4){
     dog.addImage(bedroom);
     dog.scale = 1;
     this.image.visible = false;
     textSize(20);
     text("SLEEPING IS THE BEST JOB IN THE WORLD'ZO,ZO,ZO' ",10,240);
   }
   var Play = createButton("Let's Play");
   Play.position(200,160);
   if(Play.mousePressed(function(){
     gameState =5;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===5){
     dog.addImage(livingroom);
     dog.scale = 1;
     this.image.visible = false;
     textSize(15);
     text("THE BEST PLACE INSIDE HOUSE TO PLAY IS LIVING ROOM",10,240);
   }
 
   var PlayInGarden = createButton("Let's play in the park");
   PlayInGarden.position(300,160);
   if(PlayInGarden.mousePressed(function(){
     gameState =6;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===6){
     dog.addImage(garden);
     dog.scale = 1;
     this.image.visible = false;
     textSize(20);
     text("ITS SO FUN PLAYING IN THE GARDEN ",10,240);
   }
   var vaccin = createButton("Let's take the vaccination");
   vaccin.position(200,200);
   if(vaccin.mousePressed(function(){
     gameState =7;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===7){
     dog.addImage(vaccination);
     dog.scale = 0.3;
     this.image.visible = false;
     textSize(20);
     text("IT PAINS WHEN THE INJECTION HITS THE BODY",10,240);
   }
   var vaccindog = createButton("Let's look the vaccination schedule date");
   vaccindog.position(400,200);
   if(vaccindog.mousePressed(function(){
     gameState =8;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===8){
     dog.addImage(dogvaccination);
     dog.scale = 0.4;
     this.image.visible = false;
     textSize(25);
     text("NO MORE VACCINATION!!!!!!!!!",10,240);
   }

   var stock = createButton("Let's look the FOOD STOCK");
   stock.position(200,260);
   if(stock.mousePressed(function(){
     gameState =9;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===9){
     dog.addImage(foodstock);
     dog.scale = 0.4;
     this.image.visible = false;
     textSize(15);
     text("'IT LOOKS TASTY ' WHAT WILL BE ITS TAST WHEN I EAT IT?????",10,240);
   }
   var run1 = createButton("Let's run together");
   run1.position(400,260);
   if(run1.mousePressed(function(){
     gameState =10;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===10){
    
       dog.addImage(run);
    dog.addImage(runleft);
     dog.scale = 0.4;
     this.image.visible = false;
     textSize(20);
     text("I'AM SO HAPPY TO BE YOUR PET",10,240);
   }
  drawSprites();
  //add styles here

}
function feedDog() {
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  textSize(25);
  text("THIS CUTE DOG'S NAME IS JOJI",100,240);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
   
  })
}

function update(state){
  database.ref('/').update({
    gameState: gameState
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    food : x
  })
}

