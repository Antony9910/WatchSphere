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

   date: {
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

});

// Create the User model from the schema
const Seller = mongoose.model('Seller', sellerSchema);



app.post('/sellerReg', upload.fields([{ name: 'proof' }, { name: 'photo' }]), async (req, res) => {
   try {
      // Log the received data and files
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { name, email, address, date, password, confirmPassword } = req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};


      var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
      var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;



      const newSeller = new Seller({
         name,
         email,
         address,

         date,
         password,
         confirmPassword,
         profileImage: profileimgsrc,
         proofImage: proofimgsrc,
      });


      await newSeller.save();
      res.status(200).json({ message: 'Registration successful', data: newSeller });
      alert("Registration done")

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

      const { name, email, address, contact, state,password,confirmPassword } = req.body;
      let user = await User.findByIdAndUpdate(id, {name, email, address, contact, state, password, confirmPassword,},{new:true})
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

      const { name, email, address,password,confirmPassword } = req.body;
      console.log(req.body)
      let seller = await Seller.findByIdAndUpdate(id, { name, email, address,password,confirmPassword }, { new: true })
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

});

// Create the User model from the schema
const Shop = mongoose.model('Shop', shopSchema);



app.post('/shopReg', upload.fields([{ name: 'proof' }, { name: 'photo' }]), async (req, res) => {
   try {
      // Log the received data and files
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { name, email, address,password, confirmPassword,shop} = req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};


      var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;
      var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;



      const newShop = new Shop({
         name,
         email,
         address,
         shop,
       
         password,
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

      const { name, email, address,password,shop,confirmPassword } = req.body;
      console.log(req.body)
      let shops = await Shop.findByIdAndUpdate(id, { name, email,shop, address,password,confirmPassword }, { new: true })
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
   email:{

      type:String,
      required:true,
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
   }


});
const Agent =mongoose.model('Agent',AgentSchema)

app.post('/agentReg', upload.fields([{name:'proof'},{name:'photo'}]),async (req,res)=>
{

   try{

      console.log('Received data:',req.body);
      console.log('Received files',req.files);
      const {name,email,address,gender,password,vehicle,confirmPassword, VehicleNum} =req.body;
      const fileValue = req.files ? JSON.parse(JSON.stringify(req.files)) : {};
      var proofimgsrc = `http://127.0.0.1:${port}/images/${fileValue.proof[0].filename}`;
      var profileimgsrc = `http://127.0.0.1:${port}/images/${fileValue.photo[0].filename}`;



      const newAgent = new Agent({
         name,
         email,
         address,
          gender,
         vehicle,
         password,
         VehicleNum,
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
         res.json({ message: "Shop updated successfully", agent: {} })
      } else {
         res.send({ agent }).status(200);
      }
   } catch (err) {
      console.error("Error deleting user", err);
      res.status(500).send("Internal server error")

   }
})
//Agent Profile Update
app.put("/AgentRegById/:id", async (req, res) => {
   try {

      const id = req.params.id;

      const { name, email, address,password,gender,vehicle,confirmPassword,VehicleNum } = req.body;
      console.log(req.body)
      let agents = await Agent.findByIdAndUpdate(id, { name, email,address,gender,vehicle,password,confirmPassword,VehicleNum }, { new: true })
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
app.post(`/agentReg/:id`, async (req, res) => {
   try {
      const id = req.params.id;
      const agent = await Agent.findById(id);
      if (!agent) {
         return res.status(404).json({ message: 'Agent not found' });
      }
       agent.isApproved = true;
      await agent.save();
      res.status(200).json({ message: 'Shop approved successfully',agent }); 
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
      type:String,required:true
   },
   profileImage: {
      type: String,
      required: true,
   },
   productDesc:{

      type:String,
      required:true,
   }




})
const Product =mongoose.model('Product',productSchema)

app.post('/product', upload.fields([{ name: 'photo' }]), async (req, res) => {
   try {
      console.log('Received data:', req.body);
      console.log('Received files:', req.files);

      const { productName, modelNum, colorId, price, WatchId, watch_Category, UserId,color, sellerId,user_Category,offer,discount,productDesc } = req.body;
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

//Booking product
// const BookingSchema=new mongoose.Schema({

//    ProductId:{
//       type:mongoose.Schema.Types.ObjectId,
//     ref:"Product"
//  },
//  SellerId:{
//    type:mongoose.Schema.Types.ObjectId,
//    ref:"Seller"
//  }
// })
// const Booking = mongoose.model('Booking', BookingSchema);
// app.post("/prebook", async (req, res) => {
//    try {
//      const { productId, sellerId } = req.body;
 
     
//      if (!productId || !sellerId) {
//        return res.status(400).json({ message: "Missing productId or sellerId" });
//      }
 
     
//      const newBooking = new Booking({
//        ProductId: productId,
//        SellerId: sellerId,
//      });
 
//      await newBooking.save();
 

//      const product = await Product.findById(productId).populate("sellerId");
 
//      res.status(201).json({ message: "Booking successful!", booking: newBooking, product });
//    } catch (error) {
//      console.error("Error in booking:", error);
//      res.status(500).json({ message: "Internal server error" });
//    }
//  });
 app.get("/prebook", async (req, res) => {
   try {
     const bookings = await Booking.find()
       .populate("ProductId","productName price ")  // Populate Product details
       .populate("SellerId","name profileImage");  // Populate Seller details
 
     res.status(200).json({ bookings });
   } catch (error) {
     console.error("Error fetching bookings:", error);
     res.status(500).json({ message: "Error fetching bookings" });
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
     ref: "User",  // Reference to User schema
     required: true
   },
   ProductId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Product",  // Reference to Product schema
     required: true
   },
   quantity: {
     type: Number,  // Changed to Number for quantity
     required: true,
     min: 1
   }
 });
 
 const Cart = mongoose.model("Cart", CartSchema);
 const BookingSchema = new mongoose.Schema({
   UserId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",  // Reference to User schema
     required: true
   },
   ProductId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Product",  // Reference to Product schema
     required: true
   },
   quantity: {
     type: Number,
     required: true,
     min: 1
   },
   date: {
     type: Date,
     required: true
   },
   status: {
     type: String,
     enum: ["pending", "confirmed", "cancelled"],
     default: "pending"
   }
 });
 
 const Booking = mongoose.model("Booking", BookingSchema);
 app.post("/Cart", async (req, res) => {
   try {
     const { UserId, ProductId, quantity } = req.body;
 
     if (!UserId || !ProductId || !quantity) {
       return res.status(400).json({ message: "UserId, ProductId, and quantity are required" });
     }
 
     const newCart = new Cart({
       UserId,
       ProductId,
       quantity,
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
 app.post("/Cart", async (req, res) => {
   try {
     const { UserId, ProductId, quantity, } = req.body;
 
     if (!UserId || !ProductId || !quantity) {
       return res.status(400).json({ message: "UserId, ProductId, and quantity are required" });
     }
 
     const newCart = new Cart({
       UserId,
       ProductId,
       quantity,
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
 app.post("/booking", async (req, res) => {
   try {
     const { UserId, ProductId, quantity, status } = req.body;
 

     console.log("Received booking data:", req.body);
 
     if (!UserId || !ProductId || !quantity || !status) {
       return res.status(400).json({ message: "UserId, ProductId, quantity, and status are required" });
     }
 
     const newBooking = new Booking({
       UserId,
       ProductId,
       quantity,
       date: new Date(),
       status, // Make sure the status is either 'pending', 'confirmed', or 'cancelled'
     });
 
     await newBooking.save();
 
     res.status(201).json({
       message: "Booking created successfully",
       booking: newBooking,
     });
   } catch (error) {
     console.error("Error creating booking:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
 
 
 
 
 app.get("/cart/:userId", async (req, res) => {
   const { userId } = req.params;
 
   try {
     const cartItems = await Cart.find({ UserId: userId }).populate("ProductId");
     res.status(200).json(cartItems);
   } catch (error) {
     console.error("Error fetching cart:", error);
     res.status(500).json({ message: "Internal server error" });
   }
 });
//  app.post("/convert-cart-to-booking", async (req, res) => {
//    try {
//      const { UserId, status } = req.body;  // Pass in the userId and status
 
//      // Fetch all the cart items for the user
//      const cartItems = await Cart.find({ UserId }).populate("ProductId");
 
//      if (cartItems.length === 0) {
//        return res.status(400).json({ message: "No items in the cart" });
//      }
 
//      // Iterate over the cart items and create bookings
//      const bookings = [];
//      for (let item of cartItems) {
//        const newBooking = new Booking({
//          UserId: item.UserId,
//          ProductId: item.ProductId,
//          quantity: item.quantity,
//          status,
//          date: new Date(),
//        });
 
//        await newBooking.save();
//        bookings.push(newBooking);
//      }
 
//      // Optionally, clear the cart after converting to booking
//      await Cart.deleteMany({ UserId });
 
//      res.status(201).json({
//        message: "Cart converted to bookings successfully",
//        bookings,
//      });
//    } catch (error) {
//      console.error("Error converting cart to bookings:", error);
//      res.status(500).json({ message: "Internal server error" });
//    }
//  });
  



const VariantSchema =new mongoose.Schema({

   ProductId:{
        type:mongoose.Schema.Types.ObjectId,
      ref:"Product"
   },
   ColorId:
   {
        type:mongoose.Schema.Types.ObjectId,
      ref:"Color"
   },
   color:{

      type:String,
      required:true,
    
   },
   material:
   {
      type:"String",
      required:true,
   }
   



});
const Variant = mongoose.model('Variant', VariantSchema);
// app.post('/Variant', async (req, res) => {
//    try {
//       const { material, ProductId, ColorId } = req.body;

//       // Create a new Variant document
//       const newVariant = new Variant({
//          material,
//          ProductId,
//          ColorId,
//       });

   
//       await newVariant.save();

//       const populatedVariant = await Variant.findById(newVariant._id)
//          .populate('ProductId') 

//       res.status(200).json({
//          message: 'Product registration successful',
//          data: populatedVariant,
//       });
//    } catch (error) {
//       console.error('Error during product registration:', error);
//       res.status(500).json({ message: 'Error registering product. Please try again.' });
//    }
// });
app.get('/product', async (req, res) => {
   try {
     const products = await Product.find();
     res.json(products);
   } catch (err) {
     res.status(500).json({ error: 'Error fetching products' });
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
     const {  productName } = req.body;
     const product = await Product.findByIdAndUpdate(
       req.params.id,
       { productName },
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
 const bookingSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  color: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending'
  }
}, {
  timestamps: true
});