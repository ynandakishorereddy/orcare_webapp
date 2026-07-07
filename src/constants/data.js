/* =====================================================
   ORCARE — DATA LAYER
   ===================================================== */
const DISEASES = [
  { id:'gingivitis', name:'Gingivitis', icon:'<i class="ph ph-drop"></i>', color:'#2563EB', bg:'#DBEAFE',
    whatIsHappening:'Gingivitis is the earliest and only truly reversible stage of gum disease. It occurs when a sticky, colorless film of bacteria called plaque accumulates on the teeth and produces toxins that irritate the gum tissue. If not removed by daily brushing and flossing, plaque hardens into tartar (calculus), which provides a shield for more bacteria and can only be removed by a professional dental cleaning.',
    whatPeopleNotice:'The most common signs are gums that look red and puffy instead of a healthy pale pink. You may see blood on your toothbrush or in the sink when flossing. Persistent bad breath or a metallic taste in the mouth are also early indicators. Crucially, gingivitis is often painless, which is why many people ignore it until it progresses.',
    whyItHappens:'The primary cause is poor oral hygiene leading to plaque buildup. Other contributing factors include hormonal changes (like pregnancy or puberty), certain medications that cause dry mouth, smoking, and systemic diseases like diabetes that reduce the body\'s ability to fight infection.',
    whyNotIgnore:'While gingivitis is reversible, ignoring it allows the infection to spread below the gumline. This leads to periodontitis, where the body\'s immune system begins to break down the bone and connective tissue that hold teeth in place, eventually leading to loose teeth and tooth loss.',
    whenToSeeDentist:'Schedule a visit if you notice your gums bleeding during routine cleaning, or if you see visible recession where the gum line appears to be pulling away from the teeth.' },

  { id:'cavities', name:'Cavities (Tooth Decay)', icon:'<i class="ph ph-warning"></i>️', color:'#2563EB', bg:'#DBEAFE',
    whatIsHappening:'Tooth decay is a process where the hard mineral structure of the tooth (enamel) is destroyed over time. It starts with demineralization, where acids produced by mouth bacteria dissolve surface minerals. If this process continues, it creates a hole or "cavity" that penetrates the enamel and reaches the softer dentin layer underneath.',
    whatPeopleNotice:'In the early stages, you might see white spots on the teeth. As it progresses, you may experience sharp pain when eating sweet, hot, or cold foods. Visible pits, black/brown staining on any tooth surface, and persistent food trapping between teeth are common signs that a cavity has formed.',
    whyItHappens:'It\'s a combination of factors: bacteria in your mouth feed on dietary sugars and starches to create acid. Frequent snacking on sugary foods, sipping acidic drinks, and inadequate fluoride exposure make the enamel more vulnerable to these acid attacks.',
    whyNotIgnore:'Decay never stops on its own. Once it reaches the dentin, it spreads much faster toward the tooth\'s nerve. This leads to agonizing toothaches, abscesses, and can eventually require complex root canal therapy or total tooth extraction.',
    whenToSeeDentist:'See a dentist immediately if you have a lingering toothache, sharp sensitivity, or if you can feel a hole or rough edge with your tongue.' },

  { id:'bad_breath', name:'Bad Breath (Halitosis)', icon:'<i class="ph ph-wind"></i>', color:'#22C55E', bg:'#dcfce7',
    whatIsHappening:'Chronic bad breath is typically caused by the breakdown of proteins by anaerobic bacteria in the mouth. These bacteria live in areas where oxygen is low, such as the deep crevices of the tongue, under the gumline, and between teeth, producing foul-smelling volatile sulfur compounds (VSCs).',
    whatPeopleNotice:'A persistent unpleasant taste, a thick white or yellowish coating on the back of the tongue, and dry mouth. Since we often become accustomed to our own smell, you might only notice it through the reactions of others or by testing your breath with a clean tissue.',
    whyItHappens:'Poor hygiene is the main culprit, but dry mouth is a major contributor because saliva is needed to wash away food particles and neutralize acids. Other causes include chronic sinus infections, gastric reflux, and systemic conditions like liver or kidney issues.',
    whyNotIgnore:'While often seen as a social issue, persistent halitosis is a major warning sign of active gum disease (periodontitis) or a hidden infection that could be damaging your oral health.',
    whenToSeeDentist:'If bad breath remains a problem even after you\'ve improved your brushing, flossing, and tongue-scraping habits for at least two weeks.' },

  { id:'oral_cancer', name:'Oral Cancer', icon:'<i class="ph ph-microscope"></i>', color:'#8B5CF6', bg:'#ede9fe',
    whatIsHappening:'Oral cancer is the result of abnormal cell growth in the mouth or throat. It can affect the lips, tongue, inner lining of the cheeks, gums, or the floor/roof of the mouth. In its early stages, it often looks like a harmless sore or discoloration, making it difficult for patients to identify without a professional screening.',
    whatPeopleNotice:'Look for a sore or ulcer that does not heal within 14 days. Other signs include persistent red or white patches, a lump or thickening of the tissue, difficulty chewing or swallowing, or a feeling like something is caught in the throat.',
    whyItHappens:'The highest risk factors are tobacco use (including smokeless tobacco/gutka) and excessive alcohol consumption. Other risks include prolonged sun exposure to the lips and infection with certain strains of the human papillomavirus (HPV).',
    whyNotIgnore:'Oral cancer is highly treatable if caught early, with survival rates over 80-90%. However, late-stage detection significantly complicates treatment and reduces the chances of a full recovery.',
    whenToSeeDentist:'Any sore, lump, or patch in the mouth that persists for more than two weeks REQUIRES an immediate professional examination.' },

  { id:'sensitivity', name:'Tooth Sensitivity', icon:'<i class="ph ph-lightning"></i>', color:'#0EA5E9', bg:'#e0f2fe',
    whatIsHappening:'This occurs when the protective enamel on the tooth\'s crown or the cementum on the tooth\'s root wears away, exposing the dentin. Dentin contains thousands of microscopic tubules that lead directly to the tooth\'s nerve center. When these tubules are exposed, external triggers travel straight to the nerve.',
    whatPeopleNotice:'A sudden, sharp flash of pain or deep ache when teeth are exposed to cold air, ice-cold water, hot coffee, or acidic/sweet foods. The pain usually subsides quickly once the trigger is removed but can be quite intense.',
    whyItHappens:'Aggressive brushing with a hard-bristled brush, gum recession due to age or gum disease, teeth grinding (bruxism), and frequent consumption of highly acidic foods/drinks that erode enamel.',
    whyNotIgnore:'Sensitivity often masks other problems like cracked teeth or deep cavities. Over time, it can lead to avoidance of proper cleaning in painful areas, which ironically leads to more plaque buildup and further decay.',
    whenToSeeDentist:'If the sensitivity is severe, happens in a specific tooth, or if your regular sensitive toothpaste hasn\'t improved the situation after a month of use.' },

  { id:'mouth_ulcers', name:'Mouth Ulcers (Canker Sores)', icon:'<i class="ph ph-fire"></i>', color:'#8B5CF6', bg:'#ede9fe',
    whatIsHappening:'These are small, shallow lesions that develop on the soft tissues in your mouth or at the base of your gums. Unlike cold sores, canker sores don\'t occur on the surface of your lips and aren\'t contagious, but they can be extremely painful and make eating or talking difficult.',
    whatPeopleNotice:'They usually appear as round or oval sores with a white or yellow center and a red, inflamed border. You might feel a tingling or burning sensation a day or two before the sore actually appears.',
    whyItHappens:'Triggers include minor injuries (like biting your cheek), stress, hormonal shifts, and allergic reactions to certain bacteria in toothpaste. They are also strongly linked to deficiencies in Vitamin B12, Zinc, Folic Acid, or Iron.',
    whyNotIgnore:'While self-healing, frequent outbreaks are a signal that your body is under stress or missing essential nutrients. In rare cases, complex ulcers can be associated with inflammatory bowel diseases or immune system disorders.',
    whenToSeeDentist:'Seek care for unusually large sores, sores that keep spreading, or those accompanied by a high fever or difficulty drinking fluids.' },

  { id:'periodontitis', name:'Periodontitis', icon:'<i class="ph ph-drop-half-bottom"></i>', color:'#DC2626', bg:'#fee2e2',
    whatIsHappening:'Advanced gum disease where infection destroys the bone and connective tissue that support teeth. Deep pockets form between teeth and gums, trapping bacteria and accelerating bone loss. Unlike gingivitis, periodontitis causes irreversible damage to the supporting structures.',
    whatPeopleNotice:'Deep, aching gums that bleed easily, persistent bad breath that does not improve with brushing, pus between teeth and gums, teeth that feel loose or shift position over time, receding gumline exposing yellowish root surfaces, and pain when chewing.',
    whyItHappens:'Untreated gingivitis is the primary cause. Smoking and tobacco use dramatically increase risk. Other factors include genetic predisposition, uncontrolled diabetes, chronic stress, hormonal changes, poor nutrition, and certain medications that reduce saliva flow.',
    whyNotIgnore:'Periodontitis is the leading cause of tooth loss in adults worldwide. Research has linked it to increased risk of heart disease, stroke, diabetes complications, respiratory infections, and adverse pregnancy outcomes.',
    whenToSeeDentist:'Immediately if teeth feel loose, gums are pulling away from teeth, you notice pus between your teeth and gums, or if your bite has changed.' },

  { id:'bruxism', name:'Bruxism (Teeth Grinding)', icon:'<i class="ph ph-gear"></i>', color:'#7C3AED', bg:'#ede9fe',
    whatIsHappening:'Involuntary clenching or grinding of teeth, mostly during sleep but sometimes during the day. The jaw muscles can generate up to 250 lbs of force during grinding episodes, which is far more than normal chewing force. This extreme pressure slowly wears down enamel and damages jaw joints.',
    whatPeopleNotice:'Waking up with jaw soreness, headaches (especially in the temples), flattened or chipped tooth surfaces, tongue indentations along the edges, clicking or popping jaw sounds, and earaches not caused by ear infections.',
    whyItHappens:'Stress and anxiety are the primary triggers. Also caused by sleep disorders like sleep apnea, misaligned bite (malocclusion), excessive caffeine or alcohol consumption, and certain medications including antidepressants.',
    whyNotIgnore:'Causes irreversible enamel loss, cracked or fractured teeth, TMJ disorders with chronic facial pain, and can lead to costly restorations. The damage accumulates silently over years.',
    whenToSeeDentist:'If you wake with jaw pain or headaches, if a partner reports grinding sounds at night, or if you notice your teeth appear flattened or chipped.' },

  { id:'dental_abscess', name:'Dental Abscess', icon:'<i class="ph ph-warning-octagon"></i>', color:'#DC2626', bg:'#fee2e2',
    whatIsHappening:'A pocket of pus caused by bacterial infection, occurring either at the tooth root (periapical abscess) or in the gum tissue (periodontal abscess). The body walls off the infection, creating a painful, swollen lump filled with dead cells, bacteria, and tissue fluid.',
    whatPeopleNotice:'Severe, throbbing toothache that radiates to the jaw, ear, or neck. Facial swelling on the affected side, fever, a foul or salty taste from draining pus, sensitivity to pressure when biting, and swollen lymph nodes under the jaw.',
    whyItHappens:'Untreated deep cavities allowing bacteria to reach the tooth pulp, cracked or broken teeth, failed or leaking dental work, or advanced gum disease allowing bacteria access to deeper tissues around tooth roots.',
    whyNotIgnore:'A dental abscess is a medical emergency. The infection can spread to the jaw bone, soft tissues of the head and neck, and in rare but serious cases can cause life-threatening sepsis or airway obstruction.',
    whenToSeeDentist:'IMMEDIATELY. If you have facial swelling accompanied by fever, difficulty breathing, or difficulty swallowing, go to a hospital emergency room without delay.' },

  { id:'oral_thrush', name:'Oral Thrush (Candidiasis)', icon:'<i class="ph ph-circle-dashed"></i>', color:'#F59E0B', bg:'#fef3c7',
    whatIsHappening:'A fungal infection caused by an overgrowth of Candida albicans yeast in the mouth. This organism is normally present in small amounts and kept in check by beneficial bacteria. When the oral environment is disrupted, Candida multiplies rapidly and forms visible patches.',
    whatPeopleNotice:'Creamy white, slightly raised lesions on the tongue and inner cheeks that may bleed when scraped. A cottony or dry feeling in the mouth, loss of taste, redness or soreness, and cracking at the corners of the mouth.',
    whyItHappens:'Antibiotic use that kills off protective bacteria, weakened immune system (HIV, chemotherapy), uncontrolled diabetes, chronic dry mouth, denture wearing (especially ill-fitting ones), use of inhaled corticosteroids for asthma, and smoking.',
    whyNotIgnore:'Can spread to the throat (esophageal candidiasis) making swallowing difficult and painful. In immunocompromised individuals, it may become systemic and affect other organs.',
    whenToSeeDentist:'If white patches appear in your mouth, especially after taking antibiotics, if you have a weakened immune system, or if you wear dentures and notice irritation.' },

  { id:'dry_socket', name:'Dry Socket', icon:'<i class="ph ph-prohibit-inset"></i>', color:'#0EA5E9', bg:'#e0f2fe',
    whatIsHappening:'After a tooth extraction, a blood clot normally forms in the empty socket to protect the underlying bone and nerve endings during healing. Dry socket occurs when this protective clot is dislodged, dissolved, or fails to form, leaving the bone and nerves exposed to air, food, and bacteria.',
    whatPeopleNotice:'Severe, radiating pain that begins 2-4 days after extraction and is often worse than the original toothache. Visible whitish bone in the socket where the clot should be. Bad taste in the mouth, bad breath, and pain that radiates to the ear on the same side.',
    whyItHappens:'Smoking (chemicals prevent clot formation), using straws or spitting forcefully (suction dislodges the clot), poor oral hygiene post-extraction, hormonal factors such as birth control pills, history of previous dry socket, and difficult or traumatic extractions.',
    whyNotIgnore:'Without the protective blood clot, the exposed bone becomes inflamed and intensely painful. Healing is significantly delayed, and the risk of infection at the extraction site increases dramatically.',
    whenToSeeDentist:'If pain intensifies 2-3 days after a tooth extraction instead of gradually improving, or if you can see exposed bone in the socket.' },

  { id:'enamel_erosion', name:'Enamel Erosion', icon:'<i class="ph ph-shield-slash"></i>', color:'#14B8A6', bg:'#ccfbf1',
    whatIsHappening:'The gradual chemical wearing away of tooth enamel by acid exposure. Unlike cavities, which are caused by bacterial acid, erosion is caused by dietary acids or stomach acids directly dissolving the mineral structure of enamel without bacterial involvement.',
    whatPeopleNotice:'Teeth appearing more yellow as the thinner enamel reveals the darker dentin underneath. Rounded, transparent, or chipped edges on front teeth. Increased sensitivity to hot, cold, and sweet foods. Small dents or cupping on the chewing surfaces of back teeth.',
    whyItHappens:'Frequent consumption of acidic foods and drinks (citrus fruits, soda, wine, energy drinks, vinegar-based foods), gastroesophageal acid reflux (GERD), eating disorders involving vomiting (bulimia), frequent exposure to chlorinated pool water, and dry mouth conditions.',
    whyNotIgnore:'Enamel is the hardest substance in the human body, but it does NOT regenerate once lost. Exposed dentin decays 7 times faster than enamel, and teeth become structurally weaker and more prone to chipping and cracking.',
    whenToSeeDentist:'If you notice your teeth becoming more yellow or transparent at the edges, if sensitivity is increasing, or if you have acid reflux or an eating disorder affecting your teeth.' }
];

