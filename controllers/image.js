const Clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: process.env.API_CLARIFAI
});

const handleApiCall=(req,res)=>{
app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
.then(data => res.json(data))
.catch(err =>res.status(400).json("Unable to work with api"))
}

const handleImage=(req,res,db)=>{
    
    const {id} = req.body;
    db('users')
    .where({id})
    .increment('entries',1)
    .returning('entries')
    .then(user =>{
        if(user.length){
            res.json(user[0])
        }
        else{
            res.status(400).json('Unable to get entries')
        }
    })
    .catch(err =>res.status(400).json("Unable to get entries"))
};

module.exports={handleImage,handleApiCall};