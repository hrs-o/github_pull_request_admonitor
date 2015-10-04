$(function () {

    restoreSettings();

    function restoreSettings() {
        var settings = [undefined, null].indexOf(localStorage["settings"]) != -1 ? [] : JSON.parse(localStorage["settings"]);

        if (settings.length == 0) {
            return;
        }

        if (settings.words) {
            for (var word_idx in settings.words) {
                console.log(word_idx);
                console.log(settings.words[word_idx].id);
                console.log(settings.words[word_idx].name);

                var word = $('<option />');
                word.val(settings.words[word_idx].name);
                word.html(settings.words[word_idx].name);
                word.attr("id", settings.words[word_idx].id);
                $("#words").append(word);
            }
        }
        if (settings.default_person) {
          $("#default_person").val(settings.default_person);
        }
    }

    function redefinitionwordId() {
        var word_cnt = 1;
        $("#words option").each(function () {

            $(this).attr("id", "word" + word_cnt);
            word_cnt++;
        });
        return word_cnt;
    }

    $("#save").click(function () {
    
        var words = $("#words>option").map(function () {
            return {
                "id": $(this).attr("id"),
                "name": $(this).val(),
            }
        }).get();
        
        var settings = {
            "words"            : words,
            "default_person"    : $("#default_person").val(),
        };
        localStorage["settings"] = JSON.stringify(settings);
        alert("設定を保存しました");
    });

    $("#delete_setting").click(function () {
    
        if (confirm('全ての設定削除します、よろしいですか？\n復元は出来ません。')) {
          localStorage.clear();
        }
    });

    $("#add-word").click(function () {
        var name = $("#name");
        var word_cnt = redefinitionwordId();
        var word = $('<option />');
        word.val(name.val());
        word.html(name.val());
        word.attr("id", "word" + word_cnt);
        $("#words").append(word);
        name.val("");
    });

    $("#remove-word").click(function () {

        $('#words > option:selected').remove();
        redefinitionwordId();
    });

});