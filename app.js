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
    whenToSeeDentist:'Seek care for unusually large sores, sores that keep spreading, or those accompanied by a high fever or difficulty drinking fluids.' }
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
  ? '/api' 
  : 'https://orcare-webapp.onrender.com/api';

/* =====================================================
   STATE
   ===================================================== */
const S = {
  screen: 'splash',
  params: {},
  user: null,
  token: null,
  language: 'en',
  onboarded: false,
  reminders: JSON.parse(JSON.stringify(DEFAULT_REMINDERS)),
  tipsFilter: 'All',
  activeTab: 'home',
  chat: { messages: [], typing: false, sessionId: null },
  quizState: { catId: null, modId: null, qIdx: 0, answered: false, score: 0, done: false, lessonTab: 0 },
  privacyToggles: { analytics: true, notifications: true, healthData: false }
};

function loadStorage() {
  try {
    const tok = localStorage.getItem('oc_token');
    const usr = localStorage.getItem('oc_user');
    const lang = localStorage.getItem('oc_lang');
    const onb = localStorage.getItem('oc_onboarded');
    if (tok) S.token = tok;
    if (usr) S.user = JSON.parse(usr);
    if (lang) S.language = lang;
    if (onb) S.onboarded = true;
  } catch(e) {}
}

function saveSession(token, user) {
  S.token = token; S.user = user;
  localStorage.setItem('oc_token', token);
  localStorage.setItem('oc_user', JSON.stringify(user));
}

function clearSession() {
  S.token = null; S.user = null; S.onboarded = false;
  localStorage.removeItem('oc_token');
  localStorage.removeItem('oc_user');
  localStorage.removeItem('oc_onboarded');
}

/* =====================================================
   ROUTER
   ===================================================== */
function go(screen, params = {}) {
  S.screen = screen; S.params = params;
  render();
}

function render() {
  const c = document.getElementById('screen-container');
  const screens = {
    splash:          renderSplash,

    signin:          renderSignIn,
    signup:          renderSignUp,
    otp_signup:      renderOtpSignup,
    forgot:          renderForgot,
    otp_forgot:      renderOtpForgot,
    reset:           renderReset,
    onboarding:      renderOnboarding,
    main:            renderMain,
    symptom_checker: renderSymptomChecker,
    symptom_detail:  renderSymptomDetail,
    disease_detail:  renderDiseaseDetail,
    learn_category:  renderLearnCategory,
    module_detail:   renderModuleDetail,
    reminders:       renderReminders,
    daily_tips:      renderDailyTips,
    edit_profile:    renderEditProfile,
    privacy_security:renderPrivacySecurity,
    privacy_policy:  renderPrivacyPolicy,
    help_feedback:   renderHelpFeedback,
    delete_account:  renderDeleteAccount,
  };
  const fn = screens[S.screen];
  if (fn) { c.innerHTML = fn(); attachHandlers(); }
}

/* =====================================================
   API SERVICE
   ===================================================== */
async function apiCall(method, path, body = null) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (S.token) opts.headers['Authorization'] = `Bearer ${S.token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(API_BASE + path, opts);
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json;
}

/* =====================================================
   TOAST
   ===================================================== */
function toast(msg, type = '') {
  const tc = document.getElementById('toast-container');
  const icons = { success: '<i class="ph ph-check-circle"></i>', danger: '<i class="ph ph-x-circle"></i>', warning: '<i class="ph ph-warning"></i>️', '': 'ℹ️' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  tc.appendChild(el);
  setTimeout(() => { el.classList.add('toast-fade-out'); setTimeout(() => el.remove(), 300); }, 3000);
}

/* =====================================================
   MODAL HELPERS
   ===================================================== */
function showModal(html) {
  const ov = document.createElement('div');
  ov.className = 'modal-overlay'; ov.id = 'modal-overlay';
  ov.innerHTML = `<div class="modal-sheet">${html}</div>`;
  ov.addEventListener('click', e => { if (e.target === ov) closeModal(); });
  document.body.appendChild(ov);
}
function closeModal() {
  const m = document.getElementById('modal-overlay');
  if (m) m.remove();
}

/* =====================================================
   UTILITIES
   ===================================================== */
function greet() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}
function fmtTime(t) {
  const [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${String(m).padStart(2,'0')} ${ap}`;
}
function getDailyTip() {
  const d = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return TIPS[(d - 1) % 30];
}
function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
}
function chatTime() {
  return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
}
function genSessionId() {
  return 'sess_' + Math.random().toString(36).slice(2);
}


/* =====================================================
   SCREEN: SPLASH
   ===================================================== */
function renderSplash() {
  return '<div class="screen splash"><div class="splash-logo"><i class="ph ph-tooth"></i></div><h1>ORCare</h1><p>Your personal oral health companion for a healthier, brighter smile</p><div class="splash-loader"></div></div>';
}


/* =====================================================
   SCREEN: SIGN IN & SIGN UP (Google Only)
   ===================================================== */
function renderSignIn() {
  return '<div class="screen auth-layout">'
    + '<div class="auth-left"><div class="auth-brand"><div class="auth-brand-icon"><i class="ph ph-tooth"></i></div>'
    + '<h1>ORCare</h1><p>Your personal oral health companion for a healthier, brighter smile</p></div>'
    + '<div class="auth-features">'
    + '<div class="auth-feature"><span class="auth-feature-icon"><i class="ph ph-microscope"></i></span><span class="auth-feature-text">AI-powered oral health guidance</span></div>'
    + '<div class="auth-feature"><span class="auth-feature-icon"><i class="ph ph-books"></i></span><span class="auth-feature-text">Expert learning modules</span></div>'
    + '<div class="auth-feature"><span class="auth-feature-icon"><i class="ph ph-clock"></i></span><span class="auth-feature-text">Smart hygiene reminders</span></div>'
    + '</div></div>'
    + '<div class="auth-right"><div class="auth-form-box" style="text-align:center; padding: 40px 20px;">'
    + '<div class="auth-brand-icon" style="margin: 0 auto 20px auto; background: var(--primary-bg); width: 64px; height: 64px; font-size: 32px; display:flex; align-items:center; justify-content:center; border-radius:16px;"><i class="ph ph-tooth"></i></div>'
    + '<div class="auth-form-title">Welcome to ORCare <i class="ph ph-sparkle"></i></div>'
    + '<div class="auth-form-sub" style="margin-bottom:30px">Sign in or create an account to start your oral health journey</div>'
    + '<button class="btn-primary" id="google-login-btn" style="background:#fff; color:#333; border: 1px solid #ddd; display:flex; align-items:center; justify-content:center; gap:10px;">'
    + '<img src="https://www.google.com/favicon.ico" width="20" height="20" />'
    + '<span id="google-btn-text">Continue with Google</span></button>'
    + '</div></div></div>';
}
function renderSignUp() { return renderSignIn(); }
function renderOtpSignup() { return renderSignIn(); }
function renderForgot() { return renderSignIn(); }
function renderOtpForgot() { return renderSignIn(); }
function renderReset() { return renderSignIn(); }

/* =====================================================
   SCREEN: ONBOARDING (5-slide carousel)
   ===================================================== */
var _obSlide = 0;
function renderOnboarding() {
  _obSlide = 0;
  const slides = ONBOARDING_SLIDES.map(function(s,i){
    return '<div class="onboard-slide ' + (i===0?'active':'') + '" id="ob-slide-' + i + '">'
      + '<div class="onboard-img" style="background:' + s.bg + '">' + s.icon + '</div>'
      + '<h2>' + s.title + '</h2><p>' + s.desc + '</p></div>';
  }).join('');
  const dots = ONBOARDING_SLIDES.map(function(_,i){
    return '<div class="onboard-dot ' + (i===0?'active':'') + '" id="ob-dot-' + i + '"></div>';
  }).join('');
  return '<div class="screen onboard-page">'
    + '<div class="onboard-inner">' + slides + '</div>'
    + '<div class="onboard-footer"><div class="onboard-dots">' + dots + '</div>'
    + '<div class="onboard-nav"><button class="onboard-skip" id="ob-skip">Skip</button>'
    + '<button class="btn-primary onboard-next" id="ob-next">Next →</button></div></div></div>';
}

