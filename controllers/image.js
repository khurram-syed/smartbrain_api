const Clarifai  = require('clarifai');

const app = new Clarifai.App({apiKey: 'da8a5322b51041b8958fd9d0bd59cbb3'});
const handleImageApi = (req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{res.json(data)})
    .catch(err=>{res.json("Unable to Get Clarifai API data..!!")})
}

const handleImageCount = (req,res,db)=>{
   
        console.log("Calling Image Count...!!")
        console.log(`ID : ${req.body.id}`)
        const {id} = req.body;
      
        db('users').where({id}).increment('entries',1)
        .returning('entries')
        .then(entry=>{ console.log("User Entries - After Update : ",entry[0]);
                    res.json(entry[0])  
         }).catch(err=> res.status(400).json("Entries cannot inserted..!"))
}


module.exports = {
    handleImageCount,
    handleImageApi
}