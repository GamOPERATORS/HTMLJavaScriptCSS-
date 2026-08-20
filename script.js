'use strict';

function getScore(questionName) {
  const answers = document.getElementsByName(questionName);
  let score = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      score = Number(answers[i].value);
    }
  }

  return score;
}

function isAnswered(questionName) {
  const answers = document.getElementsByName(questionName);

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      return true;
    }
  }

  return false;
}

function diagnose() {
  const result = document.getElementById('result');

  if (!isAnswered('question1') ||
      !isAnswered('question2') ||
      !isAnswered('question3')) {
    result.textContent = 'すべての質問に答えてください。';
    return;
  }

  const score =
    getScore('question1') +
    getScore('question2') +
    getScore('question3');

  if (score >= 5) {
    result.textContent =
      'あなたは「行動力のある人」です！' +
      '思い立ったらすぐに行動できるところが、あなたのいいところです。';
  } else if (score >= 3) {
    result.textContent =
      'あなたは「思いやりのある人」です！' +
      '周りの人の気持ちを考えて行動できるところが、あなたのいいところです。';
  } else {
    result.textContent =
      'あなたは「慎重に考えられる人」です！' +
      '落ち着いて物事を考えられるところが、あなたのいいところです。';
  }
}

function resetDiagnosis() {
  const result = document.getElementById('result');
  result.textContent = 'ここに診断結果が表示されます。';

  const question1 = document.getElementsByName('question1');
  const question2 = document.getElementsByName('question2');
  const question3 = document.getElementsByName('question3');

  uncheckAnswers(question1);
  uncheckAnswers(question2);
  uncheckAnswers(question3);
}

function uncheckAnswers(answers) {
  for (let i = 0; i < answers.length; i++) {
    answers[i].checked = false;
  }
}
