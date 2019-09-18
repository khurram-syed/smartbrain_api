const handleProfiles = (req,res)=>{
         db('users').select('*')
        .then(data=>{
            res.json(data)
        })
}

module.exports = {
    handleProfiles : handleProfiles
}