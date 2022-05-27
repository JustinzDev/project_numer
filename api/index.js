const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const port = 4000
require('dotenv').config()

const connection = require('./db')

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//connection
connection()

const rootofEQ = require('./routes/rootofeq')

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Swagger Numer",
        version: "1.0.0",
      },
      servers: [
        {
            url: "http://localhost:4000",
        }
      ],
    },
    apis: ["index.js"],
};
  
const openapiSpecification = swaggerJsDoc(options);
  
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
/**
 * @swagger
 * /api/rootofeq/{Api}/{Params}:
 *   get:
 *     summary: Get Example
 *     parameters:
 *       - in: path
 *         name: Api
 *         schema:
 *           type: string
 *         required: true
 *         description: The Api of method
 *       - in: path
 *         name: Params
 *         schema:
 *            type: string
 *         required: true
 *         description: The Params of method
 *     responses:
 *       200:
 *         description: การร้องขอสำเร็จ
 *       404:
 *         description: ไม่พบข้อมูลที่ร้องขอในเซิฟเวอร์
 */

//routes
app.use('/api/rootofeq', rootofEQ)
app.listen(port, () => console.log(`Running Server on ${port}`))