
import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import sharp from 'sharp';
import {src, dest, watch, series} from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import terser from 'gulp-terser'

const sass = gulpSass(dartSass);

export function js(done){
    src('src/js/app.js')
    .pipe(terser())
    .pipe(dest('build/js'))

    done();
}

export function css(done){
    src('src/scss/app.scss', {sourcemaps: true})
    .pipe(sass({
        outputStyle: 'compressed'
    }) .on('error', sass.logError))
    .pipe(dest('build/css', {sourcemaps: true}))

    done();
}

/*
export async function crop(done) {
    const inputFolder = 'src/img/full'
    const outputFolder = 'src/img/sharp';
    const width = 350;
    const height = 203;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(png)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}
*/
export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileavif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileavif)
}

export function dev(){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    watch('src/js/**/*.{jpg,.png}', imagenes)

}

export default series(js,css, imagenes, dev);