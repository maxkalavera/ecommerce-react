import { NavigationItem, OptionItem } from '@/types/navigation';

export type Environment = 'demo' | 'production' | 'development';

export type Settings = {
  environment: Environment;
  baseAPI: string;
  content: {
    home: {
      tabs: NavigationItem[];
    },
    shop: {
      productsHeaderOptions: OptionItem[];
      sortByOptions: OptionItem[];
    },
    navigation: NavigationItem[];
  },
};

const settings: Settings = {
  environment: process.env['NEXT_PUBLIC_ENVIRONMENT'] as Environment || 'production',
  baseAPI: process.env['NEXT_PUBLIC_BASE_API'] || '',
  content: {
    home: {
      tabs: [
        {
          key: "ODljOGNlZDEtNzU5Ny00ZjVlLTgzMWUtM2E4MDlhM2NjMmVl",
          label: "Women",
          href: "/shop?category=ODljOGNlZDEtNzU5Ny00ZjVlLTgzMWUtM2E4MDlhM2NjMmVl"
        },
        {
          key: "MDc2ZjdlYzctNzEyZi00OTIzLTk3YzgtYmIxM2E5ZWUzZTk5",
          label: "Men",
          href: "/shop?category=MDc2ZjdlYzctNzEyZi00OTIzLTk3YzgtYmIxM2E5ZWUzZTk5"
        }
      ],
    },
    shop: {
      productsHeaderOptions: [
        {
          key: "ODljOGNlZDEtNzU5Ny00ZjVlLTgzMWUtM2E4MDlhM2NjMmVl",
          label: "Women",
        },
        {
          key: "MDc2ZjdlYzctNzEyZi00OTIzLTk3YzgtYmIxM2E5ZWUzZTk5",
          label: "Men",
        },
      ],
      sortByOptions: [
        {
          label: "Relevance",
          key: "relevance"
        },
        {
          label: "Trending",
          key: "treanding"
        },
        {
          label: "Latest arrival",
          key: "latest-arrival"
        },
        {
          label: "Price: Low to high",
          key: "price-descending"
        },
        {
          label: "Price: High to low",
          key: "price-ascending"
        },
      ]
    },
    navigation: [
      {
        key: "ODljOGNlZDEtNzU5Ny00ZjVlLTgzMWUtM2E4MDlhM2NjMmVl",
        label: "Women",
        href: "/shop?category=ODljOGNlZDEtNzU5Ny00ZjVlLTgzMWUtM2E4MDlhM2NjMmVl",
        icon: 'FaHashtag',
      },
      {
        key: "MDc2ZjdlYzctNzEyZi00OTIzLTk3YzgtYmIxM2E5ZWUzZTk5",
        label: "Men",
        href: "/shop?category=MDc2ZjdlYzctNzEyZi00OTIzLTk3YzgtYmIxM2E5ZWUzZTk5",
        icon: 'FaHashtag',
      },
      {
        key: "new-arrivals",
        label: "New Arrivals",
        href: "/#",
        icon: 'FaShirt',
        disabled: true,
      },
      {
        key: "sale",
        label: "Sale",
        href: "/#",
        icon: 'FaTag',
        disabled: true,
      },
    ],
  },
  /*
  categories: {
    tabs: [
      {
        "key": "ODljOGNlZDEtNzU5Ny00ZjVlLTgzMWUtM2E4MDlhM2NjMmVl",
        "name": "Women",
      },
      {
        "key": "MDc2ZjdlYzctNzEyZi00OTIzLTk3YzgtYmIxM2E5ZWUzZTk5",
        "name": "Men",
      }
    ],
    navigation: [
      {
        label: "Women",
        href: "/shop?category=ODljOGNlZDEtNzU5Ny00ZjVlLTgzMWUtM2E4MDlhM2NjMmVl"
      },
      {
        label: "Men",
        href: "/shop?category=MDc2ZjdlYzctNzEyZi00OTIzLTk3YzgtYmIxM2E5ZWUzZTk5"
      },
      {
        label: "New Arrivals",
        href: "/#",
        disabled: true,
      },
      {
        label: "Sale",
        href: "/#",
        disabled: true,
      },
    ],
  },
  shopSortByOptions: [
    {
      label: "Relevance",
      key: "relevance"
    },
    {
      label: "Trending",
      key: "treanding"
    },
    {
      label: "Latest arrival",
      key: "latest-arrival"
    },
    {
      label: "Price: Low to high",
      key: "price-descending"
    },
    {
      label: "Price: High to low",
      key: "price-ascending"
    },
  ]
  */
};

export default settings;