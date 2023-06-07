"use strict";

// global viewer

let viewer = null;

function createViewer(modelName, lightPreset) {

    var options = {
        'document': modelName,
        'env': 'Local',
        'keepCurrentModels': 'false'
    };
    var viewerElement = document.getElementById('viewer3D');

    //var viewer = new Autodesk.Viewing.GuiViewer3D(viewerElement, {}); 
    var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});

    Autodesk.Viewing.Initializer(options, function () {
        viewer.initialize();       
        viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, function (event) {
            setTimeout(function () {
                initViewerExtensions(viewer);
                updateViewerWireframe(viewer);
            }, 500);
        });
        viewer.loadModel(options.document);
		viewer.setLightPreset(lightPreset);
    });

    return viewer;
}

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
		 var front = new THREE.Vector3(55, -75, 88);
		 viewer.navigation.setPosition(front);
		 viewer.fitToView (true) ;
		 viewer.createViewCube();
		 viewer.displayViewCube(true);
      } else{
			console.log("viewer is null");
	  }
}

createViewer( "https://kevinvandecar.github.io/assets/dwf_test/FrontLoader.dwfx", 8);



