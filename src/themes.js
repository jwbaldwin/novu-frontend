const light = {
    backgroundColor: "#fff !important",
    contentBackgroundColor: "#f0f2f5 !important",
    secondaryContentBackgroundColor: "#dadada !important",
    textColor: "rgba(0, 0, 0, 0.64) !important",
    transition: "all .5s !important",
    boxShadow: "box-shadow: 0 2px 4px 0 rgba(62,80,104,0.32) !important",
    primaryColor: "#35BFC1",
    secondaryColor: "#F33F47",
    primaryColorHover: "#3ED9DC",
    infoColor: "#1890ff",                           // info state color
    successColor: "#52c41a",                        // success state color
    warningColor: "#FFE060",                      	// warning state color
    errorColor: "#F25F5C",                          // error state color
};

const dark = {
    backgroundColor: "#1a1a1a !important",
    contentBackgroundColor: "#2f2f2f !important",
    secondaryContentBackgroundColor: "#626262 !important",
    textColor: "#ececec !important",
    transition: "all .03s !important",
    boxShadow: "box-shadow: 0 2px 4px 0 rgba(62,80,104,0.32) !important",
    primaryColor: "#35BFC1",
    secondaryColor: "#F33F47",
    primaryColorHover: "#3ED9DC",
    infoColor: "#1890ff",                           // info state color
    successColor: "#52c41a",                        // success state color
    warningColor: "#faad14",                      	// warning state color
    errorColor: "#f5222d",                          // error state color
};


const themes = {"light": light, "dark": dark}

export { themes };