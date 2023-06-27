require('dotenv').config()
import db from '../knexConfig'
import { app } from './app'

const port = 3001

const connectionTest = async () => {
    try {
        const connection = await db.raw("SELECT 1 + 1");
        console.log(connection.rows[0]);
        console.log("Connection has been established successfully.");
    } catch (err) {
        console.error("Unable to connect to the database:", err);
    }
};

connectionTest();

app.listen(port, () => { console.log(`I am listening on port ${port}`) })