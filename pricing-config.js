/*
  DEFY DESIGN PRICING CONFIGURATION

  This is the only file you need to edit for future price changes.

  quantityBands:
    - "maxQuantity" is the highest quantity using that price.
    - "aluminumFront" is the aluminum price per card for front-only engraving.

  stainlessSurcharge:
    Added per card to the matching aluminum price.

  backEngravingCharge:
    Added per card when Double-sided is selected.
*/

window.DEFYPricing = {
  quantityBands: [
    { maxQuantity: 500, aluminumFront: 0.50 },
    { maxQuantity: 600, aluminumFront: 0.48 },
    { maxQuantity: 700, aluminumFront: 0.46 },
    { maxQuantity: 800, aluminumFront: 0.44 },
    { maxQuantity: 900, aluminumFront: 0.42 },
    { maxQuantity: 1000, aluminumFront: 0.40 }
  ],

  stainlessSurcharge: 1.00,
  backEngravingCharge: 0.25
};
