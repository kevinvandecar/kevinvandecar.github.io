///////////////////////////////////////////////////////////////////////////////
// Template extension to be used as a reference for extension development
// by Denis Grigor, July 2018
//
///////////////////////////////////////////////////////////////////////////////
var rAF = window.requestAnimationFrame;
var exploded = false;
var start;

function gameLoop() {
	  var gamepads = navigator.getGamepads();
	  if (!gamepads) {
		console.log('no gamepad');
		return;
	  } 
	  
	  // let's find the one we know...
	  for (var i = 0; i < gamepads.length; i++) {
		if (gamepads[i].id == "Xbox 360 Controller (XInput STANDARD GAMEPAD)")
		{
			var gp = gamepads[i];
			break;
		}
	  }	
	// When button is pressed, the model is exploded, 
	// when button is not pressed is is normal. Check before setting to avoid flashing/reset each time.
  if (gp.buttons[2].pressed) {
		if (NOP_VIEWER.getExplodeScale() != 1.0)
			NOP_VIEWER.explode(1.0);
  } else {
		if (NOP_VIEWER.getExplodeScale() != 0.0)
			NOP_VIEWER.explode(0.0);
  }
  
  start = rAF(gameLoop);
}

function setup_gamepad() {
    window.addEventListener("gamepadconnected", function(e) {
      console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length);
    });
	window.addEventListener("gamepaddisconnected", function(e) {
	  gamepadInfo.innerHTML = "Waiting for gamepad.";

	  cancelRequestAnimationFrame(start);
	});	
	  gameLoop();
}


class XboxControllerExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.viewer = viewer;
    }

    load() {
        console.log('TemplateExtension is loaded!');
        setup_gamepad();
        return true;
    }
    unload() {
        console.log('TemplateExtension is now unloaded!');
        return true;
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('XboxControllerExtension',
    XboxControllerExtension);





/* some simple illustrations*/
// this.viewer.setEnvMapBackground(false);
// this.viewer.setBackgroundColor(234, 136, 89, 240,235,223);

// this.viewer.setLightPreset(13);
// this.viewer.impl.setPostProcessParameter("style", "edging");
// this.viewer.impl.setPostProcessParameter("depthEdges", false);

/*

viewer = viewerApp.getCurrentViewer();

viewer.setTheme('light-theme');
viewer.setEnvMapBackground(false);
viewer.setBackgroundColor(255,255,255,255,255,255);

*/
