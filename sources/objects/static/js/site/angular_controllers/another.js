var myColorGlobal = 'navy';

/**
 * Another controller.
 *
 * @constructor
 * @ngInject
 * @export
 */
application.AnotherCtrl = function() {
  /**
   * @type {string}
   * @export
   */
  this.myColor = 'red';
};

/**
 * @constructor
 * @ngInject
 * @export
 */
application.AnotherCtrlSecondLevel = function() {
    this.myColor = 'blue';
};


/**
 * @constructor
 * @ngInject
 * @export
 */
application.AnotherCtrlThirdLevel = function() {

};


/**
 * @constructor
 * @ngInject
 * @export
 */
application.AnotherCtrlFourthLevel = function() {
    this.myColor = myColorGlobal;
};