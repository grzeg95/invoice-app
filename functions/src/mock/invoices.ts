export const invoices = [
  {
    issueDate: new Date('2025-08-19'),
    paymentDueDays: 1,
    description: 'Re-branding',
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    state: 'pending',
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
    issueDate: new Date('2025-09-20'),
    paymentDueDays: 7,
    description: 'Graphic Design',
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    state: 'draft',
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
    issueDate: new Date('2025-10-01'),
    paymentDueDays: 14,
    description: 'Website Redesign',
    clientName: 'John Morrison',
    clientEmail: 'jm@myco.com',
    state: 'pending',
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
    issueDate: new Date('2025-08-19'),
    paymentDueDays: 14,
    description: 'Re-branding',
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    state: 'pending',
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
    issueDate: new Date('2025-09-05'),
    paymentDueDays: 30,
    description: 'Website Redesign',
    clientName: 'Ada Lovelace',
    clientEmail: 'ada.lovelace@mail.com',
    state: 'pending',
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
    issueDate: new Date('2025-10-01'),
    paymentDueDays: 1,
    description: 'SEO Optimization',
    clientName: 'Grace Hopper',
    clientEmail: 'gracehopper@mail.com',
    state: 'draft',
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
  }
];
