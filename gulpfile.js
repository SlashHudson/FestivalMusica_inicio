const{ src, dest, watch, parallel} = require("gulp");

//CSS 

const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber'); //el plumber es una dependencia que se instala en npm para que no se detenga nuestra ejecucion de flujo de trabajo
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Imagenes
const cache = require ("gulp-cache");
const webp = require("gulp-webp"); //convertir imagenes de jpg a webp
const imagemin = require("gulp-imagemin");
const avif = require("gulp-avif");

//Javscript

const terser = require('gulp-terser-js');



function css(done){
        

    src('src/scss/**/*.scss') // Indentificar el archivo de SASS
    .pipe(sourcemaps.init())
    .pipe(plumber()) // hace que no se detenga el workflow
        .pipe(sass()) //Compilarlo, lo toma de la hoja de package.json
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css")) //Almacenarla en el disco duro


    done(); // avisa a gulp cuando llegamos al final y no nos mande error
}


function imagenes(done){
    const opciones = {
        optmizationLevel:3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}
function versionWebp(done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe(webp(opciones))
        .pipe(dest ('build/img'))
    done();
}


function versionAvif(done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{jpg,png}')
        .pipe(avif(opciones))
        .pipe(dest ('build/img'))
    done();
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/js"));

    done();
}

 function dev(done){
watch('src/scss/**/*.scss', css);  
watch('src/js/**/*.js', javascript);  

    done();
 }
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(versionAvif, imagenes,versionWebp,javascript,dev);