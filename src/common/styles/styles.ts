export const colors = {
  appBackground: "#77878B",
  appBackground2: "#d4d4d4",
  shadow: "rgba(0, 0, 0, 0.08)",
  white: "#FFFFFF",

  success: "#31CB00",
  failure: "#FF1B1C",

  buttonPrimary: "#B7D5D4",
  buttonHover: "#488286",
  text: "rgb(123, 128, 154)",
  gradient: "linear-gradient(195deg, #305252 , #373E40)",
  gradient_reverse:
    "linear-gradient(195deg, rgb(206, 231, 230), rgb(191, 192, 192))",
  green: "#648767",
  onyx: "#373E40",
};

export const classes = {
  button: {
    primary: {
      backgroundImage:
        "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
    },
    secondary: {
      color: colors.buttonPrimary,
      border: "2px solid",
    },
    sideMenu: {
      padding: 0,
      backgroundColor: "transparent",
    },
    icon: {
      padding: 0,
    },
  },
  typography: {
    header: {
      fontSize: "150px",
    },
  },
};

export const sxClasses = {
  select: {
    ".MuiInput-input:focus": {
      backgroundColor: "transparent",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
  },
  modal: {
    bgcolor: "#FFF",
    boxShadow: "2px 0 4px 0 rgba(0,0,0,0.08)",
    borderRadius: "8px",
    p: 2,
    px: 4,
    pb: 3,
  },
  header: {
    fontSize: "150px",
  },
  input: {
    "& .MuiInput-underline:after": { borderBottomColor: colors.appBackground },
  },
};
