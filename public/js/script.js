// http://api.jquery.com/jquery.getjson/#jsonp
window.onload = function() {
  var play1,play2,winner,typeOfGame,play;
  var reset = false;
  var lastWinner = [];
  var container=[];
  var allPlays = [];
  var computerPlaysP1=[];
  var containerCPU = [];
  var p1 =[];
  var p2 = [];
  var score1=0;
  var score2=0;
  var comb = [['col11','col12','col13'],['col21','col22','col23'],['col31','col32','col33'],['col11','col21','col31'],['col12','col22','col32'],['col13','col23','col33'],['col11','col22','col33'],['col13','col22','col31']];
  var game = document.getElementsByClassName("gameTwoPlayer")[0];
  var gameOne = document.getElementsByClassName("gameOnePlayer")[0];
  $('.gameTwoPlayer').hide();
  $('.gameOnePlayer').hide();
  $('.gameBar').hide();
  $('.score').hide();
  menu();

  function menu(){
    $("#onePlayer,#twoPlayer").on('click',function(){
      $('.menu').fadeOut(1000, function(){
        $('.menu').hide();
      })
      var type = $(this).attr('id');
      if( type == "twoPlayer" && reset == false){
        $('.gameTwoPlayer, .gameBar').delay(1000).fadeIn(1000, function(){
          $('.gameBar').show();
          $('.gameTwoPlayer').show();
          typeOfGame = "gameTwoPlayer";
        })
        gameStart();
      }else if (type == "onePlayer" && reset == false) {
        $('.gameOnePlayer, .gameBar').delay(1000).fadeIn(1000, function(){
          $('.gameBar').show();
          $('.gameOnePlayer').show();
          typeOfGame = "gameOnePlayer";
        })
        gameStart();
      }else if ( type == "twoPlayer" && reset == true) {
        $('.gameTwoPlayer, .gameBar').delay(1000).fadeIn(1000, function(){
          $('.gameBar').show();
          $('.gameTwoPlayer').show();
          typeOfGame = "gameTwoPlayer";
        })
        player1();
      }else if ( type == "onePlayer" && reset == true) {
        $('.gameOnePlayer, .gameBar').delay(1000).fadeIn(1000, function(){
          $('.gameBar').show();
          $('.gameOnePlayer').show();
          typeOfGame = "gameOnePlayer";
        })
        player1();
      }
      return false;
    })
  }

  function gameStart(){
      player1();
      $(".gameTwoPlayer, .gameOnePlayer").on('click',function(){
        typeOfGame = $(this).attr('class');
        var nrPlays = game.getElementsByTagName('p').length;
        allPlays.push(container);
        if (allPlays[allPlays.length-1][1] == "X") {
          p1.push(allPlays[allPlays.length-1][0]);
        }else if (allPlays[allPlays.length-1][1] == "O") {
          p2.push(allPlays[allPlays.length-1][0]);
        }
      for (var i = 0; i < comb.length; i++) {
        if(((p1.indexOf(comb[i][0]) != -1) && (p1.indexOf(comb[i][1]) != -1) && (p1.indexOf(comb[i][2]) != -1)) || ((p2.indexOf(comb[i][0]) != -1) && (p2.indexOf(comb[i][1]) != -1) && (p2.indexOf(comb[i][2]) != -1))){
          $('.'+comb[i][0]+' p,.'+comb[i][1]+' p,.'+comb[i][2]+' p').css({
            "color": "rgba(209, 171, 38, 1)",
            "animation-duration":"400ms",
            "animation-name":"blink",
            "animation-iteration-count":"infinite",
            "animation-direction":"alternate"
          });

          $('.'+typeOfGame).css("color", "grey");
          $("#player1,#player2,#menu").hide();

          $('.'+typeOfGame+',.gameBar').delay(1500).fadeOut(1000, function(){
            $('.'+typeOfGame).hide();
            $('.gameBar').hide();
          })
          if (!play1) {
            score1+=1;
            lastWinner.push('player1');
          }else{
            score2+=1;
            lastWinner.push('player2');
          }

          $('#score1').html(score1);
          $('#score2').html(score2);

          $('.score').delay(2500).fadeIn(1000, function(){
            $('.score').show();
          })
          game.style.pointerEvents = 'none';
          gameOne.style.pointerEvents = 'none';
          return false;
          }
        }
        console.log(nrPlays);
        if (nrPlays ==9) {
          $('.'+typeOfGame).css("color", "grey");
          $("#player1,#player2,#menu").hide();

          $('.'+typeOfGame+',.gameBar').delay(1500).fadeOut(1000, function(){
            $('.'+typeOfGame).hide();
            $('.gameBar').hide();
          })
          if (!play1) {
            lastWinner.push('player1');
          }else{
            lastWinner.push('player2');
          }
          $('#score1').html(score1);
          $('#score2').html(score2);

          $('.score').delay(2500).fadeIn(1000, function(){
            $('.score').show();
          })
          return false;
        }

          if (typeOfGame == "gameTwoPlayer") {
            if (play2) {
              player2();
            }else if(play1){
              player1();
            }
          }else if (typeOfGame == "gameOnePlayer") {
            if (play2) {
              computer();
            }else if(play1){
              player1();
            }
          }
        })
  }

  function player1(){
    console.log('player1');
    container=[];
    gameOne.style.pointerEvents = 'auto';

    setTimeout(function () {
      $(".col11,.col12,.col13,.col21,.col22,.col23,.col31,.col32,.col33").on('click',function(e){
        if($('.'+$(this).attr('class')).html() == '<p>O</p>' || $('.'+$(this).attr('class')).html() == '<p>X</p>'){return};
        $("."+$(this).attr('class')).html('<p>X</p>');
        container.push($(this).attr('class'),'X')
        play1 = false;
        play2 = true;
        $(".col11,.col12,.col13,.col21,.col22,.col23,.col31,.col32,.col33").off('click');
      })
    }, 500);
    $('#player2').hide();
    $("#player1").fadeIn(500, function(){
      $('#player1').show();
    })
  }

  function computer(){
    container=[];
    $('#scoreP2').html("Computer");
    gameOne.style.pointerEvents = 'none';

    var nrPlays = game.getElementsByTagName('p').length;

    for (var i = 0; i < comb.length; i++) {
      if(((p1[p1.length-1].indexOf(comb[i][0]) != -1) || (p1[p1.length-1].indexOf(comb[i][1]) != -1) || (p1[p1.length-1].indexOf(comb[i][2]) != -1))){
        computerPlaysP1.push(comb[i]);
      }
    }

    var computerDefend = computerPlaysP1.filter(function(elem,index,self){
      return index != self.indexOf(elem);
    })

    var oneToWin = containerCPU.filter(function(elem,index,self){
      return index != self.indexOf(elem);
    })

    var firstPlay = comb.filter(function(el){
      return computerPlaysP1.indexOf(el) == -1;
    })

    var allP1Cpu = p1.concat(p2);

    if(p2.length==0) {
      if (p1[0] == "col11" || p1[0] == "col13" || p1[0]=="col31" || p1[0]=="col33") {
        play="col22";
      }else {
        play = firstPlay[Math.floor(Math.random()*(firstPlay.length))][2];
      }
      p2.push(play);
    }else if (oneToWin.length && (computerPlaysP1.indexOf(oneToWin[oneToWin.length-1]) == -1)) {
      oneToWin[oneToWin.length-1].forEach(function(i){
        if(p2.indexOf(i) == -1){
          play= i;
        };
      })
      p2.push(play);
    }else if (computerDefend.length && (containerCPU.indexOf(computerDefend[computerDefend.length-1])==-1)) {
      computerDefend[computerDefend.length-1].forEach(function(i){
        if(p1.indexOf(i) == -1){
          play= i;
        }
      })
      p2.push(play);
    }else{
      if (firstPlay.length) {
        firstPlay[firstPlay.length-1].forEach(function(i){
          if (p2.indexOf(i)==-1) {
            play=i;
          }
        })
      }else {
        var concatComb = [].concat.apply([], comb);
        concatComb.forEach(function(i){
          if (allP1Cpu.indexOf(i)==-1) {
            play=i;
          }
        });
      }
      p2.push(play);
    }

    setTimeout(function(){
      $("."+play).html('<p>O</p>');
      play1=true;
      play2=false;

      if (nrPlays ==9) {
        $('.'+typeOfGame).css("color", "grey");
        $("#player1,#player2,#menu").hide();

        $('.'+typeOfGame+',.gameBar').delay(1500).fadeOut(1000, function(){
          $('.'+typeOfGame).hide();
          $('.gameBar').hide();
        })

        lastWinner.push('player2');
        gameOne.style.pointerEvents = 'none';
        
        $('#score1').html(score1);
        $('#score2').html(score2);

        $('.score').delay(2500).fadeIn(1000, function(){
          $('.score').show();
        })
        return false;
      }

      for (var i = 0; i < comb.length; i++) {
        if ((p2.indexOf(comb[i][0]) != -1) && (p2.indexOf(comb[i][1]) != -1) && (p2.indexOf(comb[i][2]) != -1)) {
          $('.'+comb[i][0]+' p,.'+comb[i][1]+' p,.'+comb[i][2]+' p').css({
            "color": "rgba(209, 171, 38, 1)",
            "animation-duration":"400ms",
            "animation-name":"blink",
            "animation-iteration-count":"infinite",
            "animation-direction":"alternate"
          });

          $('.gameOnePlayer').css("color", "grey");
          $("#player1,#player2,#menu").hide();


          $('.gameOnePlayer,.gameBar').delay(1500).fadeOut(1000, function(){
            $('.gameOnePlayer').hide();
            $('.gameBar').hide();
          })
          if (!play1) {
            score1+=1;
            lastWinner.push('player2');
          }else{
            score2+=1;
            lastWinner.push('player2');
          }

          $('#score1').html(score1);
          $('#score2').html(score2);

          $('.score').delay(2500).fadeIn(1000, function(){
            $('.score').show();
          })
          gameOne.style.pointerEvents = 'none';
          return false;
        }else if (((p2[p2.length-1].indexOf(comb[i][0]) != -1) || (p2[p2.length-1].indexOf(comb[i][1]) != -1) || (p2[p2.length-1].indexOf(comb[i][2]) != -1))){
          containerCPU.push(comb[i]);
        }
      }

      setTimeout(function(){
        player1();
      },300);

    },900);

    $('#player2').html('Computer');
    $('#player1').hide();
    $("#player2").fadeIn(500, function(){
      $('#player2').show();
    })

  }

  function player2(){
    container=[];
    $('#scoreP2').html('Player 2');
    setTimeout(function(){
      $(".col11,.col12,.col13,.col21,.col22,.col23,.col31,.col32,.col33,#menu").on('click',function(e){
        if($('.'+$(this).attr('class')).html() == '<p>O</p>' || $('.'+$(this).attr('class')).html() == '<p>X</p>'){return};
        container.push($(this).attr('class'),"O")
        play1=true;
        play2=false;
        $("."+$(this).attr('class')).html('<p>O</p>');
        $(".col11,.col12,.col13,.col21,.col22,.col23,.col31,.col32,.col33").off('click');
      });
    },500);
    $('#player2').html('Player 2');
    $('#player1').hide();
    $("#player2").fadeIn(500, function(){
      $('#player2').show();
    })
  }

  $("#menu").on('click',function(e){
    lastWinner=[];
    score1=0;
    score2=0;
    p1=[];
    p2=[];
    computerPlaysP1=[];
    containerCPU = [];
    reset = true;

    $('.'+typeOfGame+',.gameBar').fadeOut(1000, function(){
      $(".col11 p,.col12 p,.col13 p,.col21 p,.col22 p,.col23 p,.col31 p,.col32 p,.col33 p").remove();
      $('.'+typeOfGame+',.gameBar').hide();
    })

    $('.menu').delay(1000).fadeIn(1000, function(){
      $('.menu').show();
    })

    $('.gameTwoPlayer,.gameOnePlayer').css("color", "white");
    $("#score1").html(0);
    $("#score2").html(0);

    e.stopPropagation();
  });

  $("#new").on('click',function(){
    p1=[];
    p2=[];
    computerPlaysP1=[];
    containerCPU = [];
    $('.score').fadeOut(1000, function(){
      $('.score').hide();
    })
    $(".col11 p,.col12 p,.col13 p,.col21 p,.col22 p,.col23 p,.col31 p,.col32 p,.col33 p").remove();
    $('.gameOnePlayer').css("color", "white");
    $('.gameTwoPlayer').css("color", "white");
    $('#menu').show();
    $('.'+typeOfGame+',.gameBar').delay(1000).fadeIn(1000, function(){
      $('.'+typeOfGame).show();
      $('.gameBar').show();

      if (lastWinner[lastWinner.length-1] == "player1" && typeOfGame == "gameTwoPlayer") {
        player2();
        game.style.pointerEvents = 'auto';
      }else if((lastWinner[lastWinner.length-1] == "player2")){
        player1();
        game.style.pointerEvents = 'auto';
        gameOne.style.pointerEvents = 'auto';
      }else if ((lastWinner[lastWinner.length-1] == "player1" && typeOfGame == "gameOnePlayer")) {
        player1();
        game.style.pointerEvents = 'auto';
        gameOne.style.pointerEvents = 'auto';
      }
    })
  });

}
