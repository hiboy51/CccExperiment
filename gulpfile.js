const gulp = require("gulp");
const rename = require("gulp-rename");
const exec = require("child_process").exec;

/** deperated*/
gulp.task("gen_protobuf", function() {
    return gulp.src("assets/resources/proto/common.proto")
        .pipe(gulpprotobuf())
        .pipe(rename(function(path) {
            path.basename = "common";
        }))
        .pipe(gulp.dest("assets/scripts/test/TestProtobuf/"));
});

gulp.task("trans_protobuf_to_js", function(cb) {
    const pbjs_path = "node_modules\\.bin\\pbjs";
    const proto_path = "assets\\resources\\proto\\Message.proto";
    const target_path = "assets\\scripts\\test\\TestProtobuf\\Message.js";
    const commad = pbjs_path + " -t static-module " + proto_path + " > " + target_path;
    exec(commad, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})