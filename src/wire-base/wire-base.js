/**
 * @module wire-base
 */
YUI.add('wire-base', function(Y) {

/**
 * The wire widget
 * The wire is drawn between "src" and "tgt" (so they might be directional).
 *
 * "src" and "tgt" MUST have a "getXY" function
 *
 * "src" and "tgt" MAY additionnaly have the "addWire", "removeWire" methods.
 * Those methods are designed to be used through the Y.WiringsDelegate extension,
 * which provide basic list-handling on wires.
 *
 * @class WireBase
 * @extends Path
 * @param {Object} oConfigs The user configuration for the instance.
 */
var WireBase = function(cfg) {
      WireBase.superclass.constructor.apply(this, arguments);
};

WireBase.NAME = "wirebase";

Y.extend(WireBase, Y.Path, {
	
	/**
	 * Notify the WiresDeletates through addWire
	 * @method initializer
	 */
	initializer: function() {
	   
	   WireBase.superclass.initializer.apply(this, arguments);
	   
		var src = this.get('src'), tgt = this.get('tgt');
		
		if(src && Y.Lang.isFunction(src.addWire) ) {
			src.addWire(this);
		}
		if(tgt && Y.Lang.isFunction(tgt.addWire) ) {
			tgt.addWire(this);
		}
		
	},
	
	/**
	 * call removeWire on WiringsDelegate
	 * @method destroy
	 */
	destroy: function() {
	   
	   WireBase.superclass.destroy.apply(this, arguments);
	   
		var src = this.get('src'), tgt = this.get('tgt');
		
		if(src && Y.Lang.isFunction(src.removeWire) ) {
			src.removeWire(this);
		}
		if(tgt && Y.Lang.isFunction(tgt.removeWire) ) {
			tgt.removeWire(this);
		}
	},
	
   /**
    * Drawing method. Meant to be overriden by a plugin
	* @method draw
    */
   draw: function() {
		//throw new Error("Y.Wire has no draw method. Consider using a plugin such as 'bezier-wire' in your YUI.use statement");
	},
	
	getOtherTerminal: function(term) {
	   return (term == this.get('src')) ? this.get('tgt') : this.get('src');
	},
	
	// TODO:
	SERIALIZABLE_ATTRS: ["src","tgt"],
	toJSON: function() {
		return {};
	}
	
});


WireBase.ATTRS = Y.merge(Y.Path.ATTRS, {

	src: {
		value: null,
		setter: function(val) {
		   //console.log("src setter", val, this);
		   
   		// remove this wire from the list of the previous src/tgt item
   		// TODO: prev value
   		/*if(e.prevVal && Y.Lang.isFunction(e.prevVal.removeWire) ) {
   			e.prevVal.removeWire(this);
   		}*/
		   
   		if(val && Y.Lang.isFunction(val.addWire) ) {
   			val.addWire(this);
   		}
		   
		   return val;
		}
	},
	
	tgt: {
		value: null,
		setter: function(val) {
		   //console.log("tgt setter", val, this);
		   
		   
   		// remove this wire from the list of the previous src/tgt item
   		// TODO: prev value
   		/*if(e.prevVal && Y.Lang.isFunction(e.prevVal.removeWire) ) {
   			e.prevVal.removeWire(this);
   		}*/
         
		   
   		if(val && Y.Lang.isFunction(val.addWire) ) {
   			val.addWire(this);
   		}
   		
		   return val;
		}
	}
	
});

Y.WireBase = WireBase;

}, '3.5.1', {requires: ['graphics']});
