const fs = require('fs');
const { job, job2 } = require('./job');
const INPUT = `${__dirname}/../input/input.txt`;

/**
DESCRIPTION
 **/

async function main() {
  try {
    const rawInput = fs.readFileSync(INPUT, 'utf8');
    const solution1 = job(rawInput);
    console.log(`solution1: ${solution1}`);
    const solution2 = job2(rawInput);
    console.log(`solution2: ${solution2}`);
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
