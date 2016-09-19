
var x0, y0, x1, y1;
var count = 0;

function generateTable() {
    var body = document.getElementById('myBody');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    

    for (var i = 0; i < 30; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 30; j++) {
            var td = document.createElement('td');
            tr.appendChild(td); 
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    body.appendChild(table);
    table.setAttribute("border", "1");
    table.setAttribute("width", screen.width - 100);
    table.setAttribute("height", screen.height - 200);

    //jQuery click function
    $(function () {
        $("td").on("click", function (event) {
            count++;
            if (count == 1) {
                 y0 = $(this).parent().children().index($(this));
                 x0 = $(this).parent().parent().children().index($(this).parent());
                console.log("(" + x0 + "," + y0 + ")");
                drawing(x0,y0);
            }
            if(count == 2)
            {
                y1 = $(this).parent().children().index($(this));
                x1 = $(this).parent().parent().children().index($(this).parent());
                console.log("(" + x1 + "," + y1 + ")");
                drawing(x1,y1);
            }
        })
    });
}

//logic for bresenham's line drawing algorithm
function bresenDraw() {
    //var isSlopeSteep = Boolean(Math.abs(y1 - y0) > Math.abs(x1 - x0));

    //if (isSlopeSteep) {
    //    swap_vals(x1, y1);
    //    swap_vals(x0, y0);
    //}
    
    //if(Math.abs(x0) > Math.abs(x1))
    //{
    //    swap_vals(x0, x1);
    //    swap_vals(y0, y1);
    //}
    //var dx = Math.abs(x1) - Math.abs(x0);
    //var dy = Math.abs(y1 - y0);
    //var error = dx / 2;
    //var ystep = (y0 < y1) ? 1 : -1;
    //var y_ = y0;
    //var maxX = x1;
    //for (var i = x0; i < maxX; i++) {
    //    if (isSlopeSteep) {
    //        //y,i
    //        drawing(parseInt(Math.round(y_)), i);
    //    }
    //    else {
    //        //i,y
    //        drawing(i, parseInt(Math.round(y_)));
    //    }
    //    error -= dy;
    //    if(error < 0)
    //    {
    //        y_ += ystep;
    //        error += dx;
    //    }
    //}

    //Bresenham's algo simple
    var dx = x1 - x0;
    var sx = (dx < 0) ? -1 : 1;
    var dy = y1 - y0;
    var sy = (dy < 0) ? -1 : 1;
    if (Math.abs(dy) < Math.abs(dx)) {
        var m = dy / dx;
        var b = y0 - m * x0;

        while (x0 != x1) {
            drawing(x0, parseInt(Math.round(m * x0 + b)));
            x0 += sx;
        }
    }
    else {
        var m = dx / dy;
        var b = x0 - m * y0;

        while (y0 != y1) {
            drawing(parseInt(Math.round(m * y0 + b)), y0);
            y0 += sy;
        }
    }
    drawing(x1, y1);
}

function swap_vals(a,b) {
    var temp = a;
    a = b;
    b = temp;
}

//draw function for reuse
function drawing(x,y) {
    var Col = $('table').find('tr').eq(x);
    var Row = Col.find('td').eq(y);
    Row.addClass("red");
    console.log("drawing: "+"(" + x + "," + y + ")");
}

function reset() {
    var element = $('table').find('td');
    element.removeClass("red");
    count = 0;
}