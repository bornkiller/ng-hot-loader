export default class CollectionController {
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