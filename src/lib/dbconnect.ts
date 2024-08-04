import mongoose from "mongoose"





type ConnectionObject ={
    isConnected? : number
}

const connection : ConnectionObject ={

}


async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Database already connectd")
        return
    }

    try {
      const db = await mongoose.connect(process.env.MONO_URI || '' , {});
       connection.isConnected = db.connections[0].readyState;

       console.log('connected to MONGODB')
         
    } catch (error) {
        console.log("Database connectin failed" , error)

        process.exit()
    }
}

export default dbConnect;