#pragma strict

var collisionMask : LayerMask;

private var coll : BoxCollider;
private var s : Vector3;
private var c : Vector3;

@HideInInspector
var grounded : boolean;

private var skin : float = 0.005f;

var ray : Ray;
var hit : RaycastHit;

function Start() {
	coll = GetComponent(BoxCollider);
	s = coll.size;
	c = coll.center;
}

function Move(moveAmount : Vector2) {
	grounded = false;

	var deltaY : float = moveAmount.y;
	var deltaX : float = moveAmount.x;
	var p : Vector2 = transform.position;
	
	for (var i = 0; i < 3; i++) {
		var dir : float = Mathf.Sign(deltaY);
		var x : float = (p.x + c.x - s.x/2) + s.x/2 * i; //left, center, and then right most point of collider
		var y : float = p.y + c.y + s.y/2 * dir; //bottom of collider
		
		ray = new Ray(new Vector2(x, y), new Vector2(0, dir));
		Debug.DrawRay(ray.origin, ray.direction);
		
		if (Physics.Raycast(ray, hit, Mathf.Abs(deltaY), collisionMask)) {
			//Get distance between player and ground
			var dst : float = Vector3.Distance(ray.origin, hit.point);
			
			//Stop player's downward movement after coming within skin width of a collider
			if (dst > skin) {
				deltaY = dst * dir + skin;
			} else {
				deltaY = 0;
			}
			
			grounded = true;
			break;
		}
	}
	
	var finalTransform = new Vector2(deltaX, deltaY);

	transform.Translate(finalTransform);
}