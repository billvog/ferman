const withTM = require("next-transpile-modules")(["@ferman-pkgs/common", "@ferman-pkgs/controller"]);

module.exports = withTM({
  future: {
    webpack5: true,
  },
})