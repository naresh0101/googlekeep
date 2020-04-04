var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var cors = require("cors");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();

const { HOST, USERME, PASSWORD, DATABASE, GMAILID, GMAILPASS } = process.env;

app.use(cors());
app.use(bodyparser());

var knex = require("knex")({
    client: "mysql",
    connection: {
        host: HOST,
        user: USERME,
        password: PASSWORD,
        database: DATABASE
    }
});

function create_table(tablename) {
    knex.schema
        .createTable(tablename, function(table) {
            table.increments(); //id
            table.string("email");
            table.string("password");
        })
        .then(() => {
            console.log(
                "=========================================================================================== table created"
            );
        })
        .catch(() => {
            console.log(
                "========================================================================= table already exist"
            );
        });
}

function create_notetable(tablename) {
    knex.schema
        .createTable(tablename, function(table) {
            table.increments(); //id
            table.string("email");
            table.string("title");
            table.string("note");
            table.string("image");
            table.string("color");
            table.string("bin");
            table.string("pin");
        })
        .then(() => {
            console.log(
                "================================Notes=========================================================== table created"
            );
        })
        .catch(() => {
            console.log(
                "====================================Notes===================================== table already exist"
            );
        });
}

app.post("/registration", (req, res) => {
    create_table("googlekeepusers");
    console.log(req.body);
    knex.select("*")
        .from("googlekeepusers")
        .where("email", req.body.email)
        .then(data => {
            console.log(data);
            if (data.length === 0) {
                console.error(
                    "data is not present!==============================================/registration"
                );
                knex("googlekeepusers")
                    .insert(req.body)
                    .then(() => {
                        var token = jwt.sign(
                            { email: req.body.email },
                            "qazmlp"
                        );
                        console.log(token);
                        res.send({ result: true, Token: token });
                    });
            } else {
                res.send({ result: false });
            }
        });
});

app.post("/login", (req, res) => {
    create_notetable("Notes");
    knex.select("*")
        .from("googlekeepusers")
        .where("email", req.body.email)
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                console.error(data);
                if (data[0].password == req.body.password) {
                    var token = jwt.sign({ email: data[0].email }, "qazmlp");
                    console.log(
                        "===============================================================/login"
                    );
                    knex.select("*")
                        .from("Notes")
                        .where("email", req.body.email)
                        .then(data => {
                            res.send({
                                result: true,
                                Token: token,
                                notes: data[0]
                            });
                        });
                } else {
                    res.send({ result: false });
                }
            } else {
                res.send({ result: false });
            }
        });
});

app.post("/forgotpass", (req, res) => {
    knex("googlekeepusers")
        .where({ email: req.body.email })
        .select("*")
        .then(packet => {
            if (packet.length > 0) {
                // ---------------------------------------------------
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: GMAILID,
                        pass: GMAILPASS
                    }
                });

                var mailOptions = {
                    from: "gmail",
                    to: req.body.email,
                    subject: "Google keep clone",
                    html:
                        "Hello " +
                        ",<br></br><br></br>This is you Google keep clone account password <b>" +
                        packet[0].password +
                        "</b>.Please keep it secret.<br></br>Good luck."
                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.send({ result: true });
                        console.log(
                            "Email sent:" + info.response,
                            "===========================================forgotpassword"
                        );
                    }
                });
            } else {
                res.send({ result: false });
            }
        })
        .catch(err => {
            res.send({ result: false });
            console.log(err);
        });
});

app.post("/savenote", (req, res) => {
    create_notetable("Notes");
    var email = jwt.verify(req.body.Token, "qazmlp");
    var notecontent = req.body.Note;
    var notetitle = req.body.title;
    knex("Notes")
        .insert({
            title: notetitle,
            note: notecontent,
            email: email.email,
            color: req.body.color,
            bin: req.body.bin,
            pin: req.body.pin
        })
        .then(() => {
            console.log(
                "Notes has been save!=============================================/savenote"
            );
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/fetchnotes", (req, res) => {
    var email = jwt.verify(req.body.Token, "qazmlp");
    console.log("==================================/fetchnotes");
    knex("Notes")
        .where({ bin: 0, email: email.email, pin: 0 })
        .select("*")
        .then(packet => {
            res.send(packet);
            console.log(
                "================================================fetchnotes"
            );
        })
        .catch(err => {
            console.log(err);
            res.send('the token is invalid');
        });
});

app.post("/searchforcard", (req, res) => {
    var email = jwt.verify(req.body.Token, "qazmlp");
    console.log("==================================/searchforcard");
    knex("Notes")
        .where({ bin: 0, email: email.email, title: req.body.search })
        .select("*")
        .then(packet => {
            console.log(
                "================================================/searchforcard"
            );
            res.send({ result: true, data: packet });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/mybin", (req, res) => {
    var email = jwt.verify(req.body.Token, "qazmlp");
    console.log("==================================/mybin");
    knex("Notes")
        .where({ bin: 1, email: email.email })
        .select("*")
        .then(data => {
            res.send(data);
            console.log(
                "================================================mybin"
            );
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/deletepermament", (req, res) => {
    knex("Notes")
        .where({ title: req.body.Title, bin: 1 })
        .del("*")
        .then(data => {
            // console.log(data)
            res.send({ result: true });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/deletenote", (req, res) => {
    knex("Notes")
        .where({ title: req.body.Title })
        .update({ bin: 1 })
        .then(data => {
            // console.log(data)
            res.send({ result: true });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/restore", (req, res) => {
    knex("Notes")
        .where({ title: req.body.Title })
        .update({ bin: 0 })
        .then(data => {
            // console.log(data)
            res.send({ result: true });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/pin", (req, res) => {
    knex("Notes")
        .where({ title: req.body.Title, pin: 0 })
        .update({ pin: 1 })
        .then(data => {
            // console.log(data)
            console.log("===========================================pin");
            res.send({ result: true });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/mypin", (req, res) => {
    var email = jwt.verify(req.body.Token, "qazmlp");
    console.log("==================================/mypin");
    knex("Notes")
        .where({ pin: 1, email: email.email })
        .select("*")
        .then(data => {
            res.send(data);
            console.log(
                "================================================/mypin"
            );
        })
        .catch(err => {
            console.log(err);
            res.send('the token is invalid');
        });
});

app.post("/unpin", (req, res) => {
    knex("Notes")
        .where({ title: req.body.Title, pin: 1 })
        .update({ pin: 0 })
        .then(data => {
            // console.log(data)
            console.log("===========================================unpin");
            res.send({ result: true });
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(7000, () => {
    console.log(`your app is listening at port 7000`);
});
