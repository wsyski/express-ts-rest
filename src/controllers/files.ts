import express = require('express');
var path = require('path');

export module FilesController {
    export function all(request: express.Request, response: express.Response) {
        console.log(request.body);
        response.sendFile(path.join(__dirname, '/../assets/json', 'files.all.json'));
    }

    export function images(request: express.Request, response: express.Response) {
        console.log(request.body);
        response.sendFile(path.join(__dirname, '/../assets/json', 'files.images.json'));
    }

    export function pages(request: express.Request, response: express.Response) {
        console.log(request.body);
        response.sendFile(path.join(__dirname, '/../assets/json', 'files.pages.json'));
    }

    export function documents(request: express.Request, response: express.Response) {
        console.log(request.body);
        response.sendFile(path.join(__dirname, '/../assets/json', 'files.documents.json'));
    }
}

export default FilesController;
