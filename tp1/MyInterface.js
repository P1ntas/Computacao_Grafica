import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');//tem de ter true of false

        this.gui.add(this.scene, 'displayDiamond').name('Display diamond');
        this.gui.add(this.scene, 'displayTriangle').name('Display triangle');
        this.gui.add(this.scene, 'displayParallelogram').name('Display parallelogram');
        
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');//tem de ser um numero de 0.1 a 5

        return true;
    }
}