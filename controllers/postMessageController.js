const express = require('express')
var router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId

var { PostMessage } = require('../models/postMessage')

router.get('/', (req, res) => {
    PostMessage.find((err, doc) => {
        if(!err) res.send(doc)
        else console.log('Deu ruim chefe! Erro ao tentar recuperar todos os documentos: ' + JSON.stringify(err,undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new PostMessage({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err, doc) => {
        if(!err) res.send(doc)
        else console.log('Viiish! Erro ao tentar criar um novo registro: ' + JSON.stringify(err,undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Putz Grila! Nenhum registro com o seguinte ID: ' + req.params.id)
    
        var updatedRecord = {
            title: req.body.title,
            message: req.body.message
        }
    
        PostMessage.findByIdAndUpdate(req.params.id, {$set:updatedRecord}, {new: true}, (err, doc) => {
            if(!err) res.send(doc)
            else console.log('Lascou rapaz! Erro ao tentar atualizar um registro: ' + JSON.stringify(err,undefined, 2))
        })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('Putz Grila! Nenhum registro com o seguinte ID: ' + req.params.id)
    
    PostMessage.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) res.send(doc)
        else console.log('Ai caramba! Erro ao tentar deletar um registro: ' + JSON.stringify(err,undefined, 2))
    })
})

module.exports = router