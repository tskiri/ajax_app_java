// 挿入するHTML本文を先に書いて区別しやすいようにする
const buildHTML = (XHR) => {
  // response：レスポンスから投稿されたメモの情報を抽出してitemに格納
  const item = XHR.response;
  // itemの情報をもとにブラウザに描画するためのHTMLを生成してhtmlに格納
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.createdAt}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    // preventDefault()：イベントの無効化
    // 今回は、「投稿ボタンをクリックした」というイベントの無効化（イベントをeで表している。）
    // これにより、ブラウザからサーバーへの直接リクエストを防ぎ、JS経由のみにして、出力の重複を防ぐ。
    e.preventDefault();
    const form = document.getElementById("form");
    const formData = new FormData(form);  // フォームに入力された値を取得する記述
    const XHR = new XMLHttpRequest();  // JSでサーバーとHTTP通信するための記述
    XHR.open("POST", "/posts", true);  // open()でリクエスト内容の指定
    XHR.responseType = "json";  // レスポンスのデータ型指定：JSON
    XHR.send(formData);  // リクエストを送信
  
    XHR.onload = () => {
      //// リクエスト失敗時 ////
      // コントローラーではResponseEntity.ok()によりリクエストステータス200を指定している。
      // そのため、200以外で条件分岐させる
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.response.error}`);
        // return null;によってJSの処理から抜け出し、これ以降の処理を行わない。
        return null;
      };
      //// リクエスト成功時 ////
      // 新しいメモを挿入するための要素を取得して変数listに格納
      const list = document.getElementById("list");
      // フォームの値をリセットする前に取得
      const formText = document.getElementById("content");
      // afterendにより、id="list"を指定した要素の直後に上記で生成したHTMLを挿入
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // フォームの値をリセット
      formText.value = "";
    };
  });
  
};

window.addEventListener('load', post);