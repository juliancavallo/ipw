const fs = require('node:fs');
const path = require('node:path');
const css = require('css-tree');
const root = path.resolve(__dirname, '..');
// Parsear y serializar elimina espacios/comentarios sin alterar el orden de la cascada.
const sources = ['fonts.css', 'styles.css', 'cielo.css'];
const output = sources.map(name => css.generate(css.parse(
    fs.readFileSync(path.join(root, 'assets/css', name), 'utf8').replaceAll('\r\n', '\n'),
    { onParseError(error) { throw error; } }
))).join('\n') + '\n';
const target = path.join(root, 'assets/css/site.min.css');
if (process.argv.includes('--check')) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8').replaceAll('\r\n', '\n') !== output) {
        throw new Error('CSS generado desactualizado: ejecutar npm run build:css.');
    }
    console.log('CSS minificado actualizado.');
} else {
    fs.writeFileSync(target, output);
    console.log(`CSS generado: ${Buffer.byteLength(output)} bytes.`);
}
