'use strict'; // 厳格モードを有効化 [12]

// 取得した各種UI部品 [8]
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

// 16パターンの診断結果配列（###userName### を含む） [21]
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、自然と緊張がほぐれます。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも正しく導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が信頼しています。',
  '###userName###のいいところはユニークさです。###userName###だけのその個性的な考えが世界を明るくします。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内面から溢れ出る###userName###の美しさに皆が惹かれます。',
  '###userName###のいいところは決断力です。###userName###が下す決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に優しくされた多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことを表現することで周りが豊かになります。',
  '###userName###のいいところは節度です。周りとの関係を大切にできる###userName###が信頼されています。',
  '###userName###のいいところは好奇心です。新しいことに挑戦し続ける###userName###が皆をワクワクさせます。',
  '###userName###のいいところは気配りです。###userName###の細かい配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###が皆に愛されています。',
  '###userName###のいいところは自制心です。問題に直面した時も冷静に立ち向かえる###userName###が皆の規範です。'
];

/**
 * 名前の文字列を渡すと、診断結果を返す関数 [13]
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字の文字コードの番号を合計する [14]
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字コードの合計値を配列の長さで割った余りを添字にする [14]
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  // 名前の置き換え [14]
  result = result.replaceAll('###userName###', userName);
  return result;
}

// 診断ボタンクリック時の処理 [8]
assessmentButton.addEventListener('click', () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // ガード句：名前が空の時は処理を終了する [9]
    return;
  }

  // 1. 診断結果表示エリアの初期化（古い結果をクリア） [10, 11]
  resultDivision.innerText = '';

  // 2. 診断結果の生成と表示 [10]
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivision.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivision.appendChild(paragraph);

  // 3. ツイートボタンエリアの初期化 [11]
  tweetDivision.innerText = '';

  // 4. ツイートボタンの動的生成 [16-19]
  const anchor = document.createElement('a');
  // 日本語を安全に送信するため、URIエンコードを行う [18]
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result); // 診断結果をツイート本文に設定 [19]
  anchor.innerText = 'Tweet #あなたのいいところ';

  // X公式のウィジェットスクリプトを読み込むためのscriptタグを生成 [16, 17]
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

  tweetDivision.appendChild(anchor);
  tweetDivision.appendChild(script);
});

// 入力欄でEnterキーが押された際、診断を実行させる [20]
userNameInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    assessmentButton.dispatchEvent(new Event('click'));
  }
});

// 自動テスト機能の実装（正しく動作するか判定） [15]
function test() {
  console.log('診断関数のテストを開始します。');

  // テスト1：特定の名前に対して期待通りの結果が出力されるか
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎が下す決断にいつも助けられる人がいます。',
    '診断結果の文言が、事前に想定された期待値と一致しません。'
  );

  // テスト2：同じ名前を入力した場合に、同じ診断結果が出力されるか
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前であるにもかかわらず、診断結果が一致しません。'
  );

  console.log('診断関数のテストを終了しました。');
}
test(); // テストの実行
