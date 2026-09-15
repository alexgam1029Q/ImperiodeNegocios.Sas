// ==========================================
// DATOS DEL JUEGO
// ==========================================

const CATEGORIAS = {
    "Finanzas": {lvl: 1, color: "#ffd000", vol: 0.02,
        incomeBase: 1000, growthRate: 0.05, upgradeCost: 5000,
        empresas: [
            {n:"Visa", p:280.0}, {n:"Mastercard", p:470.0}, {n:"PayPal", p:65.0}, {n:"Goldman Sachs", p:450.0},
            {n:"Morgan Stanley", p:100.0}, {n:"JPMorgan", p:200.0}, {n:"Citi", p:60.0}, {n:"Bank of America", p:37.0},
            {n:"Wells Fargo", p:55.0}, {n:"HSBC", p:42.0}, {n:"Santander", p:4.5}, {n:"BBVA", p:9.0},
            {n:"Davivienda", p:18.0}, {n:"NuBank", p:11.0}, {n:"Revolut", p:8.0}, {n:"Stripe", p:25.0},
            {n:"Square", p:80.0}, {n:"Robinhood", p:18.0}, {n:"eToro", p:4.0}, {n:"Capital One", p:140.0},
            {n:"BlackRock", p:920.0}, {n:"Charles Schwab", p:72.0}, {n:"Deutsche Bank", p:16.0}, {n:"Banco Itau", p:6.0}, {n:"UBS", p:28.0}, {n:"American Express", p:235.0}, {n:"ING Group", p:15.0}, {n:"Credit Suisse", p:2.0}, {n:"Commerzbank", p:14.0}, {n:"Mizuho", p:19.0}
        ]
    },
    "Tecnologia": {lvl: 2, color: "#00ff88", vol: 0.025,
        incomeBase: 1250, growthRate: 0.06, upgradeCost: 10000,
        empresas: [
            {n:"Apple", p:175.0}, {n:"Google", p:140.0}, {n:"Microsoft", p:330.0}, {n:"Amazon", p:180.0},
            {n:"Meta", p:490.0}, {n:"Netflix", p:610.0}, {n:"Samsung", p:60.0}, {n:"Intel", p:25.0},
            {n:"Nvidia", p:880.0}, {n:"Oracle", p:115.0}, {n:"Adobe", p:525.0}, {n:"Tesla", p:240.0},
            {n:"Xiaomi", p:15.0}, {n:"Sony", p:85.0}, {n:"Dell", p:90.0}, {n:"HP", p:30.0},
            {n:"Lenovo", p:20.0}, {n:"Spotify", p:320.0}, {n:"Uber", p:75.0}, {n:"Airbnb", p:155.0},
            {n:"Palantir", p:85.0}, {n:"Snowflake", p:165.0}, {n:"CrowdStrike", p:380.0}, {n:"Cloudflare", p:95.0}, {n:"IBM", p:185.0}, {n:"Cisco", p:62.0}, {n:"AMD", p:165.0}, {n:"Qualcomm", p:195.0}, {n:"Broadcom", p:880.0}, {n:"Accenture", p:320.0}
        ]
    },
    "Bebidas": {lvl: 3, color: "#00CED1", vol: 0.025,
        incomeBase: 1500, growthRate: 0.07, upgradeCost: 15000,
        empresas: [
            {n:"AB InBev", p:65.0}, {n:"Heineken", p:95.0}, {n:"Diageo", p:145.0}, {n:"Pernod Ricard", p:175.0},
            {n:"Constellation", p:275.0}, {n:"Brown-Forman", p:48.0}, {n:"Ambev", p:2.5}, {n:"Carlsberg", p:105.0},
            {n:"Molson Coors", p:58.0}, {n:"Boston Beer", p:285.0}, {n:"Monster Beverage", p:55.0}, {n:"Celsius", p:35.0},
            {n:"Keurig Dr Pepper", p:38.0}, {n:"Coca-Cola Europacific", p:75.0}, {n:"Fomento Economico", p:95.0}, {n:"Embotelladora Andina", p:15.0},
            {n:"Coca-Cola Femsa", p:95.0}, {n:"Arca Continental", p:72.0}, {n:"PepsiCo", p:170.0}, {n:"Danone", p:65.0},
            {n:"Wilmar", p:35.0}, {n:"Adecoagro", p:8.0}, {n:"Vina Concha y Toro", p:4.0}, {n:"Tesla N/A", p:240.0}, {n:"Asahi Group", p:42.0}, {n:"Kirin", p:18.0}, {n:"Suntory", p:55.0}, {n:"Tsingtao", p:9.0}, {n:"Campari", p:10.0}, {n:"Carlsberg Breweries", p:105.0}
        ]
    },
    "Energia": {lvl: 4, color: "#ff8800", vol: 0.03,
        incomeBase: 1750, growthRate: 0.08, upgradeCost: 20000,
        empresas: [
            {n:"ExxonMobil", p:110.0}, {n:"Shell", p:68.0}, {n:"Chevron", p:155.0}, {n:"BP", p:36.0},
            {n:"TotalEnergies", p:62.0}, {n:"Gazprom", p:5.0}, {n:"Petrobras", p:14.0}, {n:"Ecopetrol", p:12.0},
            {n:"SolarEdge", p:45.0}, {n:"GreenPower", p:8.0}, {n:"NextEra", p:75.0}, {n:"Enel", p:7.0},
            {n:"Iberdrola", p:12.0}, {n:"EDF", p:12.0}, {n:"Repsol", p:16.0}, {n:"Engie", p:16.0},
            {n:"Orsted", p:12.0}, {n:"Vestas", p:25.0}, {n:"First Solar", p:170.0}, {n:"SunPower", p:4.0},
            {n:"ConocoPhillips", p:112.0}, {n:"Marathon Petroleum", p:175.0}, {n:"Phillips 66", p:145.0}, {n:"Diamondback", p:180.0}, {n:"Equinor", p:28.0}, {n:"Occidental", p:58.0}, {n:"Halliburton", p:35.0}, {n:"Schlumberger", p:42.0}, {n:"Baker Hughes", p:32.0}, {n:"EOG Resources", p:125.0}
        ]
    },
    "Salud": {lvl: 5, color: "#00cfff", vol: 0.02,
        incomeBase: 2000, growthRate: 0.09, upgradeCost: 25000,
        empresas: [
            {n:"Pfizer", p:28.0}, {n:"Moderna", p:45.0}, {n:"AstraZeneca", p:68.0}, {n:"J&J", p:155.0},
            {n:"Novartis", p:105.0}, {n:"Roche", p:310.0}, {n:"Sanofi", p:50.0}, {n:"GSK", p:42.0},
            {n:"Bayer", p:30.0}, {n:"Abbott", p:105.0}, {n:"Merck", p:125.0}, {n:"Amgen", p:280.0},
            {n:"Biogen", p:220.0}, {n:"Illumina", p:140.0}, {n:"Regeneron", p:950.0}, {n:"CureVac", p:6.0},
            {n:"Takeda", p:15.0}, {n:"Teva", p:15.0}, {n:"Fresenius", p:45.0}, {n:"BMS", p:48.0},
            {n:"Eli Lilly", p:820.0}, {n:"Dexcom", p:135.0}, {n:"Intuitive Surgical", p:575.0}, {n:"Stryker", p:355.0}, {n:"Novo Nordisk", p:125.0}, {n:"CVS Health", p:58.0}, {n:"Walgreens", p:18.0}, {n:"Becton Dickinson", p:235.0}, {n:"Edwards Lifesciences", p:72.0}, {n:"Hologic", p:78.0}
        ]
    },
    "Alimentacion": {lvl: 6, color: "#FF6347", vol: 0.025,
        incomeBase: 2250, growthRate: 0.10, upgradeCost: 30000,
        empresas: [
            {n:"Nestle", p:120.0}, {n:"PepsiCo", p:170.0}, {n:"Coca-Cola", p:62.0}, {n:"Mondelez", p:68.0},
            {n:"Kraft Heinz", p:35.0}, {n:"General Mills", p:65.0}, {n:"Kellogg", p:82.0}, {n:"ConAgra", p:28.0},
            {n:"Campbell Soup", p:45.0}, {n:"Hormel", p:32.0}, {n:"J.M. Smucker", p:125.0}, {n:"Tyson Foods", p:58.0},
            {n:"Pilgrim's Pride", p:42.0}, {n:"Sanderson Farms", p:195.0}, {n:"Bumble Bee", p:18.0}, {n:"Maple Leaf", p:28.0},
            {n:"Danone", p:65.0}, {n:"Unilever", p:48.0}, {n:"Associated British", p:18.0}, {n:"Kerry Group", p:95.0},
            {n:"Archer Daniels", p:60.0}, {n:"Bunge", p:95.0}, {n:"Ingredion", p:115.0}, {n:"McCormick", p:72.0}, {n:"JBS", p:18.0}, {n:"Kellanova", p:55.0}, {n:"Oatly", p:2.0}, {n:"Beyond Meat", p:4.0}, {n:"Saputo", p:22.0}, {n:"Cal-Maine Foods", p:62.0}
        ]
    },
    "Automotriz": {lvl: 7, color: "#ff4444", vol: 0.028,
        incomeBase: 2500, growthRate: 0.11, upgradeCost: 35000,
        empresas: [
            {n:"Tesla", p:240.0}, {n:"Toyota", p:240.0}, {n:"Ford", p:12.0}, {n:"BMW", p:110.0},
            {n:"Audi", p:130.0}, {n:"Mercedes", p:68.0}, {n:"Nissan", p:6.0}, {n:"Hyundai", p:55.0},
            {n:"Kia", p:90.0}, {n:"Volkswagen", p:125.0}, {n:"Ferrari", p:420.0}, {n:"Lamborghini", p:130.0},
            {n:"Mazda", p:5.0}, {n:"Subaru", p:75.0}, {n:"Peugeot", p:18.0}, {n:"Renault", p:12.0},
            {n:"Volvo", p:28.0}, {n:"Jeep", p:25.0}, {n:"Dodge", p:25.0}, {n:"Chevrolet", p:48.0},
            {n:"Stellantis", p:22.0}, {n:"BYD", p:35.0}, {n:"Rivian", p:12.0}, {n:"Lucid Motors", p:3.0}, {n:"Honda", p:32.0}, {n:"Mitsubishi Motors", p:4.0}, {n:"Suzuki", p:12.0}, {n:"Isuzu", p:14.0}, {n:"Polestar", p:2.0}, {n:"Alfa Romeo", p:18.0}
        ]
    },
    "Consumo": {lvl: 8, color: "#ff44aa", vol: 0.018,
        incomeBase: 2750, growthRate: 0.12, upgradeCost: 40000,
        empresas: [
            {n:"Coca-Cola", p:62.0}, {n:"Pepsi", p:170.0}, {n:"Nestle", p:120.0}, {n:"Unilever", p:48.0},
            {n:"P&G", p:165.0}, {n:"Colgate", p:90.0}, {n:"Nike", p:80.0}, {n:"Adidas", p:120.0},
            {n:"Zara", p:45.0}, {n:"H&M", p:16.0}, {n:"Starbucks", p:95.0}, {n:"McDonald's", p:290.0},
            {n:"Burger King", p:75.0}, {n:"KFC", p:135.0}, {n:"Domino's", p:390.0}, {n:"Walmart", p:95.0},
            {n:"Costco", p:870.0}, {n:"Target", p:145.0}, {n:"Carrefour", p:16.0}, {n:"eBay", p:45.0},
            {n:"Hermes", p:2800.0}, {n:"LVMH", p:920.0}, {n:"Richemont", p:145.0}, {n:"Kering", p:380.0}, {n:"L'Oreal", p:410.0}, {n:"Estee Lauder", p:105.0}, {n:"Clorox", p:145.0}, {n:"Kimberly-Clark", p:135.0}, {n:"Church & Dwight", p:98.0}, {n:"Yum Brands", p:138.0}
        ]
    },
    "E-Commerce": {lvl: 9, color: "#FF4500", vol: 0.04,
        incomeBase: 3000, growthRate: 0.13, upgradeCost: 45000,
        empresas: [
            {n:"Amazon", p:180.0}, {n:"Alibaba", p:85.0}, {n:"JD.com", p:35.0}, {n:"Pinduoduo", p:145.0},
            {n:"Shopify", p:70.0}, {n:"Mercado Libre", p:1900.0}, {n:"Sea Limited", p:72.0}, {n:"eBay", p:45.0},
            {n:"Etsy", p:32.0}, {n:"Wayfair", p:55.0}, {n:"Coupang", p:22.0}, {n:"Rakuten", p:7.0},
            {n:"Zalando", p:22.0}, {n:"ASOS", p:4.0}, {n:"Boohoo", p:0.35}, {n:"Farfetch", p:0.65},
            {n:"Global-e", p:35.0}, {n:"VTEX", p:8.0}, {n:"BigCommerce", p:8.0}, {n:"Squarespace", p:45.0},
            {n:"Wix", p:155.0}, {n:"Shopee", p:95.0}, {n:"Lazada", p:8.0}, {n:"Flipkart", p:25.0}, {n:"Temu", p:18.0}, {n:"Mercari", p:16.0}, {n:"Ocado", p:5.0}, {n:"Groupon", p:14.0}, {n:"Overstock", p:18.0}, {n:"Poshmark", p:12.0}
        ]
    },
    "Gaming": {lvl: 10, color: "#7FFF00", vol: 0.055,
        incomeBase: 3250, growthRate: 0.14, upgradeCost: 50000,
        empresas: [
            {n:"Tencent", p:42.0}, {n:"Sony", p:85.0}, {n:"Microsoft", p:330.0}, {n:"Nintendo", p:15.0},
            {n:"EA", p:145.0}, {n:"Activision Blizzard", p:78.0}, {n:"Take-Two", p:155.0}, {n:"Ubisoft", p:22.0},
            {n:"Capcom", p:18.0}, {n:"Square Enix", p:25.0}, {n:"Sega", p:6.0}, {n:"Bandai Namco", p:25.0},
            {n:"Konami", p:12.0}, {n:"Nexon", p:15.0}, {n:"NetEase", p:95.0}, {n:"Sea Limited", p:72.0},
            {n:"Roblox", p:55.0}, {n:"Unity", p:28.0}, {n:"Epic Games", p:25.0}, {n:"Scopely", p:12.0},
            {n:"Zynga", p:8.0}, {n:"Playtika", p:8.0}, {n:"Scientific Games", p:75.0}, {n:"Flutter", p:225.0}, {n:"CD Projekt", p:42.0}, {n:"Devolver Digital", p:18.0}, {n:"Embracer", p:3.0}, {n:"Krafton", p:155.0}, {n:"Gameloft", p:8.0}, {n:"Paradox Interactive", p:22.0}
        ]
    },
    "Criptomonedas": {lvl: 11, color: "#00ffaa", vol: 0.12,
        incomeBase: 3500, growthRate: 0.15, upgradeCost: 55000,
        empresas: [
            {n:"Bitcoin", p:65000.0}, {n:"Ethereum", p:3500.0}, {n:"Binance Coin", p:600.0}, {n:"Solana", p:145.0},
            {n:"Cardano", p:0.45}, {n:"Polkadot", p:7.0}, {n:"Avalanche", p:35.0}, {n:"Chainlink", p:14.0},
            {n:"Ripple", p:0.6}, {n:"Litecoin", p:80.0}, {n:"Dogecoin", p:0.16}, {n:"Shiba Inu", p:2.5e-05},
            {n:"Tron", p:0.12}, {n:"Stellar", p:0.11}, {n:"Cosmos", p:8.0}, {n:"Near", p:6.0},
            {n:"Algorand", p:0.2}, {n:"Tezos", p:1.2}, {n:"Filecoin", p:5.5}, {n:"VeChain", p:0.04},
            {n:"Toncoin", p:6.5}, {n:"UNUS SED LEO", p:6.0}, {n:"Cronos", p:0.08}, {n:"Aptos", p:8.0}, {n:"Monero", p:165.0}, {n:"Uniswap", p:8.0}, {n:"Optimism", p:2.0}, {n:"Arbitrum", p:1.0}, {n:"Aave", p:185.0}, {n:"Maker", p:1450.0}
        ]
    },
    "Entretenimiento": {lvl: 12, color: "#aa00ff", vol: 0.03,
        incomeBase: 3750, growthRate: 0.16, upgradeCost: 60000,
        empresas: [
            {n:"Disney", p:110.0}, {n:"Warner Bros", p:8.0}, {n:"Pixar", p:110.0}, {n:"Marvel", p:110.0},
            {n:"Netflix", p:610.0}, {n:"Hulu", p:110.0}, {n:"Paramount", p:12.0}, {n:"Universal", p:40.0},
            {n:"Dreamworks", p:40.0}, {n:"Twitch", p:180.0}, {n:"YouTube", p:140.0}, {n:"Spotify", p:320.0},
            {n:"Epic Games", p:25.0}, {n:"Ubisoft", p:22.0}, {n:"EA", p:145.0}, {n:"Rockstar", p:160.0},
            {n:"Nintendo", p:15.0}, {n:"PlayStation", p:85.0}, {n:"Xbox", p:330.0}, {n:"Sega", p:6.0},
            {n:"Tencent Games", p:45.0}, {n:"NetEase", p:95.0}, {n:"Capcom", p:18.0}, {n:"Bandai Namco", p:25.0}, {n:"Sony Pictures", p:85.0}, {n:"Lionsgate", p:8.0}, {n:"AMC Networks", p:12.0}, {n:"iHeartMedia", p:2.0}, {n:"SiriusXM", p:22.0}, {n:"Live Nation", p:105.0}
        ]
    },
    "Logistica": {lvl: 13, color: "#DAA520", vol: 0.03,
        incomeBase: 4000, growthRate: 0.17, upgradeCost: 65000,
        empresas: [
            {n:"UPS", p:125.0}, {n:"FedEx", p:255.0}, {n:"DHL", p:42.0}, {n:"Maersk", p:12.0},
            {n:"C.H. Robinson", p:95.0}, {n:"XPO Logistics", p:115.0}, {n:"J.B. Hunt", p:155.0}, {n:"Old Dominion", p:185.0},
            {n:"Knight-Swift", p:52.0}, {n:"Landstar", p:175.0}, {n:"Schneider", p:22.0}, {n:"Werner", p:35.0},
            {n:"Ryder", p:115.0}, {n:"Americold", p:28.0}, {n:"ZTO Express", p:28.0}, {n:"SF Holding", p:42.0},
            {n:"Deutsche Post", p:42.0}, {n:"Kuehne+Nagel", p:25.0}, {n:"DSV", p:145.0}, {n:"Geodis", p:18.0},
            {n:"CEVA Logistics", p:12.0}, {n:"Pantos", p:8.0}, {n:"Yusen Logistics", p:22.0}, {n:"Nippon Express", p:32.0}, {n:"Expeditors", p:118.0}, {n:"Dachser", p:28.0}, {n:"Kintetsu World Express", p:15.0}, {n:"CJ Logistics", p:12.0}, {n:"PostNL", p:2.0}, {n:"Yamato Transport", p:18.0}
        ]
    },
    "Seguros": {lvl: 14, color: "#4682B4", vol: 0.022,
        incomeBase: 4250, growthRate: 0.18, upgradeCost: 70000,
        empresas: [
            {n:"Berkshire Hathaway", p:715000.0}, {n:"AIG", p:72.0}, {n:"Allianz", p:255.0}, {n:"AXA", p:65.0},
            {n:"MetLife", p:72.0}, {n:"Prudential", p:115.0}, {n:"Aflac", p:105.0}, {n:"AON", p:285.0},
            {n:"Marsh McLennan", p:215.0}, {n:"Chubb", p:265.0}, {n:"Zurich", p:455.0}, {n:"Generali", p:35.0},
            {n:"Cigna", p:330.0}, {n:"Humana", p:375.0}, {n:"UNUM", p:55.0}, {n:"Principal Financial", p:85.0},
            {n:"Lincoln National", p:35.0}, {n:"Reinsurance Group", p:195.0}, {n:"Arthur J Gallagher", p:285.0}, {n:"Willis Towers", p:285.0},
            {n:"Travelers", p:215.0}, {n:"Cincinnati Financial", p:105.0}, {n:"W.R. Berkley", p:55.0}, {n:"Markel", p:195.0}, {n:"Swiss Re", p:115.0}, {n:"Hannover Re", p:245.0}, {n:"Munich Re", p:465.0}, {n:"Legal & General", p:2.0}, {n:"Sampo", p:42.0}, {n:"Mapfre", p:2.0}
        ]
    },
    "Agricultura": {lvl: 15, color: "#88ff00", vol: 0.025,
        incomeBase: 4500, growthRate: 0.19, upgradeCost: 75000,
        empresas: [
            {n:"John Deere", p:370.0}, {n:"Monsanto", p:30.0}, {n:"Syngenta", p:45.0}, {n:"Corteva", p:55.0},
            {n:"Bayer Crop", p:30.0}, {n:"Nutrien", p:52.0}, {n:"Yara", p:45.0}, {n:"CF Industries", p:80.0},
            {n:"AGCO", p:120.0}, {n:"Kubota", p:12.0}, {n:"ADM", p:60.0}, {n:"Bunge", p:95.0},
            {n:"Cargill", p:50.0}, {n:"Wilmar", p:35.0}, {n:"Olam", p:12.0}, {n:"Louis Dreyfus", p:15.0},
            {n:"FMC", p:62.0}, {n:"UPL", p:4.0}, {n:"Valmont", p:290.0}, {n:"Lindsay", p:145.0},
            {n:"Tyson Foods", p:58.0}, {n:"Deere & Co", p:370.0}, {n:"Archer Daniels", p:60.0}, {n:"Zoetis", p:185.0}, {n:"Mosaic", p:28.0}, {n:"Fonterra", p:5.0}, {n:"DeLaval", p:22.0}, {n:"Rabo Agri", p:18.0}, {n:"Astarta", p:42.0}, {n:"Fresh Del Monte", p:28.0}
        ]
    },
    "Construccion": {lvl: 16, color: "#ffaa00", vol: 0.03,
        incomeBase: 4750, growthRate: 0.20, upgradeCost: 80000,
        empresas: [
            {n:"Cemex", p:6.0}, {n:"Holcim", p:80.0}, {n:"Argos", p:2.5}, {n:"Lafarge", p:80.0},
            {n:"CRH", p:90.0}, {n:"Vicat", p:50.0}, {n:"Buzzi", p:35.0}, {n:"Heidelberg", p:16.0},
            {n:"UltraTech", p:110.0}, {n:"Dangote", p:14.0}, {n:"Skanska", p:22.0}, {n:"Bechtel", p:30.0},
            {n:"Fluor", p:40.0}, {n:"Kiewit", p:30.0}, {n:"Jacobs", p:145.0}, {n:"AECOM", p:95.0},
            {n:"Ferrovial", p:35.0}, {n:"ACS", p:45.0}, {n:"VINCI", p:140.0}, {n:"Bouygues", p:65.0},
            {n:"Martin Marietta", p:580.0}, {n:"Vulcan Materials", p:260.0}, {n:"Quanta Services", p:320.0}, {n:"Eiffage", p:120.0}, {n:"Caterpillar", p:285.0}, {n:"Lennar", p:155.0}, {n:"D.R. Horton", p:155.0}, {n:"PulteGroup", p:115.0}, {n:"Toll Brothers", p:125.0}, {n:"NVR", p:7800.0}
        ]
    },
    "Fintech": {lvl: 17, color: "#1E90FF", vol: 0.05,
        incomeBase: 5000, growthRate: 0.21, upgradeCost: 85000,
        empresas: [
            {n:"PayPal", p:65.0}, {n:"Square", p:80.0}, {n:"Stripe", p:25.0}, {n:"Adyen", p:1650.0},
            {n:"Klarna", p:6.0}, {n:"Affirm", p:55.0}, {n:"SoFi", p:7.0}, {n:"Robinhood", p:18.0},
            {n:"Coinbase", p:205.0}, {n:"NuBank", p:11.0}, {n:"Mercado Pago", p:8.0}, {n:"dLocal", p:12.0},
            {n:"PagSeguro", p:8.0}, {n:"StoneCo", p:18.0}, {n:"Fiserv", p:205.0}, {n:"FIS", p:75.0},
            {n:"Global Payments", p:95.0}, {n:"Shift4", p:95.0}, {n:"Marqeta", p:5.0}, {n:"Bill.com", p:65.0},
            {n:"Brex", p:12.0}, {n:"Plaid", p:8.0}, {n:"Chime", p:25.0}, {n:"Revolut", p:8.0}, {n:"Wise", p:10.0}, {n:"Tink", p:12.0}, {n:"N26", p:8.0}, {n:"Toast", p:25.0}, {n:"Checkout.com", p:18.0}, {n:"Rapyd", p:15.0}
        ]
    },
    "Moda": {lvl: 18, color: "#FF1493", vol: 0.035,
        incomeBase: 5250, growthRate: 0.22, upgradeCost: 90000,
        empresas: [
            {n:"LVMH", p:920.0}, {n:"Hermes", p:2800.0}, {n:"Kering", p:380.0}, {n:"Richemont", p:145.0},
            {n:"Dior", p:850.0}, {n:"Chanel", p:12.0}, {n:"Prada", p:65.0}, {n:"Ralph Lauren", p:185.0},
            {n:"Coach", p:55.0}, {n:"Michael Kors", p:42.0}, {n:"Tapestry", p:65.0}, {n:"Capri Holdings", p:42.0},
            {n:"Under Armour", p:8.0}, {n:"Lululemon", p:315.0}, {n:"Lululemon", p:315.0}, {n:"Gap", p:18.0},
            {n:"Levi Strauss", p:18.0}, {n:"VF Corp", p:35.0}, {n:"Hanesbrands", p:6.0}, {n:"Guess", p:22.0},
            {n:"TJX Companies", p:108.0}, {n:"Ross Stores", p:148.0}, {n:"Burlington", p:225.0}, {n:"Zalando", p:22.0}, {n:"Burberry", p:12.0}, {n:"Gucci", p:420.0}, {n:"Armani", p:65.0}, {n:"Moncler", p:58.0}, {n:"On Running", p:42.0}, {n:"Skechers", p:62.0}
        ]
    },
    "Quimica": {lvl: 19, color: "#32CD32", vol: 0.028,
        incomeBase: 5500, growthRate: 0.23, upgradeCost: 95000,
        empresas: [
            {n:"BASF", p:42.0}, {n:"Dow", p:55.0}, {n:"DuPont", p:78.0}, {n:"LyondellBasell", p:95.0},
            {n:"Linde", p:440.0}, {n:"Air Liquide", p:175.0}, {n:"Evonik", p:12.0}, {n:"Covestro", p:65.0},
            {n:"Arkema", p:115.0}, {n:"Solvay", p:125.0}, {n:"Linde India", p:42.0}, {n:"PTT Global", p:8.0},
            {n:"Indorama", p:35.0}, {n:"SABIC", p:12.0}, {n:"Mitsubishi Chem", p:8.0}, {n:"Sumitomo Chem", p:5.0},
            {n:"Toray", p:12.0}, {n:"Asahi Kasei", p:15.0}, {n:"DSM", p:95.0}, {n:"Celanese", p:155.0},
            {n:"Eastman", p:105.0}, {n:"Huntsman", p:28.0}, {n:"Westlake", p:155.0}, {n:"Albemarle", p:95.0}, {n:"Wacker Chemie", p:110.0}, {n:"PPG Industries", p:125.0}, {n:"Sherwin-Williams", p:315.0}, {n:"Fuchs", p:38.0}, {n:"Nouryon", p:22.0}, {n:"Orbia", p:3.0}
        ]
    },
    "Textil": {lvl: 20, color: "#DA70D6", vol: 0.03,
        incomeBase: 5750, growthRate: 0.24, upgradeCost: 100000,
        empresas: [
            {n:"Inditex", p:48.0}, {n:"H&M", p:16.0}, {n:"Fast Retailing", p:42.0}, {n:"Gap", p:18.0},
            {n:"Ross Stores", p:148.0}, {n:"TJX", p:108.0}, {n:"Burlington", p:225.0}, {n:"Macy's", p:18.0},
            {n:"Kohl's", p:25.0}, {n:"Nordstrom", p:22.0}, {n:"L Brands", p:75.0}, {n:"American Eagle", p:22.0},
            {n:"Abercrombie", p:165.0}, {n:"Urban Outfitters", p:42.0}, {n:"Foot Locker", p:25.0}, {n:"Dick's Sporting", p:225.0},
            {n:"Academy Sports", p:75.0}, {n:"Big 5", p:8.0}, {n:"Shoe Carnival", p:95.0}, {n:"Genesco", p:75.0},
            {n:"Weyco", p:28.0}, {n:"Caleres", p:28.0}, {n:"Designer Brands", p:8.0}, {n:"Boot Barn", p:155.0}, {n:"Puma", p:48.0}, {n:"New Balance", p:65.0}, {n:"Skechers", p:62.0}, {n:"Asics", p:28.0}, {n:"On Holding", p:42.0}, {n:"Li Ning", p:22.0}
        ]
    },
    "Aeroespacial": {lvl: 21, color: "#4169E1", vol: 0.038,
        incomeBase: 6000, growthRate: 0.25, upgradeCost: 105000,
        empresas: [
            {n:"Boeing", p:175.0}, {n:"Airbus", p:155.0}, {n:"Lockheed Martin", p:460.0}, {n:"Northrop Grumman", p:495.0},
            {n:"Raytheon", p:95.0}, {n:"General Dynamics", p:285.0}, {n:"BAE Systems", p:65.0}, {n:"Safran", p:155.0},
            {n:"Thales", p:175.0}, {n:"L3Harris", p:215.0}, {n:"TransDigm", p:1250.0}, {n:"Heico", p:175.0},
            {n:"Spirit AeroSystems", p:35.0}, {n:"Textron", p:85.0}, {n:"Huntington Ingalls", p:225.0}, {n:"Leidos", p:115.0},
            {n:"Booz Allen", p:155.0}, {n:"CACI International", p:285.0}, {n:"Science Applications", p:145.0}, {n:"Kratos", p:28.0},
            {n:"AeroVironment", p:185.0}, {n:"Rocket Lab", p:5.0}, {n:"Virgin Galactic", p:0.85}, {n:"Spire Global", p:12.0}, {n:"Firefly Aerospace", p:8.0}, {n:"SpaceX", p:210.0}, {n:"Blue Origin", p:85.0}, {n:"Arianespace", p:12.0}, {n:"Virgin Orbit", p:1.0}, {n:"Maxar", p:28.0}
        ]
    },
    "Biotecnologia": {lvl: 22, color: "#20B2AA", vol: 0.035,
        incomeBase: 6250, growthRate: 0.26, upgradeCost: 110000,
        empresas: [
            {n:"Amgen", p:280.0}, {n:"Gilead", p:95.0}, {n:"Biogen", p:220.0}, {n:"Regeneron", p:950.0},
            {n:"Vertex", p:495.0}, {n:"Illumina", p:140.0}, {n:"BioNTech", p:95.0}, {n:"Moderna", p:45.0},
            {n:"Genmab", p:42.0}, {n:"Argenx", p:445.0}, {n:"BeiGene", p:225.0}, {n:"Alnylam", p:285.0},
            {n:"Exact Sciences", p:65.0}, {n:"Guardant Health", p:32.0}, {n:"Natera", p:135.0}, {n:"Charles River", p:185.0},
            {n:"IQVIA", p:225.0}, {n:"Syneos Health", p:65.0}, {n:"ICON plc", p:285.0}, {n:"Medpace", p:305.0},
            {n:"Parexel", p:95.0}, {n:"Labcorp", p:215.0}, {n:"Quest Diagnostics", p:155.0}, {n:"NeoGenomics", p:12.0}, {n:"CRISPR Therapeutics", p:52.0}, {n:"Sangamo", p:2.0}, {n:"Beam Therapeutics", p:22.0}, {n:"Editas Medicine", p:4.0}, {n:"Intellia", p:18.0}, {n:"Relay Therapeutics", p:8.0}
        ]
    },
    "Educacion": {lvl: 23, color: "#9370DB", vol: 0.032,
        incomeBase: 6500, growthRate: 0.27, upgradeCost: 115000,
        empresas: [
            {n:"Pearson", p:10.0}, {n:"Chegg", p:12.0}, {n:"2U", p:0.35}, {n:"Coursera", p:8.0},
            {n:"Udemy", p:8.0}, {n:"Duolingo", p:345.0}, {n:"Stride", p:78.0}, {n:"Adtalem", p:95.0},
            {n:"Grand Canyon", p:145.0}, {n:"Laureate", p:12.0}, {n:"Bright Horizons", p:115.0}, {n:"Graham", p:38.0},
            {n:"New Oriental", p:85.0}, {n:"TAL Education", p:12.0}, {n:"GSX Techedu", p:2.0}, {n:"Vasta", p:4.0},
            {n:"Arco Platform", p:15.0}, {n:"Zovio", p:1.0}, {n:"Instructure", p:28.0}, {n:"PowerSchool", p:18.0},
            {n:"Ellucian", p:12.0}, {n:"Blackboard", p:8.0}, {n:"Wiley", p:42.0}, {n:"Scholastic", p:22.0}, {n:"K12", p:48.0}, {n:"Pear Deck", p:10.0}, {n:"Skillsoft", p:5.0}, {n:"Pluralsight", p:8.0}, {n:"MasterClass", p:15.0}, {n:"BYJU'S", p:3.0}
        ]
    },
    "Telecomunicaciones": {lvl: 24, color: "#00aaff", vol: 0.025,
        incomeBase: 6750, growthRate: 0.28, upgradeCost: 120000,
        empresas: [
            {n:"AT&T", p:18.0}, {n:"Verizon", p:40.0}, {n:"T-Mobile", p:210.0}, {n:"Telefonica", p:4.0},
            {n:"America Movil", p:20.0}, {n:"Vodafone", p:25.0}, {n:"Orange", p:12.0}, {n:"BT", p:3.0},
            {n:"Telstra", p:4.0}, {n:"SK Telecom", p:22.0}, {n:"NTT", p:140.0}, {n:"China Mobile", p:45.0},
            {n:"Sprint", p:210.0}, {n:"Claro", p:20.0}, {n:"Movistar", p:4.0}, {n:"Entel", p:14.0},
            {n:"Tigo", p:18.0}, {n:"Digicel", p:2.0}, {n:"MTN", p:3.0}, {n:"Zain", p:0.8},
            {n:"Comcast", p:42.0}, {n:"Charter Communications", p:345.0}, {n:"Cisco", p:58.0}, {n:"Qualcomm", p:195.0}, {n:"Nokia", p:4.0}, {n:"Ericsson", p:6.0}, {n:"Huawei", p:18.0}, {n:"Rogers", p:38.0}, {n:"Bell Canada", p:24.0}, {n:"Telus", p:16.0}
        ]
    },
    "Turismo": {lvl: 25, color: "#00ffaa", vol: 0.03,
        incomeBase: 7000, growthRate: 0.29, upgradeCost: 125000,
        empresas: [
            {n:"Airbnb", p:155.0}, {n:"Booking", p:3600.0}, {n:"Expedia", p:125.0}, {n:"TripAdvisor", p:15.0},
            {n:"Despegar", p:8.0}, {n:"Priceline", p:3600.0}, {n:"Agoda", p:3600.0}, {n:"Kayak", p:3600.0},
            {n:"Travelocity", p:125.0}, {n:"Hotwire", p:125.0}, {n:"Hilton", p:220.0}, {n:"Marriott", p:260.0},
            {n:"Hyatt", p:155.0}, {n:"Accor", p:45.0}, {n:"Wyndham", p:170.0}, {n:"IHG", p:110.0},
            {n:"Melia", p:12.0}, {n:"NH Hotels", p:6.0}, {n:"Riu Hotels", p:15.0}, {n:"Barcelo", p:3.0},
            {n:"Carnival Corp", p:28.0}, {n:"Royal Caribbean", p:205.0}, {n:"Norwegian Cruise", p:28.0}, {n:"Delta Airlines", p:48.0}, {n:"TUI Group", p:8.0}, {n:"Emirates", p:75.0}, {n:"Lufthansa", p:8.0}, {n:"United Airlines", p:48.0}, {n:"American Airlines", p:14.0}, {n:"Southwest", p:28.0}
        ]
    },
    "Defensa": {lvl: 26, color: "#8B0000", vol: 0.035,
        incomeBase: 7250, growthRate: 0.30, upgradeCost: 130000,
        empresas: [
            {n:"Lockheed Martin", p:460.0}, {n:"Raytheon", p:95.0}, {n:"Northrop Grumman", p:495.0}, {n:"General Dynamics", p:285.0},
            {n:"L3Harris", p:215.0}, {n:"BAE Systems", p:65.0}, {n:"Thales", p:175.0}, {n:"Leonardo", p:22.0},
            {n:"Saab", p:12.0}, {n:"Rheinmetall", p:455.0}, {n:"Hensoldt", p:35.0}, {n:"Krauss-Maffei", p:285.0},
            {n:"Elbit Systems", p:585.0}, {n:"Israel Aerospace", p:65.0}, {n:"Rafael", p:12.0}, {n:"Naval Group", p:18.0},
            {n:"Fincantieri", p:0.65}, {n:"DSME", p:12.0}, {n:"Hyundai Heavy", p:135.0}, {n:"Mitsubishi Heavy", p:55.0},
            {n:"Kawasaki Heavy", p:25.0}, {n:"IHI Corp", p:12.0}, {n:"Textron", p:85.0}, {n:"BWX Technologies", p:115.0}, {n:"General Atomics", p:60.0}, {n:"Boeing Defense", p:175.0}, {n:"Dassault Aviation", p:195.0}, {n:"Rostec", p:35.0}, {n:"Hanwha Aerospace", p:85.0}, {n:"Navantia", p:12.0}
        ]
    },
    "Mineria": {lvl: 27, color: "#888888", vol: 0.045,
        incomeBase: 7500, growthRate: 0.31, upgradeCost: 135000,
        empresas: [
            {n:"BHP", p:65.0}, {n:"Rio Tinto", p:65.0}, {n:"Vale", p:12.0}, {n:"Glencore", p:6.0},
            {n:"Anglo American", p:20.0}, {n:"Freeport", p:45.0}, {n:"Newmont", p:42.0}, {n:"Barrick", p:18.0},
            {n:"Teck", p:48.0}, {n:"Gold Fields", p:16.0}, {n:"Sibanye", p:5.0}, {n:"Harmony Gold", p:8.0},
            {n:"Kinross", p:10.0}, {n:"Polyus", p:18.0}, {n:"Alcoa", p:35.0}, {n:"Vedanta", p:18.0},
            {n:"MMG", p:3.0}, {n:"First Quantum", p:14.0}, {n:"Zijin", p:8.0}, {n:"Antofagasta", p:14.0},
            {n:"Southern Copper", p:105.0}, {n:"Lundin Mining", p:12.0}, {n:"Yamana Gold", p:6.0}, {n:"Pan American Silver", p:22.0}, {n:"Lithium Americas", p:4.0}, {n:"Agnico Eagle", p:85.0}, {n:"Cameco", p:48.0}, {n:"Livent", p:3.0}, {n:"MP Materials", p:18.0}, {n:"Wheaton Precious Metals", p:58.0}
        ]
    },
    "Real Estate": {lvl: 28, color: "#8B4513", vol: 0.032,
        incomeBase: 7750, growthRate: 0.32, upgradeCost: 140000,
        empresas: [
            {n:"Zillow", p:45.0}, {n:"Redfin", p:8.0}, {n:"CoStar", p:78.0}, {n:"Realty Income", p:55.0},
            {n:"Simon Property", p:160.0}, {n:"Prologis", p:125.0}, {n:"Equinix", p:800.0}, {n:"Digital Realty", p:155.0},
            {n:"AvalonBay", p:195.0}, {n:"Essex Property", p:245.0}, {n:"Welltower", p:105.0}, {n:"Ventas", p:55.0},
            {n:"Boston Properties", p:65.0}, {n:"Vornado", p:28.0}, {n:"SL Green", p:55.0}, {n:"Equity Residential", p:65.0},
            {n:"Invitation Homes", p:35.0}, {n:"Sun Communities", p:155.0}, {n:"Mid-America", p:135.0}, {n:"Camden Property", p:115.0},
            {n:"UDR Inc", p:42.0}, {n:"Equity Lifestyle", p:65.0}, {n:"Newmark", p:8.0}, {n:"CBRE Group", p:95.0}, {n:"JLL", p:210.0}, {n:"Procore", p:68.0}, {n:"Land Securities", p:7.0}, {n:"British Land", p:4.0}, {n:"Hines", p:22.0}, {n:"Brookfield Properties", p:35.0}
        ]
    },
    "Retail": {lvl: 29, color: "#ffcc00", vol: 0.028,
        incomeBase: 8000, growthRate: 0.33, upgradeCost: 145000,
        empresas: [
            {n:"Amazon", p:180.0}, {n:"Walmart", p:95.0}, {n:"Target", p:145.0}, {n:"Costco", p:870.0},
            {n:"eBay", p:45.0}, {n:"Alibaba", p:85.0}, {n:"JD.com", p:35.0}, {n:"Rakuten", p:7.0},
            {n:"Mercado Libre", p:1900.0}, {n:"Shopify", p:70.0}, {n:"Best Buy", p:90.0}, {n:"Macy's", p:18.0},
            {n:"Nordstrom", p:22.0}, {n:"Kohl's", p:25.0}, {n:"Zara", p:45.0}, {n:"H&M", p:16.0},
            {n:"Uniqlo", p:45.0}, {n:"Sephora", p:850.0}, {n:"IKEA", p:25.0}, {n:"Decathlon", p:15.0},
            {n:"Home Depot", p:365.0}, {n:"Lowe's", p:265.0}, {n:"Lululemon", p:315.0}, {n:"Dollar General", p:32.0}, {n:"Carrefour", p:16.0}, {n:"Ahold Delhaize", p:28.0}, {n:"Tesco", p:4.0}, {n:"Sainsbury's", p:3.0}, {n:"Kroger", p:58.0}, {n:"Lidl", p:22.0}
        ]
    },
    "IA": {lvl: 30, color: "#00ffff", vol: 0.08,
        incomeBase: 8250, growthRate: 0.34, upgradeCost: 150000,
        empresas: [
            {n:"OpenAI", p:150.0}, {n:"DeepMind", p:140.0}, {n:"Anthropic", p:120.0}, {n:"AI21 Labs", p:40.0},
            {n:"Brain Corp", p:8.0}, {n:"Databricks", p:180.0}, {n:"Neuralink", p:25.0}, {n:"SenseTime", p:1.5},
            {n:"Scale AI", p:50.0}, {n:"C3.ai", p:30.0}, {n:"Cognizant", p:70.0}, {n:"Boston Dynamics", p:55.0},
            {n:"Synthesia", p:12.0}, {n:"Graphcore", p:3.0}, {n:"Hugging Face", p:45.0}, {n:"Jasper AI", p:5.0},
            {n:"DataRobot", p:8.0}, {n:"Shield AI", p:15.0}, {n:"Cohere", p:35.0}, {n:"Stability AI", p:6.0},
            {n:"Runway ML", p:18.0}, {n:"Midjourney", p:25.0}, {n:"Perplexity", p:8.0}, {n:"Character.AI", p:12.0}, {n:"Mistral AI", p:35.0}, {n:"xAI", p:95.0}, {n:"Aleph Alpha", p:28.0}, {n:"H2O.ai", p:18.0}, {n:"Vicarious", p:12.0}, {n:"SambaNova", p:42.0}
        ]
    }
};
const EMPRESAS_REPETIDAS_REEMPLAZADAS = new Set();
const nombresEmpresasUsados = new Set();
Object.entries(CATEGORIAS).forEach(([sector, datos]) => {
    datos.empresas.forEach(empresa => {
        const nombreOriginal = empresa.n;
        if (!nombresEmpresasUsados.has(nombreOriginal)) {
            nombresEmpresasUsados.add(nombreOriginal);
            return;
        }
        let indice = 2;
        let nombreNuevo = `${nombreOriginal} ${sector}`;
        while (nombresEmpresasUsados.has(nombreNuevo)) {
            indice += 1;
            nombreNuevo = `${nombreOriginal} ${sector} ${indice}`;
        }
        empresa.n = nombreNuevo;
        EMPRESAS_REPETIDAS_REEMPLAZADAS.add(`${nombreOriginal} -> ${nombreNuevo}`);
        nombresEmpresasUsados.add(nombreNuevo);
    });
});

