var game = (function(){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var rect = canvas.getBoundingClientRect();
  var dir = 'right';
  var spawns = {};

  function spawn(theSpawn) {
    spawns[theSpawn] = {}
    spawns[theSpawn].y = Math.floor(Math.random()*canvas.width);
    spawns[theSpawn].x = 0;
    spawns[theSpawn].h = 10;
    spawns[theSpawn].w = 10;
    spawns[theSpawn].interval = setInterval(()=>{
      ctx.fillStyle = '#ffffff';
      ctx.clearRect(spawns[theSpawn].y, spawns[theSpawn].x-5, spawns[theSpawn].w, spawns[theSpawn].h);
      ctx.fillRect(spawns[theSpawn].y, spawns[theSpawn].x++, spawns[theSpawn].w, spawns[theSpawn].h);
      if(spawns[theSpawn].x == canvas.height+5) {
        clearInterval(spawns[theSpawn].interval);
      }
    }, 10);
  }

  return {
    changeDir: function() {
      if(dir == 'right'){
        dir = 'left';
      } else {
        dir = 'right';
      }
    },

    player: function() {
      var i = 0;
      var player = setInterval(function(){
        ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);

        if(i==canvas.width-50){
          dir = 'left';
        }

        if(i==0 ){
          dir = 'right';
        }

        if(dir=='right'){
          ctx.clearRect(i-10, 450, 50, 50);
          ctx.fillRect(i++, 450, 50, 50);
        } else {
          ctx.clearRect(i+10, 450, 50, 50);
          ctx.fillRect(i--, 450, 50, 50);
        }
        let x = i;
        let y = 450;
        let h = 50;
        let w = 50;
        var kill = false;

        for(s in spawns){
          if(x < spawns[s].x + spawns[s].w
          && spawns[s].x > x
          && spawns[s].x < (x+w)
          && y < spawns[s].y + spawns[s].h
          && y+h > spawns[s].y) {
            kill = true;
        }
          if(kill){
            clearInterval(spawns[s].interval);
            clearInterval(player);
          }
        }
      }, 1);
    },

    evil: function() {
      var evil = setInterval(function(){
        var text = '';
        var possible = 'abcdefghijklmnopqrstuvwxyz';
        for(var i=0; i < 10; i++){
          text += possible.charAt(Math.floor(Math.random()*possible.length));
        }
        spawn(text);
      }, 800);
    },

    init: function() {
      canvas.height = '600';
      canvas.width = '800';
      this.player();
      this.evil();
    }
  }
})();

game.init();

window.addEventListener('keyup', function(){
  game.changeDir();
});
