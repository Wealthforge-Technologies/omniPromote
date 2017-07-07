#!/usr/bin/env node
const fs = require('fs');

var util=require('util')
var exec=require('child_process').exec;

var argv = require ("argp").createParser ({ once: true })
    .allowUndefinedArguments ()
    .allowUndefinedOptions ()
    .argv ();

// console.log(argv);
console.log('code goes here soon');
