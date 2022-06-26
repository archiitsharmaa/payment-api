//importing User model
const Users = require('../../models/User');

//fucntion to verify the user based on roles and acess
async function roleAuthentication (verified, url) {
    
    //user type and acess paths
    const adminUser = ['/payments', '/payments/paymentDetails', '/payments/meta-data'];
    const billerUser = ['/biller-payments', '/payments/meta-data'];
    const visitorUser = [''];

    //finding user from database
    const user = await Users.findOne({username:verified.username}).lean();

    //convert url if contains pagination value
    if(url.indexOf('?') > 0)
    {
       url =  url.trim().substring(0,  url.trim().indexOf('?'))
    }

    //checking for admin acess
    if(user.userType === "admin") {
         if(!adminUser.includes(url)) {
            return 'Acess Denied';
         }
    }

    //checking for biller acess
    if(user.userType === "biller") {
        if(!billerUser.includes(url)) {
            return 'Acess Denied';
        }
    }

    //checking for visitor acess
    if(user.userType === "visitor") {
        if(!visitorUser.includes(url)) {
            return 'Acess Denied';
        }
    }

}

module.exports = roleAuthentication;