// Mising clans / Opín Amin — for the /learn/clans page.
//
// HOW THIS WORKS
// Add one object per name. /learn/clans reads this list directly — same
// pattern as src/data/books.js and src/data/articles.js.
//
// FIELD REFERENCE
// misingName      the name in Mising orthography, including diacritics
//                  (e.g. 'Pe:gu')
// legalSpelling   the spelling commonly used in legal/official names,
//                  since Mising diacritics can't be used there. Comma-
//                  separate multiple common variants.
// ipa             IPA pronunciation, e.g. '/pe:gu/'
// voice           root-relative path to an mp3 in public/audio/clans/,
//                  e.g. '/audio/clans/pegu.mp3' — or null until recorded

export const clansData = [
  { misingName: 'Pe:gu', legalSpelling: 'Pegu, Pegoo', ipa: '/peːgu/', voice: '/audio/clans/pegu.ogg' }, // add '/audio/clans/pegu.mp3' once recorded
  { misingName: 'Dole:', legalSpelling: 'Doley', ipa: '/dɔleː/', voice: '/audio/clans/doley.ogg' }, // add '/audio/clans/doley.mp3' once recorded
  { misingName: 'Pa:tír', legalSpelling: 'Patir', ipa: '/paːtɨɾ/', voice: '/audio/clans/patir.ogg'  }, // add '/audio/clans/patir.mp3' once recorded
  { misingName: 'Kumbang', legalSpelling: 'Kumbang', ipa: '/kumbaŋ/', voice: '/audio/clans/kumbang.ogg' }, // add '/audio/clans/kumbang.mp3' once recorded
  { misingName: 'Kutum', legalSpelling: 'Kutum', ipa: '/kutum/', voice: '/audio/clans/kutum.ogg' },
  { misingName: 'Kuli', legalSpelling: 'Kuli', ipa: '/kuli/', voice: '/audio/clans/kuli.ogg' },
  { misingName: 'Koman', legalSpelling: 'Kaman, Koman', ipa: '/kɔman/', voice: '/audio/clans/koman.ogg' },
  { misingName: 'Pa:me', legalSpelling: 'Pame, Paame', ipa: '/paːme/', voice: '/audio/clans/pame.ogg' },
  { misingName: 'Panggíng', legalSpelling: 'Panging, Pangging', ipa: '/paŋɡɨŋ/', voice: '/audio/clans/pangging.ogg' },
  { misingName: 'Panyang', legalSpelling: 'Panyang', ipa: '/paɲaŋ/', voice: '/audio/clans/panyang.ogg' },
  { misingName: 'Taíd', legalSpelling: 'Taid, Taud', ipa: '/taɨd/', voice: '/audio/clans/taid.ogg' },
  { misingName: 'Taku', legalSpelling: 'Taku', ipa: '/taku/', voice: '/audio/clans/taku.ogg' },
  { misingName: 'Tao', legalSpelling: 'Tao, Taw', ipa: '/taɔ/', voice: '/audio/clans/tao.ogg' },
  { misingName: 'Kagyung', legalSpelling: 'Kagyung', ipa: '/kaɡyuŋ/', voice: '/audio/clans/kagyung.ogg' },
  { misingName: 'Kardong', legalSpelling: 'Kardong', ipa: '/kaɾdɔŋ/', voice: '/audio/clans/kardong.ogg' },
  { misingName: 'Médog', legalSpelling: 'Medok, Medog', ipa: '/mədɔɡ/', voice: '/audio/clans/medok.ogg' },
  { misingName: 'Pa:yun', legalSpelling: 'Payun', ipa: '/paːyun/', voice: '/audio/clans/payun.ogg' },
  { misingName: 'Pa:dun', legalSpelling: 'Padun', ipa: '/paːdun/', voice: '/audio/clans/padun.ogg' },
  { misingName: 'Mo:rang', legalSpelling: 'Morang', ipa: '/mɔːɾaŋ/', voice: '/audio/clans/morang.ogg' },
  { misingName: 'Mipun', legalSpelling: 'Mipun', ipa: '/mipun/', voice: '/audio/clans/mipun.ogg' },
  { misingName: 'Régon', legalSpelling: 'Regon', ipa: '/ɾəɡɔn/', voice: '/audio/clans/regon.ogg' },
  { misingName: 'Ngate:', legalSpelling: 'Ngate, Natey', ipa: '/ŋateː/', voice: '/audio/clans/ngate.ogg' },
  { misingName: 'Saro', legalSpelling: 'Saro, Saroh, Charoh', ipa: '/saɾɔ/', voice: '/audio/clans/saro.ogg' },
  { misingName: 'Sinte', legalSpelling: 'Sinte, Chinte, Chintey', ipa: '/sinte/', voice: '/audio/clans/sinte.ogg' },
  { misingName: 'Pérme', legalSpelling: 'Perme, Permey', ipa: '/pəɾme/', voice: '/audio/clans/perme.ogg' },
  { misingName: 'Pértín', legalSpelling: 'Pertin', ipa: '/pəɾtɨn/', voice: '/audio/clans/pertin.ogg' },
  { misingName: 'Pogag', legalSpelling: 'Pogag, Pagag', ipa: '/pɔɡaɡ/', voice: '/audio/clans/pogag.ogg' },
  { misingName: 'Pasung', legalSpelling: 'Pasung, Pachung', ipa: '/pasuŋ/', voice: '/audio/clans/pasung.ogg' },
  { misingName: 'Pa:di', legalSpelling: 'Padi, Pahadi', ipa: '/paːdi/', voice: '/audio/clans/padi.ogg' },
  { misingName: 'Bori', legalSpelling: 'Bori', ipa: '/bɔɾi/', voice: '/audio/clans/bori.ogg' },
  { misingName: 'Ba:sing', legalSpelling: 'Basing', ipa: '/baːsiŋ/', voice: '/audio/clans/basing.ogg' },
  { misingName: 'Mo:di', legalSpelling: 'Modi', ipa: '/mɔːdi/', voice: '/audio/clans/modi.ogg' },
  { misingName: 'Pa:it', legalSpelling: 'Pait', ipa: '/paːid/', voice: '/audio/clans/pait.ogg' },
  { misingName: 'Sungkurang', legalSpelling: 'Sungkurang, Chungkurang', ipa: '/suŋkuɾaŋ/', voice: '/audio/clans/sungkurang.ogg' },
  { misingName: 'Lagasu:', legalSpelling: 'Lagachu, Lagasu', ipa: '/laɡasuː/', voice: '/audio/clans/lagasu.ogg' },
  { misingName: 'Sí:rang', legalSpelling: 'Sirang, Chirang', ipa: '/sɨːɾaŋ/', voice: '/audio/clans/sirang.ogg' },
  { misingName: 'Lo:ying', legalSpelling: 'Loying', ipa: '/lɔːyiŋ/', voice: '/audio/clans/loying.ogg' },
  { misingName: 'Yéin', legalSpelling: 'Yein', ipa: '/yəin/', voice: '/audio/clans/yein.ogg' },
  { misingName: 'Ra:tan', legalSpelling: 'Ratan', ipa: '/ɾaːtan/', voice: '/audio/clans/ratan.ogg' },
  { misingName: 'Koptag', legalSpelling: 'Koptak, Koptag', ipa: '/kɔptaɡ/', voice: '/audio/clans/koptak.ogg' },
  { misingName: 'Tayeng', legalSpelling: 'Tayeng', ipa: '/tayeŋ/', voice: '/audio/clans/tayeng.ogg' },
  { misingName: 'Tayung', legalSpelling: 'Tayung', ipa: '/tayuŋ/', voice: '/audio/clans/tayung.ogg' },
  { misingName: 'Pa:yeng', legalSpelling: 'Payeng', ipa: '/paːyeŋ/', voice: '/audio/clans/payeng.ogg' },
  { misingName: 'Taye', legalSpelling: 'Taye', ipa: '/taye/', voice: '/audio/clans/taye.ogg' },
  { misingName: 'Pao', legalSpelling: 'Paw, Pawo, Pao', ipa: '/paɔ/', voice: '/audio/clans/pao.ogg' },
  { misingName: 'Noro:', legalSpelling: 'Narah, Noroh, Noro', ipa: '/nɔɾɔː/', voice: '/audio/clans/noro.ogg' },
  { misingName: 'Mili', legalSpelling: 'Mili', ipa: '/mili/', voice: '/audio/clans/mili.ogg' },
  { misingName: 'Daríg', legalSpelling: 'Darig, Darik', ipa: '/daɾɨɡ/', voice: '/audio/clans/darig.ogg' }
]