const SYMPTOMS = [
  { title:'Tooth Pain',       icon:'<i class="ph ph-tooth"></i>', color:'#8B5CF6', bg:'#ede9fe' },
  { title:'Bleeding Gums',    icon:'<i class="ph ph-syringe"></i>', color:'#22C55E', bg:'#dcfce7' },
  { title:'Tooth Sensitivity',icon:'<i class="ph ph-snowflake"></i>️', color:'#38BDF8', bg:'#e0f2fe' },
  { title:'Oral Ulcers',      icon:'<i class="ph ph-mask-face"></i>', color:'#4A9EFF', bg:'#dbeafe' },
  { title:'Bad Breath',       icon:'<i class="ph ph-wind"></i>️', color:'#64748B', bg:'#f1f5f9' },
  { title:'Swelling',         icon:'<i class="ph ph-smiley-sad"></i>', color:'#22C55E', bg:'#dcfce7' },
  { title:'Chipped Tooth',    icon:'<i class="ph ph-hammer"></i>', color:'#94A3B8', bg:'#f1f5f9' },
  { title:'Tooth Mobility',   icon:'<i class="ph ph-smiley-dizzy"></i>', color:'#4A9EFF', bg:'#dbeafe' },
  { title:'Receding Gums',    icon:'<i class="ph ph-trend-down"></i>', color:'#14B8A6', bg:'#ccfbf1' },
  { title:'Discolouration',   icon:'<i class="ph ph-circle"></i>', color:'#F59E0B', bg:'#fef3c7' },
  { title:'Yellow Deposit',   icon:'<i class="ph ph-circle"></i>', color:'#F59E0B', bg:'#fef3c7' },
  { title:'Missing Tooth',    icon:'<i class="ph ph-prohibit"></i>', color:'#94A3B8', bg:'#f1f5f9' },
  { title:'Irregular Teeth',  icon:'<i class="ph ph-wave-sine"></i>', color:'#C084FC', bg:'#f3e8ff' },
  { title:'Jaw Pain',         icon:'<i class="ph ph-smiley-blank"></i>', color:'#14B8A6', bg:'#ccfbf1' }
];

