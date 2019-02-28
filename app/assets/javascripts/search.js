$(function() {
var search_list = $("#user-search-result");
function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
              search_list.append(html);
              (`#data-user-id="${user.id}"`)
}
function appendNoUser(nouser) {
  var html = `<div class="chat-group-user clearfix">
                <p class='chat-group-user__name'>
                  ${ nouser }
                </p>
              </div>`
              search_list.append(html);
}
var add_list = $(".chat-group-users.js-add-user");
function addbtn(user_id,user_name) {
  var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${user_id}">
                <input value="${user_id}" name="group[user_ids][]" type="hidden" id="group_user_ids">
                <p class="chat-group-user__name">${user_name}</p>
                <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
              </div>`
              add_list.append(html);
}
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    if (input !== "") {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        search_list.empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
            appendNoUser("一致するユーザーは見つかりません");
        }
      })
      .fail(function() {
        alert('名前検索に失敗しました');
      })
    }
    else{
      search_list.empty();
    }
  });
  search_list.on('click',".chat-group-user__btn--add",function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    addbtn(id,name)
    $(this).parent().remove();
  });
  $(".chat-group-users").on('click',".chat-group-user__btn--remove",function(){
    $(this).parent().remove();
  });
});
