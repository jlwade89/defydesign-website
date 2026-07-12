/*
  DEFY DESIGN PRODUCT CONFIGURATION

  Edit this file whenever you need to add, remove, rename, reorder,
  or adjust an aluminum color.

  Each color uses:

  id:
    Lowercase internal name. Use hyphens instead of spaces.
    Example: "dark-blue"

  label:
    Customer-facing name shown on the website and order request.

  swatch:
    Hex color used for the small selector button.

  preview:
    Three hex colors used to create the metallic card preview:
    [highlight, shadow, finish]

  To add a new color:
    1. Copy one complete color entry.
    2. Give it a unique id.
    3. Change its label, swatch, and preview colors.
    4. Save this file.

  No HTML or CSS changes are required.
*/

window.DEFYProductConfig = {
  defaultAluminumColor: "black",

  aluminumColors: [
    {
      id: "black",
      label: "Black",
      swatch: "#151719",
      preview: ["#25292c", "#07090a", "#151719"]
    },
    {
      id: "purple",
      label: "Purple",
      swatch: "#56366f",
      preview: ["#765195", "#281735", "#56366f"]
    },
    {
      id: "blue",
      label: "Blue",
      swatch: "#1f6e9f",
      preview: ["#3282b3", "#0a2f48", "#1f6e9f"]
    },
    {
      id: "dark-blue",
      label: "Dark Blue",
      swatch: "#123652",
      preview: ["#214e6c", "#071c2a", "#123652"]
    },
    {
      id: "dark-gold",
      label: "Dark Gold",
      swatch: "#8f6726",
      preview: ["#a77b35", "#4f350f", "#8f6726"]
    },
    {
      id: "rose-gold",
      label: "Rose Gold",
      swatch: "#bb7a72",
      preview: ["#d09a91", "#80524e", "#b77770"]
    },
    {
      id: "light-gold",
      label: "Light Gold",
      swatch: "#d7b96b",
      preview: ["#ead58f", "#9f7f32", "#d7b96b"]
    },
    {
      id: "red",
      label: "Red",
      swatch: "#a62224",
      preview: ["#c23b3b", "#5b1114", "#9d2427"]
    },
    {
      id: "green",
      label: "Green",
      swatch: "#435d3d",
      preview: ["#57714e", "#253522", "#435d3d"]
    }
  ]
};
