var duration;
var player;
var full = 0;
var track = 0;
var audio;

// ------------------------
// Hover effects
// ------------------------
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

// ------------------------
// Site title click resets
// ------------------------
$(".sitetitle").on("click", function () {
    $("section").hide();
    $(".player").removeClass("fullscreen");
    $("#track").css("width", "0%");
    $("#pause").hide();
    $("#play").show();
    $("table tr").show().addClass("a");
    $(".player").hide();
});

// ------------------------
// Seek bar
// ------------------------
$("#seek").on("click", function (e) {
    var x = e.pageX - $("#seek").offset().left;
    var percent = x / $("#seek").width();

    player.getDuration().then(function (duration) {
        player.setCurrentTime(duration * percent);
    });
}).mousemove(function (e) {
    $("#seek #hover").css({ "width": e.pageX - $("#seek").offset().left }).show();
}).mouseleave(function () {
    $("#seek #hover").hide();
});

// ------------------------
// Vimeo controls
// ------------------------
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

$("#fullscreen").on("click", function () {
    toggleFullScreen();
    $(".player").addClass("fullscreen");
});

// ------------------------
// Video click
// ------------------------
$("tr:nth-child(2) li").on("click", function () {
    $("#video").remove();
    $(".player span").append("<div id='video'></div>");

    $("section").hide();
    $(".player").show();
    $("table tr").removeClass("a");
    $("table tr").not("tr.b").hide();

    var code = $(this).attr("data-code");
    var options = { id: code, background: 1, loop: 0, autoplay: 0 };
    player = new Vimeo.Player("video", options);
    player.setVolume(0.5);
    player.pause();

    player.on("progress", function (data) {
        $("#track").css("width", data.percent * 100 + "%");
    });
});

// Return button
$(document).on("click", ".return", function () {
    $("table").removeClass("a");
});

// ------------------------
// Sections click
// ------------------------
$("td.soundtrack, td.about, td.subscribe").on("click", function () {
    $("section").hide();
    $(".player").hide();
    $(".levelA").removeClass("hover active");
    $("td:nth-child(2)").removeClass("a");
    $("table tr").removeClass("a");

    var section = "section." + $(this).attr("class");
    $(section).show();

    // For Soundtrack, update marquee
    if ($(this).hasClass("soundtrack")) {
        $(".album .title").html("<marquee>" + $(".audio-sources li").eq(0).attr("data-title") + "</marquee>");
    }
});

// ------------------------
// Email input focus
// ------------------------
$("#mce-EMAIL").on("touchstart mousedown", function () {
    $(this).attr("value", "").css("color", "white");
});

// ------------------------
// HTML5 audio controls
// ------------------------
$(".album .playpause").on("click", function () {
    if ($(this).hasClass("playing")) {
        audio.pause();
        $(".playpause").text("Play");
        $(this).removeClass("playing");
    } else {
        audio = new Audio($(".audio-sources li").eq(track).html());
        audio.play();
        $(".playpause").text("Pause");
        $(this).addClass("playing");
    }
});

$(".prevTrack").on("click", function () {
    if (track > 0) {
        track--;
        updateTrack();
    }
});

$(".nextTrack").on("click", function () {
    if (track < $(".audio-sources li").length - 1) {
        track++;
        updateTrack();
    }
});

function updateTrack() {
    if ($(".album .playpause").hasClass("playing")) {
        audio.pause();
        audio = new Audio($(".audio-sources li").eq(track).html());
        audio.play();
    }
    $(".album marquee").remove();
    $(".album .title").html("<marquee>" + $(".audio-sources li").eq(track).attr("data-title") + "</marquee>");
}

// ------------------------
// Fullscreen helper
// ------------------------
function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        requestFullscreen(document.documentElement);
    } else {
        exitFullscreen();
    }
}

function requestFullscreen(el) {
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
}

function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}