const SYMPTOM_DETAILS = {
  'tooth pain':{ icon:'<i class="ph ph-tooth"></i>',
    whatIsHappening:'Pain in or around a tooth, indicating irritation, infection, or damage to the tooth nerve/pulp.',
    whatPeopleNotice:'Sharp or dull pain, often worse at night or when eating.',
    possibleReasons:['Tooth decay (cavity) or deep filling','Cracked or fractured tooth','Abscess (infection at the root)','Gum disease or recession','Grinding teeth at night'],
    whatToDo:['Keep the area clean.','Avoid chewing on that side.','Rinse with water.','Take over-the-counter pain relief if needed.'],
    whenToSeeDentist:'If pain lasts more than 2 days or is severe/continuous.' },
  'bleeding gums':{ icon:'<i class="ph ph-syringe"></i>',
    whatIsHappening:'Inflammation of the gum tissue, causing it to bleed easily.',
    whatPeopleNotice:'Blood while brushing; red or swollen gums.',
    possibleReasons:['Gingivitis (early gum disease) from plaque buildup','Brushing too hard or using a hard toothbrush','Incorrect flossing technique','Vitamin deficiencies','Hormonal changes (e.g., pregnancy)'],
    whatToDo:['Do not stop brushing.','Continue to brush gently and correctly.','Use a soft-bristled toothbrush.','Floss daily to remove plaque between teeth.'],
    whenToSeeDentist:'If bleeding doesn\'t stop or is accompanied by loose teeth.' },
  'tooth sensitivity':{ icon:'<i class="ph ph-snowflake"></i>️',
    whatIsHappening:'Sharp, temporary pain when teeth are exposed to certain stimuli.',
    whatPeopleNotice:'Sudden sharp pain with cold, hot, or sweet triggers.',
    possibleReasons:['Worn tooth enamel from hard brushing','Gum recession exposing sensitive roots','Tooth decay or old fillings','Cracked teeth','Recent whitening treatment'],
    whatToDo:['Use gentle brushing.','Avoid extreme temperature foods.','Switch to a toothpaste for sensitive teeth.'],
    whenToSeeDentist:'If sensitivity persists or becomes severe.' },
  'oral ulcers':{ icon:'<i class="ph ph-mask-face"></i>',
    whatIsHappening:'Small, painful lesions that develop in the mouth or at the base of the gums.',
    whatPeopleNotice:'Painful white or yellow sores; burning sensation.',
    possibleReasons:['Minor injury (biting cheek, sharp food)','Stress or lack of sleep','Vitamin deficiencies (B12, iron)','Certain foods (spicy, acidic)','Hormonal changes'],
    whatToDo:['Keep the mouth clean.','Avoid spicy foods.','Rinse with warm salt water.'],
    whenToSeeDentist:'If ulcers last more than 2 weeks.' },
  'bad breath':{ icon:'<i class="ph ph-wind"></i>️',
    whatIsHappening:'Unpleasant odor exhaled from the mouth.',
    whatPeopleNotice:'Bad taste in mouth; white coating on tongue; dry mouth.',
    possibleReasons:['Poor oral hygiene (bacteria on teeth/tongue)','Gum disease','Dry mouth (xerostomia)','Foods (garlic, onion)','Tobacco usage'],
    whatToDo:['Brush twice daily and floss once daily.','Clean your tongue with a scraper or brush.','Drink plenty of water to prevent dry mouth.','Chew sugar-free gum to stimulate saliva.'],
    whenToSeeDentist:'If bad breath persists despite good hygiene (could be a sign of gum disease or other issues).' },
  'swelling':{ icon:'<i class="ph ph-smiley-sad"></i>',
    whatIsHappening:'Enlargement or distention of mouth tissues due to inflammation or fluid.',
    whatPeopleNotice:'Puffy face or gums; a tight, painful feeling.',
    possibleReasons:['Tooth abscess (infection)','Gum infection','Blocked salivary gland','Wisdom tooth eruption','Trauma/Injury'],
    whatToDo:['Do not press or massage the swelling.','Keep the mouth clean.','Rinse with warm salt water.'],
    whenToSeeDentist:'IMMEDIATELY. Any swelling accompanied by fever or difficulty swallowing.' },
  'chipped tooth':{ icon:'<i class="ph ph-hammer"></i>',
    whatIsHappening:'A piece of tooth enamel has broken off.',
    whatPeopleNotice:'Rough or sharp edge on a tooth; sensitivity to cold/hot; pain when biting.',
    possibleReasons:['Biting on hard objects (ice, candy, bones)','Falls or sports accidents','Teeth weakened by large old fillings','Grinding teeth'],
    whatToDo:['Rinse mouth with warm water.','If there is bleeding, apply pressure with gauze.','Cover any sharp edge with sugar-free gum (temporary).','Eat soft foods.'],
    whenToSeeDentist:'As soon as possible to smooth the edge or repair the tooth before decay starts.' },
  'tooth mobility':{ icon:'<i class="ph ph-smiley-dizzy"></i>',
    whatIsHappening:'A tooth feels loose or moves when touched.',
    whatPeopleNotice:'Sensation of tooth moving when eating/brushing; altered bite; gap widening between teeth.',
    possibleReasons:['Advanced gum disease (periodontitis) destroying bone support','Trauma/Injury to the face/mouth','Grinding/Clenching teeth heavily'],
    whatToDo:['Do NOT wiggle the tooth with fingers or tongue.','Stick to a soft diet.','Keep the area clean by gentle brushing.'],
    whenToSeeDentist:'Promptly. Loose teeth can sometimes be saved with early treatment.' },
  'receding gums':{ icon:'<i class="ph ph-trend-down"></i>',
    whatIsHappening:'Gum tissue pulls back, exposing the tooth root.',
    whatPeopleNotice:'Teeth look longer than before; notch felt near the gum line; sensitivity to cold.',
    possibleReasons:['Brushing too hard / aggressive scrubbing','Gum disease','Smoking/Tobacco use','Genetics (thin gums)','Grinding teeth'],
    whatToDo:['Switch to an extra-soft toothbrush.','Use gentle circular brushing motion.','Use a desensitizing toothpaste if sensitive.'],
    whenToSeeDentist:'For advice on preventing further recession and treating existing damage.' },
  'discolouration':{ icon:'<i class="ph ph-circle"></i>',
    whatIsHappening:'Change in the natural color of teeth.',
    whatPeopleNotice:'Yellow, brown, black, or white spots/stains on teeth.',
    possibleReasons:['Foods/Drinks (coffee, tea, wine, berries)','Tobacco use (smoking or chewing)','Poor hygiene (plaque accumulation)','Tooth decay (dark spots)','Trauma to the tooth (turns grey/dark)'],
    whatToDo:['Brush and floss regularly.','Rinse with water after staining foods/drinks.','Quit tobacco.','Use a whitening toothpaste (cautiously).'],
    whenToSeeDentist:'For professional cleaning or if a specific spot is dark (could be decay).' },
  'yellow deposit':{ icon:'<i class="ph ph-circle"></i>',
    whatIsHappening:'Accumulation of hard mineral deposits on teeth.',
    whatPeopleNotice:'Hard, rough yellow/brown material near the gum line or between teeth that doesn\'t brush off.',
    possibleReasons:['Plaque that was not removed hardening into tartar (calculus)','High mineral content in saliva','Poor brushing technique'],
    whatToDo:['You cannot remove tartar at home; brushing won\'t work.','Emphasize flossing to prevent future buildup.'],
    whenToSeeDentist:'For a professional scale and polish (cleaning). Only a dentist/hygienist can remove tartar.' },
  'missing tooth':{ icon:'<i class="ph ph-prohibit"></i>',
    whatIsHappening:'Absence of a tooth in the dental arch.',
    whatPeopleNotice:'Gap in smile; difficulty chewing; food getting stuck in the gap.',
    possibleReasons:['Extraction due to decay or infection','Trauma/Knocked out','Congenitally missing (born without it)'],
    whatToDo:['Keep the gap and surrounding teeth very clean.','Watch for shifting of adjacent teeth.'],
    whenToSeeDentist:'To discuss replacement options (bridge, implant, denture) to prevent bite issues.' },
  'irregular teeth':{ icon:'<i class="ph ph-wave-sine"></i>',
    whatIsHappening:'Misalignment of teeth or jaws.',
    whatPeopleNotice:'Crooked, overlapping, or twisted teeth; gaps; difficulty cleaning; overbite/underbite.',
    possibleReasons:['Genetics (jaw size vs tooth size)','Early loss of baby teeth','Thumb sucking habit in childhood'],
    whatToDo:['Be extra diligent with cleaning; crooked teeth trap more plaque.','Use floss threaders or water flossers if needed.'],
    whenToSeeDentist:'For an orthodontic consultation (braces/aligners) if it affects function or aesthetics.' },
  'jaw pain':{ icon:'<i class="ph ph-smiley-blank"></i>',
    whatIsHappening:'Discomfort in the jaw joint (TMJ) or muscles.',
    whatPeopleNotice:'Pain near ear/jaw; clicking/popping sound; difficulty opening mouth wide; headache.',
    possibleReasons:['Teeth grinding or clenching (bruxism)','Stress/Anxiety','Arthritis in the joint','Misaligned bite'],
    whatToDo:['Eat soft foods to rest the jaw.','Apply warm moist heat to the jaw muscles.','Avoid big yawns or gum chewing.','Practice stress relief.'],
    whenToSeeDentist:'If pain persists, limits mouth opening, or you suspect you grind your teeth.' }
};

