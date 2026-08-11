// 診断ボタンクリック時の処理（Bootstrap Cardデザイン対応版） [24]
assessmentButton.addEventListener('click', () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return;
  }

  // 1. 診断結果表示エリアの初期化
  resultDivision.innerText = '';

  // 2. Bootstrapの「Card」スタイルを適用して要素を動的に生成 [24]
  // 結果エリア自体に "card" クラスを付与
  resultDivision.className = 'card';

  // ヘッダ部分を作成（青背景に白文字）
  const headerDivision = document.createElement('div');
  headerDivision.className = 'card-header text-bg-primary';
  headerDivision.innerText = '診断結果';

  // 本文エリアを作成
  const bodyDivision = document.createElement('div');
  bodyDivision.className = 'card-body';

  // 結果テキスト（pタグ）を作成
  const paragraph = document.createElement('p');
  paragraph.className = 'card-text';
  const result = assessment(userName);
  paragraph.innerText = result;

  // 各要素を組み立てて結果表示エリアに差し込む
  bodyDivision.appendChild(paragraph);
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);

  // 3. ツイートエリアのクリア
  tweetDivision.innerText = '';

  // 4. ツイートボタンの動的生成（前述と同様）
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');

  tweetDivision.appendChild(anchor);
  tweetDivision.appendChild(script);
});
