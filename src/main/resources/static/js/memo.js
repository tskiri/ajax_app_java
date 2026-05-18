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
  });
  
};

window.addEventListener('load', post);