const bancosDefault = [
    { nombre: "Davivienda", ahorro: 12500000, corriente: 3200000, tarjeta: { usado: 1320000, tasa: 0.035, bloqueada: false } },
    { nombre: "BBVA", ahorro: 15200000, corriente: 4600000, tarjeta: { usado: 1750000, tasa: 0.032, bloqueada: false } },
    { nombre: "Nu Bank", ahorro: 5200000, corriente: 1100000, tarjeta: { usado: 950000, tasa: 0.04, bloqueada: false } },
    { nombre: "Banco de Bogotá", ahorro: 18000000, corriente: 4200000, tarjeta: { usado: 1650000, tasa: 0.034, bloqueada: false } },
    { nombre: "Santander", ahorro: 14000000, corriente: 3600000, tarjeta: { usado: 1250000, tasa: 0.033, bloqueada: false } },
    { nombre: "Itaú", ahorro: 17000000, corriente: 4000000, tarjeta: { usado: 1450000, tasa: 0.035, bloqueada: false } },
    { nombre: "Scotiabank", ahorro: 11200000, corriente: 2900000, tarjeta: { usado: 980000, tasa: 0.036, bloqueada: false } },
    { nombre: "HSBC", ahorro: 13500000, corriente: 3100000, tarjeta: { usado: 1100000, tasa: 0.034, bloqueada: false } },
    { nombre: "Citibank", ahorro: 12500000, corriente: 2800000, tarjeta: { usado: 1020000, tasa: 0.035, bloqueada: false } },
    { nombre: "Banorte", ahorro: 10800000, corriente: 2600000, tarjeta: { usado: 890000, tasa: 0.037, bloqueada: false } },
    { nombre: "CaixaBank", ahorro: 15500000, corriente: 3300000, tarjeta: { usado: 1190000, tasa: 0.033, bloqueada: false } },
    { nombre: "ING", ahorro: 9800000, corriente: 2400000, tarjeta: { usado: 780000, tasa: 0.038, bloqueada: false } },
    { nombre: "Revolut", ahorro: 6400000, corriente: 1600000, tarjeta: { usado: 520000, tasa: 0.042, bloqueada: false } },
    { nombre: "N26", ahorro: 7000000, corriente: 1800000, tarjeta: { usado: 620000, tasa: 0.041, bloqueada: false } },
    { nombre: "Monzo", ahorro: 5600000, corriente: 1500000, tarjeta: { usado: 480000, tasa: 0.043, bloqueada: false } },
    { nombre: "Banco Pichincha", ahorro: 8700000, corriente: 2100000, tarjeta: { usado: 700000, tasa: 0.036, bloqueada: false } },
    { nombre: "Banco Falabella", ahorro: 9800000, corriente: 2400000, tarjeta: { usado: 830000, tasa: 0.035, bloqueada: false } },
    { nombre: "Banco Azteca", ahorro: 9200000, corriente: 2300000, tarjeta: { usado: 780000, tasa: 0.04, bloqueada: false } },
    { nombre: "Kueski Bank", ahorro: 8200000, corriente: 2000000, tarjeta: { usado: 690000, tasa: 0.041, bloqueada: false } }
];

