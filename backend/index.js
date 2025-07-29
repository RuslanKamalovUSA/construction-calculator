
    import express from 'express';
    import { MongoClient } from 'mongodb'
    import path from 'path';
    import cors from 'cors';
    import bodyParser from 'body-parser';
    import router from './calculatorRouter.js';
    import dotenv from 'dotenv';   
    import Operation from './models/Operation.js'
    import { fileURLToPath } from 'url';



    dotenv.config();

    // const express = require('express');
    // const { MongoClient } = require('mongodb')
    // const path = require('path');
    // const cors = require('cors');
    // const bodyParser = require('body-parser');
    // const calculatorRouter = require('./calculatorRouter');
    // require('dotenv').config();
    // const arr = require('../backend/1')
    // const Operation = require('./models/Operation')

    const useHttpDB = await import('../src/hooks/http.hookDB.js');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const app = express();
    //const PORT = process.env.PORT || 5000;
    const PORT = 5000;
    
    app.use(express.static(path.resolve(__dirname, 'build')))
    app.use(cors());
    app.use(bodyParser.json());
    // app.use('/main', calculatorRouter)

    const client = new MongoClient('mongodb+srv://ruslankamalovusa:epgthF4LaWksqiEQ@cluster0.03mgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    
    // const data = [
    //     {
    //       "name": "Демонтаж, зачистка старой отделки",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "destruction"
    //     },
    //     {
    //       "name": "Штукатурка стен",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "wall_putty"
    //     },
    //     {
    //       "name": "Поклейка обоев",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "wallpaper"
    //     },
    //     {
    //       "name": "Шпаклевка стен",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "walls-putty"
    //     },
    //     {
    //       "name": "Натяжной/Гипсокартонный потолок",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "ceiling_installation"
    //     },
    //     {
    //       "name": "Покраска стен",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "wall_painting"
    //     },
    //     {
    //       "name": "Покраска потолка",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "ceiling_paintining"
    //     },
    //     {
    //       "name": "Шпаклевка потолка",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "silence_putty"
    //     },
    //     {
    //       "name": "Плинтус потолочный",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "silence"
    //     },
    //     {
    //       "name": "Откосы оконные",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "windows"
    //     },
    //     {
    //       "name": "Стяжка пола",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "floors"
    //     },
    //     {
    //       "name": "Укладка ламината",
    //       "count": "20",
    //       "unit": "грн/м2",
    //       "id": "floor_laying"
    //     },
    //     {
    //       "name": "Установка плинтуса",
    //       "count": "20",
    //       "unit": "грн/шт",
    //       "id": "moldings"
    //     },
    //     {
    //       "name": "Плитка санузлы, пол кухни, коридор",
    //       "count": "0",
    //       "unit": "грн/шт",
    //       "id": "tile_floors"
    //     },
    //     {
    //       "name": "Разводка, установка сантехники",
    //       "count": "30000",
    //       "unit": "грн/шт",
    //       "id": "plumbing_installation"
    //     },
    //     {
    //       "name": "Электрика: розетки, выключ., свет",
    //       "count": "200",
    //       "unit": "грн/м2",
    //       "id": "electrical_wiring"
    //     },
    //     {
    //       "name": "Вставка межкомнатных дверей",
    //       "count": "10000",
    //       "unit": "грн/шт/25м2",
    //       "id": "doors"
    //     },
    //     {
    //       "name": "Вставка входной двери",
    //       "count": "10000",
    //       "unit": "грн/шт",
    //       "id": "door"
    //     }
    //     ] 
    
    const start = async () => {
        try {
            app.listen(PORT, () => console.log(`Server is running on port ${{PORT}}`))
        } catch (e) {
            console.log(e)
        }
    }
    
    const arr = [
    {
      "name": "Гостинная",
      "value": 0,
      "id": "living_room"
    },
    {
      "name": "Гостинная кухней(студия)",
      "value": 0,
      "id": "living_room"
    },
    {
      "name": "Коридор №1",
      "value": 0,
      "id": "corridor_2"
    },
    {
      "name": "Коридор №2",
      "value": 0,
      "id": "corridor_2"
    },
    {
      "name": "Кухня",
      "value": 0,
      "id": "kitchen"
    },
    {
      "name": "Спальня №1",
      "value": 0,
      "id": "bedroom"
    },
    {
      "name": "Спальня №2",
      "value": 0,
      "id": "bedroom"
    },
    {
      "name": "Детская №1",
      "value": 0,
      "id": "kids_bedroom"
    },
    {
      "name": "Детская №2",
      "value": 0,
      "id": "kids_bedroom"
    },
    {
      "name": "Санузел (ванная или душ)",
      "value": 0,
      "id": "bathroom"
    },
    {
      "name": "Санузел (туалет)",
      "value": 0,
      "id": "restroom"
    },
    {
      "name": "Лоджия",
      "value": 0,
      "id": "balcony-lodgiya"
    },
    {
      "name": "Кладовая",
      "value": 0,
      "id": "storage"
    },
    {
      "name": "Балкон №1",
      "value": 0,
      "id": "balcony"
    },
    {
      "name": "Балкон №2",
      "value": 0,
      "id": "balcony"
    }
    ]

    start()
    
    app.get('/getData', async (req, res) => {
        try {
            await client.connect();
            const db = await client.db('construction-calculator');
            //const rooms = await db.collection('rooms')
            //await rooms.insertMany(arr)
            const operationsColl = await db.collection('operations')
            const operations = await operationsColl.find({}).toArray();
            const roomsColl = await db.collection('rooms');
            const rooms = await roomsColl.find({}).toArray();
            const data = [operations, rooms]

            return res.json({message: 'works', data})
        } catch (error) {
            res.status(500).send("Error")
        } finally {
            await client.close()
        }
    })

    app.get('/getAdmins', async (req, res) => {
      try {
        await client.connect();
        const db = await client.db('construction-calculator');
        const adminsColl = await db.collection('admins');
        const admins = await adminsColl.find({}).toArray();
        return res.json({message: 'admins', admins})
      } catch (error) {
        res.status(500).sendStatus('ERROR')
      }
    })

    app.get('*', async (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })

    // app.get('/', (req, res) => {
    //     res.send('Backend is running')
    // });

   