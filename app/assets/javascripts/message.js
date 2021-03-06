$(function() {
  messages = $('.messages')
  abled = $('.form__submit').prop('disabled', false);
  function buildHTML(message){
    var MessageContent = (message.content) ? message.content : ""
    var MessageImage = (message.image) ? `<img class="form__mask__image" src="${message.image}">` : ""
    var html = `<div class="message" data-message_id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__data">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                     ${MessageContent}
                    </p>
                     ${MessageImage}
                  </div>
                </div>`
                return html;
  }
  $('#create_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
      $.ajax({
        url: location.href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
        .done(function(data){
          var html = buildHTML(data);
          messages.append(html)
          $("#create_message")[0].reset();
          messages.animate({scrollTop: messages[0].scrollHeight}, 500, 'swing');
          abled
        })
        .fail(function(){
          alert('メッセージが入っていません！');
          abled
        })
    return false
  })
});
