import express = require('express');
var path = require('path');
// import fs = require('fs');

export module AuthController {
    export function login(request: express.Request, response: express.Response) {
        console.log(request.body);
        response.sendFile(path.join(__dirname, '/../assets/json', 'auth.login.json'));
        // let data = fs.readFileSync('../assets/json/login.json', 'utf8');
        /*
        fs.readFile('../assets/json/login.json', (err: NodeJS.ErrnoException, data: Buffer) => {
            if (err) {
                throw err;
            }
            console.log(data);
        });
        */
    }
}

export default AuthController;
