const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TrabalhoSD', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
