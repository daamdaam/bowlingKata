var game = function() {
    /**
     * there are 20 turns in a game, two turns per frame
     */
    this.turn = 0;
    this._bowl = new Array(20);
    for ( var i = 0; i < 20; i++ ) 
    {
        this._bowl[i] = 0;
    }

}

/**
 * Automatically generate a score card
 * todo : fix for last round
 */
game.prototype.generateScoreCard = function() {
        this.this._score = 0; 
        var max = 10, min = 1;
        for (var i = 0; i < 10; i++ ) {
            var firstBowl = 10//Math.floor(Math.random() * (max - min + 1) + min);
            if (firstBowl == 10) {
                this.this._score += 20;
                console.log(this.this._score)
            }
            var secondBowl = 0//Math.floor(Math.random() * ((max-firstBowl) - min + 1) + min);
            this.bowl(firstBowl);
            this.bowl(secondBowl); 
        }

}

/**
 * Calculate the score
 */
game.prototype.score = function() {
    this._score = 0; 
    for ( var j = 0; j < 10; j++ )
    {   
        // if up to the 9th round
        if (j <= 8) { 
            this._score += this._bowl[j * 2] + this._bowl[j * 2 + 1];
            if (this.strike(j)) 
            { 
                if (this.strike(j+1)){
                    this._score += 10 + this._bowl[ (j + 2) * 2 ];
                }
                else {
                    this._score += this._bowl[(j + 1) * 2] + this._bowl[(j + 1) * 2 + 1];
                }
            } 
            else if (this.spare(j)) {
                this._score += this._bowl[ j * 2 + 1];
            }
        }
        // if 10th round 
        else {
                this._score += this._bowl[ j * 2] + this._bowl[ (j * 2) + 1];
                if (this.strike(j)) 
                { 
                    this._score += 10 + this._bowl[ j * 2 + 1] + this._bowl[ (j * 2) + 2];
                } 
                else if (this.spare(j)) {
                    this._score += this._bowl[ j * 2 + 1];
                }
        } 
    }
    return this._score;
}

/**
 * Bowl the balls
 */
game.prototype.bowl = function(pins) { 
    this._bowl[ this.turn ] = pins; 
    this.turn += 1;
    if (pins == 10)
    {
        this.turn += 1;
    }
}

/**
 * If a spare
 */
game.prototype.spare = function(j) {
    return this._bowl[ j * 2 ] + this._bowl[ j * 2 + 1 ] == 10;
}

/**
 * If a strike
 */
game.prototype.strike = function(j) 
{
    return this._bowl[ j * 2 ] == 10;
}

exports.game = game;