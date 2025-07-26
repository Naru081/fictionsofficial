// DOMの読み込み完了後に実行
$(document).ready(() => {

    // ハンバーガーボタンと背景要素の取得
    const $hamburger = $('.hamburger');
    const $coverHome = $('.cover-home');

    // 要素がビューポート内にあるか判定する関数
    const isInViewport = ($elem) => {
        if ($elem.length === 0) return false;

        const elementTop = $elem.offset().top;
        const elementBottom = elementTop + $elem.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // スクロールまたはリサイズ時に実行（ハンバーガーボタンの角丸を制御）
    $(window).on('scroll resize', () => {
        if (isInViewport($coverHome)) {
            $hamburger.removeClass('rounded');
        } else {
            $hamburger.addClass('rounded');
        }
    }).trigger('scroll'); // 初期状態のチェックも実行

    // ハンバーガーボタンのクリックイベント
    $hamburger.on('click', function () {
        $('.menu').toggleClass('open');    // メニュー開閉
        $(this).toggleClass('active');     // ハンバーガーのアニメーション切り替え
    });

    // 背景画像の要素取得
    const back = document.getElementById("back");

    // Intersection Observerの設定（50%以上表示されたら表示処理）
    const options = {
        threshold: 0.3,
    };

    // 背景表示処理（50%以上表示されたらクラス追加）
    const showBackground = (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            back.classList.add("bg-visible");
            observer.unobserve(back); // 一度だけ表示すればOKなので監視停止
        }
    };

    // Intersection Observerの生成と監視開始
    const observer = new IntersectionObserver(showBackground, options);
    observer.observe(back);

});


// フェードインアニメーション処理
const animateFade = (entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.animate(
                {
                    opacity: [0, 1],
                    filter: ['blur(.4rem)', 'blur(0)'],
                    translate: ['0 4rem', '0']
                },
                {
                    duration: 2000,
                    easing: 'ease',
                    fill: 'forwards'
                }
            );
            obs.unobserve(entry.target); // アニメーション後は監視解除
        }
    });
};

// フェードインのIntersectionObserverの作成
const fadeObserver = new IntersectionObserver(animateFade);

// フェードインを監視開始
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((el) => fadeObserver.observe(el));


// 紹介コンテンツのアニメーション処理
$(window).scroll(function (){
  $('.slidein').each(function(){
    var elemPos = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

    if (scroll > elemPos - windowHeight + 150){
      $(this).addClass('scrollin');
    }
  });
});


// ローディングアニメーション
const loading = document.querySelector('#loading');
const main = document.querySelector('#main');

const loader = () => {
  const keyframe = [
    { opacity: 1, offset: 0.8 },
    { opacity: 0, offset: 1 },
  ];

  const option = {
    duration: 2000,
    easing: 'linear',
    fill: 'forwards',
  };

  const animation = loading.animate(keyframe, option);

  animation.onfinish = () => {
    loading.style.display = 'none';   // ローディング画面を消す
    main.style.opacity = '1';         // 本コンテンツを表示
  };
};

window.addEventListener('load', loader);