$(() => {
    $("select[name=type]").on("change", event => {
        const $type = $(event.target);
        const $form = $type.parents(".exercise-form");
        $form.children(".cardio-form,.resistance-form").hide();
        switch ($type.val()) {
            case "cardio":
                $form.children(".cardio-form").show();
                break;
            case "resistance":
                $form.children(".resistance-form").show();
                break;
        }
    });

    let selects = M.FormSelect.init(document.querySelectorAll("select"));
    
    $("#more-exercise").on("click", () => {
        selects.forEach(select => select.destroy());
        $(".exercise-form").last().clone(true).appendTo("#forms");
        selects = M.FormSelect.init(document.querySelectorAll("select"));
    });
});