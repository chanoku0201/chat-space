# README
This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true, index: false|
|password|string|null: false, unique: true, index: false|
|name|string|null: false unique: true, index: true|
### Association
- has_many :groups,through: :group_users
- has_many :group_users
- has_many :comments

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unigue: true, index: false|
### Association
- has_many :users,through: :group_users
- has_many :group_users
- has_many :comments

## massageテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, unique: false, index: true, foreign_key: true|
|group_id|integer|null: false, unique: false, index: true, foreign_key: true|
|comment|text|
|image|text|
### Association
- belongs_to :user
- belongs_to :group

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, unique: false, index: true, foreign_key: true|
|user_id|integer|null: false, unique: false, index true, foreign_key: true|
### Association
- belongs_to :post
- belongs_to :group







