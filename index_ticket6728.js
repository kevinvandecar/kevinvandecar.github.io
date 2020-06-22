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
	viewer.loadExtension('Autodesk.PDF');
    Autodesk.Viewing.Initializer(options,function() {
        viewer.initialize();
		viewer.addEventListener (Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (event) {
                    setTimeout (function () { orient_view(); }, 100) ;
                }) ;		
        viewer.loadModel(modelName, viewer);
        viewer.setLightPreset(lightPreset);
    });
 
} 


function initializeViewer( pdf ) {
   var options = {
        env: "Local",
        useADP: false
   }
   Autodesk.Viewing.Initializer(options, () => {
      viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('viewer3D'));
      viewer.setTheme("light-theme");
      viewer.start();
      if (!pdf) return;
      viewer.loadExtension('Autodesk.PDF').then( () => {
            viewer.loadModel( pdf , viewer);
      });
	});
};

// tell the viewer to fit the geometry to the view extents.
function orient_view () {
      if (viewer != null) {
		 var front = new THREE.Vector3(55, -75, 88);
		 viewer.navigation.setPosition(front);
		 viewer.fitToView (true) ;
		 viewer.createViewCube();
		 viewer.displayViewCube(true);
      } else{
			console.log("viewer is null");
	  }
}

initializeViewer("test.pdf");



