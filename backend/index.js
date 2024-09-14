const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");
const { type } = require("os");

app.use(express.json());
app.use(cors());


/*================== database Connection with mongoDB =================*/

mongoose.connect("mongodb+srv://sharmacks822:i2tnv1a2T7Osoha5@cluster0.wdovr.mongodb.net/ecom?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));





/*================== API CREATION =================*/

app.get("/", (req, res) => {
    res.send("Express App is running");
})




/*================== IMAGE storage Engine =================*/

const storage = multer.diskStorage({
    destination: './upload/images/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});




/*==================  Initialize upload (configure field names) =================*/

const upload = multer({ storage: storage });
app.use('/images', express.static('upload/images/'))


// Your route handling file upload
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
});



/**========================================================================
 *                 SCHEMA TO ADD PRODUCT IN DATABASE
 *========================================================================**/
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true,
    }
})

/**========================================================================
 *                           API FOR ADDING PRODUCT
 *========================================================================**/
app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else {
            id = 1;
        }
        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        });

        console.log('Product to be saved:', product);

        const savedProduct = await product.save();
        console.log('Product saved:', savedProduct);

        res.json({
            success: true,
            name: savedProduct.name
        });
    } catch (err) {
        console.error('Error saving product:', err);
        res.status(500).json({
            success: false,
            message: "Error saving product"
        });
    }
});

/**========================================================================
 *                           API FOR DELETING PRODUCT
 *========================================================================**/
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

/**========================================================================
 *                           API TO GET ALL PRODUCTS
 *========================================================================**/
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);

})

/**========================================================================
 *                           USERS SCHEMA
 *========================================================================**/
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

/**========================================================================
 *                CREATING ENDPOINT FOR REGISTERING USERS
 *========================================================================**/

app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "existing user found with same email address."
        })
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
})

/**========================================================================
 *                     CREATING ENDPOINT FOR USER LOGIN
 *========================================================================**/

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    }
    else {
        res.json({ success: false, errors: "Wrong Email id" })
    }
})

/**========================================================================
 *               CREATING END POINT FOR NEW COLLECTION DATA
 *========================================================================**/
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollections Fetched");
    res.send(newcollection);
})

/**========================================================================
 *           CREATING ENDPOINT FOR POPULAR IN WOMEN SECTION
 *========================================================================**/
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})


/**========================================================================
 *                  CREATING MIDDLEWARE TO FETCH USER
 *========================================================================**/
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, "secret_ecom");
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ errors: "please authenticate using valid token" });
        }
    }
}


/**========================================================================
 *           CREATING ENDPOINT FOR ADDING PRODUCTS IN CART DATA
 *========================================================================**/

app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body, "by",req.user.id)
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, {
        cartData: userData.cartData
    })
    res.send("Added")
})

/**========================================================================
 *               CREATING ENDPOINT TO REMOVE PRODUCT FROM CART DATA
 *========================================================================**/
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({ _id: req.user.id }, {
            cartData: userData.cartData
        })
        res.send("Removed")
    }

})

/**========================================================================
 *                          TO GET CART DATA OF AN USER
 *========================================================================**/
app.post('/getcart', fetchUser, async(req, res)=>{
    console.log("GET CART");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
    
})

app.listen(port, (error) => {
    if (!error) {
        console.log("server running on port " + port);
    }
    else {
        console.log('Error: ' + error);
    }
});






