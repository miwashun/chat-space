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
    if (document.URL.match(/messages/)){
      setInterval(update, 5000);
      function update(){
        var message_id = $('.message:last').data('message_id');
        $.ajax({
          url: location.href,
          type: 'GET',
          data: {id: message_id},
          dataType: 'json'
        })
          .done(function(data){
            data.forEach(function(message){
              var html = buildHTML(message);
              messages.append(html)
              messages.animate({scrollTop: messages[0].scrollHeight}, 500, 'swing');
            });
          })
          .fail(function(){
            alert('自動更新が出来ていません。');
            abled
          })
      };
    }
  });

