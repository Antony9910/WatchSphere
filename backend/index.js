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
      unique: true
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
app.get("/DistrictPost", async (req, res) => {

   try {

      const district = await District.find();
      if (district.length == 0) {
         return res.json({ message: "District not found", district: [] });
      }
      else {
         res.send({ district }).status(200);
      }
   } catch (err) {

      console.error("error finding District", err);
      res.status(500).json({ message: "internal server error" });
   }


})
app.delete("/DistrictDelete/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteDistrict = await District.findByIdAndDelete(id)
      if (!deleteDistrict) {
         return res.send({ message: "District not found " })
      } else {
         res.json({ message: "District deleted successfully", deleteDistrict })
      }
   } catch (err) {
      console.error("Error deleting district", err);
      res.status(500).send("Internal server error")

   }
})
app.get("/DistrictById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const district = await District.findById(id)
      if (!district) {
         res.json({ message: "District updated successfully", district: {} })
      } else {
         res.send({ district }).status(200);
      }
   } catch (err) {
      console.error("Error deleting district", err);
      res.status(500).send("Internal server error")

   }
})
app.put("/District/:id", async (req, res) => {
   try {

      const id = req.params.id;
      const { districtName } = req.body;
      let district = await District.findByIdAndUpdate(id, { districtName }, { new: true })
      res.json({ message: "District update successfully" })
   } catch (err) {
      console.error("Error deleting district", err);
      res.status(500).send("Internal server error")

   }
});




const placeSchema = new mongoose.Schema({

   districtId: {                                             //Foreign key Concept
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",                                         //
   },
   placeName: {
      type: String,
      required: true,
      unique: true
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
         placeName, districtId
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
         res.send({ place }).status(200);
      }
   } catch (err) {
      console.error("Error finding places", err);
      res.status(500).json({ message: "Internal server error" });
   }
});
app.delete("/PlaceDelete/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deletePlace = await Place.findByIdAndDelete(id)
      if (!deletePlace) {
         return res.send({ message: "Place not found " })
      } else {
         res.json({ message: "Place deleted successfully", deletePlace })
      }
   } catch (err) {
      console.error("Error deleting district", err);
      res.status(500).send("Internal server error")

   }
})
app.get("/PlaceById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const place = await Place.findById(id)
      if (!place) {
         res.json({ message: "District updated successfully", place: {} })
      } else {
         res.send({ place }).status(200);
      }
   } catch (err) {
      console.error("Error deleting place", err);
      res.status(500).send("Internal server error")

   }
})
app.put("/Place/:id", async (req, res) => {
   try {

      const id = req.params.id;
      const { placeName } = req.body;
      let place = await Place.findByIdAndUpdate(id, { placeName }, { new: true })
      res.json({ message: "place update successfully" })
   } catch (err) {
      console.error("Error deleting district", err);
      res.status(500).send("Internal server error")

   }
});
//Admin
const adminSchemeStructure = new mongoose.Schema({

   adminName: {
      type: String,
      required: true,
   },
   adminEmail: {
      type: String,
      required: true,
      unique: true,

   },
   adminPassword: {
      type: String,
      required: true,
      minlength: 6,
   }
})
const Admin = mongoose.model("adminSchema", adminSchemeStructure);
app.post("/Admin", async (req, res) => {

   try {
      const { adminName, adminEmail, adminPassword } = req.body;
      let admin = await Admin.findOne({ adminEmail });
      if (admin) {
         return res.status(400).json({ errors: [{ msg: "Admin already exists" }] })
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

      // Check if it's an admin
      const admin = await Admin.findOne({
         adminEmail: email,
         adminPassword: password,
      });

      if (admin) {
         return res.send({
            id: admin._id,
            login: "Admin",

         });
      }

      // Check if it's a user
      const user = await User.findOne({
         email: email,
         password: password,

      });

      if (user) {
         return res.send({
            id: user._id,
            login: "User",
         });
      }

      // Check if it's a seller
      const seller = await Seller.findOne({
         email: email,
         password: password,
      });

      if (seller) {
         if(seller.isApproved){
         return res.send({
            id: seller._id,
            login: "Seller",
         });
      }
      }
      const shop=await Shop.findOne({

         email:email,password:password,
      })
      if (shop) {
         if(shop.isApproved){
         return res.send({
            id: shop._id,
            login: "Shop",
         });
      }
      }
      const agent =await Agent.findOne({

         email:email,password:password,
      })
      if(agent){
         if(agent.isApproved)
         {
         return res.send({
            id:agent._id,
            login:"Agent",
         })
      }
   }

      // If no match is found for admin, user, or seller
      return res.send({
         login: "error",
      });
   } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).send({
         message: "Internal Server Error",
      });
   }
});


const userSchema = new mongoose.Schema({
   placeId: {                                             //Foreign key Concept
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",                                         //
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
   pinCode: {

      type: String,
      required: true,
   },
   place: {
      type: String,
      required: true,
   },
   //  place: {
   //      type: String,
   //      required: true,
   //  },
   profileImage: {
      type: String,
      required: true,
   },
   proofImage: {
      type: String,
      required: true,
   }, password: {
      type: String,
      required: true,
      minlength: 6,
   },
   confirmPassword: {
      type: String,
      required: true,
      minlength: 6,
   },
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

      const { name, email, address, contact, district, state, place, pinCode, password, confirmPassword } = req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
      console.log(fileValue);


      const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
      const proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;


      const newUser = new User({
         name,
         email,
         address,
         contact,
         district,
         place,
         state,
         pinCode, password, confirmPassword,
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

// Route to get a user by their ID
app.get(`/userReg/:id`, async (req, res) => {
   try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
   } catch (err) {
      res.status(500).json({ message: 'Error fetching user', error: err });
   }
});

const sellerSchema = new mongoose.Schema({

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

   password: {
      type: String,
      required: true,
      minlength: 5,
   },
   confirmPassword: {
      type: String,
      required: true,
      minlength: 5,
   },
   //  place: {
   //      type: String,
   //      required: true,
   //  },
   profileImage: {
      type: String,
      required: true,
   },
   proofImage: {
      type: String,
      required: true,

   },
   isApproved: {
      type: Boolean,
      default: false,
   },
   contact: {
      type: String,
      required: true,
   },

});

// Create the User model from the schema
const Seller = mongoose.model('Seller', sellerSchema);



app.post('/sellerReg', upload.fields([{ name: 'proof' }, { name: 'photo' }]), async (req, res) => {
   try {
      // Log the received data and files
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { name, email, address, contact, password, confirmPassword } = req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};


      var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
      var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;



      const newSeller = new Seller({
         name,
         email,
         address,
         contact,
         password,
         confirmPassword,
         profileImage: profileimgsrc,
         proofImage: proofimgsrc,
      });


      await newSeller.save();
      res.status(200).json({ message: 'Registration successful', data: newSeller });
      

   } catch (error) {
      console.error('Error during Seller registration:', error);
      res.status(500).json({ message: 'Error registering user. Please try again.' });
   }
});

app.get('/sellerReg', async (req, res) => {
   try {
      const sellers = await Seller.find(); // Get all users from the database
      res.status(200).json({ seller: sellers });
   } catch (err) {
      res.status(500).json({ message: 'Error fetching seller', error: err });
   }
});

//Seller Approval By Admin
app.post('/SellerReg/:id', async (req, res) => {
   const { id } = req.params;
 
   try {
     const seller = await Seller.findById(id); 
     if (!seller) {
       return res.status(404).send({ message: 'Seller not found' });
     }
 
 
     seller.isApproved = true;   //Update to true when Approve
     await seller.save();
 
     res.status(200).send({ message: 'Seller approved successfully' });
   } catch (err) {
     console.error(err);
     res.status(500).send({ message: 'Error approving seller' });
   }
 });
 

app.get(`/sellerReg/:id`, async (req, res) => {
   try {
      const id = req.params.id;
      const seller = await Seller.findById(id);
      if (!seller) {
         return res.status(404).json({ message: 'Seller not found' });
      }
       isApproved = true;
      await seller.save();
      res.status(200).json({ message: 'Seller approved successfully', seller });  // Ensure the structure is `{ user: userData }`
   } catch (err) {
      res.status(500).json({ message: 'Error fetching seller', error: err });
   }
});

app.get(`/sellerPro/:id`, async (req, res) => {
   try {
      const id = req.params.id;
      const seller = await Seller.findById(id);
      if (!seller) {
         return res.status(404).json({ message: 'Seller not found' });
      }
      // isApproved = true;
      await seller.save();
      res.status(200).json({ message: 'Seller approved successfully', seller });  // Ensure the structure is `{ user: userData }`
   } catch (err) {
      res.status(500).json({ message: 'Error fetching seller', error: err });
   }
});
//Delete Seller -Admin
app.delete("/sellerReg/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteSeller = await Seller.findByIdAndDelete(id)
      if (!deleteSeller) {
         return res.send({ message: "Seller not found " })
      } else {
         res.json({ message: "Seller deleted successfully", deleteSeller })
      }
   } catch (err) {
      console.error("Error deleting district", err);
      res.status(500).send("Internal server error")

   }
})

app.get("/UserRegById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const user = await User.findById(id)
      if (!user) {
         res.json({ message: "User updated successfully", user: {} })
      } else {
         res.send({ user }).status(200);
      }
   } catch (err) {
      console.error("Error deleting user", err);
      res.status(500).send("Internal server error")

   }
})

app.put("/UserRegById/:id", async (req, res) => {
   try {

      const id = req.params.id;

      const { name, email, address, contact, state,password,confirmPassword,district,place } = req.body;
      let user = await User.findByIdAndUpdate(id, {name, email, address, contact, state, password, confirmPassword,district,place},{new:true})
      res.json({ message: "User update successfully" })
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error")

   }
});
//seller
app.get("/SellerRegById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const seller = await Seller.findById(id)
      if (!seller) {
         res.json({ message: "User updated successfully", seller: {} })
      } else {
         res.send({ seller }).status(200);
      }
   } catch (err) {
      console.error("Error deleting user", err);
      res.status(500).send("Internal server error")

   }
})

//seller Update
app.put("/SellerRegById/:id", async (req, res) => {
   try {

      const id = req.params.id;

      const { name, email, address,password,confirmPassword,contact } = req.body;
      console.log(req.body)
      let seller = await Seller.findByIdAndUpdate(id, { name, email, address,password,confirmPassword,contact }, { new: true })
      res.json({ message: "Seller update successfully" })
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error")

   }
});
//Profile
app.get("/SellerProfileById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const seller = await Seller.findById(id)
      if (!seller) {
         res.json({ message: "User  profile updated successfully", seller: {} })
      } else {
         res.send({ seller }).status(200);
      }
   } catch (err) {
      console.error("Error deleting user", err);
      res.status(500).send("Internal server error")

   }
})
app.put("/SellerProfileById/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const { profileImage } = req.body;

    
      let seller = await Seller.findByIdAndUpdate(id, { profileImage }, { new: true });
      
      if (!seller) {
         return res.status(404).json({ message: "Seller not found" });
      }

      res.json({ message: "Seller profile updated successfully", seller });
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error");
   }
});


