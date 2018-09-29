

const kind = "Users";
const Datastore = require('@google-cloud/datastore');

var projectId = process.env.PROJECT;
if( process.env.GOOGLE_CLOUD_PROJECT ){
    projectId = process.env.GOOGLE_CLOUD_PROJECT;
    console.log('UserModel Project ID ', projectId);
}

console.log('projectId - from user', projectId);
const datastore = new Datastore({
    projectId: projectId
});
const transaction = datastore.transaction();

exports.addUser = function(user, callback){
    debugger;
    let email = user.email;
    const query = datastore.createQuery(kind).filter('email', '=', email);
    datastore.runQuery(query).then(function(results){
        console.log(results[0].length);
        if(results[0].length!=0){
            return callback(results[0], null);
        }else{
            console.log("Saving user");
            const userSave = {
                key:datastore.key(kind),
                data:{
                    username: user.username,
                    email: user.email,
                    role:user.role
                }
            };
            datastore.save(userSave).then(function(){
                console.log(userSave);
                callback(userSave, null);
            }).catch(function(error){
                console.log(error);
                callback(null, error.errmsg);
            });
        }
    }).catch(function(error){
        callback(null, error);
    });
    
}

exports.findIdByEmail = function(email, callback){
    const query = datastore.createQuery(kind).filter('email', '=', email);
    datastore.runQuery(query).then(function(results){
        callback((results[0])[0], null);
    }).catch(function(error){
        callback(null, error);
    });
}