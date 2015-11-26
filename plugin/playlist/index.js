var Playlist = require('../.././model/playlist');

exports.register = function(server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/api/playlists',
            handler: function (request, reply) {

              Playlist.find({ 'isDelete': 0 }).populate('medias', null, {'isDelete':0}).exec(function(err, playlists){
                    if(err){
                        reply({status : 'error'});
                    }else{
                        reply({
                            status : 'success',
                            data : playlists
                        });
                    }
            	});

            }
        }
    ]);

    server.route([
        {
            method: 'GET',
            path: '/api/playlist/{playlistId}',
            handler: function (request, reply) {
              var playlistId = request.params.playlistId

              Playlist.findOne({_id : playlistId}).populate('medias').exec(function(err, playlists){
                    if(err){
                        reply({status : 'error'});
                    }else{
                        reply({
                            status : 'success',
                            data : playlists
                        });
                    }
            	});

            }
        }
    ]);

    server.route([
        {
            method: 'POST',
            path: '/api/playlist',
            handler: function (request, reply) {
                var playlist = request.payload;
                var playlistObj = new Playlist(playlist);
                playlistObj.save(function(err){
                	if(err){
                		reply({status : 'error'});
                	}else{
                		reply({
                            status : 'success',
                            data : playlistObj
                        });
                	}
                });
            }
        }
    ]);

    server.route([
        {
            method: 'PUT',
            path: '/api/playlist',
            handler: function (request, reply) {
                var playlist = request.payload;
                Playlist.update({ '_id' : playlist._id}, playlist, function(err, result){
                	if(err){
                		reply({status : 'error'});
                	}else{
                		reply({
                            status : 'success',
                            data : playlist
                        });
                	}
                });
            }
        }
    ]);

    server.route([
        {
            method: 'DELETE',
            path: '/api/playlist/{playlistId}',
            handler: function (request, reply) {
                var playlist = request.params.playlistId;
                Playlist.update({ _id : playlist}, { isDelete : 1 }, function(err, result){
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
    name: 'playlist', // Must be unique
    version: '1.0.0'
};
