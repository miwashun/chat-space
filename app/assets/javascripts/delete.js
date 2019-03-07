
$(function() {
  var search_list = $("#user-search-result");
  var add_list = $(".chat-group-users.js-add-user");
  function addbtn(user_id,user_name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${user_id}">
                  <input value="${user_id}" name="group[user_ids][]" type="hidden" id="group_user_ids">
                  <p class="chat-group-user__name">${user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
                add_list.append(html);
  }
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
