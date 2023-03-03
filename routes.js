const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    const data = req.app.locals.data;
    res.json(data);
});

router.post('/', (req, res) => {
    const { nama, warna, jumlah } = req.body;
    const id = Date.now().toString();
    req.app.locals.data[id] = { id, nama, warna, jumlah };
    res.status(201).json({ message: "Anjay bisa simpen data, senggouuul doong" });
    fs.writeFileSync('./data.json', JSON.stringify(req.app.locals.data));

});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.app.locals.data[id];
    if (data) {
        res.json(data);
    } else {
        res.status(404).json({ message: "Anjay gabisa, ga ada data nya, nyebur ke kali" });

    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nama, warna, jumlah } = req.body;
    const data = req.app.locals.data[id];
    if (data) {
        data.nama = nama || data.nama;
        data.warna = warna || data.warna;
        data.jumlah = jumlah || data.jumlah;
        fs.writeFileSync('./data.json', JSON.stringify(req.app.locals.data));
        res.status(201).json({ message: "Anjay bisa ubah data, senggouuul dong", data});
    } else {
        res.status(404).json({ message: "Anjay gabisa, salah alamat lu" });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const data = req.app.locals.data[id];
    if (data) {
        delete req.app.locals.data[id];
        res.status(201).json({ message: "Anjay bisa hapus data, senggouuul doong" });
        fs.writeFileSync('./data.json', JSON.stringify(req.app.locals.data));
    } else {
        res.status(404).json({ message: 'Data tidak ditemukan' });
    }
});

module.exports = router;
