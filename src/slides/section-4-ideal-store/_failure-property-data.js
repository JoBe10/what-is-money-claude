const pairs = [
  {
    number: 1,
    failure: 'DILUTED',
    property: 'NO SUPPLY INFLATION',
    explanation: 'Additional carrier units can dilute the claim embodied in existing units.'
  },
  {
    number: 2,
    failure: 'INDIVISIBLE',
    property: 'DIVISIBILITY',
    explanation: 'The carrier cannot be divided into the quantities required for exchange.'
  },
  {
    number: 3,
    failure: 'ILLIQUID',
    property: 'LIQUIDITY',
    explanation: 'It cannot be exchanged reliably without delay, friction or significant loss.'
  },
  {
    number: 4,
    failure: 'TRAPPED',
    property: 'PORTABILITY',
    explanation: 'It cannot move freely across distance or jurisdiction.'
  },
  {
    number: 5,
    failure: 'COSTLY TO HOLD',
    property: 'NO CARRYING COSTS',
    explanation: 'Storage, maintenance or administration consume the claim over time.'
  },
  {
    number: 6,
    failure: 'CONTROLLED',
    property: 'RESISTANCE TO CONTROL',
    explanation: 'An external party can alter access, ownership or the governing rules.'
  },
  {
    number: 7,
    failure: 'DEGRADED',
    property: 'DURABILITY',
    explanation: 'The carrier can decay or fail before the claim is redeemed.'
  },
  {
    number: 8,
    failure: 'UNVERIFIABLE',
    property: 'VERIFIABILITY',
    explanation: 'Authenticity, ownership or supply cannot be established confidently.'
  },
  {
    number: 9,
    failure: 'NON-FUNGIBLE',
    property: 'FUNGIBILITY',
    explanation: 'Equal units can be treated differently because of their history or condition.'
  },
  {
    number: 10,
    failure: 'UNTESTED',
    property: 'TRACK RECORD',
    explanation: 'There is insufficient evidence across crises, technologies and changing regimes.'
  }
];

pairs.forEach(Object.freeze);

export const FAILURE_PROPERTY_PAIRS = Object.freeze(pairs);
export const FIRST_FAILURE_GROUP = Object.freeze(pairs.slice(0, 5));
export const SECOND_FAILURE_GROUP = Object.freeze(pairs.slice(5));
