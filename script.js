// script.js
document.addEventListener("DOMContentLoaded", () => {

  // ------------------ Начальный выбор ------------------
  const startSection = document.getElementById("startSection");
  const diseaseSection = document.getElementById("diseaseSection");
  const regionSection = document.getElementById("regionSection");

  const diseaseOption = document.getElementById("diseaseOption");
  const regionOption = document.getElementById("regionOption");

  diseaseOption.addEventListener("click", () => {
    startSection.style.display = "none";
    diseaseSection.style.display = "block";
  });

  regionOption.addEventListener("click", () => {
    startSection.style.display = "none";
    regionSection.style.display = "block";
  });

  // ------------------ Болезни растений ------------------
  const diseasesDB = {
    "картофель":[{name:"Фитофтороз", symptoms:["жёлтые листья","пятна"], severity:"опасная", advice:["Удалите поражённые листья","Обработайте фунгицидом","Не поливайте сверху"]},{name:"Альтернариоз", symptoms:["коричневые пятна"], severity:"средняя", advice:["Удалите поражённые листья","Обработайте медным купоросом","Соблюдайте севооборот"]}],
    "томат":[{name:"Томатная мозаика", symptoms:["пятна на листьях","вялые листья"], severity:"средняя", advice:["Удалите поражённые листья","Улучшите вентиляцию","Используйте устойчивые сорта"]},{name:"Фитофтороз томата", symptoms:["коричневые пятна","засыхание плодов"], severity:"опасная", advice:["Обработайте растения фунгицидом","Соберите поражённые плоды","Изолируйте заражённые растения"]}],
    "пшеница":[{name:"Ржавчина", symptoms:["оранжевые пятна"], severity:"средняя", advice:["Обработайте фунгицидом","Удалите поражённые листья","Соблюдайте севооборот"]},{name:"Септориоз", symptoms:["белые пятна"], severity:"средняя", advice:["Удалите поражённые листья","Обработайте медным купоросом","Контролируйте влажность"]}],
    "морковь":[{name:"Морковная гниль", symptoms:["чёрные пятна","загнивание корнеплода"], severity:"опасная", advice:["Удалите поражённые корнеплоды","Обработайте почву фунгицидом","Следите за влажностью"]},{name:"Альтернариоз моркови", symptoms:["бурые листья"], severity:"средняя", advice:["Удалите поражённые листья","Соблюдайте севооборот","Обрабатывайте почву"]}],
    "огурец":[{name:"Мучнистая роса", symptoms:["белый налёт на листьях"], severity:"средняя", advice:["Срезайте поражённые листья","Обработайте раствором соды","Улучшите вентиляцию"]},{name:"Бактериоз огурца", symptoms:["жёлтые пятна","увядание"], severity:"опасная", advice:["Удалите поражённые листья","Обработайте бактерицидами","Контролируйте полив"]}],
    "капуста":[{name:"Кила", symptoms:["опухлости на корнях"], severity:"опасная", advice:["Удалите поражённые растения","Обработайте почву","Соблюдайте севооборот"]},{name:"Скручивание листьев", symptoms:["скручивание листьев"], severity:"средняя", advice:["Проверьте влажность","Удалите повреждённые листья","Обработайте раствором меди"]}],
    "яблоня":[{name:"Парша", symptoms:["коричневые пятна на листьях","пятнистость плодов"], severity:"средняя", advice:["Удалите поражённые листья","Обработайте медным купоросом","Соберите поражённые плоды"]},{name:"Мучнистая роса яблони", symptoms:["белый налёт на листьях"], severity:"опасная", advice:["Срежьте поражённые листья","Обработайте раствором соды","Контролируйте влажность"]}],
    "виноград":[{name:"Оидиум", symptoms:["белый налёт на листьях","искажение побегов"], severity:"средняя", advice:["Срежьте поражённые побеги","Обработайте фунгицидом","Следите за влажностью"]},{name:"Филлоксера", symptoms:["увядание листьев"], severity:"опасная", advice:["Используйте устойчивые сорта","Удалите поражённые растения","Обработайте почву инсектицидами"]}],
    "лук":[{name:"Луковая гниль", symptoms:["тёмные пятна на луковице"], severity:"опасная", advice:["Удалите поражённые луковицы","Соблюдайте севооборот","Обрабатывайте почву фунгицидом"]},{name:"Пероноспороз", symptoms:["жёлтые пятна на листьях"], severity:"средняя", advice:["Удалите поражённые листья","Обработайте раствором меди","Контролируйте влажность"]}],
    "чеснок":[{name:"Чесночная гниль", symptoms:["тёмные пятна на зубчиках"], severity:"опасная", advice:["Удалите поражённые зубчики","Обработайте фунгицидом","Соблюдайте севооборот"]},{name:"Фузариоз чеснока", symptoms:["увядание листьев"], severity:"средняя", advice:["Удалите поражённые растения","Обработайте почву фунгицидом","Следите за влажностью"]}]
  };

  let selectedPlant = null;
  let selectedSymptoms = [];

  const plantsDiv = document.getElementById("plants");
  const symptomsDiv = document.getElementById("symptoms");
  const symptomSection = document.getElementById("symptomSection");
  const resultSection = document.getElementById("resultSection");
  const resultsDiv = document.getElementById("results");

  // Выбор растения
  plantsDiv.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click",()=>{
      plantsDiv.querySelectorAll(".card").forEach(c=>c.classList.remove("selected"));
      card.classList.add("selected");
      selectedPlant = card.dataset.plant;
      showSymptoms(selectedPlant);
    });
  });

  function showSymptoms(plant){
    symptomsDiv.innerHTML = "";
    selectedSymptoms = [];
    const allSymptoms = new Set();
    diseasesDB[plant].forEach(disease => disease.symptoms.forEach(s => allSymptoms.add(s)));
    allSymptoms.forEach(symptom=>{
      const sCard = document.createElement("div");
      sCard.className="card";
      sCard.textContent=symptom;
      sCard.addEventListener("click", ()=>{
        sCard.classList.toggle("selected");
        if(selectedSymptoms.includes(symptom)){
          selectedSymptoms = selectedSymptoms.filter(s=>s!==symptom);
        } else { selectedSymptoms.push(symptom); }
      });
      symptomsDiv.appendChild(sCard);
    });
    symptomSection.style.display="block";
    resultSection.style.display="none";
  }

  // Проверка болезней
  document.getElementById("checkBtn").addEventListener("click",()=>{
    if(selectedSymptoms.length===0) return alert("Выберите хотя бы один симптом!");
    resultsDiv.innerHTML = "";
    const results = diseasesDB[selectedPlant].map(disease=>{
      let matchCount = disease.symptoms.filter(s=>selectedSymptoms.includes(s)).length;
      let probability = Math.round((matchCount/disease.symptoms.length)*100);
      return {...disease, probability};
    }).filter(d=>d.probability>0);

    results.forEach(d=>{
      const rCard = document.createElement("div");
      rCard.className="res";
      rCard.innerHTML = `<strong>${d.name}</strong><br>
                         ${d.probability}% вероятность<br>
                         Серьезность: ${d.severity}<br>
                         <u>Рекомендации:</u>
                         <ul>${d.advice.map(a=>`<li>${a}</li>`).join('')}</ul>`;
      resultsDiv.appendChild(rCard);
    });
    resultSection.style.display="block";
  });

  // Начать заново
  document.getElementById("restartBtn").addEventListener("click",()=>{
    symptomSection.style.display="none";
    resultSection.style.display="none";
    plantsDiv.querySelectorAll(".card").forEach(c=>c.classList.remove("selected"));
    selectedPlant=null;
    selectedSymptoms=[];
  });

  // ------------------ Выбор региона ------------------
  const regionPlantsDB = {
    "чуйская":[" В связи с освоением новых пахотных земель рекомендуется расширить площади посевов многолетних плодовых культур: яблони, груши, винограда и плодовых культур методом капельного орошения."],
    "джалал-абадская":["В предгорных районах рекомендуется увеличить площади насаждений многолетних плодовых: винограда в Сузакском районе, шафрана - в Аксыйском, крыжовника, черной смородины, плодов шиповника - в Чаткальском."],
    "иссык-кульская":["В Иссык-Кульском и Тонском районах специализируются на выращивании плодовых, в том числе вишни, абрикоса, персика, яблонь. Джети-Огузский район и северная часть Иссык-Кульской области выращивают малину и черную смородину. Выращивание клубники возможно во всех районах."],
    "нарыньская":["В Ак-Талинском, Жумгалском, Тогуз-Тороуском и Кочкорском районах можно выращивать яблони, груши, абрикосы, смородину, барбарис, клубнику и бесшипные сорта облепихи."],
    "ошская":["Основной специализацией Ошской области считаются овощи, бахчевые, плодово-ягодные и технические культуры. В Кара-Суйском, Араванском и Ноокатском районах рекомендуется выращивать все виды плодово-ягодных культур."],
    "таласская":["Почвенно-климатические условия Таласской долины подходят для выращивания плодово-ягодных культур, в том числе яблони, груши, сливы и всех видов плодовых культур."],
    "баткенская":["Климатические и почвенные условия Баткенского района подходят для выращивания всех плодово-ягодных культур, особенно столовых и технических сортов винограда. В Кадамджайском районе рекомендуется выращивать сливу и черешню, в Баткенском и Лейлекском - абрикосы."],
  };

const regionCards = document.querySelectorAll("#regions .card");
const regionResults = document.getElementById("regionResults");
const regionPlantsDiv = document.getElementById("regionPlants");
const regionRestartBtn = document.getElementById("regionRestartBtn");

regionCards.forEach(card => {
  card.addEventListener("click", () => {
    const region = card.dataset.region;

    regionResults.innerHTML = "";

    const plants = regionPlantsDB[region] || [];

    plants.forEach(text => {
      const resultCard = document.createElement("div");
      resultCard.className = "card";
      resultCard.textContent = text;
      regionResults.appendChild(resultCard);
    });

    regionResults.style.display = "block";
  });
});

regionRestartBtn.addEventListener("click", () => {
  regionResults.style.display = "none";
});
regionPlantsDiv.innerHTML = "";
});