const CREDIT_BANKS = [
    { id: 'jpmorgan', nombre: 'JPMorgan Chase', prestigio: 5, riesgo: 'Bajo', velocidad: 'Media', tasa: 0.065, maximo: 2200000, plazo: '24-60 meses', comision: 2.1, reputacion: 90, scoreMin: 730, especialidad: 'Grandes inversiones', aprobacion: 72, color: '#7aa2ff', descripcion: 'Banco de elite con enfoque en grandes patrimonios.', beneficio: 'Límites elevadísimos para jugadores con patrimonio premium.', tipo: 'premium', icono: '🏛️' },
    { id: 'bankofamerica', nombre: 'Bank of America', prestigio: 5, riesgo: 'Medio', velocidad: 'Media', tasa: 0.074, maximo: 1800000, plazo: '18-48 meses', comision: 2.6, reputacion: 84, scoreMin: 700, especialidad: 'Diversificación', aprobacion: 69, color: '#7be0d8', descripcion: 'Estructuras estables y perfiles equilibrados.', beneficio: 'Bonificaciones por diversificación y salud financiera.', tipo: 'conservador', icono: '🏦' },
    { id: 'wellsfargo', nombre: 'Wells Fargo', prestigio: 4, riesgo: 'Medio', velocidad: 'Lenta', tasa: 0.071, maximo: 1600000, plazo: '12-42 meses', comision: 2.9, reputacion: 78, scoreMin: 680, especialidad: 'Crédito responsable', aprobacion: 66, color: '#7dd3fc', descripcion: 'Prefiere perfiles sólidos y historial limpio.', beneficio: 'Condiciones muy competitivas si mantienes deuda baja.', tipo: 'conservador', icono: '💼' },
    { id: 'citibank', nombre: 'Citibank', prestigio: 4, riesgo: 'Medio', velocidad: 'Media', tasa: 0.073, maximo: 1700000, plazo: '12-36 meses', comision: 2.5, reputacion: 80, scoreMin: 690, especialidad: 'Cartera internacional', aprobacion: 67, color: '#6ee7b7', descripcion: 'Apertura flexible para conectividad global.', beneficio: 'Descuentos para jugadores activos en varios sectores.', tipo: 'empresarial', icono: '🌐' },
    { id: 'goldman', nombre: 'Goldman Sachs', prestigio: 5, riesgo: 'Bajo', velocidad: 'Lenta', tasa: 0.068, maximo: 2500000, plazo: '24-72 meses', comision: 3.1, reputacion: 95, scoreMin: 760, especialidad: 'Capital institucional', aprobacion: 75, color: '#e0abff', descripcion: 'Banco selectivo para proyectos de escala.', beneficio: 'Créditos premium para jugadores con alto patrimonio.', tipo: 'premium', icono: '💠' },
    { id: 'morganstanley', nombre: 'Morgan Stanley', prestigio: 5, riesgo: 'Medio', velocidad: 'Media', tasa: 0.069, maximo: 2100000, plazo: '18-60 meses', comision: 2.8, reputacion: 92, scoreMin: 740, especialidad: 'Estrategia patrimonial', aprobacion: 73, color: '#fbbf24', descripcion: 'Focalizado en crecimiento sostenido y análisis profundo.', beneficio: 'Mayor capacidad para propuestas con visión de largo plazo.', tipo: 'premium', icono: '📊' },
    { id: 'hsbc', nombre: 'HSBC', prestigio: 4, riesgo: 'Medio', velocidad: 'Media', tasa: 0.072, maximo: 1750000, plazo: '12-48 meses', comision: 2.4, reputacion: 82, scoreMin: 700, especialidad: 'Expansión internacional', aprobacion: 68, color: '#38bdf8', descripcion: 'Buen balance entre alcance y velocidad.', beneficio: 'Apoyo para expansión entre sectores y mercados.', tipo: 'empresarial', icono: '🌍' },
    { id: 'barclays', nombre: 'Barclays', prestigio: 4, riesgo: 'Medio', velocidad: 'Rápida', tasa: 0.076, maximo: 1500000, plazo: '12-36 meses', comision: 2.7, reputacion: 76, scoreMin: 680, especialidad: 'Financiamiento ágil', aprobacion: 65, color: '#a78bfa', descripcion: 'Prioriza decisiones rápidas con poco papeleo.', beneficio: 'Descuentos por historial sólido y respuesta temprana.', tipo: 'rápido', icono: '⚡' },
    { id: 'santander', nombre: 'Santander', prestigio: 4, riesgo: 'Medio', velocidad: 'Media', tasa: 0.075, maximo: 1650000, plazo: '10-42 meses', comision: 2.9, reputacion: 79, scoreMin: 680, especialidad: 'Reactivación', aprobacion: 70, color: '#22c55e', descripcion: 'Muy útil para perfiles con historial y credibilidad.', beneficio: 'Escalas competitivas cuando el jugador demuestra continuidad.', tipo: 'empresarial', icono: '🟢' },
    { id: 'bbva', nombre: 'BBVA', prestigio: 4, riesgo: 'Medio', velocidad: 'Rápida', tasa: 0.07, maximo: 1700000, plazo: '12-60 meses', comision: 2.3, reputacion: 81, scoreMin: 695, especialidad: 'Innovación y expansión', aprobacion: 71, color: '#2dd4bf', descripcion: 'Muy preparado para movimientos de crecimiento competitivos.', beneficio: 'Tasas ajustadas para proyectos con alto potencial.', tipo: 'empresarial', icono: '🔷' },
    { id: 'bnpparibas', nombre: 'BNP Paribas', prestigio: 4, riesgo: 'Bajo', velocidad: 'Lenta', tasa: 0.067, maximo: 1900000, plazo: '18-54 meses', comision: 2.8, reputacion: 86, scoreMin: 715, especialidad: 'Grandes operaciones', aprobacion: 70, color: '#f97316', descripcion: 'Estructura elegante y selectiva para activos corporativos.', beneficio: 'Condiciones muy favorables si tu reputación es sólida.', tipo: 'premium', icono: '🧭' },
    { id: 'deutsche', nombre: 'Deutsche Bank', prestigio: 4, riesgo: 'Bajo', velocidad: 'Lenta', tasa: 0.066, maximo: 2000000, plazo: '24-60 meses', comision: 2.6, reputacion: 88, scoreMin: 720, especialidad: 'Inversiones de largo plazo', aprobacion: 74, color: '#93c5fd', descripcion: 'Banco conservador con visión institucional.', beneficio: 'Mínimo riesgo y buen apoyo financiero a largo plazo.', tipo: 'conservador', icono: '🛡️' },
    { id: 'ubs', nombre: 'UBS', prestigio: 5, riesgo: 'Bajo', velocidad: 'Lenta', tasa: 0.064, maximo: 2400000, plazo: '24-72 meses', comision: 2.9, reputacion: 94, scoreMin: 750, especialidad: 'Patrimonio privado', aprobacion: 76, color: '#f9a8d4', descripcion: 'Prestigio extremo y aprobación exigente.', beneficio: 'Límites enormes para jugadores con perfil premium.', tipo: 'premium', icono: '💎' },
    { id: 'creditsuisse', nombre: 'Credit Suisse', prestigio: 4, riesgo: 'Medio', velocidad: 'Media', tasa: 0.073, maximo: 1800000, plazo: '18-48 meses', comision: 2.7, reputacion: 83, scoreMin: 710, especialidad: 'Balance patrimonial', aprobacion: 69, color: '#a5f3fc', descripcion: 'Fuerte enfoque en solvencia y trayectoria.', beneficio: 'Calidad de riesgo sujeta a buen historial y patrimonio.', tipo: 'conservador', icono: '🧱' },
    { id: 'ing', nombre: 'ING', prestigio: 3, riesgo: 'Medio', velocidad: 'Muy rápida', tasa: 0.078, maximo: 1400000, plazo: '12-30 meses', comision: 3.2, reputacion: 72, scoreMin: 660, especialidad: 'Créditos rápidos', aprobacion: 80, color: '#a3e635', descripcion: 'Tecnológico, ágil y automizado.', beneficio: 'Aprobaciones veloces con procesos digitales fluidos.', tipo: 'tecnológico', icono: '⚙️' },
    { id: 'scotiabank', nombre: 'Scotiabank', prestigio: 3, riesgo: 'Medio', velocidad: 'Rápida', tasa: 0.077, maximo: 1500000, plazo: '12-36 meses', comision: 2.8, reputacion: 74, scoreMin: 670, especialidad: 'Oportunidades de mercado', aprobacion: 72, color: '#facc15', descripcion: 'Busca entrar temprano en sectores en movimiento.', beneficio: 'Descuentos temporales durante eventos de mercado.', tipo: 'oportunista', icono: '📈' },
    { id: 'itau', nombre: 'Itaú', prestigio: 4, riesgo: 'Medio', velocidad: 'Rápida', tasa: 0.074, maximo: 1550000, plazo: '12-42 meses', comision: 2.5, reputacion: 79, scoreMin: 690, especialidad: 'Expansión regional', aprobacion: 73, color: '#fb7185', descripcion: 'Explota movimientos de mercado con riesgos medidos.', beneficio: 'Mejores condiciones para crecimiento orgánico.', tipo: 'empresarial', icono: '🚀' },
    { id: 'bancodebogota', nombre: 'Banco de Bogotá', prestigio: 4, riesgo: 'Medio', velocidad: 'Muy rápida', tasa: 0.079, maximo: 1450000, plazo: '9-30 meses', comision: 2.2, reputacion: 77, scoreMin: 665, especialidad: 'Expansión empresarial', aprobacion: 78, color: '#34d399', descripcion: 'Apoya operaciones rápidas y pequeñas escalas.', beneficio: 'Descuentos en créditos de expansión para proyectos robustos.', tipo: 'empresarial', icono: '🏢' },
    { id: 'bancolombia', nombre: 'Bancolombia', prestigio: 4, riesgo: 'Medio', velocidad: 'Muy rápida', tasa: 0.072, maximo: 1650000, plazo: '12-48 meses', comision: 2.3, reputacion: 80, scoreMin: 690, especialidad: 'Expansión empresarial', aprobacion: 82, color: '#60a5fa', descripcion: 'Banco muy dinámico y orientado a crecimiento.', beneficio: 'Descuentos para crédito de expansión y proyectos agresivos.', tipo: 'empresarial', icono: '✨' },
    { id: 'davivienda', nombre: 'Davivienda', prestigio: 4, riesgo: 'Medio', velocidad: 'Muy rápida', tasa: 0.075, maximo: 1500000, plazo: '6-30 meses', comision: 2.1, reputacion: 76, scoreMin: 660, especialidad: 'Créditos de oportunidad', aprobacion: 84, color: '#f59e0b', descripcion: 'Dominio en decisiones veloz y contexto de mercado.', beneficio: 'Respuestas rápidas durante eventos del mercado y oportunidades.' , tipo: 'oportunista', icono: '⚡' },
    { id: 'aurora', nombre: 'Banco Aurora', prestigio: 4, riesgo: 'Bajo', velocidad: 'Media', tasa: 0.069, maximo: 1750000, plazo: '18-54 meses', comision: 2.0, reputacion: 86, scoreMin: 710, especialidad: 'Crecimiento sostenible', aprobacion: 74, color: '#f472b6', descripcion: 'Premia proyectos consistentes y bien planificados.', beneficio: 'Bonificaciones para inversiones con riesgo controlado.', tipo: 'conservador', icono: '🌅' },
    { id: 'atlas', nombre: 'Atlas Financiero', prestigio: 5, riesgo: 'Medio', velocidad: 'Media', tasa: 0.067, maximo: 2300000, plazo: '24-72 meses', comision: 2.9, reputacion: 91, scoreMin: 735, especialidad: 'Capital corporativo', aprobacion: 71, color: '#818cf8', descripcion: 'Especialista en operaciones grandes y diversificadas.', beneficio: 'Límites altos para imperios con visión de largo plazo.', tipo: 'premium', icono: '🗺️' },
    { id: 'nexo', nombre: 'Nexo Capital', prestigio: 3, riesgo: 'Medio', velocidad: 'Muy rápida', tasa: 0.081, maximo: 1250000, plazo: '6-24 meses', comision: 1.9, reputacion: 70, scoreMin: 640, especialidad: 'Liquidez inmediata', aprobacion: 86, color: '#fb7185', descripcion: 'Responde rápido cuando aparece una oportunidad.', beneficio: 'Aprobación veloz con comisión inicial reducida.', tipo: 'rápido', icono: '🔗' },
    { id: 'vertex', nombre: 'Vertex Bank', prestigio: 4, riesgo: 'Medio', velocidad: 'Rápida', tasa: 0.073, maximo: 1850000, plazo: '12-48 meses', comision: 2.4, reputacion: 81, scoreMin: 685, especialidad: 'Tecnología', aprobacion: 75, color: '#22d3ee', descripcion: 'Financia investigación, software y negocios digitales.', beneficio: 'Mejores condiciones para sectores tecnológicos.', tipo: 'tecnológico', icono: '🔺' },
    { id: 'andino', nombre: 'Banco Andino', prestigio: 4, riesgo: 'Bajo', velocidad: 'Lenta', tasa: 0.071, maximo: 1950000, plazo: '24-60 meses', comision: 2.2, reputacion: 88, scoreMin: 720, especialidad: 'Patrimonio estable', aprobacion: 70, color: '#34d399', descripcion: 'Busca solvencia y crecimiento sin sobresaltos.', beneficio: 'Tasas estables para jugadores disciplinados.', tipo: 'conservador', icono: '⛰️' },
    { id: 'horizonte', nombre: 'Horizonte Bank', prestigio: 3, riesgo: 'Medio', velocidad: 'Media', tasa: 0.076, maximo: 1450000, plazo: '12-36 meses', comision: 2.0, reputacion: 75, scoreMin: 665, especialidad: 'Nuevos negocios', aprobacion: 79, color: '#fbbf24', descripcion: 'Abierto a empresas jóvenes con potencial.', beneficio: 'Apoyo inicial para expandir operaciones.', tipo: 'empresarial', icono: '🌄' },
    { id: 'lumen', nombre: 'Lumen Crédito', prestigio: 3, riesgo: 'Alto', velocidad: 'Muy rápida', tasa: 0.089, maximo: 1100000, plazo: '3-18 meses', comision: 1.6, reputacion: 67, scoreMin: 610, especialidad: 'Oportunidades urgentes', aprobacion: 88, color: '#f97316', descripcion: 'Asume más riesgo para ofrecer respuestas inmediatas.', beneficio: 'Alta aprobación con coste financiero superior.', tipo: 'oportunista', icono: '💡' },
    { id: 'origen', nombre: 'Origen Financiero', prestigio: 4, riesgo: 'Medio', velocidad: 'Media', tasa: 0.074, maximo: 1600000, plazo: '12-42 meses', comision: 2.3, reputacion: 79, scoreMin: 675, especialidad: 'Reestructuración', aprobacion: 77, color: '#a78bfa', descripcion: 'Ayuda a ordenar deudas y recuperar capacidad.', beneficio: 'Condiciones flexibles para refinanciar proyectos.', tipo: 'refinanciacion', icono: '♻️' },
    { id: 'faro', nombre: 'Faro Empresarial', prestigio: 5, riesgo: 'Bajo', velocidad: 'Lenta', tasa: 0.063, maximo: 2600000, plazo: '24-84 meses', comision: 3.0, reputacion: 96, scoreMin: 770, especialidad: 'Grandes patrimonios', aprobacion: 68, color: '#facc15', descripcion: 'El banco más exigente para operaciones de escala.', beneficio: 'La tasa más competitiva para perfiles legendarios.', tipo: 'premium', icono: '🔦' },
    { id: 'pulso', nombre: 'Pulso Mercado', prestigio: 3, riesgo: 'Medio', velocidad: 'Rápida', tasa: 0.078, maximo: 1350000, plazo: '9-30 meses', comision: 2.1, reputacion: 73, scoreMin: 650, especialidad: 'Mercados dinámicos', aprobacion: 83, color: '#60a5fa', descripcion: 'Ajusta sus ofertas según los eventos del mercado.', beneficio: 'Descuentos temporales durante ciclos favorables.', tipo: 'oportunista', icono: '💓' }
];

