const handleSignin = (db,bcrypt)=>(req,res)=>{
        const {email,password} = req.body;
        console.log("Calling Signin...!!")
         
       db.select('*').from('login').where({email})
       .then(user=>{
           console.log("User ",user[0])
           let isValid= bcrypt.compareSync(password,user[0].hash)
           console.log("Is Valid :",isValid)
          if(isValid){
             console.log("Sign in User Found : ",user[0].email)
             db.select('*').from('users').where({email})
             .then(data=>{ console.log("User in Users :",data[0])
                return  res.json(data[0]);
             }).catch(err=>res.status(400).json("Can't find user in users table..! Server-side"));
          }else{
              console.log("Password didn't match..!!")
              res.status(404).json("Passowrd didn't match ...!")
          }
       }).catch(err=> res.status(404).json("Login doesn't exist..!"))
    }
module.exports = {
    handleSignin : handleSignin
}