/* ------------------------------------------------------------------
   CONTENT, edit this file to change what the site says.

   places: the hotspots on the map. x/y are percentages of the image
           (884 x 1348 px master), rx/ry are ellipse radii in the same units.
           plate  = how the name is engraved on the 1683 plate
           modern = today's name        ancient = the classical name
   stops:  the chronological walk. Each stop points at one place.
           text is an array of paragraphs (plain text). quote is optional.
           sources are shown as footnotes.
   ------------------------------------------------------------------ */
window.AEGEAN = {
  title: "Les Isles de l'Archipel",
  dedication: "For Cole, thirteen thousand years of fishing the Archipelago, tied to the plate on your wall.",
  places: [
    { id: "milos",       plate: "Milo I.",        modern: "Milos",                 ancient: "Melos",        x: 49.8, y: 80.2, rx: 3.6, ry: 2.4 },
    { id: "franchthi",   plate: "Moree",          modern: "Franchthi Cave, Argolid", ancient: "Hermionis",  x: 31.6, y: 73.9, rx: 3.0, ry: 2.4 },
    { id: "sporades",    plate: "Pelagnisi I. / Dromi / Scopoli / Schiati", modern: "Northern Sporades: Youra, Kyra Panagia, Alonnisos, Skopelos, Skiathos", ancient: "Peparethos, Ikos, Halonnesos", x: 45.5, y: 48.4, rx: 7.0, ry: 3.6, rot: -20 },
    { id: "kythnos",     plate: "Fermenia",       modern: "Kythnos",               ancient: "Kythnos",      x: 52.0, y: 72.4, rx: 3.0, ry: 2.2 },
    { id: "paros",       plate: "Paro I.",        modern: "Paros & Antiparos",     ancient: "Paros",        x: 61.8, y: 74.8, rx: 3.4, ry: 2.4 },
    { id: "syros",       plate: "Sira I.",        modern: "Syros",                 ancient: "Syros",        x: 57.6, y: 66.0, rx: 2.8, ry: 2.0 },
    { id: "thera",       plate: "St. Erini I.",   modern: "Santorini",             ancient: "Thera",        x: 68.8, y: 85.4, rx: 3.6, ry: 2.4 },
    { id: "crete",       plate: "Candie",         modern: "Crete",                 ancient: "Kriti",        x: 66.5, y: 92.0, rx: 12.5, ry: 2.4, rot: -6 },
    { id: "kea",         plate: "Zea I.",         modern: "Kea",                   ancient: "Keos",         x: 51.4, y: 67.6, rx: 2.6, ry: 2.0 },
    { id: "lemnos",      plate: "Stalimene I.",   modern: "Lemnos",                ancient: "Lemnos",       x: 63.2, y: 40.2, rx: 4.2, ry: 3.0 },
    { id: "thasos",      plate: "Tasso I.",       modern: "Thasos",                ancient: "Thasos",       x: 53.5, y: 35.0, rx: 3.2, ry: 2.4 },
    { id: "samothrace",  plate: "Samandrachi I.", modern: "Samothrace",            ancient: "Samothrake",   x: 66.4, y: 33.4, rx: 2.6, ry: 1.9 },
    { id: "euboea",      plate: "Negrepont",      modern: "Euboea (Evia)",         ancient: "Euboia",       x: 41.6, y: 58.6, rx: 10.5, ry: 3.2, rot: 38 },
    { id: "athens",      plate: "Achaie",         modern: "Athens & Piraeus",      ancient: "Athenai",      x: 43.6, y: 65.6, rx: 2.8, ry: 2.2 },
    { id: "aegina",      plate: "Ingia",          modern: "Aegina",                ancient: "Aigina",       x: 37.3, y: 71.2, rx: 2.6, ry: 2.0 },
    { id: "delos",       plate: "(unlabelled islets west of Micone; Mallet's 'Sdilles')", modern: "Delos & Rineia", ancient: "Delos", x: 67.3, y: 67.8, rx: 2.2, ry: 1.7 },
    { id: "mykonos",     plate: "Micone I.",      modern: "Mykonos",               ancient: "Mykonos",      x: 72.4, y: 65.0, rx: 3.0, ry: 2.2 },
    { id: "naxos",       plate: "Nixia I.",       modern: "Naxos",                 ancient: "Naxos",        x: 69.0, y: 73.6, rx: 4.4, ry: 2.8 },
    { id: "lesbos",      plate: "(unlabelled, on the Asian shore)", modern: "Lesbos (Mytilene)",     ancient: "Lesbos",       x: 86.6, y: 52.0, rx: 4.4, ry: 3.2 },
    { id: "bosporus",    plate: "(beyond the top-right corner)", modern: "Toward the Hellespont and Byzantium", ancient: "Byzantion", x: 93.0, y: 17.8, rx: 3.4, ry: 3.0 },
    { id: "skyros",      plate: "Schiro I.",      modern: "Skyros",                ancient: "Skyros",       x: 50.3, y: 55.3, rx: 3.0, ry: 2.6 },
    { id: "tinos",       plate: "Tine I.",        modern: "Tinos",                 ancient: "Tenos",        x: 65.6, y: 63.2, rx: 3.2, ry: 2.0 },
    { id: "kythera",     plate: "Cerigo I.",      modern: "Kythera",               ancient: "Kythera",      x: 38.6, y: 86.9, rx: 3.0, ry: 2.4 },
    { id: "ios",         plate: "Nio I.",         modern: "Ios",                   ancient: "Ios",          x: 67.9, y: 78.7, rx: 2.6, ry: 1.9 },
    { id: "sifnos",      plate: "Sifano I.",      modern: "Sifnos",                ancient: "Siphnos",      x: 53.2, y: 77.6, rx: 2.6, ry: 2.0 },
    { id: "thessaly",    plate: "Thessalie",      modern: "Thessaly & the Pagasetic Gulf", ancient: "Thessalia", x: 30.0, y: 52.6, rx: 3.6, ry: 2.8 }
  ],
  stops: [
    /* ---------------- I. Before writing: hunters of the open sea ---------------- */
    { place: "milos", era: "by 11,000 BC", title: "Obsidian from Milos: the first sailors",
      text: [
        "Long before anyone wrote anything down, people were already crossing this sea. Milos has the two obsidian sources that supplied most of the prehistoric Aegean, and flakes of that black volcanic glass turn up at Franchthi Cave on the Peloponnese, about 150 kilometres away across open water. The oldest securely dated pieces belong to the eleventh millennium BC, at the end of the Ice Age. Popular accounts say 13,000 BC, but the primary literature supports the more careful phrase: by 11,000 BC, and possibly a little earlier.",
        "Nobody has found the boats. The obsidian is the proof. To get it from Milos to the mainland someone had to paddle, and to paddle that far someone had to know the sea well enough to fish it.",
        "The same glass shows up on Kythnos in the ninth millennium and on Youra soon after, and later the whole Cycladic tool kit ran on it. The walk that follows starts here, on the island engraved here as Milo."
      ],
      sources: [
        { title: "Laskaris, Sampson, Mavridis & Liritzis 2011, Journal of Archaeological Science 38 (obsidian hydration dates; Perlès's 11th-millennium date)", url: "https://www.sciencedirect.com/science/article/abs/pii/S0305440311001798" },
        { title: "Papoulia, Late Pleistocene to Early Holocene sea-crossings in the Aegean (CNRS Éditions)", url: "https://books.openedition.org/editionscnrs/28488?lang=en" },
        { title: "Dartmouth Aegean Prehistoric Archaeology, Lesson 1 (Franchthi)", url: "https://sites.dartmouth.edu/aegean-prehistory/lessons/lesson-1/" }
      ] },
    { place: "kythnos", era: "c. 8900–8400 BC", title: "Maroulas: the oldest village in the islands",
      text: [
        "On the east coast of Kythnos, the island the Italian pilots called Fermenia, a corruption of Thermia, after its hot springs, Adamantios Sampson excavated an open-air Mesolithic settlement at Maroulas: thirty-one round and oval stone structures with paved floors, and burials beneath them. Radiocarbon puts the occupation around 8900 to 8400 BC. It is the only Aegean Mesolithic site to give us both houses and graves.",
        "These were fishing people. Dimitra Mylona's study of the bones found fishing an important activity, split between the migratory, seasonal fish and distinct inshore species. About one stone tool in six was Melian obsidian, so boats were running between Kythnos and Milos in the ninth millennium BC.",
        "That is roughly ten thousand years before the plate was printed. The crossing a seventeenth-century boat made under sail, they made by paddle."
      ],
      sources: [
        { title: "Sampson, Kaczanowska & Kozłowski (eds) 2010, The Prehistory of the Island of Kythnos and the Mesolithic Settlement at Maroulas", url: "https://www.aegeussociety.org/new_book/the-prehistory-of-the-island-of-kythnos-cyclades-greece-and-the-mesolithic-settlement-at-maroulas/" },
        { title: "Sampson, Kozłowski & Giannouli 2002, Mediterranean Archaeology and Archaeometry 2", url: "https://www.maajournal.com/index.php/maa/article/view/26" },
        { title: "Sampson on Maroulas (excavator's summary)", url: "http://adamantiossampson.blogspot.com/2014/05/mesolithic-settlement-at-kythnos.html" }
      ] },
    { place: "sporades", era: "c. 8500–6800 BC", title: "Fish hooks from the Cave of the Cyclops",
      fishes: ["bluefin-tuna", "mackerel", "dusky-grouper", "scorpionfish"],
      text: [
        "The oldest fish hooks yet found in the Aegean come from Youra, an uninhabited rock in the Northern Sporades, next door to the island engraved here as Pelagnisi. In the Cave of the Cyclops, dug by Sampson between 1992 and 1996, the Mesolithic layers held ash hearths, an immense quantity of fish bone and shell, and a variety of bone hooks. Sampson's dates run from about 8500 to 6800 BC.",
        "The hooks are bone and antler, in two shapes: bipointed gorges, and the classic curved hook that survives to this day. The excavation volumes catalogue roughly three dozen hooks and preforms. A reviewer stressed how unusual their abundance is compared with any other site.",
        "What they caught reads like a modern Sporades catch. Mylona found two sources: the migratory fish that appeared only seasonally, mackerels, tunas and jacks, and the year-round coastal fish, breams, groupers and scorpionfish. Powell measured grouper, saddled bream, two-banded bream, chub mackerel and scorpionfish. The vertebra pattern suggests they were processing and preserving fish, not just eating it fresh.",
        "Youra and Pelagnisi are now inside the Alonnisos marine park, the first in Greece. Fishing here has one of the longest documented histories in the Aegean, and the water is now among the most protected in the country. We come back to it near the end of this walk."
      ],
      sources: [
        { title: "Sampson 1998, Annual of the British School at Athens 93 (first report)", url: "https://www.cambridge.org/core/journals/annual-of-the-british-school-at-athens/article/abs/neolithic-and-mesolithic-occupation-of-the-cave-of-cyclope-youra-alonnessos-greece/862E05B7A5BC0208BC2C313D389BACD0" },
        { title: "Sampson (ed.) 2011, The Cave of the Cyclops vol. II (INSTAP), front matter with hook catalogue", url: "https://instappress.com/wp-content/uploads/2011/01/YII_Frontmatter.pdf" },
        { title: "Mylona 2014, Aquatic animal resources in the prehistoric Aegean (summary)", url: "https://www.archaeology.wiki/blog/2014/11/24/fish-shellfish-fishermen-prehistoric-aegean/" },
        { title: "Allen, review in American Journal of Archaeology 118 (2014)", url: "https://ajaonline.org/book-review/1721/" }
      ] },
    { place: "franchthi", era: "c. 7900–7500 BC", title: "Tuna at Franchthi",
      fishes: ["bluefin-tuna", "eel"],
      text: [
        "Franchthi Cave sits on the coast of the Argolid, the peninsula that hangs off the eastern side of Mallet's Moree. Thomas Jacobsen dug it from 1967 to 1976 and found a sequence running from the Upper Palaeolithic to the end of the Neolithic. It is the anchor for everything we know about early fishing in Greece.",
        "In the Lower Mesolithic the fish are still shallow-water species: eels, breams, mullets. Then, in the Upper Mesolithic, roughly 7900 to 7500 BC, fish jump to twenty to forty per cent of all the bone in the cave, and the fish are big. Tuna dominate. Stiner and Munro describe foragers who by then had a full suite of technology for fishing the open waters of the Mediterranean for large-bodied taxa. Catherine Perlès calls it an episode of intense tuna fishing.",
        "Two honest cautions. The number of individual tuna is small, and the Dartmouth synthesis notes they might have been driven into shallow water and clubbed or speared rather than fought offshore. And isotope work on the human bones from before and after the tuna phase shows little marine food in the diet. The tuna-phase people themselves have not been tested.",
        "Judith Powell, whose 1996 book remains the reference, argued that Aegean fishing proper begins here, in the eighth millennium BC."
      ],
      sources: [
        { title: "Perlès 2016, Quaternary International 407 (littoral resources at Franchthi)", url: "https://hal.science/hal-01529062/" },
        { title: "Stiner & Munro 2011, Journal of Human Evolution 60", url: "https://pubmed.ncbi.nlm.nih.gov/21371735/" },
        { title: "Martinoia et al. 2025, PLoS ONE (isotopes and Mesolithic fish)", url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0310834" },
        { title: "Dartmouth Aegean Prehistoric Archaeology, Lesson 1", url: "https://sites.dartmouth.edu/aegean-prehistory/lessons/lesson-1/" },
        { title: "Andrews et al. 2022, ICES Journal of Marine Science 79 (bluefin in the Aegean 9000–3200 BC)", url: "https://academic.oup.com/icesjms/article/79/2/247/6511216" }
      ] },
    { place: "paros", era: "late 5th millennium BC", title: "Saliagos: a village that lived on tuna",
      fishes: ["bluefin-tuna"],
      text: [
        "Between Paros and Antiparos there is now an islet called Saliagos. In the late fifth millennium BC it was a Neolithic hamlet on a headland, dug in 1964 and 1965 by John Evans and Colin Renfrew. Large numbers of fish bones came out, and ninety-seven per cent of the identifiable ones were tuna, often very large.",
        "No hooks were found, and nets are unlikely to hold fish that size, so the excavators pointed to the site's characteristic tanged obsidian points and proposed they were spearing tuna. Every scrap of that obsidian came from Milos.",
        "The Dartmouth synthesis suggests that the settlement of the Cyclades itself may have been tied to the annual tuna runs through the central Aegean. People went out to the islands to follow the fish."
      ],
      sources: [
        { title: "Evans & Renfrew 1968, Excavations at Saliagos near Antiparos (BSA Supplementary vol. 5), via Dartmouth Lesson 2", url: "https://sites.dartmouth.edu/aegean-prehistory/lessons/lesson-2/" },
        { title: "Wikipedia, Saliagos (obsidian count, dates)", url: "https://en.wikipedia.org/wiki/Saliagos" }
      ] },
    { place: "lemnos", era: "c. 3200–2100 BC", title: "Poliochni, and how Lemnos became Stalimene",
      text: [
        "The plate calls it Stalimene. A Greek heading for the island said es tin Limnon, to Lemnos, and Italian sailors took the whole phrase for the name, the same way eis tin Polin turned into Stamboul and ston Euripon into Negroponte. Mallet knew the island was Lemnos and blamed the modern Greeks for the corruption. It was Ottoman from 1456, Venetian again from 1464 to 1479, and Ottoman for good after that.",
        "On the east coast, on a rise above a bay that a rocky promontory shelters from the wind, near the cove of Vroskopos between two rivers, lies Poliochni. The mound is more than nine metres deep. The Italian Archaeological School dug it: Alessandro Della Seta from 1930 to 1936, about two thirds of the settlement, then Luigi Bernabò Brea in 1951 to 1953, 1956 and 1960. Bernabò Brea named the periods by colour. Black has stone and bone tools and no metal at all. Blue is walled and has the first metal. Then Green, then Red with its hoard of bronze, then Yellow, the fortified town, where a hoard of gold jewellery came up in 1956.",
        "The dates offered for those phases run 3200 to 2700 BC for Blue and 2200 to 2100 for Yellow, with a population of about eight hundred to a thousand rising to some fifteen hundred, and an enclosure wall a hundred and thirty metres long and up to four and a half metres high. The Dartmouth synthesis calls the Yellow town considerably larger than the contemporary walled citadel of Troy, across the water, and warns that the dates are still argued over against Troy's own sequence.",
        "What came out of that harbour, nobody has published. The accessible summary of the town's economy says the residents engaged in farming, fishing, textile-making, the manufacture of stone tools and weapons, and metalworking. That one word, fishing, is the whole fishing record of Poliochni: no bone count, no hooks, no sinkers, because the Italian monographs of 1964 and 1976 are not searchable. Lemnos is on this walk for the harbour and the town, not for the catch."
      ],
      sources: [
        { title: "Bernabò Brea project site, Poliochni (setting and excavation history)", url: "http://www.luigibernabobrea.it/luoghi/poliochni_e.html" },
        { title: "Greek News Agenda, Poliochne on the island of Lemnos", url: "https://www.greeknewsagenda.gr/poliochne-on-the-island-of-lemnos-the-earliest-evidence-of-social-and-civic-structure-in-europe/" },
        { title: "Dartmouth Aegean Prehistoric Archaeology, Lesson 7 (the colour phases; the Troy comparison)", url: "https://sites.dartmouth.edu/aegean-prehistory/lessons/lesson-7-narrative/" },
        { title: "1911 Encyclopaedia Britannica, Lemnos (Stalimene from es tin Limnon)", url: "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lemnos" },
        { title: "Mallet's own text on the Archipelago (Frankfurt 1686 reprint of the 1683 text)", url: "https://archive.org/details/gri_33125008769156" }
      ] },
    { place: "syros", era: "c. 2500 BC", title: "Longboats with a fish on the prow",
      text: [
        "At Chalandriani on Syros, Christos Tsountas opened five hundred and forty graves in 1898 and 1899. It is the largest Early Cycladic cemetery known, dated about 2700 to 2300 BC. From it come the strange flat clay 'frying pans' whose real purpose is still argued over, and the Syros ones carry something the others rarely do: incised ships.",
        "The best known, in the National Archaeological Museum in Athens, shows a long paddled boat with slanting lines for oars and a high end topped by a fish emblem and two banners. The Museum of Cycladic Art describes the type as paddled longboats with a high bow, usually crowned by a fish, and cites estimates of fifteen to twenty crew, about a ton of cargo, and roughly two weeks to cross most of the Aegean.",
        "Whether that high end is the bow or the stern is disputed. The fish is not."
      ],
      sources: [
        { title: "Ephorate of Antiquities of the Cyclades, prehistoric and classical Syros", url: "https://cyclades.culture.gov.gr/en/location/the-prehistoric-and-classical-antiquities-of-syros/" },
        { title: "Wikipedia, Frying pan (NAMA 4974)", url: "https://en.wikipedia.org/wiki/Frying_pan_(NAMA_4974)" },
        { title: "Museum of Cycladic Art, Maritime communication and trade in the Cyclades", url: "https://cycladic.gr/en/essay/i-thalassia-epikoinonia-eborio-stis-k/" }
      ] },
    { place: "milos", era: "16th century BC", title: "The flying fish of Phylakopi",
      text: [
        "Phylakopi on the north coast of Milos was dug by the British School in 1896 to 1899, in what Carl Blegen later called the first really good excavation in Greece, and again by Colin Renfrew in the 1970s. From a pillar-crypt room came fragments of a wall painting of flying fish in the Minoan manner, dated to the sixteenth century BC.",
        "It is in the National Archaeological Museum in Athens, inventory 5844. Beware the print shops that caption it 2500 BC. That is a thousand years too early."
      ],
      sources: [
        { title: "Barber (ed.) 2024, Phylakopi, Melos, 1896–99: The Finds in the National Archaeological Museum (BSA)", url: "https://www.aegeussociety.org/new_book/phylakopi-melos-1896-99-the-finds-in-the-national-archaeological-museum-athens/" },
        { title: "World History Encyclopedia, Flying-fish fresco, Melos", url: "https://www.worldhistory.org/image/3826/flying-fish-fresco-melos/" }
      ] },
    { place: "thera", era: "c. 1600–1540 BC", title: "The fishermen of Akrotiri",
      fishes: ["dolphinfish", "amberjack"],
      text: [
        "The most famous fisherman in Greek art is a naked boy with a half-shaved head holding two bunches of fish strung on yellow cord. He was painted on the wall of Room 5 of the West House at Akrotiri on Thera, the island engraved here as St. Erini, and buried by the eruption that blew the middle out of the island. Spyridon Marinatos began the excavation in 1967; Christos Doumas continued it.",
        "There are two of these boys, facing an offering table, so many read the scene as a ritual gift rather than a market catch. The fish are usually identified as dolphinfish, Coryphaena hippurus, the fish Greeks now call kynigos or lampouka, with one bunch sometimes called amberjack. The identification is not certain: it is the standard reading, not a settled one. The fresco moved from Athens to the Museum of Prehistoric Thera at Fira in June 2015.",
        "In the same room ran a six-metre miniature frieze of a flotilla, eight big oared ships and three small ones, with dolphins leaping between them. And the town's rubbish tells its own story: Mylona's study of the bones found an elaborate process for preserving red porgy, and a bundled fishing net survived in the ash.",
        "When did it happen? The old fight between radiocarbon at about 1600 BC and pottery at about 1500 BC has narrowed to a debate inside the sixteenth century. An olive branch buried alive gave 1627 to 1600 BC in 2006; re-measured calibration widened that to 1600 to 1525; and a 2023 study of an olive shrub on Therasia favours the middle of the century, around 1560 to 1540 BC. Still unresolved."
      ],
      sources: [
        { title: "Thera Foundation, the Fisherman fresco", url: "https://therafoundation.org/akrotiri-frescoes/akrotiri-fisherman-fresco" },
        { title: "World History Encyclopedia, the Akrotiri frescoes", url: "https://www.worldhistory.org/article/673/akrotiri-frescoes/" },
        { title: "Mylona 2016, Kentro 19 (fish bones, the Akrotiri net)", url: "https://instapstudycenter.net/wp-content/uploads/2016/09/Vol-19-Kentro-2016-Fall.pdf" },
        { title: "Friedrich et al. 2006, Science 312 (olive branch, 1627–1600 BC)", url: "https://www.science.org/doi/10.1126/science.1125087" },
        { title: "Species guide: dolphinfish, kynigos or lampouka (research/06-species.md)", url: "fishes.html#dolphinfish" },
        { title: "Pearson et al. 2023, Scientific Reports 13 (Therasia olive shrub)", url: "https://eprints.whiterose.ac.uk/id/eprint/199956/13/Olive%20shrub%20buried%20on%20Therasia%20supports%20a%20mid-16th%20century%20BCE%20date%20for%20the%20Thera%20eruption.pdf" }
      ] },
    { place: "crete", era: "c. 2000–1450 BC", title: "Minoan Crete: bronze hooks, lead sinkers, purple from shells",
      fishes: ["dusky-grouper", "dentex", "octopus", "parrotfish"],
      text: [
        "Crete is where Aegean fishing first looks like a trade. At Gournia, dug by Harriet Boyd Hawes in 1901 to 1904, well-made metal hooks came out with a lead sinker for a line and stones for weighting nets. At Mochlos, the Late Minoan IB town of about 1500 to 1450 BC, Dimitra Mylona counted 852 fish bones and 5,865 seashells from at least thirteen fish families, from damselfish under ten centimetres to grouper and dentex near a metre. Most were inshore shoal fish taken with cast nets; what set Mochlos apart was the number of big bottom fish, groupers, dentex, red porgy, parrotfish, taken with hooks and lines or harpoons in deeper water. A bronze hook lay on a Late Minoan IB floor.",
        "Lead net sinkers, strips folded over a line, are known from the Middle Bronze Age onward across the eastern Mediterranean. One trap for the unwary: bronze does not mean Bronze Age. Three bronze hooks from Kommos were first published as Minoan and later shown to come from Geometric, Hellenistic and Roman levels.",
        "The sea is all over the pottery. The Marine Style of about 1500 to 1450 BC covers whole vases with octopus, argonauts and dolphins; the octopus flask from Palaikastro in the Heraklion museum is the masterpiece. And the Minoans were already crushing murex shells for purple dye on Kouphonisi and at Palaikastro from about 2000 to 1600 BC, centuries before the Phoenicians made Tyre famous for it.",
        "Then, around 1450 BC, the Minoan towns burned, and the fishing record grows thinner for the next seven centuries."
      ],
      sources: [
        { title: "Mylona 2016, On fish bones, seashells, fishermen and seaside living at LM IB Mochlos, Kentro 19", url: "https://instapstudycenter.net/wp-content/uploads/2016/09/Vol-19-Kentro-2016-Fall.pdf" },
        { title: "Rose, The fish remains, Kommos IV (bronze hooks not Minoan; lead sinkers)", url: "https://utoronto.scholaris.ca/server/api/core/bitstreams/da89e455-5c1d-4616-8434-61a1b1aca206/content" },
        { title: "Heraklion Archaeological Museum, Marine Style flask", url: "https://heraklionmuseum.gr/en/exhibit/marine-style-flask/" },
        { title: "Stieglitz 1994, The Minoan origin of Tyrian purple, Biblical Archaeologist 57", url: "https://www.researchgate.net/publication/261818482_The_Minoan_Origin_of_Tyrian_Purple" },
        { title: "Castleden, Minoans: Life in Bronze Age Crete (Gournia hooks)", url: "https://erenow.org/ancient/LifeinBronzeAgeCrete/17.php" }
      ] },
    /* ---------------- II. Homer to the Hellenistic kings ---------------- */
    { place: "euboea", era: "c. 700 BC", title: "Homer's hooks and Hesiod's calendar",
      text: [
        "The heroes of the Iliad and the Odyssey never eat fish at table. Plato noticed it: Homer, he says, feeds his soldiers on roast meat, never fish. Only Menelaus's marooned men on Pharos fish, with bent hooks, because hunger pinched their bellies. But the poet knew the gear. Patroclus hauls a man from his chariot the way an angler on a rock drags a fish ashore with line and gleaming hook of bronze. Iris dives into the sea like a plummet of lead set on an ox-horn, the horn being a guard over the line above the hook. Scylla plucks six men off the ship like a fisherman with a long rod. And the dead suitors lie heaped like fish hauled up a curving beach in a many-meshed net.",
        "Hesiod, a farmer from Boeotia who distrusted the sea, made, by his own account, only one sea voyage: across the narrow water from Aulis to Chalcis on Euboea, the island engraved here as Negrepont, to sing at the games of Amphidamas. He won a tripod. His Works and Days gives the first Greek sailing calendar: haul the ship ashore when the Pleiades set in autumn, sail fifty days after the solstice, and never put all your goods in hollow ships.",
        "Across the strait from Euboea, at Anthedon, the fisherman Glaucus ate a magic grass and became a sea-god who foretold the future to sailors. Pausanias says seafaring men still told tales of him every year. Archestratus adds that Anthedon's hake grows to a goodly size but is rather spongy."
      ],
      quote: { text: "As when a man sitting upon a jutting rock draggeth to land a sacred fish from out the sea, with line and gleaming hook of bronze.", cite: "Iliad 16.406–408, trans. A. T. Murray" },
      sources: [
        { title: "Iliad 16 (Perseus, Murray translation)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D16%3Acard%3D394" },
        { title: "Odyssey 22 (Perseus): the suitors like netted fish", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D22%3Acard%3D378" },
        { title: "Plato, Republic 404b–c (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0168%3Abook%3D3%3Asection%3D404c" },
        { title: "Hesiod, Works and Days 618–694 (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0132%3Acard%3D618" },
        { title: "Pausanias 9.22 on Glaucus of Anthedon (Perseus)", url: "https://www.perseus.tufts.edu/hopper/xmlchunk?doc=Perseus%3Atext%3A1999.01.0160%3Abook%3D9%3Achapter%3D22" }
      ] },
    { place: "bosporus", era: "600–300 BC", title: "Byzantium, mother-city of the tuna",
      fishes: ["bluefin-tuna", "bonito", "swordfish", "mackerel", "parrotfish"],
      text: [
        "At the top right corner of the plate the Archipelago narrows toward the Hellespont. The city itself is off the sheet: beyond that corner lie the Sea of Marmara and Byzantium, and that is where the tuna were. From about 600 BC the city of Kyzikos on the Marmara struck electrum coins with a tunny under whatever else was on the face, for three centuries: the oldest tuna coins in the world. Archestratus calls Byzantium the she-tunny's mother-city and sends his friend there for tail-cuts of tuna, swordfish, bonito wrapped in fig leaves, and parrotfish with a back as broad as a shield.",
        "Strabo, writing centuries later, explains why. The young tuna, born in the Sea of Azov, run down the Asian shore, and at the Bosporus a white rock on the Chalcedon side frightens them across to the Golden Horn, where they were caught even by hand and provided the Byzantines and the Roman people considerable revenue. The Chalcedonians got nothing, which is why the oracle had called them blind for choosing that shore.",
        "The catch was organised. Inscriptions from Kyzikos record a partnership of eleven men with a rented watchtower, fish-watchers, boatmen and net-pullers. The salt fish went everywhere. Hermippus lists mackerel and salt fish from the Hellespont among the imports of Athens in the 420s BC, and Polybius counts preserved fish with honey, wax and slaves among the goods that came out of the Black Sea."
      ],
      quote: { text: "Have a tail-cut from the she-tunny, the large she-tunny, I repeat, whose mother-city is Byzantium.", cite: "Archestratus, quoted by Athenaeus 7.303" },
      sources: [
        { title: "Strabo 7.6.2 on the Golden Horn (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0198%3Abook%3D7%3Achapter%3D6%3Asection%3D2" },
        { title: "Kyzikos electrum with tunny (Wildwinds catalogue)", url: "https://www.wildwinds.com/coins/greece/mysia/kyzikos/t.html" },
        { title: "Çoruh Kurt 2025, tuna fishing and watchtowers in the Propontis (Oannes 7.1)", url: "https://dergipark.org.tr/en/download/article-file/4485254" },
        { title: "Polybius 4.38 (LacusCurtius)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Polybius/4*.html" }
      ] },
    { place: "franchthi", era: "c. 520 BC", title: "Purple from Hermione, and a town called Fishermen",
      text: [
        "The Argolid coast around Franchthi was famous in antiquity for something the Minoans had started: purple. When Alexander took Susa in 331 BC, Plutarch says, he found five thousand talents' weight of purple from Hermione that had been stored there for a hundred and ninety years and still kept its colours fresh and lively. That puts an Archaic Hermionian dye industry supplying the Persian court around 520 BC.",
        "Aristotle explains the trade: the murex gather in spring to spawn, fishermen take them then in creels, and the dye lies in a gland between the 'poppy' and the neck. Next door to Hermione was a port whose citizens, Strabo says, took their name from their fisheries. It was called Halieis, the Fishermen."
      ],
      sources: [
        { title: "Plutarch, Alexander 36 (LacusCurtius)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Alexander*/5.html" },
        { title: "Aristotle, History of Animals 5.15 (MIT Classics)", url: "https://classics.mit.edu/Aristotle/history_anim.5.v.html" },
        { title: "Wikipedia, Halieis (with Strabo 8.6.11)", url: "https://en.wikipedia.org/wiki/Halieis" }
      ] },
    { place: "kythera", era: "5th century BC – 2nd century AD", title: "Porphyris, the purple island",
      fishes: ["gilthead-bream"],
      text: [
        "Pliny records that Kythera, the island Venice would call Cerigo, was once named Porphyris, the purple island. Pausanias says the best purple shellfish after the Phoenician sea are found on the coast of Laconia, just across the strait, and Pliny agrees: in Europe the best purple is Laconian. The attribution of the Kytheran fishery to Phoenicians is a translator's note, not Pliny's.",
        "An Athenian comic poet called gilt-head bream the sacred attributes of Aphrodite of Cythera, a pun on the fish's Greek name, chrysophrys, the golden-browed. It is still the tsipoura on every taverna menu."
      ],
      sources: [
        { title: "Pliny, Natural History 4.19 (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D4%3Achapter%3D19" },
        { title: "Pausanias 3.21.6 (ToposText)", url: "https://topostext.org/work/213" },
        { title: "Pliny, Natural History 9.60 (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D9%3Achapter%3D60" },
        { title: "Athenaeus, Deipnosophistae book 7 (ToposText), Archippus on the gilt-head", url: "https://topostext.org/work/218" }
      ] },
    { place: "athens", era: "425–330 BC", title: "The fish market, where Athenians turned to stone",
      fishes: ["bluefin-tuna", "eel", "red-mullet"],
      text: [
        "Classical Athens was a city obsessed with fish. The word opson meant anything eaten with bread, and it came to mean fish above all; an opsophagos was a fish-fiend, and Socrates in Xenophon's Memorabilia teases a man for eating his opson without bread. Fresh fish was the luxury, bought in public in the agora. Salt fish was what everyone else ate.",
        "The comic poets left a whole gallery of fishmongers. Antiphanes: one glance at the fishmongers and I am turned to stone, when I see what a small fish it is for which they charge such a price. Alexis: how is it they are not all rich, since they receive royal tributes? A law is invented under which a fishmonger who sells below his first-named price goes to jail. Another poet has them stage a fake brawl so a bystander drenches the stale fish shouting 'water, water', since sprinkling it was illegal. In Aristophanes' Acharnians of 425 BC a general's slave offers three drachmas for a single Copaic eel, from the lake in Boeotia that Archestratus said bore a mighty repute, large and wonderfully fat, the eel being king of all viands at the feast. The city appointed fish-inspectors.",
        "On the coast of Attica the people of Halai, probably the Attic coastal deme, offered Poseidon the first tuna of a good catch, a gift called the thynnaion. Sailors at Aexone honoured Hecate with red mullet. And Plato, in the Laws, would let fishermen work all waters except harbours and sacred rivers, on one condition: no muddying juices. Poisoning the water was already worth forbidding in the fourth century BC."
      ],
      quote: { text: "Whenever I go to market ... one glance there at the fishmongers, and I am straightway turned to stone.", cite: "Antiphanes, Brave Lads, quoted by Athenaeus 6.224" },
      sources: [
        { title: "Athenaeus, Deipnosophistae book 6 on fishmongers (ToposText)", url: "https://topostext.org/work/218" },
        { title: "Aristophanes, Acharnians 880–962 (ToposText)", url: "https://topostext.org/work/57" },
        { title: "Xenophon, Memorabilia 3.14 (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0208%3Abook%3D3%3Achapter%3D14" },
        { title: "Plato, Laws 823–824 (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0166%3Abook%3D7%3Asection%3D823e" },
        { title: "James Davidson, Courtesans and Fishcakes (1997)", url: "https://press.uchicago.edu/ucp/books/book/chicago/C/bo11541590.html" }
      ] },
    { place: "thasos", era: "c. 350 BC", title: "Archestratus eats his way round the Archipelago",
      fishes: ["bluefin-tuna", "red-mullet", "dolphinfish", "octopus", "spiny-lobster", "scorpionfish"],
      text: [
        "Around 350 BC a Sicilian Greek named Archestratus of Gela wrote a mock-epic poem on where to buy the best fish, having, as Athenaeus says, diligently traversed all lands and seas testing the delights of the belly. About sixty fragments survive, all quoted by Athenaeus. It is the oldest guide to the fish of the sea on this plate.",
        "On Thasos, engraved here as Tasso: octopus, best in Thasos and Caria; a scorpionfish, but not one bigger than your arm's length; and a red mullet that is not bad. At Chalcis on Euboea, ox-tongue in summer. At Karystos on the southern tip of Euboea, the best dolphinfish anywhere, as in general Carystus is a region very rich in fish, and good tuna too. At Delos and Eretria, sea bream at the rising of Sirius, but only the head and tail. At Delos or Tenos, a fish he calls the liver-fish. Crete he mentions only to warn that a fish caught there arrives thin and tough and wave-battered. And from the comic poet Antiphanes: crawfish from Skyros.",
        "The Cycladic islands on the map, Milos, Paros, Naxos, Mykonos, Kea, Santorini, and Aegina and Kythera besides, get no fragment at all. Byzantium, on the other hand, gets six."
      ],
      quote: { text: "In Thasos buy the sculpin, if it be not bigger than thine arm's length; from one too large keep thy hands away!", cite: "Archestratus, quoted by Athenaeus, book 7" },
      sources: [
        { title: "Athenaeus, Deipnosophistae book 7, all Archestratus fragments (ToposText)", url: "https://topostext.org/work/218" },
        { title: "Olson & Sens, Archestratos of Gela (Oxford 2000), the standard edition", url: "https://searchworks.stanford.edu/view/4365016" },
        { title: "Wilkins & Hill, Archestratus: Fragments from the Life of Luxury (review, BMCR)", url: "https://bmcr.brynmawr.edu/2011/2011.12.49/" }
      ] },
    { place: "lesbos", era: "c. 345–343 BC", title: "Aristotle at the lagoon",
      fishes: ["bluefin-tuna", "bonito", "sponge"],
      text: [
        "After Plato died, Aristotle left Athens and spent about two years on Lesbos, the big unlabelled island on the Asian shore at the right edge of the plate, studying the animals of the lagoon of Pyrrha, usually identified with today's Gulf of Kalloni. A good deal of what he records came from fishermen, and much of his History of Animals is what a fisherman on this sea still knows.",
        "He knew the tuna and bonito went into the Black Sea in summer and came out in autumn, and that they swam in keeping the shore on their right and out with it on their left. The explanation he passed on, that the tuna sees better with its right eye, is folk biology, but Bosporus fishermen in the twentieth century confirmed the counter-clockwise route. He records that when the young tuna failed for a year the full-grown fish failed the next summer, which the fishermen used to work out the fish's age.",
        "He describes dolphin drives, and how netsmen keep silent with oar and net until the net is set far off, then clatter stones to frighten the shoal into it. He sorts sponges into three kinds and notes that those off Cape Malea differ by exposure. And in the strait of Pyrrha he records the earliest notice of overfishing by dredge: the clam was exterminated, partly by the dredging-machine used in their capture.",
        "In the Politics he counts fishermen as a distinct class of the people, particularly numerous at Tarentum and Byzantium."
      ],
      quote: { text: "Tunny-fish swim into the Euxine keeping the shore on their right, and swim out of it with the shore upon their left.", cite: "Aristotle, History of Animals 8.13, trans. D'Arcy Thompson" },
      sources: [
        { title: "Aristotle, History of Animals book 8 (MIT Classics)", url: "https://classics.mit.edu/Aristotle/history_anim.8.viii.html" },
        { title: "Aristotle, History of Animals book 4, dolphin drives and netting (MIT Classics)", url: "https://classics.mit.edu/Aristotle/history_anim.4.iv.html" },
        { title: "Aristotle, History of Animals book 6, tuna life history (MIT Classics)", url: "https://classics.mit.edu/Aristotle/history_anim.6.vi.html" },
        { title: "Aristotle, Politics 1291b (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0058%3Abook%3D4%3Asection%3D1291b" },
        { title: "Armand Leroi, The Lagoon: How Aristotle Invented Science (2014)", url: "https://www.everand.com/book/769190854/The-Lagoon-How-Aristotle-Invented-Science" }
      ] },
    { place: "sifnos", era: "3rd century BC", title: "A doctor from Sifnos on salt fish",
      fishes: ["bluefin-tuna", "mackerel"],
      text: [
        "The Greeks' everyday fish was not fresh but salted, tarichos, and the ancient authority on it was a physician from this island, Diphilus of Siphnos, who wrote in the third century BC. Athenaeus quotes him at length: salt fish has little nourishment or juice, is dry, easily digested and provokes the appetite; the aged sorts are superior, being more pungent, particularly the Byzantine.",
        "Archestratus had his own grades: Sicilian tuna salted in season, a mackerel three days out of the water before it enters the pickle, and the horaion of Byzantium, good and luscious. The saperdes from the Black Sea he would consign to the lowest regions, together with all who praise it."
      ],
      sources: [
        { title: "Athenaeus, Deipnosophistae book 3, the salt-fish section with Diphilus of Siphnos (ToposText)", url: "https://topostext.org/work/218" },
        { title: "Wilkins, fish in the ancient Greek diet (Black Sea Studies 2)", url: "https://antikmuseet.au.dk/fileadmin/www.antikmuseet.au.dk/Pontosfiler/BSS_2/BSS2_02_wilkins.pdf" }
      ] },
    { place: "delos", era: "250–88 BC", title: "Delos: a tithe on fish and a poor rocky soil",
      fishes: ["monk-seal"],
      text: [
        "In the Homeric Hymn to Apollo the island of Delos frets that the god will scorn her for her hard, rocky soil, and that many-footed creatures of the sea will make their lairs in her and black seals their dwellings undisturbed. Leto promises she will be fed from the hand of strangers. That is exactly what happened. Delos became a free port, the greatest market in the Aegean; Strabo says it could receive and sell ten thousand slaves in a day, and that the general festival was a kind of commercial affair frequented by Romans more than anyone. Mithridates' generals ruined it in 88 BC.",
        "The temple accounts show the island had a real fishery. A tithe on fish yielded 1,850 drachmas in 250 BC, and on one scholar's estimate the islanders ate something like eighteen to thirty-six kilos of seafood a head each year.",
        "The Hellenistic poets give the clearest picture of a working fisherman's kit. In one epigram Diophantus dedicates to Poseidon his hook, his long poles, his line, his creels, his weel, his sharp trident and the two oars of his boat. Another lists a purse-seine, a round weel, the float that marks where the weels are hidden, and a long cane rod with a horse-hair line. A third records the tomb of Theris, seine-hauler and prober of crevices in the rocks, set up not by his family but by the guild of his fellow fishermen."
      ],
      quote: { text: "Poverty alone awakens the arts, Diophantus; it is the teacher of toil.", cite: "[Theocritus], Idyll 21, the fishermen" },
      sources: [
        { title: "Homeric Hymn to Apollo 47–77 (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0138%3Ahymn%3D3%3Acard%3D47" },
        { title: "Strabo 10.5.4 on Delos (LacusCurtius)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/10E*.html" },
        { title: "Lytle 2013, Fishing and the economy of Hellenistic Delos", url: "https://www.academia.edu/3391001/" },
        { title: "Greek Anthology book 6, fishermen's dedications (Attalus)", url: "https://www.attalus.org/poetry/anth6.html" },
        { title: "Leonidas of Tarentum, epigrams (Attalus)", url: "https://www.attalus.org/poetry/leonidas.html" },
        { title: "Theocritus, Idyll 21 (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0228%3Atext%3DId.%3Apoem%3D21" }
      ] },
    /* ---------------- III. Rome, Byzantium, Venice and the Porte ---------------- */
    { place: "samothrace", era: "date unknown", title: "The sacred fish of Samothrace",
      fishes: ["eel"],
      text: [
        "Some fish were not to be caught. A poet named Pancrates wrote that the pompilos, the pilot-fish that follows ships, which voyagers of the deep call the sacred fish, is honoured not only by Poseidon but by the gods who preside over Samothrace, the island of the mysteries engraved here as Samandrachi. A fisherman called Epopeus, from the island of Ikaros, ate one and was punished for it.",
        "Homer's angler, too, hauls up a sacred fish, a phrase already puzzled over in antiquity. The Boeotians went the other way and sacrificed their giant eels, garlanded and sprinkled with barley like any other victim."
      ],
      sources: [
        { title: "Athenaeus, Deipnosophistae 7.283 (Pancrates) and 7.297 (Agatharchides on eel sacrifice), ToposText", url: "https://topostext.org/work/218" }
      ] },
    { place: "crete", era: "c. AD 100–200", title: "Rome's fish tanks on the Cretan shore",
      fishes: ["bluefin-tuna"],
      text: [
        "Under the empire the sea on this plate became a Roman lake, and a Roman fashion reached it: the saltwater fish tank. Pliny records that Sergius Orata invented oyster ponds on the Gulf of Baiae and Licinius Murena fishponds for every other fish; Lucullus cut a channel through a mountain to let the sea into his, and the orator Hortensius wept when his pet lamprey died. Cicero mocked the lot of them as piscinarii, fishpond men.",
        "On Crete the fashion left marks that survive. Rock-cut Roman fish tanks at Matala, Chersonissos and Mochlos, and a fish trap at Zakros, now lie a metre or more under water, which is why geologists use them to measure how the sea has risen since the second century. They were holding tanks, not salting works. No Roman fish-salting works has been excavated so far in the Aegean islands or mainland Greece; the great vat complexes are in Spain, Italy, North Africa and the Black Sea, and the one town in the region Pliny names for garum is Clazomenae, on the Ionian coast. A Greek recipe for garum survives all the same, in a tenth-century Byzantine farming book: fish guts and small fry salted in a jar and turned in the sun for two or three months, the best kind made from tuna entrails and blood."
      ],
      sources: [
        { title: "Pliny, Natural History 9.79–81 (Attalus)", url: "https://www.attalus.org/pliny/hn9b.html" },
        { title: "Mourtzas 2012, Fish tanks of eastern Crete as indicators of the Roman sea level, Journal of Archaeological Science 39", url: "https://www.sciencedirect.com/science/article/abs/pii/S0305440312000702" },
        { title: "Lytle 2018, The economics of saltfish production in the Aegean, Journal of Maritime Archaeology 13", url: "https://link.springer.com/article/10.1007/s11457-018-9207-1" },
        { title: "Geoponica book 20 (Owen 1805 translation), the garum recipe", url: "https://archive.org/details/b22041072_0002" },
        { title: "Pliny, Natural History 31.43 on garum (Perseus)", url: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=31:chapter=43" }
      ] },
    { place: "euboea", era: "c. AD 180–220", title: "Fire on the water: Oppian, and the dolphins of Euboea",
      fishes: ["sponge"],
      text: [
        "The fullest fishing manual antiquity produced is a poem. Oppian of Cilicia wrote the Halieutica, 3,606 hexameters in five books, for Marcus Aurelius and Commodus around AD 177 to 180. The fisherman, he says, must be swift and strong, cunning, daring, temperate, keen-sighted, able to endure winter and the thirsty season of Sirius, and must be fond of labour and must love the sea. His four modes of fishing, hook, net, weel and trident, were still the four modes of the Aegean in the twentieth century. He describes the tuna-watcher on the hill, the nets set out in the waves like a city, the sponge-cutter going down with a lead weight, a sickle and oil in his mouth to spit out and see by, and the fish that rush about the boat at night, dazzled by the oily flame of pine, to meet the trident.",
        "A generation later Aelian set that night fishing here, on Euboea, in the earliest description of pyrofani placed in Aegean waters. In calm weather the fishermen hang hollow braziers of fire from the prow, which they call lanterns; the fish are dazzled and easily harpooned; and the dolphins, seeing the fire lit, drive the fish in from the outskirts while the men row softly. The fishermen, he says, loyally and gratefully resign to their comrades in the chase their just portion. Oppian for his part thought hunting dolphins was immoral.",
        "Aelian also gives the first artificial fly in literature, tied on a Macedonian river with scarlet wool and two cock's feathers the colour of wax, on a six-foot rod with a six-foot line."
      ],
      quote: { text: "Then do the fishes exulting in the oily flame of pine rush about the boat and, to their sorrow seeing the fire at even, meet the stern blow of the trident.", cite: "Oppian, Halieutica 4.635–646, trans. A. W. Mair" },
      sources: [
        { title: "Oppian, Halieutica book 3, the fisher's virtues and the four modes (LacusCurtius)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Oppian/Halieutica/3*.html" },
        { title: "Oppian, Halieutica book 4, torch fishing (LacusCurtius)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Oppian/Halieutica/4*.html" },
        { title: "Oppian, Halieutica book 5, sponge-cutters and dolphins (LacusCurtius)", url: "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Oppian/Halieutica/5*.html" },
        { title: "Aelian, On Animals 2.8, the fishermen and dolphins of Euboea (Attalus)", url: "https://www.attalus.org/translate/animals2.html" },
        { title: "Aelian, On Animals 15.1, the Macedonian fly (Attalus)", url: "https://www.attalus.org/translate/animals15.html" },
        { title: "Kneebone, Oppian's Halieutica: Charting a Didactic Epic (Cambridge 2020)", url: "https://www.cambridge.org/core/books/oppians-halieutica/570A23145EA31B950D8AE82B2E4E90CB" }
      ] },
    { place: "bosporus", era: "895–968", title: "Constantinople: the Eparch's fishmongers",
      fishes: ["bluefin-tuna", "octopus", "spiny-lobster", "scorpionfish"],
      text: [
        "Byzantium never stopped being a fish city. Around 895 the emperor Leo VI issued the Book of the Eparch, regulations for the guilds of Constantinople, and chapter seventeen is the fishmongers. Every market was to have a master who knew the price paid at sea and the price paid ashore. Fishmongers had to buy from the boats once they had made fast, not out on the water, and were forbidden to salt fish for export. Every day at daybreak the masters went to the Eparch with the number of white fish, the high-grade fish, tuna and the like, caught in the night, so that prices could be fixed. Anyone who broke the rules was flogged, shaved and expelled from the guild.",
        "Of Leo's hundred and twenty novels, a legal writer around 1080 noted that not all were still in use; the ones that were concerned the distances between fishing nets, and between pieces of land. The fixed-net stations of the Bosporus, the epochai, were regulated property, and their Ottoman successors, the dalyans, were still being farmed out for tax in the eighteenth century.",
        "His son's court compiled the Geoponica for Constantine VII, whose twentieth book is all fish: how to bring fish to one place with bait balls of pennyroyal, marjoram, myrrh and roasted hog's liver, how to make weels, baits for mullet, scorpionfish, bream, garfish, tuna, rays, octopus and lobster. And in 968 the bishop Liutprand of Cremona, an unhappy ambassador, complained that the emperor's dinner was washed down with oil after the manner of drunkards and moistened with an exceedingly bad fish liquor. It was garum, still on the emperor's table in the tenth century.",
        "Botargo is a Byzantine word too: ootarichon, salted egg, first written down by the physician Simeon Seth in the eleventh century, who advised avoiding it totally."
      ],
      quote: { text: "Let the masters of the guild of fishmongers go every day at daybreak to inform the eparch of the number of white fish caught during the night so that sales may be effected in town at the prices fixed by the eparch.", cite: "Book of the Eparch, ch. XVII §4, trans. E. H. Freshfield" },
      sources: [
        { title: "Book of the Eparch, Freshfield 1938 translation (University of Illinois)", url: "https://brittlebooks.library.illinois.edu/brittlebooks_closed/Books2009-03/0001romlaw/0001romlaw.pdf" },
        { title: "Chitwood, Byzantine Legal Culture and the Roman Legal Tradition (Cambridge 2017), on Leo VI's fishing novels", url: "https://www.cambridge.org/core/books/byzantine-legal-culture-and-the-roman-legal-tradition-8671056/cleansing-of-the-ancient-laws-under-basil-i-and-leo-vi/0F03BA8BAF8AFBD2973BBE743B7DB459" },
        { title: "Geoponica book 20 (Owen 1805)", url: "https://archive.org/details/b22041072_0002" },
        { title: "Liutprand of Cremona, Embassy to Constantinople (Fordham sourcebook)", url: "https://sourcebooks.fordham.edu/source/liudprand1.asp" },
        { title: "Kalaycı 2025, fish consumption in Istanbul from Byzantium to the Ottomans", url: "https://dergipark.org.tr/en/download/article-file/5213859" },
        { title: "Wiktionary, botargo", url: "https://en.wiktionary.org/wiki/botargo" }
      ] },
    { place: "naxos", era: "1207–1579", title: "The Duchy of the Archipelago",
      text: [
        "The word on the map, Archipel, was for three and a half centuries the name of a state. In 1207, three years after the Fourth Crusade broke Byzantium, the Venetian Marco Sanudo took eight galleys borrowed from the Arsenal and made himself Duke of the Archipelago at Naxos, the island engraved here as Nixia. The Sanudi ruled until 1383, the Crispi after them. Mykonos and Tinos went to the Ghisi, Crete to Venice itself, Euboea to Venice as Negroponte.",
        "The Turks took it apart piece by piece. Negroponte fell to Mehmed II on 12 July 1470 after a month's siege and three days' sack. Barbarossa made the duchy tributary in 1537 and took the Sporades in 1538. In 1566 Selim II deposed the last Latin duke and handed the islands to his financier, the Portuguese-born Jew Joseph Nasi, and on Nasi's death in 1579 Murad III annexed them outright. When the plate was printed in 1683 only Tinos, Kythera and three fortress-islets off Crete were still Venetian; Tinos held until 1715, Kythera until 1797.",
        "No Venetian fishing law or fish tithe for Crete or the islands has come to light. What the Latin lords left behind is in the language: the trata, the beach seine and the boat that hauls it, is Venetian trata, from Italian tratto and Latin tractus, dragged."
      ],
      sources: [
        { title: "Wikipedia, Duchy of the Archipelago", url: "https://en.wikipedia.org/wiki/Duchy_of_the_Archipelago" },
        { title: "Wikipedia, Siege of Negroponte (1470)", url: "https://en.wikipedia.org/wiki/Siege_of_Negroponte_(1470)" },
        { title: "Wikipedia, Tinos (Venetian until 1715)", url: "https://en.wikipedia.org/wiki/Tinos" },
        { title: "Wiktionary, τράτα", url: "https://en.wiktionary.org/wiki/τράτα" }
      ] },
    { place: "tinos", era: "1390–1715", title: "Tine: the last Venetian island",
      text: [
        "In 1683 nearly every island on this plate was Ottoman. Tinos was not. The Ghisi held it from 1207 and left it to Venice in 1390, and Venice kept it until an Ottoman fleet took it in 1715. It was the last Venetian island in the Aegean. Mallet marks the fort on it, une Forteresse qui appartient aux Venitiens, and notes that the ancient Tenos gave the modern Tine. Older writers called the island Hydroussa, the watery, for its springs, and Ophioussa, the snaky.",
        "Seventeen years after the plate was printed Tournefort came through and found the island doing well on one commodity: the riches of Tinos consists at present in its silk, and the silk went to Venice without paying duty. Andros next door lived on silk too. Fifteen years after that, Tinos, Aegina and the three Venetian forts off Crete all went in the same war, and nothing Venetian was left in this sea but Kythera, which held until 1797.",
        "For the water itself there is one old line. Archestratus tells his friend Moschus to buy a lebias, the liver-fish, when he is in Delos or Tinos, washed by the sea all about. Which fish the lebias was, nobody has established. That is the only time the island appears in the poem."
      ],
      quote: { text: "Buy a lebias, the liver-fish, Moschus, when you are in Delos or Tenos, washed by the sea all about.", cite: "Archestratus, quoted by Athenaeus 7.301" },
      sources: [
        { title: "Wikipedia, Tinos (Ghisi, Venice, the capture of 1715)", url: "https://en.wikipedia.org/wiki/Tinos" },
        { title: "Greeka, History of Tinos (Venetian until 1715)", url: "https://www.greeka.com/cyclades/tinos/history/" },
        { title: "Tournefort, A Voyage into the Levant (1718), vol. 1, Internet Archive", url: "https://archive.org/details/voyageintolevant01tour" },
        { title: "Athenaeus, Deipnosophistae book 7, the Archestratus fragments (ToposText)", url: "https://topostext.org/work/218" }
      ] },
    { place: "thessaly", era: "1392 onward", title: "Thessalie: the shore behind the islands",
      text: [
        "Thessalie is a country, not an island, engraved on the mainland at the left of the sheet with the Sporades lying off it. The name comes from a tribe, the Thessaloi; what the word meant is unknown and probably pre-Greek. Larissa fell to the Ottomans in 1392 or 1393, so by the time this plate was printed Thessaly had been Ottoman for close to three hundred years, longer than any island engraved on it.",
        "Its fishing record, in the sources behind this walk, sits offshore. Youra, where the oldest fish hooks yet found in the Aegean came out of the Cave of the Cyclops, is an uninhabited island in the municipality of Alonnisos, which is Thessaly; the cave is the largest in the Sporades. Mallet drew those islands as Pelagnisi and the Dromes, just off this coast. For the Thessalian mainland itself, and for the Pagasetic Gulf that cuts into it, nothing in these sources puts a hook, a net weight or a fish bone on the shore.",
        "The ancient writers give no more. Thessaly turns up once in Archestratus, in the proem, and it is a proverb about livestock rather than fish: seek out a mare from Thessaly, a wife from Sparta, and men who drink the water flowing in fair Arethusa. The poem that grades fish from Byzantium to Sicily has nothing to say about this coast."
      ],
      quote: { text: "Seek out a mare from Thessaly, a wife from Sparta, and men who drink the water flowing in fair Arethusa.", cite: "The proem of Archestratus, reported by Athenaeus 7.278" },
      sources: [
        { title: "Wikipedia, Thessaly (the Thessaloi; Ottoman from 1392–93)", url: "https://en.wikipedia.org/wiki/Thessaly" },
        { title: "Wikipedia, Gioura (Alonnisos municipality, Thessaly)", url: "https://en.wikipedia.org/wiki/Gioura" },
        { title: "Wikipedia, Cyclops Cave (Youra)", url: "https://en.wikipedia.org/wiki/Cyclops_Cave_(Youra)" },
        { title: "Athenaeus, Deipnosophistae book 7, the Archestratus proem (ToposText)", url: "https://topostext.org/work/218" }
      ] },
    { place: "skyros", era: "1453–1538", title: "Schiro: Achilles, and a crawfish on a shopping list",
      fishes: ["spiny-lobster"],
      text: [
        "Mallet says Skyros kept its ancient name, and then retells the story everyone attached to it: Achilles hidden among the daughters of Lycomedes, kept out of the way of the war. The plate gives the Italian form, Schiro. Where the name itself came from is not known; one account takes it from a word for broken stone, and that is a guess.",
        "The ancient record for its sea is a single line, and it is a shopping list. The comic poet Antiphanes, in the Sheep-owner, runs through the best of everything: Boeotian eels, mussels from Pontus, Megarian grey-fish, Carystian sprats, Eretrian breams, crawfish from Scyros. Archestratus, who worked his way round this sea island by island, never mentions Skyros at all. The crawfish is presumably the clawless spiny lobster, the astakos that still comes off rocky bottoms here in trammel nets and traps.",
        "Venice held the island from 1453. Barbarossa took it with Skopelos and Skiathos in 1538, and it was Ottoman when this plate was engraved. Its neighbours left a boatbuilding record and a cave full of fish bone. Skyros left nothing fishing-specific that the sources behind this walk could verify, ancient or modern, beyond that one crawfish."
      ],
      quote: { text: "Megarian grey-fish, Carystian sprats, Eretrian breams, crawfish from Scyros.", cite: "Antiphanes, Sheep-owner, quoted by Athenaeus 7.295" },
      sources: [
        { title: "Athenaeus, Deipnosophistae book 7, Antiphanes on the best of everything (ToposText)", url: "https://topostext.org/work/218" },
        { title: "Wikipedia, Skyros (Venetian 1453, Ottoman 1538)", url: "https://en.wikipedia.org/wiki/Skyros" },
        { title: "Mallet's own text on the Archipelago (Frankfurt 1686 reprint of the 1683 text)", url: "https://archive.org/details/gri_33125008769156" },
        { title: "Species guide: European spiny lobster, astakos (research/06-species.md)", url: "fishes.html#spiny-lobster" }
      ] },
    { place: "mykonos", era: "1537–1700", title: "Micone: an island almost deserted",
      text: [
        "Mykonos and Tinos travelled together for a long time. The Ghisi held both from 1207, then Venice from 1390. Mykonos went Ottoman in 1537; Tinos never did. Mallet says the island kept its ancient name, which myth gave it from Mykonos, a son of Anios and a grandson of Apollo, and then describes the town as presque desert, almost deserted, because of the frequent insults of the corsairs and the persecutions of the Turks.",
        "Tournefort, there in 1700, shows what that meant week to week. The Myconiots pastured their animals on Great Delos across the water, and because corsairs put in there for quarters of refreshment, the Myconiots transported their flocks back into their own island whenever they came. The corsairs called the Lesser Delos the School. Local histories also count Mykonos with Paros, Syros, Milos and Kimolos among the corsairs' markets and winter havens, though the evidence for that is thinner than Tournefort's own account.",
        "The island's best-known fisherman's story is modern. In the mid-1950s a Mykonos fisherman took in a great white pelican and nursed it back to health. The bird stayed, became the mascot of the harbour, and was killed by a car in December 1985. Every pelican on the waterfront since has been called Petros after him. The accounts disagree about the year he arrived and about which fisherman found him."
      ],
      quote: { text: "presque desert à cause des frequentes insultes des Corsaires & des persecutions des Turcs", cite: "Mallet on the town of Mykonos, Description de l'Univers, 1683" },
      sources: [
        { title: "Mallet's own text on the Archipelago (Frankfurt 1686 reprint of the 1683 text)", url: "https://archive.org/details/gri_33125008769156" },
        { title: "Tournefort, A Voyage into the Levant (1718), vol. 1, Internet Archive", url: "https://archive.org/details/voyageintolevant01tour" },
        { title: "Wikipedia, Mykonos (the Ghisi, Ottoman from 1537, the eponym)", url: "https://en.wikipedia.org/wiki/Mykonos" },
        { title: "Wikipedia, Petros (pelican)", url: "https://en.wikipedia.org/wiki/Petros_(pelican)" },
        { title: "Greeka, Petros the pelican of Mykonos", url: "https://www.greeka.com/cyclades/mykonos/sightseeing/petros-pelican/" }
      ] },
    { place: "kea", era: "1655", title: "Thévenot at Kea: a harbour full of fish, tribute to two masters",
      fishes: ["sponge", "cuttlefish"],
      text: [
        "In 1655, in the tenth year of the Cretan War, the French traveller Jean de Thévenot put in at Kea, the island engraved here as Zea, and found its harbour full of fish, which we often made tryal of with our nets. He also found the islanders paying tribute to both sides of the war: three thousand four hundred piastres a year to the Turks and two thousand six hundred to the Venetians, besides the extortions and robberies they met with, so that many were forced to abandon their homes. Candia would hold out another fourteen years, until 5 September 1669.",
        "Thévenot is the earliest modern witness we have to two things every Greek fisherman still lives by. The rules of Lent: in the first Lent the Greeks eat neither oil nor fish nor anything that has blood, but only herbs and shellfish and the cuttlefish whose blood is as black as ink, and at all times they are great eaters of fish. And naked sponge diving: on Ikaria, across the water, the islanders fished sponges from the bottom of the sea, no bachelor could marry unless he could dive eight fathoms, and they paid the Sultan their tribute in sponges, from which all Turkey was furnished. That is two centuries before the Symi tradition claims the stone-diving began."
      ],
      quote: { text: "These are a sort of people that seem to be fish, rather than men. They pay the Grand Signior their tribute in sponges, and from them all Turkie is furnished.", cite: "Jean de Thévenot on Ikaria, 1655, English edition of 1687" },
      sources: [
        { title: "Thévenot, Travels into the Levant (1687 English edition), Internet Archive", url: "https://archive.org/details/travelsofmonsieu00thev" },
        { title: "Wikipedia, Cretan War (1645–1669)", url: "https://en.wikipedia.org/wiki/Cretan_War_(1645%E2%80%931669)" },
        { title: "Baykara Taşkaya 2022, Symi and sponge hunting 1786–1909 (Ottoman archival order for 15,000 sponges)", url: "https://dergipark.org.tr/en/download/article-file/2352361" }
      ] },
    { place: "ios", era: "1676–1700", title: "Little Malta: the corsairs' Archipelago",
      text: [
        "This is the sea as it was when the plate was printed. In 1676 the villagers of Attica told George Wheler they had agreed, through the French consul, to pay Crevelier, the chief of the pirates of the Archipelago, a hundred and fifty measures of corn a year to be left in peace. Mallet himself writes of islands almost deserted because of the frequent insults of the corsairs.",
        "Tournefort, sailing through in 1700 just after Louis XIV had suppressed the French privateers, describes the world they had made. Ios, the island engraved here as Nio, was inhabited by thieves by profession, so that the Turks called it Little Malta, a harbour for most of the corsairs of the Mediterranean. Kimolos had been their rendezvous and was now wretchedly poor. Milos had been the principal fair of the Archipelago, where the corsairs brought in their prizes, and the Miliotes, good sailors, served as pilots to most ships trading there; the islanders still had in their mouths the heroic actions of Temericourt, Hugh Crevelier and the Chevalier d'Hoquincour. The Sifniots once paid a Provençal corsair at Milos to cannonade a boatload of Ottoman lead prospectors. The corsairs called the Lesser Delos the School, and the Myconiots moved their flocks off Delos whenever they came for quarters of refreshment.",
        "Tournefort's verdict: the famousest corsairs of the Archipelago had nothing odious but the name; they were men of quality and distinguished valour, and the Turks were more insolent than ever since their disappearance. A fisherman of 1683 worked in that sea, and fed both sides."
      ],
      quote: { text: "The inhabitants are all thieves by profession, and therefore the Turks call it Little Malta.", cite: "Tournefort on Ios, 1700, English edition of 1718" },
      sources: [
        { title: "Tournefort, A Voyage into the Levant (1718), vol. 1, Internet Archive", url: "https://archive.org/details/voyageintolevant01tour" },
        { title: "Wheler, A Journey into Greece (1682), Internet Archive", url: "https://archive.org/details/bim_early-english-books-1641-1700_a-journey-into-greece-_wheler-sir-george_1682" },
        { title: "Mallet's own text on the Archipelago (Frankfurt 1686 reprint of the 1683 text)", url: "https://archive.org/details/gri_33125008769156" }
      ] },
    { place: "naxos", era: "1700", title: "Tournefort's reed weirs, cedar torches and the rules of Lent",
      fishes: ["eel", "octopus", "cuttlefish"],
      text: [
        "Tournefort was a botanist sent by the king of France, and he looked at how people ate. At Naxos he found the harbour called the Port of the Fishpond, where they still caught abundance of mullets and eels by means of certain hurdles of reeds fastened together, folding like screens, with holes the fish enter and cannot leave. The fishery of Naxos, its customs and its saltpans were farmed together for eight hundred crowns. That is the island-sized version of the tax-farmed weirs of the Bosporus.",
        "At Amorgos he describes the pyrofani that Aelian had seen fifteen centuries earlier: the Greeks broke cedar into small pieces, laid it on a gridiron at the stern of their boat and burned it in the night to draw the fish to them by its light, then struck them with their tridents or three-forked javelins. The cedar came from Kaloyeros, Cheiro, probably Keros, Schinoussa and the neighbouring rocks.",
        "And he wrote down the fasting calendar as it still stands. In Great Lent, after the first week, the Greeks fed wholly upon shellfish and such other as they believe to be without blood, as are the polypus and the cuttlefish, together with salted roe of mullet and sturgeon, the mullet botargo prepared upon the coasts of Ephesus and Miletus; they ate fish on Palm Sunday and on the 25th of March, the Annunciation. The Christmas fast allowed fish except on Wednesdays and Fridays; the fast of the Virgin in August allowed it only on the Transfiguration, the sixth. Octopus on a fast day is not a loophole. It is three hundred years old at least."
      ],
      quote: { text: "They feed wholly upon shell-fish, and such other as they believe to be without blood, as are the polypus and the cuttle-fish.", cite: "Tournefort, A Voyage into the Levant, 1718, letter II" },
      sources: [
        { title: "Tournefort, A Voyage into the Levant (1718), vol. 1, Internet Archive", url: "https://archive.org/details/voyageintolevant01tour" },
        { title: "Tournefort, Relation d'un voyage du Levant (Paris 1717), French original on Gallica", url: "https://gallica.bnf.fr/ark:/12148/bpt6k1057564c.image" }
      ] },
    { place: "lesbos", era: "1739", title: "Pococke at Mytilene: pine ships and men eating bread and fish",
      text: [
        "Richard Pococke came through the eastern Aegean in 1737 to 1740 and wrote the plainest account of ordinary island fishing life before the Greek revolution. At Mytilene on Lesbos there was a great trade in building large ships and boats with the wood of pine, which they used even for the keels, with iron nails; the timber was brought over from the mainland, there being no place there secure from the corsairs for building. At Vathy on Samos the town lived by fishing and by exporting a white muscadine wine. On Psara, an open bay with no trade but wine, the people drew their little barks and boats up on the land, and some countrymen who were eating bread and fish called to him to take part with them.",
        "Koutali in the Marmara had been all vineyards and now, he noted, applied more to the fishing trade, paying four or five hundred dollars a year, the whole island rented by its Christian elders, as are most of the small islands, both in the Propontis and Archipelago."
      ],
      sources: [
        { title: "Pococke, A Description of the East, vol. II part 2 (1745), Internet Archive", url: "https://archive.org/details/b30456307_0005" }
      ] },
    { place: "aegina", era: "1774–1821", title: "Hydra, Spetses and the Russian flag",
      text: [
        "The Ottomans were not a naval people, and much of their fleet was crewed by Greeks doing their obligatory service; when the revolt broke out in 1821 the Porte arrested and executed the Greek sailors then serving in its navy. The turning point had come in 1774, when the Treaty of Küçük Kaynarca let Christian subjects of the Sultan trade under the Russian flag. The Saronic islands seized it. Hydra, a rock off the Argolid coast, built a merchant fleet of about a hundred and fifty ships by the early nineteenth century; Spetses, seized by the Ottomans in 1715 and then left to itself, had sixty ships, twenty-seven hundred seamen and nine hundred guns by 1813; Psara, by most accounts, was third. Running the British blockade of French ports during the Napoleonic wars made them rich, and their ships became the Greek navy of the War of Independence.",
        "The fishing boat of these islands, the trechandiri, the double-ender with the raised stem-head, is said by tradition to have been built first on Hydra in 1658 by two islanders who came home after capture by pirates. That is a story, not a dated fact. What is documented is that between 1843 and 1858 the yards of Spetses, Hydra and Koroni built more than a thousand of them."
      ],
      sources: [
        { title: "Economou, Kyriazis & Prassa 2016, The Greek merchant fleet as a national navy 1800–1830 (MPRA)", url: "https://mpra.ub.uni-muenchen.de/76414/1/MPRA_paper_76414.pdf" },
        { title: "Municipality of Hydra, the pre-revolutionary period", url: "https://www.hydra.gr/mobile/en_proepanastatikoi.html" },
        { title: "Compton, Traditional boats of Greece, WoodenBoat 247 (Damianidis on the trechandiri)", url: "https://www.naftotopos.gr/images/n_Articles/16001/TradlGreekBoats247-02.pdf" }
      ] },
    /* ---------------- IV. The modern sea ---------------- */
    { place: "sporades", era: "1833 onward", title: "Skiathos and Skopelos build the boats",
      text: [
        "In 1833 the elders of Skiathos allowed the felling of the thick forests above Kechria and intensive boatbuilding began, led by master builders who could not read or write and were praised in a report to the British Admiralty by a Captain James Kennedy. On Skopelos the Bountalas family is said to have built boats for seven generations, since Christodoulos Bountalas began in the early 1800s.",
        "The Greek Ministry of Culture lists the hull types that survive: the trechantiri, the perama, the varkalas, the gaita of Chania, the karavoskaro, the 'liberty', and the trata, the rowing boat named for the beach seine it hauled. The great 18th- and 19th-century innovation was the lofting floor, the sala, which let shipwrights build larger and more symmetrical hulls. By one account, from the 1920s most working boats were fitted with diesel engines, and by the 1950s few still sailed.",
        "Then the state paid to destroy them. Under EU fleet-reduction schemes a scrapped boat's wooden hull had to be broken up, and about eleven thousand boats have been lost in twenty-five years. A wooden boatbuilding school, Greece's first, opened on Samos in 2024."
      ],
      sources: [
        { title: "Hellenic Ministry of Culture, Intangible Cultural Heritage inventory: the craft of wooden shipbuilding", url: "https://ayla.culture.gr/wp-content/uploads/2016/11/Wooden_shipbuilding.pdf" },
        { title: "Municipality of Skiathos, Maritime history", url: "https://skiathos.gr/index.php/en/component/sppagebuilder/?view=page&id=288" },
        { title: "Greek News Agenda, wooden boatbuilding in Greece", url: "https://www.greeknewsagenda.gr/wooden-boatbuilding-greece/" },
        { title: "AP, Greek traditional wooden boat builders a dwindling craft (2021)", url: "https://www.dailyherald.com/20210720/news/greek-traditional-wooden-boat-builders-a-dwindling-craft/" }
      ] },
    { place: "aegina", era: "1863–1866", title: "The diving suit comes to Greece",
      fishes: ["sponge", "bluefin-tuna", "swordfish"],
      text: [
        "Sponges were fished naked for as long as anyone remembered: a diver went down holding a flat stone, the skandalopetra, of twelve to fifteen kilos, and worked a single breath, about thirty metres for three to five minutes. Then in 1863 to 1865 a Symiot seaman, Fotis Mastoridis, brought the hard-hat diving suit, the skafandro, home to Symi, and his wife Eugenia proved it by diving in the harbour. The suit spread through the Dodecanese within a year or two and to the islands of the Saronic Gulf, Aegina’s waters among them, from 1866.",
        "It let men work far deeper and far longer, years before anyone understood decompression. The figures that circulate are terrible and cannot be traced to a primary count: reportedly eight hundred dead and two hundred paralysed on Kalymnos alone between 1866 and 1895. The women of the islands petitioned the Sultan, who banned the suit in 1882. It was back within about four years.",
        "In 1905 about five hundred Dodecanese divers followed John Cocoris to Tarpon Springs, Florida, and by 1920 fifteen hundred Greeks lived there. A sponge disease swept the Aegean from 1986 and finished the fleet; Kalymnos turned its boats to tuna and swordfish."
      ],
      sources: [
        { title: "GreekReporter, Symi tribute to the first female diver in Greece (Jan 2026)", url: "https://greekreporter.com/2026/01/05/symi-tribute-first-female-diver-greece/" },
        { title: "Diving Heritage, Greek sponge diving (citing Warn, Bitter Sea, 2000)", url: "https://www.divingheritage.com/greecekern2.htm" },
        { title: "Wikipedia, John Cocoris", url: "https://en.wikipedia.org/wiki/John_Cocoris" },
        { title: "PLoS ONE 2011, sponge disease outbreaks in the Mediterranean", url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0020211" }
      ] },
    { place: "thasos", era: "1922–1923", title: "The refugees bring the gri-gri",
      fishes: ["anchovy", "sardine"],
      text: [
        "After the Asia Minor Catastrophe of 1922, well over a million refugees reached Greece and raised its population by about a quarter. Some were fishing people from the Marmara and the Anatolian coast, and in three documented places they changed how Greece fished. Refugees from Michaniona on the Sea of Marmara founded Nea Michaniona near Thessaloniki in 1923, still one of the north's main fish markets. Refugees from Şile on the Black Sea built their own boat, the chiliotissa, at Nea Chili near Alexandroupoli.",
        "At Limenaria on Thasos, the island engraved here as Tasso, local history credits refugee fishermen with bringing the gri-gri: a mother boat that tows a string of small lamp-boats, which scatter at night to draw anchovy and sardine under their lights, then the seiner circles the school and purses the net shut. The name is said to come from the rattle of the rings as the purse line runs; that etymology rests on a single local source.",
        "Anchovy and sardine remain the purse seiners' targets and the country's biggest catches. In 2025 the purse-seine fleet took half of everything landed in Greece."
      ],
      sources: [
        { title: "Politistikos Syllogos Kastrou, Thasos: the Partsolis boatyard and the gri-gri", url: "https://politistikostokastro.gr/topos-mas/to-nafpigeio-tou-i-n-partsoli/" },
        { title: "Hellenic Ministry of Culture ICH file (the chiliotissa of Nea Chili)", url: "https://ayla.culture.gr/wp-content/uploads/2016/11/Wooden_shipbuilding.pdf" },
        { title: "Touloumis et al. 2026, Frontiers in Marine Science (Greek catch reconstruction)", url: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2026.1766535/full" },
        { title: "Euronews, Greek marine fisheries 2025 (ELSTAT)", url: "https://www.euronews.com/business/2026/09/04/greek-marine-fisheries-2025-production-worth-1666-million-anchovy-dominates" }
      ] },
    { place: "milos", era: "20th century", title: "The syrmata of Klima",
      text: [
        "Go back to Milos one last time. At Klima, Mandrakia and Firopotamos the fishermen cut boat-houses straight into the soft volcanic rock, each just big enough for a six-metre boat, and the doors painted in whatever was left over from painting the hull. They are called syrmata, from the wire used to haul the boats up. There are fourteen clusters around the island; the fifty-two at Mandrakia are legally protected. Most are holiday lets now.",
        "It is the same shoreline the obsidian left thirteen thousand years earlier."
      ],
      sources: [
        { title: "Greek News Agenda, The syrmata of Milos: adaptive architecture and cultural heritage", url: "https://www.greeknewsagenda.gr/the-syrmata-of-milos-adaptive-architecture-and-cultural-heritage/" }
      ] },
    { place: "athens", era: "1966–2026", title: "The trawlers, the law and the numbers",
      fishes: ["anchovy", "sardine", "sea-bass", "gilthead-bream"],
      text: [
        "Every Greek fisherman knows the summer closure. It is real and it is old: Royal Decree 917 of 1966, still in force and last amended in 2021, bans trawling absolutely from June to September in internal waters and out to six nautical miles, and year-round within one mile of any coast. The EU's Mediterranean Regulation of 2006 adds a three-mile or fifty-metre-depth line and a ban over Posidonia seagrass. Greece joined the Community on 1 January 1981 and has argued with Brussels about the coastal buffer more than once.",
        "The catch peaked, by the best reconstruction, at about 220,000 tonnes in 1994. Official landings fell from 81,920 tonnes in 2019 to 54,708 in 2024 and 42,101 in 2025. Anchovy is the biggest catch by weight, then sardine; hake, the trawlers’ fish, is second by value.",
        "By number Greece has the largest fleet in the EU, and almost all of it is small: about 11,400 motor boats in 2024, of which 231 were trawlers and 218 purse seiners. Ninety-six per cent are boats working nets, longlines and traps, and nearly all are under twelve metres. Those small boats land a third of the tonnage but earn more than half the money. The psarotaverna runs on them.",
        "Farming changed the other side of the ledger. The first Greek sea bass and bream farm opened on Kefalonia in 1981; today some 347 cage farms produce about 114,500 tonnes a year, most of it exported, and Greece is the EU's largest producer of both fish."
      ],
      sources: [
        { title: "Royal Decree 917/1966 on trawling, codified text (Hellenic Coast Guard)", url: "https://alieia.hcg.gr/NOMOTHESIA/BD_%20917-66_en.pdf" },
        { title: "Council Regulation (EC) 1967/2006, the Mediterranean Regulation", url: "https://eur-lex.europa.eu/eli/reg/2006/1967" },
        { title: "ELSTAT, Sea Fishery Survey 2024 (25 Sept 2025)", url: "https://www.statistics.gr/documents/20181/af9cd93c-496c-7c3a-02cc-caeaa06cbbba" },
        { title: "European Commission, Greek fleet capacity report, reference year 2022", url: "https://oceans-and-fisheries.ec.europa.eu/document/download/6067c2d4-3f5e-4872-afc8-5d2d35e530f4_en?filename=2022-fleet-capacity-report-greece_en.pdf" },
        { title: "Touloumis et al. 2026, Frontiers in Marine Science (220,000 t peak, 1994)", url: "https://www.frontiersin.org/journals/marine-science/articles/10.3389/fmars.2026.1766535/full" },
        { title: "van Pelt et al. 2024, Frontiers in Aquaculture (347 cage farms)", url: "https://www.frontiersin.org/journals/aquaculture/articles/10.3389/faquc.2024.1383280/full" },
        { title: "Hellenic Aquaculture Producers Organisation, annual report 2024", url: "https://fishfromgreece.com/en/annual-report-2024/" }
      ] },
    { place: "sporades", era: "1992–2021", title: "The marine park and the seal",
      fishes: ["monk-seal"],
      text: [
        "On 16 May 1992 a presidential decree created the National Marine Park of Alonnisos and the Northern Sporades, the first in Greece and, at about 2,260 square kilometres, for three decades the largest marine protected area in Europe. It covers Alonnisos, Peristera, Kyra Panagia, Youra, Psathoura, Piperi and Skantzoura: the islands engraved here as Dromi and Pelagnisi. Piperi has a three-mile exclusion zone; the outer zone allows amateur fishing under the Fisheries Code.",
        "The park exists for the Mediterranean monk seal, the fisherman's rival, and the black seals of the Homeric Hymn to Apollo. The IUCN moved it from Critically Endangered to Endangered in 2015 and to Vulnerable in 2023, with a world population of roughly 815 to 997 animals and no more than 450 adults in the eastern Mediterranean, most of them in Greece and Turkey. It is not out of danger. Deliberate killing is the most common diagnosed cause of death in Greece, and fishermen report seal damage on about a fifth of trips.",
        "Kostis was orphaned on Folegandros in 2018, raised at the seal centre on Alonnisos and released. In July 2021 he was found speared at close range in the park. MOm offered an eighteen-thousand-euro reward."
      ],
      sources: [
        { title: "Wikipedia, Alonnisos Marine Park (citing the 1992 decree and MOm)", url: "https://en.wikipedia.org/wiki/Alonnisos_Marine_Park" },
        { title: "IUCN 2025, Mediterranean monk seal: monitoring and research techniques", url: "https://portals.iucn.org/library/sites/library/files/documents/2025-006-En.pdf" },
        { title: "US Marine Mammal Commission, Mediterranean monk seal", url: "https://www.mmc.gov/priority-topics/species-of-concern/mediterranean-monk-seal/" },
        { title: "Washington Post, Kostis the seal killed near Alonnisos (July 2021)", url: "https://www.washingtonpost.com/world/2021/07/27/kostis-seal-killed-greece-alonissos/" },
        { title: "Homeric Hymn to Apollo 47–77 (Perseus), the black seals", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0138%3Ahymn%3D3%3Acard%3D47" }
      ] },
    { place: "thera", era: "2024–2030", title: "A warmer sea, and a line drawn around it",
      fishes: ["lionfish", "parrotfish"],
      text: [
        "The Aegean is heating at about two-thirds of a degree per decade. On 16 August 2024 the Mediterranean's average surface temperature hit a record 28.5 degrees. The fish are answering: round sardinella, a warm-water species, was up forty per cent in the 2024 landings; parrotfish have pushed north to the Saronic; rabbitfish arrived through Suez and were first recorded in Greece in the Dodecanese in 1964; the lionfish was first published from Rhodes in 2015 and was off Crete by 2019. By 2020 the Greek seas held 242 alien species.",
        "At the Our Ocean Conference in Athens on 16 April 2024 Greece became the first country in Europe to promise a ban on bottom trawling in all its marine protected areas, in national parks by 2026 and everywhere by 2030. In 2025 it announced two new national marine parks, one in the Ionian and one covering about 9,500 square kilometres of the southern Cyclades, the water around Santorini, Milos and their neighbours. Trawling is to be excluded from both, with drones and satellites watching. The law requires a third of Greek territorial waters to be protected by 2030.",
        "Across the whole Mediterranean, according to the FAO's 2025 report, 52 per cent of assessed stocks are still overfished. A decade earlier it was 87 per cent."
      ],
      sources: [
        { title: "Greek government commitments, Our Ocean Conference Athens 2024", url: "https://www.ourocean2024.gov.gr/wp-content/uploads/2024/04/A5_OOC-9_PROPOSED-COMMITMENTS_12.4.pdf" },
        { title: "Euronews, Greece first in Europe to ban bottom trawling in MPAs (16 Apr 2024)", url: "https://www.euronews.com/green/2024/04/16/greece-to-become-first-in-europe-to-ban-bottom-trawling-in-all-marine-protected-areas" },
        { title: "Euronews, two new national marine parks (21 July 2025)", url: "https://www.euronews.com/2025/07/21/greece-is-creating-two-new-national-marine-parks-to-meet-2030-ocean-protection-targets-ear" },
        { title: "FAO/GFCM, State of Mediterranean and Black Sea Fisheries 2025", url: "https://www.fao.org/gfcm/news/detail/en/c/1754956/" },
        { title: "iMEdD Lab, sea temperatures break record (Aug 2024)", url: "https://lab.imedd.org/en/sea-temperatures-break-record/" },
        { title: "ELNAIS/HCMR, Siganus luridus and Pterois miles first records", url: "https://elnais.hcmr.gr/pterois-miles/" }
      ] },
    { place: "franchthi", era: "now", title: "Where it started, and whose wall this is",
      text: [
        "The first stop on this walk was a cave on the Argolid coast, in the country this plate calls Moree. People sat in it almost ten thousand years ago eating bluefin tuna. You cannot take a bluefin off a rock. Somebody had a boat, knew where the fish would be, and knew when.",
        "Most of what came after is refinement. Bone hooks became bronze, then iron. Twisted horsehair became monofilament. The man on the headland watching for the shoal became a screen in a wheelhouse. The fish are the same fish. Bluefin still come in from the Atlantic to spawn in early summer, which is the run the people at Franchthi were waiting for, the run Aristotle had described to him by fishermen on Lesbos, and the run the Byzantines took by hand out of the Golden Horn.",
        "Moree is also where the name comes from. The ending -poulos is Peloponnesian and means son of. It is a regional habit rather than a family tree, so it points at a stretch of country rather than at any one ancestor. That stretch of country is on this plate, low and to the left, under the word Moree.",
        "Thirteen thousand years of people taking fish out of this water, and the line is still running."
      ],
      fishes: ["bluefin-tuna"],
      sources: [
        { title: "Andrews et al. 2022, ICES Journal of Marine Science 79 (bluefin in the Aegean, 9000 to 3200 BC)", url: "https://academic.oup.com/icesjms/article/79/2/247/6511216" },
        { title: "Perlès 2016, Quaternary International 407 (littoral resources at Franchthi)", url: "https://hal.science/hal-01529062/" },
        { title: "Strabo 7.6.2 on the Golden Horn (Perseus)", url: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0198%3Abook%3D7%3Achapter%3D6%3Asection%3D2" },
        { title: "Wiktionary, the Greek suffix -opoulos", url: "https://en.wiktionary.org/wiki/-%CF%8C%CF%80%CE%BF%CF%85%CE%BB%CE%BF%CF%82" },
        { title: "See The name for the full account, and its limits", url: "poulos.html" }
      ] }

  ]
};
