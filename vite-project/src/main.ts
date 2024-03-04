// ZIM - JavaScript Canvas Framework - https://zimjs.com - code creativity
//import {Frame, Circle} from "zimjs";


import { Frame, MotionController, MovieClip, Stage } from "zimjs";

var canvas:any, stage:any, exportRoot:any, anim_container:any, dom_overlay_container:any, fnStartAnimation:any, S:any, W:any, H:any;
var createjs = window.createjs;
var AdobeAn:any = {};

// @ts-ignore
(import ("../Animate.js")).then(x=>x.default(createjs,AdobeAn));

console.log(AdobeAn);

export const start = () => {


    console.log(window.lib.typi);
    const typi = zimify(stage.children[0].getChildByName("typi")) as MovieClip;
    new MotionController(typi, "keydown", 2.1, undefined, undefined,undefined,undefined,0.01);
    
}


function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("614C42158CE2A24BA08EF456D4085379");
	var lib=comp.getLibrary();
	handleComplete({},comp);
}
function handleComplete(evt:any,comp:any) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	(window as any).exportRoot = new lib.Animate();
	stage = new lib.Stage(canvas);
	// ZIM SHIM for ADOBE ANIMATE - V.2
	S = stage = new Stage(canvas);
	S.enableMouseOver();
	createjs.Touch.enable(S);
	S.width = W = (window as any).stageW = canvas.width;
	S.height = H = (window as any).stageH = canvas.height;
	S.setBounds(0,0,W,H);
	F = (window as any).frame = new Frame({shim:{stage:S, canvas:canvas}});
	// END ZIM SHIM
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild((window as any).exportRoot);
		createjs.Ticker.framerate = lib.properties.fps;
		createjs.Ticker.addEventListener("tick", stage);
	};
	//Code to support hidpi screens and responsive scaling.
	//AdobeAn.makeResponsive.bind(window)(true,'both',true,1,[canvas,anim_container,dom_overlay_container]);
    window.lib = lib;
    makeResponsive(true,'both',true,1,[canvas,anim_container,dom_overlay_container]);
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();

}

window.document.body.onload = () => {
    init();
    start();
}



const makeResponsive = function(isResp:any, respDim:any, isScale:any, scaleType:any, domContainers:any) {		
	var lastW:any, lastH:any, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = window.lib.properties.width, h = window.lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container:any) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}