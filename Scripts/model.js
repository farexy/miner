FIELD_WIDTH = 13;
FIELD_HEIGHT = 13;
NUMBER_OF_BOMBS = 29;

function setProperties(widht, height, bombs){

    window.FIELD_HEIGHT = height;
    window.FIELD_WIDTH = widht;
    window.NUMBER_OF_BOMBS = bombs;
}

function Cell(isBomb) {

    this.isBomb = isBomb;
    this.countBombs = 0;
    this.isMarked = false;
}

var field = [];

window.onload = setField;

function setField() {
    for (var i = 0; i < FIELD_HEIGHT; i++) {
        field[i] = [];
        for (var j = 0; j < FIELD_WIDTH; j++)
            field[i][j] = new Cell(false);
    }

    for (var i = 0; i < NUMBER_OF_BOMBS; i++) {
        rand1 = Math.floor(Math.random() * FIELD_HEIGHT);
        rand2 = Math.floor(Math.random() * FIELD_WIDTH);
        field[rand1][rand2] = new Cell(true);
    }

    for (var i = 0; i < FIELD_HEIGHT; i++) {
        for (var j = 0; j < FIELD_WIDTH; j++)
            if (!field[i][j].isBomb) {
                for (var k = -1; k <= 1; k++)
                    for (var t = -1; t <= 1; t++)

                            if (i + t >= 0 && j + k >= 0 && i + t < FIELD_HEIGHT && j + k < FIELD_WIDTH && field[i + t][j + k].isBomb)
                                field[i][j].countBombs++;

            }
    }

    showField(); 
}