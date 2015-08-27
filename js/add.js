/*jshint jquery:true, browser:false, eqeqeq: true*/
(function () {
  "use strict";

  $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
      
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
}());