const CREDIT_TYPES = [
    { id: 'puente', nombre: 'Crédito puente', descripcion: 'Dinero rápido para necesidades inmediatas.', factor: 1.08, riesgo: 1.15, plazoBase: 30, icono: '🚚' },
    { id: 'expansion', nombre: 'Crédito de expansión', descripcion: 'Aumenta temporalmente la capacidad de generar ingresos.', factor: 1.12, riesgo: 1.1, plazoBase: 60, icono: '📈' },
    { id: 'adquisicion', nombre: 'Crédito de adquisición', descripcion: 'Permite comprar empresas o activos importantes.', factor: 1.18, riesgo: 1.25, plazoBase: 90, icono: '🏢' },
    { id: 'refinanciamiento', nombre: 'Refinanciación', descripcion: 'Combina varias deudas en una sola.', factor: 0.98, riesgo: 0.94, plazoBase: 120, icono: '🔄' },
    { id: 'sindicado', nombre: 'Crédito sindicado', descripcion: 'Grandes cantidades con varias entidades.', factor: 1.3, riesgo: 1.35, plazoBase: 180, icono: '🤝' },
    { id: 'oportunidad', nombre: 'Crédito de oportunidad', descripcion: 'Disponible sólo durante condiciones especiales del mercado.', factor: 1.16, riesgo: 1.28, plazoBase: 45, icono: '🎯' },
    { id: 'reputacion', nombre: 'Crédito por reputación', descripcion: 'Mejores condiciones cuanto mayor sea la reputación.', factor: 0.92, riesgo: 0.9, plazoBase: 90, icono: '⭐' },
    { id: 'investigacion', nombre: 'Crédito de investigación', descripcion: 'Permite acelerar investigaciones y habilidades.', factor: 1.06, riesgo: 0.96, plazoBase: 60, icono: '🧪' },
    { id: 'activos', nombre: 'Crédito contra activos', descripcion: 'Financiación respaldada por activos ficticios.', factor: 1.1, riesgo: 1.05, plazoBase: 90, icono: '🏦' },
    { id: 'cooperativo', nombre: 'Crédito cooperativo', descripcion: 'Dos jugadores participan con obligaciones compartidas.', factor: 1.14, riesgo: 1.18, plazoBase: 120, icono: '👥' }
];

