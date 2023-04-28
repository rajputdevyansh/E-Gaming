const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://0.0.0.0:27017/GameSite";
const client = new MongoClient(uri, { useNewUrlParser: true });

let upbtn = document.getElementById("upbtn");
upbtn.addEventListener("click", (event) => {
  event.preventDefault();

  client.connect(err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Connected successfully to server");
      const db = client.db("GameSite");
      const collection = db.collection("Users");

      // Get the form data
      const username = document.querySelector("#userH input").value;
      const fullName = document.querySelector("#nameH input").value;
      const email = document.querySelector("#emailH input").value;
      const password = document.querySelector("#passH input").value;

      // Insert the form data into the Users collection
      collection.insertOne({
        username: username,
        fullName: fullName,
        email: email,
        password: password
      }, (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Document inserted:", result);

          // Redirect to a different page
          window.location.href = "/success.html";
        }
        client.close();
      });
    }
  });
});