app.post('/SellerUploadById/:id', upload.fields([{ name: 'photo' }]), async (req, res) => {
   try {
      
       console.log('Received files:', req.files);

       const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
       const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;

    
       const sellerId = req.params.id;
       const seller = await Seller.findByIdAndUpdate(
           sellerId,
           { profileImage: profileimgsrc },
           { new: true }
       );

       if (!seller) {
           return res.status(404).json({ message: 'Seller not found' });
       }

       res.status(200).json({ message: 'Profile updated successfully', data: seller });
   } catch (error) {
       console.error('Error during Seller upload:', error);
       res.status(500).json({ message: 'Error uploading profile. Please try again.' });
   }
});
//User Image Edit
app.get("/UserProfileById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const user = await User.findById(id)
      if (!user) {
         res.json({ message: "User  profile updated successfully", user: {} })
      } else {
         res.send({ user }).status(200);
      }
   } catch (err) {
      console.error("Error  user", err);
      res.status(500).send("Internal server error")

   }
})
app.put("/UserProfileById/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const { profileImage } = req.body;

    
      let user = await User.findByIdAndUpdate(id, { profileImage }, { new: true });
      
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Seller profile updated successfully", user });
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error");
   }
});


app.post('/UserUploadById/:id', upload.fields([{ name: 'photo' }]), async (req, res) => {
   try {
      
       console.log('Received files:', req.files);

       const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
       const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;

    
       const userId = req.params.id;
       const user = await User.findByIdAndUpdate(
           userId,
           { profileImage: profileimgsrc },
           { new: true }
       );

       if (!user) {
           return res.status(404).json({ message: 'Seller not found' });
       }

       res.status(200).json({ message: 'Profile updated successfully', data: user });
   } catch (error) {
       console.error('Error during User upload:', error);
       res.status(500).json({ message: 'Error uploading profile. Please try again.' });
   }
});

//shop
const shopSchema = new mongoose.Schema({
   placeId: {                                             //Foreign key Concept
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",                                         //
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
 shop:{
         type:String,
         required:true,
 },
 contact: {
   type: String,
   required: true,
},
district: {
   type: String,
   required: true,
},

place: {
   type: String,
   required: true,
},
   
   password: {
      type: String,
      required: true,
      minlength: 5,
   },
   confirmPassword: {
      type: String,
      required: true,
      minlength: 5,
   },
   //  place: {
   //      type: String,
   //      required: true,
   //  },
   profileImage: {
      type: String,
      required: true,
   },
   proofImage: {
      type: String,
      required: true,

   },
   isApproved: {
      type: Boolean,
      default: false,
   },
   placeId: {                                             
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",                                         
   },
   state:
   {
      type: String,
      required: true,
   },

});

// Create the User model from the schema
const Shop = mongoose.model('Shop', shopSchema);



app.post('/shopReg', upload.fields([{ name: 'proof' }, { name: 'photo' }]), async (req, res) => {
   try {
      // Log the received data and files
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { name, email, address,password,district,place,state,contact,confirmPassword,shop} = req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};


      var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
      var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;



      const newShop = new Shop({
         name,
         email,
         address,
         shop,
         district,place,
         password,
         contact,
         state,
         confirmPassword,
         profileImage: profileimgsrc,
         proofImage: proofimgsrc,
      });


      await newShop.save();
      res.status(200).json({ message: 'Registration successful', data: newShop });
   
   } catch (error) {
      console.error('Error during Seller registration:', error);
      res.status(500).json({ message: 'Error registering user. Please try again.' });
   }
});

app.get("/ShopRegById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const shop = await Shop.findById(id)
      if (!shop) {
         res.json({ message: "Shop updated successfully", shop: {} })
      } else {
         res.send({ shop }).status(200);
      }
   } catch (err) {
      console.error("Error deleting user", err);
      res.status(500).send("Internal server error")

   }
})
app.put("/ShopRegById/:id", async (req, res) => {
   try {

      const id = req.params.id;

      const { name, email, address,password,shop,confirmPassword,contact,district,place } = req.body;
      console.log(req.body)
      let shops = await Shop.findByIdAndUpdate(id, { name, email,shop, address,password,confirmPassword,contact,district,place }, { new: true })
      res.json({ message: "Shop update successfully" })
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error")

   }
});
app.get('/shopReg', async (req, res) => {
   try {
      const shop = await Shop.find(); // Get all users from the database
      res.status(200).json({ shop: shop });
   } catch (err) {
      res.status(500).json({ message: 'Error fetching seller', error: err });
   }
});
app.get("/ShopProfileById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const shop = await Shop.findById(id)
      if (!shop) {
         res.json({ message: "shop  profile updated successfully", shop: {} })
      } else {
         res.send({ shop }).status(200);
      }
   } catch (err) {
      console.error("Error deleting user", err);
      res.status(500).send("Internal server error")

   }
})
app.put("/ShopProfileById/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const { profileImage } = req.body;

    
      let shop = await Shop.findByIdAndUpdate(id, { profileImage }, { new: true });
      
      if (!shop) {
         return res.status(404).json({ message: "Shop not found" });
      }

      res.json({ message: "Shop profile updated successfully", shop });
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error");
   }
});


app.post('/ShopUploadById/:id', upload.fields([{ name: 'photo' }]), async (req, res) => {
   try {
      
       console.log('Received files:', req.files);

       const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
       const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;

    
       const shopId = req.params.id;
       const shop = await Shop.findByIdAndUpdate(
           shopId,
           { profileImage: profileimgsrc },
           { new: true }
       );

       if (!shop) {
           return res.status(404).json({ message: 'Shop not found' });
       }

       res.status(200).json({ message: 'Profile updated successfully', data: shop });
   } catch (error) {
       console.error('Error during Shop upload:', error);
       res.status(500).json({ message: 'Error uploading profile. Please try again.' });
   }
});
app.delete("/shopReg/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteShop = await Shop.findByIdAndDelete(id)
      if (!deleteShop) {
         return res.send({ message: "Shop not found " })
      } else {
         res.json({ message: "Seller deleted successfully", deleteShop })
      }
   } catch (err) {
      console.error("Error deleting shop", err);
      res.status(500).send("Internal server error")

   }
})

app.post(`/shopReg/:id`, async (req, res) => {
   try {
      const id = req.params.id;
      const shop = await Shop.findById(id);
      if (!shop) {
         return res.status(404).json({ message: 'Shop not found' });
      }
       shop.isApproved = true;
      await shop.save();
      res.status(200).json({ message: 'Shop approved successfully', shop }); 
   } catch (err) {
      res.status(500).json({ message: 'Error fetching shop', error: err });
   }
});   

const AgentSchema =new mongoose.Schema({

   name:{
      type:String,
      required:true,
   },
   placeId: {                                             
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",                                         
   },
   email:{

      type:String,
      required:true,
   },
   place: {
      type: String,
      required: true,
   },
   district: {
      type: String,
      required: true,
   },
   address:{
      type:String,
      required:true,
   },
   gender:{
      type:String,
      required:true,
   },
  
   password: {
      type: String,
      required: true,
      minlength: 5,
   },
   confirmPassword: {
      type: String,
      required: true,
      minlength: 5,
   },
   vehicle:{
               
      type:String,
      required:true,
   },
   profileImage: {
      type: String,
      required: true,
   },
   proofImage: {
      type: String,
      required: true,

   },
   isApproved: {
      type: Boolean,
      default: false,
   },
   VehicleNum:{

      type:String,
      required:true,
   },
   ContactPhone: {
      type:String,
      required:true,
   },
 

});
const Agent =mongoose.model('Agent',AgentSchema)

app.post('/agentRegs', upload.fields([{name:'proof'},{name:'photo'}]),async (req,res)=>
{

   try{

      console.log('Received data:',req.body);
      

      console.log('Received files',req.files);
      const {name,email,address,gender,password,district,place,vehicle, ContactPhone,confirmPassword,VehicleNum} =req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
      var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;
      var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;



      const newAgent = new Agent({
         name,
         email,
         address,
          gender,
         vehicle,
         VehicleNum,
         password,
         district,place,
         ContactPhone,
         confirmPassword,
         profileImage: profileimgsrc,
         proofImage: proofimgsrc,
      });


      await newAgent.save();
      res.status(200).json({ message: 'Registration successful', data: newAgent });
   
   } catch (error) {
      console.error('Error during Agent registration:', error);
      res.status(500).json({ message: 'Error registering Agent. Please try again.' });
   }
});
app.get("/AgentRegById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const agent = await Agent.findById(id)
      if (!agent) {
         res.json({ message: "Agent updated successfully", agent: {} })
      } else {
         res.send({ agent }).status(200);
      }
   } catch (err) {
      console.error("Error deleting Agent", err);
      res.status(500).send("Internal server error")

   }
})
//Agent Profile Update
app.put("/AgentRegById/:id", async (req, res) => {
   try {

      const id = req.params.id;

      const { name, email, address,password,place,gender,vehicle,confirmPassword,contact,VehicleNum } = req.body;
      console.log(req.body)
      let agents = await Agent.findByIdAndUpdate(id, { name, email,address,gender,vehicle,password,confirmPassword,VehicleNum,place,contact }, { new: true })
      res.json({ message: "Agent profile update successfully" })
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error")

   }
});
app.get("/AgentProfileById/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const agent = await Agent.findById(id)
      if (!agent) {
         res.json({ message: "Agent  profile updated successfully", agent: {} })
      } else {
         res.send({ agent }).status(200);
      }
   } catch (err) {
      console.error("Error deleting user", err);
      res.status(500).send("Internal server error")

   }
})
app.put("/AgentProfileById/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const { profileImage } = req.body;

    
      let agent = await Agent.findByIdAndUpdate(id, { profileImage }, { new: true });
      
      if (!agent) {
         return res.status(404).json({ message: "Agent not found" });
      }

      res.json({ message: "Agent profile updated successfully", agent });
   } catch (err) {
      console.error("Error Updating User", err);
      res.status(500).send("Internal server error");
   }
});


app.post('/AgentUploadById/:id', upload.fields([{ name: 'photo' }]), async (req, res) => {
   try {
      
       console.log('Received files:', req.files);

       const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
       const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;

    
       const agentId = req.params.id;
       const agent = await Agent.findByIdAndUpdate(
           agentId,
           { profileImage: profileimgsrc },
           { new: true }
       );

       if (!agent) {
           return res.status(404).json({ message: 'Agent not found' });
       }

       res.status(200).json({ message: 'Profile updated successfully', data: agent });
   } catch (error) {
       console.error('Error during Shop upload:', error);
       res.status(500).json({ message: 'Error uploading profile. Please try again.' });
   }
});
app.get('/agentReg', async (req, res) => {
   try {
      const agent = await Agent.find(); // Get all users from the database
      res.status(200).json({ agent: agent });
   } catch (err) {
      res.status(500).json({ message: 'Error fetching agent', error: err });
   }
});
app.delete("/agentReg/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteAgent = await Agent.findByIdAndDelete(id)
      if (!deleteAgent) {
         return res.send({ message: "Agent not found " })
      } else {
         res.json({ message: "Agent deleted successfully", deleteAgent })
      }
   } catch (err) {
      console.error("Error deleting agent", err);
      res.status(500).send("Internal server error")

   }
})
app.post("/agentRegs/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const agent = await Agent.findById(id);
      if (!agent) {
         return res.status(404).json({ message: 'Agent not found' });
      }
       agent.isApproved = true;
      await agent.save();
      res.status(200).json({ message: 'Agent approved successfully',agent }); 
   } catch (err) {
      res.status(500).json({ message: 'Error fetching shop', error: err });
   }
});   