const TIPS = [
  {id:1,title:'Brush at Night',desc:'Brush at night before sleeping — it is the most important brushing of the day.',cat:'Hygiene',icon:'<i class="ph ph-moon"></i>'},
  {id:2,title:'2 Minutes Rule',desc:'Brush for at least 2 minutes to ensure all surfaces are clean.',cat:'Hygiene',icon:'⏱️'},
  {id:3,title:'Soft Bristles',desc:'Always use a soft-bristled toothbrush to protect your gums and enamel.',cat:'Hygiene',icon:'<i class="ph ph-toothbrush"></i>'},
  {id:4,title:'Tongue Cleaning',desc:'Clean your tongue daily to remove bacteria and freshen breath.',cat:'Hygiene',icon:'<i class="ph ph-smiley-wink"></i>'},
  {id:5,title:'Replace Brush',desc:'Replace your toothbrush every 3 months or after recovering from illness.',cat:'Hygiene',icon:'<i class="ph ph-arrows-clockwise"></i>'},
  {id:6,title:'Fluoride Power',desc:'Use fluoride toothpaste to strengthen enamel and prevent cavities.',cat:'Hygiene',icon:'<i class="ph ph-tooth"></i>'},
  {id:7,title:"Spit, Don't Rinse",desc:"Spit out excess toothpaste but don't rinse with water immediately.",cat:'Hygiene',icon:'<i class="ph ph-prohibit"></i>'},
  {id:8,title:'Floss Daily',desc:"Flossing removes plaque from between teeth where your brush can't reach.",cat:'Hygiene',icon:'<i class="ph ph-yarn"></i>'},
  {id:9,title:'Gentle Motion',desc:'Use gentle circular motions; scrubbing hard can damage gums.',cat:'Hygiene',icon:'<i class="ph ph-sparkle"></i>'},
  {id:10,title:'Wait After Eating',desc:'Wait 30 minutes after eating acidic foods before brushing.',cat:'Hygiene',icon:'⏳'},
  {id:11,title:'Hydration',desc:'Drink plenty of water to wash away food particles and keep saliva flowing.',cat:'Food',icon:'<i class="ph ph-drop"></i>'},
  {id:12,title:'Sugar Control',desc:'Limit sugary snacks and drinks to mealtimes to reduce acid attacks.',cat:'Food',icon:'<i class="ph ph-candy"></i>'},
  {id:13,title:'Tobacco Warning',desc:'Tobacco use significantly increases the risk of gum disease and oral cancer.',cat:'Lifestyle',icon:'<i class="ph ph-cigarette-slash"></i>'},
  {id:14,title:'Mouthwash',desc:'Use an antimicrobial mouthwash to reduce plaque and gingivitis.',cat:'Hygiene',icon:'<i class="ph ph-bottle"></i>'},
  {id:15,title:'Check Your Gums',desc:"Healthy gums are pink and don't bleed. See a dentist if they do.",cat:'Hygiene',icon:'<i class="ph ph-magnifying-glass"></i>'},
  {id:16,title:'Visit Dentist',desc:'Regular dental check-ups every 6 months are key to prevention.',cat:'Hygiene',icon:'<i class="ph ph-user"></i>‍<i class="ph ph-first-aid"></i>️'},
  {id:17,title:'Clean Between',desc:'Use interdental brushes for larger gaps between teeth.',cat:'Hygiene',icon:'<i class="ph ph-wrench"></i>'},
  {id:18,title:'Limit Soda',desc:'Carbonated drinks, even sugar-free ones, can erode tooth enamel.',cat:'Food',icon:'<i class="ph ph-coffee"></i>'},
  {id:19,title:'Healthy Snacks',desc:'Choose cheese, yogurt, or crunchy veggies instead of chips.',cat:'Food',icon:'<i class="ph ph-carrot"></i>'},
  {id:20,title:'Protect Teeth',desc:'Wear a mouthguard during contact sports to prevent injuries.',cat:'Lifestyle',icon:'<i class="ph ph-shield"></i>️'},
  {id:21,title:'Kids Brushing',desc:"Supervise children's brushing until they are about 7 or 8 years old.",cat:'Age 7-9',icon:'<i class="ph ph-baby"></i>'},
  {id:22,title:'Dry Mouth?',desc:'Chew sugar-free gum to stimulate saliva flow.',cat:'Lifestyle',icon:'<i class="ph ph-plant"></i>'},
  {id:23,title:'Stress & Teeth',desc:'Stress can lead to teeth grinding. Talk to your dentist about a nightguard.',cat:'Lifestyle',icon:'<i class="ph ph-smiley-nervous"></i>'},
  {id:24,title:'Vitamin C',desc:'Eat Vitamin C-rich foods like oranges for healthy gums.',cat:'Food',icon:'<i class="ph ph-orange-slice"></i>'},
  {id:25,title:'Calcium',desc:'Dairy products provide calcium needed to keep teeth strong.',cat:'Food',icon:'<i class="ph ph-glass"></i>'},
  {id:26,title:'Straw Trick',desc:'Use a straw for sugary drinks to bypass teeth surfaces.',cat:'Lifestyle',icon:'<i class="ph ph-coffee"></i>'},
  {id:27,title:'Whiten Safely',desc:'Ask your dentist before trying home whitening remedies.',cat:'Myth Busting',icon:'<i class="ph ph-sparkle"></i>'},
  {id:28,title:'Bleeding Myth',desc:'Bleeding gums need MORE gentle brushing, not less.',cat:'Myth Busting',icon:'<i class="ph ph-drop"></i>'},
  {id:29,title:'Hard Brushing',desc:'Brushing harder does NOT clean better; it causes damage.',cat:'Myth Busting',icon:'<i class="ph ph-stop"></i>'},
  {id:30,title:'Baby Teeth',desc:'Baby teeth are important for spacing adult teeth. Keep them clean!',cat:'Age 7-9',icon:'<i class="ph ph-tooth"></i>'},
  {id:31,title:'Whitening Myths',desc:'Lemon juice does not whiten teeth safely. It can damage enamel.',cat:'Myth Busting',icon:'<i class="ph ph-lemon"></i>'},
  {id:32,title:'Knocked-out Tooth',desc:'If a tooth is knocked out, keep it moist in milk and see a dentist within 30 mins.',cat:'Hygiene',icon:'<i class="ph ph-glass"></i>'},
  {id:33,title:'Aspirin on Gums',desc:'Never place aspirin directly on gums; it causes chemical burns.',cat:'Myth Busting',icon:'<i class="ph ph-pill"></i>'},
  {id:34,title:'Charcoal Warning',desc:'Charcoal toothpaste can be abrasive and wear down enamel.',cat:'Myth Busting',icon:'<i class="ph ph-circle"></i>'}
];

