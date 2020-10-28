!function(factory){"function"==typeof define&&define.amd?define(factory):factory()}((function(){"use strict";function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var findLastIndex=function(array,predicate){for(var l=array.length;l--;)if(predicate(array[l],l,array))return l;return-1};window.customSelect=function(state){return _objectSpread2(_objectSpread2({},state),{},{display:"",options:[],currentIndex:-1,query:"",previousDisplay:"",canMakeSelection:!0,get activeDescendant(){return this.currentIndex>-1?"listbox-".concat(this.selectId,"-item-").concat(this.currentIndex):null},get hasValue(){return this.multiple?this.value.length>0:Boolean(this.value)},get enabledLength(){return this.options.filter((function(o){return!o.disabled&&!o.hidden})).length},get placeholderMarkup(){return'<span class="custom-select--placeholder">'.concat(this.placeholder,"</span>")},init:function($watch){var _this=this;this.$refs.container&&this.$refs.menu?(this.options=this.parseOptions(),this.value&&this.multiple&&!Array.isArray(this.value)&&(this.value=[this.value]),this.updateDisplay(this.value),$watch("value",(function(value){_this.updateDisplay(value)})),$watch("query",(function(value){return _this.filter(value)})),$watch("wireFilter",(function(){_this.$nextTick((function(){_this.options=_this.parseOptions()}))})),$watch("selected",(function(value){return _this.onSelectedChanged(value)}))):setTimeout((function(){return _this.init($watch)}),250)},filter:function(value){var _this2=this,optionsToHide=this.options.filter((function(o){return o.hidden=!1,!String(o.value).toLowerCase().includes(value)&&!String(o.text).toLowerCase().includes(value)})).map((function(o){return o.hidden=!0,_this2.optionIndex(o.value)}));optionsToHide.length?Array.from(this.$refs.menu.children).forEach((function(child){var index=Number(child.dataset.index);optionsToHide.includes(index)?child.classList.add("hidden"):child.classList.remove("hidden")})):Array.from(this.$refs.menu.children).forEach((function(child){return child.classList.remove("hidden")}))},parseOptions:function(){var _this3=this;return Array.from(this.$refs.menu.children).filter((function(child){return child.classList.contains("custom-select--option")})).map((function(child,index){return child.setAttribute("data-index",index),child.setAttribute("id","listbox-".concat(_this3.selectId,"-item-").concat(index)),JSON.parse(child.dataset.option)}))},isChosen:function(value){return this.multiple?(Array.isArray(this.value)||(this.value=[this.value]),this.value.includes(value)):value===this.value},chooseForMultiple:function(value){this.isChosen(value)?(this.optional||this.value.length>1)&&(this.value.splice(this.value.indexOf(value),1),this.updateDisplay(this.value)):this.value.push(value),0===this.value.length&&this.closeMenu()},clear:function(){this.value=this.multiple?[]:null},choose:function(value){var _this4=this;if(this.canMakeSelection){if(this.canMakeSelection=!1,setTimeout((function(){return _this4.canMakeSelection=!0}),250),this.multiple)return this.chooseForMultiple(value);this.value=this.optional&&this.value===value?null:value,this.closeMenu()}},closeMenu:function(){this.open=!1,this.focusButton()},onOptionSelect:function(){if(!(this.currentIndex<0)){var option=this.options[this.currentIndex];option&&!option.disabled&&this.choose(option.value)}},optionChildren:function(){return this.$refs.menu?Array.from(this.$refs.menu.children).filter((function(child){return child.classList.contains("custom-select--option")})):[]},updateDisplay:function(value){var _this5=this;if(!value)return this.display=this.placeholderMarkup;this.$nextTick((function(){if(_this5.multiple)return _this5.updateDisplayForMultiple(value);var $li=_this5.optionChildren()[_this5.optionIndex(value)];_this5.display=$li?$li.children[0].innerHTML:_this5.placeholderMarkup}))},updateDisplayForMultiple:function(value){var length=value.length;if(0===length)return this.previousDisplay="",this.display=this.placeholderMarkup;var $li=this.optionChildren()[this.optionIndex(value[0])];if(!$li&&!this.previousDisplay)return this.display="".concat(length," Selected");var display=$li?$li.children[0].innerHTML:this.previousDisplay;this.previousDisplay=display,length-1>0&&(display+='<span class="text-xs text-cool-gray-500">+ '.concat(length-1,"</span>")),this.display=display},optionIndex:function(value){return this.options.findIndex((function(o){return o.value===value}))},onMouseEnter:function(value){this.selected=value,this.currentIndex=this.optionIndex(value)},onSelectedChanged:function(value){var _this6=this;if(this.open){var index=this.optionIndex(value);index<0||this.$nextTick((function(){var $li=_this6.optionChildren()[index];if($li){var filterHasFocus=_this6.filterable&&document.activeElement===_this6.$refs.filter;$li.focus(),filterHasFocus&&_this6.focusFilter()}}))}},onArrowUp:function(){var _this7=this;if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);var prevIndex=findLastIndex(this.options,(function(o,index){return!o.disabled&&!o.hidden&&index<_this7.currentIndex}));prevIndex<0&&(prevIndex=findLastIndex(this.options,(function(o){return!o.disabled&&!o.hidden}))),this.currentIndex=prevIndex,this.selected=this.options[this.currentIndex].value},onArrowDown:function(){var _this8=this;if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);var nextIndex=this.options.findIndex((function(o,index){return index>_this8.currentIndex&&!o.disabled&&!o.hidden}));(-1===nextIndex||nextIndex+1>this.options.length)&&(nextIndex=this.options.findIndex((function(o){return!o.disabled&&!o.hidden}))),this.currentIndex=nextIndex,this.selected=this.options[this.currentIndex].value},onHome:function(){if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);this.currentIndex=this.options.findIndex((function(o){return!o.disabled&&!o.hidden})),this.selected=this.options[this.currentIndex].value},onEnd:function(){if(0===this.enabledLength)return this.currentIndex=-1,void(this.selected=null);this.currentIndex=findLastIndex(this.options,(function(o){return!o.disabled&&!o.hidden})),this.selected=this.options[this.currentIndex].value},focusButton:function(){var _this9=this;this.$nextTick((function(){return _this9.$refs.button.focus()}))},focusFilter:function(){var _this10=this;this.$nextTick((function(){return _this10.$refs.filter&&_this10.$refs.filter.focus()}))},focusMenu:function(){var _this11=this;this.$nextTick((function(){return _this11.$refs.menu&&_this11.$refs.menu.focus()}))},onShiftTab:function(){this.filterable?this.focusFilter():this.closeMenu()},highlightSelectedOption:function(){this.multiple?this.currentIndex=this.optionIndex(this.value[0]):this.currentIndex=this.value?this.optionIndex(this.value):0,this.currentIndex<0&&this.enabledLength>0&&(this.currentIndex=0),this.selected=this.currentIndex>-1?this.options[this.currentIndex].value:null},toggle:function(){this.open=!this.open,this.open&&this.openMenu()},openMenu:function(){var _this12=this;this.$refs.container&&this.$refs.menu?(this.$nextTick((function(){_this12.positionMenu(),_this12.refreshOptionsIfNeeded()})),this.highlightSelectedOption(),this[this.filterable?"focusFilter":"focusMenu"]()):setTimeout((function(){return _this12.openMenu()}),250)},refreshOptionsIfNeeded:function(){var children=this.optionChildren();children.length&&children[0].getAttribute("id")||(this.options=this.parseOptions())},positionMenu:function(){var _this13=this;if(this.$refs.container){this.$refs.container.classList.remove("custom-menu-top");var menuHeight=this.$refs.menu.offsetHeight,largestHeight=window.innerHeight-menuHeight-10;this.$refs.menu.getBoundingClientRect().top>largestHeight&&this.$refs.container.classList.add("custom-menu-top")}else setTimeout((function(){return _this13.positionMenu()}),250)}})}}));
//# sourceMappingURL=form-components.js.map
