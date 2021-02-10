$(() => {
    $("#new-workout").on("click", () => {
        $("#new-workout-div").hide(100);
        $("#exercise-form-div").show(100);
    })

    $("select[name=type]").on("change", event => {
        const $type = $(event.target);
        const $form = $type.parents(".exercise-form");
        $form.children(".cardio-form,.resistance-form").hide(100);
        switch ($type.val()) {
            case "cardio":
                $form.children(".cardio-form").show(100);
                break;
            case "resistance":
                $form.children(".resistance-form").show(100);
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