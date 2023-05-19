import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBird } from "./MyBird.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.texPanorama = new CGFtexture(this, "images/panorama4.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.sphere = new MySphere(this, 16, 8, 1, "sphere");
    this.panorama = new MyPanorama(this, this.texPanorama);
    this.terrain = new MyTerrain(this, 20);
    this.nest = new MyNest(this, 32, 16, 3);
    this.Bird = new MyBird(this);
    this.group = new MyTreeGroupPatch(this);
    this.row = new MyTreeRowPatch(this);
    
    this.billboard = new MyBillboard(this, 0, 0, 0);

    this.eggs = [];
    for(var i = 0; i < 4;i++) {
        this.eggs.push(new MyBirdEgg(this, 32, 16, 1));
    }

    this.positions = [[4, 4.35, 3], [12, 3.65, -2], [-11, 3.6, -5], [-4, 3.2, 5]];
    this.rotations = [0, 0, 1, 0,
                       1, -Math.PI / 4.0, 0, 0, 
                       1, 1, Math.PI / 4.0, 0, 
                       1, 0, 0, 1];

    //Objects connected to MyInterface
    this.displayAxis = false;

    this.displayNormals  = false;

    this.displaySphere = false;
    this.displayPanorama = true;
    this.displayTerrain = true;
    this.displayBird = false;

    this.scaleFactor = 1;

    this.enableTextures(true);

this.texture2 = new CGFtexture(this, "images/earth.jpg")
this.appearance2 = new CGFappearance(this);
this.appearance2.setTexture(this.texture2);
this.appearance2.setTextureWrap('REPEAT', 'REPEAT');

this.appearance3 = new CGFappearance(this);
this.appearance3.setTexture(this.texPanorama);
this.appearance3.setTextureWrap('REPEAT', 'REPEAT');

this.texture4 = new CGFtexture(this, "images/nest.jpg")
this.appearance4 = new CGFappearance(this);
this.appearance4.setTexture(this.texture4);
this.appearance4.setTextureWrap('REPEAT', 'REPEAT');

this.texture5 = new CGFtexture(this, "images/egg.jpeg")

this.shader1 = new CGFshader(this.gl, "shaders/egg.vert", "shaders/egg.frag");
this.shader1.setUniformsValues({uSampler: this.texture5, uSampler1: 1, uSampler2: 2});

  }
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1,
      0.1,
      1000,
      vec3.fromValues(50, 210, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  updateTexCoords() {
    this.quad.updateTexCoords(this.texCoords);
  }


  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    

    if (this.displayNormals) {
      this.sphere.enableNormalViz();
      this.panorama.sphere.enableNormalViz();
      this.terrain.plane.enableNormalViz();
      for (var i = 0; i < 4; i++){
        this.eggs[i].enableNormalViz;
      }
      this.nest.outside.enableNormalViz();
      this.nest.inside.enableNormalViz();
      this.Bird.enableNormalViz();
      this.group.enableNormalViz();
      this.row.enableNormalViz();
    }
    else {
      this.sphere.disableNormalViz();
      this.panorama.sphere.disableNormalViz();
      this.terrain.plane.disableNormalViz();
      for (var i = 0; i < 4; i++) {
        this.eggs[i].disableNormalViz();
      }
      this.nest.outside.disableNormalViz();
      this.nest.inside.disableNormalViz();
      this.Bird.disableNormalViz();
      this.group.disableNormalViz();
      this.row.disableNormalViz();
    }

    
    
    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance2.apply();
    if (this.displaySphere) this.sphere.display();
    this.popMatrix();

    this.pushMatrix();
    this.appearance3.apply();
    //this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    this.translate(0, 60, 0)
    if (this.displayPanorama) this.panorama.display();
    this.popMatrix();

    if (this.displayTerrain) {
      this.terrain.display();
      this.setActiveShader(this.defaultShader);
      for (var i = 0; i < this.eggs.length; i++) {
        this.pushMatrix();
        this.setActiveShader(this.shader1);
        this.texture5.bind(0);
        this.translate(this.positions[i][0] * 8, this.positions[i][1] * 8, this.positions[i][2] * 8);
        this.rotate(this.rotations[i * 4], this.rotations[i * 4 + 1], this.rotations[i * 4 + 2], this.rotations[i * 4 + 3]);
        this.scale(0.5 * 8, 0.5 * 8, 0.5 * 8)
        this.eggs[i].display();
        this.setActiveShader(this.defaultShader);
        this.popMatrix();
      }
      this.pushMatrix();
      this.translate(10 * 8, 5.4  * 8, 7 * 8);
      this.scale(8.2, 8.2, 8.2);
      this.appearance4.apply();
      this.nest.display();
      this.popMatrix();
      this.billboard.display();
      this.setActiveShader(this.defaultShader);
      this.group.display();
      this.row.display();
  }
  
  
  
  this.pushMatrix();
  
  if(this.displayBird){
    this.Bird.update();
    this.Bird.display();
  } 
  this.popMatrix();
    // ---- END Primitive drawing section
    
  }
  
}
