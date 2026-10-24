import { EquipmentItem } from '../models/types.js';

export const initialEquipmentData: EquipmentItem[] = [
  {
    id: 'eq-101',
    title: 'Rogue RML-390F Flat Foot Monster Lite Power Rack',
    slug: 'rogue-rml-390f-flat-foot-power-rack',
    brand: 'Rogue Fitness',
    category: 'racks-benches',
    condition: 'used_like_new',
    conditionNotes: 'Used in a private home garage gym for 9 months. Zero rust, pristine powder coat, includes Monster Lite J-cups and safety pin pipes.',
    price: 620,
    originalMSRP: 845,
    description: 'The RML-390F is a heavy-duty 3x3" 11-gauge steel flat-foot rack that does not require bolting to the floor. Features laser-cut hole numbering, Westside hole spacing through the bench zone, and self-stabilizing base triangle plates.',
    specifications: {
      'Steel Gauge': '11-Gauge 3x3" Structural Steel',
      'Footprint': '49" x 49" x 92.25"',
      'Hardware': '5/8" Monster Lite bolts & fasteners',
      'Hole Spacing': 'Westside 1" spacing through bench zone, 2" elsewhere',
      'Floor Mounting': 'Self-stabilizing Flat Foot (No bolting required)',
      'Weight Capacity': '1,000+ lbs'
    },
    images: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Austin, TX (Local Pickup or Freight)',
    sellerType: 'individual',
    sellerName: 'Marcus Vance',
    sellerRating: 4.95,
    sellerReviewCount: 28,
    isFeatured: true,
    createdAt: '2026-10-15T14:20:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Rogue Fitness (Official)',
        marketplaceUrl: 'https://www.roguefitness.com/rml-390f-flat-foot-monster-lite-rack',
        price: 845,
        condition: 'new',
        inStock: true,
        shippingEstimate: 95,
        lastChecked: '2026-10-24T10:00:00Z'
      },
      {
        marketplaceName: 'Rep Fitness (PR-4000 Alt)',
        marketplaceUrl: 'https://repfitness.com/products/pr-4000-power-rack',
        price: 799,
        condition: 'new',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-24T09:30:00Z'
      },
      {
        marketplaceName: 'eBay Secondary Market',
        marketplaceUrl: 'https://www.ebay.com/itm/sample-rogue-rml390f',
        price: 690,
        condition: 'used',
        inStock: true,
        shippingEstimate: 120,
        lastChecked: '2026-10-23T18:00:00Z'
      }
    ]
  },
  {
    id: 'eq-102',
    title: 'Concept2 RowErg Indoor Rowing Machine with PM5 Monitor',
    slug: 'concept2-rowerg-pm5-rower',
    brand: 'Concept2',
    category: 'cardio',
    condition: 'used_good',
    conditionNotes: 'Lifetime meters: 412,000m. Firmware updated to latest v32. Flywheel cleaned and chain oiled with 10W-40 oil weekly.',
    price: 780,
    originalMSRP: 990,
    description: 'The gold standard of commercial rowing machines. Uses air resistance via an engineered flywheel to respond to every stroke. Includes the backlit PM5 performance monitor with Bluetooth/ANT+ connectivity.',
    specifications: {
      'Monitor': 'PM5 Backlit Performance Monitor',
      'Flywheel': 'Spiral damper with settings 1-10',
      'Storage': 'Quick-release frame lock separates into two parts',
      'Max User Weight': '500 lbs (227 kg)',
      'Machine Weight': '57 lbs (26 kg)'
    },
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Denver, CO',
    sellerType: 'certified_dealer',
    sellerName: 'Mile High Fitness Gear',
    sellerRating: 4.9,
    sellerReviewCount: 114,
    isFeatured: true,
    createdAt: '2026-10-18T11:00:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Rogue Fitness Direct',
        marketplaceUrl: 'https://www.roguefitness.com/black-concept-2-model-d-pm5-rower',
        price: 990,
        condition: 'new',
        inStock: true,
        shippingEstimate: 45,
        lastChecked: '2026-10-24T08:15:00Z'
      },
      {
        marketplaceName: 'Amazon Fitness Store',
        marketplaceUrl: 'https://www.amazon.com/Concept2-Model-Indoor-Rowing-Machine/dp/B00NH9WEUA',
        price: 990,
        condition: 'new',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-24T07:45:00Z'
      },
      {
        marketplaceName: 'Facebook Marketplace (Local Avg)',
        marketplaceUrl: 'https://www.facebook.com/marketplace',
        price: 825,
        condition: 'used',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-23T21:00:00Z'
      }
    ]
  },
  {
    id: 'eq-103',
    title: 'Eleiko IWF Weightlifting Training Bar 20kg (Chrome)',
    slug: 'eleiko-iwf-training-bar-20kg',
    brand: 'Eleiko',
    category: 'free-weights',
    condition: 'new',
    conditionNotes: 'Brand new in original cylindrical shipping tube with factory inspection certificate and Eleiko seal intact.',
    price: 760,
    originalMSRP: 840,
    description: 'Precision Swedish steel bar manufactured specifically for high-performance Olympic weightlifting. Features calibrated spin with precision needle bearings, 1.2mm balanced knurling, and 215,000 PSI tensile strength.',
    specifications: {
      'Bar Weight': '20 kg (44.1 lbs)',
      'Diameter': '28 mm',
      'Tensile Strength': '215,000 PSI',
      'Bearings': '10 precision needle bearings (5 per sleeve)',
      'Certification': 'IWF (International Weightlifting Federation) spec'
    },
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Chicago, IL',
    sellerType: 'certified_dealer',
    sellerName: 'Midwest Strength Supply',
    sellerRating: 5.0,
    sellerReviewCount: 89,
    isFeatured: true,
    createdAt: '2026-10-20T16:45:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Eleiko Sport Official',
        marketplaceUrl: 'https://eleiko.com/en-us/bars/iwf-training-bar-20-kg',
        price: 840,
        condition: 'new',
        inStock: true,
        shippingEstimate: 35,
        lastChecked: '2026-10-24T11:00:00Z'
      },
      {
        marketplaceName: 'Rogue Olympic WL Bar',
        marketplaceUrl: 'https://www.roguefitness.com/rogue-olympic-wl-bar',
        price: 615,
        condition: 'new',
        inStock: true,
        shippingEstimate: 25,
        lastChecked: '2026-10-24T06:00:00Z'
      }
    ]
  },
  {
    id: 'eq-104',
    title: 'Nuobell 80lb Quick-Select Adjustable Dumbbells Pair with Stand',
    slug: 'nuobell-80lb-adjustable-dumbbells-pair',
    brand: 'Nuobell / SMRTFT',
    category: 'free-weights',
    condition: 'used_like_new',
    conditionNotes: 'Used for approximately 3 months. Click mechanisms are snappy and smooth from 5 lbs up to 80 lbs in 5 lb increments.',
    price: 610,
    originalMSRP: 795,
    description: 'The Swedish-designed Nuobell offers the authentic feel of traditional hex and round dumbbells with a motorized twist-grip adjustment mechanism. All-steel machined plates eliminate bulky plastic clanking.',
    specifications: {
      'Weight Range': '5 to 80 lbs per dumbbell (2.2 to 36.3 kg)',
      'Increments': '5 lb increments (5, 10, 15... 80)',
      'Adjustment': 'Handle twist click system',
      'Includes': 'Custom steel floor cradle & upright stand'
    },
    images: [
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Seattle, WA',
    sellerType: 'individual',
    sellerName: 'Elena Rostova',
    sellerRating: 4.88,
    sellerReviewCount: 16,
    isFeatured: false,
    createdAt: '2026-10-21T09:20:00Z',
    externalComparisons: [
      {
        marketplaceName: 'SMRTFT Store Direct',
        marketplaceUrl: 'https://smrtft.com/products/nuobell-80lb',
        price: 795,
        condition: 'new',
        inStock: true,
        shippingEstimate: 50,
        lastChecked: '2026-10-24T09:00:00Z'
      },
      {
        marketplaceName: 'Titan Fitness (Quick-Lock Alt)',
        marketplaceUrl: 'https://www.titan.fitness/selectorized-dumbbells',
        price: 749,
        condition: 'new',
        inStock: false,
        shippingEstimate: 0,
        lastChecked: '2026-10-24T08:00:00Z'
      },
      {
        marketplaceName: 'eBay Certified Refurbished',
        marketplaceUrl: 'https://www.ebay.com/itm/nuobell-80lb-pair',
        price: 685,
        condition: 'refurbished',
        inStock: true,
        shippingEstimate: 75,
        lastChecked: '2026-10-23T14:30:00Z'
      }
    ]
  },
  {
    id: 'eq-105',
    title: 'Hammer Strength Plate-Loaded Iso-Lateral Wide Chest Press',
    slug: 'hammer-strength-iso-lateral-wide-chest-press',
    brand: 'Hammer Strength / Life Fitness',
    category: 'machines',
    condition: 'refurbished',
    conditionNotes: 'Commercial club surplus fully re-manufactured: brand new commercial marine-grade black vinyl pads, fresh baked industrial powder coating, new linear rubber stops.',
    price: 2100,
    originalMSRP: 4650,
    description: 'Engineered from human movement mechanics, Hammer Strength Iso-Lateral technology allows both arms to move independently for balanced muscle recruitment and ergonomic divergent converging pressing paths.',
    specifications: {
      'Resistance Type': 'Plate-loaded (Olympic 2" sleeves)',
      'Dimensions': '46" x 63" x 69"',
      'Machine Weight': '365 lbs',
      'Frame': '11-gauge steel oval tubing',
      'Upholstery': 'Premium high-density molded contour foam'
    },
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Dallas, TX',
    sellerType: 'commercial_gym',
    sellerName: 'Lone Star Commercial Fitness Liquidation',
    sellerRating: 4.96,
    sellerReviewCount: 230,
    isFeatured: true,
    createdAt: '2026-10-12T13:00:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Life Fitness Direct Commercial',
        marketplaceUrl: 'https://www.lifefitness.com/commercial/hammer-strength/plate-loaded/chest-press',
        price: 4650,
        condition: 'new',
        inStock: true,
        shippingEstimate: 350,
        lastChecked: '2026-10-24T05:00:00Z'
      },
      {
        marketplaceName: 'Fitness Exchange Commercial Pre-Owned',
        marketplaceUrl: 'https://www.fitnessexchange.com/used-hammer-strength',
        price: 2450,
        condition: 'used',
        inStock: true,
        shippingEstimate: 295,
        lastChecked: '2026-10-23T19:00:00Z'
      }
    ]
  },
  {
    id: 'eq-106',
    title: 'Woodway 4Front Commercial Slat-Belt Low-Impact Treadmill',
    slug: 'woodway-4front-slat-belt-treadmill',
    brand: 'Woodway',
    category: 'cardio',
    condition: 'refurbished',
    conditionNotes: 'Complete factory recertification. Slat-belt vulcanized rubber treads inspected with 98% life remaining. Zero bearing play, brand new tooth drive belt.',
    price: 6400,
    originalMSRP: 12900,
    description: 'The pinnacle of commercial cardio equipment. The Woodway patented slat-belt running surface absorbs 90% of dynamic shock impacts on runner joints while utilizing a nearly frictionless ball bearing system.',
    specifications: {
      'Belt Type': 'Individual vulcanized rubber individual slats',
      'Max Speed': '15.0 MPH (24 km/h)',
      'Elevation': '0-15% motorized incline',
      'Running Surface': '22" x 68"',
      'Motor': '2.0 HP continuous duty servo drive'
    },
    images: [
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Scottsdale, AZ',
    sellerType: 'certified_dealer',
    sellerName: 'Elite Cardio Rebuilders',
    sellerRating: 4.92,
    sellerReviewCount: 77,
    isFeatured: true,
    createdAt: '2026-10-10T10:15:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Woodway Direct MSRP',
        marketplaceUrl: 'https://www.woodway.com/treadmills/4front',
        price: 12900,
        condition: 'new',
        inStock: true,
        shippingEstimate: 450,
        lastChecked: '2026-10-24T06:30:00Z'
      },
      {
        marketplaceName: 'Reconditioned Fitness Hub',
        marketplaceUrl: 'https://reconditionedfitness.com/woodway-4front',
        price: 7499,
        condition: 'refurbished',
        inStock: true,
        shippingEstimate: 395,
        lastChecked: '2026-10-23T11:00:00Z'
      }
    ]
  },
  {
    id: 'eq-107',
    title: 'Titan Fitness Functional Trainer with Dual 200lb Weight Stacks',
    slug: 'titan-fitness-functional-trainer-dual-stack',
    brand: 'Titan Fitness',
    category: 'machines',
    condition: 'used_good',
    conditionNotes: 'Solid working condition. Minor paint scuffs around the pulley slider brackets. Includes 6 cable handles, tricep rope, and long bar.',
    price: 1450,
    originalMSRP: 1899,
    description: 'A comprehensive cable workout station featuring dual 200 lb stacks with a 2:1 pulley ratio. Has 21 position laser-etched column adjustments for infinite movement angles and built-in multi-grip pull-up bar.',
    specifications: {
      'Weight Stacks': 'Dual 200 lb stacks (2:1 ratio for 100 lb effective per handle)',
      'Adjustment Heights': '21 laser-cut height slots',
      'Cable Travel': '81" total cable extension',
      'Footprint': '64" W x 43" D x 82" H'
    },
    images: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Atlanta, GA',
    sellerType: 'individual',
    sellerName: 'Dave Kowalski',
    sellerRating: 4.75,
    sellerReviewCount: 12,
    isFeatured: false,
    createdAt: '2026-10-19T14:50:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Titan Fitness Direct',
        marketplaceUrl: 'https://www.titan.fitness/strength/specialty-machines/upper-body/functional-trainer',
        price: 1899,
        condition: 'new',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-24T08:00:00Z'
      },
      {
        marketplaceName: 'Rep Fitness FT-5000 2.0',
        marketplaceUrl: 'https://repfitness.com/products/ft-5000-functional-trainer',
        price: 2199,
        condition: 'new',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-24T07:15:00Z'
      }
    ]
  },
  {
    id: 'eq-108',
    title: 'Rogue Color Echo Bumper Plates (260 lb Complete Set)',
    slug: 'rogue-color-echo-bumper-plates-260lb-set',
    brand: 'Rogue Fitness',
    category: 'free-weights',
    condition: 'used_like_new',
    conditionNotes: 'Used solely on rubber stall mats in indoor home gym. Zero cracks, clean virgin rubber finish, center stainless steel inserts tight and unwarped.',
    price: 495,
    originalMSRP: 635,
    description: 'Official color-coded IWF-standard virgin rubber bumper plates. Set includes pairs of 45lb (Blue), 35lb (Yellow), 25lb (Green), and 10lb (Black/White text). Tested to 30,000 drops with dead bounce characteristics.',
    specifications: {
      'Diameter': '450 mm (17.72")',
      'Insert': 'Stainless Steel 50.4 mm Olympic sleeve bore',
      'Durometer': '88 Shore A (Dead bounce)',
      'Total Weight': '260 lbs (118 kg)'
    },
    images: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Nashville, TN',
    sellerType: 'individual',
    sellerName: 'Hannah Phillips',
    sellerRating: 4.97,
    sellerReviewCount: 34,
    isFeatured: false,
    createdAt: '2026-10-22T17:10:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Rogue Fitness Factory',
        marketplaceUrl: 'https://www.roguefitness.com/rogue-color-echo-bumper-plates',
        price: 635,
        condition: 'new',
        inStock: true,
        shippingEstimate: 60,
        lastChecked: '2026-10-24T09:45:00Z'
      },
      {
        marketplaceName: 'Rep Color Bumper Set',
        marketplaceUrl: 'https://repfitness.com/products/color-bumper-plates',
        price: 589,
        condition: 'new',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-24T08:30:00Z'
      },
      {
        marketplaceName: 'Facebook Marketplace Estimate',
        marketplaceUrl: 'https://www.facebook.com/marketplace',
        price: 520,
        condition: 'used',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-23T20:15:00Z'
      }
    ]
  },
  {
    id: 'eq-109',
    title: 'Assault Fitness AirBike Classic Heavy-Duty Fan Resistance Bike',
    slug: 'assault-fitness-airbike-classic',
    brand: 'Assault Fitness',
    category: 'cardio',
    condition: 'used_fair',
    conditionNotes: 'Cosmetic chain guard scratch and worn pedal strap, but mechanical chain, 27-inch steel fan, and LCD monitor are in full working order.',
    price: 430,
    originalMSRP: 749,
    description: 'The iconic high-intensity conditioning bike used in CrossFit Games worldwide. Dual-action upper and lower body movements leverage infinite wind resistance: pedal harder for exponentially greater wattage resistance.',
    specifications: {
      'Fan Diameter': '27" steel resistance fan wheel',
      'Drive System': 'Sealed cartridge bottom bracket chain drive',
      'Seat': '4-way micro-adjustable padded saddle',
      'Display': 'LCD with Tabata, intervals, calories, watts, and HR'
    },
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Phoenix, AZ',
    sellerType: 'individual',
    sellerName: 'Trevor Gray',
    sellerRating: 4.6,
    sellerReviewCount: 9,
    isFeatured: false,
    createdAt: '2026-10-17T08:45:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Assault Direct',
        marketplaceUrl: 'https://www.assaultfitness.com/products/assaultbike-classic',
        price: 749,
        condition: 'new',
        inStock: true,
        shippingEstimate: 50,
        lastChecked: '2026-10-24T10:10:00Z'
      },
      {
        marketplaceName: 'Rogue Echo Bike Alt',
        marketplaceUrl: 'https://www.roguefitness.com/rogue-echo-bike',
        price: 895,
        condition: 'new',
        inStock: true,
        shippingEstimate: 45,
        lastChecked: '2026-10-24T09:15:00Z'
      },
      {
        marketplaceName: 'eBay Pre-Owned Avg',
        marketplaceUrl: 'https://www.ebay.com/itm/assault-airbike-classic',
        price: 490,
        condition: 'used',
        inStock: true,
        shippingEstimate: 85,
        lastChecked: '2026-10-23T16:00:00Z'
      }
    ]
  },
  {
    id: 'eq-110',
    title: 'Rep Fitness BlackWing Adjustable Bench (FID - Flat Incline Decline)',
    slug: 'rep-fitness-blackwing-adjustable-fid-bench',
    brand: 'Rep Fitness',
    category: 'racks-benches',
    condition: 'new',
    conditionNotes: 'Brand new in box, unopened factory packaging. Zero Gap patented sliding seat mechanism with knurled steel adjustment knob.',
    price: 580,
    originalMSRP: 620,
    description: 'The pinnacle of adjustable weight benches. Combines Rep Fitness patented ZeroGap seat slide technology with a 12-gauge ladder back adjustment capable of -8 to 85 degree angles.',
    specifications: {
      'Back Angles': '-8, 0, 15, 30, 45, 60, 75, 85 degrees',
      'Pad Width': '12" Wide CleanGrip high-friction vinyl',
      'Capacity': '1,000 lbs (454 kg)',
      'Storage': 'Built-in urethane wheels and vertical storage peg'
    },
    images: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80'
    ],
    location: 'Columbus, OH',
    sellerType: 'certified_dealer',
    sellerName: 'Buckeye Gym Gear',
    sellerRating: 4.98,
    sellerReviewCount: 145,
    isFeatured: true,
    createdAt: '2026-10-23T12:00:00Z',
    externalComparisons: [
      {
        marketplaceName: 'Rep Fitness Direct',
        marketplaceUrl: 'https://repfitness.com/products/blackwing-adjustable-bench',
        price: 620,
        condition: 'new',
        inStock: true,
        shippingEstimate: 0,
        lastChecked: '2026-10-24T08:00:00Z'
      },
      {
        marketplaceName: 'Rogue AB-3 Adjustable Bench',
        marketplaceUrl: 'https://www.roguefitness.com/ab-3-adjustable-bench',
        price: 995,
        condition: 'new',
        inStock: true,
        shippingEstimate: 65,
        lastChecked: '2026-10-24T07:00:00Z'
      }
    ]
  }
];
