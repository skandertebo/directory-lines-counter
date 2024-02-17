const fs = require("fs");
function countFileLines(dir) {
  let total = 0;
  fs.readdirSync(dir).forEach((file) => {
    // ignore node_modules
    if (
      file.endsWith(".js") ||
      file.endsWith(".ts") ||
      file.endsWith(".html") ||
      file.endsWith(".css") ||
      file.endsWith(".jsx") ||
      file.endsWith(".tsx")
    ) {
      const data = fs.readFileSync(dir + "\\" + file, "utf8");

      let lines = data.split("\n");
      console.log(dir + "/" + file + ": " + lines.length);
      total += lines.length;
    }
  });
  const subDirectories = fs.readdirSync(dir);
  if (subDirectories.length > 0) {
    subDirectories.forEach((subDir) => {
      try {
        const count = countFileLines(dir + "\\" + subDir);
        total += count;
      } catch {}
    });
  }
  return total;
}

// get dir from args
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node main.js <dir>");
  return;
}
const dir = args[0];
console.log("Total", countFileLines(dir));