const LEARNING = [
  { id:'daily_hygiene', title:'Daily Oral Hygiene', icon:'<i class="ph ph-toothbrush"></i>', color:'#2563EB', bg:'#dbeafe', desc:'Master the fundamentals of daily oral care',
    modules:[
      { id:'daily_practices', title:'Daily Practices', desc:'Essential daily routines for a healthy mouth', icon:'<i class="ph ph-check-circle"></i>', pts:10,
        lessons:[{t:'Why Daily Hygiene Matters',c:'Your mouth is home to hundreds of bacterial species. Without daily cleaning, these bacteria form a sticky film called plaque on your teeth. Within 24-48 hours, plaque hardens into tartar—a substance that only a dental professional can remove. Daily brushing and flossing disrupt this process.'},{t:'The Ideal Routine',c:'Brush twice a day (morning and night) for 2 full minutes each time. Floss once daily, ideally before bedtime. Rinse with an antimicrobial mouthwash. Clean your tongue every morning to remove bacteria that cause bad breath.'},{t:'Common Mistakes to Avoid',c:'Brushing too hard damages enamel and recedes gums. Skipping nighttime brushing allows bacteria to work undisturbed for hours. Rinsing immediately after brushing washes away protective fluoride. Using the same worn-out toothbrush for too long reduces effectiveness.'}],
        quiz:[{q:'How long should you brush your teeth each time?',opts:['30 seconds','1 minute','2 minutes','5 minutes'],ans:2},{q:'When is the most critical time to brush?',opts:['Morning','After lunch','At night before sleep','After every meal'],ans:2},{q:'What happens to plaque if not removed within 48 hours?',opts:['It disappears','It becomes tartar','It becomes saliva','Nothing'],ans:1}]},
      { id:'brushing_technique', title:'Mastering Brushing', desc:'The correct brushing technique for maximum effectiveness', icon:'<i class="ph ph-tooth"></i>', pts:10,
        lessons:[{t:'The Bass Technique',c:'Place your toothbrush at a 45-degree angle to the gumline. Use short, gentle back-and-forth strokes. Brush the outer surfaces, inner surfaces, and chewing surfaces. For the inner front teeth, tilt the brush vertically and make several up-and-down strokes.'},{t:'Choosing the Right Brush',c:'Always choose a soft-bristled toothbrush. Soft bristles clean effectively without damaging enamel or gums. Replace your toothbrush every 3 months or sooner if bristles are frayed. Electric toothbrushes can be more effective for people with limited dexterity.'},{t:'Toothpaste Selection',c:'Use fluoride toothpaste—fluoride strengthens enamel and prevents decay. After brushing, spit out excess paste but avoid rinsing with water immediately; this allows fluoride to continue working.'}],
        quiz:[{q:'At what angle should you hold your toothbrush to the gumline?',opts:['90 degrees','45 degrees','30 degrees','15 degrees'],ans:1},{q:'What type of bristles should you use?',opts:['Hard','Medium','Soft','Any type'],ans:2},{q:'How often should you replace your toothbrush?',opts:['Every month','Every 3 months','Every 6 months','Every year'],ans:1}]},
      { id:'flossing', title:'Deep Interdental Cleaning', desc:'Why flossing is non-negotiable', icon:'<i class="ph ph-yarn"></i>', pts:10,
        lessons:[{t:'Why Brushing Alone is Not Enough',c:'A toothbrush only cleans about 60% of tooth surfaces. The remaining 40%—the spaces between your teeth—can only be cleaned with floss or interdental tools. Plaque in these areas is the primary cause of gum disease and cavities between teeth.'},{t:'The Correct Flossing Method',c:'Use about 18 inches of floss, winding most around your middle fingers. Hold a 1-2 inch section taut between your thumbs and forefingers. Curve the floss around each tooth in a "C" shape and slide it gently up and down under the gumline.'},{t:'Types of Floss',c:'Waxed floss slides easily between tight teeth. Unwaxed floss gives a squeaky-clean feel. Dental tape is wider and good for larger spaces. Water flossers are excellent for people with braces or bridges.'}],
        quiz:[{q:"What percentage of tooth surfaces can't a toothbrush reach?",opts:['10%','20%','40%','60%'],ans:2},{q:'What shape should floss curve around each tooth?',opts:['S shape','C shape','U shape','Z shape'],ans:1},{q:'How much floss should you use each time?',opts:['6 inches','12 inches','18 inches','24 inches'],ans:2}]},
      { id:'tongue_care', title:'Tongue Care', desc:'The often-overlooked step in oral hygiene', icon:'<i class="ph ph-smiley-wink"></i>', pts:10,
        lessons:[{t:'Why Your Tongue Matters',c:'The tongue has a rough, irregular surface that harbors millions of bacteria. These bacteria, primarily found at the back of the tongue, are a major source of volatile sulfur compounds (VSCs)—the main culprit behind bad breath. Studies show that tongue cleaning can reduce bad breath by up to 70%.'},{t:'How to Clean Your Tongue',c:'Use a dedicated tongue scraper, which is more effective than a toothbrush. Start from the back of the tongue and pull forward. Rinse the scraper after each stroke. Repeat 5-7 times until the tongue surface looks clean. Do this first thing in the morning before eating or drinking.'},{t:'Signs of an Unhealthy Tongue',c:'A thick white or yellow coating indicates bacterial overgrowth. A bright red tongue can signal a nutritional deficiency (B12 or folate). Black, hairy-looking tongue is often caused by bacteria overgrowth from antibiotics or poor hygiene.'}],
        quiz:[{q:'Where on the tongue do most odor-causing bacteria live?',opts:['Tip','Sides','Middle','Back'],ans:3},{q:'By how much can tongue cleaning reduce bad breath?',opts:['10%','30%','50%','70%'],ans:3},{q:'When is the best time to clean your tongue?',opts:['Before bed','After lunch','First thing in the morning','Anytime'],ans:2}]}
    ]},
  { id:'prevention_tools', title:'Prevention & Tools', icon:'<i class="ph ph-shield"></i>️', color:'#0EA5E9', bg:'#e0f2fe', desc:'Build a comprehensive oral health toolkit',
    modules:[
      { id:'preventive_habits', title:'Preventive Habits', desc:'Lifestyle choices that protect your teeth', icon:'<i class="ph ph-barbell"></i>', pts:10,
        lessons:[{t:'Diet and Oral Health',c:'Every time you eat or drink something sugary, bacteria in your mouth produce acid for 20-30 minutes. Frequent snacking throughout the day means your teeth are under constant acid attack. Limiting snacks and choosing tooth-friendly foods like cheese, yogurt, and crunchy vegetables significantly reduces your cavity risk.'},{t:'Hydration and Saliva',c:"Saliva is your mouth's natural defense system. It neutralizes acids, washes away food particles, and contains minerals that repair early tooth damage. Drinking water throughout the day and chewing sugar-free gum after meals stimulates saliva flow."},{t:'Habits to Break',c:'Nail biting, pencil chewing, and using teeth as tools can chip or crack teeth. Ice chewing generates extreme pressure that cracks enamel. Grinding teeth (bruxism), often related to stress, wears down enamel and causes jaw pain.'}],
        quiz:[{q:'How long does acid attack last after eating sugar?',opts:['5 minutes','10 minutes','20-30 minutes','1 hour'],ans:2},{q:"What is the mouth's natural defense system?",opts:['Toothpaste','Saliva','Mouthwash','Water'],ans:1},{q:'Which of these is tooth-friendly?',opts:['Chips','Soda','Cheese','Candy'],ans:2}]},
      { id:'dental_toolkit', title:'Your Dental Toolkit', desc:'Understanding and choosing the right tools', icon:'<i class="ph ph-toolbox"></i>', pts:10,
        lessons:[{t:'Toothbrush Types',c:'Manual toothbrushes: Choose soft bristles, replace every 3 months. Electric toothbrushes: More effective at plaque removal, great for people with limited mobility or braces. Children\'s brushes: Smaller head, softer bristles.'},{t:'Toothpaste Guide',c:'Fluoride toothpaste: Standard protection, essential for cavity prevention. Sensitivity toothpaste: Contains potassium nitrate or arginine to block dentinal tubules. Whitening toothpaste: Contains mild abrasives; use sparingly.'},{t:'Beyond Brushing',c:'Floss or interdental brushes: Essential for cleaning between teeth. Tongue scraper: Metal scrapers are more durable. Mouthwash: Therapeutic mouthwashes contain active ingredients. Water flosser: Uses pressurized water, excellent for implants, braces, and bridges.'}],
        quiz:[{q:'What bristle type should you always choose?',opts:['Hard','Medium','Soft','Any type works'],ans:2},{q:'Which toothpaste is essential for cavity prevention?',opts:['Whitening','Sensitivity','Fluoride','Herbal'],ans:2},{q:'What is a water flosser excellent for?',opts:['Whitening teeth','Braces and implants','Strengthening enamel','Tongue cleaning'],ans:1}]}
    ]},
  { id:'dental_conditions', title:'Common Dental Conditions', icon:'<i class="ph ph-microscope"></i>', color:'#8B5CF6', bg:'#ede9fe', desc:"Understand your mouth's warning signs",
    modules:[
      { id:'warning_signs', title:"Your Mouth's Warning Signs", desc:'Recognizing early signs of dental problems', icon:'<i class="ph ph-warning"></i>️', pts:10,
        lessons:[{t:'Pain and Sensitivity',c:'Dental pain is always a signal that something needs attention. Sharp pain triggered by temperature (hot/cold) or sweetness suggests tooth decay or exposed roots. Throbbing, constant pain often indicates infection or abscess. Pain when biting can signal a cracked tooth or failing filling.'},{t:'Gum Warning Signs',c:"Healthy gums are firm, pale pink, and don't bleed. Red, swollen, or bleeding gums are signs of gingivitis. Gums that pull away from teeth (recession) expose vulnerable root surfaces. Pus between teeth and gums signals active infection requiring immediate attention."},{t:'Visual Warning Signs',c:"White spots on teeth can indicate early decay. Brown or black spots may be active decay or old staining. White patches (leukoplakia) or red patches (erythroplakia) on soft tissues can be serious. Any sore that doesn't heal within 14 days needs professional evaluation."}],
        quiz:[{q:'What does throbbing, constant dental pain usually indicate?',opts:['Normal sensitivity','Infection or abscess','Teeth whitening effect','Vitamin deficiency'],ans:1},{q:'What color are healthy gums?',opts:['Bright red','Dark purple','Pale pink','White'],ans:2},{q:'How long before an oral sore needs professional evaluation?',opts:['3 days','7 days','14 days','30 days'],ans:2}]},
      { id:'decay_stages', title:'The 3 Stages of Decay', desc:'Understanding how cavities progress', icon:'<i class="ph ph-chart-bar"></i>', pts:10,
        lessons:[{t:'Stage 1: Enamel Decay',c:"The first stage begins when acids erode the outer enamel layer. You may notice white spots (demineralization) on the tooth surface. At this stage, the decay can often be REVERSED with fluoride treatments, improved hygiene, and diet changes."},{t:'Stage 2: Dentin Decay',c:"Once decay penetrates through enamel into the dentin, a cavity has officially formed. Dentin is less hard than enamel, so decay spreads faster. You'll likely experience sensitivity to sweet, hot, or cold foods. A dental filling is now required."},{t:'Stage 3: Pulp Involvement',c:"The pulp contains nerves and blood vessels. When decay reaches this stage, you'll experience severe, often spontaneous tooth pain. Treatment now requires a root canal procedure."}],
        quiz:[{q:'At what stage can decay potentially be reversed?',opts:['Stage 1: Enamel decay','Stage 2: Dentin decay','Stage 3: Pulp involvement','No stage is reversible'],ans:0},{q:'What does decay spreading into dentin require?',opts:['More brushing','Fluoride treatment','A dental filling','Root canal'],ans:2},{q:'What treatment is required when decay reaches the pulp?',opts:['Fluoride treatment','Dental filling','Root canal','Extraction only'],ans:2}]}
    ]},
  { id:'specialized_care', title:'Specialized Care', icon:'<i class="ph ph-hospital"></i>', color:'#14B8A6', bg:'#ccfbf1', desc:'Tailored oral care for specific needs',
    modules:[
      { id:'children', title:"Children's Oral Health", desc:'Building healthy habits from the start', icon:'<i class="ph ph-baby"></i>', pts:10,
        lessons:[{t:'From Birth to First Tooth',c:"Even before teeth appear, you can wipe your baby's gums with a soft, damp cloth after feedings. The first tooth usually appears around 6 months. See a dentist within 6 months of the first tooth appearing, or by age 1."},{t:'Supervising Brushing',c:'Children lack the coordination to brush effectively until about age 7-8. Use a grain-of-rice-sized amount of fluoride toothpaste for under-3s, and a pea-sized amount for 3-6 year olds.'},{t:'Diet for Healthy Teeth',c:'Limit juice to 4-6 oz per day and dilute it with water. Avoid sticky, chewy candies that cling to teeth. Encourage water as the main drink between meals.'}],
        quiz:[{q:'When should a child first see a dentist?',opts:['Age 3','Within 6 months of first tooth or by age 1','Age 5','When they get all baby teeth'],ans:1},{q:'Until what age should you supervise brushing?',opts:['Age 5','Age 7-8','Age 10','Age 12'],ans:1},{q:'How much toothpaste for a child under 3?',opts:['Full brush','Pea-sized','Grain-of-rice-sized','None'],ans:2}]},
      { id:'pregnancy', title:'Pregnancy & Oral Health', desc:"Protecting mother and baby's oral health", icon:'<i class="ph ph-baby"></i>', pts:10,
        lessons:[{t:'How Pregnancy Affects Oral Health',c:'Hormonal changes during pregnancy cause increased blood flow to gums, making them more sensitive and prone to swelling and bleeding—a condition called "pregnancy gingivitis." Morning sickness exposes teeth to stomach acid, which erodes enamel.'},{t:'Safe Dental Care During Pregnancy',c:'Routine dental cleaning and examinations are safe and recommended during pregnancy. The second trimester is generally the most comfortable time for dental treatment. Elective procedures are best postponed until after delivery.'},{t:"Protecting Your Baby",c:"A mother's oral health directly affects her baby. Severe gum disease has been linked to premature birth and low birth weight. Cavity-causing bacteria can be transmitted from mother to baby through kissing, sharing utensils, or pre-tasting food."}],
        quiz:[{q:'What is "pregnancy gingivitis" caused by?',opts:['Poor diet','Hormonal changes increasing blood flow to gums','Calcium deficiency','Stress'],ans:1},{q:'When is the best trimester for dental treatment?',opts:['First','Second','Third','After delivery only'],ans:1},{q:'How can cavity-causing bacteria be transmitted to babies?',opts:['Breathing same air','Through breast milk only','Sharing utensils or kissing','Touch'],ans:2}]}
    ]},
  { id:'dental_procedures', title:'Dental Procedures', icon:'<i class="ph ph-first-aid"></i>️', color:'#F59E0B', bg:'#fef3c7', desc:'What to expect at the dentist',
    modules:[
      { id:'checkup', title:'Dental Check-up', desc:'What happens during a routine visit', icon:'<i class="ph ph-magnifying-glass"></i>', pts:10,
        lessons:[{t:'What to Expect',c:'A routine check-up includes a comprehensive examination of your teeth, gums, and soft tissues. The dentist checks for cavities, gum disease, oral cancer signs, and existing restorations. X-rays are typically taken every 1-2 years to detect issues invisible to the naked eye.'},{t:'Professional Cleaning',c:'A dental hygienist uses specialized instruments to remove plaque and tartar (calculus) that cannot be removed by brushing and flossing alone. The cleaning includes scaling (removing tartar), polishing (removing surface stains), and flossing.'},{t:'Frequency and Importance',c:'Most people benefit from check-ups every 6 months. High-risk individuals (smokers, diabetics, people prone to cavities or gum disease) may need to be seen every 3-4 months.'}],
        quiz:[{q:'How often are dental X-rays typically taken?',opts:['Every visit','Every 1-2 years','Every 5 years','Only when there is pain'],ans:1},{q:'What is professional tooth cleaning called?',opts:['Extraction','Prophylaxis','Root canal','Scaling only'],ans:1},{q:'How often should high-risk individuals have check-ups?',opts:['Every 6 months','Once a year','Every 3-4 months','Every 2 years'],ans:2}]},
      { id:'root_canal', title:'Root Canal Treatment', desc:'Saving a severely infected tooth', icon:'<i class="ph ph-syringe"></i>', pts:10,
        lessons:[{t:'When Is It Needed?',c:"Root canal treatment is needed when the dental pulp becomes infected or dies. This can happen due to deep decay, repeated dental procedures, a cracked tooth, or trauma. Without treatment, the infection spreads to surrounding bone, causing an abscess."},{t:'The Procedure Demystified',c:"With modern techniques and anesthesia, root canal treatment is no more uncomfortable than getting a filling. The procedure involves removing infected pulp tissue, cleaning and shaping the root canals, filling the canals with gutta-percha, and sealing the tooth."},{t:'Recovery and Success',c:'Some soreness is expected for a few days after treatment. Avoid chewing on the treated tooth until a crown is placed. Root canal treated teeth are brittle and MUST have a crown to protect them from fracture. Success rates are over 95%.'}],
        quiz:[{q:'What does root canal treatment do?',opts:['Removes the tooth','Saves infected tooth by removing pulp','Whitens the tooth','Repairs the enamel'],ans:1},{q:'What material is used to fill root canals?',opts:['Composite resin','Amalgam','Gutta-percha','Gold'],ans:2},{q:'What must be placed after root canal treatment?',opts:['A filling','A crown','A bridge','Nothing'],ans:1}]}
    ]},
  { id:'systemic_health', title:'Systemic Health & Oral Health', icon:'<i class="ph ph-heart"></i>️', color:'#EF4444', bg:'#fee2e2', desc:'How oral health connects to overall wellness',
    modules:[
      { id:'mouth_body', title:'Mouth-Body Connection', desc:'The link between oral and systemic health', icon:'<i class="ph ph-link"></i>', pts:10,
        lessons:[{t:'The Oral-Systemic Link',c:"Your mouth is the entry point to your body. The same bacteria that cause gum disease can enter your bloodstream through inflamed gum tissue. Once in circulation, these bacteria can travel to other organs and trigger inflammatory responses throughout the body."},{t:'Conditions Linked to Oral Health',c:"Cardiovascular disease: Oral bacteria may contribute to arterial plaque formation. Diabetes: A two-way relationship—diabetes worsens gum disease, and gum disease makes blood sugar harder to control. Respiratory infections: Bacteria from the mouth can be inhaled into the lungs."},{t:'Inflammation: The Common Thread',c:'Chronic inflammation is the underlying mechanism connecting oral and systemic disease. The inflammatory mediators (cytokines) released during gum disease enter the bloodstream and can affect inflammation levels throughout the body.'}],
        quiz:[{q:'How can oral bacteria reach other organs?',opts:['Through saliva','Through the bloodstream','Through breathing','They cannot travel'],ans:1},{q:'What is the common thread linking oral and systemic disease?',opts:['Bacteria','Sugar','Chronic inflammation','Genetics'],ans:2},{q:'Which condition has a two-way relationship with gum disease?',opts:['Arthritis','Diabetes','Asthma','Thyroid disease'],ans:1}]},
      { id:'nutrition', title:'Nutrition for Oral Health', desc:'Foods that protect or damage teeth', icon:'<i class="ph ph-bowl-food"></i>', pts:10,
        lessons:[{t:'Foods That Protect Teeth',c:"Calcium-rich foods (dairy, leafy greens, almonds): Strengthen enamel. Phosphorus-rich foods (meat, fish, eggs): Work with calcium to rebuild enamel. Crunchy fruits and vegetables (apples, carrots): Stimulate saliva and physically scrub teeth. Water: The best drink for teeth."},{t:'Foods That Damage Teeth',c:"Sugary foods and drinks: Feed acid-producing bacteria. Acidic foods (citrus, vinegar, carbonated drinks): Directly erode enamel. Sticky, chewy foods (dried fruit, gummy candy): Cling to teeth and prolong acid exposure."},{t:'Smart Eating Habits',c:"Limit snacking frequency—each snack triggers a 20-30 minute acid attack. End meals with dairy or alkaline foods to help neutralize acid. Drink water after meals. Wait 30 minutes after eating acidic foods before brushing."}],
        quiz:[{q:'Which mineral is essential for strengthening enamel?',opts:['Iron','Potassium','Calcium','Magnesium'],ans:2},{q:'What is the best drink for your teeth?',opts:['Milk','Green tea','Water','Coconut water'],ans:2},{q:'How long should you wait to brush after eating acidic foods?',opts:['Immediately','5 minutes','30 minutes','2 hours'],ans:2}]}
    ]},
  { id:'dental_emergencies', title:'Dental Emergencies', icon:'<i class="ph ph-siren"></i>', color:'#DC2626', bg:'#fee2e2', desc:'Know what to do in dental crisis situations',
    modules:[
      { id:'emergency_guide', title:'Emergency First Aid', desc:'Immediate steps for dental injuries', icon:'<i class="ph ph-first-aid"></i>', pts:10,
        lessons:[{t:'Knocked-Out Tooth',c:'If a permanent tooth is knocked out, hold it by the crown (never the root), gently rinse with milk or saline (not water), and try to place it back in the socket. If you cannot reinsert it, keep it moist in milk or between your cheek and gum. See a dentist within 30 minutes for the best chance of saving the tooth.'},{t:'Broken or Chipped Tooth',c:'Rinse your mouth with warm water and apply a cold compress to reduce swelling. Save any broken pieces. Cover any sharp edge with sugar-free gum or dental wax to protect your tongue and cheeks. Avoid chewing on that side and see a dentist as soon as possible.'},{t:'Severe Toothache',c:'Rinse with warm salt water (half teaspoon salt in 8 oz water). Gently floss around the tooth to remove any trapped food. Take over-the-counter pain relief as directed. Never place aspirin directly on the gum — it causes chemical burns. If pain is severe or accompanied by swelling or fever, seek emergency dental care.'}],
        quiz:[{q:'What should you store a knocked-out tooth in?',opts:['Water','Milk','Vinegar','Alcohol'],ans:1},{q:'How quickly should you see a dentist for a knocked-out tooth?',opts:['Within 24 hours','Within 30 minutes','Within 1 week','Anytime'],ans:1},{q:'What should you NEVER place directly on gums for pain?',opts:['Ice','Clove oil','Aspirin','Salt'],ans:2}]},
      { id:'when_emergency', title:'When to Seek Emergency Care', desc:'Recognizing true dental emergencies', icon:'<i class="ph ph-warning"></i>', pts:10,
        lessons:[{t:'True Dental Emergencies',c:'Not every dental problem requires emergency care. True emergencies include: uncontrolled bleeding after extraction, facial swelling that affects breathing or swallowing, trauma with broken jaw bones, knocked-out permanent teeth, and severe infection with fever and facial swelling.'},{t:'Urgent but Not Emergency',c:'These situations need prompt attention (within 24-48 hours) but may not require an emergency room visit: lost fillings or crowns, broken dentures, moderate toothache without swelling, chipped tooth without pain, and minor soft tissue injuries.'},{t:'Home Care While Waiting',c:'Before seeing a dentist: control bleeding with clean gauze and firm pressure, reduce swelling with cold compress (20 minutes on, 20 minutes off), manage pain with ibuprofen or acetaminophen as directed, and keep the area clean with gentle warm salt water rinses.'}],
        quiz:[{q:'Which is a true dental emergency?',opts:['Lost filling','Chipped tooth without pain','Facial swelling affecting breathing','Minor canker sore'],ans:2},{q:'How should you apply a cold compress?',opts:['Continuously','10 min on, 10 min off','20 min on, 20 min off','Only once for 5 min'],ans:2},{q:'What is the best way to control bleeding?',opts:['Rinse with water','Apply firm pressure with gauze','Apply ice directly','Ignore it'],ans:1}]}
    ]},
  { id:'myths_facts', title:'Myths vs Facts', icon:'<i class="ph ph-lightbulb"></i>', color:'#F59E0B', bg:'#fef3c7', desc:'Debunk common dental misconceptions',
    modules:[
      { id:'common_myths', title:'Common Dental Myths', desc:'Separating truth from fiction', icon:'<i class="ph ph-x-circle"></i>', pts:10,
        lessons:[{t:'Sugar is the Only Cause of Cavities',c:'MYTH. While sugar is a major factor, cavities are actually caused by ACID produced by bacteria feeding on any carbohydrate — bread, rice, chips, and crackers can be just as harmful. Frequency of eating matters more than quantity: sipping soda all day is worse than drinking one glass with a meal.'},{t:'Brushing Harder Cleans Better',c:'MYTH. Aggressive brushing actually damages enamel and causes gum recession, exposing sensitive root surfaces. The key is technique, not force. Use a soft-bristled brush with gentle circular motions for 2 minutes. Let the bristles do the work.'},{t:'White Teeth are Healthy Teeth',c:'MYTH. Tooth color varies naturally between individuals and does not indicate health. A person with perfectly white teeth can have hidden cavities, gum disease, or infections. Conversely, naturally yellowish teeth can be perfectly healthy. Regular check-ups are the only way to know your true oral health status.'}],
        quiz:[{q:'What actually causes cavities?',opts:['Sugar directly','Acid from bacteria feeding on carbs','Not brushing','Cold foods'],ans:1},{q:'What type of toothbrush bristles should you use?',opts:['Hard','Medium','Soft','Extra hard'],ans:2},{q:'Do white teeth always mean healthy teeth?',opts:['Yes always','No, color does not indicate health','Only if naturally white','Yes if whitened professionally'],ans:1}]},
      { id:'treatment_myths', title:'Treatment Myths', desc:'What really happens at the dentist', icon:'<i class="ph ph-tooth"></i>', pts:10,
        lessons:[{t:'Root Canals are Extremely Painful',c:'MYTH. Modern root canal treatment is performed under effective local anesthesia and is typically no more uncomfortable than getting a filling. The pain people associate with root canals is actually from the infection BEFORE treatment. The procedure itself relieves pain by removing the infected nerve tissue.'},{t:'Baby Teeth Do Not Matter',c:'MYTH. Baby teeth are crucial for proper jaw development, speech formation, and holding space for permanent teeth. Decay in baby teeth can damage the developing permanent teeth underneath and cause infections. Children should have their first dental visit by age 1.'},{t:'You Only Need a Dentist When in Pain',c:'MYTH. Most serious dental conditions (cavities, gum disease, oral cancer) are PAINLESS in their early stages. By the time you feel pain, significant damage has already occurred. Regular 6-month check-ups catch problems when they are small, simple, and affordable to treat.'}],
        quiz:[{q:'Are root canals extremely painful?',opts:['Yes always','No, modern ones are similar to fillings','Only without anesthesia','Depends on the tooth'],ans:1},{q:'Why are baby teeth important?',opts:['They are not important','For jaw development and spacing','Only for appearance','Only for eating'],ans:1},{q:'When should you visit a dentist?',opts:['Only when in pain','Every 6 months for regular check-ups','Once a year maximum','Only for emergencies'],ans:1}]}
    ]}
];

