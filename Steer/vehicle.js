function Vehicle(x,y,dna)
{
  this.acceleration = createVector(0,0);
  this.velocity = createVector(0,-2);
  this.position = createVector(x,y);
  this.r = 4;
  this.maxspeed = 5;
  this.maxforce = 0.25;
  this.health = 100;
  this.update = function()
  {
    this.health -= 0.5;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.applyForce = function(force)
  {
    this.acceleration.add(force);
  }

  this.seek = function(target)
  {
    var desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    this.applyForce(steer);
  }

  this.display = function()
  {
    var angle = this.velocity.heading() + PI/2;
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);

    var col = color(0,255,0);

    fill(col);
    stroke(col);
    strokeWeight(1);
    beginShape();
    vertex(0,-this.r*2);
    vertex(-this.r,this.r*2);
    vertex(this.r,this.r*2);
    endShape(CLOSE);
    pop();
  }

  this.eat = function(list)
  {
    var closest;
    var closestDist = Infinity;
    for(var i = 0; i<list.length;i++)
    {
      d = dist(list[i].x,list[i].y,this.position.x,this.position.y);
      if(d < closestDist)
      {
        closest = i;
        closestDist = d;
      }
    }
    if(closestDist < 5)
    {
      list.splice(closest,1);
      this.health += 30;
    }
    else if(list.length!=0)
    {
      this.seek(food[closest]);
    }
    else if(list.length == 0)
    {
      this.seek(createVector(mouseX,mouseY));
    }
  }

  this.boundaries =function()
  {
    d = 25;
    if(this.position.x > width -d || this.position.x < d || this.position.y > height - d|| this.position.y < d)
    {
      this.seek(createVector(width/2,height/2));
    }
  }
}