const CREDIT_EVENTS = [
    { id: 'crisis-bancaria', nombre: '📉 Crisis bancaria', descripcion: 'Algunos bancos dejan de aceptar solicitudes.', impact: { bancos: ['jpmorgan','goldman','ubs'], active: false }, duration: 180000 },
    { id: 'mercado-crecimiento', nombre: '📈 Mercado en crecimiento', descripcion: 'Los créditos para expansión reciben mejores condiciones.', impact: { type: 'expansion', bonus: 0.12 }, duration: 240000 },
    { id: 'tasa-preferencial', nombre: '⚡ Tasa preferencial', descripcion: 'Las tasas disminuyen temporalmente.', impact: { rateBonus: -0.012 }, duration: 180000 },
    { id: 'oferta-temporada', nombre: '🏦 Oferta de temporada', descripcion: 'Se eliminan determinadas comisiones.', impact: { feeBonus: -0.7 }, duration: 210000 },
    { id: 'auditoria-financiera', nombre: '🔎 Auditoría financiera', descripcion: 'El banco aumenta requisitos temporales.', impact: { scoreBoost: 25 }, duration: 200000 },
    { id: 'rescate-empresarial', nombre: '🚨 Rescate empresarial', descripcion: 'Se desbloquean créditos de emergencia.', impact: { emergency: true }, duration: 300000 },
    { id: 'bono-historial', nombre: '⭐ Bonificación por historial', descripcion: 'Los jugadores con buen historial reciben mejores ofertas.', impact: { repBonus: 6 }, duration: 240000 }
];

