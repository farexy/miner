
function cellClick(event) {
    if (event.which === 1) {
        var id = event.target.id;
        var cell = field[parseId(id).i][parseId(id).j];
        if (cell.isBomb) {
            openAllField();
            alert('You loose!');
            deleteField();
            setField();
        }
        else {
            unmarkBomb(id);
            openCell(id, cell.countBombs);
        }
    }
    if (event.which === 3) {
        event.target.innerHTML = null;
        markBomb(event.target.id);
    }
    if (testField()){
        alert('You win!');
        deleteField();
        setField();
    }
    return false;
}

function changeProperties(width, height, bombs, event){
    deleteField();
    setProperties(width, height, bombs);
    highlightSizeButton(event.target);
    showBombNumber();
    setField();
}

function parseId(id) {
    this.i = this.j = "";
    var count = 4;
    while (id[count] !== ",") {
        this.i += id[count];
        count++;
    }
    count++;
    while (count < id.length) {
        this.j += id[count];
        count++;
    }
    this.i = parseInt(this.i);
    this.j = parseInt(this.j);
    return this;
}

function  markBomb(id) {
    var i = parseId(id).i;
    var j = parseId(id).j;
    field[i][j].isMarked = true;
    drawFlag(id);
}

function unmarkBomb(id){
    var i = parseId(id).i;
    var j = parseId(id).j;
    field[i][j].isMarked = false;
}

function testField(){
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        for (var j = 0; j < FIELD_WIDTH; j++) {
            var cell = field[i][j];
            if (cell.isBomb  && !cell.isMarked) {
                return false;
            }
            if(!cell.isBomb && cell.isMarked){
                return false;
            }
        }
    }
    return true;
}