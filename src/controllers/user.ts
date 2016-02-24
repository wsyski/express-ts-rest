import express = require('express');
var path = require('path');

export module UserController {
    export function current(request: express.Request, response: express.Response) {
        response.sendFile(path.join(__dirname, '/../assets/json', 'user.current.json'));
    }
}

export default UserController;
