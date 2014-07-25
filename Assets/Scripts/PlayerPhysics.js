#pragma strict

var collisionMask : LayerMask;

private var coll : BoxCollider;
private var s : Vector3;
private var c : Vector3;

@HideInInspector
var grounded : boolean;
@HideInInspector
var movementStopped : boolean;

private var skin : float = 0.005f;

var ray : Ray;
var hit : RaycastHit;

function Start() {
	coll = GetComponent(BoxCollider);
	s = coll.size;
	c = coll.center;
}

function Move(moveAmount : Vector2) {

	var deltaY : float = moveAmount.y;
	var deltaX : float = moveAmount.x;
	var p : Vector2 = transform.position;
	var i : int;
	var dir : float;
	var x : float;
	var y : float;
	var dst : float;

	//check top and bottom collisions
	grounded = false;
	
	for (i = 0; i < 3; i++) {
		dir = Mathf.Sign(deltaY);
		x = (p.x + c.x - s.x/2) + s.x/2 * i; //left, center, and then right most point of collider
		y = p.y + c.y + s.y/2 * dir; //bottom of collider
		
		ray = new Ray(new Vector2(x, y), new Vector2(0, dir));
		Debug.DrawRay(ray.origin, ray.direction);
		
		if (Physics.Raycast(ray, hit, Mathf.Abs(deltaY) + skin, collisionMask)) {
			//Get distance between player and ground
			dst = Vector3.Distance(ray.origin, hit.point);
			
			//Stop player's downward movement after coming within skin width of a collider
			if (dst > skin) {
				deltaY = dst * dir - skin * dir;
			} else {
				deltaY = 0;
			}
			
			grounded = true;
			break;
		}
	}
	
	//check left and right collisions
	movementStopped = false;
	for (i = 0; i < 3; i++) {
		dir = Mathf.Sign(deltaX);
		x = p.x + c.x + s.x/2 * dir; //right of collider
		y = (p.y + c.y - s.y/2) + s.y/2 * i; //top, center, and then bottom most point of collider
		
		ray = new Ray(new Vector2(x, y), new Vector2(dir, 0));
		Debug.DrawRay(ray.origin, ray.direction);
		
		if (Physics.Raycast(ray, hit, Mathf.Abs(deltaX) + skin, collisionMask)) {
			//Get distance between player and ground
			dst = Vector3.Distance(ray.origin, hit.point);
			
			//Stop player's horizontal movement after coming within skin width of a collider
			if (dst > skin) {
				deltaX = dst * dir - skin * dir;
			} else {
				deltaX = 0;
			}
			
			movementStopped = true;
			break;
		}
	}
	
	var finalTransform = new Vector2(deltaX, deltaY);

	transform.Translate(finalTransform);
}