const size = parseInt(process.argv[2]) || 4;
const find = (function (length) {
  function jump(oldpos) {
    if (oldpos === 0) {
      return oldpos + 1;
    }
    if (oldpos === length - 1) {
      return oldpos - 1;
    }
    const newpos = Math.random() > 0.5 ? oldpos + 1 : oldpos - 1;
    return Math.max(Math.min(newpos, length - 1), 0);
  }

  let attempts = 0;
  let pos = jump(parseInt(Math.random() * 1000) % length);

  return function (guess) {
    attempts++;
    const field = Array(length)
      .fill('-')
      .map((v, i) => {
        if (i === guess && i === pos) return 'F';
        if (i === guess) return 'g';
        // if (i === pos) return 'R';
        return v;
      })
      .join('');
    console.log(`${field} ${JSON.stringify({ pos, guess, round: attempts })}`);

    if (pos === guess) {
      console.log(`You found the 🐰 at ${pos} after ${attempts} attempts.`);
      process.exit(0);
    }
    pos = jump(pos);
  };
})(size);

let i = 0;
while (true) {
  find(i);
  i = (i + 1) % size;
}
