export interface InfoSection { heading?: string; body: string }
export interface InfoPage { title: string; kicker: string; sections: InfoSection[]; externalNote?: string }

const NOT_OFFICIAL = 'This app is an independent demo build. It does not reproduce official legal text, and nothing here forms an agreement. Please refer to the official PLUSMiles and JustGo channels for the binding version.';

export const INFO_PAGES: Record<string, InfoPage> = {
  'plusmiles-terms': {
    title: "PLUSMiles' Terms & Conditions", kicker: 'Summary placeholder',
    sections: [
      { body: NOT_OFFICIAL },
      { heading: 'What this document normally covers', body: 'Membership eligibility, how PLUSMiles accounts and points work, acceptable use, and how the operator may change the programme.' },
      { heading: 'Where to read it', body: 'The current version is published by PLUSMiles in its official app and website.' },
    ],
  },
  'plusmiles-privacy': {
    title: "PLUSMiles' Privacy Policy", kicker: 'Summary placeholder',
    sections: [
      { body: NOT_OFFICIAL },
      { heading: 'What this demo stores', body: 'Only the sample profile, vehicles, Touch \'n Go card and RFID nicknames you enter, and your transaction filter choice, saved on this device with AsyncStorage. No passwords, identification numbers, or payment card details are stored or transmitted.' },
      { heading: 'Removing local data', body: 'Me > Delete local demo data wipes everything this app saved on this device.' },
    ],
  },
  'justgo-terms': {
    title: "JustGo's Terms & Conditions", kicker: 'Summary placeholder',
    sections: [
      { body: NOT_OFFICIAL },
      { heading: 'About JustGo', body: 'JustGo is a highway companion for ANPR (Automatic Number Plate Recognition) toll payment, vehicle management and monthly e-Invoices.' },
    ],
  },
  faq: {
    title: 'FAQ', kicker: 'Using this demo',
    sections: [
      { heading: 'What is ANPR toll payment?', body: 'ANPR cameras read your number plate at participating toll plazas so the toll can be charged to a linked payment method, without stopping at a barrier.' },
      { heading: 'Why can\'t I verify my identity?', body: 'Identity verification needs a licensed eKYC provider. It is not connected in this build, so the step stays incomplete.' },
      { heading: 'Why are there no transactions?', body: 'Transaction history comes from the toll operator. No live source is connected, so the list stays empty regardless of the filters you choose.' },
      { heading: 'Are my vehicles real?', body: 'Vehicles, Touch \'n Go cards and RFID tags added here are local demo records on this device only. They are not registered with any operator.' },
      { heading: 'Can I pay tolls here?', body: 'No. Payment methods cannot be added and no payments are processed in this build.' },
    ],
  },
  contact: {
    title: 'Contact Us', kicker: 'Support channels',
    sections: [
      { body: 'This demo build has no connected support desk, so messages cannot be sent from here.' },
      { heading: 'For toll or account issues', body: 'Use the official PLUSMiles or JustGo app, or the customer service details published on their official websites.' },
      { heading: 'For highway emergencies', body: 'Call 999 for police, fire or ambulance.' },
    ],
  },
  marketplace: {
    title: 'Marketplace', kicker: 'Keep Discovering',
    sections: [
      { body: 'Marketplace brings motoring deals such as car care, insurance renewal and road-trip essentials into one place.' },
      { heading: 'Status in this build', body: 'The marketplace catalogue is not connected, so no products or prices are shown and nothing can be purchased.' },
    ],
  },
  rewards: {
    title: 'Redeem Reward', kicker: 'Keep Discovering',
    sections: [
      { body: 'PLUSMiles members collect points on eligible highway spending and redeem them for rewards.' },
      { heading: 'Status in this build', body: 'Your points balance and the rewards catalogue are not connected, so redemptions are unavailable here.' },
    ],
  },
  'penang-promo': {
    title: 'Jimat Di Penang', kicker: 'Promotion Program',
    sections: [
      { body: 'A promotion offering 20% discount on Penang Bridge toll for eligible ANPR users.' },
      { heading: 'Who it is for', body: 'Typically, drivers with a verified identity, a linked payment method and a registered vehicle using ANPR at the Penang Bridge.' },
      { heading: 'Applying', body: 'Applications are handled by the live service, which is not connected in this build. Check the official channels for current dates, eligibility and terms.' },
    ],
  },
};
