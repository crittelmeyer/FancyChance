#pragma strict

var gravity : float = 20;
var speed : float = 8;
var acceleration : float = 30;
var jumpHeight : float = 12;

private var currentSpeed : float;
private var targetSpeed : float;
private var amountToMove : Vector2;

private var playerPhysics : PlayerPhysics;

function Start () {
	playerPhysics = GetComponent(PlayerPhysics);
}

function Update () {
	if (playerPhysics.movementStopped) {
		targetSpeed = 0;
		currentSpeed = 0;
	}

	targetSpeed = Input.GetAxisRaw("Horizontal") * speed;
	currentSpeed = IncrementTowards(currentSpeed, targetSpeed, acceleration);
	
	if (playerPhysics.grounded) {
	
		amountToMove.y = 0;
	
		//Jump
		if (Input.GetButtonDown("Jump")) {
			amountToMove.y = jumpHeight;
		}
	}
	
	amountToMove.x = currentSpeed;
	amountToMove.y -= gravity * Time.deltaTime;
	playerPhysics.Move(amountToMove * Time.deltaTime);
}

function IncrementTowards(n : float, target : float, a : float) {
	if (n == target) { 
		return n;
	} else {
		var dir : float = Mathf.Sign(target - n); //n must be increased or decreased to get closer to target
		n += a * Time.deltaTime * dir;
		return (dir == Mathf.Sign(target - n)) ? n : target; //if n has now passed the target then return target, otherwise return n
	}
}