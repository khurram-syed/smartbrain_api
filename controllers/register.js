const handleRegister = (req,res,db,bcrypt)=>{

        const {name,email,password} = req.body;
        console.log("Calling Register...!!");
      if(!name || !email || !password){
          return res.json("You need to provide all of three..!")
      }
      console.log("Name..!!",name);
      let hash = bcrypt.hashSync(password,10)
        db.transaction(trx=>{
          trx.insert({hash,email}).into('login')
          .returning('email')
          .then(loginEmail => {
              console.log("Login Email :",loginEmail)
             return trx('users').insert({name,email,entries:0,joined:new Date()})
              .returning('*')
              .then(data =>{
                  console.log(data[0])
                  res.json(data[0])
              }).catch(err=> res.json(400).json("Can't Register with Users..!"))
          })
          .then(trx.commit)
          .catch(err=>{ res.json("User email Already Exist..!")
              trx.rollback});
      }).catch(err=>res.status(400).json("Can't Register Overall..! "))
}

module.exports = {
    handleRegister : handleRegister
}