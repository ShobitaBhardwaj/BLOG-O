import mongoose from "mongoose"
const dev="mongodb://127.0.0.1:27017/blogo/"
const Connection =async(username,password)=>{
    const URL =`mongodb+srv://${username}:${password}@cluster0.h5n88jx.mongodb.net/?retryWrites=true&w=majority`
   //  const URL = dev
 try   {

    await mongoose.connect(URL);
    console.log('Database connected successfully');
 } catch(error){
    console.log('Error wile conecting ', error);
 }
}

export default Connection; 