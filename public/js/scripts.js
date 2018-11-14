$(document).ready(function(){
  $('.img-modal-btn').on('click',function(){
      var dataURL = $(this).attr('data-src');
      $('#modal-img').attr("src", dataURL);
  }); 
});