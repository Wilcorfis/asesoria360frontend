module.exports = function (config) {
  config.set({
    // Base path para resolver archivos
    basePath: '',

    // Frameworks a usar
    frameworks: ['jasmine'],

    // Archivos a incluir en la ejecución
    files: [
      'src/test.ts', // Este es el archivo de configuración para Angular que inicializa las pruebas
    ],

    // Preprocesadores para los archivos
    preprocessors: {
      'src/test.ts': ['@angular-devkit/build-angular/src/test/karma-configuration.js']
    },

    // Exclusión de ciertos archivos, si es necesario
    exclude: [],

    // Plugins de Karma a usar
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
        // Configuración del reporte HTML (opcional, para ver los resultados de forma más amigable en un navegador)
        jasmineHtmlReporter: {
          suppressAll: true, // No muestra un resumen de resultados si no hay errores
          suppressFailed: false // Muestra todos los detalles si hay fallos
        },

    // Reportadores de resultados
    reporters: ['dots','progress', 'kjhtml'],

    // Puerto en el que se ejecuta Karma
    port: 9876,

    // Nivel de logging
    logLevel: config.LOG_INFO,

    // Habilitar/Deshabilitar la auto ejecución
    autoWatch: true,

    // Configuración del navegador
    browsers: ['Chrome'], // Puedes cambiar esto por ChromeHeadless si quieres que se ejecute sin interfaz gráfica

    // Lanzar Karma en modo "Single Run" o mantenerlo observando los archivos
    singleRun: false,
    //restartOnFileChange: true

    // Si quieres que las pruebas se reinicien automáticamente en caso de cambios
    concurrency: Infinity,
  });
};

