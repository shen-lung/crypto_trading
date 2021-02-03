module.exports = {
    plugins: {
        'postcss-cssnext': {
            autoprefixer: {
                browsers: ['last 2 versions'],
            },
        },
    },
};