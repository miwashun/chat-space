  json.array! @new_message do |tweet|
    json.content  tweet.content
    json.user_id  tweet.user.id
    json.user_name  tweet.user.name
    json.created_at  tweet.created_at.strftime("%Y/%m/%d %H:%M")
    json.image  tweet.image.url
    json.id  tweet.id
  end
