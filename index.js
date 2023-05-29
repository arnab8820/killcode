import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 3400;

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get("/status", (req, res)=>{
    try{
        if(fs.existsSync("./killdata.txt")){
            const data = JSON.parse(fs.readFileSync("./killdata.txt", { encoding: "utf8", flag: "r" }));
            if(data.killStatus===true){
                res.status(200).send({
                    status: true
                })
                return;
            }
        }

        res.status(200).send({
            status: false
        })
    } catch {
        res.status(200).send({
            status: false
        })
    }
})

app.post("/set", (req, res)=>{
    try{
        const killState = req.body.status===true?true:false;
        fs.writeFileSync("./killdata.txt", JSON.stringify({
            killStatus: killState
        }))
        res.status(200).send({
            status: "ok"
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            status: "error",
            message: error.message
        })
    }
})

app.use(cors());

app.listen(PORT, ()=>{
    console.log("Server started");
})