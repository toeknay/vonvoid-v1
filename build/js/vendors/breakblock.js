//Game scope objects and parameters
    var canvas = document.getElementById("breakblock");
    var ctx = canvas.getContext("2d");
    var ballRadius = 10;
    var paddleHeight = 10;
    var paddleWidth = 75;

	//placeholder for the left and right arrow key up and down events
    var rightPressed = false;
    var leftPressed = false;

	//blocks hit
    var score = 0;
	//losing condition
    var lives = 9;
	//current level
	var level = 1;
	//winning condition, incremented by level
	brickTotal = 15;

	//Event listeners for arrow keys and mouse movement
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

	//input functions for paddle movement
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }

	//Collision detection, and action between ball and bricks
    function collisionDetection() {
        for(var c=0; c<brickRowCount; c++) {
            for(var r=0; r<brickColumnCount; r++) {
                var b = bricks[c][r];
				//Status equal to 1 means brick is in game
                if(b.status == 1) {
					//the ball lies within the brick
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
						//flip the y direction of the movement of the ball to simulate bouncing
                        dy = -dy;
						//brick is destroyed
                        b.status = 0;
						//score incremented
                        score++;
						//wining condition met for level under 5
                        if(score == brickTotal && level <= 4) {
							//level incremented before loadLevel function called
                            loadLevel(++level);
                        }
						//final level winning condition met, game loop interrupted by alert
						if(score == brickTotal && level == 5) {
                            //alert("YOU WIN, CONGRATS!");
                            //document.location.reload();
                        }
                    }
                }
            }
        }
    }

	//specific drawing functions utilized in looping draw() function
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }
    function drawBricks() {
        for(var c=0; c<brickRowCount; c++) {
            for(var r=0; r<brickColumnCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#990000";
                    ctx.fill();
					ctx.strokeStyle = "#000000";
					ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
    function drawScore() {
        ctx.font = "16px Impact";
        ctx.fillStyle = "#990000";
        ctx.fillText("Score: "+score, 8, 20);
    }
    function drawLives() {
        ctx.font = "bold 16px Impact";
        ctx.fillStyle = "#990000";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }
	function drawLevel() {
        ctx.font = "16px Impact";
        ctx.fillStyle = "#990000";
        ctx.fillText("Level: "+level, canvas.width-268, 20);
    }

	//The game loop
    function draw() {
		//clearing the old drawings every iteration
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		//drawing everything and checking ball/brick collision
		drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
		drawLevel();
        collisionDetection();
		//ball collision with left and right boundary
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
		//ball collision with top boundary
        if(y + dy < ballRadius) {
            dy = -dy;
        }
		//ball collision with bottom boundary or paddle
        else if(y + dy > canvas.height-ballRadius) {
			//ball hit paddle and direction reversed
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
			//ball hit bottom boundary
            else {
				//lose a life
                lives--;
				//No more lives is losing condition
                if(!lives) {
                    //alert("GAME OVER");
                    //document.location.reload();
                }
				//otherwise spawn ball and place paddle in middle
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width-paddleWidth)/2;
                }
            }
        }
		//paddle movement from arrow keys
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 7;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 7;
        }
		//ball movement from summation of position before and after frame changes
        x += dx;
        y += dy;
		//loop the draw function
        requestAnimationFrame(draw);
    }

	//loads level specific objects at the start of each level
	function loadLevel(level){
		//arrange brick objects
		if (level == 1){
			bricks = [];
			brickRowCount = 3;
			brickColumnCount = 5;
			brickWidth = 75;
			brickHeight = 20;
			brickPadding = 10;
			brickOffsetTop = 30;
			brickOffsetLeft = 30;
		}
		if (level == 2){
			bricks = [];
			brickRowCount = 3;
			brickColumnCount = 6;
			brickWidth = 60;
			brickHeight = 20;
			brickPadding = 10;
			brickOffsetTop = 30;
			brickOffsetLeft = 36;
			brickTotal += brickRowCount*brickColumnCount;
		}
		if (level == 3){
			bricks = [];
			brickRowCount = 4;
			brickColumnCount = 6;
			brickWidth = 60;
			brickHeight = 20;
			brickPadding = 10;
			brickOffsetTop = 30;
			brickOffsetLeft = 36;
			brickTotal += brickRowCount*brickColumnCount;
		}
		if (level == 4){
			bricks = [];
			brickRowCount = 4;
			brickColumnCount = 7;
			brickWidth = 50;
			brickHeight = 20;
			brickPadding = 10;
			brickOffsetTop = 30;
			brickOffsetLeft = 36;
			brickTotal += brickRowCount*brickColumnCount;
		}
		if (level == 5){
			bricks = [];
			brickRowCount = 5;
			brickColumnCount = 7;
			brickWidth = 50;
			brickHeight = 20;
			brickPadding = 10;
			brickOffsetTop = 30;
			brickOffsetLeft = 36;
			brickTotal += brickRowCount*brickColumnCount;
		}

		//place brick objects
		for(var c=0; c<brickRowCount; c++) {
			bricks[c] = [];
			for(var r=0; r<brickColumnCount; r++) {
				bricks[c][r] = { x: 0, y: 0, status: 1 };
			}
		}

		//spawn ball and paddle
		x = canvas.width/2;
        y = canvas.height-30;
		paddleX = (canvas.width-paddleWidth)/2;
		//spawn ball movement and increment per level, making the game more difficult
        dx = 2;
        dy = -2;
        //start the loop at the beginning of each level
		requestAnimationFrame(draw);

	}

	//initiate level and run game loop
	loadLevel(level);
  draw();