/* =====================================================
   MAIN TAB SHELL
   ===================================================== */
function tabIcon(id) {
  return {home:'<i class="ph ph-house"></i>', chat:'<i class="ph ph-robot"></i>', learn:'<i class="ph ph-books"></i>', disease:'<i class="ph ph-tooth"></i>', profile:'<i class="ph ph-user"></i>'}[id];
}
function tabLabel(id) {
  return {home:'Home', chat:'AI Chat', learn:'Learn', disease:'Diseases', profile:'Profile'}[id];
}
function renderMain() {
  const tabContent = {
    home:    renderHomeContent,
    chat:    renderChatContent,
    learn:   renderLearnContent,
    disease: renderDiseaseContent,
    profile: renderProfileContent
  };
  const fn = tabContent[S.activeTab];
  const inner = fn ? fn() : '';
  const name  = S.user ? (S.user.name  || S.user.email || 'User') : 'User';
  const email = S.user ? (S.user.email || '') : '';
  const ini   = initials(name);
  const tabs = ['home','chat','learn','disease','profile'].map(function(id){
    return '<button class="tab-item ' + (S.activeTab===id?'active':'') + '" data-tab="' + id + '">'
      + '<span class="tab-icon">' + tabIcon(id) + '</span>'
      + '<span class="tab-label">' + tabLabel(id) + '</span></button>';
  }).join('');
  const sidebarItems = [
    {id:'home',    icon:'<i class="ph ph-house"></i>', label:'Home'},
    {id:'chat',    icon:'<i class="ph ph-robot"></i>', label:'AI Chat'},
    {id:'learn',   icon:'<i class="ph ph-books"></i>', label:'Learn'},
    {id:'disease', icon:'<i class="ph ph-tooth"></i>', label:'Oral Diseases'},
    {id:'profile', icon:'<i class="ph ph-user"></i>', label:'Profile'}
  ];
  const sidebarNav = sidebarItems.map(function(it){
    return '<button class="sidebar-item ' + (S.activeTab===it.id?'active':'') + '" data-tab="' + it.id + '">'
      + '<span class="sidebar-item-icon">' + it.icon + '</span>'
      + '<span class="sidebar-item-label">' + it.label + '</span></button>';
  }).join('');
  const topBarTitles = {home:'Home', chat:'AI Chat', learn:'Learning Center', disease:'Oral Diseases', profile:'Profile'};
  const topBarIcons  = {home:'<i class="ph ph-house"></i>', chat:'<i class="ph ph-robot"></i>', learn:'<i class="ph ph-books"></i>', disease:'<i class="ph ph-tooth"></i>', profile:'<i class="ph ph-user"></i>'};
  // Chat needs flex column layout without overflow-y:auto so messages can scroll internally
  const appContentStyle = S.activeTab === 'chat'
    ? 'style="display:flex;flex-direction:column;overflow:hidden;flex:1"'
    : '';
  const topBarExtra = S.activeTab === 'chat'
    ? '<button class="top-bar-action" id="chat-new-btn" title="New Chat"><i class="ph ph-arrows-clockwise"></i></button>'
    : '';
  return '<div class="screen app-layout">'
    + '<nav class="sidebar">'
    + '<div class="sidebar-logo"><div class="sidebar-logo-icon"><i class="ph ph-tooth"></i></div>'
    + '<div><div class="sidebar-logo-text">ORCare</div><div class="sidebar-logo-sub">Oral Health Companion</div></div></div>'
    + '<div class="sidebar-user"><div class="sidebar-avatar">' + ini + '</div>'
    + '<div><div class="sidebar-user-name">' + name + '</div><div class="sidebar-user-email">' + email + '</div></div></div>'
    + '<div class="sidebar-nav">' + sidebarNav + '</div>'
    + '<div class="sidebar-footer"><button class="sidebar-signout" id="sidebar-signout">'
    + '<span class="sidebar-signout-icon"><i class="ph ph-sign-out"></i></span><span class="sidebar-signout-label">Sign Out</span></button></div>'
    + '</nav>'
    + '<div class="app-main">'
    + '<div class="top-bar"><div class="top-bar-title">' + topBarIcons[S.activeTab] + ' ' + topBarTitles[S.activeTab] + '</div>' + topBarExtra + '</div>'
    + '<div class="app-content" ' + appContentStyle + '>' + inner + '</div>'
    + '<nav class="bottom-nav">' + tabs + '</nav>'
    + '</div></div>';
}

/* =====================================================
   HOME TAB CONTENT
   ===================================================== */
function renderHomeContent() {
  const tip = getDailyTip();
  const name = S.user ? S.user.name || S.user.email : 'Guest';
  const ini = initials(name);
  return '<div class="home-hero">'
    + '<div class="home-header-row"><div><div class="home-greeting">' + greet() + ' <i class="ph ph-hand-waving"></i></div>'
    + '<div class="home-name">' + name + '</div></div>'
    + '<div class="home-avatar" id="home-avatar-btn">' + ini + '</div></div>'
    + '</div>'
    + '<div class="page">'
    + '<div class="section-title">Quick Actions</div>'
    + '<div class="quick-grid">'
    + quickCard('<i class="ph ph-magnifying-glass"></i>','Symptom Checker','Check your symptoms','#dbeafe','symptom_checker')
    + quickCard('<i class="ph ph-robot"></i>','Ask AI','Oral health queries','#ede9fe','chat_tab')
    + quickCard('<i class="ph ph-clock"></i>','Reminders','Daily hygiene alerts','#ccfbf1','reminders')
    + quickCard('<i class="ph ph-lightbulb"></i>','Daily Tips','Oral health tips','#fef3c7','daily_tips')
    + '</div>'
    + '<div class="section-title">Today\'s Health Tip</div>'
    + '<div class="tip-card"><div class="tip-icon-box">' + tip.icon + '</div>'
    + '<div class="tip-info"><div class="tip-badge">Daily Tip</div>'
    + '<h4>' + tip.title + '</h4><p>' + tip.desc + '</p></div></div>'
    + '<div class="section-title">ORCare at a Glance</div>'
    + '<div class="stat-row">'
    + '<div class="stat-card"><div class="stat-val">10</div><div class="stat-lbl">Reminders</div></div>'
    + '<div class="stat-card"><div class="stat-val">24+</div><div class="stat-lbl">Modules</div></div>'
    + '<div class="stat-card"><div class="stat-val">6</div><div class="stat-lbl">Diseases</div></div>'
    + '<div class="stat-card"><div class="stat-val">14</div><div class="stat-lbl">Symptoms</div></div>'
    + '</div>'
    + '</div>';
}
function quickCard(icon,title,sub,bg,action) {
  return '<div class="quick-card" data-action="' + action + '">'
    + '<div class="quick-card-icon" style="background:' + bg + '">' + icon + '</div>'
    + '<div class="quick-card-title">' + title + '</div>'
    + '<div class="quick-card-sub">' + sub + '</div></div>';
}

/* =====================================================
   CHAT TAB CONTENT
   ===================================================== */
