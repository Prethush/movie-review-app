module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        25: "0 1 22%",
        30: "0 1 31.5%",
        50: "0 1 47.5%",
        100: "0 1 100%",
        70: "0 1 65%"
      },
      height: {
        imageHeight: "30rem",
        custom: "600px"
      },
      width: {
        imgWidth: "30rem",
        custom: "600px"
      },
      colors: {
        primary: "#272727",
        profileBg: "rgb(51,51,51)"
      },
      boxShadow: {
        custom: "32px 26px 20px -20px rgba(0,0,0,0.4)"
      },
      maxHeight: {
        imgHeight: "50px"
      },
      minWidth: {
        img: "36rem"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
