#pragma strict

private var target : Transform;
private var trackSpeed : float = 1;

function SetTarget(t : Transform) {
	target = t;
}

function LateUpdate() {
	if (target) {
		var x : float = IncrementTowards(transform.position.x, target.position.x, trackSpeed);
		var y : float = IncrementTowards(transform.position.y, target.position.y, trackSpeed);
		transform.position = new Vector3(x, y, transform.position.z);
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