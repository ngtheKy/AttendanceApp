'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('./../db')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM `nhanvien`'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.status(200).json({
                'status_code' : 200,
                "message" : 'Success',
                'nhanvien' : response
            })
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM nhanvien WHERE id = ?'
        db.query(sql, [req.params.Id], (err, response) => {
            if (err) throw err
            res.json({
                'status_code' : 200,
                "message" : 'Success',
                'nhanvien' : response[0]
            })
        })
    },
    update: (req, res) => {
        
        let data = req.body
        let Id = req.params.Id;
        let sql = 'UPDATE nhanvien SET ? WHERE id = ?'
        // if(!data.id ){

        //     return res.status(400).send({error:`nhanvien information must be filled out`})
        // }
        db.query(sql, [data, Id], (err, response) => {
            if (err) throw err
            if(response.affectedRows == 0){
                res.status(404).json({
                    "status_code" : 404,
                    "message" : "error"
                })
            }
            res.status(200).json({
                "status_code" : 200,
                'message': 'Update successfully!',
                'response' : data
            })
        })
    },
    patch: (req, res) => {
        let data = req.body;
        let Id = req.params.Id;
        let sql = 'UPDATE nhanvien SET ? WHERE id = ?'

        
        db.query(sql, [data, Id], (err, response) => {
            if(response == 0){
                res.status(404).json({
                    "status_code" : 404,
                    "message" : "error"
                })
            }
            if (err) throw err
            res.json({message: 'Update successfully!'})
        })
    },    
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO `nhanvien` SET ?'
        // if(!data.id ){

        //     return res.status(400).send({error: '400' ,message:`nhanvien information must be filled out`})
        // }
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert successfully!'})
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM nhanvien WHERE id = ?'
        db.query(sql, [req.params.Id], (err, response) => {
            if(response.affectedRows == 0){
                res.status(404).json({
                    "status_code" : 404,
                    "message" : "error"
                })
            }
            if (err) throw err
            res.json({message: 'Delete successfully!'})
        })
    }
}
