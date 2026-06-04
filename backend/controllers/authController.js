const con = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signup(req, res){

    try{

        const d = req.body;

        const [result] = await con.query("SELECT * FROM users WHERE email=?",[d.Email]);

        if(result.length > 0){
            res.status(409).send({message: "Email Already Exists"});
        }
        else{
            const hashedPassword = await bcrypt.hash(d.Password, 10);
            await con.query("INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)",[d.Name,d.Email,hashedPassword,d.Address,d.Role]);

            res.status(200).send({message: "Signup Successful"});
        }

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function login(req, res){

    try{

        const d = req.body;

        const [result] = await con.query("SELECT * FROM users WHERE email=?",[d.Email]);

        if(result.length == 0){
            res.status(404).send({message: "Invalid Email"});
        }
        else{

            const passMatch = await bcrypt.compare(d.Password,result[0].password);

            if(!passMatch){
                res.status(401).send({message: "Invalid Password"});
            }
            else{
                const token = jwt.sign(
                    {UserId: result[0].user_id, Role: result[0].role},
                    process.env.JWT_SECRET,
                    { expiresIn: "30d" }
                );

                res.cookie("tokenn", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });

                res.status(200).send({
                    message: "Login Successful",
                    Role: result[0].role
                });
            }

        }

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function changePassword(req, res){

    const Token = req.cookies.tokenn;

    if (!Token) {
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token, process.env.JWT_SECRET);

        const d = req.body;

        const [result] = await con.query("SELECT * FROM users WHERE user_id=?", [decoded.UserId]);

        if(result.length == 0){
            res.status(404).send({message: "Invalid user"});
        }
        else{

            const passMatch = await bcrypt.compare(d.OldPassword,result[0].password);

            if(!passMatch){
                res.status(401).send({ message: "Old Password Incorrect"});
            }
            else{

                const hashedPassword = await bcrypt.hash(d.NewPassword,10);
                await con.query("UPDATE users SET password=? WHERE user_id=?",[hashedPassword, decoded.UserId]);

                res.status(200).send({message: "Password Changed Successfully"});
            }

        }

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

async function verifyUser(req, res){

    const Token = req.cookies.tokenn;

    if(!Token){
        return res.status(401).send({message: "Unauthorized"});
    }

    try{

        const decoded = jwt.verify(Token,process.env.JWT_SECRET);

        res.status(200).send({
            Role: decoded.Role
        });

    }
    catch(error){
        res.status(401).send({message: "Unauthorized"});
    }

}

async function logout(req, res){

    try{

        res.clearCookie("tokenn", {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        });

        res.status(200).send({message: "Logout Successful"});

    }
    catch(error){
        res.status(500).send({message: error.message});
    }

}

module.exports = { signup, login, changePassword, verifyUser, logout };