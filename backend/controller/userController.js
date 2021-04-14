const connection = require('../util/connection');

async function findAll(){
    const [rows,fields] = await connection.query("SELECT * FROM users");
    // console.log(JSON.stringify(rows));
    return JSON.parse(JSON.stringify(rows))
}

async function findByEmail(email){
    const [rows,fields] = await connection.query(`
        SELECT * 
        FROM users 
        WHERE users.email = '${email}'`);
    return JSON.parse(JSON.stringify(rows[0]))
}

async function createUser(data){
    const {name, email, password, type} = data;

    try {
        return await connection.query(`
            INSERT INTO users
            (id, display, email, type, password)
            VALUES
            ( NULL, '${name}', '${email}', '${type}', '${password}')
        `);

        console.log(result[0].insertId);
    } catch (e) {
        console.log(e);
    }

}

exports.createUser = createUser;
exports.findAll = findAll;
exports.findByEmail = findByEmail;