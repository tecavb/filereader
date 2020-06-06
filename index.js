let express = require("express");

let app = express();
app.use(express.static("html"))

app.listen(8081,()=>{
    console.log('8081')
})