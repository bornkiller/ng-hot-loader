/**
 * @ngdoc controller
 * @name App.controller:showcaseController
 *
 * @description - showcase manager control
 *
 * @requires App.service:prompt
 */

export class LoveController {
  /* @ngInject */
  constructor(bkPrompt) {
    this.bkPrompt = bkPrompt;
  }
  
  /**
   * @ngdoc function
   * @name App.controller:showcaseController#handleAbnormalSituation
   * @methodOf App.controller:showcaseController
   *
   * @description - handle network fetch fail prompt
   *
   * @param {object} structure - Error definition
   */
  handleAbnormalSituation(structure) {
    if (this.bkPrompt.isValidPrompt(structure)) {
      this.errorDesc = structure.errorDesc;
    } else {
      this.errorDesc = 'Network Fetch Failed......';
    }
  }
}