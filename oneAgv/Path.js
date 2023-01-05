class Path {
    constructor(startx, starty, endx, endy) {
        this.startx = startx;
        this.starty = starty;
        this.endx = endx;
        this.endy = endy;
        this.radius = 10;
    }

    show() {

        stroke(255, 40);
        strokeWeight(this.radius * 2);
        line(this.startx, this.starty, this.endx, this.endy);
         
    }
}