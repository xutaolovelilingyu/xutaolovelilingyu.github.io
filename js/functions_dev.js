(function($) {
    $.fn.typewriter = function() {
        this.each(function() {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
                var current = str.substr(progress, 1);
                if (current == '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

function timeElapse(date){
    var current = Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var totalDays = Math.floor(seconds / (3600 * 24));
    var years = Math.floor(totalDays / 365);
    var remainingDays = totalDays % 365;
    var months = Math.floor(remainingDays / 30);
    var days = remainingDays % 30;
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    var result = "❤ 在一起 " + years + " 年 " + months + " 个月 " + days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒";
    $("#elapseClock").html(result);
}

function showMessages() {
    $('#messages').fadeIn(5000, function() {
        showLoveU();
    });
}

function showLoveU() {
    $('#loveu').fadeIn(3000);
}
