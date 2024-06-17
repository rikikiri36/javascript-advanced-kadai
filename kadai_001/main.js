// 文字を初期化
let untyped = '';

// 入力済み文字を初期化
let typed = ''

// スコアを初期化
let score = 0;

// タイプ数カウントを初期化
let typecnt = 0;

// HTML要素を格納
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typecount = document.getElementById('typecount');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

//ランダムなテキストを表示
const createText = () => {

    // 正しい文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    // ランダム値の生成
    let random;
    random = Math.floor(Math.random()* textLists.length);

    // 生成した値を画面に表示
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

//キー入力の判定
const keyPress = e => {


    // 誤タイプ
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');
        // 100ms後に背景色を戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        },100);
        return;
    }
    
    // 正タイプ：入力した先頭の文字からtypedに移していく
    // タイプ数カウント：スペースはカウントしない
    // console.log(e.key);
    if(e.key!=' '){
        typecnt++;
    }
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);

    //画面に表示
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;
    typecount.textContent = typecnt;

    // 全てtypedに移したら新しいテキストを表示
    if(untyped ===''){
        // タイプ数カウントを初期化
        typecnt = 0;
        typecount.textContent = typecnt;
        createText();
    }
};
//タイピングスキルのランクを判定
const rankCheck = score => {

    let text = '';

    // スコアに応じてメッセージを返す
    if(score < 100) {
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
         text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
    } else if(score < 300) {
         text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
    } else if(score >= 300) {
         text = `あなたのランクはSです。\nおめでとうございます!`;    
    }

    // 生成した文字列を返す
    return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

//ゲームを終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));

    // OKならリロード
    if(result==true){
        window.location.reload();
    }
};


//カウントダウンタイマー
const timer = () => {

    let time = count.textContent;

    const id = setInterval(() =>{

        time--;
        count.textContent = time;

        // カウントゼロならタイマーをSTOP
        if(time <=0){
            gameOver(id);
        }
    },1000);
};

// ゲームスタートボタンタップ
start.addEventListener('click', () =>{
    // タイマースタート
    timer();

    // ランダム文字列表示
    createText();

    //スタートボタンっ非表示
    start.style.display = 'none';

    //キーボードイベント処理
    document.addEventListener('keypress', keyPress);

    
});

untypedfield.textContent = 'スタートボタンで開始';