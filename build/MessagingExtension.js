"use strict";
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
const builder = require("botbuilder");
const msteams = require("botbuilder-teams");
const faker = require("faker");
class MessagingExtension extends builder.UniversalBot {
    constructor(_connector) {
        super(_connector);
        this._connector = _connector;
        this._connector.onQuery("getRandomText", this.generateRandomResponse);
    }
    generateRandomResponse(event, query, callback) {
        // If the user supplied a title via the cardTitle parameter then use it or use a fake title
        let title = query.parameters && query.parameters[0].name === "cardTitle"
            ? query.parameters[0].value
            : faker.lorem.sentence();
        // Build the data to send
        let attachments = [];
        // Generate a card with task module deep links
        attachments.push(new builder.ThumbnailCard()
            .title("Task Module Demo Card")
            .text("This card opens a task module to do its work")
            .buttons([
            new builder.CardAction().type("openUrl").title("Custom Form").value("https://teams.microsoft.com/l/task/9dd149d9-7f18-4f36-affc-1ee95ec00d96?url=https%3A%2F%2Ftask-modules-demo.ngrok.io%2Fcustomform&height=medium&width=medium&title=Custom%20Form"),
            new builder.CardAction().type("openUrl").title("YouTube").value("https://teams.microsoft.com/l/task/9dd149d9-7f18-4f36-affc-1ee95ec00d96?url=https%3A%2F%2Ftask-modules-demo.ngrok.io%2FYouTube&height=medium&width=large&title=Satya%20Nadella's%20Build%202018%20Keynote"),
        ])
            .toAttachment());
        // Generate 5 results to send with fake text and fake images
        for (let i = 0; i < 5; i++) {
            attachments.push(new builder.ThumbnailCard()
                .title(title)
                .text(faker.lorem.paragraph())
                .images([new builder.CardImage().url(faker.image.image())])
                .toAttachment());
        }
        // Build the response to be sent
        let response = msteams.ComposeExtensionResponse
            .result("list")
            .attachments(attachments)
            .toResponse();
        // Send the response to teams
        callback(null, response, 200);
    }
}
exports.MessagingExtension = MessagingExtension;

//# sourceMappingURL=MessagingExtension.js.map
