const con = require("../config/db");
const jwt = require("jsonwebtoken");

async function getAllStores(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        if(decoded.Role != "Normal User"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [result] = await con.query(`SELECT s.store_id, s.store_name, u.address, AVG(r.rating) AS OverallRating, ur.rating AS UserSubmittedRating
            FROM stores s JOIN users u ON s.user_id = u.user_id
            LEFT JOIN ratings r ON s.store_id = r.store_id
            LEFT JOIN ratings ur ON s.store_id = ur.store_id AND ur.user_id = ?
            GROUP BY s.store_id, s.store_name, u.address, ur.rating`, [decoded.UserId]
        );

        res.status(200).send(result);

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function submitRating(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        if(decoded.Role != "Normal User"){
            return res.status(403).send({message: "Access Denied"});
        }

        const d = req.body;

        const [result] = await con.query("SELECT * FROM ratings WHERE user_id=? AND store_id=?",[decoded.UserId, d.StoreId]);

        if(result.length > 0){
            return res.status(409).send({message: "Rating Already Submitted"});
        }

        await con.query("INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)",[decoded.UserId, d.StoreId, d.Rating]);

        res.status(200).send({message: "Rating Submitted Successfully"});

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function updateRating(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        if(decoded.Role != "Normal User"){
            return res.status(403).send({message: "Access Denied"});
        }

        const d = req.body;

        await con.query("UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?", [d.Rating, decoded.UserId, d.StoreId]);

        res.status(200).send({message: "Rating Updated Successfully"});

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

module.exports = { getAllStores, submitRating, updateRating };