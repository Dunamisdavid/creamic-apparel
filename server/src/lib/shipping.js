export const ZONES = [
  { key: "abuja", label: "Abuja (FCT)", fee: 2500 },
  { key: "pickup", label: "Collect at the Wuye shop", fee: 0 },
  { key: "southwest", label: "Lagos, Ogun, Oyo, Osun, Ondo, Ekiti", fee: 5000 },
  { key: "north", label: "Kaduna, Kano, Niger, Plateau, Nasarawa, Kogi", fee: 4500 },
  { key: "other", label: "All other states", fee: 6000 },
];
export const FREE_OVER = 150000;

export function deliveryFee(zoneKey, subtotal) {
  const zone = ZONES.find((z) => z.key === zoneKey);
  if (!zone) return null;
  if (zone.fee === 0 || subtotal >= FREE_OVER) return { zone, fee: 0 };
  return { zone, fee: zone.fee };
}