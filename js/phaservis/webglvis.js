
/*
WebGL visualization things.
Phaser won't work with standalone Pixi because Phaser uses its own Pixi version.
So don't instantiate a Pizi and a Phaser vis at the same time.

*/
module.exports = {
	pixivis: function(){
		var PIXI = require('../../js/lib/pixi.min.js');

		// create an new instance of a pixi stage
	    var stage = new PIXI.Stage(0x66FF99);
	    // create a renderer instance.
	    var renderer = PIXI.autoDetectRenderer(400, 400);

	    // add the renderer view element to the DOM
	    document.body.appendChild(renderer.view);
	    var sprite = new PIXI.Sprite.fromImage('assets/image.png');
	    //input setup
	    // document.addEventListener('keydown', onKeyDown);

	    // create the root of the scene graph
	    var stage = new PIXI.Container();
	    stage.interactive = true;

	    var graphics = new PIXI.Graphics();

	    // set a fill and line style
	    graphics.beginFill(0xFF3300);
	    graphics.lineStyle(4, 0xffd900, 1);

	    // draw a shape
	    graphics.moveTo(50,50);
	    graphics.lineTo(250, 50);
	    graphics.lineTo(100, 100);
	    graphics.lineTo(50, 50);
	    graphics.endFill();

	    stage.addChild(graphics);
	    renderer.render(stage);
	        // requestAnimationFrame(animate);

	    // run the render loop
	    // animate();

	    // function animate() {
	        // renderer.render(stage);
	        // requestAnimationFrame(animate);
	    // }
	},

	phaservis: function(){
	    var vis = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { create: create, render: render });

	    var rect;

	    function create() {
	        rect = new Phaser.Rectangle(0, 550, 30, 50);
	    }

	    function render () {
	        vis.debug.geom(rect,'#0fffff');
	    }

	    function barGraph(){

	    }
	},
}