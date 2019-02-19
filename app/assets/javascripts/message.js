$(function(){
  function buildHTML(message){
    var html = `<div class="message" data-message_id>
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__data">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">
                  </p>
                  <p class="lower-message__content">
                   ${message.content}
                  </p>
                </div>`
                return html;
  }

  $('#create_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType:false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 5000, 'swing');
      $('.form__submit').prop('disabled', false);

    })
    .fail(function(){
      alert('error');
    })
  })
});
