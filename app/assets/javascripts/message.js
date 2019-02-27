$(document).on('turbolinks:load', function() {
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
          $('.messages').append(html)
          $("#create_message")[0].reset();
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500, 'swing');
          $('.form__submit').prop('disabled', false);
        })
        .fail(function(){
          alert('非同期通信エラー');
          $('.form__submit').prop('disabled', false);
        })
    return false
  })
  $(function(){
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
            if (data.count !== 0){
              data.forEach(function(message){
                var html = buildHTML(message);
                $('.messages').append(html)
                $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 500, 'swing');
              });
            }else{
              clearInterval();
            }
          })
          .fail(function(){
            alert('自動更新エラー');
            $('.form__submit').prop('disabled', false);
          })
    };
  });
});