const DEFAULT_REMINDERS = [
  {id:1,name:'Morning Brush',icon:'<i class="ph ph-sun-horizon"></i>',time:'07:00',period:'Morning',on:true},
  {id:2,name:'Tongue Clean',icon:'<i class="ph ph-smiley-wink"></i>',time:'07:05',period:'Morning',on:true},
  {id:3,name:'Floss',icon:'<i class="ph ph-yarn"></i>',time:'07:10',period:'Morning',on:false},
  {id:4,name:'Mouthwash Rinse',icon:'<i class="ph ph-bottle"></i>',time:'07:15',period:'Morning',on:true},
  {id:5,name:'After Lunch Rinse',icon:'<i class="ph ph-drop"></i>',time:'13:00',period:'Afternoon',on:true},
  {id:6,name:'Interdental Clean',icon:'<i class="ph ph-wrench"></i>',time:'13:10',period:'Afternoon',on:false},
  {id:7,name:'Evening Brush',icon:'<i class="ph ph-moon"></i>',time:'21:00',period:'Evening',on:true},
  {id:8,name:'Night Floss',icon:'<i class="ph ph-yarn"></i>',time:'21:10',period:'Evening',on:true},
  {id:9,name:'Tongue Scraping',icon:'<i class="ph ph-smiley-wink"></i>',time:'21:15',period:'Evening',on:true},
  {id:10,name:'Fluoride Rinse',icon:'<i class="ph ph-tooth"></i>',time:'21:20',period:'Evening',on:false}
];


