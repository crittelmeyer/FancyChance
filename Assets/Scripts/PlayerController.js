#pragma strict

var gravity : float = 20;
var walkSpeed : float = 8;
var runSpeed : float = 12;
var acceleration : float = 30;
var jumpHeight : float = 12;

private var animationSpeed : float;
private var currentSpeed : float;
private var targetSpeed : float;
private var amountToMove : Vector2;

private var playerPhysics : PlayerPhysics;
private var animator : Animator;

function Start () {
	playerPhysics = GetComponent(PlayerPhysics);
	animator = GetComponent(Animator);
}

function Update () {

	//reset acceleration upon collision
	if (playerPhysics.movementStopped) {
		targetSpeed = 0;
		currentSpeed = 0;
	}
	
	//if player is touching the ground
	if (playerPhysics.grounded) {
	
		amountToMove.y = 0;
	
		//Jump
		if (Input.GetButtonDown("Jump")) {
			amountToMove.y = jumpHeight;
		}
	}
	
	animationSpeed = IncrementTowards(animationSpeed, Mathf.Abs(targetSpeed), acceleration);
	animator.SetFloat("Speed", Mathf.Abs(animationSpeed));
	
	//process input
	var speed : float = Input.GetButton("Run") ? runSpeed : walkSpeed;
	targetSpeed = Input.GetAxisRaw("Horizontal") * speed;
	currentSpeed = IncrementTowards(currentSpeed, targetSpeed, acceleration);
	
	//set amout to move
	amountToMove.x = currentSpeed;
	amountToMove.y -= gravity * Time.deltaTime;
	playerPhysics.Move(amountToMove * Time.deltaTime);
	
	var moveDir : float = Input.GetAxisRaw("Horizontal");
	if (moveDir != 0) {
		transform.eulerAngles = moveDir > 0 ? Vector3.up * 180 : Vector3.zero;
	}
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