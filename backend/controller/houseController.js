const connection = require('../util/connection');

async function findByOwner(id){
    const [rows,fields] = await connection.query(
        `SELECT houses.id, houses.name, user_house.position
        FROM user_house
        JOIN houses ON houses.id = user_house.houseid
        WHERE user_house.userid = ${id}`
    );

    // rooms devices
    for (const element of rows){
        const item = await findRoomDeviceMemberByHouseid(element.id);
        element.rooms = item.rooms;
        element.devices = item.devices;
        element.members = item.members;
    }

    // console.log(rows);
    return JSON.parse(JSON.stringify(rows))
}


async function findRoomDeviceMemberByHouseid(houseid){
    // console.log(houseid);
    const [rooms, rfields] = await connection.query(
        `SELECT *
        FROM rooms
        WHERE rooms.houseId = ${houseid}`
    );
    // console.log(rows);

    const [devices, dfields] = await connection.query(
        `SELECT *
        FROM devices
        WHERE devices.houseId = ${houseid}`
    );
    
    const [members, mfields] = await connection.query(
        `SELECT *
        FROM user_house
        WHERE user_house.houseid = ${houseid}`
    );

    return { 
        rooms: JSON.parse(JSON.stringify(rooms)), 
        devices: JSON.parse(JSON.stringify(devices)),
        members: JSON.parse(JSON.stringify(members))
    } 
}

async function insertHouse(data, user){
    
    const [rows, fields] = await connection.query(
        `INSERT 
        INTO houses(id, name) 
        VALUES (null,'${data.name}')`
    )
    const [deviceUpdate, deviceField] = await connection.query(
        `UPDATE devices 
        SET houseid='${rows.insertId}' 
        WHERE devices.id = '${data.key}'`
    )

    const [row, field] = await connection.query(
        `INSERT
        INTO user_house(userid, houseid, position)
        VALUES ('${user.id}', '${rows.insertId}', 1);
        `
    )
}



exports.findByOwner = findByOwner;
exports.insertHouse = insertHouse;