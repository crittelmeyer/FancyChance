#pragma strict

var player : GameObject;
private var cam : GameCamera;

function Start () {
	cam = GetComponent(GameCamera);
	SpawnPlayer();
}

function SpawnPlayer () {
	var p : GameObject;
	p = Instantiate(player, Vector3.zero, Quaternion.identity);
	cam.SetTarget(p.transform);
}