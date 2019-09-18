const getUser = (req,res,db)=>{
        const {id} = req.params;
        let found=false;
        db('users').select('*').where({id})
        .then(user=>{
            console.log(user[0])
            res.json(user[0])
        })
        .catch(err=> res.json("User doesn't Exist..!!"))
        // database.users.forEach(user =>{
        //     if(user.id=== id){
        //         found=true;
        //         return res.json(user)
        //     }
        // })
        // if(!found){
        //     res.status(400).json("Record Not found..!")
        // }
}

module.exports = {
    getUser : getUser
}
