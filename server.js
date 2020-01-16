const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`IMPIANTI SPORTIVI | Server started on port ${PORT}`);
})
