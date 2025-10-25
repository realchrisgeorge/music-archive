

  
  $("td:nth-child(1)").on("mouseenter",function(){
    $("td:nth-child(2)").removeClass("a")
    $(this).siblings().addClass("a")
  });


  $(document).on("mouseenter",".levelA",function(){
    $(".levelA").removeClass("hover")
    $("tr").siblings().find(".levelA").removeClass("active");
    $(this).addClass("hover");
  });

  $("table").on("mouseleave",function(){
    $(".levelA").removeClass("hover").removeClass("active");
    $("td:nth-child(2)").removeClass("a")
  });

  $(".levelB").on("mouseenter",function(){
    $(".levelB").removeClass("hover");
    $(this).addClass("hover")
    $(".levelA.hover").addClass("active")
  }).on("mouseleave",function(){
    $(".levelB").removeClass("hover");
  });

$(".sitetitle").on("click",function(){

    $("section").hide();
    $(".player").removeClass("fullscreen");
    $("#track").css("width",0+"%");
    $("#pause").hide();
    $("#play").show();
    
    $("tr").addClass("a");
    $("table tr").not("tr.b").show()
  	$("table tr").show().addClass("a")
  	$("tr").addClass("a");
  	$(".player").hide();

});
    

var duration;
var player;

  $("#seek").on("click",function(e){
  
   	var x = e.pageX - $('#seek').offset().left;
    var percent = x/$('#seek').width();

    player.getDuration().then(function(duration) {
    	
    	var seek = duration*percent;
    	player.setCurrentTime(seek);

	});
  
  }).mousemove(function(e){
  
  	$("#seek #hover").css({
		"width":e.pageX - $('#seek').offset().left
	});

 	$("#seek #hover").show();
	  
  }).mouseleave(function(){
	   $("#seek #hover").hide();
  });


  $("#pause").on("click",function(e){
    // $("#video").vimeo("pause"); 
    player.pause()
    $("#pause").hide();
    $("#play").show();
    // $("#video").vimeo("setVolume", 0.5);
  });

  $("#play").on("click",function(e){
    player.play() 
    $("#pause").show();
    $("#play").hide();
    // $("#video").vimeo("setVolume", 0.5);
    if(audio){
	    audio.pause();
    }
  });

  $("#fullscreen").on("click",function(e){
    toggleFullScreen();
    $(".player").addClass("fullscreen")
  });

  var full = 0;




$("tr:nth-child(2) li").on("click",function(){

	$("#video").remove();
	$(".player span").append("<div id='video'></div>")

  	$("section").hide();
  	$(".player").show();
  	$("table tr").removeClass("a");
  	$("table tr").not("tr.b").hide()





if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

	var code = $(this).attr("data-code");

    var options = {
        id: code,
        background: 0,
        loop: 0,
        autoplay: 0
    };

    player = new Vimeo.Player('video', options);
    player.setVolume(0.5);


	player.on("progress", function(data){
		$("#track").css("width",data.percent*100+"%");
	});
  


}else{

	var code = $(this).attr("data-code");

    var options = {
        id: code,
        background: 1,
        loop: 0,
        autoplay: 0
    };

    player = new Vimeo.Player('video', options);
    player.setVolume(0.5);
    player.pause();


	player.on("progress", function(data){
	
		$("#track").css("width",data.percent*100+"%");
	});
  


    $("table tr").removeClass("a");
  
}
    
  // $("#video").vimeo("setVolume", 0.5);

  $(document).on("click",".return",function(){
    // player.play()
    $("table").removeClass("a");
  })

});


  $("td.soundtrack").bind('touchstart mousedown',function(){
    $("table tr").removeClass("a");
    $(".player").hide();
    $(".levelA").removeClass("hover").removeClass("active");
    $("td:nth-child(2)").removeClass("a");
    $("section.soundtrack").show();
    $("table tr").not("tr.b").hide()
    $(".album .title").html("<marquee>" + $(".audio-sources li").eq(0).attr("data-title") + "</marquee>")
  });

 $("td.about").bind('touchstart mousedown',function(){
    $("table tr").removeClass("a");
    $(".player").hide();
    $(".levelA").removeClass("hover").removeClass("active");
    $("td:nth-child(2)").removeClass("a");
    $("section.about").show();
    $("table tr").not("tr.b").hide()
  });

  $("td.subscribe").bind('touchstart mousedown',function(){
    $("table tr").removeClass("a");
    $(".player").hide();
    $(".levelA").removeClass("hover").removeClass("active");
    $("td:nth-child(2)").removeClass("a");
    $("section.subscribe").show();
    $("table tr").not("tr.b").hide()
  });

  $("#mce-EMAIL").bind('touchstart mousedown',function(){
    $(this).attr("value","").css("color","white")
  })



$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)
{

  if(full==0){
    full=1
  }else if (full == 1){
    $(".player").removeClass("fullscreen")
    full = 0
  }

});

 var track = 0;
    var audio;

    $(".album .playpause").on("click",function(){

      if($(this).hasClass("playing")){
         audio.pause();
         $(".playpause").text("Play")
         $(this).removeClass("playing")

      }else{
      
        audio = new Audio($(".audio-sources li").eq(track ).html());
        audio.play();
        $(".playpause").text("Pause")
        $(this).addClass("playing")
      }

    });

    $(".prevTrack").on("click",function(){
    
    if (track > 0){

      track--

      if( $(".album .playpause").hasClass("playing") ){
        audio.pause();
        audio = new Audio($(".audio-sources li").eq(track).html());
        audio.play();
        $(".album marquee").remove()
        $(".album .title").html("<marquee>" + $(".audio-sources li").eq(track).attr("data-title") + "</marquee>")
        
      }else{

        $(".album marquee").remove()
        $(".album .title").html("<marquee>" + $(".audio-sources li").eq(track).attr("data-title") + "</marquee>")
        
      }
     }

    });

    $(".nextTrack").on("click",function(){

	  if (track < $(".audio-sources li").length - 1){
      track++

      if( $(".album .playpause").hasClass("playing") ){
        audio.pause();
        audio = new Audio($(".audio-sources li").eq(track).html());
        audio.play();
        $(".album marquee").remove()
        $(".album .title").html("<marquee>" + $(".audio-sources li").eq(track).attr("data-title") + "</marquee>")
        
      }else{
        $(".album marquee").remove()
        $(".album .title").html("<marquee>" + $(".audio-sources li").eq(track).attr("data-title") + "</marquee>")
        
      }
      
      }
      

      

    });


if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {



if(document.referrer.indexOf("instagram") > -1) {


 $(".levelA, .levelB ").css({
	"position":"relative",
	"float":"left",
	"clear":"both"
});

$("tr td:nth-child(2)").css({
	"max-height":"100%"
});

$(".center").css({
	"width":"90%",
	"margin":"0 auto",
	"padding-top":"100px"
});


$(".album").css({
	"width":"100%",
	"margin":"0 auto"
});

$(".album .title").appendTo(".album .controls").css("color","white");

$(".album .controls .title, .album .controls marquee,marquee,div.title").css({
	"width":"100%",
	"clear":"both",
	"float":"left",
})

$(".album .controls div:last-child").css("float","right")
 $("section p").css("font-size","26px")
 $("input, #mc-embedded-subscribe,#mc_embed_signup").css({
	 "position":"relative",
	 "float":"left",
	 "width":"100%"
 })  


function toggleFullScreen() {


  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();

    }

  }
}


