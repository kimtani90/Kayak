

//var bcrypt = require('bcrypt');
var mysql = require('../models/mysql');





function login(msg, callback){

    var res = {};
    console.log("++++++++++++++++++++");
    console.log(msg);
    console.log("++++++++++++++++++++");
    var selectQuery = "select password,user_role from USER where email = '"+msg.email+"';" ;
    console.log(selectQuery);

    mysql.fetchData(function (err,results) {

        if (err){
           res.code = "401" ;
           res.value = "Username not valid";
        }
        else {
            console.log("++++++++++++++++++++");
               console.log(results);
            console.log("++++++++++++++++++++");
            //if (results[0].password === msg.password) {
            if(true){
                res.code = "200";
                res.value = "User valid";
                res.data = results;
            }
            else{
                res.code = "402";
                res.value = "User password not valid";
                res.data = null;
            }
        }
        callback(null,res);
    } , selectQuery)

}



//****************************************************************************************************************************

function register(msg,callback){

    var res={};
    console.log("------------");
    console.log(msg)
    console.log("------------");
    var insertQuery="insert into USER(email,password,user_role) values('"+msg.email+"','"+msg.password+"','USER');";
    console.log(insertQuery);
    var selectQuery = "select email from user where email='"+msg.email+"';";

    mysql.fetchData(function (err,results) {
        if(err){
            res.code = "401";
            res.value = "cannot fetch the user query";
        }
        else{
            if(results.length>0){
                res.code=401;
                res.value = "user already exists";

            }
            else{
                mysql.executeQuery(function(err){
                    if(err){
                        throw err;
                        res.code = "401";
                        res.value=" Error Occured while registering ";
                    }
                    else{

                        res.code = "200";
                        res.value = "User successfully registered";

                    }callback(null,res);
                },insertQuery);
            }
        }callback(null,res);

    },selectQuery)



}

//****************************************************************************************************************************

function update(msg,callback) {
    var res={};
    console.log(msg);
    var updateQuery = "update user set password='"+msg.password+"' where email='"+msg.email+"';";
    mysql.executeQuery(function(err){
        if(err){
            throw err;
            res.code = "401";
            res.value=" Error Occured while registering ";
        }
        else{

            res.code = "200";
            res.value = "User successfully registered";

        }callback(null,res);
    },updateQuery);

}


//****************************************************************************************************************************

function bookinghistory(msg,callback){
    var res={};
    console.log(msg);

    var search = "select booking_type , billing_amount,flight_trip_type,car_trip_type,room_type,billing_amount,billing_date,source_city,destination_city,booking_class from billing where user_email='"+msg.email+"';" ;

    mysql.fetchData(function (err,results) {
        if(err){
            throw err;
            res.code = "401";
            res.value = " error while fetching the data";
        }
        else{
            if(results.length>0) {
                res.code = "200";
                res.value = "Data successfully fetched";
                res.data = results;


                console.log(res.data[0].booking_type);
            }
            else{
                res.code = 401;
                res.value = "No bookings found for the user";
            }
        }
        callback(null,res);
    },search)


}

//****************************************************************************************************************************


//****************************************************************************************************************************
function deleteuser(msg,callback) {
    var res = {};
    console.log(msg);

    var delquery = "delete from user where email='"+msg.email+"';";

    mysql.executeQuery(function(err){
        if(err){
            throw err;
            res.code = "401";
            res.value=" Error Occured while registering ";
        }
        else{

            console.log("User succesfully deleted from the user table");
            var deletebilling = "delete from billing where email='"+msg.email+"';";   //need to change this quesry to handle the
            //non exiisting record in the billing table
            mysql.executeQuery(function(err){
                if(err){
                    throw err;
                    res.code = "401";
                    res.value=" Error Occured while registering ";
                }
                else{

                    res.code = "200";
                    res.value = "User successfully deleted from all the tables";

                }callback(null,res);
            },deletebilling);
        }
    },delquery);





    callback(null,"test");

}
//****************************************************************************************************************************


exports.deleteuser = deleteuser;
exports.bookinghistory = bookinghistory;
exports.update = update ;
exports.register = register ;
exports.login = login;