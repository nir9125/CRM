const Students = require('./models/studentsModel');

async function dbOperation() {
   //find by id
    try{
        const student=await Students.findById("62519c6183f0511238ee8d00");
        console.log("id",student);
    }
    catch(err){
console.log(err.message);
    }
    //find by attributes
    try{
        const student=await Students.find({name:"ADARSH JHA"});
        console.log("find",student);
    }
    catch(err){
console.log(err.message);
    }
//where

    try{
        const student=await Students.where("age").gt("20").where("name").equals("ADARSH JHA").limit(1);
        console.log("WHERE",student);
    }
    catch(err){
console.log(err.message);
    }
    try{
        const student=await Students.deleteOne({name:"ADARSH JHA"});
        console.log("DELTED");
    }
    catch(err){
console.log(err.message);
    }
//create
    try {
        const student = await Students.create({
            name: "ADARSH JHA",
            age: 21,
            email: "adarshjha91101@gmai.com",
            subjects:["MATH","PHYSICS"],
            address: {
                street: "MOGALPURA",
                city: "DARBHANGA",
                state: "Bihar",
                country: "india",
                pincode: 846004
            }
        })
        console.log(student);

    } catch (err) {
        console.log("ERROE WHILE INSERTING ", err.message);
         }



}
dbOperation();