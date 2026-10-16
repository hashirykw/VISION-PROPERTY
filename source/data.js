/* ================= Vision Properties — shared data =================
   Every project fact below comes from that project's page on visionproperties.pk.
   Images: each <img> first tries the local copy in /images (filled by the
   GitHub Action in .github/workflows/fetch-images.yml), then falls back to the
   original URL. So the site works before and after the images are copied.      */
const VP_DATA = (() => {
  const U = 'https://visionproperties.pk/wp-content/uploads/';
  const STD = ['Car parking', 'Modern lifts', 'Power backup', 'CCTV monitoring', 'Gym', 'Prayer area', "Children's play area", 'Natural gas & water', 'Entrance lobby'];
  const MARINA = ['2024/04/samina-marina.jpg', '2024/04/Rectangle-17-1024x505-1.jpg', '2024/04/Rectangle-19-1.png', '2024/04/Rectangle-14.jpg', '2024/04/Rectangle-16.jpg', '2024/04/Rectangle-20.jpg', '2024/04/Rectangle-27.jpg', '2024/04/Rectangle-6-1.png', '2024/04/Rectangle-7-1.png', '2024/04/Rectangle-87.jpg', '2024/04/Rectangle-89.png', '2024/04/Rectangle-33-1.png', '2024/04/Rectangle-32-1.png', '2024/04/Rectangle-34-3.png'];
  const MARINA_PLANS = ['2024/04/Rectangle-9.jpg', '2024/04/Rectangle-70.jpg', '2024/04/Rectangle-72.png', '2024/04/Rectangle-73.png', '2024/04/Rectangle-74.png', '2024/04/Rectangle-75.jpg'];
  /* f = filters: sea | m9 | ja (Jinnah Ave / University Rd) | nn (North Nazimabad) | apt | plot | com */
  const P = [
    { s: 'saima-waterfront', n: 'Saima Waterfront', g: ['2024/01/waterfall.jpg', '2024/01/Saima-Water-Front-3.jpg'], f: ['sea', 'apt'], hot: 'Sea-facing', area: 'DHA Phase VIII',
      loc: 'Plot #7, Crescent Bay, DHA Phase VIII, Karachi', type: 'Ultra-luxury apartments', units: '1, 2, 3 & 4 bed', floors: '40 storeys', dev: 'Waterfront Enterprises (Saima Group)',
      d: 'A 40-storey residential tower on the DHA Phase VIII waterfront by the Arabian Sea. It is marketed on its sea views and on the calm of living away from the city, and it is a short walk from a central park with green avenues and a children\'s play area.',
      a: ['Earthquake-resistant structure', 'Branded elevators & cargo lift', 'Swimming pool', 'Sauna & Jacuzzi', 'Modern gym', 'Gaming & indoor games', 'Standby generators', 'Fire-fighting on every floor', 'CCTV & armed guards', '5 floors of parking', 'Elegant reception lobby', 'In-house prayer area'] },
    { s: 'saima-marina-residence', n: 'Saima Marina Residence', g: MARINA, plans: MARINA_PLANS, f: ['sea', 'apt'], hot: '41 storeys', area: 'DHA Phase VIII',
      loc: 'DHA Phase VIII, along the Arabian Sea, Karachi', type: 'Luxury apartments', units: '1 to 4 bed', floors: '41 storeys', dev: 'ZSZ Group',
      d: 'Sea-view luxury apartments in a 41-storey tower in DHA Phase VIII, designed for modern living with contemporary amenities. The developer, ZSZ Group, has more than three decades of reputation in housing and construction.',
      a: ['Car parking', 'Gym', 'RO plant', 'Sea views'] },
    { s: 'paari-palace', n: 'Paari Palace', g: ['2021/05/Paari-Palace-Pic-3.jpg', '2021/05/Paari-Palace-Pic-1.jpg'], f: ['m9', 'apt'], hot: 'Installments', area: 'Super Highway (M-9)',
      loc: 'Main Super Highway (M-9), opposite Baqai Hospital & University', type: 'Gated apartments · 6 towers', units: '3, 4, 5 & 6 rooms', floors: 'Six towers', dev: '',
      d: 'A large gated community of six towers on the main Super Highway near the Toll Plaza, directly opposite Baqai Hospital & University and close to Malir Cantt and Saima Paari. It is marketed on its secure setting, open views and fresh air. Installment plans are available.',
      a: STD.concat(['Installment plans']) },
    { s: 'roomi-icon', n: 'Roomi Icon', g: ['2023/12/Roomi-Icon-1.jpg', '2021/05/Roomi-Icon-2.jpg'], f: ['ja', 'apt'], hot: 'Twin towers', area: 'Jinnah Avenue',
      loc: 'Main Jinnah Avenue, Karachi', type: 'Luxury apartments', units: '', floors: 'Twin towers', dev: 'Roomi Builders & Developers',
      d: 'An upcoming luxury apartment project on Main Jinnah Avenue by Roomi Builders & Developers, presented as Karachi\'s tallest twin towers. It is planned around resident lifestyle facilities, from a spa and mini theatre to a library and day care.',
      a: ['Reception & waiting area', 'Exclusive lift lobby', 'Open American kitchen', 'Imported fittings', 'Swimming pool', 'Gymnasium', 'Spa', 'Yoga room', 'Mini theatre', 'Library', 'Day care', 'Earthquake-resistant structure', 'Fire-fighting system', 'CCTV & 24/7 security', 'Private parking', 'Landscaped gardens'] },
    { s: 'roomi-towers', n: 'Roomi Towers', g: ['2024/01/roomitower.jpg', '2024/01/roomi-tawers-2.jpg'], f: ['ja', 'apt'], hot: 'Upcoming', area: 'University Road',
      loc: 'Main University Road near Jinnah Avenue, bordering Malir Cantt', type: 'Luxury apartments', units: '', floors: '', dev: 'Roomi Builders & Developers',
      d: 'An upcoming luxury apartment project on Main University Road near Jinnah Avenue, where University Road meets the Malir link to the Super Highway, bordering Malir Cantonment.',
      a: STD.concat(['24/7 security', 'Private parking', 'Landscaped gardens']) },
    { s: 'saars-tower', n: 'Saars Tower', g: ['2021/05/Saars-Pic-cover.jpg', '2021/05/Saars-Pic-2.jpg'], f: ['nn', 'apt'], hot: 'North Nazimabad', area: 'North Nazimabad',
      loc: 'Block A, North Nazimabad, on the main 320 ft road', type: 'Executive apartments', units: '', floors: '', dev: '',
      d: 'Premier executive apartments on the main 320 ft road in Block A, North Nazimabad, with an elegant design, a wide range of amenities and a prime location.',
      a: ['Swimming pool', 'Fitness centre', 'Landscaped gardens', "Children's play area", 'Community spaces', 'Elevators', 'Backup power', 'Security', 'Parking'] },
    { s: 'saars-3', n: 'SAARS 3', g: ['2026/03/SAARS-3-at-Civil-Lines-area-of-Karachi.jpg-1.webp', '2026/03/1.jpg'], f: ['apt'], hot: 'G + 44', area: 'Civil Lines',
      loc: 'Civil Lines, Karachi', type: 'High-rise residences', units: '3 to 6 bed lounge', floors: 'Ground + 44 floors', dev: '',
      d: 'A Ground + 44 residential high-rise on a 2,100 sq. yard plot in Civil Lines, with a commercial ground floor, parking on floors 1 to 7 and amenities on floors 8 to 10. Apartments run from 3 Bed Lounge units with Karachi Club views and front-facing 4 Bed Lounge units with CM House views, up to 5 Bed duplexes and premium 6 Bed Lounge homes, six apartments per floor.',
      a: ['Lounge & community areas', 'Gym & wellness', 'Recreation zones', "Kids' play area", 'Leisure spaces', '7 floors of parking', 'Commercial ground floor'] },
    { s: 'roomi-city', n: 'Roomi City', g: ['2021/05/romicitycover.jpg', '2021/05/roomi-city.jpg'], f: ['m9', 'plot'], hot: 'Plots', area: 'M-9 Motorway',
      loc: 'M-9 Motorway Exit 7, next to Saima Mid-town', type: 'Residential plots', units: 'Plots for custom homes', floors: '', dev: '',
      d: 'An upcoming community of spacious, beautifully landscaped residential plots in an exclusive setting, where you can build your own home. Register your interest early.',
      a: ['24/7 security', 'Landscaped parks', 'Modern infrastructure'] },
    { s: 'saima-greens', n: 'Saima Greens', g: ['2024/01/samiagreen.jpg', '2024/01/1-1.jpg', '2026/03/900-629-4.jpg'], f: ['apt'], hot: '40% green', area: 'Shahra-e-Faisal',
      loc: 'Off Jinnah International Terminal Rd, Faisal Cantonment, opposite Jinnah Airport', type: 'Gated apartments', units: '4, 5 & 6 rooms', floors: '', dev: 'Saima Group',
      d: 'A Cantonment Board approved apartment project with a boundary wall, opposite Jinnah International Airport on Main Shahra-e-Faisal. More than 40% of the site is green space, and flexible payment plans are offered.',
      a: ['Over 40% green spaces', 'Family park', 'Standby generators', 'Fire-fighting system', 'Earthquake-resistant structure'].concat(STD) },
    { s: 'saima-dreams', n: 'Saima Dreams', g: ['2024/01/samia-Dreams.jpg', '2024/01/Saima-Dream-1.jpg'], f: ['apt'], hot: 'Family homes', area: 'Gulzar-e-Hijri',
      loc: 'Main Safoora Chowrangi, Gulzar-e-Hijri Sector 34A, Scheme 33', type: 'Family apartments', units: '4, 5 & 6 rooms', floors: '', dev: 'Saima Builders & Developers',
      d: 'Residential family apartments at Main Safoora Chowrangi in Gulzar-e-Hijri, Scheme 33.',
      a: STD.concat(['Earthquake-resistant structure', 'Fire-fighting system']) },
    { s: 'saima-jinnah-mall-residence', n: 'Saima Jinnah Mall & Residence', g: ['2024/01/samiamall.jpg', '2024/01/Saima-Mall-and-Resedincy-Jinnah.jpg'], f: ['ja', 'com', 'apt'], hot: 'Mall + homes', area: 'Jinnah Avenue',
      loc: 'Jinnah Avenue & University Road, opposite Malir Cantt Checkpost 5', type: 'Mall & residence', units: '5 & 6 room Super Executive', floors: '', dev: '',
      d: 'A high-rise combining a centrally air-conditioned shopping mall with 5 and 6 room Super Executive apartments, near the airport where Jinnah Avenue meets University Road. Each apartment has its own entrance and a separate maid\'s room with attached toilet.',
      a: ['Air-conditioned shopping mall', 'Separate entrance per apartment', "Maid's room with toilet", 'Cargo lift', 'Earthquake-resistant structure', 'Fire-fighting system'].concat(STD) },
    { s: 'saima-mall-residency', n: 'Saima Mall & Residency', g: ['2026/03/imgi_15_07-4.jpg', '2026/03/imgi_11_06-7.jpg'], f: ['com', 'apt'], hot: 'Mixed-use', area: 'Karachi',
      loc: 'Karachi', type: 'Mall & residency', units: '1, 2 & 3 bed', floors: '', dev: 'Saima Group',
      d: 'A mixed-use Saima Group project pairing a commercial mall, with retail shops, showrooms, food outlets and leisure spaces, with 1, 2 and 3 bedroom apartments.',
      a: ['Retail shops & showrooms', 'Food & beverage outlets', 'Entertainment spaces'].concat(STD) },
    { s: 'saima-business-park', n: 'Saima Business Park', g: ['2024/01/samima-business-park.jpg', '2024/01/business-park-3.jpg'], f: ['com'], area: 'Karachi', loc: 'Karachi', type: 'Commercial', dev: 'Saima Group' },
    { s: 'e-square', n: 'E Square', g: ['2026/03/imgi_3_Saima-Esquare-1-1-1024x683-1.jpg', '2026/03/imgi_11_Saima-Esquare-3-1-scaled-1.jpg'], f: ['com', 'nn'], hot: 'Rent or buy', area: 'North Nazimabad',
      loc: 'Main Food Street, Block H, North Nazimabad', type: 'Offices & commercial', units: 'Offices & shops', floors: '', dev: '',
      d: 'Office spaces and commercial units on Main Food Street in Block H, North Nazimabad, available to rent or buy, with modern infrastructure and easy access. It is on the same street as our office.',
      a: ['Modern infrastructure', 'Easy access', 'For rent & sale'] },
    { s: 'saima-center-point', n: 'Saima Center Point', g: ['2026/03/imageye___-_imgi_135_sqyd-img13-1-1024x682-1.jpg'], f: ['com', 'apt'], hot: 'New launch', area: 'M.A. Jinnah Road',
      loc: 'Main M.A. Jinnah Road, Karachi', type: 'Residential & commercial', units: '2, 3 & 4 bed', floors: '', dev: '',
      d: 'A recently launched mixed-use project on Main M.A. Jinnah Road with 2, 3 and 4 bedroom apartments alongside commercial space.', a: STD },
    { s: 'saima-premium-empire', n: 'Saima Premium Empire', g: ['2021/05/samina-Enpire-cover.jpg', '2021/05/Saima-Empire-2.jpg', '2026/03/900-629-5.jpg', '2026/03/1600-807-4.jpg'], f: ['nn', 'apt'], area: 'North Nazimabad',
      loc: 'Block A, North Nazimabad, on the main 320 ft road', type: 'Residential', units: '2, 3 & 4 Bed DD', floors: '', dev: 'Saima Group',
      d: 'Residential apartments on the main 320 ft road in Block A, North Nazimabad, in 2, 3 and 4 Bed DD layouts, with fitness centres and well-kept facilities.', a: ['Fitness centres'].concat(STD) },
    { s: 'saima-paari-excellency', n: 'Saima Paari Excellency', g: ['2026/03/900-629-3.jpg', '2026/03/1600-807.jpg'], f: ['nn', 'apt'], hot: 'Pre-launch', area: 'North Nazimabad',
      loc: 'Block A, North Nazimabad, Karachi', type: 'Residential', units: '2 & 3 bed', floors: '', dev: '',
      d: 'A pre-launch residential project in Block A, North Nazimabad, with 2 and 3 bedroom apartments at pre-launch prices.', a: STD },
    { s: 'saima-meadow-avenue', n: 'Saima Meadow Avenue', g: ['2026/03/810.png', '2026/03/900-629-1.jpg'], f: ['ja', 'apt'], area: 'Jinnah Avenue',
      loc: 'Main Jinnah Avenue, Karachi', type: 'Residential', units: '2 Bed Lounge, 2 Bed Drawing, 3 Bed', floors: '', dev: 'Saima Group',
      d: 'A Saima Group residential project on Main Jinnah Avenue, in 2 Bed Lounge, 2 Bed Drawing and 3 Bedroom layouts.', a: STD },
    { s: 'al-reef-twin-tower', n: 'Al Reef Twin Tower', g: ['2026/03/1-1.jpg'], f: ['apt'], hot: 'Twin towers', area: 'Karachi',
      loc: 'Karachi', type: 'Residential & mixed-use', units: '2 & 3 bed', floors: 'Twin towers', dev: '',
      d: 'A modern twin-tower development for families, professionals and investors. Every unit has living and dining spaces, a kitchen and bathrooms, and the towers are close to major roads, schools, healthcare, shopping and public transport.', a: STD },
    { s: 'al-reef-residency', n: 'Al Reef Residency', g: ['2026/03/900-629-6.jpg'], f: ['apt'], hot: 'Gated', area: 'Karachi',
      loc: 'Karachi', type: 'Residential community', units: '2 & 3 bed', floors: '', dev: '',
      d: 'A gated residential community of 2 and 3 bedroom apartments with 24/7 security, dedicated parking, landscaped green areas and open spaces.', a: ['24/7 security & gated access', 'Landscaped green areas', 'Dedicated parking'].concat(STD) },
    { s: 'paari-avenue', n: 'Paari Avenue', g: ['2026/03/imageye___-_imgi_6_DSC00928-scaled-1.jpg'], f: ['apt'], area: 'Karachi',
      loc: 'Karachi', type: 'Residential apartments', units: '2 & 3 bed', floors: '', dev: 'Paari Builders',
      d: 'Residential apartments by Paari Builders in an emerging Karachi neighbourhood, with 2 and 3 bedroom units, each with living and dining areas, a kitchen and bathrooms.', a: STD },
    { s: 'paari-palace-corner', n: 'Paari Palace Corner', g: ['2026/03/1600-807.jpg.jpeg'], f: ['com', 'apt'], area: 'Karachi',
      loc: 'Karachi', type: 'Apartments & corner shops', units: '2 & 3 bed', floors: '', dev: 'Paari Builders',
      d: 'A mixed-use project by Paari Builders combining 2 and 3 bedroom apartments with corner commercial units.', a: STD },
    { s: 'saima-shield', n: 'Saima Shield', g: ['2026/03/SAIMA-SHEILD-5.jpeg', '2026/03/SAIMA-SHEILD-4.jpeg'], f: ['apt'], area: 'Karachi',
      loc: 'Karachi', type: 'Premium residences', units: '2 & 3 bed', floors: '', dev: 'Saima Group',
      d: 'A premium Saima Group residential development in a well-connected part of Karachi, with 2 and 3 bedroom apartments.', a: STD },
    { s: 'saima-luxury-apartments', n: 'Saima Luxury Apartments', g: ['2026/03/2.jpg', '2026/03/2-1.jpg'], f: ['apt'], area: 'Karachi',
      loc: 'Karachi', type: 'Luxury apartments', units: '2 & 3 bed', floors: '', dev: 'Saima Group',
      d: 'Saima Group residential apartments in a well-connected part of Karachi, with 2 and 3 bedroom layouts.', a: STD },
    { s: 'aa-beverly', n: 'AA Beverly', g: ['2026/03/bottom.jpeg'], f: ['apt'], area: 'Callachi Society',
      loc: 'Callachi Society, Karachi', type: 'Residential', units: '2 & 3 bed', floors: '', dev: '',
      d: 'Residential apartments in Callachi Society with 2 and 3 bedroom layouts.', a: STD }
  ];
  /* local-first image paths: images/2024-04-Rectangle-9.jpg ← uploads/2024/04/Rectangle-9.jpg */
  const local = path => 'images/' + path.replace(/\//g, '-');
  const pic = path => ({ src: local(path), fb: U + path });
  P.forEach(p => { p.pics = p.g.map(pic); p.planPics = (p.plans || []).map(pic); p.src = p.pics[0].src; p.fb = p.pics[0].fb; p.a = p.a || []; p.d = p.d || ''; });

  /* Stock photography (Unsplash, used only as illustrative lifestyle imagery) */
  const UN = id => ({ src: 'images/stock-' + id + '.jpg', fb: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80` });
  const STOCK = {
    living: UN('photo-1600210492486-724fe5c67fb0'), kitchen: UN('photo-1600566753190-17f0baa2a6c3'), lounge: UN('photo-1600607687939-ce8a6c25118c'),
    bedroom: UN('photo-1505691938895-1758d7feb511'), keys: UN('photo-1560518883-ce09059eeffa'), office: UN('photo-1497366216548-37526070297c'),
    towers: UN('photo-1486406146926-c627a92ad1ab'), skyline: UN('photo-1477959858617-67f85cf4f1df'), house: UN('photo-1600596542815-ffad4c1539a9'),
    meeting: UN('photo-1600880292203-757bb62b4baf'), handshake: UN('photo-1521791136064-7986c2920216'), villa: UN('photo-1613490493576-7fde63acd811'),
    modern: UN('photo-1600585154340-be6161a56a0c'), aptblock: UN('photo-1545324418-cc1a3fa10c00'), aptroom: UN('photo-1502672260266-1c1ef2d93688'),
    bright: UN('photo-1560448204-e02f11c3d0e2'), sofa: UN('photo-1522708323590-d24dbb6b0267'), kitchen2: UN('photo-1484154218962-a197022b5858'),
    luxe: UN('photo-1512917774080-9991f1c4c750')
  };

  const AFF = [['Bahria', '2021/05/bharia-150x150.png'], ['Emaar', '2023/11/emmar-1-150x150.png'], ['Saima', '2023/11/saima-1-150x150.png'], ['Roomi City', '2021/05/roomicitylogo-1-150x150.png'], ['Paari', '2021/05/paarilogo-150x150.png'], ['City', '2023/11/city-1-150x150.png'], ['Gulam', '2023/11/gulam-1-150x150.png'], ['LIS', '2023/11/lis-1-150x150.png']].map(a => Object.assign({ n: a[0] }, pic(a[1])));

  const C = {
    wa: '923302152999', waShow: '0330 2152999',
    phones: [['0330 2152999', '+923302152999'], ['0322 2710896', '+923222710896'], ['0330 2162999', '+923302162999']],
    email: 'info@visionproperties.pk',
    addr: 'B-115, Block H, Main Food Street, North Nazimabad, Karachi',
    map: 'https://goo.gl/maps/ib6KtAXq7yTiw2hF7',
    fb: 'https://www.facebook.com/visionproperties.pk', ig: 'https://www.instagram.com/visionproperties.pk/', yt: 'https://www.youtube.com/@VisionPropertiesOfficial'
  };

  const FAQ = [
    ['Where is the Vision Properties office?', 'Our office is at B-115, Block H, Main Food Street, North Nazimabad, Karachi. Call 0330 2152999 or 0322 2710896 before you visit and we\'ll make sure the right person is there to meet you.'],
    ['Which areas of Karachi do you cover?', 'We market projects across Karachi, including the DHA Phase VIII seafront, the M-9 Super Highway and Motorway, Jinnah Avenue and University Road, Shahra-e-Faisal, North Nazimabad, Civil Lines and Gulzar-e-Hijri.'],
    ['Are installment plans available?', 'Many of the projects we market offer installment or flexible payment plans, Paari Palace and Saima Greens among them. Plans differ by project and change over time, so WhatsApp us the project name and we\'ll send you the current schedule.'],
    ['Can you help me sell or rent out my property?', 'Yes. Alongside buying, we help clients sell faster and more economically, using modern digital marketing to reach qualified buyers and tenants.'],
    ['Which developers do you work with?', 'Our affiliations include Bahria, Emaar, Saima, Roomi City and Paari, among others.'],
    ['I\'m investing, not buying to live in. Can you advise?', 'Yes. We are a real estate marketing and investment consulting company. Tell us your budget and time horizon and we\'ll take you through suitable options honestly. We won\'t promise returns, but we will give you a clear picture.'],
    ['Can I visit a project site before booking?', 'Yes. Message us the project you like and a time that suits you, and we\'ll arrange the visit.'],
    ['Why are prices not listed on the website?', 'Prices and payment plans change often. Rather than show figures that may be out of date, we send you the current rate sheet directly on WhatsApp or by phone.']
  ];
  return { P, STOCK, AFF, C, FAQ, U, pic };
})();
