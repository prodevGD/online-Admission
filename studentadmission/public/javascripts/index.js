// index.js

document.addEventListener("DOMContentLoaded", function () {
    // Get the tabs by class name
    const applicantTab = document.querySelector(".applicant");
    const coursesTab = document.querySelector(".courses");
    const paymentTab = document.querySelector(".payment");
    const applicationTab = document.querySelector(".application");
    const adminTab = document.querySelector(".admin");
  
    // Function to handle tab click
    function handleTabClick(tabName) {
      console.log(`Clicked on ${tabName} tab`);
      // Add your custom logic for each tab click here

    }
    function openRoute(route) {
        window.location.href = route;
      }
  
    // Add onclick event listeners to each tab
    applicantTab.addEventListener("click", function () {
        console.log("hii")
       // openRoute('/applicant')
       window.open('applicant.html', "_blank");
      handleTabClick("Applicant");
    });
  
    coursesTab.addEventListener("click", function () {
      handleTabClick("Courses");
    });
  
    paymentTab.addEventListener("click", function () {
      handleTabClick("Payment");
    });
  
    applicationTab.addEventListener("click", function () {
      handleTabClick("Application");
    });
  
    adminTab.addEventListener("click", function () {
      handleTabClick("Admin");
    });
  });
  