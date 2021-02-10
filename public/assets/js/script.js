$(() => {
    $("select").formSelect().on("change", event => {
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
});