function renderChatContent() {
  if (!S.chat.sessionId) {
    S.chat.sessionId = genSessionId();
    S.chat.messages = [{ role:'bot', text:'Hi there! <i class="ph ph-hand-waving"></i> I\'m ORCare AI, your oral health assistant. Ask me anything about teeth, gums, dental procedures, or oral hygiene!', time: chatTime() }];
  }
  const msgs = S.chat.messages.map(function(m){ return renderChatMsg(m); }).join('');
  const typingBubble = S.chat.typing
    ? '<div class="chat-msg bot"><div class="chat-avatar"><i class="ph ph-robot"></i></div><div class="chat-bubble bot"><div class="typing-bubble"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div></div>'
    : '';
  const suggestions = ['How to brush properly?','What causes bad breath?','When to see a dentist?','Foods bad for teeth'];
  const chips = suggestions.map(function(s){
    return '<span class="chat-suggestion" data-sug="' + s + '">' + s + '</span>';
  }).join('');
  return '<div class="chat-messages" id="chat-messages">' + msgs + typingBubble + '</div>'
    + '<div class="chat-suggestions">' + chips + '</div>'
    + '<div class="chat-input-row">'
    + '<div class="chat-input-wrap"><textarea class="chat-input" id="chat-input" placeholder="Ask about oral health..." rows="1"></textarea></div>'
    + '<button class="chat-send-btn" id="chat-send-btn"><i class="ph ph-caret-right"></i></button>'
    + '</div>';
}
function renderChatMsg(m) {
  if (m.role === 'bot') {
    return '<div class="chat-msg bot"><div class="chat-avatar"><i class="ph ph-robot"></i></div><div><div class="chat-bubble">' + m.text + '</div><div class="chat-time">' + m.time + '</div></div></div>';
  }
  return '<div class="chat-msg user"><div class="chat-avatar" style="background:var(--accent-bg)"><i class="ph ph-user"></i></div><div><div class="chat-bubble">' + m.text + '</div><div class="chat-time">' + m.time + '</div></div></div>';
}

/* =====================================================
   LEARNING CENTER TAB CONTENT
   ===================================================== */
function renderLearnContent() {
  const cats = LEARNING.map(function(cat){
    const modCount = cat.modules.length;
    return '<div class="learn-cat-card" data-cat="' + cat.id + '">'
      + '<div class="learn-cat-icon" style="background:' + cat.bg + '">' + cat.icon + '</div>'
      + '<div class="learn-cat-title">' + cat.title + '</div>'
      + '<div class="learn-cat-count">' + modCount + ' modules</div>'
      + '<div class="learn-cat-progress"><div class="learn-cat-bar" style="width:0%"></div></div>'
      + '</div>';
  }).join('');
  return '<div class="page">'
    + '<p style="font-size:13px;color:var(--text-2);margin-bottom:20px">Explore ' + LEARNING.length + ' categories and 24+ expert modules</p>'
    + '<div class="learning-grid">' + cats + '</div>'
    + '</div>';
}

/* =====================================================
   ORAL DISEASE TAB CONTENT
   ===================================================== */
function renderDiseaseContent() {
  const cards = DISEASES.map(function(d){
    return '<div class="disease-card" data-disease="' + d.id + '">'
      + '<div class="disease-card-icon" style="background:' + d.bg + '; color:' + d.color + '">' + d.icon + '</div>'
      + '<div class="disease-card-body">'
      + '<div class="disease-card-name">' + d.name + '</div>'
      + '<div class="disease-card-desc">' + d.whatPeopleNotice.slice(0,70) + '...</div>'
      + '</div><div class="disease-card-arrow">›</div></div>';
  }).join('');
  return '<div class="page">'
    + '<p style="font-size:13px;color:var(--text-2);margin-bottom:20px">Learn about common oral diseases, causes, and when to see a dentist</p>'
    + '<div class="disease-grid">' + cards + '</div>'
    + '</div>';
}

/* =====================================================
   PROFILE TAB CONTENT
   ===================================================== */
function renderProfileContent() {
  const name  = S.user ? (S.user.name || 'User') : 'Guest';
  const email = S.user ? (S.user.email || '') : '';
  const age   = S.user ? (S.user.age   || '') : '';
  const gender= S.user ? (S.user.gender|| '') : '';
  const ini   = initials(name);
  const badges= [age?'Age '+age:'',gender||''].filter(Boolean).map(function(b){
    return '<span class="profile-badge">' + b + '</span>';
  }).join('');
  const menuSections = [
    { title:'My Health', items:[
      {icon:'<i class="ph ph-pencil"></i>️',bg:'#dbeafe',title:'Edit Profile',sub:'Update your information',action:'edit_profile'},
      {icon:'<i class="ph ph-clock"></i>',bg:'#ccfbf1',title:'Reminders',sub:'Manage hygiene alerts',action:'reminders'},
      {icon:'<i class="ph ph-lightbulb"></i>',bg:'#fef3c7',title:'Daily Tips',sub:'Browse all oral health tips',action:'daily_tips'}
    ]},
    { title:'Settings & Privacy', items:[
      {icon:'<i class="ph ph-lock"></i>',bg:'#ede9fe',title:'Privacy & Security',sub:'Control your data',action:'privacy_security'},
      {icon:'<i class="ph ph-clipboard-text"></i>',bg:'#dcfce7',title:'Privacy Policy',sub:'How we use your data',action:'privacy_policy'}
    ]},
    { title:'Support', items:[
      {icon:'<i class="ph ph-chat-circle-text"></i>',bg:'#fee2e2',title:'Help & Feedback',sub:'Get help or send feedback',action:'help_feedback'}
    ]},
    { title:'Account', items:[
      {icon:'<i class="ph ph-sign-out"></i>',bg:'#f1f5f9',title:'Sign Out',sub:'Sign out of ORCare',action:'signout'},
      {icon:'<i class="ph ph-trash"></i>️',bg:'#fee2e2',title:'Delete Account',sub:'Permanently remove account',action:'delete_account',danger:true}
    ]}
  ];
  const sectionsHtml = menuSections.map(function(sec){
    const items = sec.items.map(function(item){
      return '<button class="menu-item ' + (item.danger?'danger':'') + '" data-action="' + item.action + '">'
        + '<div class="menu-item-icon" style="background:' + item.bg + '">' + item.icon + '</div>'
        + '<div class="menu-item-text"><div class="menu-item-title">' + item.title + '</div>'
        + '<div class="menu-item-sub">' + item.sub + '</div></div>'
        + '<span class="menu-item-chevron">›</span></button>';
    }).join('');
    return '<div class="menu-section"><div class="menu-section-title">' + sec.title + '</div>'
      + '<div class="menu-card">' + items + '</div></div>';
  }).join('');
  return '<div class="profile-hero"><div class="profile-avatar">' + ini + '</div>'
    + '<div><div class="profile-name">' + name + '</div>'
    + '<div class="profile-email">' + email + '</div>'
    + (badges ? '<div class="profile-badges">' + badges + '</div>' : '')
    + '</div></div>'
    + '<div class="page"><div class="profile-content">' + sectionsHtml + '</div></div>';
}


/* =====================================================
   SCREEN: DISEASE DETAIL
   ===================================================== */
function renderDiseaseDetail() {
  const d = DISEASES.find(function(x){ return x.id === S.params.id; });
  if (!d) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button><div class="top-bar-title">Disease</div></div><div style="padding:40px;text-align:center">Not found</div></div>';
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + d.name + '</div></div>'
    + '<div class="detail-hero" style="background:' + d.bg + '">'
    + '<div class="detail-hero-icon" style="background:' + d.bg + ';border:2px solid ' + d.color + '33">' + d.icon + '</div>'
    + '<h1>' + d.name + '</h1>'
    + '<p class="tagline">Understanding what is happening and what to do about it</p></div>'
    + '<div class="detail-body">'
    + detailSection('<i class="ph ph-microscope"></i>','What Is Happening',d.whatIsHappening)
    + detailSection('<i class="ph ph-eye"></i>️','What People Notice',d.whatPeopleNotice)
    + detailSection('<i class="ph ph-question"></i>','Why It Happens',d.whyItHappens)
    + detailSection('<i class="ph ph-lightning"></i>','Why You Should Not Ignore It',d.whyNotIgnore)
    + '<div class="dentist-card"><div class="dentist-icon"><i class="ph ph-hospital"></i></div><div><h4>When to See a Dentist</h4><p>' + d.whenToSeeDentist + '</p></div></div>'
    + '</div></div>';
}
function detailSection(icon,title,text) {
  return '<div class="detail-section"><div class="detail-section-title"><span class="ds-icon">' + icon + '</span>' + title + '</div><p>' + text + '</p></div>';
}

