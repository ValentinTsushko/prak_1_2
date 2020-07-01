class Graphics1d {
  constructor(
    xmin = -10.0,
    xmax = 10.0,
    ymin = -10.0,
    ymax = 10.0,
    W = 120 * 4.2,
    H = 100 * 5,
    f = function(x) {
      return 10*Math.sin(x*x);
    }
  ) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.f = f;
    this.ev = 0;
  }
  evaluate() {
    this.values = new Map();
    for (let i = this.xmin; i <= this.xmax; i += 0.01) {
      this.values[i] = this.f(i);
    }
    this.ev = 1;
    return this.values;
  }
  draw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    var graph = document.getElementById("mycanvas");
    var ctx = graph.getContext("2d");
    var drawed = new Graphics1d();
    if (this.ev == 0) this.evaluate();
    //     zero - это математически найденный центр; step - шаг по иксу и игрику
    let
    stepx = this.W / (-this.xmin + this.xmax),
    stepy = this.H / (-this.ymin + this.ymax),
    zerox = Math.abs(this.xmin) * stepx,
    zeroy = Math.abs(this.ymin) * stepy;
    //
    ctx.fillStyle = bg; //строка, содержащая цвет в формате, поддерживающимся стандартом CSS
    ctx.fillRect(0, 0, graf.W, graf.H); //x - Координата начальной точки прямоугольника по оси x. y - Координата начальной точки прямоугольника по оси y. width - Ширина прямоугольника. height- Высота прямоугольника.
    ctx.beginPath(); // начало отрисовки
    ctx.lineWidth = 2;
    ctx.strokeStyle = axis; // зелененький
    ctx.moveTo(0, zeroy);
    ctx.lineTo(graf.W, zeroy);
    ctx.moveTo(zerox, 0);
    ctx.lineTo(zerox, graf.H);
    ctx.closePath();
    ctx.stroke();
    ctx.lineWidth = 0.2;
    ctx.strokeStyle = axis;
      //  координатная сетка
      
    for (let i = 0; i <= graf.W; i += stepx){
      for ( let j = 0; j <= graf.H; j += stepy) {
        ctx.beginPath();
        ctx.moveTo(i, j);
        ctx.lineTo(i + stepx, j);
        ctx.lineTo(i + stepx, j + stepy);
        ctx.lineTo(i, j + stepy);
        ctx.closePath();
        ctx.stroke();
      }
    }
      
      // просто сетка
      
    ctx.beginPath();
    ctx.lineWidth = 1.5;  // ширина функции
    ctx.strokeStyle = dots;  // красненькай
    ctx.moveTo(zerox + (this.f(this.xmin) * stepx), zeroy - (this.f(this.xmin) * stepy)); // нулевая точка + значение функции в минимальной точки функции * на шаг
    for (let i = this.xmin; i <= this.xmax; i += 0.01){
      // точки приближенных нулей
      if(this.values[i] > 0 && this.values[i] < 10e-10){
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = zeros;
        ctx.arc(zerox + i * stepx, zeroy - stepy * this.values[i - 0.1], 3, 0, 180);
        // arc - добавляет дугу к пути с центром (x, y) и с радиусом r  с началом в startAngle и с концом endAngle 
        //и с направлением против часовой стрелки (по умолчанию по часовой стрелке).
        // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
      }
      else{
      console.log(i, this.values[i]);
      ctx.lineTo(zerox + i * stepx, zeroy - this.values[i] * stepy);
      }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.font = '20px serif';
    ctx.fillStyle = "black";
    ctx.fillText('(' + this.xmax + ", " + this.ymax + ')', zerox + this.xmax * stepx - 70, zeroy + this.ymin * stepy + 20);
    ctx.fillText('(' + this.xmin + ", "+ this.ymin + ')', zerox + this.xmin * stepx + 5, zeroy + this.ymax * stepy - 10);
    ctx.fillText('(' + this.xmax + ", "+ this.ymin + ')', zerox + this.xmax * stepx - 75, zeroy + this.ymax * stepy - 10);
    ctx.fillText('(' + this.xmin + ", "+ this.ymax + ')', zerox + this.xmin * stepx + 5, zeroy + this.ymin * stepy + 20);
  }

  autodraw(
    dots = "red",
    axis = "green",
    zeros = "indigo",
    gaps = "magenta",
    bg = "gray"
  ) {
    
    this.ymin = this.f(this.xmin);
    this.ymax = this.f(this.xmax);
    
    this.draw(dots, axis, zeros, gaps, bg);
  }
}

    var graf = new Graphics1d();
    graf.draw();
 

