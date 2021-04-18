const { Comment } = require('../../database')

module.exports = [
  {
    method: 'POST',
    path: '/image/{image_id}/comment',
    handler: async function (request, h) {
      const comment = await Comment.create({
        comment: request.payload.comment,
        imageId: request.params.image_id,
        userId: request.auth.credentials.user.id
      })

      console.log('commentID: ', comment.id)
      return Comment.findOne({
        attributes: ['id', 'imageId', 'comment', 'userId'],
        where: {
          id: comment.id
        }
      })
    }
  },
  {
    method: 'GET',
    path: '/comments',
    handler: async function (request, h) {
      const comments = await Comment.findAll()
      return comments.map(cmt => (
          {
            ...cmt.toJSON()
          }
        )
      )
    }
  }
]
