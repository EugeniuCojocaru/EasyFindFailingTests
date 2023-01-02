export const colors = {
  appBackground: "#FFFFFF",
  navigator: "#0099ff",
  shadow: "rgba(0, 0, 0, 0.08)",
  white: "#FFFFFF",
  black: "#000",
  success: "#31CB00",
  failure: "#FF1B1C",
};

export const gradients = {
  apple: "linear-gradient(90deg, rgba(174,174,178) 0%, rgba(99,99,102) 100%);" ,
  android: "linear-gradient(90deg, #2EB62C 0%, #57C84D 100%);" 
}

export const classes = {
  button: {
    primary: {
      backgroundImage:
        "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
    },
    secondary: {
      color: colors.black,
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
