const con = require("../config/db");
const jwt = require("jsonwebtoken");

async function getStoreRatingsUsers(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        if(decoded.Role != "Store Owner"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [result] = await con.query(`SELECT u.user_id, u.name, u.email, r.rating 
            FROM stores s JOIN ratings r ON s.store_id = r.store_id
            JOIN users u ON r.user_id = u.user_id
            WHERE s.user_id = ?`,[decoded.UserId]
        );

        res.status(200).send(result);
    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function getStoreAverageRating(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        if(decoded.Role != "Store Owner"){
            return res.status(403).send({message: "Access Denied"});
        }

        const [result] = await con.query(`SELECT AVG(r.rating) AS AverageRating
            FROM stores s JOIN ratings r ON s.store_id = r.store_id
            WHERE s.user_id = ?`,[decoded.UserId]
        );

        res.status(200).send(result);

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

module.exports = { getStoreRatingsUsers,getStoreAverageRating };