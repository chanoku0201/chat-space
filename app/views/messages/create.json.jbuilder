json.user_name @message.user.name
json.content @message.content
json.date @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.image @message.image_url
json.id @message.id



# json.(@message, :content, :image)
# json.created_at @message.created_at
# json.user_name @message.user.name
# #idもデータとして渡す
# json.id @message.id