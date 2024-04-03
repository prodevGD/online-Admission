let con = require("./connection");
const bodyParser = require("body-parser");
let express = require("express");
let router = express();

router.set("view engine", "ejs");
router.use("/public", express.static("public"));
router.use(bodyParser.urlencoded({ extended: true }));
let t = "Hostel";

router.get("/", (req, res) => {
  // You can pass data to the view if needed
  let data = { message: "hiii" };
 
  res.render('login.ejs')
  //res.render('data')

});

con.connect((error, result) => {


  if (error) throw error;
  console.log("Connection successful");
// query for hostel 
  
  router.get("/hostel", (req, res) => {
    let hq = "select * from hostel";
    con.query(hq, (error, result) => {
        res.render("hostel.ejs", { hostels: result });
    });
    
  });
  router.get("/places",(req,res) => {
    let pq = "select *from places";
    con.query(pq,(error,result) => {
        res.render ("places.ejs",{ placess : result});

    });
 });

 router.get("/carrent",(req,res) => {
  let cr = "select *from carrent";
  con.query(cr,(error,result) => {
      res.render ("carrent.ejs",{ carrents : result});

  });
});




router.get("/register", (req, res) => {
  res.render("reg_users");
});

// Handle form submission
router.post("/register", (req, res) => {
  const { name, mail, mob, rooms_needed } = req.body;

  // Exclude 'id' from the field list since it's auto-incrementing
  const query = "INSERT INTO reg_users (name, mail, mob, rooms_needed) VALUES (?, ?, ?, ?)";
  
  con.query(query, [name, mail, mob, rooms_needed], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
      } else {
          res.send("Registration successful!");
      }
  });
});



// ... (your existing code)

// Render the user registration form
router.get("/registerUser", (req, res) => {
  res.render("users");
});

// Handle user registration form submission
router.post("/registerUser", (req, res) => {
  const { mail, password } = req.body;

  // Exclude 'id' from the field list since it's auto-incrementing
  const query = "INSERT INTO users (mail, password) VALUES (?, ?)";
  
  con.query(query, [mail, password], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
      } else {
          res.send("User registration successful!");
      }
  });
});


//

router.get("/login", (req, res) => {
  res.render("login");
});

// Handle user login form submission
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check user credentials in the 'users' table
  const query = "SELECT * FROM users WHERE mail = ? AND password = ?";
  
  con.query(query, [email, password], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
      } else {
          if (result.length > 0) {
            res.sendFile(__dirname + "/index.html");
          } else {
              res.send("Invalid credentials. Please try again.");
          }
      }
  });
});

// ... (your existing code)

// Render the admin login page
router.get("/adminLogin", (req, res) => {
  res.render("adminLogin");
});

// Handle admin login form submission
router.post("/adminLogin", (req, res) => {
  const { email, password } = req.body;

  // Check admin credentials in the 'admin' table
  const query = "SELECT * FROM admin WHERE mail = ? AND password = ?";
  
  con.query(query, [email, password], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
      } else {
          if (result.length > 0) {
              res.redirect('admin_page')
          } else {
              res.send("Invalid admin credentials. Please try again.");
          }
      }
  });
});
//
router.get('/admin_page',(req,res)=>{
  res.render('admin_page.ejs');
})

//

router.get("/adminLogin", (req, res) => {
  res.render("adminLogin");
});

// Handle admin login form submission
// router.post("/adminLogin", (req, res) => {
//   const { mail, password } = req.body;

//   // Check admin credentials in the 'admin' table
//   const query = "SELECT * FROM admin WHERE email = ? AND password = ?";
  
//   con.query(query, [mail, password], (err, result) => {
//       if (err) {
//           console.error(err);
//           res.status(500).send("Internal Server Error");
//       } else {
//           if (result.length > 0) {
//               res.redirect('admin_page')
//           } else {
//               res.send("Invalid admin credentials. Please try again.");
//           }
//       }
//   });
// });


// //

router.get("/request_hostel", (req, res) => {
  let rq = "SELECT * FROM reg_users";
  con.query(rq, (error, result) => {
      res.render("request_hostel", { regUsers: result });
  });
});



router.get("/request_hostel", (req, res) => {
  let rq = "SELECT * FROM reg_users";
  con.query(rq, (error, result) => {
      res.render("request_hostel", { regUsers: result });
  });
});

// Handle user deletion
router.post("/deleteUser", (req, res) => {
  const userId = req.body.userId;

  // Retrieve the user's mobile number
  const getUserMobQuery = "SELECT mob FROM reg_users WHERE id = ?";
  con.query(getUserMobQuery, [userId], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      const userMob = result[0].mob;

      // Implement the delete logic based on the unique mobile number
      const deleteUserQuery = "DELETE FROM reg_users WHERE mob = ?";
      con.query(deleteUserQuery, [userMob], (deleteError, deleteResult) => {
        if (deleteError) {
          console.error(deleteError);
          res.status(500).send("Error deleting user");
        } else {
          // Redirect to the updated page after deletion
          res.redirect("/request_hostel");
        }
      });
    }
  });
});



//

router.get("/car_reg", (req, res) => {
  res.render("car_reg");
});

// Handle car reservation form submission
router.post("/submitCarReservation", (req, res) => {
  const { name, mail, mob, destination } = req.body;

  // Implement your logic to insert the car reservation into the database
  const insertCarReservationQuery = "INSERT INTO car_reg (name, mail, mob, destination) VALUES (?, ?, ?, ?)";

  con.query(insertCarReservationQuery, [name, mail, mob, destination], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error submitting car reservation");
    } else {
      // After submission, you may want to redirect to a thank-you page or the home page
      res.redirect("/");
    }
  });
});


//
router.get("/req_car", (req, res) => {
  let carReservationsQuery = "SELECT * FROM car_reg";
  con.query(carReservationsQuery, (error, result) => {
      if (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
      } else {
          res.render("req_car", { carReservations: result });
      }
  });
});
//

// ... (your existing code)

// Handle car reservation deletion by mobile number
// Handle car reservation deletion by mobile number
router.post("/deleteCarReservation", (req, res) => {
  const mobileNumber = req.body.mob;

  console.log("Mobile Number to delete:", mobileNumber);

  // Implement your logic to delete the car reservation with the given mobile number
  const deleteCarReservationQuery = "DELETE FROM car_reg WHERE mob = ?";

  con.query(deleteCarReservationQuery, [mobileNumber], (error, result) => {
      if (error) {
          console.error("Error deleting car reservation:", error);
          res.status(500).send("Error deleting car reservation");
      } else {
          console.log("Deletion successful");
          // Redirect to the updated page after deletion
          res.redirect("/req_car");
      }
  });
});



//


// admission  form

router.use('/admission',(req,res)=>{
  res.render('admission_form.ejs');
})

router.post('/submit_ad', (req, res) => {
  const formData = req.body;
  insertAdmissionData(formData, (err) => {
    if (err) {
      console.error('Error inserting admission data:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Admission form submitted successfully!');
    }
  });
});

const insertAdmissionData = (data, callback) => {
  const { collegeMail, cetScore, branch, contact } = data;
  const sql = 'INSERT INTO admission (college_mail, cet_score, branch, contact) VALUES (?, ?, ?, ?)';
  con.query(sql, [collegeMail, cetScore, branch, contact], (err) => {
    callback(err);
  });
};



//

router.listen(4500, () => {
  console.log("Server is running on port 4500");
});

});

