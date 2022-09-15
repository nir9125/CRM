const userController=require("../controller/user.controller");
const {authjwt}=require('../middlewares');
module.exports=(app)=>{
    app.get("/crm/api/v1/users/",[authjwt.verifyToken,authjwt.isAdmin],userController.findAllUsers);

    app.get("/crm/api/v1/users/:userId",[authjwt.verifyToken],userController.findUserById);

/**
 * localhost:8080/crm/api/v1/users/ADARSH20
 */
    app.put("/crm/api/v1/users/:userId",[authjwt.verifyToken,authjwt.isAdmin],userController.updateUser);
}