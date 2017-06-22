var v = [];
var food  = [];
var poison = [];
var p;

function setup() {
  createCanvas(400,400);
  for(var i = 0; i < 1; i++)
  {
    v[i] = new Vehicle(random(width),random(height));
  }

  for(var i = 0; i < 10; i++ )
  {
    food[i] = createVector(random(width),random(height));
  }

  for(var i = 0; i < 10; i++ )
  {
    poison[i] = createVector(random(width),random(height));
  }

  p = new Predator();
}

function draw() {
  background(51);
  foodCol = color(0,255,0);

  fill(foodCol);
  stroke(foodCol);
  for(var i =0 ; i<food.length; i++ )
  {
    ellipse(food[i].x,food[i].y,4,4);
  }

  poisonCol = color(255,0,0);
  fill(poisonCol);
  stroke(poisonCol);
  for(var i =0 ; i<poison.length; i++ )
  {
    ellipse(poison[i].x,poison[i].y,4,4);
  }

  p.update();
  p.display();
  p.boundaries();
  p.eat(v);
  for(var i = v.length -1 ;i>=0;i--)
  {
    if(v[i].health > 0)
    {
      v[i].update();
      v[i].display();
      v[i].eat(food);
      v[i].boundaries();
    }
    else{
      v.splice(i,1);
    }
    //v.seek(createVector(mouseX,mouseY));
  }
}
