var canvas =document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img2 = new Image();
img2.src = 'dino.png';

var dino =
{
   x:10,
   y:200,
   width:30,
   height:30,
   
 draw()
 {
   ctx.fillStyle ='green';
   ctx.drawImage(img2, this.x, this.y);
   ctx.fillRect(this.x,this.y,this.width,this.height);
 }

}
//dino.draw()

var img1 = new Image();
img1.src = 'cactus.png';



class Cactus
{
   constructor()
   {
       this.x = 500;
       this.y = 200;
       this.width=50;
       this.height=50;
   }
   draw()
   {
      ctx.fillStyle='red'
      ctx.fillRect(this.x,this.y,this.width,this.height);
      ctx.drawImage(img1,this.x,this.y)
   }
}

var timer = 0;
var cactusArr =[];
var JumpTimer =0;
var Ani_mation;


function everyFrameRun()
{
   Ani_mation = requestAnimationFrame(everyFrameRun);
   timer++;

   ctx.clearRect(0,0,canvas.width,canvas.height);

   if (timer % 140 ===0 )
   {
      var cactus = new Cactus();
      cactusArr.push(cactus);
        
   }
   
    cactusArr.forEach((a,i,o)=>
    {
      //x좌표가 0미만이면 제거
      if(a.x < 10)
      {
         o.splice(i,1)
      }
      a.x--;
      IfCrash(dino,a);

      a.draw();
    })

   if (IngJump == true)
   {
      dino.y--;
      JumpTimer++;
   }
   if (IngJump == false)
   {
      if (dino.y < 200)
      {
         dino.y+=3;
      }
      
   }
   if (JumpTimer >100)
   {
      IngJump = false;
      JumpTimer = 0;
   }

   dino.draw()
} 

everyFrameRun();

//충돌확인
function IfCrash(dino,cactus)
{
 var x_Gap = cactus.x - (dino.x + dino.width);
 var y_Gap = cactus.y - (dino.y + dino.height);
 if(x_Gap <0 && y_Gap <0)
 {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cancelAnimationFrame(Ani_mation);
 }
}






var IngJump = false; //점프중
document.addEventListener('keydown',function(e)
{
  if (e.code === 'Space')
  {
   IngJump = true;
  }

})