const CREDIT_OFFERS = [
    '🔥 Oferta exclusiva: debido a tu excelente historial de pagos, este banco te ofrece una tasa especial durante 60 segundos.',
    '🎯 Crédito ideal para tu perfil: tu patrimonio y reputación te permiten afrontar un monto superior sin exponer demasiado riesgo.',
    '📊 Tu tasa mejora por dedicación: con un score saludable, varios bancos han ajustado su oferta para ti.',
    '⚡ Oportunidad limitada: este banco está reduciendo sus comisiones por un plazo corto de tiempo.'
];

const SECTION_CONFIG = [
    { id: 'panel', label: '🏠 Panel General' },
    { id: 'invertir', label: '💰 Invertir' },
    { id: 'portafolio', label: '📊 Portafolio' },
    { id: 'mercado', label: '📈 Mercado' },
    { id: 'noticias', label: '📰 Noticias' },
    { id: 'aprendizaje', label: '🧠 Aprender' },
    { id: 'bancos', label: '🏦 Bancos' },
    { id: 'logros', label: '🏆 Logros' },
    { id: 'asesores', label: '🎩 Asesores' },
    { id: 'habilidades', label: '⚡ Habilidades' },
    { id: 'reputacion', label: '⭐ Reputacion' },
    { id: 'desafios', label: '🎯 Desafios' },
    { id: 'ranking', label: '🏅 Ranking' },
    { id: 'amigos', label: '👥 Amigos' },
    { id: 'notificaciones', label: '🔔 Notificaciones' },
    { id: 'qr', label: 'ℹ️ Acerca de' }
];

