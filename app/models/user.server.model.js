module.exports = function(mongoose){
    Schema = mongoose.Schema;

    var UserSchema = new Schema({
        firstName:String,
        lastName:String,
        email:{
            type: String,
            index: true,
            match: '/.+\@.+\..+/'
        },
        userName:{
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        password:{
            type: String,
            validate: [
                function(password){
                    return password.length >= 6
                },
                "Make sure your password is greater than 5 characters long" 
            ]
        },
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
    }).set( function(fullname){
        var splitname = fullname.split(' ');
        this.firstName = splitname[0] || '';
        this.secondName = splitname[1] || '';
    });

    UserSchema.set('toJSON', { getters: true, virtuals: true });

    UserSchema.statics.findOneByUser = function(username, callback) {
       user.findOne({ username: new RexExp(username, 'i') }, callback); 
    };

    mongoose.model('User', UserSchema);
}
