const handleRegister=(req,res,db,bcrypt)=>{
    
    const {email, password, name} = req.body;

    if(!email||!password||!name){
        return res.status(400).json('incorrect form submission')
    }
    var hash = bcrypt.hashSync(password);

    db.transaction(trx=>{
        trx.insert({email, hash})
        .into('login')
        .returning('email')
        .then(loginemail=>{
            return trx('users')
            .returning('*')
            .insert({
                    email: loginemail[0],
                    name: name,
                    joined: new Date()
                    })
            .then(user => {res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'));
};

module.exports={handleRegister};