const ASESORES_DEF = [
    { id: "novato1", nombre: "Carlos M.", emoji: "🧑‍💼", especialidad: "Principiante", desc: "Asesor basico para nuevos inversores. Buenas predicciones a bajo costo.", salarioBase: 50, precisionBase: 35, cooldown: 35, color: "#888888", maxNivel: 5, nivelReq: 1 },
    { id: "novato2", nombre: "Ana R.", emoji: "👩‍💼", especialidad: "Principiante", desc: "Analista junior. Aprende rapido pero aun tiene mucho por demostrar.", salarioBase: 60, precisionBase: 38, cooldown: 30, color: "#aaaaaa", maxNivel: 5, nivelReq: 1 },
    { id: "valor1", nombre: "Roberto V.", emoji: "📊", especialidad: "Valor", desc: "Experto en encontrar empresas subvaluadas. Predicciones solidas a largo plazo.", salarioBase: 120, precisionBase: 48, cooldown: 45, color: "#ffd000", maxNivel: 5, nivelReq: 2 },
    { id: "tecnico1", nombre: "Diana K.", emoji: "📈", especialidad: "Tecnico", desc: "Analista de graficos y patrones. Predice tendencias de corto plazo.", salarioBase: 150, precisionBase: 50, cooldown: 25, color: "#00d4ff", maxNivel: 5, nivelReq: 2 },
    { id: "cripto1", nombre: "Nakamoto S.", emoji: "₿", especialidad: "Cripto", desc: "Especialista en criptomonedas. Predice pumps y dumps del mercado crypto.", salarioBase: 200, precisionBase: 42, cooldown: 20, color: "#00ffaa", maxNivel: 5, nivelReq: 3 },
    { id: "macro1", nombre: "Elena M.", emoji: "🌍", especialidad: "Macro", desc: "Economista global. Predice eventos que afectan multiples sectores.", salarioBase: 250, precisionBase: 55, cooldown: 60, color: "#ff8800", maxNivel: 5, nivelReq: 3 },
    { id: "daytrader", nombre: "Alex T.", emoji: "⚡", especialidad: "Day Trading", desc: "Trader de alta frecuencia. Muchas predicciones rapidas.", salarioBase: 350, precisionBase: 45, cooldown: 12, color: "#ff44aa", maxNivel: 5, nivelReq: 4 },
    { id: "dividend", nombre: "Margaret D.", emoji: "💰", especialidad: "Dividendos", desc: "Especialista en empresas de dividendos. Predice pagos y estabilidad.", salarioBase: 280, precisionBase: 58, cooldown: 50, color: "#00ff88", maxNivel: 5, nivelReq: 4 },
    { id: "insider1", nombre: "Viktor S.", emoji: "🕵️", especialidad: "Insider", desc: "Tiene 'contactos'. Predicciones muy precisas pero caro de mantener.", salarioBase: 500, precisionBase: 68, cooldown: 40, color: "#ff4444", maxNivel: 5, nivelReq: 5 },
    { id: "quant1", nombre: "Zhang W.", emoji: "🤖", especialidad: "Quant", desc: "Algoritmo humano. Usa modelos matematicos para predecir movimientos.", salarioBase: 450, precisionBase: 62, cooldown: 30, color: "#aa00ff", maxNivel: 5, nivelReq: 5 },
    { id: "energia1", nombre: "Sofia G.", emoji: "⚡", especialidad: "Energia", desc: "Experta en sectores energeticos tradicionales y renovables.", salarioBase: 380, precisionBase: 60, cooldown: 35, color: "#ff8800", maxNivel: 5, nivelReq: 6 },
    { id: "salud1", nombre: "Dr. James H.", emoji: "🧬", especialidad: "Salud", desc: "Doctor en biotecnologia. Predice avances y fracasos farmaceuticos.", salarioBase: 420, precisionBase: 63, cooldown: 40, color: "#00cfff", maxNivel: 5, nivelReq: 6 },
    { id: "ia1", nombre: "Aiden X.", emoji: "🧠", especialidad: "IA", desc: "Investigador de IA. Predice el futuro de la inteligencia artificial.", salarioBase: 800, precisionBase: 58, cooldown: 25, color: "#00ffff", maxNivel: 5, nivelReq: 7 },
    { id: "oro1", nombre: "Isabella G.", emoji: "🏆", especialidad: "Oro", desc: "Especialista en commodities y metales preciosos. Muy precisa.", salarioBase: 600, precisionBase: 65, cooldown: 45, color: "#ffd700", maxNivel: 5, nivelReq: 7 },
    { id: "legend", nombre: "Arthur P.", emoji: "👑", especialidad: "Legendario", desc: "El guru financiero definitivo. Precision casi sobrenatural.", salarioBase: 1500, precisionBase: 78, cooldown: 35, color: "#ff44aa", maxNivel: 5, nivelReq: 8 },
    { id: "oracle", nombre: "Morgan F.", emoji: "🔮", especialidad: "Oraculo", desc: "Predice crisis antes de que ocurran. El asesor mas caro pero infalible.", salarioBase: 2500, precisionBase: 85, cooldown: 50, color: "#00d4ff", maxNivel: 5, nivelReq: 10 },
    { id: "angel", nombre: "Gabriel R.", emoji: "😇", especialidad: "Angel", desc: "Angel inversionista. Brinda consejos de diversificacion y proteccion de capital.", salarioBase: 1200, precisionBase: 72, cooldown: 40, color: "#ffd700", maxNivel: 5, nivelReq: 9 },
    { id: "vanguard", nombre: "Victoria N.", emoji: "🛡️", especialidad: "Defensivo", desc: "Especialista en inversiones defensivas y proteccion ante caidas del mercado.", salarioBase: 950, precisionBase: 70, cooldown: 35, color: "#00ff88", maxNivel: 5, nivelReq: 8 }
];

