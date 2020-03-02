"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send('Hello Good World!');
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map