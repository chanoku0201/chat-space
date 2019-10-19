$(function(){
  function buildHTML(message){
      var img = message.image? `<img src="${message.image}" class="lower-message__image">` : "";
      var html =
      `<div class="main__body__message" data-message-id=${message.id}>
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
            <p class = "lower-message__image">
              ${ img }
            </p>
          </div>
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
      $('form')[0].reset();
      $(".form__submit").prop("disabled", false);
      $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');

    })
    .fail(function(){
      alert('画像か文章どちらかがないと送信できません。もう一度やり直して下さい');
    });
    return false;
  })


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.main__body__message:last').data('message-id');

      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.main__body').append(insertHTML);
          $('.main__body').animate({scrollTop: $('.main__body')[0].scrollHeight}, 'fast');
        })

      })
      .fail(function() {
        // alert('自動更新できませんでした');
      });
    }
  };
  setInterval(reloadMessages, 2000);
});