const bcrypt = require('bcrypt')

const saltRounds = 10 // increase this if you want more iterations  
const userPassword = 'supersecretpassword'  
const userPassword1 = 'supersecretpassword1' 
const userPassword2 = 'supersecretpassword2' 

const hashPassowrd = (password,salt) =>
                       bcrypt.hash(password,salt);

hashPassowrd(userPassword2,saltRounds)
                .then(hash =>bcrypt.compare(userPassword1,hash))
                .then(result => console.log('1-',result))
                .catch(console.error)
//console.log(result1)

const storeUserPassword = (password, salt) =>  
  bcrypt.hash(password, salt)
 
// // const storeHashInDatabase = (hash) => {  
// //    // Store the hash in your password DB
// //    return hash // For now we are returning the hash for testing at the bottom
// // }
 
// //Returns true if user password is correct, returns false otherwise
const checkUserPassword = (enteredPassword, storedPasswordHash) =>  
  bcrypt.compare(enteredPassword, storedPasswordHash)
 
 
// // // This is for demonstration purposes only.
storeUserPassword(userPassword, saltRounds)  
  .then(hash =>
    // change param userPassword to randomPassword to get false
    checkUserPassword('supersecretpassword', hash)
  )
  .then(console.log)
  .catch(console.error)




// const saltRounds = 10;
// const userPassword = 'randomSecretP@ssword'

// const storedPass = (pass,salt)=>
//     bcrypt.hash(pass,salt);


// const checkUserPassword = (enteredPass, storedPass) =>{
//     bcrypt.compare(enteredPass,storedPass)
// }


// console.log(checkUserPassword('hello',storedPass(userPassword,saltRounds)))
