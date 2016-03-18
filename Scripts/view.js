
function showField() {
    var container = document.getElementById('field');
    var left = 20;
    var top = 60;
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        for (var j = 0; j < FIELD_WIDTH; j++) {    
            container.appendChild(addCell(i,j,left,top));
            left += 20;
        }
        top += 20;
        left = 20;
    }
}

function addCell(i, j, left, top) {
    var newCell = document.createElement('div');
    newCell.setAttribute('id', 'cell' + i + ',' + j);
    newCell.setAttribute('style', 'top: ' + top + 'px; left: ' + left + 'px;');
    newCell.onclick = cellClick;
    newCell.oncontextmenu = cellClick;
    return newCell;
}

function openCell(id, value) {
    var cell = document.getElementById(id);
    cell.style.backgroundImage = "";
    cell.style.boxShadow = "inset 0px 0px 0px rgba(0,0,0)";
    cell.style.backgroundColor = 'white';
    if (value != 0) {
        switch (value) {
            case 1:
                cell.style.color = 'blue';
                break;
            case 2:
                cell.style.color = 'green';
                break;
            case 3:
                cell.style.color = 'red';
                break;
            case 4:
                cell.style.color = 'purple';
                break;
            case 5:
                cell.style.color = 'brown';
                break;
            case 6:
                cell.style.color = 'orange';
                break;
            default:
        }
        cell.innerHTML = value;
    }
    else {
        openEmptyArea(parseId(id).i, parseId(id).j);
    }
}

function openEmptyArea(i,j) {
    var id = 'cell' + i + ',' + j;
    document.getElementById(id).style.backgroundColor = 'white';
    document.getElementById(id).style.boxShadow= null;
    for (var k = -1; k <= 1; k++)
        for (var t = -1; t <= 1; t++)
            try {
                id = 'cell' + (i + t) + ',' + (j + k);
                var countBombs = field[i + t][j + k].countBombs;
                if (countBombs === 0 && (t != 0 || k != 0) && document.getElementById(id).style.backgroundColor !== 'white')
                    openEmptyArea(i + t, j + k);
                if (countBombs > 0)
                    openCell(id, countBombs);
            } catch (e) {
            }

}

function drawFlag(id){
    var cell = document.getElementById(id);
    if(cell.style.backgroundColor !== 'cornflowerblue')
        cell.style.backgroundColor = 'cornflowerblue';
    cell.style.backgroundImage = "url('Images/flag.png')";
}

function openAllField() {
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        for (var j = 0; j < FIELD_WIDTH; j++) {
            var cellDiv = document.getElementById('cell' + i + ',' + j);
            var cell = field[i][j];
            if (cell.isBomb) {
                cellDiv.style.backgroundImage = "url('Images/bomb.png')";
            }
            else if (cell.isMarked) {
                cellDiv.style.backgroundImage = "url('Images/nobomb.png')";
                cell.innerHTML = null;
            }
        }
    }
}

function deleteField(){
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        for (var j = 0; j < FIELD_WIDTH; j++) {
            var cellDiv = document.getElementById('cell' + i + ',' + j);
            cellDiv.remove();
        }
    }
}

function highlightSizeButton(el) {
    document.getElementById('middle-size').style.backgroundColor = 'white';
    document.getElementById('middle-size').style.color = 'black';
    document.getElementById('large-size').style.backgroundColor = 'white';
    document.getElementById('large-size').style.color = 'black';
    document.getElementById('small-size').style.backgroundColor = 'white';
    document.getElementById('small-size').style.color = 'black';
    el.style.backgroundColor = 'indigo';
    el.style.color = 'white';
}

function showBombNumber() {
    document.getElementById("bomb_number").innerHTML = NUMBER_OF_BOMBS;
}