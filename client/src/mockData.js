export const INITIAL_ITEMS = [
  {
    id: 'item-1',
    type: 'found',
    title: 'Sony WH-CH520 Wireless Headphones',
    category: 'Electronics',
    location: 'Central Library, 2nd Floor Reading Hall',
    date: '2026-09-25',
    time: '03:30 PM',
    status: 'available',
    description: 'Found on table #14 near the computer section. Left inside a black pouch with a charging cable.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Aravind S. (CS Dept)',
    securityQuestion: 'What is the color of the aux cable inside the pouch?'
  },
  {
    id: 'item-2',
    type: 'lost',
    title: 'Student ID Card & Metro Pass',
    category: 'ID Cards & Wallets',
    location: 'Student Food Court / Canteen',
    date: '2026-09-24',
    time: '01:15 PM',
    status: 'available',
    description: 'Leather cardholder containing University ID (Reg No: 2023CS1044) and blue metro smart card.',
    image: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Sneha Rao (ECE Dept)',
    securityQuestion: 'What name is printed on the metro pass?'
  },
  {
    id: 'item-3',
    type: 'found',
    title: 'Calculus & Linear Algebra Textbook',
    category: 'Books & Notes',
    location: 'Engineering Block B, Room 302',
    date: '2026-09-25',
    time: '11:00 AM',
    status: 'available',
    description: 'Hardcover 9th edition textbook. Has handwritten notes and colored sticky tabs in Chapter 4.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Prof. Ramesh K.',
    securityQuestion: 'What name or signature is on the first inner page?'
  },
  {
    id: 'item-4',
    type: 'lost',
    title: 'Titan Quartz Analog Watch (Silver & Brown Strap)',
    category: 'Accessories',
    location: 'Sports Complex / Gymnasium',
    date: '2026-09-23',
    time: '06:00 PM',
    status: 'claimed',
    description: 'Brown leather strap with slight wear near the buckle. Left in locker room #8.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Vikram Patel (Mech Dept)',
    securityQuestion: 'What is the inscription on the stainless steel back?'
  },
  {
    id: 'item-5',
    type: 'found',
    title: 'Set of 3 Keys with Marvel Keychain',
    category: 'Keys',
    location: 'Main Auditorium Entrance Steps',
    date: '2026-09-25',
    time: '09:45 AM',
    status: 'available',
    description: 'Two brass door keys and one bike key attached to an Iron Man metallic keychain.',
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Campus Security Desk',
    securityQuestion: 'What bike brand logo is on the black key head?'
  },
  {
    id: 'item-6',
    type: 'lost',
    title: 'Navy Blue Hydro Flask (32oz)',
    category: 'Other',
    location: 'Chemistry Lab 3, Science Block',
    date: '2026-09-24',
    time: '04:20 PM',
    status: 'available',
    description: 'Navy blue matte finish with several science stickers (NASA, ReactJS logo) on the side.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    reportedBy: 'Pooja M. (Biotech)',
    securityQuestion: 'Which sticker is placed right next to the cap?'
  }
];

export const CATEGORIES = [
  'All',
  'Electronics',
  'ID Cards & Wallets',
  'Books & Notes',
  'Keys',
  'Accessories',
  'Other'
];

export const CAMPUS_LOCATIONS = [
  'All Locations',
  'Central Library',
  'Student Food Court / Canteen',
  'Engineering Block A',
  'Engineering Block B',
  'Science Block & Labs',
  'Main Auditorium',
  'Sports Complex & Gym',
  'Hostel Block / Quad'
];
