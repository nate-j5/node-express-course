function determineLuckyDay() {
  const randomNumber = Math.round(Math.random() * 100 + 1);
  let isLuckyDay = null;

  if (randomNumber >= 50) {
    isLuckyDay = true;
    console.log("Your lucky day", isLuckyDay);
  } else {
    isLuckyDay = false;
    console.log("Keep working hard", isLuckyDay);
  }
  return isLuckyDay;
}

determineLuckyDay();
