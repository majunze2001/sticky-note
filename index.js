import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from "http";
import { Server } from "socket.io";
import { readFile, writeFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const noteFile = path.join(__dirname, 'public', 'note');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    socket.on('write', (note) => {
        io.emit('receive', note);
        writeFile(noteFile, note, 'utf-8', (err) => {
            if (err) {
                console.error(err);
            }
        });
    })
});

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    readFile(noteFile, 'utf-8', (err, note) => {
        if (err) {
            res.send("Server Error");
            return;
        }
        res.render('index', { note: note });
    })
});

app.use(express.static(path.join(__dirname, 'public')));

httpServer.listen(process.env.PORT || 3000);