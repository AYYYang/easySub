import app from './REST/app';
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`listening on ${port}!`);
});
