// const fs = require('fs');
const { job } = require('./job');
// const INPUT = `${__dirname}/../input/input.txt`;

/**
DESCRIPTION
 **/

async function main() {
    try {
        // const rawInput = fs.readFileSync(INPUT, 'utf8');
        const solution1 = job();
        console.log(`solution1: ${solution1}`);
    } catch (error) {
        console.error('\n', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main().then(
        () => process.exit(0),
        (err) => {
            console.error(err);
            process.exit(1);
        },
    );
}
