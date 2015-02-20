module.exports = function(mongoose){
    Schema = mongoose.Schema;

    var UserSchema = new Schema({
        firstName:String,
        lastName:String,
        email:String,
        userName:{
            type: String,
            trim: true
        },
        password:String,
        website: {
            type: String,
            get: function(url){
                if (!url){
                   return url;
                } else {
                    if ( url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0 ) {
                      url = 'http://' + url; 
                    }
                    return url;
                }
            }
        },
        created: {
            type: Date,
            default: Date.now
        },
    });
    
    UserSchema.virtual('fullname').get( function() {
        return this.firstName + ' ' + this.lastName;
    });

    userSchema.set('toJSON', { getters: true, virtuals: true });
    mongoose.model('User', UserSchema);
}
