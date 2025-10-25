var duration;
var player;
var full = 0;
var track = 0;
var audio;

// Hover effects
$("td:nth-child(1)").on("mouseenter", function () {
  $("td:nth-child(2)").removeClass("a");
  $(this).siblings().addClass("a");
});

$(document).on("mouseenter", ".levelA", function () {
  $(".levelA").removeClass("hover");
  $("tr").siblings().find(".levelA").removeClass("active");
  $(this).addClass("hover");
});

$("table").on("mouseleave", function () {
  $(".levelA").removeClass("hover").removeClass("active");
  $("td:nth-child(2)").removeClass("a");
});

$(".levelB")
  .on("mouseenter", function () {
    $(".levelB").removeClass("hover");
    $(this).addClass("hover");
    $(".levelA.hover").addClass("active");
  })
  .on("mouseleave", function () {
    $(".levelB").removeClass("hover");
  });

// Clicking site title resets UI
$(".sitetitle").on("click", function () {
  $("section").hide();
  $(".player").removeClass("fullscreen");
  $("#track").css("width", "0%");
  $("#pause").hide();
  $("#play").show();
  $("table tr").show().addClass("a");
  $(".player").hide();
});

// Seek bar logic
$("#seek")
  .on("click", function (e) {
    var x = e.pageX - $("#seek").offset().left;
    var percent = x / $("#seek").width();

    player.getDuration().then(function (duration) {
      var seek = duration * percent;
      player.setCurrentTime(seek);
    });
  })
  .mousemove(function (e) {
    $("#seek #hover")
      .css({
        width: e.pageX - $("#seek").offset().left,
      })
      .show();
  })
  .mouseleave(function () {
    $("#seek #hover").hide();
  });

// Play/pause Vimeo
$("#pause").on("click", function () {
  player.pause();
  $("#pause").hide();
  $("#play").show();
});

$("#play").on("click", function () {
  player.play();
  $("#pause").show();
  $("#play").hide();
  if (audio) audio.pause();
});

// Fullscreen
$("#fullscreen").on("click", function () {
  toggleFullScreen();
  $(".player").addClass("fullscreen");
});

// Click track loads player
$("tr:nth-child(2) li").on("click", function () {
  $("#video").remove();
  $(".player span").append("<div id='video'></div>");

  $("section").hide();
  $(".player").show();
  $("table tr").addClass("a");

  var code = $(this).attr("data-code");
  var options = {
