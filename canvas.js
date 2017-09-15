var canvas =document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log('canvas', canvas)

var c = canvas.getContext('2d')
// c.fillText = "6"
// c.fillStyle ="#ff0";

// for(var i = 1; i< 20; i++){
//     var  x = i * 100;
//    // var  y = i * 102;
//    c.fillRect(x ,100, 80, 80) 
// }

// //Line

// c.beginPath();
// c.moveTo(20, 300);
// c.lineTo(100, 500);
// c.lineTo(100, 800);
// c.strokeStyle = "#8000FF";
// c.stroke();


// //arc
// c.beginPath();
// c.arc(600, 400, 200, 0, 200, false);
// c.stroke()

var mouse = {
    x: undefined,
    y:undefined
}

var maxRadius = 40;
var minRadius = 2;
var colorArray = [
       '#ffaa33',
       '#99ffaa',
       '#33aaff',
       '#44fffa',
       '#22ddff',
       '#663355'
   ];

console.log(colorArray.length)
window.addEventListener('mousemove', function(event){
    console.log('mousemove', event.x)
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle(x, y ,dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy =dy;
    this.radius =radius;
    this.minRadius = minRadius;
    this.color = colorArray[Math.round(Math.random() * colorArray.length)];

    this.draw = function(){

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        //c.strokeStyle = "#8000FF";
        c.fillStyle = this.color;
      //  c.stroke();
        c.fill();
       

    }

    this.update = function(){

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx
        }

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        }
        this.x += this.dx;
        this.y += this.dy;

        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
           && mouse.y - this.y < 50 && mouse.y - this.y > -50 ){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        }else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}


// var x = Math.random() * innerWidth,
//  y = Math.random() * innerHeight,
//  dx = (Math.random() * -0.5) * 10 ,
//  dy = (Math.random() * -0.5) * 10 ,
//  radius = 30;
//var circle = new Circle(200, 200, 4, 4, 30)
var circleArray = []
for(var i=0; i < 2000; i++){

    var x = Math.random() * (innerWidth - radius * 2) + radius,
        y = Math.random() * (innerHeight - radius * 2) + radius,
        dx = (Math.random() * -0.5) * 3,
        dy = (Math.random() * -0.5) * 3,
        radius = (Math.random() * 3) + 2;

    circleArray.push(new Circle(x, y, dx, dy, radius));
}
//var circle = new Circle(200, 200, 4, 4, 30)

function animate(){
    requestAnimationFrame(animate);
   // console.log(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for(var i=0; i < circleArray.length; i++){
        circleArray[i].update();

    }
    //circle.update();
}

animate();