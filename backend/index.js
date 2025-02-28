const express = require('express');
const mongoose = require("mongoose")
const port = 5000
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.listen(port, () => {
   try {
      console.log(`server running in ${port}`);
      // mongoose.connect("mongodb+srv://antonyaug99:pKWyMHOFZlg3uDRJ@cluster0.mrika.mongodb.net/db_district")
       mongoose.connect("mongodb+srv://antonyaug99:pKWyMHOFZlg3uDRJ@cluster0.mrika.mongodb.net/db_watch")
      console.log("DB connected");
   } catch (err) {
      console.error(err.message);
      process.exit(1)
   }
})
const districtSchema = new mongoose.Schema({
   districtName: {
      type: String,
      required: true,
      unique : true
   },
  
})

const District = mongoose.model("District", districtSchema)  //District enna peru placeil use cheyunnu foeign key conceptil

app.post("/DistrictPost", async (req, res) => {
   try {
      const { districtName } = req.body;
      let district = await District.findOne({ districtName })
      if (district) {
         return res.send({ message: "district already exists" })
      }
      district = new District({
         districtName
      })
      await district.save();
      res.json({ message: "District inserted successfully" })
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Internal server error")
   }
})
app.get("/DistrictPost",async(req,res)=>{

   try{

      const district=await District.find();
      if(district.length==0)
      {
         return res.json({message:"District not found",district:[]});   
         }
         else
         {
            res.send({district}).status(200);
         }
   }catch(err){

      console.error("error finding District",err);
      res.status(500).json({message:"internal server error"});
   }


})
app.delete("/DistrictDelete/:id",async (req,res) => {
   try {
      const id = req.params.id;
      const deleteDistrict = await District.findByIdAndDelete(id)
      if(!deleteDistrict){
         return res.send({message : "District not found "})
      }else{
         res.json({message : "District deleted successfully",deleteDistrict})
      }
   } catch (err) {
      console.error("Error deleting district",err);
      res.status(500).send("Internal server error")
      
   }   
   })
app.get("/DistrictById/:id",async(req,res)=>{

   try{
      const id = req.params.id;
      const district = await District.findById(id)
      if(!district){
         res.json({message : "District updated successfully",district:{}})
      }else{
          res.send({district}).status(200);
      }
   } catch (err) {
      console.error("Error deleting district",err);
      res.status(500).send("Internal server error")
      
   }   
   })
   app.put("/District/:id",async(req,res)=>
   {
      try{

      const id = req.params.id;
      const {districtName}=req.body;
      let district =await District.findByIdAndUpdate(id,{districtName},{new:true})
       res.json({message : "District update successfully"})
      } catch (err){
      console.error("Error deleting district",err);
      res.status(500).send("Internal server error")
      
   }  
});




 const placeSchema = new mongoose.Schema({

   districtId:{                                             //Foreign key Concept
      type:mongoose.Schema.Types.ObjectId,
      ref:"District",                                         //
   },
   placeName: {
      type: String,
       required: true,
     unique : true
   }
 })

 const Place = mongoose.model("Place", placeSchema)

 app.post("/PlacePost", async (req, res) => {
       try {
      const { placeName, districtId } = req.body;
      let place = await Place.findOne({ placeName })
      if (place) {
         return res.send({ message: "place already exists" })
      }
      place = new Place({
    placeName,  districtId
      })
      await place.save();
      res.json({ message: "Place inserted successfully" })
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Internal server error")
   }
})
 app.get("/PlacePost", async (req, res) => {
   try {
      const place = await Place.find().populate("districtId");
      if (place.length === 0) {
         return res.json({ message: "Place not found", place: [] });
      } else {
         res.send({place }).status(200);
      }
   } catch (err) {
      console.error("Error finding places", err);
      res.status(500).json({ message: "Internal server error" });
   }
});
app.delete("/PlaceDelete/:id",async (req,res) => {
   try {
      const id = req.params.id;
      const deletePlace = await Place.findByIdAndDelete(id)
      if(!deletePlace){
         return res.send({message : "Place not found "})
      }else{
         res.json({message : "Place deleted successfully",deletePlace})
      }
   } catch (err) {
      console.error("Error deleting district",err);
      res.status(500).send("Internal server error")
      
   }   
   })