const categorySchema=new mongoose.Schema({

   watch_Category:{

      type:String,
      required:true,
    
   },
   // user_category:{

   //    type:String,
   //    required:true,
   // }
})
const category = mongoose.model('Category', categorySchema);
app.post("/Category", async (req, res) => {
   try {
      const { watch_Category} = req.body;

    
      let existingWatchCategory = await category.findOne({ watch_Category });
      

      if (existingWatchCategory) {
         return res.status(400).json({ message: "Watch category already exists" });
      }


    
      const newCategory = new category({
         watch_Category,
         
      });

      await newCategory.save();
      res.status(201).json({ message: "Category inserted successfully", data: newCategory });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
   }
});
app.get("/CategoryPost", async (req, res) => {

   try {

      const watch = await category.find();
      if (watch.length == 0) {
         return res.json({ message: "District not found", watch: [] });
      }
      else {
         res.send({ watch }).status(200);
      }
   } catch (err) {

      console.error("error finding District", err);
      res.status(500).json({ message: "internal server error" });
   }


})
const UserCategorySchema=new mongoose.Schema({

   user_Category:{

      type:String,
      required:true,
    
   },
   // user_category:{

   //    type:String,
   //    required:true,
   // }
})
const userCategory = mongoose.model('UserCategory',  UserCategorySchema);
app.post("/UserCategory", async (req, res) => {
   try {
     const { user_Category } = req.body;
 
   
     let existingUserCategory = await userCategory.findOne({ user_Category });
 

     if (existingUserCategory) {
       return res.status(400).json({ message: "User category already exists" });
     }
 
  
     const newUserCategory = new userCategory({
       user_Category, 
     });
 
  
     await newUserCategory.save();
 
     res.status(201).json({ message: "Category inserted successfully", data: newUserCategory });
   } catch (err) {
     console.error("Error saving user category:", err);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 const ProductCategorySchema=new mongoose.Schema({

   product_Category:{

      type:String,
      required:true,
    
   },
   // user_category:{

   //    type:String,
   //    required:true,
   // }
})
const productCategory = mongoose.model('ProductCategory',  ProductCategorySchema);
app.post("/ProductCategory", async (req, res) => {
   try {
     const { product_Category } = req.body;
 
   
     let existingProductCategory = await product_Category.findOne({ product_Category });
 

     if (existingProductCategory) {
       return res.status(400).json({ message: "User category already exists" });
     }
 
  
     const newProductCategory = new productCategory({
       product_Category, 
     });
 
  
     await newProductCategory.save();
 
     res.status(201).json({ message: "Category inserted successfully", data: newProductCategory });
   } catch (err) {
     console.error("Error saving user category:", err);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.get("/ProductCategoryPost", async (req, res) => {
   try {
     const user = await productCategory.find();  // Ensure this returns an array of category objects
     if (!user || user.length === 0) {
       return res.json({ message: "No categories found", user: [] });
     }
     res.status(200).send({ user });  // Send the 'watch' field containing the data
   } catch (err) {
     console.error("Error fetching categories", err);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 
 
 
 

  
 app.get("/CategoryPost", async (req, res) => {
   try {
     const watch = await category.find();  // Ensure this returns an array of category objects
     if (!watch || watch.length === 0) {
       return res.json({ message: "No categories found", user: [] });
     }
     res.status(200).send({ watch });  // Send the 'watch' field containing the data
   } catch (err) {
     console.error("Error fetching categories", err);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.get("/UserCategoryPost", async (req, res) => {
   try {
     const user = await userCategory.find();  // Ensure this returns an array of category objects
     if (!user || user.length === 0) {
       return res.json({ message: "No categories found", user: [] });
     }
     res.status(200).send({ user });  // Send the 'watch' field containing the data
   } catch (err) {
     console.error("Error fetching categories", err);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.get("/ColorPost", async (req, res) => {
   try {
     const color = await Color.find();  // Ensure this returns an array of category objects
     if (!color || color.length === 0) {
       return res.json({ message: "No categories found", color: [] });
     }
     res.status(200).send({ color });  // Send the 'watch' field containing the data
   } catch (err) {
     console.error("Error fetching categories", err);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.get('/product', async (req, res) => {
   try {
      const products = await Product.find().populate('sellerId','name')           //.populate('sellerId)
     console.log(products);
     res.json(products);
   } catch (error) {
     res.status(500).json({ message: 'Error fetching products', error });
   }
 });
 
   

const productSchema=new mongoose.Schema({

   productName:{
         type:String,required:true,
   },
   modelNum:{
      type:String,required:true,
   },
   WatchId:
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:"category"
   },
      watch_Category:{

      type:String,
      required:true,
    
   },
    sellerId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Seller",
     
},
user_Category:{
      type:String,
      required:true,
   },
   UserId:
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:" UserCategory"
   },
   colorId:
   {
        type:mongoose.Schema.Types.ObjectId,
         ref:"color"
   },
   color: { 
      type: [String], required: true
    }, 


   price:

   {
      type:Number,required:true
   },
   discount:
   {
      type:Number,required:true
   },
   offer:{
      type:Number,required:true
   },
   profileImage: {
      type: String,
      required: true,
   },
   productDesc:{

      type:String,
      required:true,
   },
   stock:{

      type:String,
      required:true,
   }




})
const Product =mongoose.model('Product',productSchema)

app.post('/product', upload.fields([{ name: 'photo' }]), async (req, res) => {
   try {
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { productName, modelNum, colorId, price, WatchId,stock, watch_Category, UserId,color, sellerId,user_Category,offer,discount,productDesc } = req.body;
      const fileValue = req.files ? req.files.photo : [];

      if (!fileValue || fileValue.length === 0) {
         return res.status(400).json({ message: 'Product photo is required.' });
      }

      const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue[0].filename}`;

   

      // Create new product with the data
      const newProduct = new Product({
         productName,
         modelNum,
         price,
        
         WatchId,
         colorId,
         UserId,
         color,
         offer,
         sellerId,
         discount,
         stock,
         productDesc,
         watch_Category,
         user_Category,
         profileImage: profileimgsrc,
      });

      await newProduct.save();

      const populatedProduct = await Product.findById(newProduct._id)
         .populate('WatchId')
         .populate('UserId')
         .populate('colorId')
         .populate('sellerId');

    
      res.status(200).json({
         message: 'Product registration successful',
         data: populatedProduct, 
      });

   } catch (error) {
      console.error('Error during product registration:', error);
      res.status(500).json({ message: 'Error registering product. Please try again.' });
   }
});
const SpareSchema=new mongoose.Schema({

   partName:{
         type:String,required:true,
   },
   part:{
      type:Number,required:true,
   },
   material:{

      type:String,required:true,
   },
 
      watchCategory:{

      type:String,
      required:true,
    
   },
    shopId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Shop",
     
},

 
   colorId:
   {
        type:mongoose.Schema.Types.ObjectId,
         ref:"color"
   },
   color: { 
      type: [String], required: true
    }, 


   price:

   {
      type:Number,required:true
   },
   compatibility:
   {
      type:String,required:true
   },
  
   profileImage: {
      type: String,
      required: true,
   },
   productDesc:{

      type:String,
      required:true,
   },
   stock:{

      type:String,
      required:true,
   }




})
const Spare = mongoose.model('Spare',SpareSchema)

app.post('/spare', upload.fields([{ name: 'photo' }]), async (req, res) => {
   try {
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { partName, part, colorId, price,stock,material,compatibility, watchCategory, color, shopId,productDesc } = req.body;
      const fileValue = req.files ? req.files.photo : [];

      if (!fileValue || fileValue.length === 0) {
         return res.status(400).json({ message: 'Product photo is required.' });
      }

      const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue[0].filename}`;

   

      // Create new product with the data
      const newSpare = new Spare({
         partName,
         part,
         price,
        material,
        compatibility,
         colorId,
         color,
         shopId,
   
         stock,
         productDesc,
         watchCategory,
         profileImage: profileimgsrc,
      });

      await newSpare.save();

      const populatedSpare = await Spare.findById(newSpare._id)
      
         .populate('colorId')
         .populate('shopId');

    
      res.status(200).json({
         message: 'Product registration successful',
         data: populatedSpare, 
      });

   } catch (error) {
      console.error('Error during product registration:', error);
      res.status(500).json({ message: 'Error registering product. Please try again.' });
   }
});


 
const ColorSchema=new mongoose.Schema({

   color:{

      type:String,
      required:true,
    
   },
   
})

const Color = mongoose.model('Color', ColorSchema);
app.post("/ColorReg", async (req, res) => {
   try {
      const { color} = req.body;

    
      let existingColor = await Color.findOne({ color});
      

      if (existingColor) {
         return res.status(400).json({ message: "Color already exists" });
      }


    
      const newColor = new Color({
         color,
         
      });

      await newColor.save();
      res.status(201).json({ message: "Colour inserted successfully", data: newColor });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error" });
   }
});



const CartSchema = new mongoose.Schema({
   UserId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true
   },
   ProductId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Product",
     required: true
   },
  
   
   quantity: {
     type: Number,  
     required: true,
     min: 1
   },
   totalPrice:{
      type:Number,
      required:true,
   },
   BookingId:{

      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
      
   }
 });
 
 const Cart = mongoose.model("CartItem", CartSchema);
 app.post("/cart", async (req, res) => {
   try {
     const { UserId, ProductId, quantity, totalPrice,BookingId } = req.body;

     if (!UserId || !ProductId ||!quantity || !totalPrice || !BookingId) {
       return res.status(400).json({ message: "UserId, ProductId, quantity,BookingId and totalPrice are required" });
     }

     const newCart = new Cart({
       UserId,
       ProductId,  
       BookingId,
       quantity,
       totalPrice,
     });

     await newCart.save();

     res.status(201).json({
       message: "Product added to cart successfully",
       data: newCart,
     });
   } catch (err) {
     console.error("Error saving to cart:", err);
     res.status(500).json({ message: "Internal server error" });
   }
});
const watchCartSchema = new mongoose.Schema({
   UserId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true
   },
   watchId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Watch",
     required: true
   },
   WatchBookingId:{

      type: mongoose.Schema.Types.ObjectId,
      ref: "WatchBooking",
      required: true
   },
  
   
   quantity: {
     type: Number,  
     required: true,
     min: 1
   },
   totalPrice:{
      type:Number,
      required:true,
   }
 });
 
 const watchCart = mongoose.model("WatchCart", watchCartSchema);
 app.post("/watchCart", async (req, res) => {
   try {
     const { UserId, watchId, quantity, totalPrice, WatchBookingId } = req.body;

     if (!UserId || !watchId ||!quantity || !totalPrice || ! WatchBookingId) {
       return res.status(400).json({ message: "UserId, ProductId, quantity, and totalPrice are required" });
     }

     const newCart = new watchCart({
       UserId,
       watchId, 
       quantity,
       WatchBookingId,
       totalPrice,
     });

     await newCart.save();

     res.status(201).json({
       message: "Product added to cart successfully",
       data: newCart,
     });
   } catch (err) {
     console.error("Error saving to cart:", err);
     res.status(500).json({ message: "Internal server error" });
   }
});
const shopCartSchema = new mongoose.Schema({
   UserId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true
   },
   SpareId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Spare",
     required: true
   },

  ShopBookingId:{
   type: mongoose.Schema.Types.ObjectId,
   ref: "ShopBooking",
   required: true
  },
   
   quantity: {
     type: Number,  
     required: true,
     min: 1
   },
   totalPrice:{
      type:Number,
      required:true,
   }
 });
 
 const shopCart = mongoose.model("CartShop", shopCartSchema);
 app.post("/ShopCart", async (req, res) => {
   try {
     const { UserId, SpareId, quantity, totalPrice,   ShopBookingId } = req.body;

     if (!UserId || !SpareId ||!quantity || !totalPrice ||! ShopBookingId) {
       return res.status(400).json({ message: "UserId, ProductId, quantity, and totalPrice are required" });
     }

     const newCart = new shopCart({
       UserId,
       SpareId, 
      
       ShopBookingId,
       quantity,
       totalPrice,
     });

     await newCart.save();

     res.status(201).json({
       message: "Product added to cart successfully",
       data: newCart,
     });
   } catch (err) {
     console.error("Error saving to cart:", err);
     res.status(500).json({ message: "Internal server error" });
   }
});



 
//  const WatchBooking = mongoose.model("WatchBooking", watchBookingSchema);

 
 
//  const BookingSchema = new mongoose.Schema({
//    UserId: {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: "User",  // Reference to User schema
//      required: true
//    },
//    ProductId: {
//      type: mongoose.Schema.Types.ObjectId,
//      ref: "Product",  // Reference to Product schema
//      required: true
//    },
  
//    quantity: {
//      type: Number,
//      required: true,
//      min: 1
//    },
//    date: {
//      type: Date,
//      required: true
//    },
//    status: {
//      type: String,
//      enum: ["pending", "confirmed", "cancelled"],
//      default: "pending"
//    },
//  });
 
//  const Booking = mongoose.model("Booking", BookingSchema);

 
//  app.post("/booking", async (req, res) => {
//    try {
//      const { UserId, ProductId, quantity, status } = req.body;
 

//      console.log("Received booking data:", req.body);
 
//      if (!UserId || !ProductId || !quantity || !status) {
//        return res.status(400).json({ message: "UserId, ProductId,quantity, and status are required" });
//      }
 
//      const newBooking = new Booking({
//        UserId,
//        ProductId,

//        quantity,
//        date: new Date(),
//        status, 
//      });
 
//      await newBooking.save();
 
//      res.status(201).json({
//        message: "Booking created successfully",
//        booking: newBooking,
//      });
//    } catch (error) {
//      console.error("Error creating booking:", error);
//      res.status(500).json({ message: "Internal server error" });
//    }
//  });
 
 app.get("/Booking/:userId", async (req, res) => {
   try {
     const { userId } = req.params;
     const status = req.query.status || "pending"; 
     const bookings = await Booking.find({ UserId: userId, status }).populate("ProductId");
 
     res.json(bookings);
   } catch (error) {
     console.error("Error fetching cart items:", error);
     res.status(500).send("Failed to fetch cart items.");
   }
 });
 
 
 app.get("/shopBooking/:userId", async (req, res) => {
   try {
     const { userId } = req.params;
     const status = req.query.status || "pending"; 
     const bookings = await ShopBooking.find({ UserId: userId, status }).populate("ProductId");
 
     res.json(bookings);
   } catch (error) {
     console.error("Error fetching cart items:", error);
     res.status(500).send("Failed to fetch cart items.");
   }
 });
 
 

 app.get("/cart/:userId", async (req, res) => {
   const userId = req.params.userId;
   try {
     const cartItems = await Cart.find({ UserId: userId })
                                 .populate('ProductId', 'productName price profileImage modelNum color totalPrice'); // Populate both productName and price
  
     res.json(cartItems);
   } catch (error) {
     console.error("Error fetching cart items:", error);
     res.status(500).json({ error: "Failed to fetch cart items" });
   }
 });
 app.get("/watchCart/:userId", async (req, res) => {
   const userId = req.params.userId;
   try {
     const cartItems = await watchCart.find({ UserId: userId })
                                 .populate('watchId', 'company price profileImage discount color model'); // Populate both productName and price
  
     res.json(cartItems);
   } catch (error) {
     console.error("Error fetching cart items:", error);
     res.status(500).json({ error: "Failed to fetch cart items" });
   }
 });
 app.get('/ShopCart/:userId', async (req, res) => {
   try {
     const { userId } = req.params;
 
     const shopCartItems = await shopCart.find({ UserId: userId })
       .populate('SpareId', 'partName material price profileImage totalPrice color ')  
       .populate('SpareId.shopId', 'shop').populate('UserId'); 
 
    
     if (!shopCartItems || shopCartItems.length === 0) {
       return res.status(404).json({ message: "No items found in the shop cart." });
     }
 
    
     res.status(200).json(shopCartItems);
   } catch (error) {
     console.error("Error fetching shop cart items:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.get('/WatchCart/:userId', async (req, res) => {
   try {
     const { userId } = req.params;
 
     const watchCartItems = await watchCart.find({ UserId: userId })
       .populate('watchId', 'partName material price profileImage totalPrice color ')  
       .populate('watchId.shopId', 'shop').populate('UserId'); 
 
    
     if (!watchCartItems || watchCartItems.length === 0) {
       return res.status(404).json({ message: "No items found in the shop cart." });
     }
 
    
     res.status(200).json(watchhCartItems);
   } catch (error) {
     console.error("Error fetching shop cart items:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 






 app.get('/productssss/:sellerId', async (req, res) => {
   const { sellerId } = req.params; // Get the sellerId from the URL parameter
   try {
     const products = await Product.find({ sellerId: sellerId }); // Find products that belong to this seller
     res.json(products);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching products' });
   }
 });
 app.get('/spare1/:sellerId', async (req, res) => {
   const { shopId } = req.params; // Get the sellerId from the URL parameter
   try {
     const spares = await Spare.find({ shopId: shopId }); // Find products that belong to this seller
     res.json(spares);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching products' });
   }
 });
 
 app.get('/spare', async (req, res) => {
   try {
     const spare = await Spare.find().populate('shopId', 'shop');;
     res.json(spare);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching spare' });
   }
 });
 app.get('/Watch', async (req, res) => {
   try {
     const watch = await Watch.find().populate('shopId', 'shop');;
     res.json(watch);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching watch' });
   }
 });
 
 

 app.get('/product/:id', async (req, res) => {
   try {
     const product = await Product.findById(req.params.id);
     if (!product) {
       return res.status(404).json({ error: 'Product not found' });
     }
     res.json(product);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching product' });
   }
 });
 app.get("/product/:id", async (req, res) => {

   try {
      const id = req.params.id;
      const product = await Product.findById(id).populate('sellerId', 'name'); 
      if (!product) {
         res.json({ message: "Product detail Fetched", product: {} })
      } else {
         res.send({ product }).status(200);
      }
   } catch (err) {
      console.error("Error Product", err);
      res.status(500).send("Internal server error")

   }
})
app.get('/spare/:id', async (req, res) => {
   try {
     const spare = await Spare.findById(req.params.id).populate('shopId', 'shop'); ;
     if (!spare) {
       return res.status(404).json({ error: 'Product not found' });
     }
     res.json(spare);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching product' });
   }
 })
 app.get('/watch/:id', async (req, res) => {
   try {
     const watch = await Watch.findById(req.params.id).populate('shopId', 'shop'); ;
     if (!watch) {
       return res.status(404).json({ error: 'Product not found' });
     }
     res.json(watch);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching product' });
   }
 })




// app.get("/product/:id", async (req, res) => {
//    try {
//       const id = req.params.id;
//      const product = await Product.findById(id).populate('sellerId', 'name');
//      if (!product) {
//        return res.status(404).json({ error: 'Product not found' });
//      }
//      res.json({ product });
//    } catch (err) {
//      console.error("Error fetching product", err);
//      res.status(500).json({ error: 'Internal server error' });
//    }
//  });
 
 
 app.put("/product/:id", async (req, res) => {
   try {
     const {  productName,price,offer,stock,productDesc,discount } = req.body;
     const product = await Product.findByIdAndUpdate(
       req.params.id,
       { productName,price,offer,stock,productDesc,discount},
       { new: true }
     );
 
     if (!product) {
       return res.status(404).json({ error: 'Product not found' });
     }
 
     res.json({ message: "Product updated successfully", product });
   } catch (err) {
     console.error("Error updating product", err);
     res.status(500).json({ error: 'Internal server error' });
   }
 });
 app.delete("/product/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteProduct = await Product.findByIdAndDelete(id)
      if (!deleteProduct) {
         return res.send({ message: "Product not found " })
      } else {
         res.json({ message: "Product deleted successfully", deleteProduct })
      }
   } catch (err) {
      console.error("Error deleting Product", err);
      res.status(500).send("Internal server error")

   }
})
app.delete("/watch/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteWatch = await Watch.findByIdAndDelete(id)
      if (!deleteWatch) {
         return res.send({ message: "Product not found " })
      } else {
         res.json({ message: "Watch deleted successfully", deleteWatch })
      }
   } catch (err) {
      console.error("Error deleting Product", err);
      res.status(500).send("Internal server error")

   }
})
app.delete("/spare/:id", async (req, res) => {
   try {
      const id = req.params.id;
      const deleteSpare = await Spare.findByIdAndDelete(id)
      if (!deleteSpare) {
         return res.send({ message: "Product not found " })
      } else {
         res.json({ message: "Product deleted successfully", deleteSpare })
      }
   } catch (err) {
      console.error("Error deleting Product", err);
      res.status(500).send("Internal server error")

   }
})
 

app.put("/spare/:id", async (req, res) => {
   try {
     const {  partName,price,material,stock,productDesc,watchCategory,color } = req.body;
     const spare = await Spare.findByIdAndUpdate(
       req.params.id,
       { partName,price,material,stock,productDesc,watchCategory,color},
       { new: true }
     );
 
     if (!spare) {
       return res.status(404).json({ error: 'Product not found' });
     }
 
     res.json({ message: " Spare Product updated successfully", spare });
   } catch (err) {
     console.error("Error updating product", err);
     res.status(500).json({ error: 'Internal server error' });
   }
 });

 //second hand watch
 const watchSchema=new mongoose.Schema({

   model:{
         type:String,required:true,
   },
   company:{
      type:String,required:true,
   },
   WatchId:
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:"category"
   },
      watch_Category:{

      type:String,
      required:true,
    
   },
    shopId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Shop",
     
},
user_Category:{
      type:String,
      required:true,
   },
   UserId:
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:" UserCategory"
   },
   colorId:
   {
        type:mongoose.Schema.Types.ObjectId,
         ref:"color"
   },
   color: { 
      type: [String], required: true
    }, 


   price:

   {
      type:Number,required:true
   },
   discount:
   {
      type:Number,required:true
   },
   offer:{
      type:Number,required:true
   },
   profileImage: {
      type: String,
      required: true,
   },
   proofImage:{

      type:String,
      required:true,
   },
   productDesc:{

      type:String,
      required:true,
   },
   stock:{

      type:String,
      required:true,
   },
   waranty:{
            type:Number,
            required:true,
   }




})

const Watch =mongoose.model('Watch',watchSchema)

app.post('/watch', upload.fields([{ name: 'photo' },{ name: 'proof' }]), async (req, res) => {
   try {
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { model, company, waranty, colorId, price, WatchId,stock, watch_Category, UserId,color, shopId,user_Category,offer,discount,productDesc} = req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};

      if (!fileValue || fileValue.length === 0) {
         return res.status(400).json({ message: 'Product photo is required.' });
      }

      const profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
      const proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;
   

      // Create new product with the data
      const newWatch = new Watch({
         model,
     company,
         price,
        
         WatchId,
         colorId,
         UserId,
         color,
         offer,
         shopId,
         waranty,
         discount,
         stock,
         productDesc,
         watch_Category,
         user_Category,
         profileImage: profileimgsrc,
         proofImage :proofimgsrc ,
      });

      await newWatch.save();

      const populatedWatch = await Watch.findById(newWatch._id)
         .populate('WatchId')
         .populate('UserId')
         .populate('colorId')
         .populate('shopId');

    
      res.status(200).json({
         message: 'Product registration successful',
         data: populatedWatch, 
      });

   } catch (error) {
      console.error('Error during product registration:', error);
      res.status(500).json({ message: 'Error registering product. Please try again.' });
   }
});
app.put("/booking/:id", async (req, res) => {
   try {
     const { id } = req.params;
     const { status } = req.body;
 
     if (!status) {
       return res.status(400).json({ message: "Status is required" });
     }
 
     const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
 
     if (!updatedBooking) {
       return res.status(404).json({ message: "Booking not found" });
     }
 
     res.json({ message: "Booking status updated successfully", booking: updatedBooking });
   } catch (error) {
     console.error("Error updating booking status:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 

app.put('/shopBooking/:id', async (req, res) => {
   const { id } = req.params;
   const { status } = req.body;
 
   try {
     const updatedItem = await ShopCart.findByIdAndUpdate(id, { status }, { new: true });
     if (!updatedItem) {
       return res.status(404).json({ message: "Item not found." });
     }
     res.json(updatedItem);
   } catch (error) {
     res.status(500).json({ message: "Error updating shop cart item status." });
   }
 });
 
 

app.get("/shopBooking/:userId", async (req, res) => {
   try {
     const { userId } = req.params;
     const status = req.query.status || "pending"; 
     const bookings = await ShopBooking.find({ UserId: userId, status }).populate("spareId");
 
     res.json(bookings);
   } catch (error) {
     console.error("Error fetching cart items:", error);
     res.status(500).send("Failed to fetch cart items.");
   }
 });
 app.get("/product/:id", async (req, res) => {
   try {
     const product = await Product.findById(req.params.id);
     if (!product) return res.status(404).json({ message: "Product not found" });
 
     res.json(product);
   } catch (error) {
     res.status(500).json({ message: "Error fetching product details", error });
   }
 });
 app.delete("/Cart/:itemId", async (req, res) => {
   const { itemId } = req.params;  
 
   try {
 
     const deletedItem = await Cart.findByIdAndDelete(itemId);
 
    
     if (!deletedItem) {
       return res.status(404).json({ message: "Cart item not found" });
     }
 
     res.status(200).json({
       message: "Item removed from cart successfully",
       data: deletedItem
     });
   } catch (err) {
     console.error("Error removing item from cart:", err);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.delete("/shopCart/:itemId", async (req, res) => {
   try {
     const { itemId } = req.params;
     const deletedItem = await shopCart.findByIdAndDelete(itemId);
     if (!deletedItem) {
       return res.status(404).json({ message: "Shop cart item not found" });
     }
     res.status(200).json({ message: "Shop cart item removed successfully" });
   } catch (error) {
     console.error("Error removing shop cart item:", error);
     res.status(500).json({ message: "Internal Server Error" });
   }
 });

 app.get('/cart/:userId', async (req, res) => {
   const userId = req.params.userId;
 
   try {
     
     const cartItems = await Cart.find({ UserId: userId }).populate('ProductId');
 
     // Calculate the total price
     let totalPrice = 0;
     cartItems.forEach(item => {
       totalPrice += item.totalPrice;
     });
 
     res.json({ totalPrice });
   } catch (error) {
     console.error('Error fetching cart:', error);
     res.status(500).json({ message: 'Error fetching cart' });
   }
 });
 
 
app.put('/shopCart/:id', async (req, res) => {
   try {
     const updatedItem = await ShopCart.findByIdAndUpdate(
       req.params.id,
       { status: req.body.status },
       { new: true }
     );
     res.json(updatedItem);
   } catch (err) {
     res.status(400).json({ message: err.message });
   }
 });
 const BookingSchema = new mongoose.Schema({
   UserId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true,
   },
   ProductId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Product",
     required: true,
   },
   quantity: {
     type: Number,
     required: true,
     min: 1,
   },
   AgentId:
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Agent",
      default:null
   },
   totalPrice: {
      type: Number, 
      required: true,
    },
   status: {
     type: String,
     enum: ["Pending", "Confirmed", "Cancelled", "Completed","Arrived"],
     default: "Pending",
   },
   createdAt: {
     type: Date,
     default: Date.now,
   },
 });
 const Booking =mongoose.model('Booking',BookingSchema)

 app.post("/booking", async (req, res) => {
   try {
     const { UserId, ProductId, quantity, status,totalPrice,AgentId } = req.body;
 
     if (!UserId || !ProductId || !quantity || !totalPrice) {
       return res.status(400).json({ message: "Missing required fields" });
     }
 
     const newBooking = new Booking({
       UserId,
       ProductId,
       quantity,
       AgentId,
      totalPrice,
       status: status || "Pending",
     });
 
     await newBooking.save();
     res.status(201).json(newBooking);
   } catch (error) {
     console.error("Error creating booking:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 const shopBookingSchema = new mongoose.Schema({
   UserId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true,
   },
   SpareId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Spare",
     required: true,
   },
   quantity: {
     type: Number,
     required: true,
     min: 1,
   },
   AgentId:
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Agent",
      default:null
   },
   status: {
     type: String,
     enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
     default: "Pending",
   },
   totalPrice: {
      type: Number, 
      required: true,
    },
   createdAt: {
     type: Date,
     default: Date.now,
   },
 });
 
 const ShopBooking = mongoose.model("ShopBooking", shopBookingSchema);
 
 app.post("/shopBooking", async (req, res) => {
   try {
     const { UserId, SpareId, quantity, status,  totalPrice,AgentId } = req.body;
 
     if (!UserId || !SpareId || !quantity || !totalPrice) {
       return res.status(400).json({ message: "Missing required fields" });
     }
 
     const newShopBooking = new ShopBooking({
       UserId,
       SpareId,
       quantity,
       AgentId,
       totalPrice,
       status: status || "Pending",
     });
 
     await newShopBooking.save();
     res.status(201).json(newShopBooking);
   } catch (error) {
     console.error("Error creating shop booking:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.put("/booking/:bookingId", async (req, res) => {
   try {
     const { bookingId } = req.params;
     console.log(bookingId)
     const { status } = req.body;
 
   
     const updatedBooking = await Booking.findByIdAndUpdate(
       bookingId,
       { status: status || "confirmed" },
       { new: true }
     );
 
     if (!updatedBooking) {
       return res.status(404).json({ message: "Booking not found!" });
     }
 
     res.status(200).json({ message: "Booking updated successfully!", booking: updatedBooking });
   } catch (error) {
     console.error("Error updating booking:", error);
     res.status(500).json({ message: "Server error!" });
   }
 });

app.put("/ShopBookinghgjhgjk/:ShopBookingId",async (req,res)=>{

   try{
      console.log(req.body);
      

      const{ShopBookingId}=req.params;
      const{status}=req.body;

      const shopBooking = await ShopBooking.findByIdAndUpdate(
         ShopBookingId,
         
            {status:status || "Confirmed"},{new:true}
         
      );
      if(!shopBooking)
      {
         return res.status(404).json({message:"shopBooking not found!"});
      }
      res.status(200).json({message:"ShopBooking updated",ShopBooking:shopBooking});
   }
   catch(error){
      console.error("error updating booking:",error);
      res.status(500).json({message:"Internal server"});
   }
});
 const watchBookingSchema = new mongoose.Schema({
   UserId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
     required: true,
   },
   watchId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Watch",
     required: true,
   },
   quantity: {
     type: Number,
     required: true,
     min: 1,
   },
   AgentId:
   {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Agent",
      default:null
   },
   status: {
     type: String,
     enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
     default: "Pending",
   },
   totalPrice: {
      type: Number, 
      required: true,
    },
   createdAt: {
     type: Date,
     default: Date.now,
   },
 });
 
 const WatchBooking = mongoose.model("WatchBooking", watchBookingSchema);
 app.post("/watchBooking", async (req, res) => {
   try {
     const { UserId, watchId, quantity, status,totalPrice,AgentId } = req.body;
 
     if (!UserId || !watchId || !quantity ||!totalPrice) {
       return res.status(400).json({ message: "Missing required fields" });
     }
 
     const newWatchBooking = new WatchBooking({
       UserId,
       watchId,
       AgentId,
       quantity,
       totalPrice,
       status: status || "Pending",
     });
 
     await newWatchBooking.save();
     res.status(201).json(newWatchBooking);
   } catch (error) {
     console.error("Error creating shop booking:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.put("/WatchBooking/:WatchBookingId", async (req, res) => {
   try {
     const { WatchBookingId } = req.params;
     console.log(WatchBookingId)
     const { status } = req.body;
    console.log(status)
   
     const updatedWatchBooking = await WatchBooking.findByIdAndUpdate(
       WatchBookingId, 
       { status: status || "Confirmed" },
       { new: true }
     );
 
     if (!updatedWatchBooking) {
       return res.status(404).json({ message: "shopBooking not found!" });
     }
 
     res.status(200).json({ message: "ShopBooking updated successfully!", WatchBooking: updatedWatchBooking });
   } catch (error) {
     console.error("Error updating booking:", error);
     res.status(500).json({ message: "Internal  Server error!" });
   }
 });
 

app.get("/booking/:userId", async (req, res) => {
   try {
     const { userId } = req.params;
     const status = req.query.status || "confirmed";  
     
     
     const bookings = await Booking.find({ UserId: userId, status })  
       .populate("ProductId")  
       .exec();
     

     if (!bookings || bookings.length === 0) {
       return res.status(404).json({ message: "No bookings found for this user" });
     }
 
    
     res.json(bookings);
   } catch (error) {
     console.error("Error fetching bookings:", error);
     res.status(500).send("Failed to fetch bookings");
   }
 });
 
app.get("/shopBookings/:userId", async (req, res) => {
   try {
     const { userId } = req.params;
     const status = req.query.status || "Confirmed";  
     
     
     const bookings = await ShopBooking.find({ UserId: userId, status })  
       .populate("SpareId") 
       .exec();
     

     if (!bookings || bookings.length === 0) {
       return res.status(404).json({ message: "No bookings found for this user" });
     }
 
    
     res.json(bookings);
   } catch (error) {
     console.error("Error fetching bookings:", error);
     res.status(500).send("Failed to fetch bookings");
   }
 });
 app.get("/watchBooking/:userId", async (req, res) => {
   try {
     const { userId } = req.params;
     const status = req.query.status || "confirmed";  
     
     
     const watch= await WatchBooking.find({ UserId: userId, status })  
       .populate("watchId")  
       .exec();
     

     if (! watch ||  watch.length === 0) {
       return res.status(404).json({ message: "No bookings found for this user" });
     }
 
    
     res.json( watch);
   } catch (error) {
     console.error("Error fetching bookings:", error);
     res.status(500).send("Failed to fetch bookings");
   }
 });
// app.get('/cart/items',async (req,res)=>
// {
//    try{

//       const {sellerId} =req.params;

//       const sellerId=await Cart.find({})
//    }
// })
app.get('/bookingDetails/:bookingId', async (req, res) => {
   try {
     const { bookingId } = req.params;
     console.log(bookingId);
     
 
     const booking = await Booking.findById(bookingId)
       .populate({
         path: 'ProductId',  
         populate: {
           path: 'sellerId', 
           select: 'name' 
         }
       });

     if (!booking) {
       return res.status(404).json({ message: 'Booking not found' });
     }
     res.json(booking);
   } catch (err) {
     console.error('Error fetching booking details:', err);
     res.status(500).json({ message: 'Server error' });
   }
 });

 app.get('/watchBookingDetails/:WatchBookingId', async (req, res) => {
   try {
     const {WatchBookingId} = req.params;
    console.log(WatchBookingId)
     const booking = await WatchBooking.findById(WatchBookingId).populate({

      path:'watchId',
      populate:{
         path:'shopId',
         select:'name'
      }
      })
     
     if (!booking) {
       return res.status(404).json({ message: 'Booking not found' });
     }
     res.json(booking);
   } catch (err) {
     console.error('Error fetching booking details:', err);
     res.status(500).json({ message: 'Server error' });
   }
 });
 app.get('/SpareBookingDetail/:ShopBookingId', async (req, res) => {
   try {
     const {ShopBookingId } = req.params;
    console.log(ShopBookingId)
     const booking = await ShopBooking.findById(ShopBookingId ).populate({ path:'SpareId',

      populate:{

         path:'shopId',
         select:'name'
      }
      })
     if (!booking) {
       return res.status(404).json({ message: 'ShopBooking not found' });
     }
     res.json(booking);
   } catch (err) {
     console.error('Error fetching booking details:', err);
     res.status(500).json({ message: 'Server error' });
   }
 });
 app.get('/ViewBookings/:shopId', async (req, res) => {
   try {
     const { shopId } = req.params;
     console.log(shopId);
 
     const bookings = await WatchBooking.aggregate([
       {
         $lookup: {
           from: "watches", // Collection name should be lowercase in MongoDB
           localField: "watchId",
           foreignField: "_id",
           as: "watchDetails",
         },
       },
       { $unwind: "$watchDetails" }, // Unwind the array to get individual objects
       { $match: { "watchDetails.shopId": new mongoose.Types.ObjectId(shopId) } },
       {
         $lookup: {
           from: "users",
           localField: "UserId",
           foreignField: "_id",
           as: "userDetails",
         },
       },
       { $unwind: "$userDetails" }, // Unwind to get user details
       {
         $project: {
           _id: 1,
           quantity: 1,
           status: 1,
           totalPrice: 1,
           createdAt: 1,
           "userDetails.name": 1,
           "userDetails.email": 1,
           "watchDetails.model": 1,
           "watchDetails.profileImage":1,
           "watchDetails.company": 1,
         },
       },
     ]);
 
     res.status(200).json({ success: true, bookings });
   } catch (error) {
     console.error(error);
     res.status(500).json({ success: false, message: "Server Error" });
   }
 });

 app.get('/SpareBooking/:shopId', async (req, res) => {
   try {
       const { shopId } = req.params;

       const bookings = await ShopBooking.aggregate([
           {
               $lookup: {
                   from: "spares", // Name of the collection in MongoDB
                   localField: "SpareId",
                   foreignField: "_id",
                   as: "spareDetails"
               }
           },
           {
               $unwind: "$spareDetails"
           },
           {
               $match: {
                   "spareDetails.shopId": new mongoose.Types.ObjectId(shopId)
               }
           },
           {
               $lookup: {
                   from: "users",
                   localField: "UserId",
                   foreignField: "_id",
                   as: "userDetails"
               }
           },
           {
               $unwind: "$userDetails"
           },
           {
               $project: {
                   _id: 1,
                   "userDetails.name": 1,
                   "userDetails.email": 1,
                   "userDetails.contact": 1,
                   "spareDetails.partName": 1,
                   "spareDetails.profileImage":1,
                   quantity: 1,
                   totalPrice: 1,
                   status: 1,
                   createdAt: 1
               }
           },
           { 
               $sort: { createdAt: -1 } // Sorting by newest bookings first
           }
       ]);

       res.status(200).json({ success: true, bookings });
   } catch (error) {
       console.error("Error fetching shop bookings:", error);
       res.status(500).json({ success: false, message: "Server Error" });
   }
});

app.get('/WatchComplaint/:sellerId', async (req, res) => {
   try {
     const { sellerId } = req.params;
 
     // Check if the sellerId is a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(sellerId)) {
       return res.status(400).json({
         success: false,
         message: 'Invalid sellerId format.',
       });
     }
 
     const complaints = await Complaint.aggregate([
       // Step 1: Join Complaint to Booking based on bookingId
       {
         $lookup: {
           from: 'bookings', // Name of the bookings collection
           localField: 'bookingId',
           foreignField: '_id',
           as: 'bookingDetails',
         },
       },
       // Step 2: Unwind the bookingDetails array to get individual booking details
       {
         $unwind: {
           path: '$bookingDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       // Step 3: Join the Product details based on ProductId from Booking
       {
         $lookup: {
           from: 'products', // Name of the products collection
           localField: 'bookingDetails.ProductId',
           foreignField: '_id',
           as: 'productDetails',
         },
       },
       // Step 4: Unwind the productDetails array to get individual product details
       {
         $unwind: {
           path: '$productDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       // Step 5: Match the complaints where the product's sellerId matches the given sellerId
       {
         $match: {
           'productDetails.sellerId': new mongoose.Types.ObjectId(sellerId), // Instantiate the ObjectId properly
         },
       },
       // Step 6: Join the User collection to get the userName
       {
         $lookup: {
           from: 'users', // Name of the users collection
           localField: 'bookingDetails.UserId', // Match by UserId in bookingDetails
           foreignField: '_id', // Match to _id in the users collection
           as: 'userDetails',
         },
       },
       // Step 7: Unwind the userDetails array to get individual user details
       {
         $unwind: {
           path: '$userDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       // Step 8: Project the necessary fields for the response, including userName
       {
         $project: {
           complaintMessage: 1,
           status: 1,
           createdAt: 1,
           'productDetails.productName': 1,
           'productDetails.modelNum': 1,
           'bookingDetails.UserId': 1,
           'userDetails.name': 1,
           'userDetails.profileImage':1 // Include the userName in the response
         },
       },
       // Step 9: Sort complaints by creation date (desc)
       {
         $sort: {
           createdAt: -1, // Sort by createdAt in descending order
         },
       },
     ]);
 
     // If there are no complaints for the seller
     if (complaints.length === 0) {
       return res.status(404).json({
         success: false,
         message: 'No complaints found for this seller.',
       });
     }
 
     // Return the complaints to the seller
     return res.status(200).json({
       success: true,
       complaints,
     });
   } catch (error) {
     console.error('Error fetching complaints:', error);
     return res.status(500).json({
       success: false,
       message: 'Internal server error.',
     });
   }
 });
 
 

 app.get('/bookings/:sellerId', async (req, res) => {
   try {
      const { sellerId } = req.params;

      const bookings = await Booking.aggregate([
       
         {
            $lookup: {
               from: "products",
               localField: "ProductId",
               foreignField: "_id",
               as: "productDetails"
            }
         },
       
         {
            $unwind: "$productDetails"
         },
      
         {
            $match: { "productDetails.sellerId": new mongoose.Types.ObjectId(sellerId) }
         },
    
         {
            $lookup: {
               from: "users",
               localField: "UserId",
               foreignField: "_id",
               as: "userDetails"
            }
         },
       
         {
            $unwind: "$userDetails"
         },
       
         {
            $project: {
               _id: 1,
               quantity: 1,
               totalPrice: 1,
               status: 1,
               createdAt: 1,
               "productDetails.productName": 1,
               "productDetails.price": 1,
               "productDetails.profileImage":1,
               "userDetails.name": 1,
               "userDetails.email": 1
            }
         }
      ]);

      res.status(200).json(bookings);
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error", error });
   }
});
app.get("/confirmed-bookings", async (req, res) => {
   try {
     const confirmedBookings = await Booking.find({ status: "confirmed" })
       .populate("UserId", "name email contact")
       .populate("ProductId", "name price profileImage");
     res.status(200).json(confirmedBookings);
   } catch (error) {
     res.status(500).json({ message: "Error fetching confirmed bookings", error });
   }
 });
 app.get("/Delivered-bookings/:AgentId", async (req, res) => {
  try {
    const { AgentId } = req.params;  

   
    const DeliveredBookings = await Booking.find({ 
      status: "Completed", 
      AgentId: AgentId 
    })
      .populate("UserId", "name email contact")
      .populate("ProductId", "name price profileImage");

    if (!DeliveredBookings.length) {
      return res.status(404).json({ message: "No completed bookings found for this agent." });
    }

    res.status(200).json(DeliveredBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching confirmed bookings", error });
  }
});

 app.get("/WatchConfirmed-bookings", async (req, res) => {
   try {
     const confirmedBookings = await WatchBooking.find({ status: "confirmed" })
       .populate("UserId", "name email contact")
       .populate("watchId", "model price profileImage");
     res.status(200).json(confirmedBookings);
   } catch (error) {
     res.status(500).json({ message: "Error fetching confirmed bookings", error });
   }
 });
 app.get("/ShopConfirmed-bookings",async(req,res)=>{

 try{

   const confirmedBook=await ShopBooking.find({status:"Confirmed"})
   .populate("UserId","name email contact").populate("SpareId","partName price profileImage");
   res.status(200).json(confirmedBook);

 }catch(error){

   res.status(500).json({message:"Error fetching confirmed booking",error})
 }

 })

 app.put("/update-booking/:id", async (req, res) => {
   const { id } = req.params;
   const { AgentId } = req.body; 
 
   try {
  
     const updatedBooking = await Booking.findByIdAndUpdate(
       id,
       {
         status: "Completed",
         AgentId: AgentId,    
       },
       { new: true } 
     );
 
     if (!updatedBooking) {
       return res.status(404).json({ message: "Booking not found" });
     }
 
     res.status(200).json(updatedBooking); // Respond with the updated booking
   } catch (error) {
     console.error("Error updating booking:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.put("/update-WatchBooking/:id", async (req, res) => {
   const { id } = req.params;
   const { AgentId } = req.body; 
 
   try {
  
     const updatedBooking = await WatchBooking.findByIdAndUpdate(
       id,
       {
         status: "Completed",
         AgentId: AgentId,    
       },
       { new: true } 
     );
 
     if (!updatedBooking) {
       return res.status(404).json({ message: "Booking not found" });
     }
 
     res.status(200).json(updatedBooking); 
   } catch (error) {
     console.error("Error updating booking:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 app.put("/Reply/:ComplaintId", async (req, res) => {
  try {
    const { ComplaintId } = req.params;
    const { Reply, status } = req.body;

    // Ensure ComplaintId, Reply, and status are valid
    if (!ComplaintId || !Reply || !status) {
      return res.status(400).json({ message: "ComplaintId, Reply, or status is missing." });
    }

    // Update complaint with the new reply and status
    const updatedReply = await Complaint.findByIdAndUpdate(
      ComplaintId,
      { Reply, status }, // Dynamic status
      { new: true }
    );

    if (!updatedReply) {
      return res.status(404).json({ message: "Complaint not found!" });
    }

    res.status(200).json({ message: "Complaint updated successfully!", Reply: updatedReply });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Server error!" });
  }
});


 app.get("/booking1/:userId", async (req, res) => {
   try {
     const userId = req.params.userId;
     const bookings = await Booking.find({ UserId: userId }) 
       .populate("ProductId") 
       .populate("AgentId")   
       .exec();
 
     if (!bookings) {
       return res.status(404).json({ message: "No bookings found" });
     }
 
     res.status(200).json(bookings); // Return the bookings with agent details
   } catch (err) {
     console.error("Error fetching bookings:", err);
     res.status(500).json({ message: "Server error" });
   }
 });
 
 app.get("/WatchBookings/:userId", async (req, res) => {
   try {
     const userId = req.params.userId;
     const bookings = await WatchBooking.find({ UserId: userId }) 
       .populate("watchId") 
       .populate("AgentId")   
       .exec();
 
     if (!bookings) {
       return res.status(404).json({ message: "No bookings found" });
     }
 
     res.status(200).json(bookings); // Return the bookings with agent details
   } catch (err) {
     console.error("Error fetching bookings:", err);
     res.status(500).json({ message: "Server error" });
   }
 });
 app.get("/WatchBookings/:userId", async (req, res) => {
   try {
     const userId = req.params.userId;
     const bookings = await ShopBooking.find({ UserId: userId }) 
       .populate("SpareId") 
       .populate("AgentId")   
       .exec();
 
     if (!bookings) {
       return res.status(404).json({ message: "No bookings found" });
     }
 
     res.status(200).json(bookings); // Return the bookings with agent details
   } catch (err) {
     console.error("Error fetching bookings:", err);
     res.status(500).json({ message: "Server error" });
   }
 });
 const SolutionSchema=new mongoose.Schema({

   ComplaintId:{

    type:mongoose.Schema.Types.ObjectId,
    ref:"Complaint"
  },
  SolutionMessage:{
    type: String,
    required: true, 
    minlength: 10,

  },
  status:{

    type:String,
    enum:["Viewed","Not Viewed"],
    default:"Not Viewed",
  }
 });
 const Solutions=mongoose.model("Solution",SolutionSchema);
 app.post("/SubmitSolutions/:ComplaintId", async (req, res) => {
  const { ComplaintId } = req.params; 
  const { SolutionMessage } = req.body; 

 
  if (!SolutionMessage) {
    return res.status(400).json({
      success: false,
      message: "Solution message is required.",
    });
  }

  try {

    const complaint = await Complaint.findById(ComplaintId);

  
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    
    const newSolution = new Solutions({
      ComplaintId,
      SolutionMessage,
    });

    await newSolution.save();

    // Send back a success response
    res.status(201).json({
      success: true,
      message: "Solution submitted successfully.",
    });
  } catch (error) {
    console.error("Error submitting Solution:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

 const ComplaintSchema = new mongoose.Schema({
   bookingId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Booking",
     required: true, 
   },
   complaintMessage: {
     type: String,
     required: true, // Complaint description
     minlength: 10, // Minimum length for the complaint
   },
   status: {
     type: String,
     enum: ["Pending", "Resolved", "In Progress"],
     default: "Pending",
   },
   userId:{

    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
   },
   Reply:{

    type:String,
    default:"NULL"
   },
   createdAt: {
     type: Date,
     default: Date.now, // Automatically set the current date
   },
 });

const Complaint = mongoose.model("Complaint", ComplaintSchema);


app.post("/SubmitComplaint/:bookingId", async (req, res) => {
   const { bookingId } = req.params; 
   const { complaintMessage,userId,Reply } = req.body; 
 
   if (!complaintMessage) {
     return res.status(400).json({
       message: "Complaint message is required.",
     });
   }
 
   try {
     const booking = await Booking.findById(bookingId);
 
     if (!booking) {
       return res.status(404).json({
         message: "Booking not found.",
       });
     }
 
    
     const newComplaint = new Complaint({
       bookingId,
       userId,
       Reply,
       complaintMessage,
     });
 
     await newComplaint.save();
 
     res.status(201).json({
       success: true,
       message: "Complaint submitted successfully.",
     });
   } catch (error) {
     console.error("Error submitting complaint:", error);
     res.status(500).json({
       success: false,
       message: "Internal server error.",
     });
   }
 });
 const SpareComplaintSchema = new mongoose.Schema({
   ShopBookingId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "ShopBooking",
     required: true, 
   },
   complaintMessage: {
     type: String,
     required: true, // Complaint description
     minlength: 10, // Minimum length for the complaint
   },
   status: {
     type: String,
     enum: ["Pending", "Resolved", "In Progress"],
     default: "Pending",
   },
   createdAt: {
     type: Date,
     default: Date.now, // Automatically set the current date
   },
 });

const SpareComplaint = mongoose.model("SpareComplaint", SpareComplaintSchema);


app.post("/SubmitComplaints/:ShopBookingId", async (req, res) => {
   const { ShopBookingId } = req.params; 
   const { complaintMessage,Reply } = req.body; 
 
   if (!complaintMessage) {
     return res.status(400).json({
       message: "Complaint message is required.",
     });
   }
 
   try {
     const Booking = await ShopBooking.findById(ShopBookingId);
 
     if (!Booking) {
       return res.status(404).json({
         message: "Booking not found.",
       });
     }
 
     // Save the complaint in the database
     const newComplaint = new SpareComplaint({
      ShopBookingId,
       complaintMessage,Reply
     });
 
     await newComplaint.save();
 
     res.status(201).json({
       success: true,
       message: "Complaint submitted successfully.",
     });
   } catch (error) {
     console.error("Error submitting complaint:", error);
     res.status(500).json({
       success: false,
       message: "Internal server error.",
     });
   }
 });
 const WatchComplaintSchema = new mongoose.Schema({
   WatchBookingId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "WatchBooking",
     required: true, 
   },
   complaintMessage: {
     type: String,
     required: true, // Complaint description
     minlength: 10, // Minimum length for the complaint
   },
   status: {
     type: String,
     enum: ["Pending", "Resolved", "In Progress"],
     default: "Pending",
   },
   createdAt: {
     type: Date,
     default: Date.now, // Automatically set the current date
   },
 });

const WatchComplaint = mongoose.model("WatchComplaint", WatchComplaintSchema);
app.post("/WatchComplaints/:WatchBookingId", async (req, res) => {
   const { WatchBookingId } = req.params; 
   const { complaintMessage } = req.body; 
 
   if (!complaintMessage) {
     return res.status(400).json({
       message: "Complaint message is required.",
     });
   }
 
   try {
     const Booking = await WatchBooking.findById(WatchBookingId);
 
     if (!Booking) {
       return res.status(404).json({
         message: "Booking not found.",
       });
     }
 
     // Save the complaint in the database
     const newComplaint = new WatchComplaint({
      WatchBookingId,
       complaintMessage,
     });
 
     await newComplaint.save();
 
     res.status(201).json({
       success: true,
       message: "Complaint submitted successfully.",
     });
   } catch (error) {
     console.error("Error submitting complaint:", error);
     res.status(500).json({
       success: false,
       message: "Internal server error.",
     });
   }
 });
 
 app.get('/WatchesComplaint/:shopId', async (req, res) => {
   try {
     const { shopId } = req.params;

     // Check if shopId is a valid ObjectId
     if (!mongoose.Types.ObjectId.isValid(shopId)) {
       return res.status(400).json({
         success: false,
         message: 'Invalid shopId format.',
       });
     }

     console.log("Fetching complaints for Shop ID:", shopId); // Debugging

     const WatchComplaints = await WatchComplaint.aggregate([
       {
         $lookup: {
           from: 'watchbookings',
           localField: 'WatchBookingId',
           foreignField: '_id',
           as: 'bookingDetails',
         },
       },
       {
         $unwind: {
           path: '$bookingDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $lookup: {
           from: 'watches',
           localField: 'bookingDetails.watchId',
           foreignField: '_id',
           as: 'watchesDetails',
         },
       },
       {
         $unwind: {
           path: '$watchesDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $match: {
           'watchesDetails.shopId': new mongoose.Types.ObjectId(shopId),
         },
       },
       {
         $lookup: {
           from: 'users',
           localField: 'bookingDetails.UserId',
           foreignField: '_id',
           as: 'userDetails',
         },
       },
       {
         $unwind: {
           path: '$userDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $project: {
           complaintMessage: 1,
           status: 1,
           createdAt: 1,
           'watchesDetails.model': 1,
           'watchesDetails.company': 1,
           'watchesDetails.profileImage':1,
           'bookingDetails.quantity': 1,
           'userDetails.name': 1,
           'userDetails.profileImage': 1,
         },
       },
       {
         $sort: { createdAt: -1 },
       },
     ]);

     if (WatchComplaints.length === 0) {
       return res.status(404).json({
         success: false,
         message: 'No complaints found for this shop.',
       });
     }

     return res.status(200).json({
       success: true,
       WatchComplaints,
     });
   } catch (error) {
     console.error('Error fetching complaints:', error);
     return res.status(500).json({
       success: false,
       message: 'Internal server error.',
     });
   }
});

app.get('/ProductFeedBack/:sellerId', async (req, res) => {
   try {
     const { sellerId } = req.params;

     
     if (!mongoose.Types.ObjectId.isValid(sellerId)) {
       return res.status(400).json({
         success: false,
         message: 'Invalid shopId format.',
       });
     }

     console.log("Fetching complaints for Shop ID:", sellerId); // Debugging

     const ProductFeedBack = await FeedBack.aggregate([
       {
         $lookup: {
           from: 'bookings',
           localField: 'BookingId',
           foreignField: '_id',
           as: 'bookingDetails',
         },
       },
       {
         $unwind: {
           path: '$bookingDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $lookup: {
           from: 'products',
           localField: 'bookingDetails.ProductId',
           foreignField: '_id',
           as: 'productDetails',
         },
       },
       {
         $unwind: {
           path: '$productDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $match: {
           'productDetails.sellerId': new mongoose.Types.ObjectId(sellerId),
         },
       },
       {
         $lookup: {
           from: 'users',
           localField: 'bookingDetails.UserId',
           foreignField: '_id',
           as: 'userDetails',
         },
       },
       {
         $unwind: {
           path: '$userDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $project: {
           FeedbackMessage: 1,
           Rating: 1,
           createdAt: 1,
           'productDetails.productName': 1,
           'productDetails.modelNum': 1,
           'productDetails.quantity': 1,
           'userDetails.name': 1,
           'userDetails.profileImage': 1,
         },
       },
       {
         $sort: { createdAt: -1 },
       },
     ]);

     if (ProductFeedBack .length === 0) {
       return res.status(404).json({
         success: false,
         message: 'No Feedback found for this seller.',
       });
     }

     return res.status(200).json({
       success: true,
       ProductFeedBack ,
     });
   } catch (error) {
     console.error('Error fetching Feedback', error);
     return res.status(500).json({
       success: false,
       message: 'Internal server error.',
     });
   }
});
 
app.get('/SparesComplaint/:shopId', async (req, res) => {
   try {
     const { shopId } = req.params;

    
     if (!mongoose.Types.ObjectId.isValid(shopId)) {
       return res.status(400).json({
         success: false,
         message: 'Invalid shopId format.',
       });
     }

     console.log("Fetching complaints for Shop ID:", shopId); // Debugging

     const SpareComplaints = await SpareComplaint.aggregate([
       {
         $lookup: {
           from: 'shopbookings',
           localField: 'ShopBookingId',
           foreignField: '_id',
           as: 'shopBookingDetails',
         },
       },
       {
         $unwind: {
           path: '$shopBookingDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $lookup: {
           from: 'spares',
           localField: 'shopBookingDetails.SpareId',
           foreignField: '_id',
           as: 'sparesDetails',
         },
       },
       {
         $unwind: {
           path: '$sparesDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $match: {
           'sparesDetails.shopId': new mongoose.Types.ObjectId(shopId),
         },
       },
       {
         $lookup: {
           from: 'users',
           localField: 'shopBookingDetails.UserId',
           foreignField: '_id',
           as: 'userDetails',
         },
       },
       {
         $unwind: {
           path: '$userDetails',
           preserveNullAndEmptyArrays: false,
         },
       },
       {
         $project: {
           complaintMessage: 1,
           status: 1,
           createdAt: 1,
           'sparesDetails.partName': 1,
           'sparesDetails.part': 1,
            'sparesDetails.profileImage':1,
           'shopBookingDetails.quantity': 1,
           'userDetails.name': 1,
           'userDetails.profileImage': 1,
         },
       },
       {
         $sort: { createdAt: -1 },
       },
     ]);

     if (SpareComplaints .length === 0) {
       return res.status(404).json({
         success: false,
         message: 'No complaints found for this shop.',
       });
     }

     return res.status(200).json({
       success: true,
       SpareComplaints,
     });
   } catch (error) {
     console.error('Error fetching complaints:', error);
     return res.status(500).json({
       success: false,
       message: 'Internal server error.',
     });
   }
});
const FeedBackSchema=new mongoose.Schema({

   BookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true, 
    },
FeedbackMessage:{

   type:String,
   required:true,
},
Rating:{

   type:String,
   required:true,
}


});
const FeedBack=mongoose.model("FeedBack",FeedBackSchema);
app.post("/ProductFeedbacks/:BookingId", async (req, res) => {
   const { BookingId } = req.params; 
   console.log(BookingId)
   const { FeedbackMessage,Rating} = req.body; 
 
   if (!FeedbackMessage) {
     return res.status(400).json({
       message: "Complaint message is required.",
     });
   }
   if (!Rating) {
      return res.status(400).json({
        message: "Rating is required.",
      });
    }
 
   try {
     const booking = await Booking.findById(BookingId);
 
     if (!booking) {
       return res.status(404).json({
         message: "Booking not found.",
       });
     }
 

     const newFeedBack = new FeedBack({
       BookingId,
       FeedbackMessage,
       Rating
     
     });
 
     await newFeedBack.save();
 
     res.status(201).json({
       success: true,
       message: "FeedBack submitted successfully.",
     });
   } catch (error) {
     console.error("Error submitting FeedBack:", error);
     res.status(500).json({
       success: false,
       message: "Internal server error.",
     });
   }
 });
 const SpareFeedBackSchema=new mongoose.Schema({

  ShopBookingId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "ShopBooking",
     required: true, 
   },
FeedbackMessage:{

  type:String,
  required:true,
},
Rating:{

  type:String,
  required:true,
}


});
const SpareFeedBack=mongoose.model("SpareFeedBack",SpareFeedBackSchema);
app.post("/SpareFeedbacks/:ShopBookingId", async (req, res) => {
  const { ShopBookingId } = req.params; 
  console.log(ShopBookingId)
  const { FeedbackMessage,Rating} = req.body; 

  if (!FeedbackMessage) {
    return res.status(400).json({
      message: "Complaint message is required.",
    });
  }
  if (!Rating) {
     return res.status(400).json({
       message: "Rating is required.",
     });
   }

  try {
    const shopBooking = await ShopBooking.findById(ShopBookingId);

    if (!shopBooking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }


    const newFeedBack = new SpareFeedBack({
      ShopBookingId,
      FeedbackMessage,
      Rating
    
    });

    await newFeedBack.save();

    res.status(201).json({
      success: true,
      message: "FeedBack submitted successfully.",
    });
  } catch (error) {
    console.error("Error submitting FeedBack:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

app.get('/SparesFeedBack/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid( shopId )) {
      return res.status(400).json({
        success: false,
        message: 'Invalid shopId format.',
      });
    }

    console.log("Fetching complaints for Shop ID:",  shopId); // Debugging

    const spareFeedBack = await SpareFeedBack.aggregate([
      {
        $lookup: {
          from: 'shopbookings',
          localField: 'ShopBookingId',
          foreignField: '_id',
          as: 'bookingDetails',
        },
      },
      {
        $unwind: {
          path: '$bookingDetails',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'spares',
          localField: 'bookingDetails.SpareId',
          foreignField: '_id',
          as: 'spareDetails',
        },
      },
      {
        $unwind: {
          path: '$spareDetails',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          'spareDetails.shopId': new mongoose.Types.ObjectId(shopId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'bookingDetails.UserId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          FeedbackMessage: 1,
          Rating: 1,
          createdAt: 1,
          'spareDetails.partName': 1,
          'spareDetails.part': 1,
          'spareDetails.quantity': 1,
          'userDetails.name': 1,
          'userDetails.profileImage': 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (spareFeedBack.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Feedback found for this seller.',
      });
    }

    return res.status(200).json({
      success: true,
      spareFeedBack  ,
    });
  } catch (error) {
    console.error('Error fetching Feedback', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});
const WatchFeedBackSchema=new mongoose.Schema({

  WatchBookingId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "WatchBooking",
     required: true, 
   },
FeedbackMessage:{

  type:String,
  required:true,
},
Rating:{

  type:String,
  required:true,
}


});
const watchFeedBack=mongoose.model("WatchFeedBack",WatchFeedBackSchema);
app.post("/watchFeedbacks/:WatchBookingId", async (req, res) => {
  const { WatchBookingId } = req.params; 
  console.log(WatchBookingId)
  const { FeedbackMessage,Rating} = req.body; 

  if (!FeedbackMessage) {
    return res.status(400).json({
      message: "Complaint message is required.",
    });
  }
  if (!Rating) {
     return res.status(400).json({
       message: "Rating is required.",
     });
   }

  try {
    const watchBooking = await WatchBooking.findById(WatchBookingId);

    if (!watchBooking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }


    const newFeedBack=new watchFeedBack({
      WatchBookingId,
      FeedbackMessage,
      Rating
    
    });

    await newFeedBack.save();

    res.status(201).json({
      success: true,
      message: "FeedBack submitted successfully.",
    });
  } catch (error) {
    console.error("Error submitting FeedBack:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});
app.get('/WatchFeedBack/:shopId', async (req, res) => {
  try {
    const { shopId } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid( shopId )) {
      return res.status(400).json({
        success: false,
        message: 'Invalid shopId format.',
      });
    }

    console.log("Fetching complaints for Shop ID:",  shopId); // Debugging

    const watchFeedBacks = await watchFeedBack.aggregate([
      {
        $lookup: {
          from: 'watchbookings',
          localField: 'WatchBookingId',
          foreignField: '_id',
          as: 'bookingDetails',
        },
      },
      {
        $unwind: {
          path: '$bookingDetails',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'watches',
          localField: 'bookingDetails.watchId',
          foreignField: '_id',
          as: 'watchDetails',
        },
      },
      {
        $unwind: {
          path: '$watchDetails',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $match: {
          'watchDetails.shopId': new mongoose.Types.ObjectId(shopId),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'bookingDetails.UserId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          FeedbackMessage: 1,
          Rating: 1,
          createdAt: 1,
          'watchDetails.model': 1,
          'watchDetails.part': 1,
          'watchDetails.quantity': 1,
          'userDetails.name': 1,
          'userDetails.profileImage': 1,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    if (watchFeedBacks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Feedback found for this seller.',
      });
    }

    return res.status(200).json({
      success: true,
      watchFeedBacks  ,
    });
  } catch (error) {
    console.error('Error fetching Feedback', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
});

app.put("/Reply/:ComplaintId", async (req, res) => {
  try {
    const { ComplaintId } = req.params;
    console.log(ComplaintId )
    const { Reply } = req.body;

  
    const updatedReply = await Complaint.findByIdAndUpdate(
      ComplaintId,
      { Reply,status:"Resolved"},
      { new: true }
    );

    if (!updatedReply) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    res.status(200).json({ message: "Booking updated successfully!", Reply: updatedReply });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error!" });
  }
});
app.get('/user/complaints/replies/:userId', async (req, res) => {
  const { userId } = req.params; 

  try {
   
    const complaintsWithReplies = await Complaint.find({
      userId: userId,
      Reply: { $ne: 'NULL' } 
    })
      .select('complaintMessage status Reply createdAt')
      .exec();

 
    if (complaintsWithReplies.length === 0) {
      return res.status(404).json({ message: 'No complaints with replies found for this user.' });
    }

    return res.status(200).json({ complaints: complaintsWithReplies });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});