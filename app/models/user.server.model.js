module.exports = function(mongoose){
    var crypto = require('crypto'),
        Schema = mongoose.Schema;

    var UserSchema = new Schema({
        firstName:String,
        lastName:String,
        email:{
            type: String,
            index: true,
            match: ['/.+\@.+\..+/', "Please fill in the address"]
        },
        userName:{
            type: String,
            trim: true,
            required: 'Username is required',
            unique: true
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
        salt {
            type: String
        },
        provider {
            type: String,
            required: 'Provider is required'
        },
        providerId: String,
        providerData: {},
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
    
    UserSchema.pre('save', function(next) {
        if (this.password) {
            this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
            this.password = this.hashPassword(this.password);
        }    
        next();
    });

    UserSchema.methods.hashPassword = function(password) {
       return cryto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
    };
 
    UserSchema.methods.authenticate = function(password) {
        return this.password === this.hashPassword(password);
    };

    UserSchema.set('toJSON', { getters: true, virtuals: true });

    UserSchema.statics.findUniqueUsername = function() { 
        var _this = this;
        var possibleUsername = username + (suffix || '');

        _this.findOne({
            username: possibleUsername
        }, function (err, user) {
            if (!err) {
                
            } else {
                callback(null);
            } 
        }
    }

    UserSchema.statics.findOneByUser = function(username, callback) {
       user.findOne({ username: new RexExp(username, 'i') }, callback); 
    };

    mongoose.model('User', UserSchema);
}
