const { Sequelize } = require('sequelize')

const ImageModel = require('./models/image')
const NoticeModel = require('./models/notice')
const UserModel = require('./models/user')
const CommentModel = require('./models/comment')
const config = require('../config')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.database_host,
  port: config.database_port,
  username: config.database_user,
  password: config.database_pass,
  database: config.database_db
})

const Image = ImageModel(sequelize)
const Notice = NoticeModel(sequelize)
const User = UserModel(sequelize)
const Comment = CommentModel(sequelize)

// Create associations for foreign keys
Image.belongsTo(User)
User.hasMany(Image)

Comment.belongsTo(Image, { allowNull: false })
Image.hasMany(Comment)
User.hasMany(Comment)
Comment.belongsTo(User, { allowNull: true })

// User might have many favorite images
// User.hasMany(Image, { as: 'Favorite' })

module.exports = {
  sequelize,
  Image,
  Notice,
  User,
  Comment
}
