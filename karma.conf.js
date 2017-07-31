module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "src/**/*.ts" },
            { pattern: "spec/**/*.ts" }
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript", "coverage"],
            "spec/**/*.ts": ["karma-typescript"]
        },
        reporters: ["progress", "karma-typescript"],
        coverageReporter: {
            type : 'lcov',
            dir : 'coverage/'
        }
    });
};
