var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Invalid email address. Please correct the address"]
    },
    username: {
        type: String,
        trim: true,
        required: 'Username is required',
        unique: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 6;
            }, 'Make sure your password is greater than 6 characters long'
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('fullName').get( function() {
    return this.firstName + ' ' + this.lastName;
}).set( function(fullName){
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function(next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }    
    next();
});

UserSchema.methods.hashPassword = function(password) {
   return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) { 
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                //no user exists by this name so execute the callback returning this name
                callback(possibleUsername);
            } else {
                //user has been found so add a suffix and try again to find a unique name
                //We create the suffix of 1 (0 + 1) or the suffix from this attempt.
                //We also recycle the callback reference. It will eventually find an unused user
                //When it does we want to be able to use this callback.
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            } 
        } else {
            //error give null user
            callback(null);
        } 
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);
