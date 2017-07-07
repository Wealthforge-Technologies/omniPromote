#!/usr/bin/env node
const fs = require('fs');

var util=require('util')
var exec=require('child_process').exec;

var argv = require ("argp").createParser ({ once: true })
    .allowUndefinedArguments ()
    .allowUndefinedOptions ()
    .argv ();


console.log(argv);


/////////// docker block
if (argv.docker) {
    var bulkPromote = '';
    if (argv.dockerDestination) {
        var destination = argv.dockerDestination;
    }
    else {
        console.error('the destination tag for the docker images is required. Where is it all going?')
        return 1;
    }
    // default value
    var dockerEnvironmentFile = './exportObject.json';
    if (argv.dockerEnvironmentFile) {
        dockerEnvironmentFile = argv.dockerEnvironmentFile;
    }
    let dockerEnvironment = JSON.parse(fs.readFileSync(dockerEnvironmentFile).toString());
    console.log(dockerEnvironment);
    dockerEnvironment.images.forEach(image => {
        var singlePromote='dockerPromote '+image.fullImage+' '+ image.build +' '+destination;
        console.log(singlePromote);
        bulkPromote = singlePromote + '\n' + bulkPromote;
    })
    console.log('//////////////// bulk')
    console.log(bulkPromote);

    console.log('/////////////////////////////////// output of execution')
    exec(bulkPromote,function(err,stdout,stderr){
        console.log(err);
        console.log(stdout);
        console.log(stderr);
    })

}