const HABILIDADES_DEF = [
    { id: "h1", nombre: "Ojo de Aguila", emoji: "🦅", desc: "+8% precision en predicciones de asesores por nivel", costoBase: 1, max: 10 },
    { id: "h2", nombre: "Mano Rapida", emoji: "⚡", desc: "-12% cooldown entre predicciones por nivel", costoBase: 1, max: 10 },
    { id: "h3", nombre: "Negociador", emoji: "🤝", desc: "-5% en salarios de asesores por nivel", costoBase: 1, max: 10 },
    { id: "h4", nombre: "Inversor Instintivo", emoji: "🎯", desc: "+2% rendimiento en ventas por nivel", costoBase: 1, max: 10 },
    { id: "h5", nombre: "Resistencia", emoji: "🛡️", desc: "-8% impacto negativo de eventos crisis por nivel", costoBase: 1, max: 10 },
    { id: "h6", nombre: "Magnetismo", emoji: "🧲", desc: "+4% dividendos recibidos por nivel", costoBase: 1, max: 10 },
    { id: "h7", nombre: "Vision Futura", emoji: "🔭", desc: "Predicciones duran 3s mas por nivel", costoBase: 2, max: 10 },
    { id: "h8", nombre: "Ahorrador", emoji: "💰", desc: "+0.5% interes pasivo sobre capital/min por nivel", costoBase: 2, max: 10 },
    { id: "h9", nombre: "Diversificador", emoji: "📊", desc: "+1% ganancia por empresa diferente en portafolio (max 10%)", costoBase: 2, max: 10 },
    { id: "h10", nombre: "Prestigio", emoji: "👑", desc: "+3 reputacion por nivel al completar misiones", costoBase: 2, max: 10 },
    { id: "h11", nombre: "Analista Tecnico", emoji: "📈", desc: "Muestra tendencia de precio en tienda", costoBase: 1, max: 10 },
    { id: "h12", nombre: "Emperador", emoji: "🏛️", desc: "+1 slot de asesor por nivel", costoBase: 3, max: 10 },
    { id: "h13", nombre: "Filantropo", emoji: "🎁", desc: "+5% recompensa en desafios diarios por nivel", costoBase: 2, max: 10 },
    { id: "h14", nombre: "Suerte Invertida", emoji: "🍀", desc: "+3% chance de prediccion acertada por nivel", costoBase: 2, max: 10 },
    { id: "h15", nombre: "Titanio", emoji: "🔩", desc: "-10% costo de mejoras de habilidades por nivel", costoBase: 3, max: 10 },
    { id: "h16", nombre: "Rapido y Furioso", emoji: "🏎️", desc: "+5% de ganancia al vender en menos de 60s de compra por nivel", costoBase: 2, max: 10 },
    { id: "h17", nombre: "Lobo de Wall St", emoji: "🐺", desc: "+2% ganancia en todas las operaciones de Finanzas por nivel", costoBase: 2, max: 10 },
    { id: "h18", nombre: "Eco Guerrero", emoji: "🌱", desc: "+3% ganancia en Energia renovable por nivel", costoBase: 2, max: 10 },
    { id: "h19", nombre: "Hacker Etico", emoji: "💻", desc: "+2% precision de asesores de Tecnologia/IA por nivel", costoBase: 2, max: 10 },
    { id: "h20", nombre: "Inmortal", emoji: "🦅", desc: "-15% perdidas totales en ventas negativas por nivel", costoBase: 3, max: 10 },
    { id: "h21", nombre: "Constructor", emoji: "🏗️", desc: "+3% ganancia en empresas de Real Estate y Construccion por nivel", costoBase: 2, max: 10 },
    { id: "h22", nombre: "Farmaceutico", emoji: "🧬", desc: "+4% ganancia en Salud y Biotecnologia por nivel", costoBase: 2, max: 10 },
    { id: "h23", nombre: "Cripto Dios", emoji: "₿", desc: "+5% ganancia en Criptomonedas y Fintech por nivel", costoBase: 3, max: 10 },
    { id: "h24", nombre: "Aero Rey", emoji: "✈️", desc: "+4% ganancia en Aeroespacial y Defensa por nivel", costoBase: 2, max: 10 },
    { id: "h25", nombre: "Maestro del Juego", emoji: "🎮", desc: "+4% ganancia en Gaming y Entretenimiento por nivel", costoBase: 2, max: 10 },
    { id: "h26", nombre: "Tasa Cero", emoji: "📉", desc: "-4% interes en prestamos por nivel", costoBase: 3, max: 10 },
    { id: "h27", nombre: "Rey del Retail", emoji: "🛒", desc: "+3% ganancia en Retail, E-Commerce y Moda por nivel", costoBase: 2, max: 10 },
    { id: "h28", nombre: "Iman de Capital", emoji: "🧲", desc: "+2% capital inicial extra al registrar (acumulativo)", costoBase: 3, max: 10 },
    { id: "h29", nombre: "Visor de Noticias", emoji: "📰", desc: "Las noticias positivas duran 2s mas por nivel", costoBase: 2, max: 10 },
    { id: "h30", nombre: "Multinacional", emoji: "🌍", desc: "+2% ganancia en todos los sectores por nivel", costoBase: 4, max: 10 }
];

const POOL_DESAFIOS = [
    { id: "d1", titulo: "Primer Compra", desc: "Compra al menos 1 accion de cualquier empresa.", tipo: "comprar", target: 1, recompensaXP: 50, recompensaPH: 1, recompensaRep: 2 },
    { id: "d2", titulo: "Inversor Moderado", desc: "Compra 10 o mas acciones en una sola transaccion.", tipo: "comprar_monto", target: 10, recompensaXP: 100, recompensaPH: 1, recompensaRep: 3 },
    { id: "d3", titulo: "Vendedor Principiante", desc: "Vende tu primera accion.", tipo: "vender", target: 1, recompensaXP: 75, recompensaPH: 1, recompensaRep: 2 },
    { id: "d4", titulo: "Ganancia Pequena", desc: "Gana $500 en una venta.", tipo: "ganancia_venta", target: 500, recompensaXP: 150, recompensaPH: 2, recompensaRep: 5 },
    { id: "d5", titulo: "Diversificador", desc: "Ten al menos 3 empresas diferentes en tu portafolio.", tipo: "diversificar", target: 3, recompensaXP: 200, recompensaPH: 2, recompensaRep: 4 },
    { id: "d6", titulo: "Contra las Cuerdas", desc: "Compra una accion cuando su tendencia sea negativa.", tipo: "comprar_baja", target: 1, recompensaXP: 100, recompensaPH: 1, recompensaRep: 3 },
    { id: "d7", titulo: "Ahorrador", desc: "Acumula $50,000 en capital disponible.", tipo: "capital", target: 50000, recompensaXP: 120, recompensaPH: 1, recompensaRep: 3 },
    { id: "d8", titulo: "Pagador", desc: "Paga al menos $1,000 de tu deuda.", tipo: "pagar_deuda", target: 1000, recompensaXP: 100, recompensaPH: 1, recompensaRep: 4 },
    { id: "d9", titulo: "Sube de Nivel", desc: "Alcanza el siguiente nivel de jugador.", tipo: "subir_nivel", target: 1, recompensaXP: 300, recompensaPH: 3, recompensaRep: 8 },
    { id: "d10", titulo: "Contrata Ayuda", desc: "Contrata tu primer asesor financiero.", tipo: "contratar", target: 1, recompensaXP: 150, recompensaPH: 2, recompensaRep: 5 },
    { id: "d11", titulo: "Acierto de Asesor", desc: "Un asesor acierta una prediccion.", tipo: "prediccion_acierto", target: 1, recompensaXP: 100, recompensaPH: 1, recompensaRep: 4 },
    { id: "d12", titulo: "Desbloquea Poder", desc: "Mejora una habilidad al siguiente nivel.", tipo: "mejorar_habilidad", target: 1, recompensaXP: 125, recompensaPH: 1, recompensaRep: 3 },
    { id: "d13", titulo: "Reputacion en Marcha", desc: "Completa una mision de reputacion con exito.", tipo: "mision_rep", target: 1, recompensaXP: 80, recompensaPH: 1, recompensaRep: 6 },
    { id: "d14", titulo: "Volumen Alto", desc: "Realiza 5 operaciones de compra/venta.", tipo: "operaciones", target: 5, recompensaXP: 180, recompensaPH: 2, recompensaRep: 5 },
    { id: "d15", titulo: "Sector Energia", desc: "Compra acciones del sector Energia.", tipo: "sector", target: "Energia", recompensaXP: 130, recompensaPH: 1, recompensaRep: 3 },
    { id: "d16", titulo: "Sin Deudas", desc: "Paga toda tu deuda pendiente.", tipo: "libre_deuda", target: 1, recompensaXP: 250, recompensaPH: 2, recompensaRep: 10 },
    { id: "d17", titulo: "Ganancia Grande", desc: "Gana $5,000 en una sola venta.", tipo: "ganancia_venta", target: 5000, recompensaXP: 400, recompensaPH: 3, recompensaRep: 10 },
    { id: "d18", titulo: "Magnate", desc: "Alcanza un patrimonio neto de $200,000.", tipo: "patrimonio", target: 200000, recompensaXP: 350, recompensaPH: 3, recompensaRep: 8 },
    { id: "d19", titulo: "Dividendos", desc: "Recibe dividendos por primera vez.", tipo: "dividendos", target: 1, recompensaXP: 90, recompensaPH: 1, recompensaRep: 3 },
    { id: "d20", titulo: "Prestamo Responsable", desc: "Solicita y paga un prestamo completo.", tipo: "prestamo_pagado", target: 1, recompensaXP: 200, recompensaPH: 2, recompensaRep: 7 },
    { id: "d21", titulo: "Especialista Cripto", desc: "Compra acciones de Criptomonedas.", tipo: "sector", target: "Criptomonedas", recompensaXP: 200, recompensaPH: 2, recompensaRep: 5 },
    { id: "d22", titulo: "Diversificador Pro", desc: "Ten acciones de 5 sectores diferentes.", tipo: "sectores_dif", target: 5, recompensaXP: 350, recompensaPH: 3, recompensaRep: 8 },
    { id: "d23", titulo: "Venta Perfecta", desc: "Vende con un rendimiento de +15% o mas.", tipo: "rendimiento", target: 15, recompensaXP: 300, recompensaPH: 2, recompensaRep: 8 },
    { id: "d24", titulo: "Millonario", desc: "Alcanza $1,000,000 de patrimonio neto.", tipo: "patrimonio", target: 1000000, recompensaXP: 1000, recompensaPH: 5, recompensaRep: 20 },
    { id: "d25", titulo: "Lector de Noticias", desc: "Se beneficia de 3 noticias positivas.", tipo: "noticias_beneficio", target: 3, recompensaXP: 150, recompensaPH: 1, recompensaRep: 4 }
];

const POOL_MISIONES_REP = [
    { id: "mr1", titulo: "Vende con Ganancia", desc: "Realiza una venta con beneficio positivo en los proximos 90 segundos.", tiempo: 90, exito: 5, fallo: -3, tipo: "vender_ganancia" },
    { id: "mr2", titulo: "Compra Inteligente", desc: "Compra acciones de una empresa con tendencia negativa en 60 segundos.", tiempo: 60, exito: 4, fallo: -2, tipo: "comprar_baja" },
    { id: "mr3", titulo: "Paga Deuda", desc: "Paga al menos $5,000 de deuda en los proximos 120 segundos.", tiempo: 120, exito: 8, fallo: -4, tipo: "pagar_deuda" },
    { id: "mr4", titulo: "Diversifica", desc: "Adquiere una empresa de un sector nuevo en 90 segundos.", tiempo: 90, exito: 5, fallo: -3, tipo: "nuevo_sector" },
    { id: "mr5", titulo: "Sin Riesgos", desc: "No compres acciones de Cripto ni IA durante 60 segundos.", tiempo: 60, exito: 3, fallo: -2, tipo: "no_riesgo" },
    { id: "mr6", titulo: "Contrata Talento", desc: "Contrata un nuevo asesor en los proximos 120 segundos.", tiempo: 120, exito: 6, fallo: -3, tipo: "contratar" },
    { id: "mr7", titulo: "Volumen Alto", desc: "Realiza 3 operaciones de compra en 60 segundos.", tiempo: 60, exito: 5, fallo: -3, tipo: "compras_rapidas" },
    { id: "mr8", titulo: "Ahorrador", desc: "Manten tu capital por encima del 50% de tu patrimonio durante 90 segundos.", tiempo: 90, exito: 4, fallo: -2, tipo: "mantener_capital" },
    { id: "mr9", titulo: "Prediccion Exitosa", desc: "Un asesor debe acertar una prediccion en los proximos 100 segundos.", tiempo: 100, exito: 7, fallo: -4, tipo: "prediccion_ok" },
    { id: "mr10", titulo: "Sin Deuda", desc: "Manten tu deuda en $0 durante 120 segundos.", tiempo: 120, exito: 6, fallo: -3, tipo: "cero_deuda" },
    { id: "mr11", titulo: "Inversion Segura", desc: "Compra acciones de Salud o Consumo en 60 segundos.", tiempo: 60, exito: 4, fallo: -2, tipo: "sector_seguro" },
    { id: "mr12", titulo: "Ganancia Rapida", desc: "Gana $2,000 en una venta en los proximos 90 segundos.", tiempo: 90, exito: 8, fallo: -4, tipo: "ganancia_2k" }
];
