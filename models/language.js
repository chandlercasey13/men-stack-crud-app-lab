
const mongoose = require('mongoose');



const languageSchema = 
{
    name: String,
    details: String,
    isOOP: Boolean

}


const Language = mongoose.model('Language', languageSchema);

module.exports = Language;