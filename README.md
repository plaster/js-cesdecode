# cesdecode.js

Javascriptで Shift_JIS(CP932, Shift-JIS-2004) および EUC-JP(EUC-JIS-2004) をデコードします。

## モチベーション

* Shift_JIS 的なファイルをXHRとかでとってきて表示するようなプログラムを簡単に書けるようにしておきたい
* 文字コード変換するプログラムを一度は自力で書いておきたい

### 制約

* 大きな入力に対して極端な性能劣化がないようにしたい
* ランタイム・ビルドとも、ツールやライブラリの依存関係が大きくならないようにしたい

## ダウンロード

* https://github.com/plaster/js-cesdecode/releases から cesdecode.js または cesdecodecp932.js をダウンロードしてください。
  * 前者 cesdecode.js は CP932, Shift-JIS-2004, EUC-JIS-2004 のデコード関数を含みます。
  * 後者 cesdecodecp932.js は CP932 のデコード関数のみを含みます。CP932しか扱わないならこちらのほうが軽量です。

## 使用

    var text = cesdecode.fromcp932(binary);
    var text = cesdecode.fromsjis2004(binary);
    var text = cesdecode.fromeucjis2004(binary);

いずれも引数は Uint8Array で、戻り値は文字列です。

### 使用例

    <!DOCTYPE HTML>
    <html lang=ja>
        <head>
            <script src="cesdecode.js"></script> <!-- HTTPアクセス可能なところに置いてください -->
        </head>
        <body>
            <script>
                var req_uri = 'http://...'; // Shift_JIS的なファイル
                var req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (
                        req.readyState == 4 &&
                        req.status == 200
                    ) {
                        var response_data = new Uint8Array(req.response);
                        var text = cesdecode.fromcp932(response_data);
                        // text は変換済みの文字列なのであとは煮るなり焼くなり
                    }
                };
                req.open('GET', req_url);
                req.responseType = 'arraybuffer';
                req.send();
            </script>
        </body>
    </html>

## ビルド

makeとwgetとperlとcppが必要です。
make で成果物 cesdecode.js が生成されます。

### ビルド例

    % make
    wget -q -O med/CP932.TXT http://ftp.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP932.TXT
    perl src/triejsonfromcodetable.pl < med/CP932.TXT > med/cp932.json
    wget -q -O med/sjis-0213-2004-std.txt http://x0213.org/codetable/sjis-0213-2004-std.txt
    perl src/triejsonfromcodetable.pl < med/sjis-0213-2004-std.txt > med/sjis2004.json
    wget -q -O med/euc-jis-2004-std.txt http://x0213.org/codetable/euc-jis-2004-std.txt
    perl src/triejsonfromcodetable.pl < med/euc-jis-2004-std.txt > med/eucjis2004.json
    discarding 8E => 008E
    discarding 8F => 008F
    /usr/bin/cpp -P -undef -Wundef -std=c99 -nostdinc -Wtrigraphs -fdollars-in-identifiers -C -I./med -I./src < src/cesdecode-impl.js > med/cesdecode-impl.js
    /usr/bin/cpp -P -undef -Wundef -std=c99 -nostdinc -Wtrigraphs -fdollars-in-identifiers -C -I./med < src/cesdecode.js > dist/cesdecode.js
    /usr/bin/cpp -P -undef -Wundef -std=c99 -nostdinc -Wtrigraphs -fdollars-in-identifiers -C -I./med -I./src < src/cesdecodecp932-impl.js > med/cesdecodecp932-impl.js
    /usr/bin/cpp -P -undef -Wundef -std=c99 -nostdinc -Wtrigraphs -fdollars-in-identifiers -C -I./med < src/cesdecodecp932.js > dist/cesdecodecp932.js


## 関連

デコードはブラウザが直接サポートする流れのようです。
* [TextDecoder - MDN](https://developer.mozilla.org/ja/docs/Web/API/TextDecoder)
* [TextDecoder - Encoding - Living Standard - WHATWG](https://encoding.spec.whatwg.org/#interface-textdecoder)


## ライセンス

* ソースコードを [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) のもと公開します。
* 成果物の利用の際は http://www.unicode.org/copyright.html#License に従ってください。
