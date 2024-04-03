let con = require('./connection')
let query = "select * from hostel"
con.connect((error,result)=>{
    if(error) throw error;
    con.query(query, (error,result)=>{
        console.log(result);
    });
});