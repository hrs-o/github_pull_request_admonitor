$(function () {

    chrome.runtime.sendMessage({method: "getLocalStorage"}, function (response) {

        var chrome_local_storage = response.localStorage;
        var settings = [undefined, null].indexOf(chrome_local_storage["settings"]) != -1 ? {
            "words": [],
        } : JSON.parse(chrome_local_storage["settings"]);

        // 設定がされていない場合
        if (!settings.hasOwnProperty("words")) {
            settings.words = [];
        }
        var files = $("#files .user-select-contain");

        var trim_func = function(str) {
            return str.replace(/(^\s+)|(\s+$)/g, "");
        };

        var is_warning = false;
        var file_names = [];
        for (var file_idx = 0; file_idx < files.length; file_idx++){
            var file = files.eq(file_idx);
            for (var word_idx = 0; word_idx < settings.words.length; word_idx++) {
                var word = settings.words[word_idx].name;
                var regex = new RegExp('^.*' + word + '.*$', 'g');
                var file_name = trim_func(file.text());
                if (file_name.match(regex) == null) {
                    continue;
                }

                file_names.push(file_name);

                is_warning = true;
                file.prop("id", file_name);
                file.css("color", "#f00");
                file.css("font-weight", "bold");
                file.css("background-color", "#ff0");
                break;
            }

        }
        if (is_warning == false) {
            return;
        }
        var title = $(".js-issue-title");
        title.css("color", "#f00");
        title.css("font-weight", "bold");

        var list_tag_str = '<div style="margin: 10px; color: #f00; background-color: #ff0">' +
            '<div style="font-weight: bold;">CHECK FILES!!!</div>' +
            '<ul style="margin: 10px 0 0 20px; color: #f00; font-weight: bold;">';
        for (var i = 0; i < file_names.length; i++) {
            file_name = file_names[i];
            list_tag_str += '<li><a href="#' + file_name + '">' + file_name + '</a></li>';
        }
        list_tag_str += '</ul></div>';
        $("#toc").after(list_tag_str);
    });

    //$(document).on("click", ".js-pull-request-tab", function(e) {
    //});
});