const fs = require('fs');
const util = require('util');
const path = require('path');
const moment = require("moment");

module.exports = app => {
    const readFileAsync = util.promisify(fs.readFile);
    const writeFileAsync = util.promisify(fs.writeFile);

    app.get("/api/notes", async (req, res) => {
        try {
            const data = await readFileAsync("db/db.json", "utf8");
            const notes = JSON.parse(data);
            res.json(notes);
        } catch (err) {
            console.log(err);
        }
    });
    
    app.post("/api/notes", async (req, res) => {
        try {
            let noteNew = req.body;
            const data = await readFileAsync("db/db.json", "utf8");
            const notes = JSON.parse(data);
            noteNew.id = notes[notes.length - 1].id + 1;
            notes.push(noteNew);
            await writeFileAsync("db/db.json", JSON.stringify(notes));
            res.json(200);
        } catch (err) {
            console.log(err);
        }
    });
    
    app.get("/api/notes/:id", async (req, res) => {
        try {
            const data = await readFileAsync("db/db.json", "utf8");
            const notes = JSON.parse(data);
            res.json(notes[req.params.id]);
        } catch (err) {
            console.log(err);
        }
    });
    
    app.delete("/api/notes/:id", async (req, res) => {
        try {
            const data = await readFileAsync("db/db.json", "utf8");
            let notes = JSON.parse(data);
            notes = notes.filter((note) => note.id != req.params.id);
            await writeFileAsync("db/db.json", JSON.stringify(notes));
            res.json(200);
        } catch (err) {
            console.log(err);
        }
    });
    
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}