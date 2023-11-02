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

    var viewer = new Autodesk.Viewing.GuiViewer3D(viewerElement, {}); 
    //var viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});

    Autodesk.Viewing.Initializer(options, function () {
        viewer.initialize();
        viewer.loadModel(options.document);
		viewer.setLightPreset(lightPreset); // Typically, you can set the light preset here. 
    });
	var ext = viewer.loadExtension('Autodesk.LayerManager');
	ext.activate();
	
    return viewer;
}



// tell the viewer to fit the geometry to the view extents.
function orient_view () {
      if (viewer != null) {
		 var front = new THREE.Vector3(55, -75, 88); // THREE.Vector3 {x: -840.5865265814298, y: -863.2277424197167, z: 442.6790285404255}
		 viewer.navigation.setPosition(front);
		 viewer.fitToView (true) ;
		 viewer.createViewCube();
		 viewer.displayViewCube(true);
      } else{
			console.log("viewer is null");
	  }
}

var gcount = -1;
let filename ="";

function onClick() {
	gcount += 1;
	document.getElementById("clicks").innerHTML = gcount;
	switch(gcount) {
	  case 0:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/FrontLoader.dwfx";
		break;
	  case 1:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/HHA_I_ARC_POD_B2F-3F_v21(RevitToDWF).dwf";
		break;
	  case 2:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/HHA_I_ARC_POD_B2F-3F_v21(VaultToDWF).dwf";
		break;
	  case 3:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/HHA_I_ARC_POD_B2F-3F_v21withTexture(RevitToDWF).dwf";
		break;
	  case 4:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/Project04E.rvt.dwf";
		break;
	  case 5:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/rac_basic_sample_project(RevitToDWF1).dwf";
		break;
	  case 6:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/rac_basic_sample_project(RevitToDWF2).dwf";
		break;
	  case 7:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/rac_basic_sample_project_AllViewSheet(RevitViaVaultToDWF).dwf";
		break;
	  case 8:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/rac_basic_sample_project_OnlySheet(VaultToDWF).rvt.dwf";
		break;
	  case 9:
		filename = "https://kevinvandecar.github.io/assets/dwf_test/AssemblySample.dwfx";
		break;	  default:
		gcount = -1;
	}
	console.log(filename);
	createViewer(filename,8);  
};