const ONBOARDING_SLIDES = [
  {icon:'<i class="ph ph-tooth"></i>', bg:'#dbeafe', title:'Welcome to ORCare', desc:'Your personal oral health companion. We help you build great habits, learn about dental health, and catch problems early.'},
  {icon:'<i class="ph ph-magnifying-glass"></i>', bg:'#dcfce7', title:'Symptom Checker', desc:'Not sure what that pain or spot is? Our symptom checker guides you with clear, reliable information and tells you when to see a dentist.'},
  {icon:'<i class="ph ph-robot"></i>', bg:'#ede9fe', title:'AI Oral Health Chat', desc:'Ask our AI assistant anything about your teeth and gums — 24/7, private, and powered by real dental knowledge.'},
  {icon:'<i class="ph ph-books"></i>', bg:'#fef3c7', title:'Learning Center', desc:'Explore 24+ expert-written modules covering hygiene, conditions, procedures, and more. Earn points as you learn!'},
  {icon:'<i class="ph ph-clock"></i>', bg:'#ccfbf1', title:'Smart Reminders', desc:'Set up daily reminders for brushing, flossing, and more. Building the right habits starts with consistency.'}
];

const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:5000/api' 
  : 'https://orcare-webapp.onrender.com/api';

const RAG_API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:8000/api/v1'
  : 'https://orcare-fastapi.onrender.com/api/v1';

/* =====================================================
   STATE
   ===================================================== */

export { DISEASES, SYMPTOMS, SYMPTOM_DETAILS, TIPS, LEARNING, DEFAULT_REMINDERS, ONBOARDING_SLIDES, API_BASE, RAG_API_BASE };