/* =====================================================
   SCREEN: SYMPTOM CHECKER
   ===================================================== */
function renderSymptomChecker() {
  var q = S.params.q || '';
  const chips = SYMPTOMS.filter(function(s){
    return !q || s.title.toLowerCase().includes(q.toLowerCase());
  }).map(function(s){
    return '<div class="symptom-chip" data-symptom="' + s.title.toLowerCase() + '">'
      + '<div class="chip-icon" style="background:' + s.bg + '; color:' + s.color + '">' + s.icon + '</div>'
      + '<div class="chip-name">' + s.title + '</div></div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Symptom Checker</div></div>'
    + '<div class="search-bar-wrap"><div class="search-bar"><span class="search-icon"><i class="ph ph-magnifying-glass"></i></span>'
    + '<input id="sym-search" placeholder="Search symptom..." value="' + q + '" /></div></div>'
    + '<div class="page"><div class="symptom-grid">' + chips + '</div></div>'
    + '</div>';
}

/* =====================================================
   SCREEN: SYMPTOM DETAIL
   ===================================================== */
function renderSymptomDetail() {
  const key = S.params.symptom || '';
  const d = SYMPTOM_DETAILS[key];
  const sym = SYMPTOMS.find(function(s){ return s.title.toLowerCase() === key; });
  if (!d || !sym) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button><div class="top-bar-title">Symptom</div></div><div style="padding:40px;text-align:center">Not found</div></div>';
  const reasons = d.possibleReasons.map(function(r){ return '<div class="detail-list-item">' + r + '</div>'; }).join('');
  const todos   = d.whatToDo.map(function(t){ return '<div class="detail-list-item">' + t + '</div>'; }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + sym.title + '</div></div>'
    + '<div class="detail-hero" style="background:' + sym.bg + '">'
    + '<div class="detail-hero-icon" style="background:' + sym.bg + '">' + sym.icon + '</div>'
    + '<h1>' + sym.title + '</h1>'
    + '<p class="tagline">' + d.whatIsHappening + '</p></div>'
    + '<div class="detail-body">'
    + detailSection('<i class="ph ph-eye"></i>️','What People Notice',d.whatPeopleNotice)
    + '<div class="detail-section"><div class="detail-section-title"><span class="ds-icon"><i class="ph ph-question"></i></span>Possible Reasons</div><div class="detail-list">' + reasons + '</div></div>'
    + '<div class="detail-section"><div class="detail-section-title"><span class="ds-icon"><i class="ph ph-pill"></i></span>What You Can Do</div><div class="detail-list">' + todos + '</div></div>'
    + '<div class="dentist-card"><div class="dentist-icon"><i class="ph ph-hospital"></i></div><div><h4>When to See a Dentist</h4><p>' + d.whenToSeeDentist + '</p></div></div>'
    + '</div></div>';
}

/* =====================================================
   SCREEN: LEARNING CATEGORY
   ===================================================== */
function renderLearnCategory() {
  const cat = LEARNING.find(function(c){ return c.id === S.params.catId; });
  if (!cat) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button></div></div>';
  const mods = cat.modules.map(function(m){
    return '<div class="module-card" data-cat="' + cat.id + '" data-mod="' + m.id + '">'
      + '<div class="module-icon">' + m.icon + '</div>'
      + '<div class="module-body"><div class="module-title">' + m.title + '</div><div class="module-desc">' + m.desc + '</div></div>'
      + '<div class="module-pts">+' + m.pts + 'pts</div></div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + cat.icon + ' ' + cat.title + '</div></div>'
    + '<div style="background:' + cat.bg + ';padding:14px 28px;font-size:13px;color:var(--text-2);flex-shrink:0">' + cat.desc + ' — ' + cat.modules.length + ' modules</div>'
    + '<div class="page"><div class="module-list">' + mods + '</div></div>'
    + '</div>';
}

/* =====================================================
   SCREEN: MODULE DETAIL (Lessons + Quiz)
   ===================================================== */
function renderModuleDetail() {
  const cat = LEARNING.find(function(c){ return c.id === S.params.catId; });
  const mod = cat && cat.modules.find(function(m){ return m.id === S.params.modId; });
  if (!mod) return '<div class="screen"><div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button></div></div>';
  const qs = S.quizState;
  const tabs = mod.lessons.map(function(l,i){
    return '<button class="lesson-tab ' + (qs.lessonTab===i?'active':'') + '" data-ltab="' + i + '">' + (i+1) + '. ' + l.t + '</button>';
  }).join('') + '<button class="lesson-tab ' + (qs.lessonTab===mod.lessons.length?'active':'') + '" data-ltab="' + mod.lessons.length + '">Quiz</button>';
  let body;
  if (qs.lessonTab < mod.lessons.length) {
    const l = mod.lessons[qs.lessonTab];
    body = '<div class="lesson-content"><div class="lesson-card">'
      + '<div class="lesson-num">LESSON ' + (qs.lessonTab+1) + ' OF ' + mod.lessons.length + '</div>'
      + '<div class="lesson-title">' + l.t + '</div>'
      + '<div class="lesson-text">' + l.c + '</div></div>'
      + (qs.lessonTab < mod.lessons.length-1
          ? '<button class="btn-primary" id="next-lesson-btn" style="margin:0 18px 18px">Next Lesson →</button>'
          : '<button class="btn-accent" id="to-quiz-btn" style="margin:0 18px 18px">Take the Quiz →</button>')
      + '</div>';
  } else if (qs.done) {
    const pct = Math.round((qs.score/mod.quiz.length)*100);
    const emoji = pct >= 80 ? '<i class="ph ph-trophy"></i>' : pct >= 50 ? '<i class="ph ph-thumbs-up"></i>' : '<i class="ph ph-book-open"></i>';
    body = '<div class="quiz-container"><div class="quiz-result">'
      + '<div class="result-icon">' + emoji + '</div>'
      + '<h3>' + (pct>=80?'Excellent!':pct>=50?'Good Job!':'Keep Learning!') + '</h3>'
      + '<div class="quiz-score-badge">' + qs.score + '/' + mod.quiz.length + '</div>'
      + '<p>You scored ' + pct + '% — ' + (pct>=80?'Outstanding!':pct>=50?'You\'re making progress!':'Review the lessons and try again.') + '</p>'
      + '<button class="btn-primary" id="quiz-retry-btn">Retry Quiz</button>'
      + '<div style="height:12px"></div>'
      + '<button class="btn-ghost" id="back-to-cat-btn" style="margin-top:8px">Back to Modules</button>'
      + '</div></div>';
  } else {
    const q = mod.quiz[qs.qIdx];
    const opts = q.opts.map(function(opt,i){
      let cls = 'quiz-option';
      const letter = String.fromCharCode(65+i);
      if (qs.answered) {
        if (i === q.ans) cls += ' correct';
        else if (i === qs.selectedOpt) cls += ' wrong';
      }
      return '<button class="' + cls + '" data-opt="' + i + '"><span class="opt-letter">' + letter + '</span>' + opt + '</button>';
    }).join('');
    const prog = Math.round(((qs.qIdx)/(mod.quiz.length))*100);
    body = '<div class="quiz-container">'
      + '<div class="quiz-progress"><span style="font-size:12px;font-weight:700;color:var(--text-2)">Q' + (qs.qIdx+1) + '</span>'
      + '<div class="quiz-prog-bar-wrap"><div class="quiz-prog-bar" style="width:' + prog + '%"></div></div>'
      + '<span style="font-size:12px;font-weight:700;color:var(--text-2)">' + mod.quiz.length + '</span></div>'
      + '<div class="quiz-q-counter">Question ' + (qs.qIdx+1) + ' of ' + mod.quiz.length + '</div>'
      + '<div class="quiz-question">' + q.q + '</div>'
      + '<div class="quiz-options">' + opts + '</div>'
      + (qs.answered ? '<button class="btn-primary" id="quiz-next-btn" style="margin-top:16px">' + (qs.qIdx < mod.quiz.length-1 ? 'Next Question →' : 'See Results') + '</button>' : '')
      + '</div>';
  }
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">' + mod.icon + ' ' + mod.title + '</div>'
    + '<span class="badge badge-accent">+' + mod.pts + 'pts</span></div>'
    + '<div class="lesson-tabs">' + tabs + '</div>'
    + body + '</div>';
}

/* =====================================================
   SCREEN: REMINDERS
   ===================================================== */
function renderReminders() {
  const periods = ['Morning','Afternoon','Evening'];
  const sections = periods.map(function(p){
    const items = S.reminders.filter(function(r){ return r.period===p; }).map(function(r){
      return '<div class="reminder-card">'
        + '<div class="reminder-icon">' + r.icon + '</div>'
        + '<div class="reminder-body"><div class="reminder-name">' + r.name + '</div>'
        + '<div class="reminder-time">' + fmtTime(r.time) + '</div></div>'
        + '<button class="reminder-edit-btn" data-rid="' + r.id + '"><i class="ph ph-pencil"></i>️</button>'
        + '<button class="reminder-toggle ' + (r.on?'on':'') + '" data-rid="' + r.id + '"></button>'
        + '</div>';
    }).join('');
    const icons = {Morning:'<i class="ph ph-sun-horizon"></i>',Afternoon:'<i class="ph ph-sun"></i>️',Evening:'<i class="ph ph-moon"></i>'};
    return '<div class="reminder-period"><div class="reminder-period-title"><span>' + icons[p] + '</span>' + p + '</div>' + items + '</div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title"><i class="ph ph-clock"></i> Reminders</div></div>'
    + '<div class="page">' + sections + '</div>'
    + '</div>';
}

/* =====================================================
   SCREEN: DAILY TIPS
   ===================================================== */
function renderDailyTips() {
  const cats = ['All','Hygiene','Food','Lifestyle','Myth Busting','Age 7-9'];
  const chips = cats.map(function(c){
    return '<div class="tips-filter-chip ' + (S.tipsFilter===c?'active':'') + '" data-cat="' + c + '">' + c + '</div>';
  }).join('');
  const filtered = S.tipsFilter === 'All' ? TIPS : TIPS.filter(function(t){ return t.cat===S.tipsFilter; });
  const items = filtered.map(function(t){
    return '<div class="tip-item"><div class="tip-item-icon">' + t.icon + '</div>'
      + '<div class="tip-item-body"><div class="tip-item-cat">' + t.cat + '</div>'
      + '<div class="tip-item-title">' + t.title + '</div>'
      + '<div class="tip-item-desc">' + t.desc + '</div></div></div>';
  }).join('');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title"><i class="ph ph-lightbulb"></i> Daily Tips</div></div>'
    + '<div class="page">'
    + '<div class="tips-filter">' + chips + '</div>'
    + '<div class="tips-grid">' + items + '</div>'
    + '</div>'
    + '</div>';
}

/* =====================================================
   SCREEN: EDIT PROFILE
   ===================================================== */
function renderEditProfile() {
  const u = S.user || {};
  const ini = initials(u.name || 'U');
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Edit Profile</div></div>'
    + '<div class="edit-avatar-wrap"><div class="edit-avatar">' + ini + '</div></div>'
    + '<div class="edit-form">'
    + epField('Full Name','<i class="ph ph-user"></i>','ep-name','text',u.name||'','Your full name')
    + epField('Email Address','<i class="ph ph-envelope"></i>','ep-email','email',u.email||'','your@email.com')
    + epField('Age','<i class="ph ph-cake"></i>','ep-age','number',u.age||'','Your age')
    + '<div class="form-group"><label class="form-label">Gender</label>'
    + '<div class="form-input-wrap"><span class="input-icon"><i class="ph ph-gender-intersex"></i></span>'
    + '<select id="ep-gender"><option value="">Select</option>'
    + ['Male','Female','Other'].map(function(g){ return '<option ' + (u.gender===g?'selected':'') + '>' + g + '</option>'; }).join('')
    + '</select></div></div>'
    + epField('District','<i class="ph ph-map-pin"></i>','ep-district','text',u.district||'','Your district')
    + epField('State','<i class="ph ph-map"></i>️','ep-state','text',u.state||'','Your state')
    + '<button class="btn-primary" id="save-profile-btn"><span id="save-profile-text">Save Changes</span></button>'
    + '</div></div>';
}
function epField(label,icon,id,type,val,ph) {
  return '<div class="form-group"><label class="form-label">' + label + '</label>'
    + '<div class="form-input-wrap"><span class="input-icon">' + icon + '</span>'
    + '<input type="' + type + '" id="' + id + '" value="' + val + '" placeholder="' + ph + '" /></div></div>';
}

/* =====================================================
   SCREEN: PRIVACY & SECURITY
   ===================================================== */
function renderPrivacySecurity() {
  const row = function(id,title,sub) {
    return '<div class="toggle-row"><div class="toggle-row-info"><div class="toggle-row-title">' + title + '</div>'
      + '<div class="toggle-row-sub">' + sub + '</div></div>'
      + '<button class="toggle-switch ' + (S.privacyToggles[id]?'on':'') + '" data-toggle="' + id + '"></button></div>';
  };
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Privacy &amp; Security</div></div>'
    + '<div class="privacy-body">'
    + '<div class="privacy-section"><h3>Data &amp; Privacy</h3><p>Control how ORCare uses your data. Your health information is always encrypted and never sold.</p></div>'
    + row('analytics','Usage Analytics','Help us improve the app by sharing anonymous usage data')
    + row('notifications','Push Notifications','Receive reminders and health tips')
    + row('healthData','Share Health Data','Allow health data to be used for personalised recommendations')
    + '<div style="height:20px"></div>'
    + '<div class="privacy-section"><h3>Security</h3></div>'
    + '<div class="menu-card"><button class="menu-item" data-action="change_pw"><div class="menu-item-icon" style="background:#dbeafe"><i class="ph ph-lock"></i></div><div class="menu-item-text"><div class="menu-item-title">Change Password</div><div class="menu-item-sub">Update your account password</div></div><span class="menu-item-chevron">›</span></button>'
    + '<button class="menu-item" id="clear-data-btn"><div class="menu-item-icon" style="background:#fee2e2"><i class="ph ph-trash"></i>️</div><div class="menu-item-text"><div class="menu-item-title">Clear App Data</div><div class="menu-item-sub">Reset all local data and preferences</div></div><span class="menu-item-chevron">›</span></button></div>'
    + '</div></div>';
}

/* =====================================================
   SCREEN: PRIVACY POLICY
   ===================================================== */
function renderPrivacyPolicy() {
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Privacy Policy</div></div>'
    + '<div class="privacy-body">'
    + ppSection('Introduction','ORCare is committed to protecting your personal information and your right to privacy. This policy explains what information we collect, how we use it, and your rights in relation to it.')
    + ppSection('Information We Collect','We collect information you provide directly to us, such as your name, email address, age, gender, and location. We also collect information about how you use the app, including features you access and reminders you set.')
    + ppSection('How We Use Your Information','We use the information we collect to: provide, maintain, and improve our services; send you reminders and health tips; analyze usage to improve the app experience; and respond to your feedback and support requests.')
    + ppSection('Data Security','We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit using TLS 1.3.')
    + ppSection('Data Retention','We retain your personal data for as long as you maintain an account with us. You can request deletion of your account and data at any time from the Delete Account screen.')
    + ppSection('Your Rights','You have the right to access, correct, or delete your personal data. You can update your profile information in the Edit Profile screen. To delete your account, visit Account Settings.')
    + ppSection('Contact Us','If you have any questions about this Privacy Policy, please contact us at privacy@orcare.health')
    + '</div></div>';
}
function ppSection(title,text) {
  return '<div class="privacy-section"><h3>' + title + '</h3><p>' + text + '</p></div>';
}

/* =====================================================
   SCREEN: HELP & FEEDBACK
   ===================================================== */
function renderHelpFeedback() {
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Help &amp; Feedback</div></div>'
    + '<div class="help-body">'
    + '<div class="help-card"><div class="help-card-icon"><i class="ph ph-chat-circle-text"></i></div>'
    + '<div><h3>We are here to help!</h3><p>Share your feedback or report an issue and we will get back to you shortly.</p></div></div>'
    + '<div class="help-form">'
    + epField('Your Name','<i class="ph ph-user"></i>','hf-name','text',S.user?S.user.name||'':'','Your name')
    + epField('Email Address','<i class="ph ph-envelope"></i>','hf-email','email',S.user?S.user.email||'':'','your@email.com')
    + '<div class="form-group"><label class="form-label">Message</label>'
    + '<div class="textarea-wrap"><textarea id="hf-msg" placeholder="Describe your issue or feedback in detail..."></textarea></div></div>'
    + '<button class="btn-primary" id="hf-submit-btn"><span id="hf-submit-text">Send Feedback</span></button>'
    + '</div></div></div>';
}

/* =====================================================
   SCREEN: DELETE ACCOUNT
   ===================================================== */
function renderDeleteAccount() {
  return '<div class="screen">'
    + '<div class="top-bar"><button class="top-bar-back" id="back-btn">&#8592;</button>'
    + '<div class="top-bar-title">Delete Account</div></div>'
    + '<div class="delete-body">'
    + '<div class="delete-warning"><div class="delete-warning-icon"><i class="ph ph-warning"></i>️</div>'
    + '<div><h4>This action cannot be undone</h4><p>Deleting your account is permanent and will remove all your data, including progress, reminders, and profile information.</p></div></div>'
    + '<div class="delete-consequences"><h4>What you will lose:</h4>'
    + ['All profile and personal data','Learning progress and points','Custom reminders and settings','Chat history with ORCare AI','Access to personalized features'].map(function(c){
        return '<div class="delete-consequence-item"><span class="ci-icon"><i class="ph ph-x-circle"></i></span>' + c + '</div>';
      }).join('')
    + '</div>'
    + '<button class="btn-danger-outline" id="del-confirm-btn" style="margin-top:24px"><span id="del-btn-text">Delete My Account</span></button>'
    + '</div></div>';
}

/* =====================================================
   EVENT HANDLERS (attached after each render)
   ===================================================== */
function attachHandlers() {
  const sc = S.screen;

  /* ---- Universal back button ---- */
  on('back-btn', 'click', function(){
    const backMap = {
      symptom_checker: function(){ S.activeTab='home'; go('main'); },
      symptom_detail:  function(){ go('symptom_checker'); },
      disease_detail:  function(){ S.activeTab='disease'; go('main'); },
      learn_category:  function(){ S.activeTab='learn'; go('main'); },
      module_detail:   function(){ go('learn_category',{catId:S.params.catId}); },
      reminders:       function(){ S.activeTab='profile'; go('main'); },
      daily_tips:      function(){ S.activeTab='profile'; go('main'); },
      edit_profile:    function(){ S.activeTab='profile'; go('main'); },
      privacy_security:function(){ S.activeTab='profile'; go('main'); },
      privacy_policy:  function(){ S.activeTab='profile'; go('main'); },
      help_feedback:   function(){ S.activeTab='profile'; go('main'); },
      delete_account:  function(){ S.activeTab='profile'; go('main'); },
    };
    const fn = backMap[sc];
    if (fn) fn(); else go('main');
  });

  /* ---- ONBOARDING ---- */
  if (sc === 'onboarding') {
    on('ob-next','click', function(){
      if (_obSlide < ONBOARDING_SLIDES.length - 1) {
        _obSlide++;
        render();
      } else {
        finishOnboarding();
      }
    });
    on('ob-skip','click', function(){
      finishOnboarding();
    });
  }

  /* ---- SPLASH ---- */
  if (sc === 'splash') {
    setTimeout(function(){
      if (S.user && S.token) { go(S.onboarded ? 'main' : 'onboarding'); }
      else { go('signin'); }
    }, 2200);
  }


  /* ---- SIGN IN / SIGN UP ---- */
  if (sc === 'signin' || sc === 'signup' || sc === 'otp_signup' || sc === 'forgot' || sc === 'otp_forgot' || sc === 'reset') {
    on('google-login-btn', 'click', async function() {
      setBtnLoading('google-login-btn', 'google-btn-text', 'Redirecting...', true);
      try {
        if (!window.supabaseClient) throw new Error("Supabase is not initialized.");
        const { data, error } = await window.supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: { redirectTo: window.location.origin }
        });
        if (error) throw error;
      } catch (err) {
        toast('Google Login Error: ' + err.message, 'danger');
        setBtnLoading('google-login-btn', 'google-btn-text', 'Continue with Google', false);
      }
    });
  }

  /* ---- MAIN TABS ---- */
  if (sc === 'main') {
    /* Bottom nav tabs (mobile) */
    qAll('.tab-item').forEach(function(el){
      el.addEventListener('click', function(){
        S.activeTab = el.dataset.tab;
        render();
      });
    });
    /* Sidebar nav items (desktop) */
    qAll('.sidebar-item[data-tab]').forEach(function(el){
      el.addEventListener('click', function(){
        S.activeTab = el.dataset.tab;
        render();
      });
    });
    /* Sidebar sign out */
    on('sidebar-signout','click',function(){
      if (confirm('Are you sure you want to sign out?')) { clearSession(); go('signin'); }
    });

    /* Overview quick actions */
    qAll('.quick-card[data-action]').forEach(function(el){
      el.addEventListener('click', function(){
        const a = el.dataset.action;
        if (a==='symptom_checker') go('symptom_checker');
        else if (a==='chat_tab') { S.activeTab='chat'; render(); }
        else if (a==='learn_category') { S.activeTab='learn'; render(); }
        else if (a==='reminders') go('reminders');
        else if (a==='daily_tips') go('daily_tips');
      });
    });

    /* Oral Diseases */
    qAll('.disease-card[data-disease]').forEach(function(el){
      el.addEventListener('click', function(){
        go('disease_detail', { id: el.dataset.disease });
      });
    });

    /* Profile avatar */
    on('home-avatar-btn','click',function(){ S.activeTab='profile'; render(); });

    /* Profile menu items */
    qAll('.menu-item[data-action]').forEach(function(el){
      el.addEventListener('click', function(){
        const a = el.dataset.action;
        if (a==='reminders') go('reminders');
        else if (a==='edit_profile') { toast('Edit profile coming soon!'); }
        else if (a==='privacy_security') { toast('Privacy & security settings coming soon!'); }
        else if (a==='privacy_policy') window.open('https://example.com/privacy','_blank');
        else if (a==='help_feedback') go('help_feedback');
        else if (a==='delete_account') go('delete_account');
        else if (a==='signout') { clearSession(); go('signin'); }
        else if (a==='daily_tips') go('daily_tips');
      });
    });

    /* Learning category cards */
    qAll('.learn-cat-card[data-cat]').forEach(function(el){
      el.addEventListener('click', function(){
        S.quizState = {catId:el.dataset.cat, modId:null, qIdx:0, answered:false, score:0, done:false, lessonTab:0, selectedOpt:-1};
        go('learn_category',{catId:el.dataset.cat});
      });
    });

    /* Chat handlers */
    setupChatHandlers();
  }

  /* ---- SYMPTOM CHECKER ---- */
  if (sc === 'symptom_checker') {
    on('sym-search','input',function(){ S.params.q=this.value; render(); });
    qAll('.symptom-chip').forEach(function(el){
      el.addEventListener('click', function(){ go('symptom_detail',{symptom:el.dataset.symptom}); });
    });
  }

  /* ---- LEARNING CATEGORY ---- */
  if (sc === 'learn_category') {
    qAll('.module-card[data-mod]').forEach(function(el){
      el.addEventListener('click', function(){
        S.quizState = {catId:el.dataset.cat, modId:el.dataset.mod, qIdx:0, answered:false, score:0, done:false, lessonTab:0, selectedOpt:-1};
        go('module_detail',{catId:el.dataset.cat, modId:el.dataset.mod});
      });
    });
  }

  /* ---- MODULE DETAIL ---- */
  if (sc === 'module_detail') {
    qAll('.lesson-tab[data-ltab]').forEach(function(el){
      el.addEventListener('click', function(){
        S.quizState.lessonTab = parseInt(el.dataset.ltab);
        S.quizState.answered = false;
        render();
      });
    });
    on('next-lesson-btn','click',function(){
      S.quizState.lessonTab++;
      render();
    });
    on('to-quiz-btn','click',function(){
      const cat = LEARNING.find(function(c){ return c.id===S.params.catId; });
      const mod = cat && cat.modules.find(function(m){ return m.id===S.params.modId; });
      S.quizState.lessonTab = mod ? mod.lessons.length : 0;
      S.quizState.qIdx = 0;
      S.quizState.done = false;
      S.quizState.score = 0;
      render();
    });
    qAll('.quiz-option[data-opt]').forEach(function(el){
      el.addEventListener('click', function(){
        if (S.quizState.answered) return;
        const cat = LEARNING.find(function(c){ return c.id===S.params.catId; });
        const mod = cat && cat.modules.find(function(m){ return m.id===S.params.modId; });
        if (!mod) return;
        const q2 = mod.quiz[S.quizState.qIdx];
        const chosen = parseInt(el.dataset.opt);
        S.quizState.answered = true;
        S.quizState.selectedOpt = chosen;
        if (chosen === q2.ans) S.quizState.score++;
        render();
      });
    });
    on('quiz-next-btn','click',function(){
      const cat = LEARNING.find(function(c){ return c.id===S.params.catId; });
      const mod = cat && cat.modules.find(function(m){ return m.id===S.params.modId; });
      if (!mod) return;
      if (S.quizState.qIdx < mod.quiz.length-1) {
        S.quizState.qIdx++;
        S.quizState.answered = false;
        S.quizState.selectedOpt = -1;
      } else {
        S.quizState.done = true;
      }
      render();
    });
    on('quiz-retry-btn','click',function(){
      S.quizState.qIdx = 0; S.quizState.answered = false;
      S.quizState.score = 0; S.quizState.done = false; S.quizState.selectedOpt = -1;
      render();
    });
    on('back-to-cat-btn','click',function(){ go('learn_category',{catId:S.params.catId}); });
  }

  /* ---- REMINDERS ---- */
  if (sc === 'reminders') {
    qAll('.reminder-toggle[data-rid]').forEach(function(el){
      el.addEventListener('click', function(){
        var rid = parseInt(el.dataset.rid);
        var rem = S.reminders.find(function(r){ return r.id===rid; });
        if (rem) { rem.on = !rem.on; render(); }
      });
    });
    qAll('.reminder-edit-btn[data-rid]').forEach(function(el){
      el.addEventListener('click', function(){
        var rid = parseInt(el.dataset.rid);
        var rem = S.reminders.find(function(r){ return r.id===rid; });
        if (!rem) return;
        showModal('<div class="modal-handle"></div>'
          + '<div class="modal-title">Edit Reminder</div>'
          + '<div class="form-group"><label class="form-label">Reminder Name</label>'
          + '<div class="form-input-wrap"><span class="input-icon">' + rem.icon + '</span>'
          + '<input id="rem-name" value="' + rem.name + '" /></div></div>'
          + '<div class="form-group"><label class="form-label">Time (HH:MM)</label>'
          + '<div class="form-input-wrap"><span class="input-icon"><i class="ph ph-clock"></i></span>'
          + '<input id="rem-time" type="time" value="' + rem.time + '" /></div></div>'
          + '<div class="modal-actions">'
          + '<button class="modal-cancel" id="modal-cancel">Cancel</button>'
          + '<button class="modal-save" id="modal-save" data-rid="' + rid + '">Save</button></div>'
        );
        document.getElementById('modal-cancel').onclick = closeModal;
        document.getElementById('modal-save').onclick = function(){
          rem.name = document.getElementById('rem-name').value || rem.name;
          var t = document.getElementById('rem-time').value;
          if (/^\d{2}:\d{2}$/.test(t)) rem.time = t;
          closeModal(); render();
          toast('Reminder updated','success');
        };
      });
    });
  }

  /* ---- DAILY TIPS ---- */
  if (sc === 'daily_tips') {
    qAll('.tips-filter-chip[data-cat]').forEach(function(el){
      el.addEventListener('click', function(){
        S.tipsFilter = el.dataset.cat; render();
      });
    });
  }

  /* ---- EDIT PROFILE ---- */
  if (sc === 'edit_profile') {
    on('save-profile-btn','click', async function(){
      const data = {
        name:    val('ep-name'),
        email:   val('ep-email'),
        age:     val('ep-age'),
        gender:  val('ep-gender'),
        district:val('ep-district'),
        state:   val('ep-state')
      };
      setBtnLoading('save-profile-btn','save-profile-text','Saving...',true);
      try { await apiCall('PUT','/users/profile',data); } catch(e){}
      S.user = Object.assign({}, S.user, data);
      localStorage.setItem('oc_user', JSON.stringify(S.user));
      toast('Profile updated!','success');
      S.activeTab='profile'; go('main');
    });
  }

  /* ---- PRIVACY & SECURITY ---- */
  if (sc === 'privacy_security') {
    qAll('.toggle-switch[data-toggle]').forEach(function(el){
      el.addEventListener('click', function(){
        var k = el.dataset.toggle;
        S.privacyToggles[k] = !S.privacyToggles[k];
        el.classList.toggle('on', S.privacyToggles[k]);
      });
    });
    on('clear-data-btn','click',function(){
      if (confirm('Clear all local app data? You will be signed out.')) {
        clearSession();
        localStorage.clear();
        go('signin');
        toast('App data cleared','success');
      }
    });
    on('change_pw','click',function(){ toast('Change password coming soon!'); });
  }

  /* ---- HELP & FEEDBACK ---- */
  if (sc === 'help_feedback') {
    on('hf-submit-btn','click', async function(){
      const name=val('hf-name'), email=val('hf-email'), msg=val('hf-msg');
      if (!name||!email||!msg) { toast('Please fill in all fields','warning'); return; }
      setBtnLoading('hf-submit-btn','hf-submit-text','Sending...',true);
      try { await apiCall('POST','/content/feedback',{name,email,message:msg}); } catch(e){}
      toast('Feedback sent! Thank you.','success');
      S.activeTab='profile'; go('main');
    });
  }

  /* ---- DELETE ACCOUNT ---- */
  if (sc === 'delete_account') {
    on('del-confirm-btn','click', async function(){
      if (!confirm("Are you absolutely sure you want to delete your account? This cannot be undone.")) return;
      setBtnLoading('del-confirm-btn','del-btn-text','Deleting...',true);
      try { await apiCall('POST','/auth/confirm-delete-account',{}); } catch(e){}
      clearSession();
      toast('Account deleted. Goodbye!','danger');
      go('signin');
    });
  }
}

/* ---- Chat handlers (inside main tab) ---- */
function setupChatHandlers() {
  if (S.activeTab !== 'chat') return;
  on('chat-new-btn','click',function(){
    S.chat.sessionId = genSessionId();
    S.chat.messages = [{role:'bot', text:'New session started! How can I help you with your oral health today?', time:chatTime()}];
    render();
  });
  on('chat-send-btn','click', sendChatMsg);
  const inp = document.getElementById('chat-input');
  if (inp) inp.addEventListener('keydown', function(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChatMsg();} });
  qAll('.chat-suggestion[data-sug]').forEach(function(el){
    el.addEventListener('click', function(){
      var inp2 = document.getElementById('chat-input');
      if (inp2) { inp2.value = el.dataset.sug; sendChatMsg(); }
    });
  });
}

async function sendChatMsg() {
  const inp = document.getElementById('chat-input');
  if (!inp) return;
  const text = inp.value.trim();
  if (!text || S.chat.typing) return;
  inp.value = '';
  S.chat.messages.push({role:'user', text, time:chatTime()});
  S.chat.typing = true;
  render();
  const botReply = await getBotReply(text);
  S.chat.typing = false;
  S.chat.messages.push({role:'bot', text:botReply, time:chatTime()});
  render();
  setTimeout(function(){ var m=document.getElementById('chat-messages'); if(m) m.scrollTop=m.scrollHeight; },50);
}

async function getBotReply(msg) {
  try {
    const history = S.chat.messages.slice(-10).map(function(m){ return {role:m.role==='bot'?'model':'user', parts:[{text:m.text}]}; });
    const res = await apiCall('POST','/chat/chat',{message:msg, sessionId:S.chat.sessionId, history});
    return res.text || res.data?.text || 'I received your message!';
  } catch(e) {
    return getLocalBotReply(msg);
  }
}

function getLocalBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('brush') || m.includes('brushing')) return 'Great question about brushing! <i class="ph ph-tooth"></i> You should brush twice daily for 2 minutes using a soft-bristled toothbrush at a 45-degree angle to your gumline. Use gentle circular motions and make sure to clean all surfaces — outer, inner, and chewing surfaces. And spit, don\'t rinse, so the fluoride keeps working!';
  if (m.includes('floss') || m.includes('flossing')) return 'Flossing is essential! <i class="ph ph-yarn"></i> Your toothbrush only cleans 60% of tooth surfaces — the remaining 40% between teeth need floss. Use 18 inches of floss, curve it into a "C" shape around each tooth and slide gently under the gumline. Floss once daily, preferably at night.';
  if (m.includes('bad breath') || m.includes('halitosis')) return 'Bad breath is usually caused by bacteria on the tongue and between teeth. <i class="ph ph-wind"></i> Try: tongue scraping every morning, flossing daily, staying hydrated, and using an antimicrobial mouthwash. If it persists after 2 weeks of good hygiene, see a dentist — it could indicate gum disease.';
  if (m.includes('bleed') || m.includes('gum')) return 'Bleeding gums are a sign of gingivitis — the earliest stage of gum disease! <i class="ph ph-drop"></i> The good news is it\'s reversible. Don\'t stop brushing; instead, brush MORE gently with a soft bristle brush. Floss daily to remove plaque between teeth. If bleeding doesn\'t improve in 2 weeks, see a dentist.';
  if (m.includes('sensitive') || m.includes('sensitivity') || m.includes('pain')) return 'Tooth sensitivity is usually caused by worn enamel or exposed roots. <i class="ph ph-snowflake"></i>️ Switch to sensitivity toothpaste with potassium nitrate. Use a soft brush, avoid hard brushing, and cut down on acidic foods. If sensitivity is in just one tooth or is severe, see a dentist — it could be a cavity or cracked tooth.';
  if (m.includes('cavity') || m.includes('decay') || m.includes('hole')) return 'Cavities are caused by bacteria feeding on sugar and producing acid that erodes enamel. <i class="ph ph-warning"></i>️ Early cavities can be detected at check-ups before they cause pain. A filling stops the decay. If left untreated, it spreads to the nerve and requires a root canal. Prevention: fluoride toothpaste, limit sugar, and regular check-ups!';
  if (m.includes('whitening') || m.includes('whiten') || m.includes('yellow')) return 'For safer whitening: <i class="ph ph-sparkle"></i> Get a professional cleaning first to remove surface stains. Over-the-counter whitening strips with 10-15% carbamide peroxide are safe for most people. Avoid "natural" remedies like lemon juice or charcoal — they damage enamel. If staining is severe, ask your dentist about professional whitening.';
  if (m.includes('dentist') || m.includes('checkup') || m.includes('visit')) return 'Most people should see a dentist every 6 months for a check-up and professional cleaning. <i class="ph ph-hospital"></i> If you\'re high-risk (smoker, diabetic, prone to cavities), every 3-4 months is better. Regular visits catch problems early — before they become painful and expensive. Don\'t wait for pain to visit!';
  if (m.includes('hello') || m.includes('hi') || m.includes('hey')) return 'Hello! <i class="ph ph-hand-waving"></i> Great to chat with you. I\'m ORCare AI, specialized in oral health. You can ask me anything about: brushing and flossing technique, tooth sensitivity or pain, gum disease, cavities, dental procedures, nutrition for teeth, or when to see a dentist!';
  return 'That\'s a great oral health question! <i class="ph ph-tooth"></i> I specialize in topics like brushing technique, gum disease, cavities, sensitivity, whitening, and dental procedures. Could you give me a bit more detail about what you\'d like to know? Or feel free to use one of the suggestion chips below!';
}

/* =====================================================
   HELPERS
   ===================================================== */
function q(id) { return document.getElementById(id); }
function qAll(sel) { return Array.from(document.querySelectorAll(sel)); }
function val(id) { var el=q(id); return el?el.value.trim():''; }
function on(id,ev,fn) { var el=q(id); if(el) el.addEventListener(ev,fn); }

function togglePw(inputId, btnId) {
  on(btnId,'click',function(){
    var inp = q(inputId);
    if (!inp) return;
    inp.type = inp.type==='password'?'text':'password';
    q(btnId).textContent = inp.type==='password'?'<i class="ph ph-eye"></i>️':'<i class="ph ph-eye-slash"></i>';
  });
}

function setBtnLoading(btnId, textId, text, loading) {
  var btn=q(btnId), txt=q(textId);
  if (btn) btn.disabled = loading;
  if (txt) txt.innerHTML = loading ? '<span class="spinner"></span> ' + text : text;
}

function setupOtpBoxes() {
  for (var i=0;i<6;i++) {
    (function(idx){
      var el = q('otp-'+idx);
      if (!el) return;
      el.addEventListener('input',function(){
        if (this.value.length===1) {
          this.classList.add('filled');
          var next=q('otp-'+(idx+1));
          if(next) next.focus();
        }
      });
      el.addEventListener('keydown',function(e){
        if(e.key==='Backspace'&&!this.value){
          this.classList.remove('filled');
          var prev=q('otp-'+(idx-1));
          if(prev){prev.focus();prev.value='';}
        }
      });
    })(i);
  }
  var first=q('otp-0'); if(first) first.focus();
}

var _otpTimer = null;
function startOtpTimer() {
  if(_otpTimer) clearInterval(_otpTimer);
  var secs=60;
  _otpTimer = setInterval(function(){
    secs--;
    var el=q('otp-seconds');
    if(el) el.textContent=secs;
    if(secs<=0){
      clearInterval(_otpTimer);
      var btn=q('otp-resend-btn');
      if(btn){ btn.disabled=false; }
      var tw=q('otp-timer-wrap');
      if(tw) tw.innerHTML='';
    }
  },1000);
}

function finishOnboarding() {
  localStorage.setItem('oc_onboarded','1');
  S.onboarded=true;
  go('main');
}

/* =====================================================
   BOOT
   ===================================================== */
(function boot() {
  loadStorage();
  const SUPABASE_URL = "https://cgnkcweyutjguhcxkhqh.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnbmtjd2V5dXRqZ3VoY3hraHFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNzg4NTIsImV4cCI6MjA5MTg1NDg1Mn0.bnDVTs73KGLzlzXGAAKqvfL_WhPG815ZBDKPuhqt4Pg";
  const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
  window.supabaseClient = supabase;
  if (supabase) {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        try {
          const res = await apiCall('POST', '/auth/google-login', { access_token: session.access_token });
          saveSession(res.token, res.user || res.data?.user);
          toast('Welcome to ORCare!', 'success');
          go(S.onboarded ? 'main' : 'onboarding');
        } catch (err) {
          toast('Failed to login: ' + err.message, 'danger');
        }
      }
    });
  }
  render();
})();
