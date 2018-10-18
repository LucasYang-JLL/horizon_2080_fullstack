const { watch, series } = require("gulp");
const { exec } = require("child_process");

function runDev(cb) {
    // place code for your default task here
    exec("npm run dev", (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
    cb();
}

watch("./horizon_2080/frontend/src/**/*.js", runDev);

exports.default = runDev;
