var input = [{
    id: 1,
    start: 60,
    end: 150,
    color: 'red'
}, {
    id: 2,
    start: 540,
    end: 570,
    color: 'blue'
}, {
    id: 3,
    start: 555,
    end: 600,
    color: 'yellow'
}, {
    id: 4,
    start: 585,
    end: 660,
    color: 'black'
}, ];

(function($) {

    //Function to assign dimensions to meetings, PART1 of assignment
    var assignDimensions = function(list) {
        var len = list.length;
        var tempnonfixedlist = [];
        var tempfixedlist = [];
        var startIndex = 1;
        var isCollaiding = function(a, b) {
            if ((b.top >= a.top && b.top <= (a.top + a.height) ||
                    ((b.top + b.height) >= a.top && (b.top + b.height) <= (a.top + a.height)))) {
                return true;
            }
            return false;
        };

        var fixmeeting = function(avail_end) {
            var width = avail_end / tempnonfixedlist.length;
            var left = 0;
            for (var k = 0; k < tempnonfixedlist.length; k++) {
                tempnonfixedlist[k].width = width;
                tempnonfixedlist[k].left = left;
                tempnonfixedlist[k].is_left_width = true;
                left += width;
            }
        };

        for (var i = 0; i < len;) {
            tempnonfixedlist.push(list[i]);
            for (var j = 0; j < len; j++) {
                if (i != j && isCollaiding(list[i], list[j])) {
                    if (list[j].is_left_width) {
                        tempfixedlist.push(list[j]);
                    } else {
                        tempnonfixedlist.push(list[j]);
                    }
                }
            }
            if (tempfixedlist.length > 0) {
                var avail_end = 0;
                for (var l = 0; l < tempfixedlist.length; l++) {
                    if (tempfixedlist[l].left > avail_end) {
                        avail_end = tempfixedlist[l].left;
                    }
                }
                fixmeeting(avail_end);
            } else {
                fixmeeting(600);
            }
            var tempindex = list.indexOf(tempnonfixedlist[tempnonfixedlist.length - 1]);

            //to achive O(NLogN)
            i = tempindex + 1;

            tempfixedlist = [];
            tempnonfixedlist = [];
        }
    };

    //Function used to assign top,height for the meeting item
    var assign_top_height = function(item) {
        item.top = item.start * 2;
        item.height = 2 * (item.end - item.start);
        item.is_top_height = true;
    };

    //to ensure the order of meeting accroding to start time
    input.sort(function(x, y) {
        if (!x.is_top_height) {
            assign_top_height(x);
        }
        if (!y.is_top_height) {
            assign_top_height(y);
        }

        return x.start - y.start;
    });

    assignDimensions(input);

    $(document).ready(function() {

        for (var i in input) {
            var div = $('<div class="meeting" ><span>Meeting ' + input[i].id + '</span></div>').css({
                left: input[i].left,
                height: input[i].height,
                top: input[i].top,
                width: input[i].width,
                backgroundColor: input[i].color
            });
            $('#container').append(div);
        }
    });


})(jQuery);
