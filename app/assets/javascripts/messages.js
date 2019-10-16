$(function(){
  function buildHTML(message){
      addImage = (message.image) ? `<img src="${message.image.url}" class="lower-message__image">` : "";
      var html =
      `<div class="main_body_message" data-message-id=${message.id}>
          <div class="main__body__message__upper-info">
            <div class="main__body__message__upper-info__talker">
              ${message.user_name}
            </div>
            <div class="main__body__message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="main__body__message__text">
            <p class="main__body__message__text__index">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__body').append(html);
      $('.new_message')[0].reset();
      $('.form__message').val('');
      $(".form__submit").prop("disabled", false);
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('画像か文章どちらかがないと送信できません。もう一度やり直して下さい');
    });
    return false;
  })
});