app.get("/PlaceById/:id",async(req,res)=>{

   try{
      const id = req.params.id;
      const place = await Place.findById(id)
      if(!place){
         res.json({message : "District updated successfully",place:{}})
      }else{
          res.send({place}).status(200);
      }
   } catch (err) {
      console.error("Error deleting place",err);
      res.status(500).send("Internal server error")
      
   }   
   })
   app.put("/Place/:id",async(req,res)=>
   {
      try{

      const id = req.params.id;
      const {placeName}=req.body;
      let place =await Place.findByIdAndUpdate(id,{placeName},{new:true})
       res.json({message : "place update successfully"})
      } catch (err){
      console.error("Error deleting district",err);
      res.status(500).send("Internal server error")
      
   }  
});
//Admin
const adminSchemeStructure=new mongoose.Schema({

   adminName:{
       type:String,
       required:true,
   },
   adminEmail:{
       type:String,
       required:true,
       unique:true,

   },
   adminPassword:{
           type:String,
           required:true,
           minlength:6,
   }
})
const Admin=mongoose.model("adminSchema",adminSchemeStructure);
app.post("/Admin",async(req,res)=>{

   try{
       const{adminName,adminEmail,adminPassword}=requestAnimationFrame.body;
       let admin=await Admin.findOne({adminEmail});
       if(admin){
           return res.status(400).json({errors:[{msg:"Admin already exists"}]})
       }
       admin = new Admin({
           adminName,
           adminEmail,
           adminPassword,
         });
     
         await admin.save();
     
         res.json({ message: "Admin inserted successfully" });
       } catch (err) {
         console.error(err.message);
         res.status(500).send("Server error");
       }
     });
     app.post("/Login", async (req, res) => {
       try {
         const { email, password } = req.body;
       
         const admin = await Admin.findOne({
           adminEmail: email,
           adminPassword: password,
         });
         
        
         if (admin) {
           res.send({
             id: admin._id,
             login: "Admin",
           });
         }
         if (!admin) {
           res.send({
             login: "error",
           });
         }
       } catch (err) {
         console.error("Error", err);
       }
     });
     const userSchema = new mongoose.Schema({
      placeId:{                                             //Foreign key Concept
         type:mongoose.Schema.Types.ObjectId,
         ref:"Place",                                         //
      },
      

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    state:
    {
      type: String,
      required: true,
    },
    pinCode:{

         type:String,
         required:true,
    },
    place: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
    proofImage: {
        type: String,
        required: true,
    }
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);
     
     
     const PATH = "./public/images";
     const upload = multer({
       storage: multer.diskStorage({
         destination: PATH,
         filename: function (req, file, cb) {
           let origialname = file.originalname;
           let ext = origialname.split(".").pop();
           let filename = origialname.split(".").slice(0, -1).join(".");
           cb(null, filename + "." + ext);
         },
       }),
     });
     app.post('/userReg', upload.fields([{ name: 'proof' }, { name: 'photo' }]), async (req, res) => {
      try {
          // Log the received data and files
          console.log('Received data:', req.body);
          console.log('Received files:', req.files);
   
          const { name, email, address, contact, districtId,state, placeId ,pinCode} = req.body;
          const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
   
   
          const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
          const proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;
   
     
          const newUser = new User({
             name,
             email,
             address,
             contact,
             districtId,
             placeId,
             state,
             pinCode,
             profileImage: profileimgsrc,
             proofImage: proofimgsrc,
          });
   
         
          await newUser.save();
          res.status(200).json({ message: 'Registration successful', data: newUser });
   
      } catch (error) {
          console.error('Error during user registration:', error);
          res.status(500).json({ message: 'Error registering user. Please try again.' });
      }
   });
   //Used to display Customer
   app.get('/userReg', async (req, res) => {
      try {
        const users = await User.find(); // Get all users from the database
        res.status(200).json({ user: users });
      } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
      }
    });
    