module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/js/**/*.js",
    "./resources/js/**/*.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
