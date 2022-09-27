var can2 = document.getElementsByClassName('can2')[0];
can2.width = window.innerWidth;
can2.height = window.innerHeight;

var context = can2.getContext('2d');

function Circle(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speedX = (Math.random() - 0.5) * 3;
    this.speedY = (Math.random() - 0.5) * 3;
    this.a = 1;
    this.color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
}

Circle.prototype.draw = function () {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2,);
    context.globalAlpha = this.a;
    context.globalCompositeOperation = 'lighter';
    context.fill();
    this.update();
}
Circle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.a *= 0.97;
}


var circleArr = [];
can2.addEventListener('mousemove', function (e) {
    var circle = new Circle(e.clientX, e.clientY, 20);
    circleArr.push(circle);
}, false)

function render() {
    context.clearRect(0, 0, can2.width, can2.height);
    circleArr.forEach(function (ele, i) {
        ele.draw();
        if (ele.a < 0.03) {
            circleArr.splice(i, 1);
        }
    });
    requestAnimationFrame(render);
}
render();