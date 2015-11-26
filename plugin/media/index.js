var Media = require('../.././model/media');

exports.register = function(server, options, next) {

  server.route([
      {
          method: 'GET',
          path: '/api/medias',
          handler: function (request, reply) {
            Media.find({ 'isDelete': 0 }, function(err, medias){
                  if(err){
                      reply({status : 'error'});
                  }else{
                      reply({
                          status : 'success',
                          data : medias
                      });
                  }
            });
          }
      }
  ]);

  server.route([
      {
          method: 'GET',
          path: '/api/media/{mediaId}',
          handler: function (request, reply) {
            var mediaId = request.params.mediaId;
            Media.findOne({ _id : mediaId }, function(err, media){
                  if(err){
                      reply({status : 'error'});
                  }else{
                      reply({
                          status : 'success',
                          data : media
                      });
                  }
            });
          }
      }
  ]);

  server.route([
      {
          method: 'POST',
          path: '/api/media',
          handler: function (request, reply) {
              var media = request.payload;
              var mediaObj = new Media(media);
              mediaObj.save(function(err){
                if(err){
                  reply({status : 'error'});
                }else{
                  reply({
                          status : 'success',
                          data : mediaObj
                      });
                }
              });
          }
      }
  ]);

  server.route([
      {
          method: 'PUT',
          path: '/api/media',
          handler: function (request, reply) {
              var media = request.payload;
              Media.update({ _id : media._id}, media, function(err, result){
                if(err){
                  reply({status : 'error'});
                }else{
                  reply({
                          status : 'success',
                          data : media
                      });
                }
              });
          }
      }
  ]);

  server.route([
      {
          method: 'DELETE',
          path: '/api/media/{mediaId}',
          handler: function (request, reply) {
              var media = request.params.mediaId;
              Media.update({ _id : media}, { isDelete : 1 }, function(err, result){
                if(err){
                  reply({status : 'error'});
                }else{
                  reply({
                    status:'success'
                  });
                }
              });

          }
      }
  ]);

    // Callback, completes the registration process
    next();
}

exports.register.attributes = {
    name: 'media', // Must be unique
    version: '1.0.0'
};
