var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: [/.+\@.+\..+/, "Invalid email address. Please correct the address"]
    },
    userName: {
        type: String,
        trim: true,
        required: 'Username is required',
        unique: true
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password > 6;
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

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) { 
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            } 
        } else {
            callback(null);
        } 
    });
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);
