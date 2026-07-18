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
    { maxQuantity: 500, aluminumFront: 1.00 },
    { maxQuantity: 600, aluminumFront: 0.98 },
    { maxQuantity: 700, aluminumFront: 0.96 },
    { maxQuantity: 800, aluminumFront: 0.94 },
    { maxQuantity: 900, aluminumFront: 0.92 },
    { maxQuantity: 1000, aluminumFront: 0.90 }
  ],

  stainlessSurcharge: 1.00,
  backEngravingCharge: 0.25
};
