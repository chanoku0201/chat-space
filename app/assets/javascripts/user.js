$(document).on('turbolinks:load', function(){
  $(function() {

    var search_list = $("#user_search_result");
    var member_list = $("#member_search_result");

    function appendUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add js-add-btn" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                  </div>`;
      search_list.append(html);
    }
    function appendNoUser(user){
      var html = `<div class='chat-group-user clearfix'>${ user }</div>`
      search_list.append(html);
    }


    function addUser(userId,userName) {
    var html = `<div id='chat-group-users'>
                  <div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                    <input name='group[user_ids][]' type='hidden' value='${userId}'>
                    <p class='chat-group-user__name'>${userName}</p>
                    <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
                console.log(member_list)
                member_list.append(html);
    }

  $('#user-search-field').on('keyup', function(e) {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $("#user_search_result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザはいません");
      }
    })
    .fail(function(){
      alert('検索できなかった、、');
    })
  });

    $(document).on("click", ".user-search-add", function () {
      var userId = $(this).data("user-id");
      var userName = $(this).data("user-name");
        addUser(userId,userName);
        $(this).parent().remove();
      });

      $(document).on("click", ".user-search-remove", function () {
        $(this).parent().remove();
      });
    });
  });
