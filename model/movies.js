const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    overview: { type: String, required: true },
    popularity: { type: Number, default: 0 },
    genre: { type: String, required: true },
    name: { type: String, required: true }
});

const Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;