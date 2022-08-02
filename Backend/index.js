const conect_server = require("./src/config/db.js")
const  app = require("./src/routers/router.js")
require('dotenv').config()
const port = process.env.PORT;
app.listen(port,async()=>{
        try {
            await conect_server()
            console.log(`server listening at http://localhost:${port}`)
        } catch (error) {
            console.log({error:error.message})
        }
})