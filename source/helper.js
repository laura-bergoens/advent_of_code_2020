require('dotenv').config();

module.exports = {
    print(stringToPrint) {
        if(process.env.PRINT_ENABLED !== '0') console.log(stringToPrint);
    }
}
