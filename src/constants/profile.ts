export const PERSONAL_FIELDS = [
  {
    name: 'first_name',
    type: 'text',
    placeholder: 'name',
    required: true,
    disabled: false,
  },
  {
    name: 'last_name',
    type: 'text',
    placeholder: 'second name',
    required: true,
    disabled: false,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'email',
    required: true,
    disabled: true,
  },
  {
    name: 'phone_number',
    type: 'tel',
    placeholder: 'phone number',
    required: false,
    disabled: false,
  },
];

export const ADDRESS_FIELDS = [
  { name: 'country', type: 'text', label: 'country' },
  { name: 'city', type: 'text', label: 'city' },
  { name: 'postal_code', type: 'text', label: 'postal code' },
];

export const ARTIST_TEXT_FIELDS = [
  {
    name: 'bio',
    label: 'about you',
    placeholder: 'tell us about yourself...',
  },
  {
    name: 'statement',
    label: 'your statement',
    placeholder: 'your artist statement...',
  },
  {
    name: 'style',
    label: 'your style',
    placeholder: 'describe your style...',
  },
];
