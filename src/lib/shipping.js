export const ZONES = [
  { key: "abuja", label: "Abuja (FCT)", fee: 2500, eta: "Same day on orders before 3pm" },
  { key: "pickup", label: "Collect at the Wuye shop", fee: 0, eta: "Ready in 2 hours" },
  { key: "southwest", label: "Lagos, Ogun, Oyo, Osun, Ondo, Ekiti", fee: 5000, eta: "2–3 working days" },
  { key: "north", label: "Kaduna, Kano, Niger, Plateau, Nasarawa, Kogi", fee: 4500, eta: "2–3 working days" },
  { key: "other", label: "All other states", fee: 6000, eta: "3–5 working days" },
];

export const FREE_OVER = 150000;

export const zoneByKey = (key) => ZONES.find((z) => z.key === key) || ZONES[0];

export const feeFor = (key, subtotal) => {
  const zone = zoneByKey(key);
  if (zone.fee === 0) return 0;
  return subtotal >= FREE_OVER ? 0 : zone.fee;
};