const UserModel = require('../models/user');
const {
    validationResult
} = require('express-validator')
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;



// Passport Local Strategy for user login
passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                // find the user by email in the database
                const user = await UserModel.findOne({
                    email
                });


                // if the user does not exist, return an error
                if (!user) {
                    return done(null, false, {
                        message: 'Invalid credentials'
                    });
                }


                // chaeck i the provided password matches the hashed passowrd in the database
                const isMatch = await bcrypt.compare(password, user.password);


                // if the passord match, return the user
                if (isMatch) {
                    return done(null, user);
                } else {
                    // if the passwords do not match, return an error
                    return done(null, false, {
                        message: 'Invalid credentials'
                    });
                }
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    )
);

// passport Serialization and Deserialization
passport.serializeUser((user, done) => {
    done(null, user.id)
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});


// Registartion route
const register = async (req, res) => {
    try {
        // validate incoming request data using express-validator
        // const errors = validationResult(req);
        // if (errors.isEmpty()) {
        //     return res.status(400).json({
        //         errors: errors.array()
        //     });
        // }


        // Destructure user input
        const {
            fullname,
            email,
            password
        } = req.body;

        console.log(fullname);
        console.log(email);
        console.log(password);


        // check if the user already exists
        let user = await UserModel.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                errors: [{
                    message: 'User already exists'
                }]
            })
        }

        // create a new user instance
        user = new UserModel({
            fullname,
            email,
            password
        })

        
        // Hash the passwprd before saving it to the database
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);


        // Save the user to the database
        await user.save();

        res.status(200).json({
            message:'User registered successfully'
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};



// Login route using passport.authonticate middleware
const login = (req, res, next)=>{
    passport.authenticate('local',{session:false}, (err, user, info)=>{
        if(err){
            return next(err);
        }

        if (!user){
            return res.status(401).json({
                errors:[{
                    message:info.message
                }]
            });
        }


        // if authentication is successful, create a JSON Web Token (JWT)
        const payload = {
            user:{
                id:user._id
            },
        };

    
        const token  = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'1h'})

        res.json({token, user});
    })(req, res, next);
}

module.exports = {register, login};