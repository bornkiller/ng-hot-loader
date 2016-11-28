'use strict';

/**
 * @ngdoc service
 * @name  App.service:prompt
 *
 * @description - share prompt manage service
 *
 * @requires $q
 */
export function promptFactory() {
  return {
    isValidPrompt,
    escapeValidPrompt
  };

  /**
   * @ngdoc function
   * @name App.service:prompt#isValidPrompt
   * @methodOf App.service:prompt
   *
   * @description - validate current param rule match
   *
   * @example
   * <pre>
   *   $result = prompt.isValidPrompt({
     *     success: false,
     *     errorDesc: 'something abnormal happened...'
     *   });
   *
   *   // $result == true
   * </pre>
   *
   * @param {object} structure - unknown source
   * @param {boolean} structure.success - response status
   * @param {string} structure.errorDesc - description about current error
   * @returns {boolean} - valid or invalid for param
   */
  function isValidPrompt(structure) {
    return !!structure.errorDesc;
  }
  
  /**
   * @ngdoc function
   * @name App.service:prompt#escapeValidPrompt
   * @methodOf App.service:prompt
   *
   * @description - escape illegal character
   *
   * @example
   * <pre>
   *   $result = prompt.escapeValidPrompt({
     *     success: false,
     *     errorDesc: '<p class="text-info">Hello world!</p>'
     *   });
   *   // $result == "&lt;p class=&quot;text-info&quot;&gt;Hello world!&lt;/p&gt;"
   * </pre>
   *
   * @param {object} structure - valid prompt source
   * @returns {string} - escaped parse content
   */
  function escapeValidPrompt(structure) {
    return _.escape(structure.errorDesc);
  }
}