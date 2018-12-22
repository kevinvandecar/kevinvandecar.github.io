"use strict";

// global viewer

let viewer = null;

// setup a new model in the viewer
function viewit(modelName, lightPreset) {

	
     var options = {
        'document' : modelName, 
         'env':'Local', 
        };
    var viewerElement = document.getElementById('viewer3D');

    viewer = new Autodesk.Viewing.Private.GuiViewer3D (viewerElement, {}); //Autodesk.Viewing.Viewer3D(viewerElement, {});

    Autodesk.Viewing.Initializer(options,function() {
        viewer.initialize();
		viewer.addEventListener (Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (event) {
                    setTimeout (function () { orient_view(); }, 100) ;
                }) ;		
        viewer.load(options.document);
        viewer.setLightPreset(lightPreset);
    });
 
} 

// tell the viewer to fit the geometry to the view extents.
function orient_view () {
      if (viewer != null) {
		 var front = new THREE.Vector3(0, -1, 0);
		 viewer.navigation.setPosition(front);
		 viewer.fitToView (true) ;
		 viewer.createViewCube();
		 viewer.displayViewCube(true);
      } else{
			console.log("viewer is null");
	  }
}

viewit( "https://kevinvandecar.github.io/assets/xmas/santamax/santa_4.svf", 7);



