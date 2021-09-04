const { createReadStream } = require("fs");
const path = require("path");

async function servePage(res, next, file){
    try {
        console.log(path.join(__dirname, '../', 'static', file));
        const readStream = createReadStream(path.join(__dirname, '../', 'static', file));
        readStream.pipe(res);
        readStream.on("end",()=>{
            res.end();
        })
    } catch (error) {
        next(error);
    }
}

module.exports=servePage;