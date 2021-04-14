const connection = require('../util/connection');

async function findByHouse(id){
    const [rows,fields] = await connection.query(
        `SELECT * 
        FROM 'devices' 
        WHERE devices.houseid = ${id}`
    );

    for (const element of rows){
        subDevices = await findSubByDevice(element.id);
        element.channels = subDevices;
    }

    return JSON.parse(JSON.stringify(rows));
}

async function findSubByDevice(id){
    const [rows, fields] = await connection.query(
        `SELECT *
        FROM 'subdevices'
        WHERE subdevices.deviceid = ${id}
        `
    )

    return JSON.parse(JSON.stringify(rows));
}

async function findDevice(id){
    const [rows,fields] = await connection.query(
        `SELECT *
        FROM devices
        WHERE id = '${id}'`
    )

    return JSON.parse(JSON.stringify(rows));
}

exports.findByHouse = findByHouse;
exports.findBySubDevice = findSubByDevice;
exports.findDevice = findDevice;