const con = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function addUser(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token,process.env.JWT_SECRET);

        if(decoded.Role != "Admin"){
            return res.status(403).send({message: "Access Denied"});
        }

        const d = req.body;

        const [result] = await con.query("SELECT * FROM users WHERE email=?",[d.Email]);

        if(result.length > 0){
            return res.status(409).send({message: "Email Already Exists"});
        }
        else{

            const hashedPassword = await bcrypt.hash(d.Password,10);

            await con.query("INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)",
                [d.Name,d.Email,hashedPassword,d.Address,d.Role]
            );

            res.status(200).send({message: "User Added Successfully"});

        }

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function addStore(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({ message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token,process.env.JWT_SECRET);

        if(decoded.Role != "Admin"){
            return res.status(403).send({message: "Access Denied"});
        }

        const d = req.body;

        const [result] = await con.query("SELECT * FROM stores WHERE user_id=?",[d.UserId]);

        if(result.length > 0){
            return res.status(409).send({message: "Store Already Exists"});
        }
        else{

            await con.query("INSERT INTO stores(user_id,store_name) VALUES(?,?)",[d.UserId, d.StoreName]);

            res.status(200).send({message: "Store Added Successfully"});

        }

    }
    catch(error){

        res.status(500).send({
            message: error.message
        });

    }

}

async function getDashboardCounts(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token,process.env.JWT_SECRET);

        if(decoded.Role != "Admin"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [users] = await con.query("SELECT COUNT(*) AS TotalUsers FROM users");

        const [stores] = await con.query("SELECT COUNT(*) AS TotalStores FROM stores");

        const [ratings] = await con.query("SELECT COUNT(*) AS TotalRatings FROM ratings");

        res.status(200).send({users,stores,ratings});
    }
    catch(error){
        res.status(500).send({ message: error.message });
    }
}

async function getStoreOwners(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token,process.env.JWT_SECRET);

        if(decoded.Role !== "Admin"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [result] = await con.query("SELECT user_id,name FROM users WHERE role=?",["Store Owner"]);
        
        res.status(200).send(result);

    }
    catch(error){
        res.status(500).send({ message: error.message});

    }

}

async function getStoreData(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        if(decoded.Role != "Admin"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [result] = await con.query(`SELECT s.store_id, s.user_id, s.store_name, u.name, u.email, u.address, AVG(r.rating) AS Rating
            FROM stores s JOIN users u ON s.user_id = u.user_id
            LEFT JOIN ratings r ON s.store_id = r.store_id
            GROUP BY s.store_id, s.user_id, s.store_name, u.name, u.email, u.address
        `);

        res.status(200).send(result);

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function getAdminNormalUsers(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token,process.env.JWT_SECRET);

        if(decoded.Role != "Admin"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [result] = await con.query(`SELECT user_id, name, email, address, role FROM users WHERE role IN ('Admin','Normal User')`);
        res.status(200).send(result);

    }
    catch(error){
        res.status(500).send({ message: error.message});
    }

}

async function getAllUsers(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token,process.env.JWT_SECRET);

        if(decoded.Role != "Admin"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [result] = await con.query(`SELECT u.user_id, u.name, u.email, u.address, u.role, AVG(r.rating) AS Rating
            FROM users u LEFT JOIN stores s ON u.user_id = s.user_id
            LEFT JOIN ratings r ON s.store_id = r.store_id
            GROUP BY u.user_id, u.name, u.email, u.address, u.role
        `);

        res.status(200).send(result);

    }
    catch(error){
        res.status(500).send({ message: error.message});
    }

}

module.exports = { addUser, addStore, getDashboardCounts, getStoreOwners, getStoreData, getAdminNormalUsers, getAllUsers  };