export const phones = [
  { display: "+92 371 6515468", intl: "923716515468" },
  { display: "+92 307 6164377", intl: "923076164377" },
];

export const site = {
  name: "Naflar Health Care",
  tagline: "Feed the Purpose, Balance the Life",
  owner: "Rimsha Majeed",
  role: "Clinical Dietitian & Nutrition Coach",
  phones,
  whatsapp: phones[0].intl, // main number used by the Book buttons
  phoneDisplay: phones[0].display,
  email: "Naflarhealth@gmail.com", // TODO: put her real email
  instagram: "https://www.instagram.com/naflarhealth", // TODO: put her real Instagram link
};

export const waLink = (
  msg = "Assalamu alaikum! I'd like to book a consultation with Naflar Health Care.",
  number: string = site.whatsapp
) => `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

export const telLink = (intl: string) => `tel:+${intl}`;