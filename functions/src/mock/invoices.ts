export const invoices = [
  {
    paymentDue: new Date('2021-08-19'),
    description: 'Re-branding',
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharrington',
      postCode: 'NR24 5WQ',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.90
      }
    ]
  },
  {
    paymentDue: new Date('2021-09-20'),
    description: 'Graphic Design',
    paymentTerms: 30,
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    status: 'pending',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Banner Design',
        quantity: 1,
        price: 156.00
      },
      {
        name: 'Email Design',
        quantity: 2,
        price: 200.00
      }
    ]
  },
  {
    paymentDue: new Date('2021-10-01'),
    description: 'Website Redesign',
    paymentTerms: 7,
    clientName: 'John Morrison',
    clientEmail: 'jm@myco.com',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '79 Dover Road',
      city: 'Westhall',
      postCode: 'IP19 3PF',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Website Redesign',
        quantity: 1,
        price: 14002.33
      }
    ]
  },
  {
    paymentDue: new Date('2021-08-19'),
    description: 'Re-branding',
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharrington',
      postCode: 'NR24 5WQ',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.90
      }
    ]
  },
  {
    paymentDue: new Date('2021-09-05'),
    description: 'Website Redesign',
    clientName: 'Ada Lovelace',
    clientEmail: 'ada.lovelace@mail.com',
    status: 'pending',
    senderAddress: {
      street: '32 King Street',
      city: 'Manchester',
      postCode: 'M1 1AE',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '12 Park Avenue',
      city: 'Liverpool',
      postCode: 'L3 4FP',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'UI Design',
        quantity: 2,
        price: 950.00
      },
      {
        name: 'UX Audit',
        quantity: 1,
        price: 500.00
      }
    ]
  },
  {
    paymentDue: new Date('2021-10-01'),
    description: 'SEO Optimization',
    clientName: 'Grace Hopper',
    clientEmail: 'gracehopper@mail.com',
    status: 'paid',
    senderAddress: {
      street: '5 Fleet Street',
      city: 'London',
      postCode: 'EC4Y 1AA',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '45 Ocean Drive',
      city: 'Brighton',
      postCode: 'BN1 1EE',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Keyword Research',
        quantity: 3,
        price: 200.00
      },
      {
        name: 'Content Plan',
        quantity: 1,
        price: 300.00
      }
    ]
  },
  {
    paymentDue: new Date('2021-10-15'),
    description: 'App Development',
    clientName: 'Elon Musk',
    clientEmail: 'elon.musk@mail.com',
    status: 'draft',
    senderAddress: {
      street: '77 Tech Road',
      city: 'London',
      postCode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '10 Space Avenue',
      city: 'Bristol',
      postCode: 'BS1 2PH',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Mobile App',
        quantity: 1,
        price: 5000.00
      }
    ]
  },
  {
    paymentDue: new Date('2021-11-03'),
    description: 'Social Media Campaign',
    clientName: 'Tim Cook',
    clientEmail: 'timcook@mail.com',
    status: 'paid',
    senderAddress: {
      street: '101 Apple Street',
      city: 'Cambridge',
      postCode: 'CB1 2AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '22 River Lane',
      city: 'Oxford',
      postCode: 'OX1 1TR',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Ad Design',
        quantity: 5,
        price: 150.00
      },
      {
        name: 'Campaign Strategy',
        quantity: 1,
        price: 800.00
      }
    ]
  },
  {
    paymentDue: new Date('2021-11-17'),
    description: 'Logo Design',
    clientName: 'Sundar Pichai',
    clientEmail: 'sundar@mail.com',
    status: 'pending',
    senderAddress: {
      street: '9 Innovation Street',
      city: 'London',
      postCode: 'N1 1AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '33 Cloud Road',
      city: 'Reading',
      postCode: 'RG1 8AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Logo Concepts',
        quantity: 3,
        price: 200.00
      }
    ]
  },
  {
    paymentDue: new Date('2021-12-01'),
    description: 'Photography Package',
    clientName: 'Marissa Mayer',
    clientEmail: 'marissa@mail.com',
    status: 'paid',
    senderAddress: {
      street: '55 Studio Lane',
      city: 'Birmingham',
      postCode: 'B1 1AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '12 Garden Street',
      city: 'Leeds',
      postCode: 'LS1 2AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Photoshoot',
        quantity: 1,
        price: 1200.00
      }
    ]
  },
  {
    paymentDue: new Date('2021-12-15'),
    description: 'Consulting Services',
    clientName: 'Jeff Bezos',
    clientEmail: 'jeffbezos@mail.com',
    status: 'draft',
    senderAddress: {
      street: '14 Business Park',
      city: 'London',
      postCode: 'SE1 1AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '99 Riverbank Road',
      city: 'Glasgow',
      postCode: 'G1 1AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Strategy Session',
        quantity: 4,
        price: 500.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-01-05'),
    description: 'Video Editing',
    clientName: 'Satya Nadella',
    clientEmail: 'satya@mail.com',
    status: 'paid',
    senderAddress: {
      street: '20 Media Street',
      city: 'Edinburgh',
      postCode: 'EH1 1AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '17 Highland Road',
      city: 'Aberdeen',
      postCode: 'AB1 2AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Promo Video',
        quantity: 2,
        price: 800.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-01-20'),
    description: 'Print Materials',
    clientName: 'Larry Page',
    clientEmail: 'larry@mail.com',
    status: 'pending',
    senderAddress: {
      street: '88 Print Road',
      city: 'Sheffield',
      postCode: 'S1 2AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '5 Paper Lane',
      city: 'Nottingham',
      postCode: 'NG1 3AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Brochures',
        quantity: 500,
        price: 1.50
      },
      {
        name: 'Flyers',
        quantity: 1000,
        price: 0.75
      }
    ]
  },
  {
    paymentDue: new Date('2022-02-10'),
    description: 'Cloud Migration',
    clientName: 'Andy Jassy',
    clientEmail: 'andy@mail.com',
    status: 'pending',
    senderAddress: {
      street: '50 Tech Park',
      city: 'London',
      postCode: 'SW3 3AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '77 Server Lane',
      city: 'Milton Keynes',
      postCode: 'MK9 1AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Assessment',
        quantity: 1,
        price: 1000.00
      },
      {
        name: 'Migration',
        quantity: 1,
        price: 3000.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-02-25'),
    description: 'Marketing Strategy',
    clientName: 'Susan Wojcicki',
    clientEmail: 'susan@mail.com',
    status: 'paid',
    senderAddress: {
      street: '60 Media Way',
      city: 'Manchester',
      postCode: 'M2 2AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '11 Creative Street',
      city: 'York',
      postCode: 'YO1 1AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Market Research',
        quantity: 1,
        price: 1500.00
      },
      {
        name: 'Strategy Plan',
        quantity: 1,
        price: 2000.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-03-05'),
    description: 'Mobile App Maintenance',
    clientName: 'Jack Dorsey',
    clientEmail: 'jack@mail.com',
    status: 'draft',
    senderAddress: {
      street: '77 Tech Road',
      city: 'London',
      postCode: 'SW1A 1AA',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '88 Startup Lane',
      city: 'Bath',
      postCode: 'BA1 1AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Bug Fixes',
        quantity: 10,
        price: 100.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-03-15'),
    description: 'Cybersecurity Audit',
    clientName: 'Sheryl Sandberg',
    clientEmail: 'sheryl@mail.com',
    status: 'paid',
    senderAddress: {
      street: '9 Security Ave',
      city: 'London',
      postCode: 'EC2 4AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '44 Safe Street',
      city: 'Leicester',
      postCode: 'LE1 3AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Vulnerability Scan',
        quantity: 1,
        price: 800.00
      },
      {
        name: 'Report',
        quantity: 1,
        price: 400.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-03-30'),
    description: 'E-commerce Setup',
    clientName: 'Daniel Ek',
    clientEmail: 'daniel@mail.com',
    status: 'pending',
    senderAddress: {
      street: '101 Commerce Street',
      city: 'Birmingham',
      postCode: 'B2 2AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '12 Music Road',
      city: 'Cardiff',
      postCode: 'CF1 3AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Shopify Store',
        quantity: 1,
        price: 2500.00,
      },
      {
        name: 'Theme Customization',
        quantity: 1,
        price: 800.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-04-10'),
    description: 'Data Analytics',
    clientName: 'Reed Hastings',
    clientEmail: 'reed@mail.com',
    status: 'paid',
    senderAddress: {
      street: '45 Data Street',
      city: 'Leeds',
      postCode: 'LS2 1AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '88 Stream Road',
      city: 'Durham',
      postCode: 'DH1 1AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Dashboard Setup',
        quantity: 1,
        price: 1500.00
      },
      {
        name: 'Monthly Report',
        quantity: 3,
        price: 300.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-04-20'),
    description: 'Public Relations Campaign',
    clientName: 'Evan Spiegel',
    clientEmail: 'evan@mail.com',
    status: 'pending',
    senderAddress: {
      street: '33 PR Lane',
      city: 'London',
      postCode: 'W1A 4AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '12 Snap Street',
      city: 'Exeter',
      postCode: 'EX1 2AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Press Release',
        quantity: 1,
        price: 500.00
      },
      {
        name: 'Media Outreach',
        quantity: 1,
        price: 1200.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-05-05'),
    description: 'Training Workshop',
    clientName: 'Meg Whitman',
    clientEmail: 'meg@mail.com',
    status: 'draft',
    senderAddress: {
      street: '22 Learning Road',
      city: 'London',
      postCode: 'N5 3AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '77 HP Lane',
      city: 'Bristol',
      postCode: 'BS2 1AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Leadership Training',
        quantity: 2,
        price: 750.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-05-20'),
    description: 'UX/UI Redesign',
    clientName: 'Mark Zuckerberg',
    clientEmail: 'mark@mail.com',
    status: 'paid',
    senderAddress: {
      street: '88 Meta Street',
      city: 'Cambridge',
      postCode: 'CB3 4AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '55 Social Road',
      city: 'Oxford',
      postCode: 'OX2 1AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'UX Audit',
        quantity: 1,
        price: 1000.00
      },
      {
        name: 'UI Redesign',
        quantity: 1,
        price: 3000.00
      }
    ]
  },
  {
    paymentDue: new Date('2022-06-01'),
    description: 'IT Support Retainer',
    clientName: 'Sergey Brin',
    clientEmail: 'sergey@mail.com',
    status: 'pending',
    senderAddress: {
      street: '11 Support Street',
      city: 'London',
      postCode: 'E2 5AB',
      country: 'United Kingdom'
    },
    clientAddress: {
      street: '12 Cloud Drive',
      city: 'Reading',
      postCode: 'RG1 9AB',
      country: 'United Kingdom'
    },
    items: [
      {
        name: 'Monthly Support',
        quantity: 1,
        price: 2000.00
      }
    ]
  }
];
